"use client";

import { useEffect, useState } from "react";

type Profile = {
  name: string;
  email: string;
  dob: string;
};

export default function SettingsPage(){

  const [profile,setProfile] = useState<Profile>({
    name:"",
    email:"",
    dob:""
  });

  const [chatCredits,setChatCredits] = useState(0);
  const [imageCredits,setImageCredits] = useState(0);
  const [videoCredits,setVideoCredits] = useState(0);

  const [saving,setSaving] = useState(false);

  /* ================= LOAD USER ================= */

  useEffect(()=>{

    /* PROFILE LOAD */

    const savedProfile = localStorage.getItem("nira_profile");

    if(savedProfile){
      setProfile(JSON.parse(savedProfile));
    }

    /* EMAIL AUTO LOAD (magic login future ready) */

    const email = localStorage.getItem("nira_user_email");

    if(email){
      setProfile(prev => ({
        ...prev,
        email
      }));
    }

    /* CREDITS LOAD */

    const chat = localStorage.getItem("nira_chat_credits");
    const image = localStorage.getItem("nira_image_credits");
    const video = localStorage.getItem("nira_video_credits");

    if(chat) setChatCredits(Number(chat));
    if(image) setImageCredits(Number(image));
    if(video) setVideoCredits(Number(video));

  },[]);

  /* ================= SAVE PROFILE ================= */

  function saveProfile(){

    setSaving(true);

    localStorage.setItem(
      "nira_profile",
      JSON.stringify(profile)
    );

    setTimeout(()=>{
      setSaving(false);
    },500);

  }

  /* ================= LOGOUT ================= */

  function logout(){

    localStorage.clear();

    window.location.href="/login";

  }

  return(

  <div className="min-h-screen w-full bg-[#07090F] text-white px-6 py-12">

  <div className="max-w-[1050px] mx-auto space-y-14">

  {/* HEADER */}

  <div>
  <h1 className="text-[28px] font-semibold tracking-tight">
  Account Settings
  </h1>

  <p className="text-white/40 text-sm mt-1">
  Manage your profile, usage and billing
  </p>
  </div>

  {/* PROFILE */}

  <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 space-y-6 transition-all">

  <h2 className="text-lg font-medium">
  Profile
  </h2>

  <div className="h-[1px] w-full bg-white/10"></div>

  <div className="grid md:grid-cols-2 gap-5 max-w-[700px]">

  <Input
  value={profile.name}
  placeholder="Full name"
  onChange={(v:string)=>setProfile({...profile,name:v})}
  />

  <Input
  value={profile.email}
  placeholder="Email"
  disabled
  />

  <Input
  value={profile.dob}
  type="date"
  onChange={(v:string)=>setProfile({...profile,dob:v})}
  />

  </div>

  <button
  onClick={saveProfile}
  className="
  px-6 py-2
  rounded-xl
  bg-gradient-to-r
  from-indigo-500
  to-purple-500
  hover:opacity-90
  transition-all
  text-sm
  "
  >
  {saving ? "Saving..." : "Save Changes"}
  </button>

  </section>

  {/* USAGE */}

  <section className="space-y-6">

  <h2 className="text-lg font-medium">
  Usage
  </h2>

  <div className="h-[1px] w-full bg-white/10"></div>

  <div className="grid md:grid-cols-3 gap-5">

  <UsageCard
  title="Chat Credits"
  value={chatCredits}
  />

  <UsageCard
  title="Image Credits"
  value={imageCredits}
  />

  <UsageCard
  title="Video Credits"
  value={videoCredits}
  />

  </div>

  </section>

  {/* BILLING */}

  <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 space-y-4 transition-all">

  <h2 className="text-lg font-medium">
  Billing
  </h2>

  <div className="h-[1px] w-full bg-white/10"></div>

  <p className="text-white/40 text-sm">
  Manage your subscription and credit plans
  </p>

  <button
  onClick={()=>window.location.href="/dashboard/billing"}
  className="
  px-6 py-2
  rounded-xl
  bg-gradient-to-r
  from-purple-500
  to-indigo-500
  shadow-[0_0_25px_rgba(99,102,241,0.4)]
  hover:opacity-90
  transition
  text-sm
  "
  >
  Open Billing
  </button>

  </section>

  {/* SECURITY */}

  <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 space-y-4">

  <h2 className="text-lg font-medium">
  Security
  </h2>

  <div className="h-[1px] w-full bg-white/10"></div>

  <button
  onClick={logout}
  className="
  px-5 py-2
  rounded-xl
  border border-white/10
  hover:bg-white/10
  transition
  text-sm
  "
  >
  Logout
  </button>

  </section>

  </div>
  </div>

  );

}

/* INPUT COMPONENT */

function Input({
  value,
  onChange,
  placeholder,
  type="text",
  disabled=false
}:any){

return(

<input
type={type}
value={value}
disabled={disabled}
onChange={(e)=>onChange && onChange(e.target.value)}
placeholder={placeholder}
className="
w-full
bg-black/40
border border-white/10
px-4 py-3
rounded-xl
outline-none
text-sm
focus:border-white/30
transition
disabled:opacity-40
"
/>

);
}

/* USAGE CARD */

function UsageCard({title,value}:{title:string,value:number}){

return(

<div className="
p-5
rounded-xl
border border-white/10
bg-black/40
hover:bg-black/50
hover:scale-[1.02]
transition-all duration-300
">

<p className="text-white/40 text-sm">
{title}
</p>

<p className="text-[22px] font-semibold mt-1">
{value}
</p>

</div>

);
}