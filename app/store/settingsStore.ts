import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  // General
  accentColor: string;
  setAccentColor: (color: string) => void;
  engine: string;
  setEngine: (engine: string) => void;
  autonomy: boolean;
  setAutonomy: (autonomy: boolean) => void;
  lang: string;
  setLang: (lang: string) => void;
  dictation: boolean;
  setDictation: (dictation: boolean) => void;
  voiceModel: string;
  setVoiceModel: (m: string) => void;

  // Personalization
  memoryEnabled: boolean;
  setMemoryEnabled: (b: boolean) => void;
  customInstructions: string;
  setCustomInstructions: (text: string) => void;
  savedMemories: string[];
  addMemory: (m: string) => void;
  deleteMemory: (index: number) => void;
  clearMemories: () => void;

  // Billing
  subscriptionPlan: 'Free' | 'Plus';
  setSubscriptionPlan: (plan: 'Free' | 'Plus') => void;

  // Data Controls
  modelTraining: boolean;
  setModelTraining: (b: boolean) => void;
  locationEnabled: boolean;
  setLocationEnabled: (b: boolean) => void;
  e2eePasskey: string | null;
  setE2eePasskey: (key: string | null) => void;

  // Security
  twoFactor: boolean;
  setTwoFactor: (enabled: boolean) => void;

  // Profile
  avatarUrl: string | null;
  setAvatarUrl: (u: string | null) => void;
  fullName: string;
  setFullName: (n: string) => void;
  profession: string;
  setProfession: (p: string) => void;
  company: string;
  setCompany: (c: string) => void;
  dob: string;
  setDob: (d: string) => void;
  address: string;
  setAddress: (a: string) => void;
  zipCode: string;
  setZipCode: (z: string) => void;
  country: string;
  setCountry: (c: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      accentColor: '#10a37f', // Default green
      setAccentColor: (color) => set({ accentColor: color }),
      
      engine: 'Deep Reasoning (Pro)',
      setEngine: (engine) => set({ engine }),
      
      autonomy: true,
      setAutonomy: (autonomy) => set({ autonomy }),
      
      lang: 'Auto-detect',
      setLang: (lang) => set({ lang }),
      
      dictation: true,
      setDictation: (dictation) => set({ dictation }),

      voiceModel: 'Breeze',
      setVoiceModel: (m) => set({ voiceModel: m }),

      memoryEnabled: true,
      setMemoryEnabled: (b) => set({ memoryEnabled: b }),
      customInstructions: '',
      setCustomInstructions: (text) => set({ customInstructions: text }),
      savedMemories: [
        "User prefers dark mode and minimal UI.",
        "User works as a Software Engineer in India.",
        "User likes step-by-step explanations."
      ],
      addMemory: (m) => set((state) => ({ savedMemories: [...state.savedMemories, m] })),
      deleteMemory: (index) => set((state) => ({ 
        savedMemories: state.savedMemories.filter((_, i) => i !== index) 
      })),
      clearMemories: () => set({ savedMemories: [] }),

      subscriptionPlan: 'Free',
      setSubscriptionPlan: (plan) => set({ subscriptionPlan: plan }),

      modelTraining: true,
      setModelTraining: (b) => set({ modelTraining: b }),
      locationEnabled: false,
      setLocationEnabled: (b) => set({ locationEnabled: b }),
      e2eePasskey: null,
      setE2eePasskey: (k) => set({ e2eePasskey: k }),

      twoFactor: false,
      setTwoFactor: (twoFactor) => set({ twoFactor }),

      avatarUrl: null,
      setAvatarUrl: (u) => set({ avatarUrl: u }),
      fullName: '',
      setFullName: (n) => set({ fullName: n }),
      profession: '',
      setProfession: (p) => set({ profession: p }),
      company: '',
      setCompany: (c) => set({ company: c }),
      dob: '',
      setDob: (d) => set({ dob: d }),
      address: '',
      setAddress: (a) => set({ address: a }),
      zipCode: '',
      setZipCode: (z) => set({ zipCode: z }),
      country: 'India',
      setCountry: (c) => set({ country: c }),
    }),
    {
      name: 'nira-settings',
    }
  )
);
