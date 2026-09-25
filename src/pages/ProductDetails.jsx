import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Truck,
  RotateCcw,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const fetchProduct = async () => {
    try {
      const data = await api.getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewError('Please sign in to write a product review.');
      return;
    }
    if (!comment.trim()) {
      setReviewError('Please write your experience in the feedback box.');
      return;
    }

    setReviewSubmitting(true);
    setReviewError('');

    try {
      await api.addProductReview(id, { rating, comment });
      setComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
      fetchProduct();
    } catch (err) {
      setReviewError(err.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-sm text-stone-500 animate-pulse">Loading formulation details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Product Not Found</h2>
        <Link to="/marketplace" className="inline-block px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Back breadcrumb */}
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Link>

      {/* Main product summary card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Product Image */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto aspect-square object-cover rounded-2xl"
          />
        </div>

        {/* Product Specs & Purchasing */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {product.brand}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-sm text-stone-900 dark:text-stone-100 font-mono">
                {product.rating}
              </span>
              <span className="text-xs text-stone-500">
                ({product.reviewsCount || 0} clinical reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-2 pb-4 border-y border-stone-200 dark:border-stone-800 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="text-xs text-emerald-600 font-semibold">In Stock & Ready to Ship</span>
          </div>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.description}
          </p>

          {/* Target Concerns Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              Targeted Concerns
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.targetConcerns?.map((c, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Bag */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden bg-white dark:bg-stone-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 py-3 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition"
              >
                -
              </button>
              <span className="px-4 text-sm font-bold font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 py-3 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl transition active:scale-98 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white shadow-rose-500/20'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" /> Added to Beauty Bag!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add to Bag • ${(product.price * quantity).toFixed(2)}
                </>
              )}
            </button>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Complimentary shipping over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>30-Day Dermal Satisfaction Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical formulation tabs: Ingredients & How to Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-200 dark:border-stone-800">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Key Active Ingredients</span>
          </h3>
          <p className="text-xs text-stone-500">
            Biocompatible molecular actives formulated at clinical pH thresholds.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {product.ingredients?.map((ing, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono font-medium"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Dermatological How-To-Apply</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {product.howToUse || 'Apply 1-2 pumps to clean skin in gentle upward motions. Follow with sunscreen in the morning.'}
          </p>
        </div>
      </div>

      {/* FEEDBACK & REVIEWS MANAGEMENT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              Verified Customer Reviews
            </h3>
            <p className="text-xs text-stone-500 mt-1">Real feedback from verified purchasers</p>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-base font-bold text-amber-500">
            <Star className="w-5 h-5 fill-amber-400" /> {product.rating} / 5.0
          </div>
        </div>

        {/* Write a review form */}
        <form onSubmit={handleReviewSubmit} className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-amber-500" /> Write Verified Review
          </h4>

          {reviewError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs">
              {reviewError}
            </div>
          )}

          {reviewSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs">
              Thank you! Your verified review has been posted.
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500">Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300 dark:text-stone-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={3}
            required
            placeholder="Share your skin results, texture impressions, or scent feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />

          <button
            type="submit"
            disabled={reviewSubmitting}
            className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {reviewSubmitting ? 'Posting Review...' : 'Submit Review'}
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev, index) => (
              <div
                key={rev._id || index}
                className="p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                      {rev.userName || 'Anonymous Patient'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                      Verified Buyer
                    </span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-stone-500 py-4 text-center">
              No customer reviews yet. Be the first to share your experience with this formula!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
