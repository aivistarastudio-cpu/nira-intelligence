import { tableThemes } from "./tableThemes";
import type { TableTheme } from "./tableTheme.types";

export function getTableTheme(): TableTheme {
  const index = Math.floor(Math.random() * tableThemes.length);
  const theme = tableThemes[index];

  return {
    wrapper: theme.wrapper || "bg-white/5 border-white/10",
    thead: theme.thead || "bg-white/[0.04]",
    th: theme.th || "text-blue-300",
    tr: theme.tr || "even:bg-white/[0.02] hover:bg-white/[0.06]",
    td: theme.td || "text-white/90",
    name: theme.name,
  };
}