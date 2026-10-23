import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQty, totalAmount } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-stone-500 mb-6">
          Support local coastal master weavers and artisans by adding handcrafted creations to your bag.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-md"
        >
          <span>Explore Crafts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-24">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Continue Shopping</span>
      </Link>

      <h1 className="text-xl font-bold text-stone-900 mb-4 flex items-center justify-between">
        <span>Shopping Cart ({cart.length} items)</span>
      </h1>

      {/* Cart Items List */}
      <div className="space-y-3 mb-6">
        {cart.map(({ product, qty }) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-xs"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-100 shrink-0"
            />

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block mb-1">
                {product.craft}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                {product.title}
              </h3>
              <p className="text-[11px] text-stone-500 truncate mb-1">
                By {product.artisan_name || 'Master Artisan'}
              </p>
              <div className="text-xs sm:text-sm font-extrabold text-amber-900">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                <button
                  onClick={() => updateQty(product.id, qty - 1)}
                  className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-white rounded transition-colors"
                >
                  -
                </button>
                <span className="w-6 text-center text-xs font-bold text-stone-900">
                  {qty}
                </span>
                <button
                  onClick={() => updateQty(product.id, qty + 1)}
                  disabled={qty >= product.stock}
                  className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-white rounded transition-colors disabled:opacity-30"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fair Payout Trust Note */}
      <div className="p-3.5 bg-green-50 rounded-2xl border border-green-200/80 mb-6 flex items-center gap-2.5 text-xs text-green-950 font-medium">
        <ShieldCheck className="w-4 h-4 text-green-700 shrink-0" />
        <span>100% of the artisan wage is directly deposited to rural weavers upon dispatch.</span>
      </div>

      {/* Price Summary & Checkout Action */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex justify-between text-xs text-stone-600">
          <span>Subtotal</span>
          <span>₹{totalAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-xs text-stone-600">
          <span>Delivery / Logistics (India Post Speed Post)</span>
          <span className="text-green-700 font-semibold">Free (Subsidized)</span>
        </div>
        <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
          <span className="font-bold text-sm text-stone-900">Total Fair Price</span>
          <span className="text-xl font-extrabold text-amber-950">
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="w-full py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md mt-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
