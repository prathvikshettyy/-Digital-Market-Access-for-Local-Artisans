import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, PackageCheck, Truck, Clock, CheckCircle2, ShoppingBag, Phone, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { ArtisanOrderItem, Product } from '../types';

export const ArtisanDashboardPage: React.FC = () => {
  const { artisan } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [orders, setOrders] = useState<ArtisanOrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (!artisan) {
      navigate('/artisan/login');
      return;
    }
    fetchArtisanData();
  }, [artisan]);

  const fetchArtisanData = async () => {
    if (!artisan) return;
    setIsLoading(true);
    try {
      const [ordersRes, artisanRes] = await Promise.all([
        fetch(`/api/artisans/${artisan.id}/orders`),
        fetch(`/api/artisans/${artisan.id}`)
      ]);
      const ordersData = await ordersRes.json();
      const artisanData = await artisanRes.json();
      setOrders(ordersData);
      setProducts(artisanData.products || []);
    } catch (e) {
      console.error('Failed to load artisan dashboard data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: number, nextStatus: 'confirmed' | 'shipped') => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        setOrders(prev =>
          prev.map(o => o.order_id === orderId ? { ...o, order_status: nextStatus } : o)
        );
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!artisan) return null;

  const totalEarnings = orders.reduce((sum, o) => sum + (o.item_price * o.qty), 0);
  const pendingOrders = orders.filter(o => o.order_status === 'placed' || o.order_status === 'confirmed');

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 pb-24">
      {/* Artisan Profile & Earnings Card */}
      <div className="bg-gradient-to-br from-amber-900 to-orange-950 text-white rounded-3xl p-5 sm:p-7 shadow-md mb-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 relative z-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={artisan.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
              alt={artisan.name}
              className="w-20 h-20 rounded-full object-cover border-3 border-amber-300 shadow-md shrink-0"
            />
            <div>
              <div className="text-xs font-semibold text-amber-200 mb-0.5">
                {t('artisanDashboard')} • ಕುಶಲಕರ್ಮಿ ವೇದಿಕೆ
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {artisan.name}
              </h1>
              <p className="text-xs text-amber-100 flex items-center justify-center sm:justify-start gap-2">
                <span>📍 {artisan.village}</span>
                <span>•</span>
                <span>📞 {artisan.phone}</span>
              </p>
            </div>
          </div>

          {/* Quick Add Product Button */}
          <Link
            to="/artisan/add-product"
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('addProduct')}</span>
          </Link>
        </div>

        {/* Operational Metrics Row */}
        <div className="grid grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-amber-800/60 text-center">
          <div className="bg-amber-800/40 rounded-xl p-2.5">
            <span className="text-[10px] text-amber-200 block uppercase font-bold">Total Earnings</span>
            <span className="text-base sm:text-xl font-extrabold text-white">₹{totalEarnings.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-amber-800/40 rounded-xl p-2.5">
            <span className="text-[10px] text-amber-200 block uppercase font-bold">To Ship</span>
            <span className="text-base sm:text-xl font-extrabold text-amber-300">{pendingOrders.length} orders</span>
          </div>
          <div className="bg-amber-800/40 rounded-xl p-2.5">
            <span className="text-[10px] text-amber-200 block uppercase font-bold">Live Crafts</span>
            <span className="text-base sm:text-xl font-extrabold text-white">{products.length} listed</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-5 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'orders'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>{t('incomingOrders')} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'products'
              ? 'bg-amber-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t('myProducts')} ({products.length})</span>
        </button>
      </div>

      {/* Tab 1: Incoming Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12 text-stone-500 text-xs">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <PackageCheck className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="text-stone-600 font-bold text-sm">No incoming orders yet.</p>
              <p className="text-stone-400 text-xs mt-1">When buyers order your crafts, they will appear here with instant dispatch instructions.</p>
            </div>
          ) : (
            orders.map((o) => {
              const isPlaced = o.order_status === 'placed';
              const isConfirmed = o.order_status === 'confirmed';
              const isShipped = o.order_status === 'shipped';

              return (
                <div
                  key={`${o.order_id}-${o.item_id}`}
                  className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Order #{o.order_id}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(o.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        isShipped
                          ? 'bg-green-100 text-green-800'
                          : isConfirmed
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        ● {o.order_status}
                      </span>
                    </div>
                  </div>

                  {/* Product & Buyer Details */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={o.product_image}
                      alt={o.product_title}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {o.product_title}
                      </h4>
                      <p className="text-xs text-amber-900 font-extrabold mt-0.5">
                        Qty: {o.qty} × ₹{o.item_price.toLocaleString('en-IN')} = ₹{(o.qty * o.item_price).toLocaleString('en-IN')}
                      </p>
                      <div className="text-[11px] text-stone-500 mt-1">
                        Buyer: <strong className="text-stone-700">{o.buyer_name}</strong> (📞 {o.buyer_phone})
                        <div className="truncate text-stone-400">📍 {o.address}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Buttons */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-semibold text-green-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% Payout Guaranteed on Dispatch
                    </span>

                    <div className="flex items-center gap-2">
                      {isPlaced && (
                        <button
                          onClick={() => handleUpdateStatus(o.order_id, 'confirmed')}
                          disabled={updatingId === o.order_id}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          {updatingId === o.order_id ? 'Updating...' : t('markConfirmed')}
                        </button>
                      )}

                      {isConfirmed && (
                        <button
                          onClick={() => handleUpdateStatus(o.order_id, 'shipped')}
                          disabled={updatingId === o.order_id}
                          className="px-3.5 py-1.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>{updatingId === o.order_id ? 'Updating...' : t('markShipped')}</span>
                        </button>
                      )}

                      {isShipped && (
                        <span className="text-xs font-bold text-green-700 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Dispatched via Speed Post</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: My Crafts */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex gap-3 shadow-xs">
              <img
                src={p.image}
                alt={p.title}
                className="w-20 h-20 rounded-xl object-cover border border-stone-100 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block mb-1">
                  {p.craft}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                  {p.title}
                </h4>
                <div className="text-xs font-extrabold text-amber-900 mt-0.5">
                  ₹{p.price.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
                  <span>Stock: {p.stock} units</span>
                  <Link to={`/product/${p.id}`} className="text-amber-800 font-semibold underline">
                    View Story →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
