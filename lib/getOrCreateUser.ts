import { supabase } from "@/lib/supabaseClient"

export async function getOrCreateUser() {

  const { data: authData } = await supabase.auth.getUser()

  const user = authData.user

  if (!user) return null

  // check user table
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  if (existingUser) return existingUser

  // create new user
  const { data: newUser, error } = await supabase
    .from("users")
    .insert([
      {
        id: user.id,
        email: user.email,
        credits: 10,
        plan: "free"
      }
    ])
    .select()
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return newUser
}