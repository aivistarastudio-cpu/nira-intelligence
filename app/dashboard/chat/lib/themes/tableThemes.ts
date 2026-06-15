import type { TableTheme } from "./tableTheme.types";

export const tableThemes: TableTheme[] = [
  {
    name: "glass",
    wrapper: "bg-white/5 backdrop-blur-xl border-white/10",
    thead: "bg-white/[0.04]",
    th: "text-blue-300",
    tr: "hover:bg-white/5",
    td: "text-white/90",
  },
  {
    name: "zebra",
    wrapper: "bg-transparent border-white/5",
    thead: "bg-white/[0.03]",
    th: "text-white/80",
    tr: "even:bg-white/[0.03]",
    td: "text-white/90",
  },
  {
    name: "neon",
    wrapper:
      "bg-black border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    thead: "bg-blue-500/10",
    th: "text-blue-400",
    tr: "hover:bg-blue-500/10",
    td: "text-white/90",
  },
  {
    name: "minimal",
    wrapper: "bg-transparent border-white/5",
    thead: "bg-transparent",
    th: "text-white/60",
    tr: "",
    td: "text-white/80",
  },
  {
    name: "premium-dark",
    wrapper: "bg-[#0A0A0A] border-white/10",
    thead: "bg-white/[0.05]",
    th: "text-purple-300",
    tr: "hover:bg-white/5",
    td: "text-white/90",
  },
];