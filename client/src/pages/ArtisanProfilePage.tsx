import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Phone, Clock, ArrowLeft, ShieldCheck, Sparkles, Award,
  ExternalLink, CheckCircle2, Heart
} from 'lucide-react';
import { Artisan } from '../types';

export const ArtisanProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchArtisan();
  }, [id]);

  const fetchArtisan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/artisans/${id}`);
      if (res.ok) {
        const data = await res.json();
        setArtisan(data);
      }
    } catch (err) {
      console.error('Failed to load artisan profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-5">
        <div className="h-6 bg-stone-200 rounded w-1/4" />
        <div className="h-56 bg-stone-200 rounded-3xl" />
        <div className="h-72 bg-stone-200 rounded-3xl" />
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-stone-900 mb-2 font-headline">Artisan Not Found</h2>
        <Link to="/" className="text-xs font-bold text-amber-800 underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 pb-32 animate-slide-up">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-amber-900 mb-6 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Crafts</span>
      </Link>

      {/* Artisan Profile Hero */}
      <div className="bg-gradient-to-br from-amber-950 via-[#3a1a0f] to-stone-900 text-white rounded-3xl p-6 sm:p-9 shadow-xl mb-8 relative overflow-hidden border border-amber-800/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          <div className="relative">
            <img
              src={artisan.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
              alt={artisan.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-400 shadow-xl shrink-0"
            />
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center text-white text-xs">
              ✓
            </span>
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-xs font-bold mb-2 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>GI Master Craft Custodian</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white mb-2 font-headline">
              {artisan.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-amber-200/80 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{artisan.village}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 {artisan.phone}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed mb-5 max-w-2xl font-normal">
              {artisan.bio}
            </p>

            <div className="inline-flex items-center gap-2 p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-amber-700/40 text-xs text-amber-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% of craft proceeds are wired directly to {artisan.name}'s village cluster bank account.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan's Crafts Feed */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-stone-900 font-headline">
            Masterworks by {artisan.name} ({artisan.products?.length || 0})
          </h2>
          <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full">
            Direct from Workshop
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {artisan.products && artisan.products.length > 0 ? (
            artisan.products.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="tactile-card rounded-3xl overflow-hidden flex flex-col group relative"
              >
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-gradient-to-r from-amber-800 to-orange-800 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                    {p.craft}
                  </div>
                  <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{p.hours}h</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm line-clamp-1 mb-1 font-headline group-hover:text-amber-900 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                      {p.story || p.technique}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Fair Price</span>
                      <span className="font-black text-amber-950 text-base font-headline">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-800 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-stone-200 p-8">
              <p className="text-stone-500 text-xs font-bold">No active pieces currently in stock.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
