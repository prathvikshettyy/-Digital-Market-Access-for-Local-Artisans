import React from 'react';
import { Store, BookOpen, PlusCircle, PackageCheck } from 'lucide-react';
import { NavTab, Language } from '../types/craft';
import { VERNACULAR_TRANSLATIONS } from '../data/mockCrafts';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentLang: Language;
  pendingOrderCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  currentLang,
  pendingOrderCount = 3
}) => {
  const t = VERNACULAR_TRANSLATIONS[currentLang];

  const tabs: { id: NavTab; label: string; subLabel: string; icon: React.ReactNode }[] = [
    {
      id: 'bazaar',
      label: t.bazaar,
      subLabel: 'Bazaar',
      icon: <Store size={22} />
    },
    {
      id: 'story',
      label: t.heritage,
      subLabel: 'Kasuti Lineage',
      icon: <BookOpen size={22} />
    },
    {
      id: 'add',
      label: t.addCraft,
      subLabel: 'Voice Listing',
      icon: <PlusCircle size={26} />
    },
    {
      id: 'orders',
      label: t.orders,
      subLabel: 'Guild Ledger',
      icon: <PackageCheck size={22} />
    }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--color-surface-container-lowest)',
      borderTop: '1px solid var(--color-outline-variant)',
      boxShadow: '0 -4px 16px rgba(87, 66, 60, 0.08)',
      zIndex: 40,
      padding: '0.4rem 0.5rem calc(0.4rem + env(safe-area-inset-bottom))'
    }}>
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAdd = tab.id === 'add';

          if (isAdd) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  top: '-14px',
                  padding: '0 0.5rem'
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-terracotta)',
                  border: '3px solid var(--color-surface)',
                  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className={isActive ? 'animate-voice-pulse' : ''}
                >
                  <PlusCircle size={30} strokeWidth={2.4} />
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  marginTop: '2px',
                  fontFamily: 'var(--font-headline)'
                }}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                borderRadius: 'var(--radius-lg)',
                color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                transition: 'all 0.15s ease',
                position: 'relative',
                minWidth: '68px'
              }}
            >
              <div style={{ position: 'relative' }}>
                {tab.icon}
                {tab.id === 'orders' && pendingOrderCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -8,
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #fff'
                  }}>
                    {pendingOrderCount}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: isActive ? 700 : 500,
                marginTop: '3px',
                fontFamily: 'var(--font-headline)'
              }}>
                {tab.label}
              </span>
              <span style={{
                fontSize: '0.62rem',
                opacity: isActive ? 0.9 : 0.6,
                lineHeight: 1
              }}>
                {tab.subLabel}
              </span>

              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: -2,
                  width: '20px',
                  height: '3px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)'
                }} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
