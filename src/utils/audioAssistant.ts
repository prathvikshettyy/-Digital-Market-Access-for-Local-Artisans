// Audio synthesis & voice assistant utility for Hastakar

class HastakarAudioSystem {
  private audioCtx: AudioContext | null = null;
  private isSynthesizing = false;
  private oscNodes: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Synthesizes soothing authentic acoustic folk drone & loom rhythmic shuttle beat
  public playLoomChantSnippet(onStop?: () => void): () => void {
    try {
      this.initCtx();
      if (!this.audioCtx) return () => {};

      this.stop();
      this.isSynthesizing = true;

      const ctx = this.audioCtx;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      this.gainNode = masterGain;

      // Tanpura / Ektara resonant drone chords: Sa (C3 - 130.81Hz), Pa (G3 - 196Hz), Sa high (C4 - 261.63Hz)
      const frequencies = [130.81, 196.0, 261.63, 392.0];
      const oscillators: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle harmonic modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        oscillators.push(osc);
      });

      // Loom shuttle rhythmic click-clack beat every 1.4s
      const intervalId = window.setInterval(() => {
        if (!this.isSynthesizing || !this.audioCtx) return;
        const clickTime = ctx.currentTime;
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(320, clickTime);
        clickOsc.frequency.exponentialRampToValueAtTime(80, clickTime + 0.08);

        clickGain.gain.setValueAtTime(0.09, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.08);

        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start(clickTime);
        clickOsc.stop(clickTime + 0.08);
      }, 1200);

      this.oscNodes = oscillators;

      const stopFn = () => {
        clearInterval(intervalId);
        oscillators.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        if (this.gainNode) {
          try {
            this.gainNode.disconnect();
          } catch {
            // Ignore
          }
        }
        this.isSynthesizing = false;
        if (onStop) onStop();
      };

      return stopFn;
    } catch (e) {
      console.warn('Audio synthesis warning:', e);
      return () => {};
    }
  }

  public stop() {
    this.isSynthesizing = false;
    this.oscNodes.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore
      }
    });
    this.oscNodes = [];
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {
        // Ignore
      }
      this.gainNode = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Spoken vernacular speech synthesis
  public speakText(text: string, lang: 'kn' | 'en' | 'hi' | 'mr' = 'kn', onEnd?: () => void) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice or rate
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    
    const langMap: Record<string, string> = {
      kn: 'kn-IN',
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN'
    };
    utterance.lang = langMap[lang] || 'en-IN';

    // Find regional voice if available
    const voices = window.speechSynthesis.getVoices();
    const regionalVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes('IN'));
    if (regionalVoice) {
      utterance.voice = regionalVoice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const audioSystem = new HastakarAudioSystem();
