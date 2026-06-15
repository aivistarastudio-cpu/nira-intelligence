-- ==========================================================
-- PHASE 11: NIRA SUPABASE PERSISTENT MEMORY ARCHITECTURE
-- ==========================================================

-- Enable Vector Extension
create extension if not exists vector;

-- Enums
create type project_status as enum ('active', 'archived');
create type memory_priority as enum ('low', 'medium', 'high', 'critical');
create type memory_source as enum ('chat', 'project', 'pdf', 'manual', 'agent');

-- ==========================================================
-- 1. USERS TABLE
-- ==========================================================
create table if not exists users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_active timestamp with time zone default timezone('utc'::text, now()) not null,
    global_preferences jsonb default '{}'::jsonb
);

-- ==========================================================
-- 2. PROJECTS TABLE
-- ==========================================================
create table if not exists projects (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade not null,
    name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status project_status default 'active',
    is_pinned boolean default false,
    last_opened timestamp with time zone default timezone('utc'::text, now())
);

-- ==========================================================
-- 3. MEMORIES TABLE
-- ==========================================================
create table if not exists memories (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade not null,
    project_id uuid references projects(id) on delete cascade,
    
    raw_text text not null,
    compressed_text text not null,
    topic text,
    
    importance int check (importance >= 1 and importance <= 100) default 50,
    priority memory_priority default 'medium',
    memory_type text not null,
    
    embedding vector(1536) not null,
    
    -- Aging Engine & Stats
    memory_strength float default 1.0,
    decay_rate float default 0.01,
    last_accessed timestamp with time zone default timezone('utc'::text, now()) not null,
    retrieval_count integer default 0,
    
    -- Auditing & UI Prep
    source memory_source default 'chat',
    is_hidden boolean default false,
    is_user_editable boolean default true,
    is_archived boolean default false,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indices for performance
create index on memories using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index on memories (user_id, is_archived, project_id);

-- ==========================================================
-- 4. RETRIEVAL ENGINE (RPC: match_memories)
-- ==========================================================
-- FinalScore = Similarity(50%) + Importance(20%) + MemoryStrength(15%) + Recency(15%)
create or replace function match_memories(
    query_embedding vector(1536),
    match_threshold float,
    match_count int,
    p_user_id uuid,
    p_project_id uuid default null
)
returns table (
    id uuid,
    compressed_text text,
    topic text,
    importance int,
    memory_strength float,
    source memory_source,
    similarity float,
    final_score float
)
language plpgsql
as $$
begin
    return query
    select
        m.id,
        m.compressed_text,
        m.topic,
        m.importance,
        m.memory_strength,
        m.source,
        -- Cosine similarity: 1 - cosine_distance
        1 - (m.embedding <=> query_embedding) as similarity,
        
        -- FINAL SCORE CALCULATION
        (
            ((1 - (m.embedding <=> query_embedding)) * 0.50) + -- Similarity: 50%
            ((m.importance::float / 100.0) * 0.20) +             -- Importance: 20%
            (least(m.memory_strength, 10.0) / 10.0 * 0.15) +     -- Strength: 15% (normalized to 10 max cap for scoring)
            -- Recency: 15% based on days since last accessed
            (greatest(1.0 - (extract(epoch from (now() - m.last_accessed)) / 86400.0) / 30.0, 0) * 0.15)
        ) as final_score
    from memories m
    where 
        m.user_id = p_user_id
        and m.is_archived = false
        and (1 - (m.embedding <=> query_embedding)) > match_threshold
        and (
            -- If project is specified, return project + global (null). If not, just global.
            m.project_id = p_project_id or m.project_id is null
        )
    order by final_score desc
    limit match_count;
end;
$$;

-- ==========================================================
-- 5. ROW LEVEL SECURITY
-- ==========================================================
alter table users enable row level security;
alter table projects enable row level security;
alter table memories enable row level security;

create policy "Users can only access their own profile" on users
    for all using (auth.uid() = id);

create policy "Users can only access their own projects" on projects
    for all using (auth.uid() = user_id);

create policy "Users can only access their own memories" on memories
    for all using (auth.uid() = user_id);

-- ==========================================================
-- 6. MEMORY AGING ENGINE (RPC: strengthen_memory)
-- ==========================================================
create or replace function strengthen_memory(memory_id uuid)
returns void
language plpgsql
as $$
begin
    update memories
    set 
        last_accessed = timezone('utc'::text, now()),
        -- Increase strength by 0.5, capped at 10.0 max
        memory_strength = least(memory_strength + 0.5, 10.0),
        retrieval_count = retrieval_count + 1
    where id = memory_id;
end;
$$;

-- ==========================================================
-- 7. RAG PIPELINE (PHASE 10 -> 11 PERSISTENCE)
-- ==========================================================
create table if not exists rag_chunks (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade not null,
    project_id uuid references projects(id) on delete cascade,
    document_name text not null,
    chunk_index int not null,
    chunk_text text not null,
    embedding vector(1536) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index on rag_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index on rag_chunks (user_id, project_id);

alter table rag_chunks enable row level security;
create policy "Users can only access their own rag_chunks" on rag_chunks
    for all using (auth.uid() = user_id);

create or replace function match_chunks(
    query_embedding vector(1536),
    match_threshold float,
    match_count int,
    p_user_id uuid,
    p_project_id uuid default null
)
returns table (
    id uuid,
    document_name text,
    chunk_text text,
    similarity float
)
language plpgsql
as $$
begin
    return query
    select
        c.id,
        c.document_name,
        c.chunk_text,
        1 - (c.embedding <=> query_embedding) as similarity
    from rag_chunks c
    where 
        c.user_id = p_user_id
        and (1 - (c.embedding <=> query_embedding)) > match_threshold
        and (
            c.project_id = p_project_id or c.project_id is null
        )
    order by c.embedding <=> query_embedding
    limit match_count;
end;
$$;

