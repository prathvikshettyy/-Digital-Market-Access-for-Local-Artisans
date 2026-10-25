import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, ShieldCheck, QrCode, ArrowLeft, Volume2, VolumeX, Sparkles,
  CheckCircle2, ShoppingBag, Layers, Feather, UserCheck, Share2,
  Award, MapPin, ZoomIn, Copy, Check
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { audioSystem } from '../utils/audioAssistant';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [added, setAdded] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    } catch (err) {
      console.error('Failed to load product detail:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const toggleOralStory = () => {
    if (isPlayingAudio) {
      audioSystem.stop();
      setIsPlayingAudio(false);
    } else {
      if (!product) return;
      setIsPlayingAudio(true);
      audioSystem.playChime('ding');
      audioSystem.playLoomChantSnippet();

      const isKn = i18n.language === 'kn';
      const text = isKn
        ? `ನಮಸ್ಕಾರ. ಇದು ${product.artisan_village}ದ ${product.artisan_name} ಅವರ ಕೈಚಳಕ. ${product.title}. ${product.hours} ಗಂಟೆಗಳ ಕಾಲ ಕಷ್ಟಪಟ್ಟು ರೂಪಿಸಿದ ಕಲಾಕೃತಿ. ${product.story}. ತಂತ್ರಜ್ಞಾನ: ${product.technique}.`
        : `Welcome to KalaConnect provenance audio. Handcrafted by master artisan ${product.artisan_name} of ${product.artisan_village}. This is ${product.title}, taking ${product.hours} hours of dedicated craftsmanship. ${product.story}. Created using ${product.technique}.`;

      audioSystem.speakText(text, isKn ? 'kn' : 'en', () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1);
    audioSystem.playChime('success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, 1);
    audioSystem.playChime('ding');
    navigate('/checkout');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    audioSystem.playChime('ding');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-5">
        <div className="h-6 bg-stone-200 rounded w-1/4" />
        <div className="h-96 bg-stone-200 rounded-3xl" />
        <div className="h-44 bg-stone-200 rounded-3xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-stone-900 mb-2 font-headline">Craft Not Found</h2>
        <p className="text-xs text-stone-500 mb-4">This artisan piece may have been acquired or moved.</p>
        <Link to="/" className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold shadow-xs">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  // Calculate Transparent Price Breakdown
  const hourlyRate = 80;
  const laborCost = Math.round(product.hours * hourlyRate);
  const coopFund = Math.round(product.price * 0.05);
  const estimatedMaterials = Math.max(100, Math.round(product.price - laborCost - coopFund));

  const laborPercent = Math.min(85, Math.max(40, Math.round((laborCost / product.price) * 100)));
  const materialsPercent = Math.max(10, Math.round((estimatedMaterials / product.price) * 100));
  const coopPercent = 100 - laborPercent - materialsPercent;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 pb-32">
      {/* Navigation breadcrumbs */}
      <div className="flex items-center justify-between mb-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-amber-900 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{i18n.language === 'kn' ? 'ಸಂತೆಗೆ ಮರಳಿ' : 'Back to Crafts'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:border-amber-400 hover:text-amber-900 shadow-xs transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-800" />
            <span>{t('scanProvenance')}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="p-1.5 bg-white border border-stone-200 rounded-xl text-stone-600 hover:text-amber-900 shadow-xs transition-colors"
            title="Share Craft Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8">
        {/* Left: Product Media with Zoom Inspection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
            <div className={`relative ${isZoomed ? 'h-[500px] cursor-zoom-out' : 'h-80 sm:h-[440px] cursor-zoom-in'} overflow-hidden transition-all duration-300`}>
              <img
                src={product.image}
                alt={product.title}
                onClick={() => setIsZoomed(!isZoomed)}
                className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-175' : 'hover:scale-105'}`}
              />

              {/* Zoom hint badge */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-amber-100 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md hover:bg-black/85"
              >
                <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                <span>{isZoomed ? 'Reset Zoom' : 'Inspect Stitch & Weave'}</span>
              </button>

              {/* Handcrafted Hours Badge */}
              <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{product.hours} Hours Handcrafted</span>
              </div>

              {/* Craft Tradition Badge */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-800 to-orange-800 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md shimmer-badge">
                {product.craft}
              </div>
            </div>
          </div>

          {/* Oral Story Voice Audio Widget */}
          <div className="bg-gradient-to-r from-amber-900 to-orange-950 text-white rounded-2xl p-4 shadow-sm border border-amber-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce text-amber-200' : ''}`} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight font-headline">
                  {isPlayingAudio ? 'Listening to Artisan Oral Story...' : (i18n.language === 'kn' ? 'ಕುಶಲಕರ್ಮಿಗಳ ಧ್ವನಿ ಕಥೆ ಕೇಳಿ' : 'Listen to Artisan Oral Story')}
                </h4>
                <p className="text-[11px] text-amber-200/80">
                  {i18n.language === 'kn' ? 'ಕೈಮಗ್ಗದ ನಾದ ಮತ್ತು ಪಾರಂಪರಿಕ ಕಲಾ ತಂತ್ರ' : 'Oral folk narrative with authentic acoustic loom beat'}
                </p>
              </div>
            </div>

            <button
              onClick={toggleOralStory}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isPlayingAudio
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-amber-100 border border-white/20'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-950" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Play Voice</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Product Details, Provenance & Pricing */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Heritage Origin pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{i18n.language === 'kn' ? 'ಭೌಗೋಳಿಕ ಸೂಚ್ಯಂಕ (GI) ಮಾನ್ಯತೆ' : 'GI Certified Indigenous Craft'}</span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 leading-tight mb-2 font-headline">
              {product.title}
            </h1>

            {/* Artisan Link Stamp */}
            <Link
              to={`/artisan/${product.artisan_id}`}
              className="flex items-center gap-2.5 p-2 rounded-2xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-100/70 transition-colors mb-4 group"
            >
              <img
                src={product.artisan_photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'}
                alt={product.artisan_name}
                className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-xs"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900 block truncate">
                  {product.artisan_name}
                </span>
                <span className="text-[11px] text-stone-500 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-amber-700" />
                  <span>{product.artisan_village}</span>
                </span>
              </div>
            </Link>

            {/* Price Header */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs mb-5">
              <span className="text-[10px] uppercase font-extrabold text-stone-400 block tracking-wider mb-0.5">
                {t('fairPrice')} • 100% Direct Escrow
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-950 font-headline">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Zero Middleman Cut
                </span>
              </div>
            </div>

            {/* Cultural Story Snippet */}
            <div className="space-y-3 mb-5">
              <div>
                <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-amber-800" />
                  <span>{t('story')}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.story || product.technique}
                </p>
              </div>

              {product.technique && (
                <div>
                  <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-800" />
                    <span>{t('technique')}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {product.technique}
                  </p>
                </div>
              )}

              {product.materials && (
                <div>
                  <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                    <span>{t('materials')}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {product.materials}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2 border-t border-stone-200">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border-2 border-amber-800 text-amber-900 hover:bg-amber-50'
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-800" />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>{t('buyNow')}</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-stone-400">
              ⚡ Free Speed Post Delivery across India • Dispatched in 24 Hours
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Fair Price Ledger Breakdown Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-stone-100">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900 font-headline">
              {t('priceBreakdown')}
            </h2>
            <p className="text-xs text-stone-500">
              Total price calculated through open living-wage formula (₹80/hr labor + materials + 5% fund)
            </p>
          </div>
          <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 shrink-0">
            100% Direct Escrow
          </div>
        </div>

        {/* Interactive Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex p-0.5 border border-stone-200">
            <div
              style={{ width: `${laborPercent}%` }}
              className="bg-amber-800 h-full rounded-l-full transition-all duration-700"
              title={`Artisan Labor: ${laborPercent}%`}
            />
            <div
              style={{ width: `${materialsPercent}%` }}
              className="bg-amber-500 h-full transition-all duration-700"
              title={`Materials: ${materialsPercent}%`}
            />
            <div
              style={{ width: `${coopPercent}%` }}
              className="bg-emerald-600 h-full rounded-r-full transition-all duration-700"
              title={`Co-op Fund: ${coopPercent}%`}
            />
          </div>

          <div className="flex justify-between text-[11px] font-bold text-stone-500 px-1">
            <span className="flex items-center gap-1.5 text-amber-900">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />
              <span>Artisan Labor ({laborPercent}%)</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Raw Materials ({materialsPercent}%)</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Co-op Fund ({coopPercent}%)</span>
            </span>
          </div>
        </div>

        {/* Ledger Items Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
            <span className="text-[10px] font-extrabold uppercase text-amber-900/60 block mb-1">
              Direct Artisan Labor
            </span>
            <span className="text-xl font-black text-amber-950 font-headline block">
              ₹{laborCost.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-amber-800/80 block mt-1">
              {product.hours} hours × ₹80 guaranteed hourly living wage
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/30 border border-amber-200/40">
            <span className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1">
              Raw Forest Materials
            </span>
            <span className="text-xl font-black text-stone-800 font-headline block">
              ₹{estimatedMaterials.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-stone-500 block mt-1">
              Handspun cotton, natural fermented plant dyes, wild palm fronds
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
            <span className="text-[10px] font-extrabold uppercase text-emerald-800/60 block mb-1">
              Community Co-op Fund (5%)
            </span>
            <span className="text-xl font-black text-emerald-950 font-headline block">
              ₹{coopFund.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-800/80 block mt-1">
              Reinvested in pit-loom maintenance and young artisan apprenticeships
            </span>
          </div>
        </div>
      </div>

      {/* Provenance QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-stone-200 animate-slide-up">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-stone-900 mb-1 font-headline">
              Craft Provenance Pass
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Scan with your phone to view authentic craft lineage and live fair-wage ledger.
            </p>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 inline-block mb-4 shadow-inner">
              <QRCodeSVG
                value={window.location.href}
                size={180}
                level="M"
                includeMargin={false}
              />
            </div>

            <div className="text-[11px] font-mono text-stone-500 mb-5">
              Hash: KAS-2024-{product.id}-GI143
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
