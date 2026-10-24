import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Volume2, VolumeX, Sparkles, Globe, Compass, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { audioSystem } from '../utils/audioAssistant';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { totalCount } = useCart();
  const { artisan, logout } = useAuth();
  const navigate = useNavigate();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'kn' ? 'en' : 'kn';
    i18n.changeLanguage(nextLang);
    audioSystem.playChime('ding');
  };

  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      audioSystem.stop();
      setIsPlayingAudio(false);
    } else {
      audioSystem.playLoomChantSnippet(() => setIsPlayingAudio(false));
      setIsPlayingAudio(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-900/10 shadow-xs transition-all">
      {/* Top Heritage Notice Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 text-[11px] py-1 px-4 text-center font-medium border-b border-amber-800/30 flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>100% Direct Fair-Trade • Guaranteed ₹80/hr Artisan Living Wage • Zero Middleman Markup</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-700 via-orange-800 to-amber-900 text-amber-50 flex items-center justify-center font-extrabold text-2xl shadow-md shadow-amber-900/25 group-hover:scale-105 group-hover:rotate-1 transition-all">
              ಕ
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center" title="Active Artisan Verified">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-stone-900 tracking-tight font-headline group-hover:text-amber-900 transition-colors">
                KalaConnect
              </span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 border border-amber-300/60 px-2 py-0.5 rounded-full tracking-wide uppercase">
                {i18n.language === 'kn' ? 'ಕಲಾಕನೆಕ್ಟ್' : 'Fair Sanctuary'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:flex items-center gap-1.5">
              <span>{t('appTagline')}</span>
              <span className="text-stone-300">•</span>
              <span className="text-amber-800/80 font-medium">Dharwad • Udupi • Kundapura</span>
            </p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Folk Loom Sound Toggle */}
          <button
            onClick={toggleAmbientSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isPlayingAudio
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-stone-50 border-stone-200/80 text-stone-600 hover:bg-stone-100'
            }`}
            title={isPlayingAudio ? 'Pause Artisan Loom Beat & Drone' : 'Play Artisan Loom Beat & Folk Drone'}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                <div className="flex items-end gap-0.5 h-3.5">
                  <span className="w-0.5 bg-amber-800 rounded-full wave-bar-1"></span>
                  <span className="w-0.5 bg-amber-800 rounded-full wave-bar-2"></span>
                  <span className="w-0.5 bg-amber-800 rounded-full wave-bar-3"></span>
                  <span className="w-0.5 bg-amber-800 rounded-full wave-bar-4"></span>
                </div>
                <span className="text-[11px] font-bold text-amber-950 hidden md:inline">Loom Audio</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-[11px] hidden md:inline">Loom Sound</span>
              </>
            )}
          </button>

          {/* Vernacular Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 text-xs font-bold text-stone-800 transition-all shadow-xs"
            title="Toggle English / ಕನ್ನಡ"
          >
            <Globe className="w-3.5 h-3.5 text-amber-800" />
            <span className="font-sans">{i18n.language === 'kn' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}</span>
          </button>

          {/* Cart Icon with Bounce */}
          <Link
            to="/cart"
            className="relative p-2 rounded-xl text-stone-700 hover:text-amber-900 hover:bg-amber-100/50 transition-all border border-transparent hover:border-amber-200"
            title={t('cart')}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-800 text-amber-50 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Artisan Portal / Dashboard */}
          {artisan ? (
            <div className="flex items-center gap-2">
              <Link
                to="/artisan/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-800 to-orange-800 text-white text-xs font-bold hover:brightness-110 transition-all shadow-xs"
              >
                <img
                  src={artisan.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'}
                  alt={artisan.name}
                  className="w-5 h-5 rounded-full object-cover border border-amber-300"
                />
                <span className="hidden sm:inline">{artisan.name.split(' ')[0]} (Workshop)</span>
                <span className="sm:hidden">Workshop</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  audioSystem.playChime('ding');
                  navigate('/');
                }}
                className="p-1.5 rounded-xl text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/artisan/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-amber-800/30 text-amber-900 bg-amber-50/70 hover:bg-amber-100 hover:border-amber-700/60 text-xs font-bold transition-all shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-amber-800" />
              <span>{t('artisanPortal')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
