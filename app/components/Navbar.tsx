"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", path: "/nira/about" },
    { name: "Vision", path: "/nira/vision" },
    { name: "AI Power", path: "/nira/capabilities" },
    { name: "Limits", path: "/nira/limitations" },
    { name: "Pricing", path: "/nira/pricing" },
  ];

  return (
    <div className="relative z-50 px-6 md:px-12 pt-8 md:pt-10 pb-4">

      <div className="relative flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => router.push("/nira")}
          className="text-sm tracking-[0.3em] text-white/80 cursor-pointer hover:text-white transition"
        >
          NIRA
        </h1>

        {/* 💻 DESKTOP NAV */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2">

          <div className="flex items-center gap-6 px-6 py-2 rounded-full backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]">

            {links.map((link) => {
              const active = pathname === link.path;
              const isHover = hovered === link.path;

              return (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  onMouseEnter={() => setHovered(link.path)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative px-3 py-1.5 text-sm transition-all duration-300 ${
                    active
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {link.name}

                  {/* 💎 SOFT HIGHLIGHT (NO GLOW) */}
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      active || isHover
                        ? "bg-white/[0.06]"
                        : "bg-transparent"
                    }`}
                  />

                  {/* 🔹 SUBTLE ACTIVE BORDER */}
                  {active && (
                    <span className="absolute inset-0 rounded-full border border-white/10" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 📱 MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
        >
          <span
            className={`absolute h-[2px] w-6 bg-white/80 transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-white/80 transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-white/80 transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* 📱 MOBILE DROPDOWN */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] p-4 flex flex-col gap-4">

          {links.map((link, i) => (
            <button
              key={link.path}
              onClick={() => {
                router.push(link.path);
                setOpen(false);
              }}
              className={`text-white/60 hover:text-white text-left transition-all duration-500 ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: open ? `${i * 80}ms` : "0ms",
              }}
            >
              {link.name}
            </button>
          ))}

        </div>
      </div>

    </div>
  );
}