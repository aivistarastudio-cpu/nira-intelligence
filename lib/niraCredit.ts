import { useState } from "react";

const KEY = "nira_energy";

/* ================= GET CREDIT ================= */

export function getNiraCredits(): number {

  if (typeof window === "undefined") return 10;

  const stored = localStorage.getItem(KEY);

  if (!stored) {
    localStorage.setItem(KEY, "10");
    return 10;
  }

  return Number(stored);
}

/* ================= USE CREDIT HOOK ================= */

export function useNiraCredit() {

  const [energy, setEnergy] = useState<number>(getNiraCredits());

  function useCredit() {

    const current = getNiraCredits();

    if (current <= 0) return false;

    const next = current - 1;

    localStorage.setItem(KEY, String(next));

    setEnergy(next);

    return true;
  }

  return {
    energy,
    setEnergy,
    useCredit,
  };
}
