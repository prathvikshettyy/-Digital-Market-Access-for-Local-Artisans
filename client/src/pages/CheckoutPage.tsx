import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, CheckCircle2, Loader2, Smartphone, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-bold text-stone-900 mb-2">No items to checkout</h2>
        <Link to="/" className="text-xs font-semibold text-amber-800 underline">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !address.trim()) {
      setErrorMsg('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    try {
      // Simulate 1.5s UPI verification
      await new Promise(res => setTimeout(res, 1400));

      const payload = {
        buyer_name: buyerName.trim(),
        buyer_phone: buyerPhone.trim(),
        address: address.trim(),
        items: cart.map(item => ({
          product_id: item.product.id,
          qty: item.qty,
          price: item.product.price
        }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        navigate(`/order-success/${data.order.id}`);
      } else {
        setErrorMsg(data.error || 'Failed to complete transaction.');
        setIsProcessing(false);
      }
    } catch {
      setErrorMsg('Network error connecting to payment gateway.');
      setIsProcessing(false);
    }
  };

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '🟢', vpa: 'artisan@okaxis' },
    { id: 'phonepe', name: 'PhonePe', icon: '🟣', vpa: 'artisan@ybl' },
    { id: 'paytm', name: 'Paytm UPI', icon: '🔵', vpa: 'artisan@paytm' },
    { id: 'bhim', name: 'BHIM UPI', icon: '🟠', vpa: 'artisan@upi' },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-4 sm:py-6 pb-24">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Cart</span>
      </Link>

      <h1 className="text-xl font-bold text-stone-900 mb-4">
        {t('checkoutTitle')}
      </h1>

      {errorMsg && (
        <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePay} className="space-y-4">
        {/* Buyer Information */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
          <h2 className="font-bold text-sm text-stone-900">1. Delivery Address</h2>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t('buyerName')} *
            </label>
            <input
              type="text"
              required
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="e.g., Ananya Sharma"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t('buyerPhone')} *
            </label>
            <input
              type="tel"
              required
              value={buyerPhone}
              onChange={(e) => setBuyerPhone(e.target.value)}
              placeholder="10-digit mobile number"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {t('deliveryAddress')} *
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Apartment #, Street, City, Pincode"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>
        </div>

        {/* Fake UPI Screen */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-stone-900">2. Instant UPI Escrow (Mock Payment)</h2>
            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              Zero Platform Fee
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {upiApps.map((app) => (
              <button
                type="button"
                key={app.id}
                onClick={() => setSelectedUpiApp(app.id)}
                className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  selectedUpiApp === app.id
                    ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-700/20'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                }`}
              >
                <span className="text-lg">{app.icon}</span>
                <div>
                  <div className="font-bold text-xs text-stone-900">{app.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono">1-tap pay</div>
                </div>
              </button>
            ))}
          </div>

          {/* Direct Fair Wage Assurance */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <span>
              {t('mockPaymentNotice')} Total ₹{totalAmount.toLocaleString('en-IN')} will be held in direct escrow for the artisan.
            </span>
          </div>
        </div>

        {/* Submit Payment Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-800 to-orange-900 hover:from-amber-900 hover:to-orange-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying UPI Transaction...</span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4" />
              <span>{t('payNow')} • ₹{totalAmount.toLocaleString('en-IN')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
