import React from 'react';
import { X, ShieldCheck, Award, MapPin, CreditCard, CheckCircle, FileText, Phone } from 'lucide-react';

interface GuildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuildProfileModal: React.FC<GuildProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '580px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-gi">
              <ShieldCheck size={14} />
              Guild Provenance Registry • ಕುಶಲಕರ್ಮಿ ಸಂಘ
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

        {/* Guild Identity */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1.25rem',
          backgroundColor: 'var(--color-surface-container-low)',
          borderRadius: 'var(--radius-xl)',
          marginBottom: '1.5rem',
          border: '1.5px solid var(--color-outline-variant)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
            alt="Dharwad Needlewomen Guild"
            style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-full)', objectFit: 'cover', border: '3px solid var(--color-primary)' }}
          />
          <div>
            <h3 className="headline-md" style={{ color: 'var(--color-primary)' }}>
              Dharwad Needlewomen Collective
            </h3>
            <p style={{ fontFamily: 'var(--font-headline)', color: 'var(--color-tertiary)', fontWeight: 600 }}>
              ಧಾರವಾಡ ಕಸೂತಿ ಮಹಿಳಾ ಒಕ್ಕೂಟ
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
              <MapPin size={14} />
              <span>Narendra & Garag Clusters, Dharwad District, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Verification Credentials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          <div style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-surface-container-lowest)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>GI Registry Certificate</div>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>GI #143 (Geographical Indications of Goods Act 1999)</div>
            </div>
            <Award size={20} color="var(--color-primary)" />
          </div>

          <div style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-surface-container-lowest)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Linked Direct Banking (Zero Cut)</div>
              <div style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>Canara Bank Rural Branch Hubballi (A/C ••4920)</div>
            </div>
            <CreditCard size={20} color="var(--color-secondary)" />
          </div>

          <div style={{
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-surface-container-lowest)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>Thread-Count Inspection History</div>
              <div style={{ fontWeight: 700, color: '#2e7d32' }}>100% Knotless Reversible Geometry • 0 Faults Reported</div>
            </div>
            <CheckCircle size={20} color="#2e7d32" />
          </div>
        </div>

        {/* Vernacular Cluster Coordinator Contact */}
        <div style={{
          backgroundColor: 'var(--color-surface-container)',
          padding: '1rem',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)' }}>Vernacular Cluster Coordinator</div>
            <div style={{ fontWeight: 700 }}>Smt. Parvathi B. (Dharwad Artisan Hub)</div>
          </div>
          <a
            href="tel:18004255723"
            className="btn-secondary"
            style={{ textDecoration: 'none', padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
          >
            <Phone size={14} />
            <span>Call Coordinator</span>
          </a>
        </div>
      </div>
    </div>
  );
};
