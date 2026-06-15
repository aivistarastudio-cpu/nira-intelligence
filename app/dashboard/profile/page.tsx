"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/lib/getUser";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { useSettingsStore } from "../../store/settingsStore";

export default function ProfilePage({ passedUser }: { passedUser?: any }) {
  const [user, setUser] = useState<any>(passedUser || null);
  const [isLoading, setIsLoading] = useState(!passedUser);

  const { avatarUrl: storeAvatar, fullName: storeName } = useSettingsStore();

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    if (passedUser) {
      setUser(passedUser);
      setName(passedUser.name || storeName || "");
      setIsLoading(false);
      return;
    }

    const load = async () => {
      const u = await getCurrentUser();
      if (u) {
        setUser(u);
        setName(u.name || storeName || "");
      }
      setIsLoading(false);
    };
    load();
  }, [passedUser, storeName]);

  const displayAvatar = user?.avatar_url || storeAvatar || null;
  const displayName = user?.name || storeName || "Intelligence User";
  const displayEmail = user?.email || "intelligence@workspace.local";
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  return (
    <div className="w-full flex items-center justify-center pointer-events-auto p-4 md:p-0">
      
      {/* SOLID PREMIUM CARD (Matching Settings Modal) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="
          relative w-full max-w-[400px]
          rounded-2xl
          bg-[var(--nira-surface)]
          border border-[var(--nira-border)]/60
          shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          overflow-hidden
          p-8 flex flex-col items-center text-center
        "
      >
        {/* AVATAR */}
        <div className="relative mb-5 group">
          <div className="
            w-[100px] h-[100px]
            rounded-full
            bg-[var(--nira-text)]/[0.05]
            border border-[var(--nira-border)]/40
            p-1.5
            transition-transform duration-300 ease-out group-hover:scale-105
          ">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[var(--nira-text)]/[0.02]">
              {isLoading ? (
                <div className="w-full h-full animate-pulse bg-[var(--nira-text)]/[0.1]" />
              ) : displayAvatar ? (
                <img src={displayAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[36px] font-medium text-[var(--nira-subtext)] tracking-tight">
                  {initial}
                </span>
              )}
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--nira-accent)] border-[3px] border-[var(--nira-surface)] flex items-center justify-center shadow-sm">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        </div>

        {/* NAME & EMAIL */}
        <div className="mb-8 w-full">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-2.5">
              <div className="h-6 w-3/5 bg-[var(--nira-text)]/[0.05] rounded-full animate-pulse" />
              <div className="h-4 w-2/5 bg-[var(--nira-text)]/[0.02] rounded-full animate-pulse" />
            </div>
          ) : (
            <>
              <h2 className="text-[22px] font-semibold text-[var(--nira-text)] tracking-tight leading-tight">
                {displayName}
              </h2>
              <p className="text-[14px] text-[var(--nira-subtext)] mt-1 font-medium">
                {displayEmail}
              </p>
            </>
          )}
        </div>

        {/* METRICS ROW (Settings Panel Style) */}
        <div className="w-full space-y-2 mb-8">
          <div className="flex items-center justify-between p-3.5 px-4 rounded-xl bg-[var(--nira-bg)] border border-[var(--nira-border)]/60 hover:border-[var(--nira-border)] transition-colors">
            <span className="text-[13px] text-[var(--nira-subtext)] font-medium">Current Plan</span>
            <span className="text-[13px] text-[var(--nira-text)] font-semibold">Intelligence Base</span>
          </div>
          <div className="flex items-center justify-between p-3.5 px-4 rounded-xl bg-[var(--nira-bg)] border border-[var(--nira-border)]/60 hover:border-[var(--nira-border)] transition-colors">
            <span className="text-[13px] text-[var(--nira-subtext)] font-medium">Member Since</span>
            <span className="text-[13px] text-[var(--nira-text)] font-semibold">2026</span>
          </div>
        </div>

        {/* EDIT BUTTON (Solid Action Style) */}
        <button
          onClick={() => setIsOpen(true)}
          className="
            w-full py-3.5
            rounded-xl
            bg-[var(--nira-text)]/[0.04]
            border border-[var(--nira-border)]/50
            text-[14px] font-semibold text-[var(--nira-text)]
            hover:bg-[var(--nira-text)]/[0.08]
            active:scale-[0.98]
            transition-all duration-200 ease-out
          "
        >
          Edit Profile
        </button>
      </motion.div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]"
            />

            {/* Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="
                relative
                w-full max-w-[360px]
                rounded-2xl
                bg-[var(--nira-surface)]
                border border-[var(--nira-border)]/60
                shadow-[0_40px_80px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.8)]
                p-6
              "
            >
              <div className="text-center mb-6">
                <h3 className="text-[17px] font-semibold text-[var(--nira-text)] tracking-tight">
                  Edit Name
                </h3>
                <p className="text-[13px] text-[var(--nira-subtext)] mt-1">
                  Enter your display name.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    w-full px-4 py-3
                    rounded-xl
                    bg-[var(--nira-bg)]
                    border border-[var(--nira-border)]/60
                    text-[14px] text-[var(--nira-text)] font-medium
                    placeholder:text-[var(--nira-subtext)]/50
                    outline-none
                    focus:border-[var(--nira-accent)] focus:ring-1 focus:ring-[var(--nira-accent)]/30
                    transition-all duration-200
                  "
                  placeholder="Name"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-[var(--nira-border)]/60 text-[14px] font-semibold text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.04] transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    const { error } = await supabase.auth.updateUser({
                      data: { name },
                    });

                    if (!error) {
                      setUser((prev: any) => ({ ...prev, name }));
                      useSettingsStore.getState().setFullName(name); // update store directly
                      setIsOpen(false);
                    } else {
                      console.error(error);
                    }
                  }}
                  className="
                    flex-1 py-3 rounded-xl 
                    bg-[var(--nira-text)] hover:opacity-90
                    text-[14px] font-semibold text-[var(--nira-bg)] 
                    active:scale-[0.98] transition-all
                  "
                >
                  Done
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}