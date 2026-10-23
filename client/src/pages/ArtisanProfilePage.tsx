import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
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
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse space-y-4">
        <div className="h-40 bg-stone-200 rounded-3xl" />
        <div className="h-64 bg-stone-200 rounded-2xl" />
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h2 className="text-lg font-bold text-stone-900 mb-2">Artisan Not Found</h2>
        <Link to="/" className="text-xs font-semibold text-amber-800 underline">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 pb-20">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Crafts</span>
      </Link>

      {/* Artisan Profile Hero */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
          <img
            src={artisan.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
            alt={artisan.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-300 shadow-sm shrink-0"
          />

          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Master Craft Custodian</span>
            </div>

            <h1 className="text-2xl font-bold text-stone-900 mb-1">
              {artisan.name}
            </h1>

            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                {artisan.village}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                +91 {artisan.phone}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 max-w-2xl">
              {artisan.bio}
            </p>

            <div className="inline-flex items-center gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-green-700 shrink-0" />
              <span>100% of purchase proceeds are transferred directly to {artisan.name}'s bank account.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan's Crafts Feed */}
      <div>
        <h2 className="text-lg font-bold text-stone-900 mb-4">
          Handcrafted Creations by {artisan.name} ({artisan.products?.length || 0})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artisan.products && artisan.products.length > 0 ? (
            artisan.products.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative h-44 bg-stone-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-amber-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {p.craft}
                  </div>
                </div>

                <div className="p-3.5 flex flex-col flex-1">
                  <h3 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mb-2 flex-1">
                    {p.story || p.technique}
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-extrabold text-amber-900 text-sm">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-800 underline">
                      View Story →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-stone-500 text-xs">No crafts listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
