"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lightbulb, Key, AlertTriangle, UserCheck, Ban, ShieldCheck, MapPin, Feather, Server, TestTube2, MessageCircle, Flag, PowerOff, Rocket, BookOpen } from "lucide-react";
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

export default function UserGuidelines() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--nira-bg)] text-[var(--nira-text)] font-sans selection:bg-[color-mix(in_srgb,var(--nira-text)_20%,transparent)] selection:text-[var(--nira-text)] pb-24 overflow-hidden relative">
      
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 md:pt-24">
        {/* Back Button */}
        <button 
          onClick={() => router.push("/nira")}
          className="group flex items-center gap-2 text-sm font-medium text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-colors mb-12 bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--nira-text)_10%,transparent)] px-4 py-2 rounded-full border border-[var(--nira-border)] backdrop-blur-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to NIRA
        </button>

        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] border border-[var(--nira-border)] text-[var(--nira-text)] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <BookOpen size={14} /> Community Standards
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--nira-text)] to-[color-mix(in_srgb,var(--nira-text)_50%,transparent)]">
            User Guidelines
          </h1>
          <p className="text-lg text-[var(--nira-subtext)]">
            Effective Date: <span className="font-medium text-[var(--nira-text)]">June 08, 2026</span>
          </p>
        </motion.div>

        {/* Premium Content Body */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-12 text-base md:text-lg leading-relaxed text-[color-mix(in_srgb,var(--nira-text)_80%,transparent)]"
        >
          <section className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-xl border border-[var(--nira-border)] rounded-3xl p-8 md:p-10 shadow-lg">
            <p className="text-xl text-[var(--nira-text)] font-semibold mb-4">Welcome to NIRA (Neural Intelligence & Responsive Assistant).</p>
            <p className="mb-4">
              These User Guidelines are intended to help create a safe, secure, and productive experience for all users of NIRA. By using NIRA, you agree to follow these guidelines and use the platform responsibly.
            </p>
          </section>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--nira-border)] to-transparent my-12" />

          {/* 1. Using NIRA */}
          <section className="bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] border border-[var(--nira-border)] rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--nira-text)] mb-6 flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded">01</span> USING NIRA
            </h2>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Lightbulb size={24} className="text-emerald-500" />
              </div>
              <div className="space-y-4">
                <p>NIRA is an artificial intelligence platform designed to assist with:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Research and learning</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Content creation</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Productivity and organization</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Problem-solving</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Communication</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Creative projects</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Knowledge discovery</div>
                </div>
                <p className="font-medium pt-2">Users should use NIRA in accordance with applicable laws and these guidelines.</p>
              </div>
            </div>
          </section>

          {/* 2. Account Access & 3. Verify Important Information */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded">02</span> ACCOUNT ACCESS
              </h2>
              <div className="flex items-start gap-3">
                <Key size={20} className="text-indigo-400 shrink-0 mt-1" />
                <div className="space-y-3 text-sm">
                  <p>NIRA currently uses passwordless authentication through secure email-based Magic Links.</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>A secure login link may be sent to your registered email address</li>
                    <li>Access to your email account is required to complete authentication</li>
                    <li>Users are responsible for maintaining the security of their email accounts</li>
                    <li>Anyone with access to your email may potentially access your NIRA account</li>
                  </ul>
                  <p className="font-medium text-[var(--nira-text)]">If you believe your account has been compromised, contact NIRA support immediately.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-orange-500/30 rounded-2xl p-6 shadow-[0_0_30px_-10px_rgba(249,115,22,0.1)]">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded">03</span> VERIFY IMPORTANT INFORMATION
              </h2>
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-orange-500 shrink-0 mt-1" />
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-orange-600 dark:text-orange-400">Artificial intelligence can make mistakes.</p>
                  <p>AI-generated responses may occasionally be: Incorrect, Incomplete, Outdated, Misleading, Biased, or Unexpected.</p>
                  <p>Always verify important information before making: Legal, Financial, Medical, Business, Educational, or Personal decisions.</p>
                  <p className="font-medium text-[var(--nira-text)]">NIRA should not be considered a substitute for qualified professional advice.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Responsible Use & 5. Prohibited Activities */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">04</span> RESPONSIBLE USE
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <UserCheck size={20} className="text-blue-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>Use NIRA responsibly and ethically. Users should:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Follow applicable laws</li>
                    <li>Respect others</li>
                    <li>Use the platform in good faith</li>
                    <li>Report issues and vulnerabilities responsibly</li>
                    <li>Help maintain a positive environment</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-red-500/20 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded">05</span> PROHIBITED ACTIVITIES
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <Ban size={20} className="text-red-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p className="font-semibold text-[var(--nira-text)]">Do not use NIRA to:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Violate laws or regulations</li>
                    <li>Engage in fraud or deception</li>
                    <li>Harass, threaten, or abuse others</li>
                    <li>Promote violence or harmful conduct</li>
                    <li>Spread malicious software</li>
                    <li>Attempt unauthorized access to systems</li>
                    <li>Circumvent platform protections</li>
                    <li>Interfere with platform operations or Abuse resources</li>
                  </ul>
                  <p className="font-medium text-red-500/80 pt-2">Violations may result in warnings, restrictions, suspension, or permanent account termination.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Privacy & Security & 7. Location Services */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">06</span> PRIVACY AND SECURITY
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <ShieldCheck size={20} className="text-teal-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>Protect your personal information. Avoid sharing Passwords, Banking credentials, Credit card information, Government-issued identification numbers, Medical records, or Highly sensitive personal information.</p>
                  <p className="font-medium text-[var(--nira-text)]">Users remain responsible for the information they choose to share.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">07</span> LOCATION SERVICES
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={20} className="text-rose-400 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>Certain NIRA features may use location information to improve relevance and functionality. Location access is optional.</p>
                  <p>Users may Enable location access, Disable location access, or Revoke permissions at any time.</p>
                  <p className="font-medium text-[var(--nira-text)]">Core platform functionality remains available even when location access is disabled.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Respect IP & 9. Platform Security */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">08</span> RESPECT IP
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <Feather size={20} className="text-fuchsia-400 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>Do not use NIRA to knowingly violate Copyrights, Trademarks, Patents, Trade secrets, or Other intellectual property rights.</p>
                  <p className="font-medium text-[var(--nira-text)]">Respect the rights of creators, businesses, organizations, and individuals.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">09</span> PLATFORM SECURITY
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <Server size={20} className="text-amber-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>Do not attempt to Hack NIRA, Probe for vulnerabilities, Reverse engineer protected systems, Bypass security controls, Access unauthorized resources, or Disrupt platform operations.</p>
                  <p className="font-medium text-red-400">Such activities may result in immediate suspension or termination.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 10. Experimental Features & 11. Feedback */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">10</span> EXPERIMENTAL FEATURES
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <TestTube2 size={20} className="text-purple-400 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>Some NIRA features may be marked as Beta, Experimental, Preview, or Early Access.</p>
                  <p>Such features may Change over time, Produce unexpected results, Be modified without notice, or Be discontinued without notice.</p>
                  <p className="font-medium text-[var(--nira-text)]">Use these features at your own discretion.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">11</span> FEEDBACK & IMPROVEMENTS
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <MessageCircle size={20} className="text-sky-400 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>We welcome Feedback, Suggestions, Bug reports, Improvement ideas, and Feature requests.</p>
                  <p className="font-medium text-[var(--nira-text)]">Your feedback helps improve NIRA and future platform capabilities.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 12. Reporting Issues & 13. Account Termination */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">12</span> REPORTING ISSUES
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <Flag size={20} className="text-orange-400 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>If you discover Security vulnerabilities, Harmful outputs, Technical issues, or Platform abuse, please report them through official NIRA support channels.</p>
                  <p className="font-medium text-[var(--nira-text)]">Responsible reporting helps improve the safety and reliability of the platform.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded mr-3">13</span> ACCOUNT TERMINATION
              </h2>
              <div className="flex items-start gap-3 text-sm">
                <PowerOff size={20} className="text-red-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>NIRA may restrict, suspend, or terminate access to users who Violate these guidelines, Violate applicable laws, Abuse platform resources, Attempt to compromise platform security, or Engage in harmful or fraudulent activities.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 14. Future Development */}
          <section className="bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] border border-[var(--nira-border)] rounded-3xl p-8 shadow-sm mt-8">
            <h2 className="text-2xl font-bold text-[var(--nira-text)] mb-6 flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-1 rounded">14</span> FUTURE DEVELOPMENT
            </h2>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-sky-500/10 rounded-xl">
                <Rocket size={24} className="text-sky-500" />
              </div>
              <div className="space-y-3 text-sm">
                <p>NIRA is continuously evolving.</p>
                <p>Future updates may include New AI models, Automation systems, Advanced intelligence features, Integrations, Experimental technologies, and Additional platform capabilities.</p>
                <p className="font-medium text-[var(--nira-text)]">These guidelines may be updated periodically to reflect platform changes.</p>
              </div>
            </div>
          </section>

          {/* 15. Thank You */}
          <section className="bg-gradient-to-r from-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] to-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] rounded-3xl p-8 md:p-12 text-center mt-12 shadow-sm">
            <h2 className="text-3xl font-bold text-[var(--nira-text)] mb-4 flex items-center justify-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xl bg-emerald-500/10 px-3 py-1.5 rounded">15</span> THANK YOU
            </h2>
            <p className="mb-6 text-[var(--nira-subtext)] max-w-xl mx-auto">
              Thank you for using NIRA responsibly. By helping maintain a safe, respectful, and productive environment, you contribute to the continued growth and improvement of the NIRA platform.
            </p>
            <div className="inline-flex items-center gap-2 bg-[var(--nira-text)] text-[var(--nira-bg)] font-semibold px-8 py-3 rounded-full shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)]">
              <NiraLogo size={18} /> NIRA
            </div>
            <p className="text-xs font-semibold tracking-wider text-[var(--nira-text)] uppercase mt-6">Neural Intelligence & Responsive Assistant</p>
          </section>

          {/* Footer Info */}
          <div className="pt-16 pb-8 text-center text-sm text-[var(--nira-subtext)]">
            <p className="mb-2">Last Updated: June 08, 2026</p>
            <p>© {new Date().getFullYear()} NIRA. All Rights Reserved.</p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
