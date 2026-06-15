export const ENERGY_KEY = "nira_energy";

/* ===== GET ENERGY ===== */
export function getEnergy() {
  if (typeof window === "undefined") return 10;

  const value = localStorage.getItem(ENERGY_KEY);
  return value ? Number(value) : 10; // first user = 10 free credits
}

/* ===== USE ENERGY ===== */
export function consumeEnergy() {
  const current = getEnergy();

  const next = Math.max(current - 1, 0);

  localStorage.setItem(ENERGY_KEY, String(next));

  window.dispatchEvent(new Event("nira_energy_update"));

  return next;
}

/* ===== ADD ENERGY (AFTER BILLING) ===== */
export function addEnergy(amount:number) {
  const current = getEnergy();

  localStorage.setItem(ENERGY_KEY, String(current + amount));

  window.dispatchEvent(new Event("nira_energy_update"));
}
