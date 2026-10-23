import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const craftCategories = [
  { id: 'All', en: 'All Crafts' },
  { id: 'Kasuti', en: 'Kasuti Embroidery' },
  { id: 'Beedu', en: 'Beedu Wild Palm' },
  { id: 'Handloom', en: 'Udupi Handloom' },
  { id: 'Bidriware', en: 'Bidriware Inlay' }
];

export const CataloguePage: React.FC = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCraft, setSelectedCraft] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [justAddedId, setJustAddedId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCraft]);

  const fetchProducts = async () => {
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
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.craft && p.craft.toLowerCase().includes(q)) ||
      (p.artisan_name && p.artisan_name.toLowerCase().includes(q)) ||
      (p.materials && p.materials.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Provenance Promise Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-950 text-white rounded-2xl p-4 sm:p-6 mb-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>100% Direct Fair-Trade • Artisan Certified</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
            Living Crafts of Coastal Karnataka & Deccan
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl leading-relaxed">
            Every piece is made by indigenous master artisans in Dharwad, Kundapura, and Udupi. Scan the provenance QR code on every product to view its craft lineage and exact fair-wage ledger.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Search & Craft Filter Chips */}
      <div className="space-y-3 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search craft, artisan, or material (e.g., Kasuti, Silk, Palm)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 shadow-xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {craftCategories.map((cat) => {
            const isSelected = selectedCraft === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCraft(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-xs ${
                  isSelected
                    ? 'bg-amber-800 text-white ring-2 ring-amber-800/20'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span>{cat.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse space-y-3">
              <div className="w-full h-48 bg-stone-200 rounded-xl" />
              <div className="h-4 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-500 font-medium">No crafts found matching your filter.</p>
          <button
            onClick={() => { setSelectedCraft('All'); setSearchQuery(''); }}
            className="mt-3 text-xs font-semibold text-amber-800 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md hover:border-amber-300 transition-all flex flex-col"
            >
              {/* Product Image & Badges */}
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Hours Spent Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md text-amber-200 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{product.hours}h {t('hoursSpent')}</span>
                </div>

                {/* Craft Type Badge */}
                <div className="absolute top-2.5 right-2.5 bg-amber-800 text-white px-2 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
                  {product.craft}
                </div>

                {/* Direct Payout Guarantee Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-[11px] text-white font-medium flex items-center justify-between">
                  <span>100% Direct Payout to Maker</span>
                  <span className="text-amber-300 text-[10px]">Fair Ledger &rarr;</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                {/* Artisan Link */}
                <div className="flex items-center gap-2 mb-1.5">
                  <img
                    src={product.artisan_photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80'}
                    alt={product.artisan_name}
                    className="w-5 h-5 rounded-full object-cover border border-amber-300"
                  />
                  <span className="text-xs font-semibold text-stone-600 truncate">
                    {product.artisan_name} • {product.artisan_village}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1 mb-1">
                  {product.title}
                </h3>

                {/* Story Snippet */}
                <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed flex-1">
                  {product.story || product.technique}
                </p>

                {/* Price & Action */}
                <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                      {t('fairPrice')}
                    </span>
                    <span className="text-base font-extrabold text-amber-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      justAddedId === product.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-amber-800 hover:bg-amber-900 text-white'
                    }`}
                  >
                    {justAddedId === product.id ? '✓ Added' : t('addToCart')}
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
