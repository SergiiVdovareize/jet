// Simple sound manager for game SFX using Web Audio API
// Handles lazy AudioContext creation, playback, and cleanup

let audioContext = null;

function ensureContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContext) {
    try {
      audioContext = new AudioCtx();
    } catch {
      audioContext = null;
    }
  }
  return audioContext;
}

export function playMiss() {
  try {
    const ctx = ensureContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, ctx.currentTime);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    oscillator.start(now);
    oscillator.stop(now + 0.16);
  } catch {
    // ignore
  }
}

export function playSuccess() {
  try {
    const ctx = ensureContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    oscillator.frequency.setValueAtTime(523.25, now);
    oscillator.frequency.exponentialRampToValueAtTime(784.0, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    oscillator.start(now);
    oscillator.stop(now + 0.19);
  } catch {
    // ignore
  }
}

export async function close() {
  try {
    if (audioContext && typeof audioContext.close === 'function') {
      await audioContext.close();
    }
  } catch {
    // ignore
  } finally {
    audioContext = null;
  }
}

const Sound = { playMiss, playSuccess, close };
export default Sound;



