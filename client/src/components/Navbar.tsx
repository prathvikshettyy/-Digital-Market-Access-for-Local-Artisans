import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Sparkles, Globe, PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { totalCount } = useCart();
  const { artisan, logout } = useAuth();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'kn' ? 'en' : 'kn';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-orange-800 text-amber-50 flex items-center justify-center font-bold text-xl shadow-xs shadow-amber-900/20 group-hover:scale-105 transition-transform">
            ಕ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-stone-900 tracking-tight">KalaConnect</span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-full">
                {t('appName')}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              {t('appTagline')}
            </p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors"
            title="Language: English"
          >
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>English</span>
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2 rounded-xl text-stone-700 hover:text-amber-800 hover:bg-amber-50 transition-colors"
            title={t('cart')}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Artisan Portal / Dashboard */}
          {artisan ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/artisan/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors shadow-xs"
              >
                <img
                  src={artisan.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'}
                  alt={artisan.name}
                  className="w-5 h-5 rounded-full object-cover border border-amber-200"
                />
                <span className="hidden sm:inline">{artisan.name.split(' ')[0]}</span>
                <span className="sm:hidden">{t('artisanDashboard')}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/artisan/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-700/30 text-amber-900 bg-amber-50/60 hover:bg-amber-100 text-xs font-semibold transition-colors"
            >
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('artisanPortal')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

