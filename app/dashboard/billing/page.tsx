"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

const NiraLogo = ({ size = 22 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" opacity="0.9">
      <ellipse cx="100" cy="100" rx="35" ry="80" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="35" ry="80" transform="rotate(-60 100 100)" />
    </g>
  </svg>
);

const PremiumStar = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="animate-[spin_4s_linear_infinite]"
  >
    <path 
      d="M12 1C12 1 12 10.5 21 12C12 13.5 12 23 12 23C12 23 12 13.5 3 12C12 10.5 12 1 12 1Z" 
      fill="currentColor" 
    />
  </svg>
);

export default function BillingPage() {
  const router = useRouter();

  const openRazorpay = (plan: string, amount: number) => {
    alert(`${plan} payment gateway coming soon`);
  };

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "forever",
      desc: "Everyday lightweight access",
      features: [
        "10 messages daily",
        "Fast responses",
        "Writing assistance",
        "Standard reasoning",
      ],
      buttonText: "Current Plan",
      highlight: false,
    },
    {
      name: "Creator Lite",
      price: "₹299",
      period: "monthly",
      desc: "Smart creator workflow",
      features: [
        "50 messages daily",
        "Caption generation",
        "Prompt enhancement",
        "Script assistance",
        "Better reasoning",
      ],
      buttonText: "Upgrade Plan",
      highlight: false,
      onClick: () => openRazorpay("Creator Lite", 299),
    },
    {
      name: "Creator Pro",
      price: "₹599",
      period: "monthly",
      desc: "Advanced intelligence workflow",
      features: [
        "120 messages daily",
        "Long-form responses",
        "Deep workflow help",
        "Enhanced reasoning",
        "Better memory",
        "Priority intelligence",
      ],
      buttonText: "Upgrade to Pro",
      highlight: true,
      onClick: () => openRazorpay("Creator Pro", 599),
    },
    {
      name: "NIRA Elite",
      price: "₹999",
      period: "monthly",
      desc: "Maximum intelligence access",
      features: [
        "Premium reasoning",
        "Faster responses",
        "Extended memory",
        "Priority routing",
        "Future premium tools",
      ],
      buttonText: "Activate Elite",
      highlight: false,
      onClick: () => openRazorpay("NIRA Elite", 999),
    },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--nira-bg)] text-[var(--nira-text)] overflow-x-hidden selection:bg-[var(--nira-accent)] selection:text-white">
      
      {/* PREMIUM BACKGROUND GLOWS (Theme Aware) */}
      <div className="fixed top-0 inset-x-0 h-[500px] pointer-events-none overflow-hidden">
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--nira-accent)] opacity-[0.08] blur-[120px] rounded-[100%]" />
      </div>

      {/* TOP NAVBAR */}
      <div className="relative z-20 flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <button
          onClick={() => router.push("/dashboard/chat")}
          className="flex items-center gap-2 text-[14px] font-medium text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--nira-surface)] border border-[var(--nira-border)] flex items-center justify-center group-hover:bg-[var(--nira-text)]/[0.05] transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Workspace
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pb-24 pt-8">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--nira-accent)]/[0.1] border border-[var(--nira-accent)]/[0.2] text-[var(--nira-accent)] text-[12px] font-bold tracking-wide uppercase mb-6"
          >
            <NiraLogo size={14} />
            Upgrade your intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[48px] md:text-[64px] font-bold tracking-tight leading-[1.1] mb-6"
          >
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--nira-accent)] to-pink-500">plan</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[18px] text-[var(--nira-subtext)] max-w-[600px]"
          >
            Experience the full power of Nira. Advanced reasoning, faster speeds, and deeper memory for creators and professionals.
          </motion.p>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative flex flex-col rounded-[32px] p-8 transition-transform duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "bg-[var(--nira-surface)] border-[2px] border-[var(--nira-accent)] shadow-[0_20px_60px_rgba(var(--nira-accent-rgb),0.15)]"
                  : "bg-[var(--nira-surface)] border border-[var(--nira-border)]/60 shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 overflow-hidden rounded-full p-[1.5px] shadow-[0_4px_24px_rgba(var(--nira-accent-rgb),0.4)]">
                  {/* Rotating gradient border effect */}
                  <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--nira-accent)_360deg)] animate-[spin_2s_linear_infinite] opacity-50" />
                  
                  <div className="relative bg-[#1A1A1A] dark:bg-black/90 backdrop-blur-xl border border-white/10 dark:border-white/5 text-white text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full flex items-center gap-2">
                    <div className="text-[#FFB800] dark:text-[var(--nira-accent)] drop-shadow-[0_0_8px_rgba(255,184,0,0.5)] dark:drop-shadow-[0_0_8px_rgba(var(--nira-accent-rgb),0.8)]">
                      <PremiumStar size={14} />
                    </div>
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-[24px] font-semibold tracking-tight text-[var(--nira-text)]">
                  {plan.name}
                </h3>
                <p className="text-[14px] text-[var(--nira-subtext)] mt-2 font-medium">
                  {plan.desc}
                </p>

                <div className="mt-8 mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-[48px] font-bold leading-none tracking-tighter text-[var(--nira-text)]">
                      {plan.price}
                    </span>
                    <span className="text-[15px] font-medium text-[var(--nira-subtext)] mb-2">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 shrink-0 rounded-full p-0.5 ${plan.highlight ? 'bg-[var(--nira-accent)]/10 text-[var(--nira-accent)]' : 'bg-[var(--nira-text)]/[0.05] text-[var(--nira-text)]'}`}>
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-[15px] text-[var(--nira-text)]/80 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={plan.onClick}
                className={`mt-10 w-full py-4 rounded-2xl text-[15px] font-bold transition-all duration-200 active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-[var(--nira-accent)] text-white hover:opacity-90 shadow-[0_8px_20px_rgba(var(--nira-accent-rgb),0.3)]"
                    : "bg-[var(--nira-text)]/[0.04] text-[var(--nira-text)] border border-[var(--nira-border)]/60 hover:bg-[var(--nira-text)]/[0.08]"
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FOOTER LINKS */}
        <div className="mt-20 pt-8 border-t border-[var(--nira-border)]/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[var(--nira-subtext)] font-medium">
          <p>© 2026 Nira Intelligence Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push('/terms')}
              className="hover:text-[var(--nira-text)] transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => router.push('/privacy')}
              className="hover:text-[var(--nira-text)] transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}