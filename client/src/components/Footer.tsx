import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, MapPin, Feather, Sparkles, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-amber-900/30 text-xs">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-700 to-orange-800 text-amber-50 flex items-center justify-center font-extrabold text-lg shadow-sm">
                ಕ
              </div>
              <span className="font-extrabold text-lg text-white font-headline">
                KalaConnect (ಕಲಾಕನೆಕ್ಟ್)
              </span>
            </div>
            <p className="text-stone-400 text-xs max-w-sm leading-relaxed">
              Autonomous digital fair-wage sanctuary engineered for coastal Indian master artisans. We preserve 7th-century knotless Kasuti, forest-foraged Beedu palm weaving, and GI-certified Udupi pit-loom handlooms with 100% direct escrow.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Intermediary Certified • ₹80/hr Guaranteed Living Wage</span>
            </div>
          </div>

          {/* Craft Clusters */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 font-headline">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Heritage Clusters</span>
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>• Dharwad & Hubballi (Kasuti Embroidery)</li>
              <li>• Kundapura Coast (Beedu Wild Palm)</li>
              <li>• Udupi & Talipady (Kora Handloom)</li>
              <li>• Bidar & Deccan (Bidriware Silver Inlay)</li>
            </ul>
          </div>

          {/* Fair-Trade Charter */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 font-headline">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Escrow Charter</span>
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>• 100% Direct to Maker UPI Escrow</li>
              <li>• Transparent Living Wage Ledger</li>
              <li>• India Post Speed Post Tracked</li>
              <li>• Scannable Provenance QR on each piece</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} KalaConnect. Crafted with devotion for indigenous Indian master custodians.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/artisan/login" className="hover:text-amber-300 transition-colors">
              Artisan Workshop Login
            </Link>
            <span>•</span>
            <Link to="/" className="hover:text-amber-300 transition-colors">
              Marketplace Catalogue
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
