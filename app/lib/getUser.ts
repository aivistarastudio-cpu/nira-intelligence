import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();

  const user = data?.user;
  if (!user?.email) return null;

  const email = user.email;

  // 🔥 Fetch name from Google metadata or custom metadata
  let name = user.user_metadata?.full_name || user.user_metadata?.name;

  // 🔥 Fetch avatar from Google metadata or custom metadata
  let avatar_url = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

  // fallback
  if (!name) {
    name =
      email.split("@")[0].charAt(0).toUpperCase() +
      email.split("@")[0].slice(1);
  }

  return {
    email,
    name,
    avatar_url,
  };
};