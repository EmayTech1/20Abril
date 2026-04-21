/**
 * AmbientAudio — Web Audio soft pad + twinkle chimes, no external files.
 * Exposes start/stop via ref methods.
 */
export default class AmbientAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.running = false;
    this.timers = [];
    this.oscs = [];
  }

  start() {
    if (this.running) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    this.master.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + 1.2);

    // Pad: low-frequency sine triad, slowly detuned
    const pad = (freq, detune = 0, gain = 0.06) => {
      const o = this.ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq;
      o.detune.value = detune;
      const g = this.ctx.createGain();
      g.gain.value = gain;
      // LFO
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.08 + Math.random() * 0.08;
      const lfoG = this.ctx.createGain();
      lfoG.gain.value = gain * 0.4;
      lfo.connect(lfoG).connect(g.gain);
      o.connect(g).connect(this.master);
      o.start();
      lfo.start();
      this.oscs.push(o, lfo);
    };
    // Dreamy chord (A major-ish)
    pad(220, -5, 0.055); // A3
    pad(277.18, 4, 0.045); // C#4
    pad(329.63, -3, 0.04); // E4
    pad(440, 6, 0.03); // A4

    // Random soft chimes
    const chime = () => {
      if (!this.running) return;
      const notes = [523.25, 659.25, 783.99, 880.0, 1046.5]; // C5..C6
      const f = notes[Math.floor(Math.random() * notes.length)];
      const o = this.ctx.createOscillator();
      o.type = "triangle";
      o.frequency.value = f;
      const g = this.ctx.createGain();
      const now = this.ctx.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      o.connect(g).connect(this.master);
      o.start(now);
      o.stop(now + 2.3);
      const next = 1800 + Math.random() * 3200;
      this.timers.push(setTimeout(chime, next));
    };
    this.running = true;
    this.timers.push(setTimeout(chime, 800));
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    this.timers.forEach((t) => clearTimeout(t));
    this.timers = [];
    if (this.master && this.ctx) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(this.master.gain.value, t);
      this.master.gain.linearRampToValueAtTime(0, t + 0.6);
    }
    setTimeout(() => {
      this.oscs.forEach((o) => {
        try { o.stop(); } catch (e) { /* noop */ }
      });
      this.oscs = [];
      if (this.ctx) {
        try { this.ctx.close(); } catch (e) { /* noop */ }
        this.ctx = null;
      }
    }, 700);
  }
}
