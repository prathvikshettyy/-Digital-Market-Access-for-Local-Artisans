import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, PackageCheck, Truck, Home, ShieldCheck, Copy, Check,
  QrCode, Award, Clock, ArrowRight, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { audioSystem } from '../utils/audioAssistant';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [copiedConsignment, setCopiedConsignment] = useState(false);

  const consignmentId = `EK${(100000000 + (parseInt(id || '1') * 987654) % 899999999)}IN`;

  useEffect(() => {
    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#c2410c', '#15803d', '#f59e0b', '#3b82f6']
    });

    audioSystem.playChime('success');
  }, [id]);

  const handleCopyConsignment = () => {
    navigator.clipboard.writeText(consignmentId);
    setCopiedConsignment(true);
    audioSystem.playChime('ding');
    setTimeout(() => setCopiedConsignment(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 pb-32 text-center animate-slide-up">
      {/* Celebratory Icon */}
      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-300 shadow-lg shadow-emerald-900/10 animate-bounce">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        <span>100% Direct Artisan Escrow Secured</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2 font-headline">
        {i18n.language === 'kn' ? 'ಆದೇಶ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!' : 'Patron Order Placed Successfully!'}
      </h1>
      <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6 leading-relaxed">
        {i18n.language === 'kn'
          ? `ಆರ್ಡರ್ #${id} ಕುಶಲಕರ್ಮಿಗಳ ಕಮ್ಮಟಕ್ಕೆ ರವಾನೆಯಾಗಿದೆ. ನೇರ ಕೂಲಿಯು ಎಸ್ಕ್ರೋದಲ್ಲಿ ಭದ್ರವಾಗಿದೆ.`
          : `Order #${id} has been transmitted directly to the rural artisan's workshop. 100% of the fair wage is securely held in village escrow.`}
      </p>

      {/* Consignment Tracking Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs mb-6 text-left space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-stone-400 block tracking-wider">
              India Post Speed Post Tracking
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-sm sm:text-base font-extrabold text-stone-900">
                {consignmentId}
              </span>
              <button
                onClick={handleCopyConsignment}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 hover:text-stone-900 transition-colors"
                title="Copy Consignment ID"
              >
                {copiedConsignment ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Expected Dispatch: Within 24h</span>
          </div>
        </div>

        {/* Dispatch Stepper with Animations */}
        <div>
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
            Realtime Fulfillment Lifecycle
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 space-y-1">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold mx-auto">✓</span>
              <span className="font-bold text-emerald-950 block">1. Placed</span>
              <span className="text-[10px] text-emerald-700 block">UPI Verified</span>
            </div>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-300 space-y-1 animate-pulse">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold mx-auto">2</span>
              <span className="font-bold text-amber-950 block">2. In Workshop</span>
              <span className="text-[10px] text-amber-800 block">Artisan Packing</span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200 space-y-1 opacity-60">
              <span className="w-6 h-6 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center text-[10px] font-bold mx-auto">3</span>
              <span className="font-bold text-stone-700 block">3. Dispatched</span>
              <span className="text-[10px] text-stone-500 block">Speed Post Pickup</span>
            </div>
          </div>
        </div>

        {/* Provenance Certificate Stamp */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="font-bold text-amber-950 block font-headline">
              Digitally Verified Provenance Certificate Generated
            </strong>
            <p className="text-stone-600 mt-0.5 leading-relaxed">
              A stamped physical parchment certificate featuring the master artisan's signature and counted-thread lineage will be enclosed inside the parcel.
            </p>
          </div>
        </div>
      </div>

      {/* Return Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-xs sm:text-sm font-bold transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Marketplace</span>
        </Link>

        <Link
          to="/artisan/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-bold transition-all shadow-xs"
        >
          <span>Switch to Artisan View</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
