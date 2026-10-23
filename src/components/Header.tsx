import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, User, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { Language, AppMode } from '../types/craft';
import { VERNACULAR_TRANSLATIONS } from '../data/mockCrafts';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  appMode: AppMode;
  onAppModeToggle: (mode: AppMode) => void;
  audioAssistActive: boolean;
  onToggleAudioAssist: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  appMode,
  onAppModeToggle,
  audioAssistActive,
  onToggleAudioAssist,
  cartCount,
  onOpenCart,
  onOpenProfile
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = VERNACULAR_TRANSLATIONS[currentLang];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  return (
    <header style={{
      backgroundColor: 'var(--color-surface-container-lowest)',
      borderBottom: '1px solid var(--color-outline-variant)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Top Vernacular Trust Bar */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-low)',
        borderBottom: '1px solid var(--color-outline-variant)',
        padding: '0.35rem 1rem',
        fontSize: '0.75rem',
        color: 'var(--color-on-surface-variant)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={14} color="var(--color-primary)" />
          <span style={{ fontWeight: 600 }}>
            {t.giCertified} • GI Act 1999 • 100% Direct Fair Ledger
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--color-tertiary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} />
            Dharwad • Kundapura • Bagalkote • Udupi • Bidar Guilds
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand Lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.25rem',
            fontFamily: 'var(--font-headline)',
            boxShadow: 'var(--shadow-sm)',
            border: '2px solid var(--color-primary-fixed)'
          }}>
            ಹ
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Hastakar
              </span>
              <span style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.1rem',
                color: 'var(--color-tertiary)',
                fontWeight: 700
              }}>
                (ಹಸ್ತಕಾರ)
              </span>
            </div>
            <p className="label-sm" style={{ color: 'var(--color-on-surface-variant)', letterSpacing: '0.04em' }}>
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Vernacular Audio Reader Toggle */}
          <button
            onClick={onToggleAudioAssist}
            title="Toggle Vernacular Audio Reader"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: audioAssistActive ? 'var(--color-primary-fixed)' : 'var(--color-surface-container)',
              color: audioAssistActive ? 'var(--color-on-primary-fixed)' : 'var(--color-on-surface)',
              border: `1px solid ${audioAssistActive ? 'var(--color-primary)' : 'var(--color-outline-variant)'}`,
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {audioAssistActive ? (
              <>
                <Volume2 size={16} color="var(--color-primary)" className="animate-voice-pulse" />
                <span>ಆಡಿಯೋ ON</span>
              </>
            ) : (
              <>
                <VolumeX size={16} />
                <span>ಆಡಿಯೋ (Audio)</span>
              </>
            )}
          </button>

          {/* Mode Switcher Pill */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'var(--color-surface-container-high)',
            borderRadius: 'var(--radius-full)',
            padding: '3px',
            border: '1px solid var(--color-outline-variant)'
          }}>
            <button
              onClick={() => onAppModeToggle('buyer')}
              style={{
                backgroundColor: appMode === 'buyer' ? 'var(--color-primary)' : 'transparent',
                color: appMode === 'buyer' ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t.buyerMode}
            </button>
            <button
              onClick={() => onAppModeToggle('artisan')}
              style={{
                backgroundColor: appMode === 'artisan' ? 'var(--color-secondary)' : 'transparent',
                color: appMode === 'artisan' ? 'var(--color-on-secondary)' : 'var(--color-on-surface)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t.artisanMode}
            </button>
          </div>

          {/* Language Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--color-surface-container)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Globe size={15} color="var(--color-secondary)" />
              <span>{languages.find(l => l.code === currentLang)?.native}</span>
            </button>

            {showLangMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '110%',
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                minWidth: '140px',
                zIndex: 100,
                overflow: 'hidden'
              }}>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setShowLangMenu(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.6rem 0.9rem',
                      background: currentLang === lang.code ? 'var(--color-primary-fixed)' : 'transparent',
                      color: currentLang === lang.code ? 'var(--color-on-primary-fixed)' : 'var(--color-on-surface)',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: currentLang === lang.code ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{lang.native}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bag / Cart Icon Button */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container)',
              border: '1px solid var(--color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Commission Cart"
          >
            <ShoppingBag size={18} color="var(--color-on-surface)" />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -3,
                right: -3,
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: 700,
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Guild Profile Button */}
          <button
            onClick={onOpenProfile}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-surface-container-high)',
              border: '1px solid var(--color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Guild Profile & Certifications"
          >
            <User size={18} color="var(--color-primary)" />
          </button>
        </div>
      </div>
    </header>
  );
};
