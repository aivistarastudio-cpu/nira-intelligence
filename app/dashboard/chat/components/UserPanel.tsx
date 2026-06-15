"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { User, LogOut, ArrowUpRight, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/app/lib/getUser";
import ProfilePage from "@/app/dashboard/profile/page";
import SettingsModal from "./SettingsModal";
import { useSettingsStore } from "../../../store/settingsStore";



export default function UserPanel() {
  const [open, setOpen] = useState(false);
  
  const [active, setActive] = useState<string | null>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [panel, setPanel] = useState<"profile" | "settings" | null>(null);

  const { avatarUrl, fullName } = useSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };
    load();
  }, []);

  // outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
      setActive(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ICON */}
      <div ref={triggerRef} className="relative group/avatar">
        <button
          onClick={() => setOpen(!open)}
          className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 outline-none ${open ? 'bg-[var(--nira-text)]/[0.06]' : 'hover:bg-[var(--nira-text)]/[0.04]'}`}
        >
          <div className="relative w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center shadow-sm border border-[var(--nira-border)]/40 transition-transform duration-300 group-hover/avatar:scale-105 z-10">
            {user?.avatar_url || avatarUrl ? (
              <img src={user?.avatar_url || avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90" />
                {/* Premium glassy overlay inside orb */}
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 mix-blend-overlay backdrop-blur-[1px]" />
                <span className="relative text-white text-[12.5px] font-bold tracking-wider z-10 drop-shadow-md">
                  {(fullName ? fullName.charAt(0) : user?.name?.charAt(0) || "N").toUpperCase()}
                </span>
              </>
            )}
          </div>
          {/* Subtle Outer Glow that breathes on hover */}
          <div className={`absolute inset-0 rounded-full blur-[4px] transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 group-hover/avatar:opacity-60'} ${(user?.avatar_url || avatarUrl) ? 'bg-indigo-500/30' : 'bg-gradient-to-r from-indigo-500/50 to-pink-500/50'}`} />
        </button>
      </div>

      {/* DROPDOWN */}
      {mounted &&
        createPortal(
          <div
            ref={dropdownRef}
            className={`fixed top-[60px] right-6 w-56 bg-[var(--nira-surface)]/95 backdrop-blur-xl border border-[var(--nira-border)] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-2 z-[99999] transition-all duration-200 ease-out origin-top-right ${
              open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            {/* USER */}
            <div className="px-3 py-2 border-b border-[var(--nira-border)] mb-1 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shadow-sm shrink-0 border border-[var(--nira-border)]/40 relative">
                {user?.avatar_url || avatarUrl ? (
                  <img src={user?.avatar_url || avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-[13px] font-bold drop-shadow-sm">
                      {(fullName ? fullName.charAt(0) : user?.name?.charAt(0) || "U").toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                <div className="text-[13.5px] font-semibold text-[var(--nira-text)] truncate">
                  {fullName || user?.name || "Intelligence User"}
                </div>
                <div className="text-[12px] text-[var(--nira-subtext)] truncate">
                  {user?.email || "intelligence@workspace.local"}
                </div>
              </div>
            </div>

            {/* MENU (PROFILE & SETTINGS) */}
            {[
              { key: "profile", icon: <User size={14} />, label: "Profile" },
              { key: "settings", icon: <Settings size={14} />, label: "Settings" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActive(item.key);

                  if (item.key === "profile") {
                    setPanel("profile");
                  } else if (item.key === "settings") {
                    setPanel("settings");
                  }

                  setOpen(false);
                }}
                className={`relative group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all duration-150 ease-out ${
                  active === item.key
                    ? "bg-[var(--nira-text)]/[0.06] text-[var(--nira-text)]"
                    : "text-[var(--nira-subtext)] hover:bg-[var(--nira-text)]/[0.04] hover:text-[var(--nira-text)]"
                }`}
              >
                <span className="absolute inset-0 rounded-lg opacity-0 group-active:opacity-100 bg-[var(--nira-text)]/[0.05] transition" />
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* DIVIDER */}
            <div className="my-2 h-px bg-[var(--nira-border)]" />

            {/* UPGRADE */}
<button
  onClick={() => {
    setActive("upgrade");
    setOpen(false);

    // 🚀 open billing page
    router.push("/dashboard/billing");
  }}
  className={`relative group w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ease-out ${
    active === "upgrade"
      ? "bg-[var(--nira-text)]/[0.06] text-[var(--nira-text)]"
      : "text-[var(--nira-subtext)] hover:bg-[var(--nira-text)]/[0.04] hover:text-[var(--nira-text)]"
  }`}
>
  <span className="group-hover:translate-x-[2px] transition">
    Upgrade Plan
  </span>
  <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100" />
</button>

            {/* DIVIDER */}
            <div className="my-2 h-px bg-[var(--nira-border)]" />

            {/* LOGOUT */}
            <button
              onClick={() => {
                setActive("logout");
                setOpen(false);
              }}
              className={`relative group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ease-out ${
                active === "logout"
                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                  : "text-red-500/80 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
              }`}
            >
              <LogOut size={14} className="opacity-80" />
              <span>Logout</span>
            </button>
          </div>,
          document.body
        )}

      {/* PROFILE MODAL */}
      {panel === "profile" &&
        mounted &&
        createPortal(
          <div
            onClick={() => setPanel(null)}
            className="fixed inset-0 z-[999999] bg-[var(--nira-text)]/[0.05] backdrop-blur-[4px] flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[440px]"
            >
              <ProfilePage passedUser={user} />
            </div>
          </div>,
          document.body
        )}

      {/* SETTINGS MODAL */}
      {panel === "settings" && mounted && createPortal(
        <SettingsModal onClose={() => setPanel(null)} />,
        document.body
      )}
    </>
  );
}