import React, { useState } from 'react';
import { X, Printer, CheckCircle, ShieldCheck, Download, Truck } from 'lucide-react';
import { ArtisanOrder } from '../types/craft';

interface QrPickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: ArtisanOrder | null;
  onConfirmDispatch?: (orderId: string) => void;
}

export const QrPickupModal: React.FC<QrPickupModalProps> = ({
  isOpen,
  onClose,
  order,
  onConfirmDispatch
}) => {
  const [isPrinted, setIsPrinted] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    setIsPrinted(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleDispatchComplete = () => {
    setIsDispatched(true);
    if (onConfirmDispatch) {
      onConfirmDispatch(order.orderId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '540px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-indigo">
              <Truck size={14} />
              India Post Speed Post Waybill • ರವಾನೆ ಚೀಟಿ
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

        {/* Vernacular Packing Instructions Header */}
        <div style={{
          backgroundColor: 'var(--color-primary-fixed)',
          color: 'var(--color-on-primary-fixed)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <ShieldCheck size={24} color="var(--color-primary)" />
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>
              ಅಂಚೆ ನೌಕರರಿಗೆ ಈ QR ಕೋಡ್ ತೋರಿಸಿ (Show QR to India Post Agent)
            </p>
            <p style={{ fontSize: '0.75rem' }}>
              ರವಾನಿಸಿದ 24 ಗಂಟೆಗಳಲ್ಲಿ ₹{order.netPayout} ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರವಾಗಿ ಜಮೆಯಾಗುತ್ತದೆ.
            </p>
          </div>
        </div>

        {/* Thermal Waybill Simulation Card */}
        <div className="thermal-receipt" style={{ marginBottom: '1.5rem' }}>
          {/* Waybill Header */}
          <div style={{ textAlign: 'center', borderBottom: '1px dashed #444', paddingBottom: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px' }}>
              ★ INDIA POST SPEED POST ★
            </div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
              Hastakar Vernacular Guild Logistics Hub
            </div>
            <div style={{ fontSize: '0.7rem' }}>
              Waybill #{order.trackingId || 'IP-SPEED-KA-883921'} • GI Certified Handloom
            </div>
          </div>

          {/* QR Code Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem',
            backgroundColor: '#ffffff',
            border: '2px solid #222',
            borderRadius: '4px',
            marginBottom: '0.75rem',
            width: '180px',
            margin: '0 auto 0.75rem'
          }}>
            {/* High visual fidelity SVG QR Code */}
            <svg width="150" height="150" viewBox="0 0 100 100" style={{ display: 'block' }}>
              {/* Corner position markers */}
              <rect x="5" y="5" width="26" height="26" fill="#111" />
              <rect x="8" y="8" width="20" height="20" fill="#fff" />
              <rect x="12" y="12" width="12" height="12" fill="#111" />

              <rect x="69" y="5" width="26" height="26" fill="#111" />
              <rect x="72" y="8" width="20" height="20" fill="#fff" />
              <rect x="76" y="12" width="12" height="12" fill="#111" />

              <rect x="5" y="69" width="26" height="26" fill="#111" />
              <rect x="8" y="72" width="20" height="20" fill="#fff" />
              <rect x="12" y="76" width="12" height="12" fill="#111" />

              {/* Data matrix nodes */}
              <rect x="36" y="8" width="8" height="6" fill="#111" />
              <rect x="48" y="6" width="6" height="8" fill="#111" />
              <rect x="58" y="10" width="6" height="6" fill="#111" />

              <rect x="8" y="36" width="6" height="8" fill="#111" />
              <rect x="18" y="44" width="8" height="6" fill="#111" />
              <rect x="8" y="54" width="6" height="8" fill="#111" />

              <rect x="38" y="38" width="24" height="24" fill="#943512" rx="4" />
              {/* Hastakar 'H' icon in QR center */}
              <text x="50" y="55" fontSize="16" fontWeight="bold" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">
                ಹ
              </text>

              <rect x="68" y="38" width="6" height="8" fill="#111" />
              <rect x="80" y="42" width="8" height="8" fill="#111" />
              <rect x="72" y="54" width="8" height="6" fill="#111" />
              <rect x="86" y="58" width="6" height="8" fill="#111" />

              <rect x="36" y="72" width="8" height="6" fill="#111" />
              <rect x="48" y="68" width="6" height="8" fill="#111" />
              <rect x="58" y="74" width="8" height="8" fill="#111" />
              <rect x="70" y="76" width="8" height="6" fill="#111" />
              <rect x="82" y="80" width="10" height="8" fill="#111" />
            </svg>
            <div style={{ fontSize: '0.65rem', fontWeight: 'bold', marginTop: '4px', letterSpacing: '0.5px' }}>
              SCAN TO VERIFY DISPATCH
            </div>
          </div>

          {/* Details Table */}
          <div style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #888', padding: '3px 0' }}>
              <span>Order ID:</span>
              <strong>#{order.orderId}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #888', padding: '3px 0' }}>
              <span>Craft Article:</span>
              <strong>{order.craftTitle}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #888', padding: '3px 0' }}>
              <span>Destination:</span>
              <span>{order.buyerName}, {order.buyerCity}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #888', padding: '3px 0' }}>
              <span>Scheduled Pickup:</span>
              <strong>{order.pickupTime}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #888', padding: '3px 0' }}>
              <span>Insured Value:</span>
              <span>₹{order.netPayout + 600}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 0 2px',
              fontWeight: 'bold',
              color: 'var(--color-primary)',
              fontSize: '0.9rem'
            }}>
              <span>Direct Artisan Payout:</span>
              <span>₹{order.netPayout} (100% to Maker)</span>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '0.75rem',
            paddingTop: '0.5rem',
            borderTop: '1px dashed #555',
            fontSize: '0.68rem',
            color: '#555'
          }}>
            India Post Barcode: |||||| | |||||||| | |||||| ||||||||| | |||
          </div>
        </div>

        {/* Actions Deck */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrint}
            className="btn-secondary"
            style={{ flex: 1, minWidth: '150px' }}
          >
            <Printer size={18} />
            <span>{isPrinted ? 'ಮುದ್ರಿಸಲಾಗಿದೆ (Printed)' : 'ಮುದ್ರಿಸಿ (Print Label)'}</span>
          </button>

          <button
            onClick={handleDispatchComplete}
            disabled={isDispatched}
            className="btn-primary"
            style={{
              flex: 1.2,
              minWidth: '180px',
              backgroundColor: isDispatched ? '#2e7d32' : 'var(--color-primary)'
            }}
          >
            <CheckCircle size={18} />
            <span>{isDispatched ? 'ರವಾನಿಸಲಾಗಿದೆ! (Dispatched)' : 'ಅಂಚೆಗೆ ಹಸ್ತಾಂತರಿಸಿದೆ (Handed Over)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
