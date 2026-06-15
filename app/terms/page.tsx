"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BrainCircuit, AlertTriangle, Scale, ShieldAlert, Zap, GlobeLock, UserCheck, TestTube2, RefreshCcw, CreditCard, Feather, BookOpen, UserPlus, CheckSquare, RefreshCw, CloudLightning, Mail, Ban, FileText, Scissors } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 md:pt-24">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-sm font-medium text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-colors mb-12 bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--nira-text)_10%,transparent)] px-4 py-2 rounded-full border border-[var(--nira-border)] backdrop-blur-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] border border-[var(--nira-border)] text-[var(--nira-text)] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <BookOpen size={14} /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--nira-text)] to-[color-mix(in_srgb,var(--nira-text)_50%,transparent)]">
            Terms of Service
          </h1>
          <p className="text-lg text-[var(--nira-subtext)]">
            Effective Date: <span className="font-medium text-[var(--nira-text)]">June 8, 2026</span>
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
            <p className="text-xl text-[var(--nira-text)] font-semibold mb-4">Welcome to NIRA.</p>
            <p className="mb-4">
              These Terms of Service govern your access to and use of NIRA's artificial intelligence platform, applications, websites, and related services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--nira-border)] to-transparent my-12" />

          {/* 1. AI Can Make Mistakes */}
          <section className="my-16">
            <div className="relative bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-orange-500/30 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <BrainCircuit size={28} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--nira-text)] mb-2">01. AI CAN MAKE MISTAKES</h2>
                  <p className="text-orange-600 dark:text-orange-400 font-medium text-sm">IMPORTANT LIMITATIONS</p>
                </div>
              </div>
              <div className="space-y-4 text-[var(--nira-text)] text-sm">
                <p>NIRA uses evolving artificial intelligence technologies to generate responses. AI systems may occasionally produce incorrect, incomplete, misleading, or outdated information.</p>
                <div className="flex items-center gap-3 bg-orange-500/10 text-orange-700 dark:text-orange-300 px-5 py-4 rounded-xl border border-orange-500/20 font-medium my-6">
                  <AlertTriangle size={20} className="shrink-0" />
                  <p>AI outputs should not be considered guaranteed facts. Users must independently verify important information before relying on AI-generated responses.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. No Professional Advice & 3. Limitation of Liability */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">02</span> NO PROFESSIONAL ADVICE
              </h2>
              <p className="text-sm">NIRA provides general information and assistance. Our platform should not be relied upon as a substitute for professional legal, financial, medical, or other specialized advice. Always consult a qualified professional for critical decisions.</p>
            </div>
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">03</span> LIMITATION OF LIABILITY
              </h2>
              <div className="flex items-start gap-3">
                <Scale size={20} className="text-gray-400 shrink-0 mt-1" />
                <p className="text-sm">To the maximum extent permitted by law, NIRA and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the services.</p>
              </div>
            </div>
          </section>

          {/* 4. Account Suspension & 5. Platform Protection */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">04</span> ACCOUNT SUSPENSION
              </h2>
              <p className="text-sm">We reserve the right to suspend or terminate your account at any time, with or without notice, if we determine that you have violated these Terms, engaged in abusive behavior, or posed a security risk to the platform.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">05</span> PLATFORM PROTECTION
              </h2>
              <div className="flex gap-3 text-sm">
                <ShieldAlert size={20} className="text-red-500 shrink-0" />
                <p>Users are strictly prohibited from attempting to reverse-engineer, exploit, or bypass NIRA's security protocols, rate limits, or safety guardrails. We actively monitor for malicious behavior to protect the platform ecosystem.</p>
              </div>
            </div>
          </section>

          {/* 6. Service Availability & 7. User Responsibility */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">06</span> SERVICE AVAILABILITY
              </h2>
              <div className="flex gap-3 text-sm">
                <Zap size={20} className="text-blue-500 shrink-0" />
                <p>While we strive for high uptime, NIRA services are provided on an "AS IS" and "AS AVAILABLE" basis. We may modify, suspend, or discontinue any aspect of the service at any time without prior notice.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">07</span> USER RESPONSIBILITY
              </h2>
              <div className="flex gap-3 text-sm">
                <UserCheck size={20} className="text-green-500 shrink-0" />
                <p>You are solely responsible for all activities occurring under your account and for the content you submit. You must not use NIRA to generate harmful, illegal, or highly sensitive content.</p>
              </div>
            </div>
          </section>

          {/* 8. Beta Features & 9. Governing Law (Updated) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">08</span> BETA FEATURES
              </h2>
              <div className="flex gap-3 text-sm">
                <TestTube2 size={20} className="text-purple-500 shrink-0" />
                <p>NIRA may offer experimental or "Beta" features. These features are provided for testing purposes and may be unreliable, contain bugs, or be withdrawn entirely at our discretion.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">09</span> GOVERNING LAW
              </h2>
              <div className="flex gap-3 text-sm">
                <GlobeLock size={20} className="text-teal-500 shrink-0" />
                <div className="space-y-3">
                  <p>These Terms of Service shall be governed by and interpreted in accordance with the laws of India.</p>
                  <p>Any dispute, claim, or controversy arising out of or relating to these Terms of Service, the use of NIRA, or any related services shall be subject to the exclusive jurisdiction of the competent courts located in Ahmedabad, Gujarat, India.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 10. Refund Rules (Updated) & 11. Subscription Rules */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">10</span> REFUND RULES
              </h2>
              <div className="flex items-start gap-3">
                <RefreshCcw size={20} className="text-[var(--nira-subtext)] shrink-0 mt-1" />
                <div className="space-y-3 text-sm">
                  <p>Payments for subscriptions, credits, premium features, usage-based services, and related purchases are generally non-refundable unless required by applicable law.</p>
                  <p>Unused credits, consumed services, generated outputs, completed billing periods, and previously delivered services are generally not eligible for refunds.</p>
                  <p>Exceptions may be granted solely at NIRA's discretion or where required by applicable law.</p>
                </div>
              </div>
            </div>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-[var(--nira-text)] mb-4 flex items-center gap-2">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">11</span> SUBSCRIPTION RULES
              </h2>
              <div className="flex items-start gap-3">
                <CreditCard size={20} className="text-[var(--nira-subtext)] shrink-0 mt-1" />
                <p className="text-sm">Subscriptions are billed in advance on a recurring basis. You may cancel your subscription at any time, and the cancellation will take effect at the end of the current billing cycle.</p>
              </div>
            </div>
          </section>

          {/* 12. Intellectual Property */}
          <section className="bg-[color-mix(in_srgb,var(--nira-text)_2%,transparent)] border border-[var(--nira-border)] rounded-3xl p-8 shadow-sm mt-8">
            <h2 className="text-2xl font-bold text-[var(--nira-text)] mb-6 flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">12</span> INTELLECTUAL PROPERTY
            </h2>
            <div className="flex items-start gap-4">
              <Feather size={24} className="text-indigo-400 shrink-0" />
              <div className="space-y-4 text-sm text-[var(--nira-subtext)]">
                <p>
                  NIRA retains all intellectual property rights to the platform, underlying algorithms, source code, design elements, and branding. Your use of NIRA does not grant you ownership of any of our intellectual property.
                </p>
                <p>
                  Regarding the outputs you generate using NIRA: Subject to your compliance with these Terms, you may use the AI-generated outputs for any lawful purpose. However, we do not claim ownership over the specific text prompts you submit, nor do we guarantee that AI outputs are entirely unique to you or free from third-party copyright claims.
                </p>
              </div>
            </div>
          </section>

          {/* 13. Age Requirement & 14. Acceptable Use */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">13</span> AGE REQUIREMENT
              </h2>
              <div className="flex items-start gap-3">
                <UserPlus size={20} className="text-pink-500 shrink-0 mt-1" />
                <div className="space-y-3 text-sm">
                  <p>You must be at least 13 years old to access or use NIRA.</p>
                  <p>If you are under the age required by applicable law in your jurisdiction, you may only use NIRA under the supervision and consent of a parent or legal guardian.</p>
                  <p>By using NIRA, you represent and warrant that you meet the applicable age requirements.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-red-500/20 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">14</span> ACCEPTABLE USE
              </h2>
              <div className="flex items-start gap-3">
                <CheckSquare size={20} className="text-red-500 shrink-0 mt-1" />
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-[var(--nira-text)]">Users may not use NIRA to:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Violate any applicable law, regulation, or legal obligation</li>
                    <li>Engage in fraud, deception, impersonation, or misleading activities</li>
                    <li>Generate, distribute, or promote harmful, abusive, illegal, violent, hateful, or malicious content</li>
                    <li>Upload, distribute, or transmit malware, viruses, harmful code, or unauthorized software</li>
                    <li>Attempt unauthorized access to systems, networks, accounts, databases, or infrastructure</li>
                    <li>Interfere with the operation, security, integrity, availability, or performance of NIRA</li>
                    <li>Circumvent platform restrictions, rate limits, safety mechanisms, or access controls</li>
                    <li>Use NIRA in a manner that could harm users, third parties, public safety, or the platform itself</li>
                  </ul>
                  <p className="font-medium text-red-500/80 pt-2">Violation of these rules may result in warnings, restrictions, suspension, termination, legal action, or other appropriate measures.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 15. Changes to These Terms & 16. Force Majeure */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">15</span> CHANGES TO TERMS
              </h2>
              <div className="flex gap-3 text-sm">
                <RefreshCw size={20} className="text-blue-400 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>NIRA may update, revise, modify, or replace these Terms of Service from time to time.</p>
                  <p>Updated versions will be published with a revised Effective Date or Last Updated Date. Continued use of NIRA following the publication of updated Terms constitutes acceptance of the revised Terms.</p>
                  <p>Users are encouraged to periodically review these Terms to remain informed of any changes.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">16</span> FORCE MAJEURE
              </h2>
              <div className="flex gap-3 text-sm">
                <CloudLightning size={20} className="text-yellow-500 shrink-0 mt-1" />
                <div className="space-y-3">
                  <p>NIRA shall not be responsible for delays, interruptions, service failures, data loss, or inability to provide services resulting from events beyond our reasonable control.</p>
                  <p>Such events may include natural disasters, floods, fires, earthquakes, power outages, internet disruptions, cyberattacks, government actions, labor disputes, infrastructure failures, third-party service outages, and other unforeseen circumstances beyond our control.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 17. Termination */}
          <section className="bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-red-500/20 rounded-2xl p-6 shadow-sm mt-8">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">17</span> TERMINATION
            </h2>
            <div className="flex items-start gap-3">
              <Ban size={24} className="text-red-400 shrink-0 mt-1" />
              <div className="space-y-3 text-sm">
                <p>NIRA reserves the right to suspend, restrict, disable, or terminate access to any account, service, feature, or functionality at its sole discretion where necessary to protect users, platform integrity, security, legal compliance, or business operations.</p>
                <p>Termination of access does not waive any rights or obligations that accrued prior to termination.</p>
              </div>
            </div>
          </section>

          {/* 18. Entire Agreement & 19. Severability */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">18</span> ENTIRE AGREEMENT
              </h2>
              <div className="flex gap-3 text-sm">
                <FileText size={20} className="text-indigo-400 shrink-0 mt-1" />
                <p>These Terms of Service constitute the entire agreement between you and NIRA regarding the use of the platform and supersede any prior agreements, understandings, communications, or representations relating to the services.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">19</span> SEVERABILITY
              </h2>
              <div className="flex gap-3 text-sm">
                <Scissors size={20} className="text-amber-500 shrink-0 mt-1" />
                <p>If any provision of these Terms is determined to be invalid, unlawful, or unenforceable, the remaining provisions shall remain in full force and effect.</p>
              </div>
            </div>
          </section>

          {/* 20. Contact Information */}
          <section className="bg-gradient-to-r from-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] to-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] rounded-3xl p-8 md:p-12 text-center mt-12 shadow-sm">
            <h2 className="text-3xl font-bold text-[var(--nira-text)] mb-4 flex items-center justify-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-xl bg-fuchsia-500/10 px-3 py-1.5 rounded">20</span> Contact Information
            </h2>
            <p className="mb-4 text-[var(--nira-subtext)] max-w-xl mx-auto">For questions regarding these Terms of Service, legal matters, account issues, or platform-related concerns, please contact:</p>
            <a href="mailto:support@niraintelligence.com" className="inline-flex items-center gap-2 bg-[var(--nira-text)] text-[var(--nira-bg)] font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)] mb-6">
              support@niraintelligence.com
            </a>
            <p className="text-sm font-semibold tracking-wider text-[var(--nira-text)] uppercase">NIRA — Neural Intelligence & Responsive Assistant</p>
          </section>

          {/* Footer Info */}
          <div className="pt-16 pb-8 text-center text-sm text-[var(--nira-subtext)]">
            <p className="mb-2">Last Updated: June 08, 2026</p>
            <p>© {new Date().getFullYear()} NIRA — Neural Intelligence & Responsive Assistant. All Rights Reserved.</p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
