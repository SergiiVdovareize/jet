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

export function playStart() {
  try {
    const ctx = ensureContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'triangle';
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    const step = 0.12;
    // Gentle descending cadence: G5 -> E5 -> D5 -> C5
    oscillator.frequency.setValueAtTime(523, now);
    oscillator.frequency.setValueAtTime(587, now + step);
    oscillator.frequency.setValueAtTime(659, now + step * 2);
    oscillator.frequency.setValueAtTime(783, now + step * 3);
    // Softer envelope with longer tail
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
    gain.gain.setValueAtTime(0.06, now + step * 3 + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + step * 3 + 0.45);
    oscillator.start(now);
    oscillator.stop(now + step * 3 + 0.5);
  } catch {
    // ignore
  }
}

export function playFinish() {
  try {
    const ctx = ensureContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'triangle';
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    const step = 0.12;
    // Gentle descending cadence: G5 -> E5 -> D5 -> C5
    oscillator.frequency.setValueAtTime(783.99, now);
    oscillator.frequency.setValueAtTime(659.25, now + step);
    oscillator.frequency.setValueAtTime(587.33, now + step * 2);
    oscillator.frequency.setValueAtTime(523.25, now + step * 3);
    // Softer envelope with longer tail
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
    gain.gain.setValueAtTime(0.06, now + step * 3 + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + step * 3 + 0.45);
    oscillator.start(now);
    oscillator.stop(now + step * 3 + 0.5);
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

const Sound = { playMiss, playSuccess, playStart, playFinish, close };
export default Sound;



