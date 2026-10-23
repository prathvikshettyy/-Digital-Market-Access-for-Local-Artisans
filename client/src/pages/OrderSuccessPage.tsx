import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Truck, Home, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { Order } from '../types';

export const OrderSuccessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c2410c', '#b45309', '#15803d']
    });

    // Fetch order if possible
    fetch(`/api/orders`)
      .then(r => r.json())
      .catch(() => {});
  }, [id]);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-24 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <h1 className="text-2xl font-bold text-stone-900 mb-1">
        {t('orderSuccessTitle')}
      </h1>
      <p className="text-xs text-stone-500 mb-6">
        Order #{id} has been recorded and transmitted directly to the master artisan's dashboard.
      </p>

      {/* Direct Fair-Wage Note */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs mb-6 text-left space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
          <ShieldCheck className="w-4 h-4 text-green-700" />
          <span>Fair Trade Escrow Active</span>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Your payment is held in fair escrow. 100% of the artisan wage will be directly released to the village cluster bank account when India Post Speed Post picks up the package.
        </p>

        {/* Status Stepper */}
        <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
            Dispatch Lifecycle
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col items-center gap-1 text-green-800 font-bold">
              <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-[10px]">1</span>
              <span>Placed ✓</span>
            </div>
            <div className="h-0.5 flex-1 bg-green-300 mx-2" />
            <div className="flex flex-col items-center gap-1 text-amber-800 font-semibold">
              <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">2</span>
              <span>Packing</span>
            </div>
            <div className="h-0.5 flex-1 bg-stone-200 mx-2" />
            <div className="flex flex-col items-center gap-1 text-stone-400">
              <span className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px]">3</span>
              <span>Shipped</span>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-md"
      >
        <Home className="w-4 h-4" />
        <span>Return to Marketplace</span>
      </Link>
    </div>
  );
};
