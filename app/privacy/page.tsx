"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Eye, Lock, Server, MapPin, Trash2, Globe, MessageSquareDashed, Share2, Baby, BrainCircuit, AlertTriangle, RefreshCw, Plane, ShieldAlert, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-500/5 blur-[120px]" />
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
            <ShieldCheck size={14} /> Legal Document
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--nira-text)] to-[color-mix(in_srgb,var(--nira-text)_50%,transparent)]">
            Privacy Policy
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
            <p className="text-xl text-[var(--nira-text)] font-semibold mb-4">Welcome to NIRA (Neural Intelligence & Responsive Assistant).</p>
            <p className="mb-4">
              NIRA is committed to protecting your privacy and maintaining the security of your personal information. This Privacy Policy explains how we collect, use, store, process, protect, and disclose information.
            </p>
            <p className="font-medium text-fuchsia-600 dark:text-fuchsia-400">
              By accessing or using NIRA, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--nira-border)] to-transparent my-12" />

          {/* 1. Information We Collect */}
          <section className="space-y-6 pt-4">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">01</span> INFORMATION WE COLLECT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] p-6 rounded-2xl hover:border-blue-500/50 transition-colors">
                <h3 className="text-[var(--nira-text)] font-semibold mb-3 flex items-center gap-2"><Eye size={18} className="text-blue-500"/> Account Information</h3>
                <p className="text-sm text-[var(--nira-subtext)] mb-4">When you create an account, we collect Name, Email address, Profile information, and Authentication data.</p>
              </div>
              <div className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
                <h3 className="text-[var(--nira-text)] font-semibold mb-3 flex items-center gap-2"><Lock size={18} className="text-orange-500"/> User Content</h3>
                <p className="text-sm text-[var(--nira-subtext)] mb-4">Messages, Prompts, Files, Images, Documents, and Feedback you voluntarily provide.</p>
              </div>
              <div className="bg-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] p-6 rounded-2xl hover:border-green-500/50 transition-colors">
                <h3 className="text-[var(--nira-text)] font-semibold mb-3 flex items-center gap-2"><Server size={18} className="text-green-500"/> Technical Information</h3>
                <p className="text-sm text-[var(--nira-subtext)] mb-4">Browser type, Device type, Operating system, Language, Time zone, and Application version.</p>
              </div>
            </div>
          </section>

          {/* 2. Location Information */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">02</span> LOCATION INFORMATION
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-blue-500 mt-1" />
                <p>NIRA may collect approximate location information based on your IP address to provide localized services, ensure platform security, and analyze regional usage. We do not track precise, real-time GPS locations unless explicitly permitted by the user for specific features.</p>
              </div>
            </div>
          </section>

          {/* 3. User Conversations */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">03</span> USER CONVERSATIONS
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MessageSquareDashed size={24} className="text-purple-500 mt-1" />
                <div className="space-y-4">
                  <p>NIRA processes user conversations, prompts, inputs, and interactions to provide requested services, generate responses, maintain platform functionality, and improve user experience.</p>
                  <p>We do not intentionally use private user conversations to publicly disclose personal information. However, users should avoid submitting highly sensitive information (e.g., Passwords, Banking credentials, Medical records) as part of their conversations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. AI Processing */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">04</span> AI PROCESSING
            </h2>
            <p>NIRA uses advanced artificial intelligence models to analyze your inputs and generate outputs. Where permitted by applicable law, NIRA may analyze aggregated and anonymized usage patterns to improve its products, AI capabilities, and safety systems.</p>
          </section>

          {/* 5. Data Storage & 6. Security */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-2">05</span> DATA STORAGE
              </h2>
              <p className="text-sm">Information may be stored using secure cloud infrastructure globally. We rely on top-tier service providers to ensure high availability and redundancy for your data.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-2">06</span> SECURITY
              </h2>
              <p className="text-sm">We implement technical measures like encryption, access controls, and threat detection. However, no system can guarantee absolute security. Users must take reasonable precautions to protect their accounts.</p>
            </div>
          </section>

          {/* 7. Cookies & 8. Data Retention */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-2">07</span> COOKIES
              </h2>
              <p className="text-sm">NIRA may use cookies to maintain sessions, remember preferences, and analyze usage. You may modify browser settings to manage cookies, though disabling them may affect functionality.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-2">08</span> DATA RETENTION
              </h2>
              <p className="text-sm">We retain information only for as long as reasonably necessary to provide services, maintain security, resolve disputes, enforce agreements, and comply with legal obligations.</p>
            </div>
          </section>

          {/* 9. Account Deletion & 10. User Rights */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">09</span> ACCOUNT DELETION
              </h2>
              <div className="flex gap-3 text-sm">
                <Trash2 size={20} className="text-red-500 shrink-0" />
                <p>Users may request the deletion of their accounts and associated personal data at any time. Upon a verified request, we will delete or anonymize your data, except where retention is required by law or for legitimate security purposes.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">10</span> USER RIGHTS
              </h2>
              <p className="text-sm">Subject to applicable law, users may have the right to access, correct, delete, or restrict processing of their personal information. Requests can be submitted through our official support channels.</p>
            </div>
          </section>

          {/* 11. Third-Party Services & 12. International Users */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">11</span> THIRD-PARTY SERVICES
              </h2>
              <p className="text-sm">NIRA may integrate with third-party technologies. Such services may be governed by their own privacy policies. NIRA is not responsible for the privacy practices of independent third-party services.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[var(--nira-text)] mb-4 flex items-center">
                <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded mr-3">12</span> INTERNATIONAL USERS
              </h2>
              <div className="flex gap-3 text-sm">
                <Globe size={20} className="text-teal-500 shrink-0" />
                <p>NIRA operates globally. By using NIRA, users acknowledge and consent to the processing, transfer, and storage of their information in jurisdictions different from their location.</p>
              </div>
            </div>
          </section>

          {/* 13. Information Sharing */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">13</span> INFORMATION SHARING
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Share2 size={24} className="text-pink-500 mt-1" />
                <div className="space-y-4">
                  <p className="font-semibold text-[var(--nira-text)]">NIRA does not sell personal information.</p>
                  <p>We may share information with trusted service providers that assist us in operating authentication systems, cloud infrastructure, hosting, analytics, payment processing, customer support, security monitoring, and related platform services.</p>
                  <p>Information may also be disclosed when required by applicable law, legal process, court order, governmental request, or when necessary to protect the rights, safety, security, property, users, or operations of NIRA.</p>
                  <p>In the event of a merger, acquisition, corporate restructuring, financing, sale of assets, or similar business transaction, information may be transferred as part of that transaction, subject to applicable legal requirements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 14. Children's Privacy */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">14</span> CHILDREN'S PRIVACY
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Baby size={24} className="text-yellow-500 mt-1" />
                <div className="space-y-4">
                  <p>NIRA is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13 years of age.</p>
                  <p>If NIRA becomes aware that personal information has been collected from a child without appropriate authorization, we may take reasonable steps to delete such information as quickly as reasonably possible.</p>
                  <p>Parents or legal guardians who believe that a child may have provided personal information to NIRA may contact us through our official support channels.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 15. Artificial Intelligence Limitations */}
          <section className="my-16">
            <div className="relative bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-orange-500/30 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <BrainCircuit size={28} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--nira-text)] mb-2">15. ARTIFICIAL INTELLIGENCE LIMITATIONS</h2>
                  <p className="text-orange-600 dark:text-orange-400 font-medium text-sm">IMPORTANT DISCLAIMER REGARDING ARTIFICIAL INTELLIGENCE</p>
                </div>
              </div>

              <div className="space-y-6 text-[var(--nira-text)]">
                <p>NIRA uses artificial intelligence technologies to generate responses, recommendations, analyses, summaries, and other outputs.</p>
                <p>Artificial intelligence is an evolving technology and may occasionally produce information that is inaccurate, incomplete, outdated, misleading, biased, or otherwise incorrect.</p>
                
                <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
                  <p className="font-semibold mb-4 text-[var(--nira-text)]">Users acknowledge and agree that:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">•</span> 
                      <span>AI-generated content may contain errors or inaccuracies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">•</span> 
                      <span>AI-generated responses should not be treated as guaranteed facts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">•</span> 
                      <span>AI-generated information may not always reflect the most current information available</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">•</span> 
                      <span>Users are responsible for independently verifying important information before relying upon it</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1">•</span> 
                      <span>NIRA is not a substitute for professional legal, financial, medical, accounting, investment, engineering, or other professional advice</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-3 bg-orange-500/10 text-orange-700 dark:text-orange-300 px-5 py-4 rounded-xl border border-orange-500/20 font-medium">
                  <AlertTriangle size={20} className="shrink-0" />
                  <p>Users assume responsibility for evaluating the suitability, accuracy, and reliability of AI-generated outputs before making decisions based on such information.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 16. Changes to This Privacy Policy */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">16</span> CHANGES TO THIS PRIVACY POLICY
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <RefreshCw size={24} className="text-indigo-500 mt-1" />
                <div className="space-y-4">
                  <p>NIRA may update, modify, revise, or replace this Privacy Policy from time to time to reflect changes in technology, legal requirements, business practices, products, services, artificial intelligence capabilities, or platform operations.</p>
                  <p>When material changes are made, the updated version will be published with a revised "Last Updated" date. Continued use of NIRA following the publication of updates constitutes acceptance of the revised Privacy Policy.</p>
                  <p>Users are encouraged to review this Privacy Policy periodically to remain informed about how information is collected, used, stored, processed, and protected.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 17. Data Transfers */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">17</span> DATA TRANSFERS
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Plane size={24} className="text-cyan-500 mt-1" />
                <div className="space-y-4">
                  <p>Your information may be processed, transferred, and stored in countries other than your country of residence.</p>
                  <p>By using NIRA, you acknowledge and consent to such transfers where permitted by applicable law.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 18. Sensitive Information */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">18</span> SENSITIVE INFORMATION
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-bg)_80%,transparent)] border border-red-500/30 rounded-2xl p-6 shadow-[0_0_30px_-10px_rgba(239,68,68,0.1)] hover:border-red-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-red-500/10 rounded-xl">
                  <ShieldAlert size={24} className="text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--nira-text)] mb-3">Users should not submit highly sensitive information through NIRA.</p>
                  <p className="text-sm">This includes passwords, banking credentials, payment card information, government-issued identification numbers, medical records, or confidential business information unless specifically required by a feature of the platform.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 19. Feedback and Suggestions */}
          <section className="space-y-4 pt-6">
            <h2 className="text-2xl font-semibold text-[var(--nira-text)] flex items-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-sm bg-fuchsia-500/10 px-2 py-1 rounded">19</span> FEEDBACK AND SUGGESTIONS
            </h2>
            <div className="bg-[color-mix(in_srgb,var(--nira-text)_3%,transparent)] border border-[var(--nira-border)] rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MessageCircle size={24} className="text-emerald-500 mt-1" />
                <p>If users provide suggestions, ideas, feature requests, or feedback regarding NIRA, we may use such feedback to improve our products and services without obligation or compensation.</p>
              </div>
            </div>
          </section>

          {/* 20. Contact Information */}
          <section className="bg-gradient-to-r from-[color-mix(in_srgb,var(--nira-text)_5%,transparent)] to-[color-mix(in_srgb,var(--nira-bg)_50%,transparent)] backdrop-blur-md border border-[var(--nira-border)] rounded-3xl p-8 md:p-12 text-center mt-12 shadow-sm">
            <h2 className="text-3xl font-bold text-[var(--nira-text)] mb-4 flex items-center justify-center gap-3">
              <span className="text-fuchsia-600 dark:text-fuchsia-400 font-mono text-xl bg-fuchsia-500/10 px-3 py-1.5 rounded">20</span> Contact Information
            </h2>
            <p className="mb-8 text-[var(--nira-subtext)] max-w-xl mx-auto">For privacy-related questions, concerns, or requests, please contact NIRA through our official support channel.</p>
            <a href="mailto:support@niraintelligence.com" className="inline-flex items-center gap-2 bg-[var(--nira-text)] text-[var(--nira-bg)] font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_-10px_rgba(249,115,22,0.4)]">
              support@niraintelligence.com
            </a>
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
