"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useSettingsStore } from "../../../store/settingsStore";
import { X, Settings as SettingsIcon, User, CreditCard, Database, UserCircle, Shield, Trash2, ArrowRight } from "lucide-react";

type Tab = "general" | "personalization" | "billing" | "data" | "account";

// ================= PREMIUM UI COMPONENTS =================
function Switch({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-nira-accent' : 'bg-gray-200 dark:bg-[#4a4a4a]'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}

function Select({ value, options, onChange }: { value: string, options: string[], onChange: (v: string) => void }) {
  return (
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-[var(--nira-text)] text-[14px] py-1 pl-3 pr-8 rounded-md outline-none cursor-pointer hover:bg-[var(--nira-text)]/[0.04] transition-colors"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--nira-subtext)] group-hover:text-[var(--nira-text)] transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  )
}

function SettingRow({ label, desc, action, danger }: { label: string, desc?: string, action: React.ReactNode, danger?: boolean }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--nira-border)]/40 last:border-0">
      <div className="pr-8">
        <div className={`text-[14px] ${danger ? 'text-red-500' : 'text-[var(--nira-text)]'}`}>{label}</div>
        {desc && <div className="text-[13px] text-[var(--nira-subtext)] mt-1">{desc}</div>}
      </div>
      <div className="shrink-0 flex items-center">
        {action}
      </div>
    </div>
  )
}

function ActionButton({ children, onClick, danger }: { children: React.ReactNode, onClick?: () => void, danger?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full border text-[13px] font-medium transition-colors ${
        danger 
        ? 'border-red-500/30 text-red-500 hover:bg-red-500/10' 
        : 'border-[var(--nira-border)]/60 text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.04]'
      }`}
    >
      {children}
    </button>
  )
}

// ================= TABS =================

function GeneralSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Connect to Zustand store
  const { 
    accentColor, setAccentColor,
    engine, setEngine,
    autonomy, setAutonomy,
    lang, setLang,
    dictation, setDictation,
    voiceModel, setVoiceModel
  } = useSettingsStore();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="animate-fade-in pb-4">
      {/* Interface Section */}
      <div className="text-[12px] font-bold text-[var(--nira-subtext)] uppercase tracking-wider mb-1 mt-2">Interface Preferences</div>
      <div className="mb-6">
        <SettingRow 
          label="Appearance" 
          action={
            <Select 
              value={theme || "system"} 
              options={["light", "dark", "rose", "system"]} 
              onChange={setTheme} 
            />
          } 
        />
        <SettingRow 
          label="Accent Color" 
          desc="Customize the primary color for buttons and highlights."
          action={
            <div className="flex items-center gap-2 bg-[var(--nira-text)]/[0.03] border border-[var(--nira-border)]/50 rounded-full px-2 py-1.5">
              {['#6366f1', '#10a37f', '#f97316', '#ec4899', '#8b5cf6', '#ef4444', '#06b6d4'].map(color => (
                <button 
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-4 h-4 rounded-full border border-black/10 dark:border-white/10 outline-none hover:scale-125 transition-transform shrink-0 ${accentColor === color ? 'ring-2 ring-offset-2 ring-offset-[var(--nira-surface)] ring-nira-accent' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <div className="w-[1px] h-4 bg-[var(--nira-border)] mx-1" />
              <label className="relative w-4 h-4 rounded-full overflow-hidden cursor-pointer border border-black/10 dark:border-white/10 hover:scale-125 transition-transform flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500" title="Custom Color">
                <input 
                  type="color" 
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="absolute opacity-0 w-8 h-8 cursor-pointer" 
                />
              </label>
            </div>
          } 
        />
      </div>

      {/* AGI Core Settings Section */}
      <div className="text-[12px] font-bold text-[var(--nira-text)] uppercase tracking-wider mb-1 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
        Nira Core Settings
      </div>
      <div className="mb-6">
        <SettingRow 
          label="Reasoning Depth" 
          desc="Select how deeply Nira should think before responding to complex prompts."
          action={<Select value={engine} options={["Fast (Nira-Nano)", "Deep Reasoning (Pro)", "Max Intelligence (o1-level)"]} onChange={setEngine} />} 
        />
        <SettingRow 
          label="Autonomous Mode" 
          desc="Allow Nira to autonomously search the web, run code, and fix errors in the background."
          action={<Switch checked={autonomy} onChange={setAutonomy} />} 
        />
      </div>

      {/* Voice & Audio Section */}
      <div className="text-[12px] font-bold text-[var(--nira-subtext)] uppercase tracking-wider mb-1">Voice & Input</div>
      <div>
        <SettingRow 
          label="Spoken Language" 
          action={<Select value={lang} options={["Auto-detect", "English (US)", "Hindi"]} onChange={setLang} />} 
        />
        <SettingRow 
          label="Enable Dictation" 
          desc="Use neural speech-to-text dictation in the chat composer."
          action={<Switch checked={dictation} onChange={setDictation} />} 
        />
        <SettingRow 
          label="Neural Voice Model" 
          action={<Select value={voiceModel || "Breeze"} options={["Breeze", "Nova", "Sky", "Cove", "Ember"]} onChange={setVoiceModel} />} 
        />
      </div>
    </div>
  );
}

function PersonalizationSettings() {
  const { 
    memoryEnabled, setMemoryEnabled, 
    customInstructions, setCustomInstructions, 
    savedMemories, deleteMemory, clearMemories 
  } = useSettingsStore();
  
  const [editingInstructions, setEditingInstructions] = useState(false);
  const [managingMemory, setManagingMemory] = useState(false);

  return (
    <div className="animate-fade-in">
      <SettingRow 
        label="Custom instructions" 
        desc="What would you like Nira to know about you to provide better responses?"
        action={
          <button 
            onClick={() => setEditingInstructions(!editingInstructions)}
            className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition"
          >
            {editingInstructions ? "Done" : "Edit"}
          </button>
        } 
      />
      
      {editingInstructions && (
        <div className="mb-6 -mt-1 animate-fade-in">
          <textarea 
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g. Always respond in Python, keep answers concise..."
            className="w-full h-[120px] bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl p-3 text-[14px] text-[var(--nira-text)] outline-none focus:border-nira-accent focus:ring-1 focus:ring-nira-accent/30 resize-none placeholder:text-[var(--nira-subtext)]/50 transition-all"
          />
        </div>
      )}

      <SettingRow 
        label="Memory" 
        desc="Nira will become more helpful as it remembers details and preferences from your chats."
        action={<Switch checked={memoryEnabled} onChange={setMemoryEnabled} />} 
      />
      <SettingRow 
        label="Manage Memory" 
        desc="Review and delete specific memories Nira has saved about you."
        action={
          <button 
            onClick={() => setManagingMemory(!managingMemory)}
            className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition"
          >
            {managingMemory ? "Done" : "Manage"}
          </button>
        } 
      />
      
      {managingMemory && (
        <div className="mb-6 -mt-1 animate-fade-in bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl overflow-hidden shadow-inner">
          {savedMemories.length === 0 ? (
            <div className="p-4 text-center text-[13px] text-[var(--nira-subtext)]">No memories saved yet.</div>
          ) : (
            <div className="max-h-[160px] overflow-y-auto scrollbar-custom">
              {savedMemories.map((mem, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b border-[var(--nira-border)]/40 last:border-0 hover:bg-[var(--nira-text)]/[0.02] transition-colors">
                  <span className="text-[13px] text-[var(--nira-text)] pr-4">{mem}</span>
                  <button onClick={() => deleteMemory(i)} className="text-[var(--nira-subtext)] hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded-md transition-all shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <SettingRow 
        label="Clear Nira's Memory" 
        danger
        desc="Permanently wipe everything Nira has learned about you."
        action={<ActionButton onClick={clearMemories} danger>Clear Memory</ActionButton>} 
      />
    </div>
  );
}

function BillingSettings() {
  const { subscriptionPlan, setSubscriptionPlan } = useSettingsStore();
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (isUpgrading) {
    return (
      <div className="animate-fade-in bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-2xl p-6 mb-6">
        <h3 className="text-[18px] font-semibold text-[var(--nira-text)] mb-2">Upgrade to Nira Plus</h3>
        <p className="text-[14px] text-[var(--nira-subtext)] mb-6">Experience the ultimate intelligence with guaranteed access during peak hours.</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-[14px] text-[var(--nira-text)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-500 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Access to Nira Reasoning and Max Intelligence models
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[var(--nira-text)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-500 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Up to 5x more messages for advanced tasks
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[var(--nira-text)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-500 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Priority processing speed
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--nira-border)]/50">
          <div className="text-[20px] font-bold text-[var(--nira-text)]">$20<span className="text-[14px] font-normal text-[var(--nira-subtext)]">/month</span></div>
          <div className="flex gap-3">
            <button onClick={() => setIsUpgrading(false)} className="px-4 py-2 text-[14px] font-medium text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.05] rounded-full transition-colors">Cancel</button>
            <button 
              onClick={() => {
                setSubscriptionPlan('Plus');
                setIsUpgrading(false);
              }} 
              className="px-6 py-2 rounded-full bg-[var(--nira-accent)] text-white text-[14px] font-medium hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-2"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <SettingRow 
        label="Current Plan" 
        action={
          <div className="flex items-center gap-2">
            {subscriptionPlan === 'Plus' && <div className="w-2 h-2 rounded-full bg-[var(--nira-accent)] shadow-[0_0_8px_var(--nira-accent)] animate-pulse" />}
            <span className={`text-[14px] font-medium mr-2 ${subscriptionPlan === 'Plus' ? 'text-[var(--nira-accent)]' : 'text-[var(--nira-subtext)]'}`}>
              {subscriptionPlan === 'Plus' ? 'Nira Plus' : 'NiraCore Free'}
            </span>
          </div>
        } 
      />
      {subscriptionPlan === 'Free' ? (
        <SettingRow 
          label="Upgrade to Nira Plus" 
          desc="Get access to Nira Reasoning, Vision, and priority speed."
          action={<button onClick={() => setIsUpgrading(true)} className="px-5 py-1.5 rounded-full bg-[var(--nira-accent)] text-white text-[13px] font-medium hover:opacity-90 transition-all shadow-sm">Upgrade</button>} 
        />
      ) : (
        <SettingRow 
          label="Downgrade Plan" 
          desc="Switch back to the free NiraCore tier at the end of your billing cycle."
          action={<ActionButton onClick={() => setSubscriptionPlan('Free')}>Downgrade</ActionButton>} 
        />
      )}
      <SettingRow 
        label="Manage subscription" 
        action={<button className="text-[13px] text-[var(--nira-text)] hover:text-[var(--nira-accent)] transition-colors flex items-center group">Manage <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" /></button>} 
      />
    </div>
  );
}

function DataControlsSettings() {
  const { modelTraining, setModelTraining, locationEnabled, setLocationEnabled, e2eePasskey, setE2eePasskey } = useSettingsStore();
  const [showPolicy, setShowPolicy] = useState(false);
  const [liveLocation, setLiveLocation] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  const [activeSection, setActiveSection] = useState<'links' | 'archived' | 'e2ee' | 'archiveAll' | 'deleteAll' | 'export' | null>(null);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (locationEnabled) {
      setIsLocating(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
              const data = await res.json();
              const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county;
              const state = data.address?.state;
              const country = data.address?.country;
              
              if (city && country) {
                setLiveLocation(`${city}, ${state ? state + ', ' : ''}${country}`);
              } else {
                setLiveLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`);
              }
            } catch (error) {
              setLiveLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`);
            } finally {
              setIsLocating(false);
            }
          },
          (error) => {
            setLiveLocation("Permission denied or location unavailable.");
            setIsLocating(false);
            setLocationEnabled(false);
          }
        );
      } else {
        setLiveLocation("Geolocation is not supported by your browser.");
        setIsLocating(false);
        setLocationEnabled(false);
      }
    } else {
      setLiveLocation(null);
    }
  }, [locationEnabled, setLocationEnabled]);

  const handleAction = (message: string) => {
    setActionSuccess(message);
    setTimeout(() => {
      setActionSuccess(null);
      setActiveSection(null);
    }, 2000);
  };

  if (showPolicy) {
    return (
      <div className="animate-fade-in pb-4">
        <button 
          onClick={() => setShowPolicy(false)}
          className="flex items-center text-[13px] text-[var(--nira-subtext)] hover:text-[var(--nira-text)] mb-4 transition-colors group outline-none"
        >
          <ArrowRight size={14} className="rotate-180 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Data Controls
        </button>
        
        <h3 className="text-[18px] font-semibold text-[var(--nira-text)] mb-4">Privacy, AI Safety & Legal Framework</h3>
        
        <div className="space-y-6 text-[13.5px] text-[var(--nira-text)]/90 leading-relaxed pr-2 h-[380px] overflow-y-auto scrollbar-custom">
          <div>
            <div className="font-bold text-[var(--nira-text)] mb-1 text-[14px]">1. Zero Data Retention (Enterprise & Nira Plus)</div>
            We adhere to a strict Zero Data Retention protocol for all paid tiers. Your prompts, uploaded files, and generated responses are processed securely in ephemeral memory and immediately destroyed post-inference. Nira does not use any data originating from Nira Plus or Enterprise Workspaces for foundational model training.
          </div>
          <div>
            <div className="font-bold text-[var(--nira-text)] mb-1 text-[14px]">2. End-to-End Encryption (E2EE)</div>
            All data in transit is secured using TLS 1.3. For archived and synced histories, Nira utilizes AES-256-GCM military-grade encryption at rest. If the E2EE Passkey feature is enabled, your cryptographic keys never leave your local device hardware, ensuring it is mathematically impossible for third-party interception—including by Nira Engineering staff.
          </div>
          <div>
            <div className="font-bold text-[var(--nira-text)] mb-1 text-[14px]">3. Global Compliance & Auditing (GDPR, CCPA, SOC2 Type II)</div>
            Nira OS operates strictly within the legal bounds of the General Data Protection Regulation (EU GDPR) and the California Consumer Privacy Act (CCPA). You retain absolute sovereignty over your digital footprint, possessing the unconditional right to export, archive, or permanently purge all associated data trails with a single keystroke. Our infrastructure undergoes rigorous independent SOC2 Type II and ISO 27001 compliance auditing.
          </div>
          <div>
            <div className="font-bold text-[var(--nira-text)] mb-1 text-[14px]">4. AI Safety & Alignment Guardrails</div>
            Nira Core cognitive models are structurally aligned using Constitutional AI frameworks designed by leading researchers to automatically reject adversarial prompt injections, malicious code generation, and PII extraction attempts. All autonomous code execution operates exclusively within isolated, ephemeral Docker sandboxes.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-4">
      <SettingRow 
        label="Improve the model for everyone" 
        action={
          <button 
            onClick={() => setModelTraining(!modelTraining)}
            className="flex items-center text-[14px] text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-colors"
          >
            {modelTraining ? 'On' : 'Off'} <ArrowRight size={14} className="ml-1.5" />
          </button>
        } 
      />
      <SettingRow 
        label="Location Services" 
        desc="When enabled, your location helps Nira provide more relevant information, like local recommendations, news, and weather."
        action={<Switch checked={locationEnabled} onChange={setLocationEnabled} />} 
      />
      {locationEnabled && (
        <div className="mb-4 -mt-2 animate-fade-in bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl overflow-hidden shadow-inner p-3 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isLocating ? 'bg-[var(--nira-text)]/[0.05] animate-pulse' : 'bg-emerald-500/10 text-emerald-500'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--nira-subtext)] mb-0.5">Live Location</div>
            <div className="text-[13.5px] font-medium text-[var(--nira-text)] truncate">
              {isLocating ? "Acquiring satellite signal..." : liveLocation}
            </div>
          </div>
        </div>
      )}

      {/* Shared Links */}
      <SettingRow 
        label="Shared links" 
        action={
          <button onClick={() => setActiveSection(activeSection === 'links' ? null : 'links')} className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition">
            {activeSection === 'links' ? 'Close' : 'Manage'}
          </button>
        } 
      />
      {activeSection === 'links' && (
        <div className="mb-4 -mt-1 p-4 bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-medium text-[var(--nira-text)]">Active Links</span>
            <button onClick={() => handleAction("Link copied to clipboard!")} className="text-[12px] text-[var(--nira-accent)] hover:underline">Create New Link</button>
          </div>
          <p className="text-[13px] text-[var(--nira-subtext)] text-center py-2">You have no active shared links.</p>
        </div>
      )}

      {/* Archived Chats */}
      <SettingRow 
        label="Archived chats" 
        action={
          <button onClick={() => setActiveSection(activeSection === 'archived' ? null : 'archived')} className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition">
            {activeSection === 'archived' ? 'Close' : 'Manage'}
          </button>
        } 
      />
      {activeSection === 'archived' && (
        <div className="mb-4 -mt-1 p-4 bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl text-center animate-fade-in">
          <p className="text-[13px] text-[var(--nira-subtext)] mb-3">No archived conversations found.</p>
        </div>
      )}

      {/* E2EE */}
      <SettingRow 
        label="End-to-End Encryption (Beta)" 
        desc="Locally encrypt your conversations using AES-256 before syncing to Nira Cloud."
        action={
          <button onClick={() => setActiveSection(activeSection === 'e2ee' ? null : 'e2ee')} className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition">
            {e2eePasskey ? 'Change Passkey' : 'Set Passkey'}
          </button>
        } 
      />
      {activeSection === 'e2ee' && (
        <div className="mb-4 -mt-1 p-4 bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl animate-fade-in">
          {e2eePasskey ? (
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-emerald-500 font-medium flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> E2EE is Active</span>
              <button onClick={() => setE2eePasskey(null)} className="text-[13px] text-red-500 hover:underline">Remove Passkey</button>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-[var(--nira-subtext)] mb-3">Create a strong passkey to encrypt your data. If you lose this passkey, Nira cannot recover your chats.</p>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  value={passkeyInput} 
                  onChange={(e) => setPasskeyInput(e.target.value)} 
                  placeholder="Enter secure passkey..." 
                  className="flex-1 bg-transparent border border-[var(--nira-border)] rounded-md px-3 py-1.5 text-[13px] text-[var(--nira-text)] outline-none focus:border-[var(--nira-accent)]"
                />
                <button 
                  onClick={() => {
                    if(passkeyInput.length > 3) {
                      setE2eePasskey(passkeyInput);
                      setPasskeyInput('');
                      handleAction("Passkey Saved. Encryption Enabled.");
                    }
                  }} 
                  className="px-4 py-1.5 bg-[var(--nira-accent)] text-white text-[13px] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={passkeyInput.length < 4}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Archive All */}
      <SettingRow 
        label="Archive all chats" 
        action={
          <button onClick={() => setActiveSection(activeSection === 'archiveAll' ? null : 'archiveAll')} className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] border border-[var(--nira-border)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition">
            Archive all
          </button>
        } 
      />
      {activeSection === 'archiveAll' && (
        <div className="mb-4 -mt-1 p-4 bg-[var(--nira-bg)] border border-[var(--nira-border)] rounded-xl flex items-center justify-between animate-fade-in">
          <span className="text-[13px] text-[var(--nira-text)]">Are you sure you want to archive all active chats?</span>
          <div className="flex gap-2">
            <button onClick={() => setActiveSection(null)} className="px-3 py-1.5 text-[13px] text-[var(--nira-subtext)] hover:text-[var(--nira-text)]">Cancel</button>
            <button onClick={() => {
              if (typeof window !== 'undefined' && (window as any).clearNiraChats) {
                (window as any).clearNiraChats();
              } else {
                localStorage.removeItem("NIRA_CHAT_HISTORY");
              }
              handleAction("All chats archived successfully.");
            }} className="px-3 py-1.5 bg-[var(--nira-text)] text-[var(--nira-bg)] text-[13px] font-medium rounded-md hover:opacity-90">Confirm</button>
          </div>
        </div>
      )}

      {/* Delete All */}
      <SettingRow 
        label="Delete all chats" 
        danger
        action={
          <button onClick={() => setActiveSection(activeSection === 'deleteAll' ? null : 'deleteAll')} className="px-3 py-1.5 text-[13px] font-medium text-red-500 border border-red-500/30 rounded-md hover:bg-red-500/10 transition">
            Delete all
          </button>
        } 
      />
      {activeSection === 'deleteAll' && (
        <div className="mb-4 -mt-1 p-4 bg-red-500/5 border border-red-500/20 rounded-xl animate-fade-in">
          <p className="text-[13px] text-red-500/90 font-medium mb-3">WARNING: This will permanently delete all data from Nira Cloud. Type DELETE to confirm.</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={deleteConfirm} 
              onChange={(e) => setDeleteConfirm(e.target.value)} 
              placeholder="Type DELETE" 
              className="flex-1 bg-transparent border border-red-500/30 rounded-md px-3 py-1.5 text-[13px] text-red-500 outline-none focus:border-red-500"
            />
            <button 
              onClick={() => {
                setDeleteConfirm('');
                if (typeof window !== 'undefined' && (window as any).clearNiraChats) {
                  (window as any).clearNiraChats();
                } else {
                  localStorage.removeItem("NIRA_CHAT_HISTORY");
                }
                handleAction("All data permanently deleted.");
              }} 
              disabled={deleteConfirm !== 'DELETE'}
              className="px-4 py-1.5 bg-red-500 text-white text-[13px] font-medium rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      <SettingRow 
        label="Export data" 
        action={
          <button onClick={() => {
            setActiveSection('export');
            // Actually download the data
            try {
              const data = localStorage.getItem("NIRA_CHAT_HISTORY") || "[]";
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "nira_export.json";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              setTimeout(() => handleAction("Data exported successfully. Check your downloads."), 1000);
            } catch(e) {
              setTimeout(() => handleAction("Failed to export data."), 1000);
            }
          }} className="px-3 py-1.5 text-[13px] font-medium text-[var(--nira-text)] border border-[var(--nira-border)] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition">
            {activeSection === 'export' && !actionSuccess ? 'Exporting...' : 'Export'}
          </button>
        } 
      />

      {actionSuccess && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[13px] text-emerald-500 font-medium flex items-center gap-2 animate-fade-in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
          {actionSuccess}
        </div>
      )}

      <SettingRow 
        label="Company Privacy Policy & Legal" 
        action={
          <button 
            onClick={() => setShowPolicy(true)}
            className="flex items-center px-3 py-1.5 text-[13px] rounded-md hover:bg-[var(--nira-text)]/[0.05] transition text-[var(--nira-text)] font-medium"
          >
            Read Policy <ArrowRight size={14} className="ml-1" />
          </button>
        } 
      />
    </div>
  );
}

function AccountSettings() {
  const {
    avatarUrl, setAvatarUrl,
    fullName, setFullName,
    profession, setProfession,
    company, setCompany,
    dob, setDob,
    address, setAddress,
    zipCode, setZipCode,
    country, setCountry
  } = useSettingsStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in pb-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 text-[24px] font-medium overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            fullName ? fullName.charAt(0).toUpperCase() : 'H'
          )}
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAvatarUpload} 
            accept="image/png, image/jpeg, image/gif" 
            className="hidden" 
          />
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-1.5 rounded-full border border-[var(--nira-border)]/60 text-[13px] font-medium text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.04] transition-colors mb-1">
            Upload Avatar
          </button>
          <div className="text-[12px] text-[var(--nira-subtext)]">JPG, GIF or PNG. Max size of 2MB.</div>
        </div>
      </div>

      {/* Personal Details (Data Collection) */}
      <div className="text-[12px] font-bold text-[var(--nira-subtext)] uppercase tracking-wider mb-1 mt-2">Personal Information</div>
      <p className="text-[13px] text-[var(--nira-subtext)] mb-4">Sharing these details helps Nira tailor responses to your specific background and needs.</p>
      
      <div className="mb-8 border border-[var(--nira-border)]/50 rounded-xl overflow-hidden bg-[var(--nira-surface)] px-4">
        <SettingRow 
          label="Full Name" 
          action={<input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. Rahul Sharma" className="bg-transparent border border-[var(--nira-border)]/60 rounded-md px-3 py-1.5 text-[13px] text-[var(--nira-text)] outline-none focus:border-indigo-500 w-[200px] text-right placeholder:text-[var(--nira-subtext)]/50 transition-colors" />} 
        />
        <SettingRow 
          label="Profession / Role" 
          action={<input type="text" value={profession} onChange={e => setProfession(e.target.value)} placeholder="e.g. Software Engineer" className="bg-transparent border border-[var(--nira-border)]/60 rounded-md px-3 py-1.5 text-[13px] text-[var(--nira-text)] outline-none focus:border-indigo-500 w-[200px] text-right placeholder:text-[var(--nira-subtext)]/50 transition-colors" />} 
        />
        <SettingRow 
          label="Company / School" 
          action={<input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Nira Intelligence" className="bg-transparent border border-[var(--nira-border)]/60 rounded-md px-3 py-1.5 text-[13px] text-[var(--nira-text)] outline-none focus:border-indigo-500 w-[200px] text-right placeholder:text-[var(--nira-subtext)]/50 transition-colors" />} 
        />
        <SettingRow 
          label="Date of Birth" 
          action={<input type="date" value={dob} onChange={e => setDob(e.target.value)} className="bg-transparent border border-[var(--nira-border)]/60 rounded-md px-3 py-1.5 text-[13px] text-[var(--nira-text)] outline-none focus:border-indigo-500 w-[200px] text-right placeholder:text-[var(--nira-subtext)]/50 transition-colors [&::-webkit-calendar-picker-indicator]:dark:invert" />} 
        />
        <div className="flex items-start justify-between py-4 border-b border-[var(--nira-border)]/40 last:border-0">
          <div className="text-[14px] text-[var(--nira-text)] pt-2">Full Address</div>
          <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. 123 Tech Park, Mumbai" className="bg-transparent border border-[var(--nira-border)]/60 rounded-md px-3 py-2 text-[13px] text-[var(--nira-text)] outline-none focus:border-indigo-500 w-[200px] h-[72px] resize-none placeholder:text-[var(--nira-subtext)]/50 transition-colors text-right" />
        </div>
        <SettingRow 
          label="ZIP / Postal Code" 
          action={<input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} placeholder="e.g. 400001" className="bg-transparent border border-[var(--nira-border)]/60 rounded-md px-3 py-1.5 text-[13px] text-[var(--nira-text)] outline-none focus:border-indigo-500 w-[200px] text-right placeholder:text-[var(--nira-subtext)]/50 transition-colors" />} 
        />
        <div className="flex items-center justify-between py-4 border-b border-[var(--nira-border)]/40 last:border-0">
          <div className="text-[14px] text-[var(--nira-text)]">Country</div>
          <Select 
            value={country} 
            options={[
              "India", "United States", "United Kingdom", "Australia", "Canada", 
              "Germany", "France", "Japan", "China", "Brazil", "South Africa", 
              "Russia", "Italy", "Spain", "Mexico", "Indonesia", "Saudi Arabia", 
              "UAE", "Singapore", "New Zealand", "Other"
            ]} 
            onChange={setCountry} 
          />
        </div>
      </div>

      <div className="text-[12px] font-bold text-[var(--nira-subtext)] uppercase tracking-wider mb-1 mt-8">Account Management</div>
      <div className="mb-4">
        <SettingRow 
          label="Email" 
          action={<span className="text-[14px] text-[var(--nira-subtext)]">user@example.com</span>} 
        />
        <SettingRow 
          label="Member Since" 
          desc="The date of your very first visit to Nira."
          action={<span className="text-[14px] text-[var(--nira-subtext)]">Oct 12, 2025</span>} 
        />
        <SettingRow 
          label="Connected Provider" 
          desc="You are securely signed in using Google Auth."
          action={
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--nira-border)]/50 bg-[var(--nira-text)]/[0.02]">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
               <span className="text-[13px] font-medium text-[var(--nira-text)]">Google</span>
            </div>
          } 
        />
        <SettingRow 
          label="Delete account" 
          danger
          desc="Permanently delete your account and all associated data."
          action={<ActionButton danger>Delete Account</ActionButton>} 
        />
      </div>
    </div>
  );
}

function SecuritySettings() {
  const { twoFactor, setTwoFactor } = useSettingsStore();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Mac OS • Chrome", location: "Active Now", isCurrent: true, icon: "desktop" },
    { id: 2, device: "iPhone 14 Pro • Safari", location: "Mumbai, India • Yesterday at 10:45 PM", isCurrent: false, icon: "mobile" }
  ]);

  const showAction = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2500);
  }

  const generateRecoveryCodes = () => {
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.random().toString(36).substring(2, 7).toUpperCase()
    ).join('\\n');
    
    const content = `Nira Intelligence - Recovery Codes\\nGenerated on: ${new Date().toLocaleString()}\\n\\nKeep these codes safe. Do not share them with anyone.\\n\\n${codes}`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nira-recovery-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAction("Codes Generated. Check your downloads.");
  };

  const logoutSession = (id: number) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showAction("Session logged out successfully.");
  };

  const logoutAllOther = () => {
    setSessions(prev => prev.filter(s => s.isCurrent));
    showAction("All other sessions logged out.");
  };

  return (
    <div className="animate-fade-in pb-6">
      <div className="text-[12px] font-bold text-[var(--nira-subtext)] uppercase tracking-wider mb-1 mt-2">Account Protection</div>
      <div className="mb-6">
        <SettingRow 
          label="Two-Factor Authentication (2FA)" 
          desc="Add an extra layer of security using an authenticator app."
          action={<Switch checked={twoFactor} onChange={setTwoFactor} />} 
        />
        <SettingRow 
          label="Recovery Codes" 
          desc="Generate backup codes to access your account if you lose your device."
          action={<button onClick={generateRecoveryCodes} className="px-4 py-1.5 rounded-full border border-[var(--nira-border)]/60 text-[13px] font-medium text-[var(--nira-text)] hover:bg-[var(--nira-text)]/[0.04] transition-colors">Generate Codes</button>} 
        />
        {successMsg && (
          <div className="mt-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[13px] text-emerald-500 font-medium flex items-center gap-2 animate-fade-in">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            {successMsg}
          </div>
        )}
      </div>

      <div className="text-[12px] font-bold text-[var(--nira-subtext)] uppercase tracking-wider mb-2 mt-8">Active Sessions</div>
      <p className="text-[13px] text-[var(--nira-subtext)] mb-4">You are currently logged in on these devices. Log out of unfamiliar devices immediately.</p>
      
      <div className="border border-[var(--nira-border)]/50 rounded-xl overflow-hidden bg-[var(--nira-surface)] mb-4">
        {sessions.map((session, i) => (
          <div key={session.id} className={`flex items-center justify-between p-4 ${i !== sessions.length - 1 ? 'border-b border-[var(--nira-border)]/50' : ''} ${session.isCurrent ? 'bg-[var(--nira-text)]/[0.02]' : 'bg-[var(--nira-surface)]'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-[var(--nira-text)]/[0.05] flex items-center justify-center ${session.isCurrent ? 'text-[var(--nira-text)]' : 'text-[var(--nira-subtext)]'}`}>
                {session.icon === 'desktop' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                )}
              </div>
              <div>
                <div className="text-[13.5px] font-medium text-[var(--nira-text)]">{session.device}</div>
                <div className={`text-[12px] font-medium mt-0.5 ${session.isCurrent ? 'text-[#10a37f]' : 'text-[var(--nira-subtext)]'}`}>{session.location}</div>
              </div>
            </div>
            {!session.isCurrent && (
              <button onClick={() => logoutSession(session.id)} className="text-[13px] font-medium text-red-500 hover:text-red-600 transition-colors">Log out</button>
            )}
          </div>
        ))}
        {sessions.length === 0 && (
           <div className="p-4 text-center text-[13px] text-[var(--nira-subtext)]">No active sessions found.</div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={logoutAllOther} disabled={sessions.length <= 1} className="px-4 py-1.5 rounded-full border border-red-500/30 text-[13px] font-medium text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Log out all other sessions</button>
      </div>
    </div>
  );
}

// ================= PREMIUM NIRA ICONS =================

const PremiumIcon = ({ active, children, viewBox = "0 0 24 24" }: { active: boolean, children: React.ReactNode, viewBox?: string }) => (
  <svg 
    width="18" height="18" viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 transition-all duration-300 ${active ? 'scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`}
  >
    {children}
  </svg>
);

const IconGeneral = ({ active }: { active: boolean }) => (
  <PremiumIcon active={active}>
    <defs>
      <linearGradient id="gen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={active ? "var(--nira-accent)" : "currentColor"} />
        <stop offset="100%" stopColor={active ? "#8b5cf6" : "currentColor"} stopOpacity={active ? 1 : 0.6} />
      </linearGradient>
    </defs>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="url(#gen-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="url(#gen-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </PremiumIcon>
);

const IconPersonalization = ({ active }: { active: boolean }) => (
  <PremiumIcon active={active}>
    <defs>
      <linearGradient id="pers-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={active ? "#ec4899" : "currentColor"} />
        <stop offset="100%" stopColor={active ? "#8b5cf6" : "currentColor"} stopOpacity={active ? 1 : 0.6} />
      </linearGradient>
    </defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#pers-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={active ? "url(#pers-grad)" : "none"} fillOpacity={active ? 0.15 : 0}/>
    <path d="M8 11h8M12 7v8" stroke="url(#pers-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </PremiumIcon>
);

const IconBilling = ({ active }: { active: boolean }) => (
  <PremiumIcon active={active}>
    <defs>
      <linearGradient id="bill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={active ? "#10b981" : "currentColor"} />
        <stop offset="100%" stopColor={active ? "#3b82f6" : "currentColor"} stopOpacity={active ? 1 : 0.6} />
      </linearGradient>
    </defs>
    <rect x="2" y="5" width="20" height="14" rx="2" stroke="url(#bill-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={active ? "url(#bill-grad)" : "none"} fillOpacity={active ? 0.1 : 0}/>
    <path d="M2 10h20M7 15h.01M11 15h2" stroke="url(#bill-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </PremiumIcon>
);

const IconData = ({ active }: { active: boolean }) => (
  <PremiumIcon active={active}>
    <defs>
      <linearGradient id="data-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={active ? "#3b82f6" : "currentColor"} />
        <stop offset="100%" stopColor={active ? "#06b6d4" : "currentColor"} stopOpacity={active ? 1 : 0.6} />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="url(#data-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={active ? "url(#data-grad)" : "none"} fillOpacity={active ? 0.15 : 0}/>
    <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" stroke="url(#data-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="url(#data-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </PremiumIcon>
);

const IconSecurity = ({ active }: { active: boolean }) => (
  <PremiumIcon active={active}>
    <defs>
      <linearGradient id="sec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={active ? "#f59e0b" : "currentColor"} />
        <stop offset="100%" stopColor={active ? "#ef4444" : "currentColor"} stopOpacity={active ? 1 : 0.6} />
      </linearGradient>
    </defs>
    <rect x="3" y="11" width="18" height="11" rx="2" stroke="url(#sec-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={active ? "url(#sec-grad)" : "none"} fillOpacity={active ? 0.1 : 0}/>
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="url(#sec-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {active && <circle cx="12" cy="16" r="1.5" fill="url(#sec-grad)"/>}
  </PremiumIcon>
);

const IconProfile = ({ active }: { active: boolean }) => (
  <PremiumIcon active={active}>
    <defs>
      <linearGradient id="prof-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={active ? "#8b5cf6" : "currentColor"} />
        <stop offset="100%" stopColor={active ? "#ec4899" : "currentColor"} stopOpacity={active ? 1 : 0.6} />
      </linearGradient>
    </defs>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="url(#prof-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="url(#prof-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={active ? "url(#prof-grad)" : "none"} fillOpacity={active ? 0.1 : 0}/>
  </PremiumIcon>
);

// ================= MAIN MODAL =================

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab | "security">("general");

  const TABS = [
    { id: "general", label: "General", icon: <IconGeneral active={activeTab === "general"} /> },
    { id: "personalization", label: "Personalization", icon: <IconPersonalization active={activeTab === "personalization"} /> },
    { id: "billing", label: "Billing", icon: <IconBilling active={activeTab === "billing"} /> },
    { id: "data", label: "Data controls", icon: <IconData active={activeTab === "data"} /> },
    { id: "security", label: "Security", icon: <IconSecurity active={activeTab === "security"} /> },
    { id: "account", label: "Profile", icon: <IconProfile active={activeTab === "account"} /> },
  ];

  const getTabTitle = () => {
    return TABS.find(t => t.id === activeTab)?.label || "Settings";
  }

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in">
       
       <div 
        className="relative w-full max-w-[800px] h-[85vh] max-h-[600px] flex rounded-[16px] overflow-hidden bg-white dark:bg-[#121214] shadow-[0_4px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] animate-scaleIn origin-center border border-[var(--nira-border)]/50"
       >
          
          {/* Left Sidebar */}
          <div className="w-[260px] shrink-0 bg-[#F9F9FA] dark:bg-[#09090B] flex flex-col py-3 border-r border-[var(--nira-border)]/50">
             
             {/* Mobile/Hidden close button space if needed, ChatGPT puts close on top right of modal */}
             
             <div className="flex-1 flex flex-col px-3 gap-0.5 overflow-y-auto pt-2">
               {TABS.map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as Tab)}
                   className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors outline-none ${
                     activeTab === tab.id 
                     ? "bg-[var(--nira-text)]/[0.08] text-[var(--nira-text)] font-medium" 
                     : "text-[var(--nira-text)]/80 hover:bg-[var(--nira-text)]/[0.04] hover:text-[var(--nira-text)]"
                   }`}
                 >
                   <span className={activeTab === tab.id ? 'text-[var(--nira-text)]' : 'text-[var(--nira-subtext)]'}>{tab.icon}</span>
                   {tab.label}
                 </button>
               ))}
             </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col relative bg-white dark:bg-[#121214]">
            
            {/* Top Bar with Title and Close */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-transparent">
              <h2 className="text-[18px] font-medium text-[var(--nira-text)]">{getTabTitle()}</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent hover:bg-[var(--nira-text)]/[0.06] text-[var(--nira-subtext)] hover:text-[var(--nira-text)] transition-colors outline-none -mr-2"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Scrollable Settings List */}
            <div className="flex-1 overflow-y-auto px-8 pb-10 scrollbar-custom">
               <div className="max-w-[500px]">
                 {activeTab === "general" && <GeneralSettings />}
                 {activeTab === "personalization" && <PersonalizationSettings />}
                 {activeTab === "billing" && <BillingSettings />}
                 {activeTab === "data" && <DataControlsSettings />}
                 {activeTab === "security" && <SecuritySettings />}
                 {activeTab === "account" && <AccountSettings />}
               </div>
            </div>
          </div>
       </div>
    </div>
  );
}
