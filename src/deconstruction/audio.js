/**
 * High-Tech Synthesized Web Audio Sound Engine
 * Generates futuristic mechanical servo & sub-bass feedback
 * proportional to scroll deconstruction velocity.
 */
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.lastProgress = 0;
    this.servoGain = null;
    this.servoOsc = null;
    this.bassOsc = null;
    this.bassGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // High-tech servo oscillator
    this.servoOsc = this.ctx.createOscillator();
    this.servoOsc.type = 'sawtooth';
    this.servoOsc.frequency.setValueAtTime(140, this.ctx.currentTime);

    const servoFilter = this.ctx.createBiquadFilter();
    servoFilter.type = 'bandpass';
    servoFilter.frequency.setValueAtTime(650, this.ctx.currentTime);
    servoFilter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    this.servoGain = this.ctx.createGain();
    this.servoGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.servoOsc.connect(servoFilter);
    servoFilter.connect(this.servoGain);
    this.servoGain.connect(this.ctx.destination);
    this.servoOsc.start();

    // Deep V12 resonance bass drone
    this.bassOsc = this.ctx.createOscillator();
    this.bassOsc.type = 'sine';
    this.bassOsc.frequency.setValueAtTime(48, this.ctx.currentTime);

    this.bassGain = this.ctx.createGain();
    this.bassGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.bassOsc.connect(this.bassGain);
    this.bassGain.connect(this.ctx.destination);
    this.bassOsc.start();
  }

  toggle() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    if (!this.enabled && this.servoGain && this.bassGain) {
      this.servoGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      this.bassGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
    return this.enabled;
  }

  updateVelocity(velocity, progress) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const speed = Math.min(1.0, Math.abs(velocity) * 8.0);

    if (speed > 0.01) {
      // Frequency rises with deconstruction stage
      const targetFreq = 120 + progress * 240 + speed * 180;
      this.servoOsc.frequency.setTargetAtTime(targetFreq, now, 0.03);
      this.servoGain.gain.setTargetAtTime(speed * 0.045, now, 0.03);

      // Deep bass warmth
      this.bassGain.gain.setTargetAtTime(0.06 + speed * 0.08, now, 0.05);
    } else {
      this.servoGain.gain.setTargetAtTime(0, now, 0.08);
      this.bassGain.gain.setTargetAtTime(0.015, now, 0.1);
    }
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }
}
