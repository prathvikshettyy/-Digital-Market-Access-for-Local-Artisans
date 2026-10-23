import React from 'react';
import { X, Scale, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import { CraftItem, FairPriceLedger } from '../types/craft';

interface FairPriceLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  craft: CraftItem | null;
  ledger: FairPriceLedger | null;
}

export const FairPriceLedgerModal: React.FC<FairPriceLedgerModalProps> = ({
  isOpen,
  onClose,
  craft,
  ledger
}) => {
  if (!isOpen || !craft || !ledger) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '580px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-labor">
              <Scale size={14} />
              Fair-Price Ledger • ಪ್ರಾಮಾಣಿಕ ಬೆಲೆ ವಿವರಣೆ
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

        {/* Craft Brief */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'var(--color-surface-container-low)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.5rem',
          border: '1px solid var(--color-outline-variant)'
        }}>
          <img
            src={craft.image}
            alt={craft.title}
            style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
          />
          <div>
            <h3 className="title-lg" style={{ color: 'var(--color-primary)' }}>
              {craft.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
              By {craft.artisanName} ({craft.artisanCluster})
            </p>
            <span className="badge-gi" style={{ marginTop: '4px' }}>
              Certified Price: ₹{ledger.totalCertifiedPrice}
            </span>
          </div>
        </div>

        {/* Visual Stacked Percentage Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            height: '20px',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <div style={{ width: `${ledger.artisanWage.percentage}%`, backgroundColor: 'var(--color-primary)' }} />
            <div style={{ width: `${ledger.materials.percentage}%`, backgroundColor: 'var(--color-tertiary)' }} />
            <div style={{ width: `${ledger.packagingCourier.percentage}%`, backgroundColor: 'var(--color-secondary)' }} />
            <div style={{ width: `${ledger.cooperativeFund.percentage}%`, backgroundColor: '#8a726a' }} />
          </div>

          {/* Breakdown Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Artisan Wage */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'var(--color-primary-fixed)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-on-primary-fixed)' }}>
                  1. Direct Artisan Wage ({ledger.artisanWage.percentage}%)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-on-primary-fixed-variant)' }}>
                  {ledger.artisanWage.hours} verified hours @ ₹{ledger.artisanWage.hourlyRate}/hour
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                ₹{ledger.artisanWage.amount}
              </div>
            </div>

            {/* Raw Materials */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'var(--color-tertiary-fixed)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-on-tertiary-fixed)' }}>
                  2. Pure Raw Materials ({ledger.materials.percentage}%)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-on-tertiary-fixed-variant)' }}>
                  {ledger.materials.description}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-tertiary)' }}>
                ₹{ledger.materials.amount}
              </div>
            </div>

            {/* Packaging & Courier */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'var(--color-secondary-fixed)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-on-secondary-fixed)' }}>
                  3. Fair Logistics & Packaging ({ledger.packagingCourier.percentage}%)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-on-secondary-fixed-variant)' }}>
                  {ledger.packagingCourier.description}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-secondary)' }}>
                ₹{ledger.packagingCourier.amount}
              </div>
            </div>

            {/* Cooperative Guild Fund */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'var(--color-surface-container-high)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-on-surface)' }}>
                  4. Cooperative Guild Apprenticeship Fund ({ledger.cooperativeFund.percentage}%)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)' }}>
                  {ledger.cooperativeFund.description}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-on-surface)' }}>
                ₹{ledger.cooperativeFund.amount}
              </div>
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--color-surface-container-lowest)',
          border: '1.5px solid var(--color-outline-variant)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
              Middleman / Aggregator Markup
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2e7d32' }}>
              ₹0 (0% Platform Cut)
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
              Total Verified Price
            </div>
            <div className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
              ₹{ledger.totalCertifiedPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
