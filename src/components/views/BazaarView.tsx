import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  Clock,
  ShieldCheck,
  Heart,
  ChevronRight,
  ArrowRight,
  Scale,
  CheckCircle2,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { CraftItem, FairPriceLedger, Language, AppMode } from '../../types/craft';
import { VERNACULAR_TRANSLATIONS, MOCK_LEDGERS } from '../../data/mockCrafts';

interface BazaarViewProps {
  crafts: CraftItem[];
  currentLang: Language;
  appMode: AppMode;
  onAppModeToggle: (mode: AppMode) => void;
  onOpenStory: (craftId: string) => void;
  onOpenAudio: (craft: CraftItem) => void;
  onQuickCommission: (craft: CraftItem) => void;
  onViewFairLedger: (craft: CraftItem, ledger: FairPriceLedger) => void;
}

export const BazaarView: React.FC<BazaarViewProps> = ({
  crafts,
  currentLang,
  appMode,
  onAppModeToggle,
  onOpenStory,
  onOpenAudio,
  onQuickCommission,
  onViewFairLedger
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const t = VERNACULAR_TRANSLATIONS[currentLang];

  const categories = [
    { id: 'All', label: 'All Traditions', knLabel: 'ಎಲ್ಲಾ ಕರಕುಶಲ' },
    { id: 'Kasuti', label: 'Kasuti (Ilkal)', knLabel: 'ಕಸೂತಿ ಕಲೆ' },
    { id: 'Beedu', label: 'Beedu Palm Weave', knLabel: 'ಬೀಡು ತಾಳೆ ಹೆಣಿಗೆ' },
    { id: 'Bidri', label: 'Bidri Silver Inlay', knLabel: 'ಬಿದ್ರಿ ಕೆತ್ತನೆ' },
    { id: 'Udupi', label: 'Udupi Handloom', knLabel: 'ಉಡುಪಿ ಕೈಮಗ್ಗ' },
    { id: 'Terracotta', label: 'Terracotta Clay', knLabel: 'ಟೆರಾಕೋಟಾ ಮಣ್ಣಿನ ಕಲೆ' }
  ];

  const filteredCrafts = selectedCategory === 'All'
    ? crafts
    : crafts.filter(c => c.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ paddingBottom: '5rem', maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 6rem' }}>
      {/* Role Toggle & Direct Trade Guarantee Banner */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-low)',
        border: '1.5px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-fixed)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--color-primary)'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="headline-md" style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>
                100% Direct Fair-Trade
              </span>
              <span className="badge-gi">Govt GI Verified</span>
            </div>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
              {t.directWageNotice} — No middlemen, pure vernacular provenance.
            </p>
          </div>
        </div>

        {/* Quick Role Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
          border: '1px solid var(--color-outline-variant)'
        }}>
          <button
            onClick={() => onAppModeToggle('buyer')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: appMode === 'buyer' ? 'var(--color-primary)' : 'transparent',
              color: appMode === 'buyer' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t.buyerMode} (ಖರೀದಿದಾರ)
          </button>
          <button
            onClick={() => onAppModeToggle('artisan')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: appMode === 'artisan' ? 'var(--color-secondary)' : 'transparent',
              color: appMode === 'artisan' ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t.artisanMode} (ವಿಕ್ರೇತ)
          </button>
        </div>
      </div>

      {/* Guild Provenance Cluster Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #f6f3ed 0%, #ebe8e2 100%)',
        border: '1px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 700,
              color: 'var(--color-tertiary)'
            }}>
              Coastal Karnataka & Deccan Artisan Guilds • ಕರಾವಳಿ ಮತ್ತು ಡೆಕ್ಕನ್ ಕ್ರಾಫ್ಟ್
            </span>
            <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)', marginTop: '0.2rem' }}>
              Living Traditions of the Red Soil & Black Earth
            </h2>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '720px', marginTop: '0.25rem' }}>
              Hand-spun cottons, counted-thread Kasuti geometry, wild foraged palmyra, and Persian silver inlays directly from certified village cooperatives.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge-gi">Dharwad GI #143</span>
            <span className="badge-gi">Bidri GI #21</span>
            <span className="badge-gi">Udupi GI #31</span>
            <span className="badge-labor">Kundapura Forest Reg</span>
          </div>
        </div>
      </div>

      {/* Master Artisan Spotlight Card */}
      <div className="tactile-card" style={{
        padding: '1.5rem',
        marginBottom: '2.25rem',
        border: '2px solid var(--color-outline-variant)',
        background: 'var(--color-surface-container-lowest)'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
              alt="Rukmini Devi"
              style={{
                width: '110px',
                height: '110px',
                borderRadius: 'var(--radius-xl)',
                objectFit: 'cover',
                border: '3px solid var(--color-primary)'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              whiteSpace: 'nowrap'
            }}>
              4th Gen Master
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <span className="badge-gi">
                <Sparkles size={12} />
                Artisan Spotlight • ಕಲಾಕಾರರ ಪರಿಚಯ
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-tertiary)', fontWeight: 600 }}>
                14 Rural Apprentices Mentored
              </span>
            </div>

            <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
              Rukmini Devi & Dharwad Needlewomen Guild
            </h3>
            <p className="body-md" style={{ color: 'var(--color-on-surface)', marginBottom: '0.75rem' }}>
              "Each Kasuti saree carries 42 hours of unhurried countwork without knots or markings. Our grandmother’s loom chants keep our fingers nimble in the quiet afternoons."
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Play Audio Chant Snippet Button */}
              <button
                onClick={() => onOpenAudio(crafts[0])}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <Volume2 size={18} className="animate-voice-pulse" />
                <span>ಕನ್ನಡ ಹಾಡು ಕೇಳಿ (1:12 min Folk Chant)</span>
              </button>

              <button
                onClick={() => onOpenStory(crafts[0].id)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <span>Read Kasuti Lineage</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Craft Tradition Filter Chips */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3 className="title-lg" style={{ color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="var(--color-primary)" />
            Curated Guild Masterworks
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
            Showing {filteredCrafts.length} certified items
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'none'
        }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                  backgroundColor: isSelected ? 'var(--color-primary-fixed)' : 'var(--color-surface-container-lowest)',
                  color: isSelected ? 'var(--color-on-primary-fixed)' : 'var(--color-on-surface)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.knLabel}</span>
                <span style={{ fontSize: '0.72rem', opacity: 0.75 }}>({cat.label})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredCrafts.map((craft) => {
          const isFav = favorites[craft.id];
          const ledger = MOCK_LEDGERS[craft.id] || {
            craftId: craft.id,
            totalCertifiedPrice: craft.price,
            artisanWage: {
              amount: Math.round(craft.price * 0.65),
              percentage: 65,
              hours: craft.craftHours,
              hourlyRate: Math.round((craft.price * 0.65) / craft.craftHours)
            },
            materials: {
              amount: Math.round(craft.price * 0.22),
              percentage: 22,
              description: 'Organic raw materials & heritage dyes'
            },
            packagingCourier: {
              amount: Math.round(craft.price * 0.08),
              percentage: 8,
              description: 'Handmade eco container & Speed Post'
            },
            cooperativeFund: {
              amount: Math.round(craft.price * 0.05),
              percentage: 5,
              description: 'Village guild health & loom welfare'
            }
          };

          return (
            <div
              key={craft.id}
              className="tactile-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Image Preview & Badges */}
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden', backgroundColor: 'var(--color-surface-container)' }}>
                <img
                  src={craft.image}
                  alt={craft.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Top Overlay Badges */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <span className="badge-gi" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    {craft.giTagNumber}
                  </span>
                  <span className="badge-labor" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <Clock size={11} />
                    {craft.craftHours}h {t.hoursLabor}
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(craft.id, e)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Heart
                    size={18}
                    color={isFav ? 'var(--color-error)' : 'var(--color-on-surface)'}
                    fill={isFav ? 'var(--color-error)' : 'none'}
                  />
                </button>

                {/* Purity Ribbon at bottom of image */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(28, 28, 24, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{craft.purityBadge}</span>
                  <span style={{ color: 'var(--color-primary-fixed)' }}>Blockchain #{craft.blockchainStamp || 'KAS-89'}</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <img
                    src={craft.artisanAvatar}
                    alt={craft.artisanName}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: 'var(--radius-full)',
                      objectFit: 'cover',
                      border: '1.5px solid var(--color-primary)'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                    {craft.artisanName} • {craft.artisanCluster}
                  </span>
                </div>

                <h4 className="title-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '0.15rem' }}>
                  {craft.title}
                </h4>
                {craft.kannadaTitle && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-tertiary)', fontWeight: 600, marginBottom: '0.4rem' }}>
                    {craft.kannadaTitle}
                  </p>
                )}

                <p className="body-md" style={{
                  color: 'var(--color-on-surface-variant)',
                  fontSize: '0.82rem',
                  lineHeight: '1.4',
                  marginBottom: '1rem',
                  flex: 1
                }}>
                  {craft.storySnippet}
                </p>

                {/* Fair Ledger Mini Preview Bar */}
                <div
                  onClick={() => onViewFairLedger(craft, ledger)}
                  style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.65rem 0.8rem',
                    marginBottom: '1.1rem',
                    cursor: 'pointer'
                  }}
                  title="Click to view detailed transparent price ledger"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Scale size={12} />
                      Fair Ledger Breakdown
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
                      View Details →
                    </span>
                  </div>

                  {/* Percentage stacked bar */}
                  <div style={{
                    display: 'flex',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    marginBottom: '4px'
                  }}>
                    <div style={{ width: `${ledger.artisanWage.percentage}%`, backgroundColor: 'var(--color-primary)' }} title={`Artisan: ${ledger.artisanWage.percentage}%`} />
                    <div style={{ width: `${ledger.materials.percentage}%`, backgroundColor: 'var(--color-tertiary)' }} title={`Materials: ${ledger.materials.percentage}%`} />
                    <div style={{ width: `${ledger.packagingCourier.percentage}%`, backgroundColor: 'var(--color-secondary)' }} title={`Logistics: ${ledger.packagingCourier.percentage}%`} />
                    <div style={{ width: `${ledger.cooperativeFund.percentage}%`, backgroundColor: '#8a726a' }} title={`Guild: ${ledger.cooperativeFund.percentage}%`} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--color-on-surface-variant)' }}>
                    <span>Wage: ₹{ledger.artisanWage.amount} ({ledger.artisanWage.percentage}%)</span>
                    <span>Direct UPI Escrow</span>
                  </div>
                </div>

                {/* Price & Action Trays */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--color-outline-variant)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                        ₹{craft.price.toLocaleString('en-IN')}
                      </span>
                      {craft.originalPrice && (
                        <span style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: 'var(--color-outline)' }}>
                          ₹{craft.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                      100% to Maker • 24h Payout
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => onOpenStory(craft.id)}
                      className="btn-secondary"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                      title="View craft heritage deep-dive"
                    >
                      Lineage
                    </button>
                    <button
                      onClick={() => onQuickCommission(craft)}
                      className="btn-primary"
                      style={{ padding: '0.5rem 0.95rem', fontSize: '0.8rem' }}
                    >
                      Quick Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hastakar Fair Promise Bottom Banner */}
      <div style={{
        marginTop: '3rem',
        backgroundColor: 'var(--color-surface-container)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        border: '1.5px dashed var(--color-primary-container)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CheckCircle2 size={32} color="var(--color-primary)" />
          <div>
            <h4 className="title-lg" style={{ color: 'var(--color-primary)' }}>
              The Hastakar Vernacular Covenant (ಹಸ್ತಕಾರ ಪ್ರಮಾಣ)
            </h4>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
              Guaranteed direct UPI payment to artisan bank account within 24 hours of India Post dispatch. Zero platform commission taken from artisans.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="badge-gi">Canara Bank Direct UPI</span>
          <span className="badge-indigo">Insured India Post</span>
        </div>
      </div>
    </div>
  );
};
