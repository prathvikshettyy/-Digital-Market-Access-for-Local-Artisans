import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { audioSystem } from '../utils/audioAssistant';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQty, totalAmount } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const totalHours = cart.reduce((sum, item) => sum + (item.product.hours * item.qty), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200/60 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-2 font-headline">
          {i18n.language === 'kn' ? 'ಖರೀದಿ ಬುಟ್ಟಿ ಖಾಲಿಯಾಗಿದೆ' : 'Your Bag is Empty'}
        </h2>
        <p className="text-xs text-stone-500 mb-6 max-w-xs mx-auto leading-relaxed">
          {i18n.language === 'kn'
            ? 'ನಮ್ಮ ಗ್ರಾಮೀಣ ನೇಕಾರರು ಮತ್ತು ಕುಶಲಕರ್ಮಿಗಳನ್ನು ಬೆಂಬಲಿಸಲು ಕರಕುಶಲ ಕೃತಿಗಳನ್ನು ಸೇರಿಸಿ.'
            : 'Support local coastal master weavers and artisans by adding authentic handcrafted creations to your bag.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-xs font-bold transition-all shadow-md"
        >
          <span>{i18n.language === 'kn' ? 'ಕಲಾಕೃತಿಗಳನ್ನು ನೋಡಿ' : 'Explore Crafts'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 pb-28">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-900 mb-5 transition-colors bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{i18n.language === 'kn' ? 'ಸಂತೆಗೆ ಮರಳಿ' : 'Continue Shopping'}</span>
      </Link>

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl sm:text-2xl font-black text-stone-900 font-headline">
          {i18n.language === 'kn' ? 'ಖರೀದಿ ಬುಟ್ಟಿ' : 'Artisan Bag'} ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h1>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>{totalHours}h artisan labor funded</span>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3.5 mb-6">
        {cart.map(({ product, qty }) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 shadow-xs hover:border-amber-300 transition-colors"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-stone-100 shrink-0"
            />

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-full inline-block mb-1">
                {product.craft}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-stone-900 truncate font-headline">
                {product.title}
              </h3>
              <p className="text-[11px] text-stone-500 truncate mb-1">
                By {product.artisan_name} • {product.artisan_village}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-amber-950 font-headline">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-stone-400">
                  (₹{Math.round(product.hours * 80).toLocaleString('en-IN')} direct wage)
                </span>
              </div>
            </div>

            {/* Stepper & Delete */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-0.5 shadow-inner">
                <button
                  onClick={() => {
                    updateQty(product.id, qty - 1);
                    audioSystem.playChime('ding');
                  }}
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-white rounded-lg transition-colors"
                >
                  -
                </button>
                <span className="w-7 text-center text-xs font-bold text-stone-900">
                  {qty}
                </span>
                <button
                  onClick={() => {
                    updateQty(product.id, qty + 1);
                    audioSystem.playChime('ding');
                  }}
                  disabled={qty >= product.stock}
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-white rounded-lg transition-colors disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  removeFromCart(product.id);
                  audioSystem.playChime('ding');
                }}
                className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fair Payout Trust Note */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 mb-6 flex items-center gap-3 text-xs text-emerald-950 font-medium shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
        <div className="leading-snug">
          <strong className="font-bold block text-emerald-900">Zero Middleman Guarantee</strong>
          <span>100% of the artisan wage is directly released to the village maker when India Post picks up the package.</span>
        </div>
      </div>

      {/* Price Summary & Checkout Action */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-3.5">
        <div className="flex justify-between text-xs text-stone-600">
          <span>Subtotal</span>
          <span className="font-bold text-stone-800">₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-xs text-stone-600">
          <span>India Post Speed Post Delivery</span>
          <span className="text-emerald-700 font-bold">Free (Subsidized Co-op)</span>
        </div>
        <div className="flex justify-between text-xs text-stone-600">
          <span>Total Artisan Hours Sustained</span>
          <span className="font-bold text-amber-900">{totalHours} Hours</span>
        </div>

        <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
          <div>
            <span className="font-black text-sm text-stone-900 block font-headline">Total Fair Price</span>
            <span className="text-[11px] text-stone-400">All taxes & packaging included</span>
          </div>
          <span className="text-2xl font-black text-amber-950 font-headline">
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={() => {
            audioSystem.playChime('ding');
            navigate('/checkout');
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md mt-3 cursor-pointer"
        >
          <span>Proceed to Direct Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
