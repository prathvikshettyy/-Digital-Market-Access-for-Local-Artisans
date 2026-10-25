import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Search, Volume2, Sparkles, SlidersHorizontal, Check, ArrowRight, Heart, Award, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { audioSystem } from '../utils/audioAssistant';

const craftCategories = [
  { id: 'All', en: 'All Crafts', kn: 'ಎಲ್ಲಾ ಕಲೆಗಳು', icon: '✨' },
  { id: 'Kasuti', en: 'Kasuti Embroidery', kn: 'ಕಸೂತಿ ಕಸೂತಿ', icon: '🪡' },
  { id: 'Beedu', en: 'Beedu Wild Palm', kn: 'ಬೀಡು ತಾಳೆ ಹೆಣಿಗೆ', icon: '🌿' },
  { id: 'Handloom', en: 'Udupi Handloom', kn: 'ಉಡುಪಿ ಕೈಮಗ್ಗ', icon: '🧵' },
  { id: 'Bidriware', en: 'Bidriware Inlay', kn: 'ಬಿದ್ರಿ ಕಲೆ', icon: '🪙' }
];

export const CataloguePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCraft, setSelectedCraft] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'hours' | 'price-asc' | 'price-desc'>('featured');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [justAddedId, setJustAddedId] = useState<number | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<number | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = selectedCraft === 'All' ? '/api/products' : `/api/products?craft=${encodeURIComponent(selectedCraft)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCraft]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    audioSystem.playChime('success');
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1800);
  };

  const handlePlayVoiceStory = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (playingVoiceId === product.id) {
      audioSystem.stop();
      setPlayingVoiceId(null);
      return;
    }

    setPlayingVoiceId(product.id);
    audioSystem.playChime('ding');

    const isKn = i18n.language === 'kn';
    const textToSpeak = isKn
      ? `ನಮಸ್ಕಾರ. ಇದು ${product.artisan_village}ದ ${product.artisan_name} ಅವರ ಕೈಚಳಕ. ${product.title}. ${product.hours} ಗಂಟೆಗಳ ಕಾಲ ಕಷ್ಟಪಟ್ಟು ರೂಪಿಸಿದ ಕಲಾಕೃತಿ. ${product.story || product.technique}`
      : `Welcome. Handcrafted by master artisan ${product.artisan_name} from ${product.artisan_village}. This is ${product.title}, taking over ${product.hours} hours of dedicated needlework. ${product.story || product.technique}`;

    audioSystem.speakText(textToSpeak, isKn ? 'kn' : 'en', () => {
      setPlayingVoiceId(null);
    });
  };

  const filteredProducts = products
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        (p.craft && p.craft.toLowerCase().includes(q)) ||
        (p.artisan_name && p.artisan_name.toLowerCase().includes(q)) ||
        (p.artisan_village && p.artisan_village.toLowerCase().includes(q)) ||
        (p.materials && p.materials.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'hours') return b.hours - a.hours;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured order
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 pb-28">
      {/* Editorial Master Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950 via-[#3a1a0f] to-stone-900 text-white p-6 sm:p-10 mb-8 shadow-xl border border-amber-800/30">
        {/* Subtle decorative glow & pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 via-orange-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-700/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold mb-3.5 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{i18n.language === 'kn' ? '೧೦೦% ನೇರ ಕುಶಲಕರ್ಮಿ ನ್ಯಾಯಸಮ್ಮತ ಸಂತೆ' : '100% Direct Fair-Trade • Artisan Ledger Certified'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight text-white leading-[1.15] mb-3">
              {i18n.language === 'kn' ? (
                <>ಕರಾವಳಿ ಮತ್ತು ಡೆಕ್ಕನ್ <span className="text-amber-300 underline decoration-amber-500/50">ಜೀವಂತ ಪರಂಪರೆ</span></>
              ) : (
                <>Living Crafts of Coastal Karnataka <span className="text-amber-300 underline decoration-amber-500/40">& Deccan</span></>
              )}
            </h1>

            <p className="text-xs sm:text-base text-amber-100/90 leading-relaxed mb-6 font-normal max-w-2xl">
              {i18n.language === 'kn'
                ? 'ಧಾರವಾಡದ 7ನೇ ಶತಮಾನದ ಕಸೂತಿ, ಕುಂದಾಪುರದ ಬೀಡು ತಾಳೆ ಹೆಣಿಗೆ ಮತ್ತು ಉಡುಪಿಯ ನೈಸರ್ಗಿಕ ಹತ್ತಿ ಕೈಮಗ್ಗ. ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ ಗ್ರಾಮದ ಕುಶಲಕರ್ಮಿಗಳಿಂದ ಪಡೆಯಿರಿ.'
                : 'Direct provenance sanctuary for counted-thread Kasuti embroidery, forest-cured Beedu palm weaving, and GI-certified Udupi handlooms. Every piece pays a guaranteed ₹80/hr living wage directly to village artisans.'}
            </p>

            {/* Live Transparency Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4 border-t border-amber-800/40">
              <div className="bg-black/35 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-amber-700/30">
                <span className="text-lg sm:text-xl font-black text-amber-300 font-headline block">100%</span>
                <span className="text-[10px] sm:text-[11px] text-amber-100/80 font-medium leading-tight block">Direct Pay to Artisan</span>
              </div>
              <div className="bg-black/35 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-amber-700/30">
                <span className="text-lg sm:text-xl font-black text-amber-300 font-headline block">₹80 / hr</span>
                <span className="text-[10px] sm:text-[11px] text-amber-100/80 font-medium leading-tight block">Ethical Living Wage</span>
              </div>
              <div className="bg-black/35 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-amber-700/30">
                <span className="text-lg sm:text-xl font-black text-amber-300 font-headline block">3,400+ hrs</span>
                <span className="text-[10px] sm:text-[11px] text-amber-100/80 font-medium leading-tight block">Heritage Preserved</span>
              </div>
              <div className="bg-black/35 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-amber-700/30">
                <span className="text-lg sm:text-xl font-black text-amber-300 font-headline block">GI Tagged</span>
                <span className="text-[10px] sm:text-[11px] text-amber-100/80 font-medium leading-tight block">Govt. Verified Origin</span>
              </div>
            </div>
          </div>

          {/* Master Artisan Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
              <img
                src="/images/artisan_hero.jpg"
                alt="Master Artisan Rukmini Bai, Kasuti embroidery"
                className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">Rukmini Bai • ರುಕ್ಮಿಣಿ ಬಾಯಿ</span>
                  <span className="text-[10px] text-amber-200/80 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-500/30">Dharwad</span>
                </div>
                <p className="text-[11px] text-stone-300 mt-1">Master Kasuti Needlewoman • 28 Years Heritage Craft</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={i18n.language === 'kn' ? 'ಕಲಾಕೃತಿ, ಕಸೂತಿ, ನೇಕಾರರು ಅಥವಾ ಊರಿನ ಹೆಸರು ಹುಡುಕಿ...' : 'Search craft, motif, material, or village (e.g. Kasuti, Dharwad, Silk)...'}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-stone-200 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-bold text-stone-600 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/40 shadow-xs cursor-pointer"
            >
              <option value="featured">✨ Curated Masterworks</option>
              <option value="hours">⏳ Most Handcrafted Hours</option>
              <option value="price-asc">₹ Price: Low to High</option>
              <option value="price-desc">₹ Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills with animated icons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {craftCategories.map((cat) => {
            const isSelected = selectedCraft === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCraft(cat.id);
                  audioSystem.playChime('ding');
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 shadow-xs ${
                  isSelected
                    ? 'bg-amber-900 text-amber-50 ring-2 ring-amber-800/30 shadow-md scale-102'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50/50 hover:border-amber-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{i18n.language === 'kn' ? cat.kn : cat.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-3xl p-4 border border-stone-200 animate-pulse space-y-4">
              <div className="w-full h-56 bg-stone-200 rounded-2xl" />
              <div className="h-4 bg-stone-200 rounded-md w-3/4" />
              <div className="h-3 bg-stone-200 rounded-md w-1/2" />
              <div className="h-10 bg-stone-100 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs">
          <div className="w-16 h-16 mx-auto mb-3 bg-amber-50 rounded-full flex items-center justify-center text-amber-800">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1">No masterworks found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            Try adjusting your search keywords or explore all craft categories.
          </p>
          <button
            onClick={() => { setSelectedCraft('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group tactile-card rounded-3xl overflow-hidden flex flex-col relative"
            >
              {/* Product Image & Badges */}
              <div className="relative h-60 overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />

                {/* Handcrafted Hours Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-amber-200 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{product.hours}h {i18n.language === 'kn' ? 'ಶ್ರಮ' : 'Handcrafted'}</span>
                </div>

                {/* Craft Tradition Badge */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-800 to-orange-800 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-md shimmer-badge">
                  {product.craft}
                </div>

                {/* Oral Story Voice Audio Trigger Button */}
                <button
                  onClick={(e) => handlePlayVoiceStory(product, e)}
                  className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-bold ${
                    playingVoiceId === product.id
                      ? 'bg-amber-400 text-stone-950 scale-105'
                      : 'bg-black/70 hover:bg-black/90 text-amber-200'
                  }`}
                  title={playingVoiceId === product.id ? 'Pause oral story' : 'Listen to oral artisan story'}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingVoiceId === product.id ? 'animate-bounce text-stone-950' : 'text-amber-300'}`} />
                  <span className="text-[11px] pr-1">
                    {playingVoiceId === product.id ? 'Listening...' : (i18n.language === 'kn' ? 'ಧ್ವನಿ ಕೇಳಿ' : 'Hear Story')}
                  </span>
                </button>

                {/* Direct Escrow Guarantee Ribbon */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/90 via-stone-900/60 to-transparent p-2.5 text-[11px] text-amber-100 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% Direct to Artisan</span>
                  </span>
                  <span className="text-amber-300 text-[10px] font-bold group-hover:translate-x-0.5 transition-transform">
                    {i18n.language === 'kn' ? 'ವಿವರ ನೋಡಿ →' : 'View Provenance →'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Artisan Stamp */}
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={product.artisan_photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80'}
                    alt={product.artisan_name}
                    className="w-6 h-6 rounded-full object-cover border-2 border-amber-300 shrink-0"
                  />
                  <div className="text-xs font-bold text-stone-700 truncate flex items-center gap-1">
                    <span>{product.artisan_name}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-500 font-normal truncate">{product.artisan_village}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug line-clamp-1 mb-1.5 font-headline group-hover:text-amber-900 transition-colors">
                  {product.title}
                </h3>

                {/* Story preview */}
                <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed flex-1">
                  {product.story || product.technique}
                </p>

                {/* Fair-Wage Ledger Bar Preview */}
                <div className="mb-3.5 p-2 bg-amber-50/60 rounded-xl border border-amber-200/50">
                  <div className="flex justify-between items-center text-[10px] font-bold text-amber-900 mb-1">
                    <span>Maker Wage: ₹{Math.round(product.hours * 80).toLocaleString('en-IN')}</span>
                    <span className="text-stone-500">Materials: ₹{Math.max(100, Math.round(product.price - (product.hours * 80) - (product.price * 0.05))).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden flex">
                    <div style={{ width: '75%' }} className="bg-amber-700 h-full rounded-l-full" title="Artisan Labor"></div>
                    <div style={{ width: '20%' }} className="bg-amber-400 h-full" title="Raw Materials"></div>
                    <div style={{ width: '5%' }} className="bg-emerald-600 h-full rounded-r-full" title="Co-op Fund"></div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-stone-400 block tracking-wider">
                      {t('fairPrice')}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-amber-950 font-headline">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                      justAddedId === product.id
                        ? 'bg-emerald-700 text-white scale-102'
                        : 'bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white hover:shadow-md'
                    }`}
                  >
                    {justAddedId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{i18n.language === 'kn' ? 'ಸೇರಿಸಲಾಗಿದೆ' : 'Added ✓'}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('addToCart')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
