import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, Languages } from 'lucide-react';
import { audioSystem } from '../utils/audioAssistant';

interface AudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  kannadaTitle?: string;
  artisanName: string;
  cluster: string;
  storyText: string;
  kannadaStoryText?: string;
  duration?: string;
  avatarUrl?: string;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  isOpen,
  onClose,
  title,
  kannadaTitle,
  artisanName,
  cluster,
  storyText,
  kannadaStoryText,
  duration = '03:40',
  avatarUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(42);
  const [totalSec] = useState(220); // 3:40
  const [showKannadaTranscript, setShowKannadaTranscript] = useState(true);
  const stopAudioRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (stopAudioRef.current) {
        stopAudioRef.current();
        stopAudioRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlayback = () => {
    if (isPlaying) {
      if (stopAudioRef.current) {
        stopAudioRef.current();
        stopAudioRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsPlaying(false);
    } else {
      // Start real tanpura folk drone & loom rhythmic beat
      const stopFn = audioSystem.playLoomChantSnippet(() => {
        setIsPlaying(false);
      });
      stopAudioRef.current = stopFn;
      setIsPlaying(true);

      timerRef.current = window.setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalSec) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleSeek = (newSec: number) => {
    setCurrentTimeSec(newSec);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-gi">
              <Sparkles size={12} />
              Vernacular Oral Heritage • ಮೌಖಿಕ ಪರಂಪರೆ
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-surface-container)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Master Artisan Lockup */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--color-surface-container-low)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.5rem',
          border: '1px solid var(--color-outline-variant)'
        }}>
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
            alt={artisanName}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              objectFit: 'cover',
              border: '2px solid var(--color-primary)'
            }}
          />
          <div>
            <h3 className="headline-md" style={{ color: 'var(--color-primary)' }}>
              {title}
            </h3>
            {kannadaTitle && (
              <p style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-tertiary)', fontWeight: 600 }}>
                {kannadaTitle}
              </p>
            )}
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              {artisanName} • {cluster}
            </p>
          </div>
        </div>

        {/* Live Pulsing Audio Waveform Visualizer */}
        <div style={{
          backgroundColor: 'var(--color-surface-container)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--color-outline-variant)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            height: '64px',
            marginBottom: '1rem',
            overflow: 'hidden'
          }}>
            {Array.from({ length: 32 }).map((_, i) => {
              const active = isPlaying;
              const height = active
                ? Math.max(8, Math.sin(i * 0.4 + currentTimeSec * 2) * 26 + 32)
                : ((i % 5) * 6 + 10);
              return (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: `${height}px`,
                    backgroundColor: i < (currentTimeSec / totalSec) * 32
                      ? 'var(--color-primary)'
                      : 'var(--color-outline-variant)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'height 0.15s ease, background-color 0.2s ease'
                  }}
                />
              );
            })}
          </div>

          {/* Time Scrubber Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-on-surface-variant)', width: '38px' }}>
              {formatTime(currentTimeSec)}
            </span>
            <input
              type="range"
              min={0}
              max={totalSec}
              value={currentTimeSec}
              onChange={(e) => handleSeek(Number(e.target.value))}
              style={{
                flex: 1,
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-on-surface-variant)', width: '38px' }}>
              {duration}
            </span>
          </div>

          {/* Player Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => handleSeek(Math.max(0, currentTimeSec - 15))}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-on-surface)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
              title="Rewind 15 seconds"
            >
              <RotateCcw size={20} />
              <span style={{ fontSize: '0.7rem' }}>15s</span>
            </button>

            <button
              onClick={togglePlayback}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-terracotta)',
                transition: 'transform 0.15s ease'
              }}
              className={isPlaying ? 'animate-voice-pulse' : ''}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
            </button>

            <button
              onClick={() => {
                const textToSpeak = showKannadaTranscript && kannadaStoryText ? kannadaStoryText : storyText;
                audioSystem.speakText(textToSpeak, showKannadaTranscript ? 'kn' : 'en');
              }}
              style={{
                background: 'var(--color-surface-container-high)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
              title="Speak Vernacular Summary"
            >
              <Volume2 size={16} color="var(--color-primary)" />
              <span>ಕೇಳಿ (Speech)</span>
            </button>
          </div>
        </div>

        {/* Vernacular Transcript & Story */}
        <div style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          border: '1px solid var(--color-outline-variant)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Languages size={15} />
              {showKannadaTranscript ? 'ಕನ್ನಡ ಮೌಖಿಕ ಕಥೆ (Kannada Oral Ballad)' : 'English Translation'}
            </span>
            <button
              onClick={() => setShowKannadaTranscript(!showKannadaTranscript)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {showKannadaTranscript ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}
            </button>
          </div>

          <p style={{
            fontSize: '0.92rem',
            lineHeight: 1.7,
            color: 'var(--color-on-surface)',
            fontStyle: showKannadaTranscript ? 'normal' : 'italic'
          }}>
            {showKannadaTranscript
              ? (kannadaStoryText || '“ನಮ್ಮ ತಾಯಿ ನಮಗೆ ಕಲಿಸಿದಾಗ, ದಾರವನ್ನು ಎಣಿಸಿ ಹಾಕುವ ಪದ್ಧತಿ ಇತ್ತು. ಗವಂತಿ ಮತ್ತು ಮುರ್ಗಿ ಹೊಲಿಗೆಗಳಲ್ಲಿ ಗಂಟು ಹಾಕುವುದಿಲ್ಲ; ಎರಡು ಬದಿಗಳಲ್ಲೂ ಒಂದೇ ರೀತಿ ಕಾಣಬೇಕು. ಈ ಹಾಡು ನಾವು ಮಗ್ಗದ ಮೇಲೆ ಕುಳಿತಾಗ ಹಾಡುವ ಹಳೆಯ ಶ್ರಾವಣ ಪದ...”')
              : `"${storyText}"`}
          </p>
        </div>
      </div>
    </div>
  );
};
