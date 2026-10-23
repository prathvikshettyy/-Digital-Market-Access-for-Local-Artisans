import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, Calculator, ArrowLeft, Loader2, Sparkles, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { PriceSuggestion } from '../types';

export const AddProductPage: React.FC = () => {
  const { artisan } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [craft, setCraft] = useState('Kasuti');
  const [hours, setHours] = useState('16');
  const [materials, setMaterials] = useState('350');
  const [price, setPrice] = useState('1650');
  const [stock, setStock] = useState('3');
  const [story, setStory] = useState('Hand-stitched temple geometry using natural dyed organic cotton.');
  const [technique, setTechnique] = useState('Gavanti and Murgi knotless stitches');
  const [materialsDescription, setMaterialsDescription] = useState('Pure Kora Khadi cotton with plant dyed floss');
  
  // Image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  );

  const [priceSuggestion, setPriceSuggestion] = useState<PriceSuggestion | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!artisan) {
    navigate('/artisan/login');
    return null;
  }

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'kn' ? 'en' : 'kn';
    i18n.changeLanguage(nextLang);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Pricing Suggestion Calculator API call
  const handleCalculatePrice = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/pricing/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hours: parseFloat(hours) || 0,
          materials: parseFloat(materials) || 0
        })
      });
      const data: PriceSuggestion = await res.json();
      setPriceSuggestion(data);
      setPrice(data.suggested_price.toString());
    } catch (e) {
      console.error('Pricing calculation failed:', e);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      setErrorMsg('Please enter a craft title and price.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('artisan_id', artisan.id.toString());
      formData.append('title', title.trim());
      formData.append('craft', craft);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('story', story.trim());
      formData.append('technique', technique.trim());
      formData.append('materials', materialsDescription.trim());
      formData.append('hours', hours);

      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        formData.append('imageUrl', imagePreview);
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          navigate('/artisan/dashboard');
        }, 1200);
      } else {
        setErrorMsg(data.error || 'Failed to publish craft.');
        setIsSubmitting(false);
      }
    } catch {
      setErrorMsg('Network error publishing craft.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 pb-28">
      {/* Header & Language Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/artisan/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>

        {/* In-form EN/Kannada Switcher */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-amber-700" />
          <span>Language: {i18n.language === 'kn' ? 'ಕನ್ನಡ' : 'English'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs">
        <div className="mb-5 border-b border-stone-100 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block mb-1">
            Rapid Artisan Listing (&lt; 60 Seconds)
          </span>
          <h1 className="text-xl font-bold text-stone-900">
            {t('addProduct')}
          </h1>
          <p className="text-xs text-stone-500">
            Simple 1-page form designed for touchscreens with automated fair price calculator.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload with Camera / File */}
          <div>
            <label className="text-xs font-bold text-stone-900 block mb-1.5">
              {t('uploadPhoto')} *
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/30">
              <img
                src={imagePreview}
                alt="Craft Preview"
                className="w-28 h-28 rounded-xl object-cover border border-amber-200 shadow-xs"
              />
              <div className="flex-1 text-center sm:text-left space-y-2">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold cursor-pointer transition-all shadow-xs">
                  <Camera className="w-4 h-4" />
                  <span>Choose Photo or Take Picture</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-stone-500">
                  Tip: Clear close-up photo showing front motif & stitches works best.
                </p>
              </div>
            </div>
          </div>

          {/* Craft Title */}
          <div>
            <label className="text-xs font-bold text-stone-900 block mb-1">
              {t('craftTitle')} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Kasuti Embroidered Kora Silk Dupatta"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>

          {/* Craft Category & Stock Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1">
                {t('selectCraftType')} *
              </label>
              <select
                value={craft}
                onChange={(e) => setCraft(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30 font-medium"
              >
                <option value="Kasuti">Kasuti (ಕಸೂತಿ)</option>
                <option value="Beedu">Beedu Palm (ಬೀಡು)</option>
                <option value="Handloom">Handloom (ಕೈಮಗ್ಗ)</option>
                <option value="Bidriware">Bidriware (ಬಿದ್ರಿ)</option>
                <option value="Terracotta">Terracotta (ಟೆರಾಕೋಟಾ)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1">
                Available Stock
              </label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
          </div>

          {/* Hours & Materials -> Pricing Suggestion Calculator (Key Feature) */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                <Calculator className="w-4 h-4 text-amber-800" />
                Fair Price Calculator
              </span>
              <span className="text-[11px] font-bold text-amber-800">
                ₹80 / Hour Fair Wage
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  {t('hoursInvested')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  {t('materialsCostInput')}
                </label>
                <input
                  type="number"
                  min="0"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculatePrice}
              disabled={isCalculating}
              className="w-full py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              {isCalculating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('suggestPriceBtn')}</span>
                </>
              )}
            </button>

            {/* Calculated Breakdown Display */}
            {priceSuggestion && (
              <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Raw Materials:</span>
                  <span>₹{priceSuggestion.breakdown.materials}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Labor ({priceSuggestion.breakdown.hours}h × ₹{priceSuggestion.breakdown.hourly_rate}/h):</span>
                  <span className="font-bold text-amber-900">₹{priceSuggestion.breakdown.labor}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Community Fund (5%):</span>
                  <span>₹{priceSuggestion.breakdown.platform_margin}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-stone-900 pt-1 border-t border-stone-100">
                  <span>Calculated Fair Price:</span>
                  <span className="text-amber-950">₹{priceSuggestion.suggested_price}</span>
                </div>
              </div>
            )}

            {/* Final Price Input */}
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1">
                Final Marketplace Selling Price (₹) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 text-base font-extrabold text-amber-950 rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              />
            </div>
          </div>

          {/* Story & Description */}
          <div>
            <label className="text-xs font-bold text-stone-900 block mb-1">
              Craft Heritage Story (ಕಲೆಯ ಕಥೆ)
            </label>
            <textarea
              rows={2}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Describe motifs, history, or village tradition..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
            />
          </div>

          {/* Technique & Materials Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1">
                Technique Details
              </label>
              <input
                type="text"
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                placeholder="e.g. Gavanti & Negi stitches"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-900 block mb-1">
                Materials Details
              </label>
              <input
                type="text"
                value={materialsDescription}
                onChange={(e) => setMaterialsDescription(e.target.value)}
                placeholder="e.g. Organic Kora Khadi cotton"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-800 to-orange-900 hover:from-amber-900 hover:to-orange-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Craft...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>{t('submitProduct')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
