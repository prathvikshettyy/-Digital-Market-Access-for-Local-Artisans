import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Camera, Calculator, ArrowLeft, Loader2, Sparkles, CheckCircle2,
  Globe, ShieldCheck, Mic, Upload, Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { PriceSuggestion } from '../types';
import { audioSystem } from '../utils/audioAssistant';

export const AddProductPage: React.FC = () => {
  const { artisan } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('Kasuti Lotus Motif Table Runner');
  const [craft, setCraft] = useState('Kasuti');
  const [hours, setHours] = useState('18');
  const [materials, setMaterials] = useState('380');
  const [price, setPrice] = useState('1911');
  const [stock, setStock] = useState('3');
  const [story, setStory] = useState('Traditional Kamala (lotus) temple geometry hand-stitched with vegetable-dyed silk threads onto unbleached linen.');
  const [technique, setTechnique] = useState('Knotless reversible Gavanti & Murgi counted-thread embroidery');
  const [materialsDescription, setMaterialsDescription] = useState('Kora handspun Khadi, plant fermented indigo & turmeric silk floss');
  
  // Image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
  );

  const [priceSuggestion, setPriceSuggestion] = useState<PriceSuggestion | null>({
    suggested_price: 1911,
    breakdown: {
      materials: 380,
      labor: 1440,
      hourly_rate: 80,
      hours: 18,
      platform_margin: 91,
      total: 1911
    }
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!artisan) {
    navigate('/artisan/login');
    return null;
  }

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'kn' ? 'en' : 'kn';
    i18n.changeLanguage(nextLang);
    audioSystem.playChime('ding');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      audioSystem.playChime('ding');
    }
  };

  const handleVoiceAssist = () => {
    setIsListeningVoice(true);
    audioSystem.playChime('ding');

    const promptText = i18n.language === 'kn'
      ? 'ನಿಮ್ಮ ಕಲಾಕೃತಿಯ ಕಥೆ ಮತ್ತು ಸಾಮಗ್ರಿಗಳನ್ನು ಧ್ವನಿಯ ಮೂಲಕ ವಿವರಿಸಿ.'
      : 'Describe your craft story and technique.';

    audioSystem.speakText(promptText, i18n.language === 'kn' ? 'kn' : 'en', () => {
      // Auto-fill demonstration oral narrative
      if (i18n.language === 'kn') {
        setStory('ಧಾರವಾಡ ಗ್ರಾಮೀಣ ನೇಕಾರರಿಂದ ಕೈಯಿಂದ ಹೆಣೆದ ಶುದ್ಧ ಖಾದಿ ಹತ್ತಿ ಬಟ್ಟೆ ಮೇಲೆ, ಕಮಲದ ಹೂವಿನ 7ನೇ ಶತಮಾನದ ಸಾಂಪ್ರದಾಯಿಕ ಗವಾಂತಿ ಕಸೂತಿ.');
        setTechnique('ಗಂಟುಗಳಿಲ್ಲದ ದ್ವಿಮುಖ ಗವಾಂತಿ ಮತ್ತು ಮುರ್ಗಿ ಹೊಲಿಗೆ ತಂತ್ರ');
      } else {
        setStory('Hand-stitched Chalukyan lotus geometry created with pure plant-dyed silk threads on handwoven unbleached Kora cotton.');
        setTechnique('Counted-thread knotless reversible Gavanti embroidery');
      }
      setIsListeningVoice(false);
      audioSystem.playChime('success');
    });
  };

  // Pricing Suggestion Calculator API call
  const handleCalculatePrice = async () => {
    setIsCalculating(true);
    audioSystem.playChime('ding');
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
      audioSystem.playChime('success');
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
    audioSystem.playChime('ding');

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
        audioSystem.playChime('success');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c2410c', '#15803d', '#f59e0b']
        });
        await new Promise(r => setTimeout(r, 600));
        navigate('/artisan/dashboard');
      } else {
        setErrorMsg(data.error || 'Failed to list craft.');
        setIsSubmitting(false);
      }
    } catch {
      setErrorMsg('Server connection failed.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-32 animate-slide-up">
      {/* Back button & Bilingual Toggle */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/artisan/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-900 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{i18n.language === 'kn' ? 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮರಳಿ' : 'Back to Dashboard'}</span>
        </Link>

        {/* Vernacular Language switch */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-amber-800" />
          <span>{i18n.language === 'kn' ? 'ಕನ್ನಡದಲ್ಲಿ ನಮೂದಿಸಿ (KN)' : 'Fill in English (EN)'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-headline">
              {t('addProduct')}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {i18n.language === 'kn'
                ? 'ನಿಮ್ಮ ಹೊಸ ಕಲಾಕೃತಿಯನ್ನು ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆಗೆ ನೇರವಾಗಿ ಸೇರಿಸಿ.'
                : 'Publish your handcrafted work directly to global buyers with fair-wage ledger.'}
            </p>
          </div>

          {/* Voice Story Assistant Trigger */}
          <button
            type="button"
            onClick={handleVoiceAssist}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              isListeningVoice
                ? 'bg-amber-500 text-stone-950 animate-pulse'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
            }`}
          >
            <Mic className="w-4 h-4 text-amber-800" />
            <span>{isListeningVoice ? 'Listening...' : (i18n.language === 'kn' ? 'ಧ್ವನಿ ಮೂಲಕ ಕಥೆ ಹೇಳಿ' : 'Speak Story (Voice)')}</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 mb-5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload Showcase */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-2">
              {t('uploadPhoto')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-dashed border-amber-300 bg-amber-50/40 flex flex-col items-center justify-center p-4 text-center group cursor-pointer hover:bg-amber-100/40 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Camera className="w-8 h-8 text-amber-700 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-amber-950">Tap to upload / capture craft</span>
                <span className="text-[10px] text-stone-500 mt-0.5">High-res JPEG, PNG up to 8MB</span>
              </div>

              {/* Preview */}
              <div className="relative h-48 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 text-white text-[10px] font-bold">
                  Live Preview
                </span>
              </div>
            </div>
          </div>

          {/* Title & Craft Tradition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t('craftTitle')}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kasuti Badami Chariot Stole"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                {t('selectCraftType')}
              </label>
              <select
                value={craft}
                onChange={(e) => setCraft(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 font-medium bg-white cursor-pointer"
              >
                <option value="Kasuti">Kasuti Embroidery (7th-c. Temple Needlework)</option>
                <option value="Beedu">Beedu Wild Palm Craft (Kundapura Coast)</option>
                <option value="Handloom">Udupi Malnad Cotton Pit-Loom</option>
                <option value="Bidriware">Bidriware Silver Wire Inlay</option>
              </select>
            </div>
          </div>

          {/* Living Wage Calculator Card */}
          <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-300/80 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/60">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-800" />
                <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider font-headline">
                  {t('suggestPriceBtn')} (₹80/hr Living Wage)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Fair Formula Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  {t('hoursInvested')}
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white"
                />
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  Artisan Labor Wage = {hours || 0}h × ₹80/hr = ₹{Math.round((parseFloat(hours) || 0) * 80)}
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  {t('materialsCostInput')}
                </label>
                <input
                  type="number"
                  min="0"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 bg-white"
                />
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  Natural Kora cotton, vegetable dyes, smoke-cured palm fronds
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculatePrice}
              disabled={isCalculating}
              className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              {isCalculating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Calculator className="w-3.5 h-3.5" />}
              <span>Recalculate Fair Price</span>
            </button>

            {/* Price Preview Breakdown */}
            {priceSuggestion && (
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-2">
                <div className="flex justify-between items-baseline font-headline">
                  <span className="font-bold text-stone-800">Computed Fair Living Wage Price:</span>
                  <span className="text-base font-black text-amber-950">
                    ₹{priceSuggestion.suggested_price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden flex">
                  <div style={{ width: '75%' }} className="bg-amber-800 h-full" title="Artisan Labor"></div>
                  <div style={{ width: '20%' }} className="bg-amber-500 h-full" title="Raw Materials"></div>
                  <div style={{ width: '5%' }} className="bg-emerald-600 h-full" title="Community Co-op Fund"></div>
                </div>
                <div className="flex justify-between text-[10px] text-stone-500">
                  <span>Labor: ₹{priceSuggestion.breakdown.labor}</span>
                  <span>Materials: ₹{priceSuggestion.breakdown.materials}</span>
                  <span>Co-op (5%): ₹{priceSuggestion.breakdown.platform_margin}</span>
                </div>
              </div>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Final Marketplace Fair Price (₹)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-extrabold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Available Stock Count
              </label>
              <input
                type="number"
                min="1"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
              />
            </div>
          </div>

          {/* Story & Technique */}
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Craft Story & Cultural Heritage (ಕಲಾ ಪರಂಪರೆ ವಿವರ)
            </label>
            <textarea
              rows={3}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Explain the history, motif symbols, or generational lineage of this piece..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40 leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Handcraft Technique & Stitches
            </label>
            <input
              type="text"
              value={technique}
              onChange={(e) => setTechnique(e.target.value)}
              placeholder="e.g. Knotless Gavanti double-running stitch & Murgi ladder weave"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/40"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{t('submitProduct')}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
