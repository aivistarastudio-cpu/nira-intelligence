"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BillingPage(){

  const router = useRouter();

  const [price,setPrice]=useState("₹999");
  const [label,setLabel]=useState("India Intelligence Access");

  /* 🌍 REGION PRICE AUTO */
  useEffect(()=>{
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if(!tz.includes("Asia")){
      setPrice("$14.99");
      setLabel("Global Intelligence Access");
    }
  },[]);

  /* 🌌 AI LAB CANVAS */
  useEffect(()=>{

    const canvas:any=document.getElementById("labCanvas");
    if(!canvas) return;

    const ctx=canvas.getContext("2d");

    function resize(){
      canvas.width=window.innerWidth;
      canvas.height=window.innerHeight;
    }
    resize();
    window.addEventListener("resize",resize);

    const pts=Array.from({length:140}).map(()=>({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      vx:(Math.random()-0.5)*0.5,
      vy:(Math.random()-0.5)*0.5
    }));

    function draw(){

      ctx.clearRect(0,0,canvas.width,canvas.height);

      pts.forEach((p:any,i:number)=>{

        p.x+=p.vx;
        p.y+=p.vy;

        if(p.x<0||p.x>canvas.width)p.vx*=-1;
        if(p.y<0||p.y>canvas.height)p.vy*=-1;

        ctx.fillStyle="rgba(120,170,255,0.45)";
        ctx.fillRect(p.x,p.y,1.3,1.3);

        for(let j=i+1;j<pts.length;j++){
          const dx=p.x-pts[j].x;
          const dy=p.y-pts[j].y;
          const d=Math.sqrt(dx*dx+dy*dy);

          if(d<150){
            ctx.strokeStyle="rgba(120,170,255,0.08)";
            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
            ctx.lineTo(pts[j].x,pts[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

  },[]);

  /* 🧠 MOUSE LIGHT EFFECT */
  useEffect(()=>{

    const move=(e:MouseEvent)=>{
      document.documentElement.style.setProperty(
        "--mx",
        e.clientX+"px"
      );
      document.documentElement.style.setProperty(
        "--my",
        e.clientY+"px"
      );
    };

    window.addEventListener("mousemove",move);
    return ()=>window.removeEventListener("mousemove",move);

  },[]);

  return(
    <div className="relative min-h-screen bg-[#020207] text-white overflow-hidden">

      {/* AI LAB */}
      <canvas id="labCanvas" className="absolute inset-0 opacity-60"/>

      {/* HOLOGRAPHIC LIGHT */}
      <div
        className="
        absolute inset-0
        pointer-events-none
        [background:radial-gradient(circle_at_var(--mx,_50%)_var(--my,_50%),rgba(120,170,255,0.18),transparent_35%)]
      "/>

      <div className="relative z-10 flex min-h-screen items-center justify-between px-24">

        {/* LEFT SIDE */}
        <div className="max-w-[520px]">

          <p className="tracking-[8px] text-white/30 text-xs">
            NIRA LAB BILLING
          </p>

          <h1 className="text-[56px] font-semibold mt-6 leading-tight">
            Unlock Intelligence
          </h1>

          <p className="text-white/40 mt-4 leading-relaxed">
            Real-time orchestration layer connecting multiple AI
            reasoning engines inside one intelligence workspace.
          </p>

          {/* 💎 FLOATING PRICE */}
          <div className="mt-20 relative">

            <h2 className="
              text-[120px] font-semibold
              bg-gradient-to-b from-white to-white/10
              bg-clip-text text-transparent
              drop-shadow-[0_0_80px_rgba(120,170,255,0.35)]
              animate-pulse
            ">
              {price}
            </h2>

            <p className="text-white/40">
              {label}
            </p>

          </div>

          {/* 🚀 REACTOR BUTTON */}
          <button
            onClick={()=>alert("Razorpay / Stripe Launch")}
            className="
              mt-16 px-16 py-6
              rounded-full
              text-black text-lg font-medium
              bg-gradient-to-r from-white to-white/80
              hover:scale-[1.08]
              transition-all duration-300
              shadow-[0_0_120px_rgba(255,255,255,0.35)]
            "
          >
            Activate Nira Core
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="
          max-w-[420px]
          backdrop-blur-xl
          border border-white/10
          rounded-[28px]
          p-10
          bg-white/[0.02]
          shadow-[0_0_80px_rgba(120,170,255,0.12)]
        ">

          <h3 className="text-xl mb-6">
            Intelligence Transparency
          </h3>

          <ul className="space-y-4 text-sm text-white/60">
            <li>• o4-mini Advance Reasoning</li>
            <li>• Gemini Flash Lite Latest</li>
            <li>• DeepSeek Chat v3.2</li>
            <li>• Adaptive Model Switching Engine</li>
            <li>• Secure Nira Routing Layer</li>
          </ul>

          <div className="mt-10 pt-6 border-t border-white/10 space-y-3 text-sm text-white/40">

            <button className="hover:text-white transition">
              Terms & Conditions →
            </button>

            <button className="hover:text-white transition">
              Company Policy →
            </button>

            <button
              onClick={()=>router.push("/dashboard/chat")}
              className="hover:text-white transition"
            >
              ← Back to Chat
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
