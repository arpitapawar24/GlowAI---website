import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Sparkles, RefreshCw, X } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states initialized from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [concern, setConcern] = useState(searchParams.get('concern') || 'All');
  const [skinType, setSkinType] = useState('All');
  const [sort, setSort] = useState('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['All', 'Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Haircare', 'Cosmetics'];
  const concerns = [
    'All',
    'Acne',
    'Dryness',
    'Redness',
    'Hyperpigmentation',
    'Fine Lines',
    'Hair Thinning',
    'Dandruff',
    'Sensitivity'
  ];
  const skinTypes = ['All', 'All Skin Types', 'Sensitive', 'Oily', 'Dry', 'Combination', 'Normal'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts({
        search,
        category,
        concern,
        skinType,
        sort
      });
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, concern, skinType, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setConcern('All');
    setSkinType('All');
    setSort('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Curated Medical-Grade Formulations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Skincare & Cosmetics Marketplace
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Science-backed formulations tested for ingredient synergy and biocompatibility.
          </p>
        </div>

        {/* Sort and mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-800 dark:text-stone-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-semibold focus:outline-none"
          >
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>

      {/* Search and Category Quick Chips */}
      <div className="space-y-4">
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by ingredient, brand, or formula (e.g. Ceramide, Salicylic, Vitamin C)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-24 py-3 text-xs sm:text-sm rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition"
          >
            Search
          </button>
        </form>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                category === cat
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-amber-400/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filters sidebar + Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block md:col-span-3 space-y-6 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-amber-500" /> Filter Catalog
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Skin Concern Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
              Target Skin & Hair Concern
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {concerns.map((c) => (
                <button
                  key={c}
                  onClick={() => setConcern(c)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                    concern === c
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Skin Type Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
              Skin Type Compatibility
            </label>
            <div className="space-y-1.5">
              {skinTypes.map((st) => (
                <button
                  key={st}
                  onClick={() => setSkinType(st)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                    skinType === st
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="md:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>Showing <strong>{products.length}</strong> medical & cosmetic formulas</span>
            {(category !== 'All' || concern !== 'All' || skinType !== 'All' || search) && (
              <span className="flex items-center gap-1 text-amber-600">
                Filters active <button onClick={handleResetFilters} className="underline ml-1">Clear</button>
              </span>
            )}
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-stone-400">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mb-3" />
              <p className="text-xs">Loading biocompatible formulations...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
              <p className="font-serif font-bold text-lg text-stone-800 dark:text-stone-200">
                No matching formulations found
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try widening your search filters or resetting your category selections.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
