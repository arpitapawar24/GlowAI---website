import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group relative flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-xl hover:border-amber-400/50 dark:hover:border-amber-500/40 transition-all duration-300">
      {/* Image container */}
      <Link to={`/products/${product._id}`} className="relative block aspect-square overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-md">
            {product.category}
          </span>
          {product.tags && product.tags.includes('Bestseller') && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500 text-stone-950 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 fill-stone-950" /> Bestseller
            </span>
          )}
        </div>

        {/* Quick add floating button on mobile / hover */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 p-3 rounded-2xl shadow-lg transition-all transform active:scale-90 ${
            added
              ? 'bg-emerald-600 text-white scale-105'
              : 'bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 hover:bg-amber-600 hover:text-white backdrop-blur-md'
          }`}
          aria-label="Add to cart"
        >
          {added ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </Link>

      {/* Info details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 mb-1.5">
          <span className="font-semibold tracking-wider uppercase text-[11px] text-amber-700 dark:text-amber-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-stone-700 dark:text-stone-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-xs">{product.rating}</span>
            <span className="text-[11px] text-stone-600 dark:text-stone-300">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Concerns Tags */}
        <div className="flex flex-wrap gap-1 mt-auto mb-4">
          {product.targetConcerns?.slice(0, 2).map((c, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium"
            >
              {c}
            </span>
          ))}
          {product.targetConcerns?.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              +{product.targetConcerns.length - 2}
            </span>
          )}
        </div>

        {/* Price and Cart button */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-600 dark:text-stone-300 font-medium">Price</span>
            <div className="text-lg font-bold text-stone-900 dark:text-stone-100 font-mono">
              ${Number(product.price).toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
