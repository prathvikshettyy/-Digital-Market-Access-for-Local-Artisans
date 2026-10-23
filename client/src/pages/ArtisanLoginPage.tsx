import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Phone, ArrowLeft, Loader2, Sparkles, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export const ArtisanLoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(phone, pin);
    if (res.success) {
      navigate('/artisan/dashboard');
    } else {
      setErrorMsg(res.error || 'Invalid phone or PIN');
    }
  };

  const handleQuickFill = (demoPhone: string, demoPin: string) => {
    setPhone(demoPhone);
    setPin(demoPin);
    setErrorMsg('');
  };

  const demoAccounts = [
    { name: 'Rukmini Bai', craft: 'Kasuti Embroidery', village: 'Dharwad', phone: '9845123456', pin: '1234', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
    { name: 'Devamma Poojarthi', craft: 'Beedu Palm Weaving', village: 'Kundapura', phone: '9845234567', pin: '2345', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
    { name: 'Sanjeeva Shettigar', craft: 'Udupi Handloom', village: 'Udupi', phone: '9845345678', pin: '3456', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-8 pb-24">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Marketplace</span>
      </Link>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-stone-900">
            {t('artisanLoginTitle')}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {t('artisanLoginSubtitle')}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Registered Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('phonePlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              4-Digit Secret PIN
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                maxLength={4}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={t('pinPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{t('loginButton')}</span>
            )}
          </button>
        </form>

        {/* 1-Tap Demo Accounts */}
        <div className="pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('demoLogin')} (1-Tap Fill):</span>
          </div>

          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.phone}
                type="button"
                onClick={() => handleQuickFill(acc.phone, acc.pin)}
                className="w-full p-2.5 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/50 flex items-center gap-2.5 text-left transition-colors"
              >
                <img
                  src={acc.photo}
                  alt={acc.name}
                  className="w-7 h-7 rounded-full object-cover border border-amber-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-stone-900 truncate">{acc.name}</div>
                  <div className="text-[10px] text-stone-500">{acc.craft} • {acc.village}</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                  PIN: {acc.pin}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
