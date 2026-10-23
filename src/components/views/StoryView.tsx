import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Volume2,
  Clock,
  Compass,
  MapPin,
  CheckCircle,
  Copy,
  Users,
  Feather,
  Layers,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { CraftItem, FairPriceLedger, GuildMember, Language } from '../../types/craft';
import { MOCK_GUILD_MEMBERS, MOCK_LEDGERS, VERNACULAR_TRANSLATIONS } from '../../data/mockCrafts';

interface StoryViewProps {
  craft: CraftItem;
  currentLang: Language;
  onOpenAudio: (craft: CraftItem) => void;
  onCommission: (craft: CraftItem) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  craft,
  currentLang,
  onOpenAudio,
  onCommission
}) => {
  const [copiedStamp, setCopiedStamp] = useState(false);
  const [activeMotif, setActiveMotif] = useState<string>('Gopura (Temple Tower)');
  const [commissionedSuccess, setCommissionedSuccess] = useState(false);
  const t = VERNACULAR_TRANSLATIONS[currentLang];

  const ledger: FairPriceLedger = MOCK_LEDGERS[craft.id] || {
    craftId: craft.id,
    totalCertifiedPrice: craft.price,
    artisanWage: {
      amount: 2400,
      percentage: 62,
      hours: 38,
      hourlyRate: 63
    },
    materials: {
      amount: 950,
      percentage: 25,
      description: 'Azo-free plant dye & handspun cotton'
    },
    packagingCourier: {
      amount: 300,
      percentage: 8,
      description: 'Handmade banana fiber box & Speed Post'
    },
    cooperativeFund: {
      amount: 200,
      percentage: 5,
      description: 'Health & child loom apprenticeships'
    }
  };

  const copyBlockchainStamp = () => {
    navigator.clipboard?.writeText(craft.blockchainStamp || 'KAS-2024-DHW-089');
    setCopiedStamp(true);
    setTimeout(() => setCopiedStamp(false), 2500);
  };

  const handleCommissionClick = () => {
    setCommissionedSuccess(true);
    onCommission(craft);
    setTimeout(() => setCommissionedSuccess(false), 3000);
  };

  const sacredStitches = [
    {
      name: 'Gavanti (ಗವಂತಿ)',
      type: 'Double Running Stitch',
      desc: 'Forms unbroken geometric lines identical on both sides of the cloth. Used for temple Gopuras and borders without tying a single knot.'
    },
    {
      name: 'Murgi (ಮುರ್ಗಿ)',
      type: 'Zigzag Ladder Stitch',
      desc: 'Ascends diagonally like a temple staircase, requiring exact warp and weft thread calculations to maintain bilateral balance.'
    },
    {
      name: 'Negi (ನೇಗಿ)',
      type: 'Weaving Stitch',
      desc: 'Resembles traditional handloom warp patterns, laying rich swathes of color across larger motifs like peacocks and chariot wheels.'
    },
    {
      name: 'Menthi (ಮೆಂಥಿ)',
      type: 'Cross Stitch (Fenugreek)',
      desc: 'Intricate cross-stitch used sparingly for heavy fill areas and architectural bases, inspired by the geometry of sprouted fenugreek seeds.'
    }
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '1rem 1rem 8rem' }}>
      {/* Heritage Breadcrumbs & GI Authentication Top Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--color-surface-container-low)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-outline-variant)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
            Karnataka Heritage
          </span>
          <span style={{ color: 'var(--color-outline)' }}>›</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>
            Deccan Textile Guilds
          </span>
          <span style={{ color: 'var(--color-outline)' }}>›</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            Kasuti of Dharwad
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge-gi">
            <ShieldCheck size={13} />
            GI Tag #143 Certified (Geographical Indications Act 1999)
          </span>
        </div>
      </div>

      {/* Hero Masterwork Media Card with Motif Tags */}
      <div className="tactile-card" style={{ marginBottom: '2.5rem', overflow: 'hidden', border: '2px solid var(--color-outline-variant)' }}>
        <div style={{ position: 'relative', height: '420px', backgroundColor: 'var(--color-surface-container)' }}>
          <img
            src={craft.image}
            alt={craft.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Interactive Sacred Motif Overlay Identifier Tags */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            backgroundColor: 'rgba(28, 28, 24, 0.88)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            color: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={16} color="var(--color-primary-fixed)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Sacred Motif Identifier Tags (ಕ್ಲಿಕ್ ಮಾಡಿ ಪರಿಶೀಲಿಸಿ)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(craft.motifs || ['Gopura (Temple Tower)', 'Ratha (Sacred Chariot)', 'Mayura (Peacock)', 'Kamala (Lotus)']).map(motif => (
                <button
                  key={motif}
                  onClick={() => setActiveMotif(motif)}
                  style={{
                    backgroundColor: activeMotif === motif ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.78rem',
                    fontWeight: activeMotif === motif ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {motif}
                </button>
              ))}
            </div>

            <p style={{ fontSize: '0.75rem', color: '#e5e2dc', marginTop: '0.5rem' }}>
              Active inspect: <strong>{activeMotif}</strong> — Hand-counted directly into the warp threads without chalk outlines or carbon tracings.
            </p>
          </div>
        </div>

        {/* Title & Heritage Summary */}
        <div style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="headline-xl" style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                {craft.title}
              </h1>
              <p style={{ fontFamily: 'var(--font-headline)', fontSize: '1.25rem', color: 'var(--color-tertiary)', fontWeight: 600 }}>
                {craft.kannadaTitle || 'ಕೈಕಸೂತಿ ಪಲ್ಲೂರೇಷ್ಮೆ ಸೀರೆ'}
              </p>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: '0.5rem', maxWidth: '780px' }}>
                Dating back to the 7th-century Chalukya and Vijayanagara courts, Kasuti (from <em>Kai</em> meaning hand and <em>Suti</em> meaning cotton) is India's most architecturally precise counted-thread embroidery. A single saree represents over 40 hours of continuous calculation by master needlewomen.
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--color-surface-container-low)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-outline-variant)',
              minWidth: '220px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                Certified Time Investment
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-headline)' }}>
                {craft.craftHours} Hours
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-tertiary)', fontWeight: 600 }}>
                Knotless Reversible Geometry
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice of the Maker Capsule (Oral Heritage Player) */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-low)',
        border: '2px solid var(--color-tertiary-container)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80"
              alt="Rukmini Bai"
              style={{
                width: '88px',
                height: '88px',
                borderRadius: 'var(--radius-full)',
                objectFit: 'cover',
                border: '3px solid var(--color-tertiary)'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'var(--color-tertiary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Volume2 size={16} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <span className="badge-gi" style={{ marginBottom: '0.4rem' }}>
              Voice of the Maker • ಧ್ವನಿ ಸ್ಯಾಂಕ್ಚುರಿ
            </span>
            <h3 className="title-lg" style={{ color: 'var(--color-on-surface)', marginTop: '0.2rem' }}>
              Rukmini Bai Singing Rural Kasuti Ballads While Stitching
            </h3>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.88rem', margin: '0.35rem 0 0.85rem' }}>
              Recorded in Narendra Hamlet, Dharwad. Listen to authentic acoustic loom chants and oral transmission techniques passed from grandmother to granddaughter.
            </p>

            <button
              onClick={() => onOpenAudio(craft)}
              className="btn-primary"
              style={{ backgroundColor: 'var(--color-tertiary)' }}
            >
              <Volume2 size={18} className="animate-voice-pulse" />
              <span>ಕೇಳಿ • Listen Folk Song & Ballad (3:40 min)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Craft Philosophy & The 4 Sacred Stitches */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="badge-indigo" style={{ marginBottom: '0.35rem' }}>
            <Feather size={12} />
            Geometric Rigor
          </span>
          <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            The 4 Sacred Stitches of Kasuti
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
            Unlike western embroidery that conceals knots beneath linings, true Dharwad Kasuti creates an identical image on both face and reverse side.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {sacredStitches.map((st, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                borderTop: '4px solid var(--color-primary)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Stitch 0{i + 1} • {st.type}
              </div>
              <h3 className="title-lg" style={{ color: 'var(--color-on-surface)', margin: '0.25rem 0 0.5rem' }}>
                {st.name}
              </h3>
              <p className="body-md" style={{ fontSize: '0.82rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent Fair-Price Ledger Section */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '2px solid var(--color-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.75rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge-labor" style={{ marginBottom: '0.4rem' }}>
              <HeartHandshake size={12} />
              Zero Middleman Margin • ನೇರ ಲೆಡ್ಜರ್
            </span>
            <h2 className="headline-lg" style={{ color: 'var(--color-primary)' }}>
              Transparent Fair-Price Ledger
            </h2>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              Where every single rupee goes — verified and cryptographically stamped on the artisan ledger.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
              Total Certified Fair Value
            </div>
            <div className="headline-xl" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
              ₹{ledger.totalCertifiedPrice.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Visual Stacked Percentage Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            height: '24px',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ width: `${ledger.artisanWage.percentage}%`, backgroundColor: 'var(--color-primary)' }} title="Artisan Wage" />
            <div style={{ width: `${ledger.materials.percentage}%`, backgroundColor: 'var(--color-tertiary)' }} title="Raw Materials" />
            <div style={{ width: `${ledger.packagingCourier.percentage}%`, backgroundColor: 'var(--color-secondary)' }} title="Packaging & Courier" />
            <div style={{ width: `${ledger.cooperativeFund.percentage}%`, backgroundColor: '#8a726a' }} title="Cooperative Guild Fund" />
          </div>

          {/* Legend Items */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.25rem'
          }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-primary-fixed)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-on-primary-fixed)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                Direct Artisan Wage: {ledger.artisanWage.percentage}%
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)', margin: '4px 0' }}>
                ₹{ledger.artisanWage.amount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-primary-fixed-variant)' }}>
                {ledger.artisanWage.hours} verified hours @ ₹{ledger.artisanWage.hourlyRate}/hr
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-tertiary-fixed)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-on-tertiary-fixed)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-tertiary)' }} />
                Natural Khadi & Silk: {ledger.materials.percentage}%
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-tertiary)', margin: '4px 0' }}>
                ₹{ledger.materials.amount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-tertiary-fixed-variant)' }}>
                {ledger.materials.description}
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-secondary-fixed)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-on-secondary-fixed)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }} />
                Packaging & Courier: {ledger.packagingCourier.percentage}%
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '4px 0' }}>
                ₹{ledger.packagingCourier.amount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-secondary-fixed-variant)' }}>
                {ledger.packagingCourier.description}
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-surface-container-high)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8a726a' }} />
                Coop Guild Fund: {ledger.cooperativeFund.percentage}%
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-on-surface)', margin: '4px 0' }}>
                ₹{ledger.cooperativeFund.amount}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)' }}>
                {ledger.cooperativeFund.description}
              </div>
            </div>
          </div>
        </div>

        {/* Cryptographic Authenticity & GI Seal */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--color-surface-container)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          border: '1px solid var(--color-outline-variant)'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-tertiary)' }}>
              Government of India GI Act Registry #143
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Verifiable Blockchain Ledger Stamp: #{craft.blockchainStamp || 'KAS-2024-DHW-089'}
            </div>
          </div>

          <button
            onClick={copyBlockchainStamp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copiedStamp ? <CheckCircle size={14} color="var(--color-primary)" /> : <Copy size={14} />}
            <span>{copiedStamp ? 'Copied Stamp!' : 'Copy Hash'}</span>
          </button>
        </div>
      </div>

      {/* Meet the Dharwad Guild (Roster of 34 rural needlewomen) */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="badge-gi" style={{ marginBottom: '0.35rem' }}>
              <Users size={12} />
              Guild Custodians • ಸಂಘದ ಕುಶಲಕರ್ಮಿಗಳು
            </span>
            <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
              Meet the Dharwad Guild
            </h2>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              A collective of 34 rural needlewomen across Narendra, Garag, Navalur, and Kelageri hamlets.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
            <MapPin size={16} />
            <span>Dharwad Artisan Hub, Karnataka</span>
          </div>
        </div>

        {/* Master Artisan Portraits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {MOCK_GUILD_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="tactile-card"
              style={{ padding: '1.25rem', textAlign: 'center' }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: 'var(--radius-full)',
                  objectFit: 'cover',
                  margin: '0 auto 0.75rem',
                  border: '2px solid var(--color-primary)'
                }}
              />
              <h3 className="title-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '2px' }}>
                {member.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-tertiary)', fontSize: '0.85rem', fontWeight: 600 }}>
                {member.kannadaName}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700, margin: '4px 0' }}>
                {member.role} ({member.experienceYears} yrs master)
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', marginBottom: '0.5rem' }}>
                {member.specialty}
              </p>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-outline)', fontWeight: 600 }}>
                📍 {member.hamlet}
              </div>
            </div>
          ))}
        </div>

        {/* Mother-to-Daughter Transmission Cultural Quote */}
        <div style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderLeft: '4px solid var(--color-tertiary)',
          padding: '1.25rem 1.5rem',
          borderRadius: '0 var(--radius-lg) var(--radius-lg) 0'
        }}>
          <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--color-on-surface)', lineHeight: 1.6 }}>
            “A bride’s wedding trousseau in North Karnataka was traditionally incomplete without an Ilkal saree bearing Kasuti needlework hand-stitched by her mother and aunts. To stitch without knots is to pledge a life of uninterrupted harmony and endurance.”
          </p>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-tertiary)' }}>
            — Devamma H., Guild Elder & Natural Dye Custodian
          </div>
        </div>
      </div>

      {/* Sticky Commission Action Deck */}
      <div style={{
        position: 'sticky',
        bottom: '68px',
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1.5px solid var(--color-primary-container)',
        borderRadius: 'var(--radius-xl)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 35
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
              ₹{craft.price.toLocaleString('en-IN')}
            </span>
            {craft.originalPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--color-outline)', fontSize: '0.9rem' }}>
                ₹{craft.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
            Dispatch Estimate: 12 days • Direct UPI to Rukmini Devi
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onOpenAudio(craft)}
            className="btn-secondary"
            style={{ padding: '0.65rem 1rem' }}
          >
            <Volume2 size={18} />
            <span>Audio Summary</span>
          </button>

          <button
            onClick={handleCommissionClick}
            className="btn-primary"
            style={{ padding: '0.65rem 1.5rem', minWidth: '220px' }}
          >
            <Sparkles size={18} />
            <span>{commissionedSuccess ? 'ಕಮಿಷನ್ ಮಾಡಲಾಗಿದೆ! (Reserved)' : t.commissionNow}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
