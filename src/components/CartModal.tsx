import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CraftItem } from '../types/craft';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CraftItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart
}) => {
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#943512', '#804500', '#465f88']
    });
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '1.75rem', maxWidth: '540px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-gi">
              <Sparkles size={13} />
              Commission Cart • ಕಮಿಷನ್ ಬ್ಯಾಗ್ ({cartItems.length})
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

        {isOrdered ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ! (Commission Confirmed)
            </h3>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
              100% of your payment is escrowed directly for the artisan. Speed Post tracking details will be dispatched within 24 hours.
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
              ನಿಮ್ಮ ಬ್ಯಾಗ್ ಖಾಲಿಯಾಗಿದೆ (Your commission cart is empty)
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-outline)', marginTop: '0.25rem' }}>
              Explore the curated masterworks in the Bazaar and commission directly from village custodians.
            </p>
          </div>
        ) : (
          <div>
            {/* Items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', maxHeight: '320px', overflowY: 'auto' }}>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: 'var(--color-surface-container-low)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-outline-variant)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)' }}>
                        {item.artisanName} • {item.craftHours}h needlework
                      </p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-outline)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Direct Fair-Trade Escrow Assurance */}
            <div style={{
              backgroundColor: 'var(--color-primary-fixed)',
              color: 'var(--color-on-primary-fixed)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <ShieldCheck size={22} color="var(--color-primary)" />
              <div style={{ fontSize: '0.78rem' }}>
                <strong>Direct Artisan Payout Guarantee:</strong> Funds are transferred directly to the artisan's Canara Bank account upon Speed Post dispatch.
              </div>
            </div>

            {/* Total & Checkout */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-outline-variant)',
              marginBottom: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>Total Commission:</span>
                <div className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', minWidth: '180px' }}
              >
                <span>Direct UPI Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
