import React from "react";

/* ==========================================
 * 🛡️ INLINE CSS ANIMATIONS INJECTED SAFELY
 * ========================================== */
export const PremiumAnimations = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes premiumFadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes premiumScaleIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes ambientShine {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes materializeText {
      0% { filter: blur(4px); opacity: 0.4; }
      100% { filter: blur(0px); opacity: 1; }
    }
    .animate-premium-fade {
      animation: premiumFadeIn 0.3s ease-out forwards;
    }
    .animate-premium-scale {
      animation: premiumScaleIn 0.2s ease-out forwards;
    }
    .animate-ambient-shine {
      background-size: 200% auto;
      animation: ambientShine 8s linear infinite;
    }
    .animate-materialize {
      animation: materializeText 0.6s cubic-bezier(0.2, 0.9, 0.1, 1) forwards;
    }
    .custom-scrollbar::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 99px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    .latex-display {
      font-size: 1.1em;
      line-height: 1.4;
    }
  `}} />
);
