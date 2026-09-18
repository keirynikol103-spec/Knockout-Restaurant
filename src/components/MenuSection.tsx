import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductCategory, CombatLevel } from '../types';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { Search, Filter, Sparkles, ShieldAlert } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { discipline } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<CombatLevel | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: ProductCategory | 'ALL'; label: string; icon: string }[] = [
    { id: 'ALL', label: 'ALL COMBAT MENU', icon: '⚡' },
    { id: 'ENTRADAS', label: 'ENTRADAS & SNACKS', icon: '🍟' },
    { id: 'PLATOS PRINCIPALES', label: 'PLATOS PRINCIPALES', icon: '🍔' },
    { id: 'POSTRES', label: 'POSTRES & SHAKES', icon: '🍰' },
    { id: 'BEBIDAS', label: 'BEBIDAS & DRINKS', icon: '🥤' }
  ];

  const combatLevels: { id: CombatLevel | 'ALL'; label: string; subtitle: string; icon: string }[] = [
    { id: 'ALL', label: 'ALL LEVELS', subtitle: 'Full Fight Card', icon: '🥊' },
    { id: 'ROOKIE', label: 'ROOKIE', subtitle: 'Quick Bites & Starters', icon: '🥉' },
    { id: 'FIGHTER', label: 'FIGHTER', subtitle: 'Standard Loaded Rounds', icon: '🥈' },
    { id: 'CHAMPION', label: 'CHAMPION', subtitle: 'Signature Heavyweight Meals', icon: '🥇' },
    { id: 'LEGEND', label: 'LEGEND', subtitle: 'The Ultimate Giant Combos', icon: '👑' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
        return false;
      }
      // Combat level filter
      if (selectedLevel !== 'ALL' && product.level !== selectedLevel) {
        return false;
      }
      // Search query
      if ((searchQuery || '').trim() !== '') {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>AUTHENTIC AMERICAN FIGHT CARD</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            CHAMPIONSHIP MENU
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            Click any combat round to feel the punch impact and customize your extras, toppings, and flavor profile.
          </p>
        </div>

        {/* Search and Category Filtering Row */}
        <div className="space-y-6">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search burgers, nachos, chicken, shakes, ingredients..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-neutral-900/90 border border-white/15 focus:border-red-500 focus:outline-none text-sm text-white placeholder-neutral-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* 1. Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bebas text-lg tracking-wider whitespace-nowrap transition-all border ${
                    active
                      ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/30 scale-[1.03]'
                      : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                  aria-pressed={active}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 2. Combat Level Selector: CHOOSE YOUR FIGHT LEVEL */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0e111a] border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bebas text-2xl tracking-wider text-white">
                  CHOOSE YOUR FIGHT LEVEL:
                </span>
                <span className="text-xs text-neutral-400 hidden md:inline">
                  (Filter meals by combat portion & intensity)
                </span>
              </div>
              <span className="text-[11px] font-bold text-neutral-400">
                ACTIVE DISCIPLINE: <strong className="text-red-400">{discipline}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {combatLevels.map(lvl => {
                const active = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      active
                        ? 'bg-red-950/60 border-red-500 shadow-md scale-[1.02]'
                        : 'bg-neutral-900/60 border-white/5 hover:border-white/20 text-neutral-400 hover:text-neutral-200'
                    }`}
                    aria-pressed={active}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{lvl.icon}</span>
                      <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                          active ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {active ? 'ON' : 'LEVEL'}
                      </span>
                    </div>
                    <div className="font-bebas text-xl tracking-wider text-white mt-1">
                      {lvl.label}
                    </div>
                    <div className="text-[10px] text-neutral-400 line-clamp-1">
                      {lvl.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-neutral-900/40 rounded-3xl border border-white/10 space-y-3">
            <span className="text-5xl block">🥊</span>
            <h3 className="font-bebas text-3xl tracking-wider text-white">
              NO MATCH FOUND IN THIS ROUND
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              No menu items match your search or filter combination. Try resetting your combat level or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedLevel('ALL');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-red-600 text-white font-bebas text-lg tracking-wider"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Section 16 Allergen Guide Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-500/50 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-neutral-200 block text-sm">
                ALLERGEN & DIETARY GUIDE
              </span>
              <p className="text-neutral-400 text-xs">
                Please inform us of any allergies before placing your order. Detailed allergens are listed inside each product card.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-neutral-400 shrink-0 px-3 py-1 rounded bg-white/5 border border-white/10">
            [ALLERGEN INFORMATION TO BE ADDED]
          </span>
        </div>
      </div>
    </section>
  );
};
