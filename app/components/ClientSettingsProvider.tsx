'use client';
import { useEffect } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export function ClientSettingsProvider() {
  const accentColor = useSettingsStore(state => state.accentColor);

  useEffect(() => {
    // Inject globally
    document.documentElement.style.setProperty('--nira-accent', accentColor);
    
    // Also add a style tag to easily use Tailwind arbitrary values
    let styleEl = document.getElementById('nira-dynamic-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'nira-dynamic-styles';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      .bg-nira-accent { background-color: ${accentColor} !important; }
      .text-nira-accent { color: ${accentColor} !important; }
      .border-nira-accent { border-color: ${accentColor} !important; }
      .ring-nira-accent { --tw-ring-color: ${accentColor} !important; }
    `;
  }, [accentColor]);

  return null;
}
