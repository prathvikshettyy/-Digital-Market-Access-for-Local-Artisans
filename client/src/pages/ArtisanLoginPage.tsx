import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Phone, ArrowLeft, Loader2, Sparkles, UserCheck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { audioSystem } from '../utils/audioAssistant';

export const ArtisanLoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('9845123456');
  const [pin, setPin] = useState('1234');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    audioSystem.playChime('ding');
    const res = await login(phone, pin);
    if (res.success) {
      audioSystem.playChime('success');
      navigate('/artisan/dashboard');
    } else {
      setErrorMsg(res.error || 'Invalid mobile number or 4-digit PIN');
    }
  };

  const handleQuickFill = (demoPhone: string, demoPin: string) => {
    setPhone(demoPhone);
    setPin(demoPin);
    setErrorMsg('');
    audioSystem.playChime('ding');
  };

  const demoAccounts = [
    {
      name: 'Rukmini Bai',
      craft: 'Kasuti Embroidery (7th-c. Temple Stitches)',
      village: 'Narendra, Dharwad',
      phone: '9845123456',
      pin: '1234',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Devamma Poojarthi',
      craft: 'Beedu Wild Palm Craft (Moisture-Cured)',
      village: 'Hemmadi, Kundapura',
      phone: '9845234567',
      pin: '2345',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Sanjeeva Shettigar',
      craft: 'Udupi Pit-Loom Handloom & Khun',
      village: 'Talipady, Udupi',
      phone: '9845345678',
      pin: '3456',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-8 pb-32 animate-slide-up">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-amber-900 mb-6 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Marketplace</span>
      </Link>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-700 to-orange-800 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-amber-900/20">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-headline">
            {t('artisanLoginTitle')}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {t('artisanLoginSubtitle')}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {t('phonePlaceholder')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9845123456"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {t('pinPlaceholder')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                maxLength={4}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="1234"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t('loginButton')}</span>}
          </button>
        </form>

        {/* 1-Tap Quick Demo Logins */}
        <div className="pt-5 border-t border-stone-100">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('demoLogin')}</span>
          </div>

          <div className="space-y-2">
            {demoAccounts.map((account) => {
              const isSelected = phone === account.phone;
              return (
                <button
                  key={account.phone}
                  type="button"
                  onClick={() => handleQuickFill(account.phone, account.pin)}
                  className={`w-full p-2.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-50/80 ring-1 ring-amber-400/50'
                      : 'border-stone-200/90 hover:bg-stone-50'
                  }`}
                >
                  <img
                    src={account.photo}
                    alt={account.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-300 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-stone-900 block truncate font-headline">
                      {account.name}
                    </span>
                    <span className="text-[10px] text-amber-900 block truncate font-medium">
                      {account.craft}
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      📍 {account.village}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
                      Ready
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
