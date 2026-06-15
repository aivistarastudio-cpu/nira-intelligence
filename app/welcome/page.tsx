"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import WelcomeEngine from "./components/WelcomeEngine"

export default function Page() {

  const router = useRouter()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const checkSession = async () => {

      const dev = localStorage.getItem("nira_user_email")

      /* ===== DEV LOGIN ALLOW ===== */

      if(dev){
        setLoading(false)
        return
      }

      /* ===== REAL SESSION CHECK ===== */

      const { data } = await supabase.auth.getSession()

      if(!data.session){
        router.push("/login")
      }else{
        setLoading(false)
      }

    }

    checkSession()

  },[])

  if(loading){
    return null
  }

  return <WelcomeEngine />

}