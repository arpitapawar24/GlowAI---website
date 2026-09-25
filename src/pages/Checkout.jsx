import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Checkout() {
  const { items, subtotal, discountAmount, shipping, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.name || 'Sophia Vance');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94107');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [error, setError] = useState('');

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your beauty bag is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        items: items.map(i => ({
          product: i._id,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity
        })),
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country: "United States"
        },
        paymentMethod
      };

      const createdOrder = await api.createOrder(orderPayload);
      clearCart();
      setOrderConfirmed(createdOrder);

      // Trigger Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600">
            Order Confirmed & Payment Verified
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Thank you for choosing GlowAI!
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Your clinical skincare formulations are being prepared in sterile conditions.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm text-left max-w-md mx-auto space-y-3">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-stone-100 dark:border-stone-800">
            <span className="text-stone-500">Tracking Code</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {orderConfirmed.trackingNumber}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500">Ship to</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{fullName}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-stone-500">Estimated Delivery</span>
            <span className="text-stone-800 dark:text-stone-200 font-medium">2 - 3 Business Days</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-3 border-t border-stone-100 dark:border-stone-800">
            <span className="font-bold text-stone-900 dark:text-stone-100">Total Paid</span>
            <span className="font-mono text-base font-bold text-stone-900 dark:text-stone-100">
              ${orderConfirmed.totalPrice?.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/profile?tab=orders"
            className="px-6 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold shadow-md transition"
          >
            Track in Order History
          </Link>
          <Link
            to="/marketplace"
            className="px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Secure Medical Checkout
        </h1>
        <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit SSL Encrypted Order Processing</span>
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping & Payment Fields */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Postal / ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <span>2. Payment Option</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Card', label: 'Credit Card' },
                { id: 'PayPal', label: 'PayPal' },
                { id: 'Cash on Delivery', label: 'COD' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition ${
                    paymentMethod === m.id
                      ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-300'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Submit */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
            Order Review ({items.length} items)
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item._id} className="flex gap-3 text-xs">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                />
                <div className="flex-1">
                  <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">{item.name}</p>
                  <p className="text-stone-500">Qty: {item.quantity} • ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-100 dark:border-stone-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-stone-800 dark:text-stone-200">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Promo Discount</span>
                <span className="font-mono">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-mono text-stone-800 dark:text-stone-200">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-mono text-stone-800 dark:text-stone-200">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 dark:text-stone-100 pt-3 border-t border-stone-200 dark:border-stone-800">
              <span>Grand Total</span>
              <span className="font-mono text-xl text-amber-600 dark:text-amber-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-rose-500/20 active:scale-98 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing Order...' : `Authorize & Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
}
