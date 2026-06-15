/* ---------- NIRA AUDIO ENGINE ---------- */
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function playUISound(type: "hover" | "click" | "enter") {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Unlocks browser autoplay context restrictions on first human gesture
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "hover") {
      // 💎 Premium Glass Tick (Vision Pro inspired)
      // Very soft, high-frequency, short sine wave pulse
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.008, now); // Quiet, subtle feedback
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.start(now);
      osc.stop(now + 0.02);
    } else if (type === "click") {
      // 🍏 Apple/macOS style clean button click
      // Fast, sliding sine sweep
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.035);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === "enter") {
      // 🌌 Immersive Transition Whoosh
      // Soft, warm, low-frequency triangle wave sweep
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.18);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    // Fail silently to prevent user disruptions
  }
}
