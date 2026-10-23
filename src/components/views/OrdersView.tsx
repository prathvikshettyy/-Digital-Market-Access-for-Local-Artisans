import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Volume2,
  QrCode,
  CreditCard,
  Building2,
  Clock,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Printer,
  ChevronRight,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { ArtisanOrder, Language } from '../../types/craft';
import { audioSystem } from '../../utils/audioAssistant';
import { VERNACULAR_TRANSLATIONS } from '../../data/mockCrafts';

interface OrdersViewProps {
  orders: ArtisanOrder[];
  currentLang: Language;
  onOpenQrPickup: (order: ArtisanOrder) => void;
  onOpenAudioGuide: (title: string, duration: string, text: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  currentLang,
  onOpenQrPickup,
  onOpenAudioGuide
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const t = VERNACULAR_TRANSLATIONS[currentLang];

  const handlePlayBriefing = () => {
    audioSystem.speakText(
      'ನಮಸ್ಕಾರ. ಇಂದು ಸಂಜೆ 4 ಗಂಟೆಗೆ ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಪಿಕಪ್‌ಗಾಗಿ 3 ಆರ್ಡರ್‌ಗಳು ಬಾಕಿ ಇವೆ. ಬೆಂಗಳೂರಿನ ಅನನ್ಯಾ ಅವರ ಕಸೂತಿ ದುಪಟ್ಟಾ ಮೊದಲನೆಯದು. ಮುಂಬೈ ಆರ್ಡರ್ ಈಗಾಗಲೇ ದಾರಿಯಲ್ಲಿದೆ.',
      'kn'
    );
  };

  const handlePackingAudio = (order: ArtisanOrder) => {
    const text = order.status === 'Pack Today'
      ? `ಆರ್ಡರ್ #${order.orderId} ಪ್ಯಾಕಿಂಗ್ ವಿವರಣೆ: ಬಟ್ಟೆಯನ್ನು ಬಾಳೆ ನಾರಿನ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಮಡಚಿ ಇಡಿ. ಒಳಗೆ ಕರಕುಶಲ ಪ್ರಮಾಣಪತ್ರ ಸೇರಿಸಿ ಮತ್ತು ವೇಬಿಲ್ ಅಂಟಿಸಿ.`
      : `ಆರ್ಡರ್ #${order.orderId} ವಿವರಣೆ: ವೇಗ ಅಂಚೆ ಮೂಲಕ ರವಾನಿಸಲಾಗಿದೆ.`;

    onOpenAudioGuide(order.audioGuideTitle || 'ಆಡಿಯೋ ಪ್ಯಾಕಿಂಗ್ ವಿವರಣೆ', order.audioGuideDuration || '0:42', text);
  };

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '1rem 1rem 8rem' }}>
      {/* Cluster Header with GI & Master ID */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--color-surface-container-low)',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--color-outline-variant)',
        marginBottom: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-secondary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="title-lg" style={{ color: 'var(--color-on-surface)' }}>
                Guledgudda Loom Cluster • ಗುಳೇದಗುಡ್ಡ ಮಗ್ಗ ಸಮೂಹ
              </span>
              <span className="badge-gi">GI Tag #438</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-on-surface-variant)' }}>
              Master Artisan KA-BAG-204 • Canara Bank Linked (••4920)
            </p>
          </div>
        </div>

        {/* Vernacular Spoken Briefing Button */}
        <button
          onClick={handlePlayBriefing}
          className="btn-primary"
          style={{ backgroundColor: 'var(--color-primary)', fontSize: '0.82rem', padding: '0.55rem 1rem' }}
        >
          <Volume2 size={18} className="animate-voice-pulse" />
          <span>ಆಡಿಯೋ ವಿವರಣೆ (Audio Briefing)</span>
        </button>
      </div>

      {/* Monthly Earnings Hero Card & Direct UPI Tracker */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Earnings Card */}
        <div className="tactile-card" style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f6f3ed 100%)',
          border: '2px solid var(--color-primary-fixed)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span className="badge-labor">100% Direct Payout</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>
              Zero Deductions
            </span>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
            Earned This Month (ಈ ತಿಂಗಳ ಗಳಿಕೆ)
          </div>
          <div className="headline-xl" style={{ color: 'var(--color-primary)', fontWeight: 800, margin: '4px 0 8px' }}>
            ₹18,450
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
            <CreditCard size={16} color="var(--color-primary)" />
            <span>Direct to Canara Bank UPI (••4920)</span>
          </div>

          {/* Operational Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-outline-variant)'
          }}>
            <div style={{ backgroundColor: 'var(--color-primary-fixed)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-on-primary-fixed-variant)', fontWeight: 700 }}>
                {t.packToday}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                3 Crafts
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-secondary-fixed)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-on-secondary-fixed-variant)', fontWeight: 700 }}>
                {t.inTransit}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                4 Crafts
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Direct Payout Tracker */}
        <div className="tactile-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span className="badge-gi">Upcoming Direct Payout</span>
            <Clock size={16} color="var(--color-tertiary)" />
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
            Scheduled Transfer
          </div>
          <div className="headline-lg" style={{ color: 'var(--color-tertiary)', fontWeight: 800, margin: '2px 0 6px' }}>
            ₹4,800
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)', marginBottom: '1.25rem' }}>
            Automatic transfer tomorrow at <strong>11:00 AM</strong> to UPI
          </p>

          {/* 4-Stage Stepper Tracker */}
          <div style={{ backgroundColor: 'var(--color-surface-container-low)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Payout Stage 3 of 4: Verified by India Post Logistics
            </div>

            <div style={{ display: 'flex', gap: '4px', height: '6px', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div style={{ flex: 1, backgroundColor: 'var(--color-primary)' }} title="Order Confirmed" />
              <div style={{ flex: 1, backgroundColor: 'var(--color-primary)' }} title="Craft Inspected" />
              <div style={{ flex: 1, backgroundColor: 'var(--color-primary)' }} title="Handed over to India Post" />
              <div style={{ flex: 1, backgroundColor: 'var(--color-outline-variant)' }} title="Bank Cleared" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--color-on-surface-variant)' }}>
              <span>Inspected</span>
              <span>In Post Transit</span>
              <strong style={{ color: 'var(--color-primary)' }}>Bank Credit Next</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders Queue */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className="headline-md" style={{ color: 'var(--color-on-surface)' }}>
            Active Orders Queue (ಸಕ್ರಿಯ ಆದೇಶಗಳ ಪಟ್ಟಿ)
          </h3>

          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['All', 'Pack Today', 'In Transit', 'Delivered'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: filterStatus === st ? '1px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                  backgroundColor: filterStatus === st ? 'var(--color-primary-fixed)' : 'transparent',
                  color: filterStatus === st ? 'var(--color-on-primary-fixed)' : 'var(--color-on-surface)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Order Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredOrders.map(order => {
            const isPackToday = order.status === 'Pack Today';
            const isInTransit = order.status === 'In Transit';

            return (
              <div
                key={order.orderId}
                className="tactile-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  borderLeft: isPackToday
                    ? '5px solid var(--color-primary)'
                    : isInTransit
                      ? '5px solid var(--color-secondary)'
                      : '5px solid #2e7d32'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img
                      src={order.image}
                      alt={order.craftTitle}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: 'var(--radius-lg)',
                        objectFit: 'cover',
                        border: '1.5px solid var(--color-outline-variant)'
                      }}
                    />

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                          #{order.orderId}
                        </span>
                        <span
                          className={isPackToday ? 'badge-labor' : isInTransit ? 'badge-indigo' : 'badge-gi'}
                          style={{ fontSize: '0.68rem' }}
                        >
                          {order.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-outline)', fontWeight: 600 }}>
                          Pickup: {order.pickupTime}
                        </span>
                      </div>

                      <h4 className="title-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '2px' }}>
                        {order.craftTitle}
                      </h4>
                      {order.kannadaCraftTitle && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-tertiary)', fontWeight: 600 }}>
                          {order.kannadaCraftTitle}
                        </p>
                      )}
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                        Customer: <strong>{order.buyerName}</strong> ({order.buyerCity}) • {order.specText}
                      </p>
                    </div>
                  </div>

                  {/* Net Payout Box */}
                  <div style={{ textAlign: 'right', minWidth: '150px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-on-surface-variant)', fontWeight: 600 }}>
                      Net Payout to Bank
                    </div>
                    <div className="headline-md" style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                      ₹{order.netPayout.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#2e7d32', fontWeight: 700 }}>
                      ✓ 100% Direct Payout
                    </div>
                  </div>
                </div>

                {/* Action Strip */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--color-outline-variant)',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  {/* Vernacular Audio Packing Guide */}
                  <button
                    onClick={() => handlePackingAudio(order)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Volume2 size={16} />
                    <span>{order.audioGuideTitle || 'ಆಡಿಯೋ ಪ್ಯಾಕಿಂಗ್ ವಿವರಣೆ'}</span>
                  </button>

                  {/* Show QR / Thermal Waybill Print button */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => onOpenQrPickup(order)}
                      className="btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                    >
                      <QrCode size={16} />
                      <span>Print / Show Pick-up QR</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artisan Sahayata Kendra (Vernacular Help Desk) */}
      <div style={{
        backgroundColor: 'var(--color-surface-container-low)',
        border: '1.5px solid var(--color-outline-variant)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-tertiary-fixed)',
            color: 'var(--color-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PhoneCall size={24} />
          </div>
          <div>
            <h4 className="title-lg" style={{ color: 'var(--color-on-surface)' }}>
              Artisan Sahayata Kendra (ಕುಶಲಕರ್ಮಿ ಸಹಾಯ ಕೇಂದ್ರ)
            </h4>
            <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.82rem' }}>
              For illiterate artisans requiring packaging supplies, barcode sticker printing, or dispatch collection assistance.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="tel:18004255723"
            className="btn-secondary"
            style={{ textDecoration: 'none', fontSize: '0.82rem', padding: '0.5rem 1rem' }}
          >
            <PhoneCall size={16} />
            <span>1800-425-KRAFT (Toll-Free)</span>
          </a>

          <a
            href="https://wa.me/919980123456?text=Hastakar%20Artisan%20Help%20Request"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', fontSize: '0.82rem', padding: '0.5rem 1rem', backgroundColor: '#128C7E' }}
          >
            <MessageCircle size={16} />
            <span>WhatsApp Voice Note Help</span>
          </a>
        </div>
      </div>
    </div>
  );
};
