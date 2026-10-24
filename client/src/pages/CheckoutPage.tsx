import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ShieldCheck, CheckCircle2, Loader2, Smartphone, CreditCard,
  Lock, Sparkles, Check, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { audioSystem } from '../utils/audioAssistant';

export const CheckoutPage: React.FC = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [buyerName, setBuyerName] = useState('Ananya Rao');
  const [buyerPhone, setBuyerPhone] = useState('9876543210');
  const [address, setAddress] = useState('Flat 402, Samriddhi Enclave, 14th Main, Indiranagar, Bengaluru - 560038');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-lg font-bold text-stone-900 mb-2 font-headline">No items to checkout</h2>
        <Link to="/" className="text-xs font-bold text-amber-800 underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || !address.trim()) {
      setErrorMsg('Please enter your full name, phone number, and delivery address.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);
    setProcessingStage(1);
    audioSystem.playChime('ding');

    try {
      // Stage 1: NPCI Handshake
      await new Promise(r => setTimeout(r, 700));
      setProcessingStage(2);

      // Stage 2: Escrow Lock
      await new Promise(r => setTimeout(r, 800));
      setProcessingStage(3);

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
        audioSystem.playChime('success');
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c2410c', '#15803d', '#f59e0b']
        });
        await new Promise(r => setTimeout(r, 500));
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
    { id: 'gpay', name: 'Google Pay', icon: '🟢', vpa: 'artisan@okaxis', color: 'border-emerald-400 bg-emerald-50/40' },
    { id: 'phonepe', name: 'PhonePe UPI', icon: '🟣', vpa: 'artisan@ybl', color: 'border-purple-400 bg-purple-50/40' },
    { id: 'paytm', name: 'Paytm UPI', icon: '🔵', vpa: 'artisan@paytm', color: 'border-blue-400 bg-blue-50/40' },
    { id: 'bhim', name: 'BHIM UPI', icon: '🟠', vpa: 'artisan@upi', color: 'border-amber-400 bg-amber-50/40' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 pb-28">
      {/* Back button */}
      <Link
        to="/cart"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-900 mb-5 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Bag</span>
      </Link>

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-headline">
            {t('checkoutTitle')}
          </h1>
          <p className="text-xs text-stone-500">
            Encrypted Direct Artisan Escrow • Zero Commission
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 mb-5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Form: Delivery & UPI selection */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handlePay} className="space-y-6">
            {/* Delivery Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100">
                <span className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Delivery Destination</span>
              </h2>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Ananya Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Phone / WhatsApp (for India Post Speed Post SMS tracking)
                </label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Complete Postal Delivery Address (House/Street/City/Pincode)
                </label>
                <textarea
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house/flat number, road, area, town, and pincode..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30 leading-relaxed"
                />
              </div>
            </div>

            {/* UPI Payment Selector Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100">
                <span className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Select 1-Tap UPI App</span>
              </h2>

              <p className="text-xs text-stone-500">
                Direct peer-to-peer VPA transfer. 100% of fair-wage moves to artisan village escrow without middleman deduction.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {upiApps.map((app) => {
                  const isSelected = selectedUpiApp === app.id;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedUpiApp(app.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? `ring-2 ring-amber-800 shadow-sm ${app.color}`
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-2xl">{app.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">{app.name}</span>
                        <span className="text-[10px] text-stone-400 font-mono">{app.vpa}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-amber-200" />
              <span>Pay ₹{totalAmount.toLocaleString('en-IN')} via UPI</span>
            </button>
          </form>
        </div>

        {/* Right Summary: Order Items & Escrow Ledger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 font-headline pb-2 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-amber-800 font-semibold">{cart.length} creations</span>
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate font-headline">{product.title}</h4>
                    <span className="text-[11px] text-stone-500">Qty: {qty} • {product.artisan_name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-950 font-headline">
                    ₹{(product.price * qty).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Direct Artisan Labor (Guaranteed)</span>
                <span className="text-amber-900 font-bold">~80%</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>India Post Speed Post</span>
                <span className="text-emerald-700 font-bold">Free</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline font-headline">
                <span className="font-bold text-sm text-stone-900">Total Fair Amount</span>
                <span className="text-xl font-black text-amber-950">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Escrow Guarantee Pill */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200/70 p-4 text-xs text-amber-950 font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Autonomous Fair Escrow</span>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              Upon UPI authorization, the amount is reserved in village cluster escrow and transferred directly to artisan bank accounts when Speed Post confirms pickup.
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Multi-Stage UPI Verification Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-stone-200 animate-slide-up space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-amber-800 animate-spin" />
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900 font-headline mb-1">
                NPCI UPI Gateway Verification
              </h3>
              <p className="text-xs text-stone-500">
                Processing peer-to-peer artisan transaction...
              </p>
            </div>

            <div className="space-y-2.5 text-left text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className={`flex items-center gap-2 ${processingStage >= 1 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                {processingStage >= 1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block" />}
                <span>Initiating secure VPA session</span>
              </div>
              <div className={`flex items-center gap-2 ${processingStage >= 2 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                {processingStage >= 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block" />}
                <span>Verifying 100% direct artisan escrow</span>
              </div>
              <div className={`flex items-center gap-2 ${processingStage >= 3 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                {processingStage >= 3 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block" />}
                <span>Generating Speed Post consignment</span>
              </div>
            </div>

            <div className="text-[11px] text-stone-400">
              Please do not refresh or close this window.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
