const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("❌ Supabase URL ya Key .env.local mein nahi mili.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log("🔍 Checking database connection...");
  
  // Try to query the 'memories' table
  const { data, error } = await supabase.from('memories').select('id').limit(1);
  
  if (error) {
    if (error.code === '42P01') {
      console.log("❌ Tables abhi tak nahi bani hain! (relation 'memories' does not exist)");
      console.log("Aapko Supabase Dashboard mein jaakar schema.sql chalana hoga.");
    } else {
      console.log("❌ Error connecting to database:", error.message);
    }
  } else {
    console.log("✅ Database tables bani hui hain! NIRA backend is ready.");
  }
}

checkDatabase();
