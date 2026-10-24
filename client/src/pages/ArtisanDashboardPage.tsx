import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle, PackageCheck, Truck, Clock, CheckCircle2, ShoppingBag,
  Phone, MapPin, ShieldCheck, ChevronRight, MessageSquare, ExternalLink,
  Award, Sparkles, Check, RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { ArtisanOrderItem, Product } from '../types';
import { audioSystem } from '../utils/audioAssistant';

export const ArtisanDashboardPage: React.FC = () => {
  const { artisan } = useAuth();
  const { t, i18n } = useTranslation();
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
    audioSystem.playChime('ding');
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        audioSystem.playChime('success');
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
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 pb-32 animate-slide-up">
      {/* Master Workshop Header Card */}
      <div className="bg-gradient-to-br from-amber-950 via-[#3a1a0f] to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden border border-amber-800/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative">
              <img
                src={artisan.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'}
                alt={artisan.name}
                className="w-24 h-24 rounded-full object-cover border-3 border-amber-400 shadow-xl shrink-0"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center text-white text-xs">
                ✓
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-xs font-bold mb-1.5 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>GI Master Custodian • ಗ್ರಾಮ ಕಮ್ಮಟ</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-headline mb-1">
                {artisan.name}
              </h1>
              <p className="text-xs text-amber-100/80 flex items-center justify-center md:justify-start gap-2.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{artisan.village}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{artisan.phone}</span>
                </span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/artisan/add-product"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg hover:scale-102"
            >
              <PlusCircle className="w-4 h-4 text-stone-950" />
              <span>{t('addProduct')}</span>
            </Link>
          </div>
        </div>

        {/* Realtime Workshop Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-amber-800/40 text-left">
          <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-amber-700/30">
            <span className="text-xs text-amber-200/80 font-bold block mb-0.5">{t('totalEarned')}</span>
            <span className="text-xl sm:text-2xl font-black text-amber-300 font-headline">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-amber-700/30">
            <span className="text-xs text-amber-200/80 font-bold block mb-0.5">Pending Orders</span>
            <span className="text-xl sm:text-2xl font-black text-white font-headline">
              {pendingOrders.length}
            </span>
          </div>

          <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-amber-700/30">
            <span className="text-xs text-amber-200/80 font-bold block mb-0.5">Active Masterworks</span>
            <span className="text-xl sm:text-2xl font-black text-white font-headline">
              {products.length}
            </span>
          </div>

          <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-amber-700/30">
            <span className="text-xs text-amber-200/80 font-bold block mb-0.5">Guaranteed Wage</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-headline">
              ₹80 / hr
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-amber-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>{t('incomingOrders')} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-amber-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('myProducts')} ({products.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders Lifecycle */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-stone-500">No orders received yet.</p>
              <p className="text-[11px] text-stone-400 mt-1">
                When buyers purchase your craft, the verified order appears here immediately.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.item_id}
                className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:border-amber-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.product_image}
                      alt={order.product_title}
                      className="w-16 h-16 rounded-2xl object-cover border border-stone-100 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full inline-block mb-1">
                        {order.product_craft}
                      </span>
                      <h3 className="font-bold text-sm text-stone-900 font-headline">
                        {order.product_title}
                      </h3>
                      <p className="text-xs font-extrabold text-amber-950 font-headline">
                        ₹{(order.item_price * order.qty).toLocaleString('en-IN')} (Qty: {order.qty})
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-flex items-center gap-1.5 ${
                        order.order_status === 'shipped'
                          ? 'bg-emerald-100 text-emerald-900'
                          : order.order_status === 'confirmed'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      <span>{order.order_status}</span>
                    </span>
                  </div>
                </div>

                {/* Buyer Details & Address */}
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Buyer Details</span>
                    <p className="font-bold text-stone-800">{order.buyer_name}</p>
                    <p className="text-stone-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{order.buyer_phone}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Postal Dispatch Destination</span>
                    <p className="text-stone-700 leading-relaxed font-medium">
                      {order.address}
                    </p>
                  </div>
                </div>

                {/* Fulfillment Actions */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-400 font-mono">
                    Order ID: #{order.order_id}
                  </span>

                  <div className="flex items-center gap-2">
                    {order.order_status === 'placed' && (
                      <button
                        onClick={() => handleUpdateStatus(order.order_id, 'confirmed')}
                        disabled={updatingId === order.order_id}
                        className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>Confirm & Start Packing</span>
                      </button>
                    )}

                    {order.order_status === 'confirmed' && (
                      <button
                        onClick={() => handleUpdateStatus(order.order_id, 'shipped')}
                        disabled={updatingId === order.order_id}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Mark Dispatched (India Post)</span>
                      </button>
                    )}

                    {order.order_status === 'shipped' && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>Dispatched via Speed Post (Escrow Released)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: My Crafts */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-300 transition-all flex flex-col"
            >
              <div className="relative h-48 bg-stone-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 bg-amber-800 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {product.craft}
                </div>
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{product.hours}h</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm truncate font-headline mb-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                    {product.story || product.technique}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-extrabold text-base text-amber-950 font-headline">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
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
