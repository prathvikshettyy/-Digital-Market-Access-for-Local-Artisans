import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, QrCode, ArrowLeft, Sparkles, CheckCircle2, ShoppingBag, Layers, Feather, UserCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [added, setAdded] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
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
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse space-y-4">
        <div className="h-6 bg-stone-200 rounded w-1/4" />
        <div className="h-64 bg-stone-200 rounded-2xl" />
        <div className="h-32 bg-stone-200 rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-bold text-stone-900 mb-2">Product Not Found</h2>
        <Link to="/" className="text-xs font-semibold text-amber-800 underline">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  // Calculate Transparent Price Breakdown
  const hourlyRate = 80;
  const laborCost = Math.round(product.hours * hourlyRate);
  // Estimate material cost from price if not parsed
  const estimatedMaterials = Math.max(100, Math.round(product.price - laborCost - (product.price * 0.05)));
  const coopFund = Math.round(product.price * 0.05);

  const publicUrl = window.location.href;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-28">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Crafts</span>
      </Link>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs mb-5">
        {/* Product Image */}
        <div className="relative h-72 sm:h-96 bg-stone-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {product.craft}
          </div>
          <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{product.hours} Hours Handcrafted</span>
          </div>
        </div>

        {/* Title & Price Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
              {product.title}
            </h1>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs uppercase font-bold text-stone-400 block tracking-wider">
                {t('fairPrice')}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              ● {product.stock > 0 ? `${product.stock} ${t('inStock')}` : t('outOfStock')}
            </span>
            <span>•</span>
            <span>100% Direct to Artisan</span>
          </div>
        </div>

        {/* Provenance Card */}
        <div className="p-4 sm:p-6 bg-amber-50/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h2 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                {t('provenance')}
              </h2>
            </div>
            
            {/* QR Code Trigger Button */}
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-800" />
              <span>Provenance QR</span>
            </button>
          </div>

          {/* Artisan Identity Strip */}
          <Link
            to={`/artisan/${product.artisan_id}`}
            className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-200/60 hover:border-amber-400 transition-colors mb-4 group"
          >
            <img
              src={product.artisan_photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'}
              alt={product.artisan_name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-stone-900 group-hover:text-amber-800 transition-colors">
                  {product.artisan_name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <span>📍 {product.artisan_village}</span>
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-800 underline">
              View Profile →
            </span>
          </Link>

          {/* Technique, Materials, Story */}
          <div className="space-y-3 text-xs sm:text-sm">
            {product.technique && (
              <div>
                <span className="font-bold text-stone-900 block mb-0.5">{t('technique')}:</span>
                <p className="text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100">
                  {product.technique}
                </p>
              </div>
            )}

            {product.materials && (
              <div>
                <span className="font-bold text-stone-900 block mb-0.5">{t('materials')}:</span>
                <p className="text-stone-700 bg-white p-2.5 rounded-xl border border-stone-100">
                  {product.materials}
                </p>
              </div>
            )}

            {product.story && (
              <div>
                <span className="font-bold text-stone-900 block mb-0.5">{t('story')}:</span>
                <p className="text-stone-700 bg-white p-3 rounded-xl border border-stone-100 leading-relaxed italic">
                  "{product.story}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Transparent Fair Price Breakdown (Key Feature) */}
        <div className="p-4 sm:p-6 border-t border-stone-100">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-green-700" />
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
              {t('priceBreakdown')}
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-4">
            KalaConnect exposes every rupee. We guarantee fair hourly living wages for the master artisan without middleman commission.
          </p>

          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
              <span className="text-stone-600">{t('materialsCost')} (pure raw materials)</span>
              <span className="font-bold text-stone-900">₹{estimatedMaterials}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
              <div>
                <span className="text-stone-600 block">{t('laborEarnings')}</span>
                <span className="text-[11px] text-stone-400">({product.hours} hours × ₹{hourlyRate}/hour fair wage)</span>
              </div>
              <span className="font-bold text-amber-900">₹{laborCost}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
              <span className="text-stone-600">{t('platformFee')} (guild apprenticeship)</span>
              <span className="font-bold text-stone-900">₹{coopFund}</span>
            </div>
            <div className="flex justify-between items-center pt-2 text-sm sm:text-base font-extrabold text-stone-900">
              <span>{t('finalPrice')}</span>
              <span className="text-amber-900">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3.5 z-30 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Total</span>
            <span className="text-xl font-extrabold text-amber-950">₹{product.price.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                added
                  ? 'bg-green-700 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              {added ? '✓ Added' : t('addToCart')}
            </button>
            <button
              onClick={handleBuyNow}
              className="px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('buyNow')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Public Provenance */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-base text-stone-900">
              Craft Provenance QR Code
            </h3>
            <p className="text-xs text-stone-500">
              {t('scanProvenance')}
            </p>

            <div className="p-4 bg-amber-50 rounded-2xl inline-block border border-amber-200">
              <QRCodeSVG value={publicUrl} size={180} level="M" />
            </div>

            <div className="text-xs font-mono text-stone-600 bg-stone-100 p-2 rounded-lg truncate">
              {publicUrl}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
