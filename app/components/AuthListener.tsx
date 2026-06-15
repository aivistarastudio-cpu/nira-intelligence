"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AuthListener() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        console.log("Session restored")
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("User signed in")
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return null
}