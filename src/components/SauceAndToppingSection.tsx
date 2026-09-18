import React from 'react';
import { sauces } from '../data/sauces';
import { toppings } from '../data/toppings';
import { formatCurrency } from '../utils/whatsapp';
import { useApp } from '../context/AppContext';
import { Flame, Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';

export const SauceAndToppingSection: React.FC = () => {
  const { addToCart } = useApp();

  // Helper to add sauce as a distinct cart item if customer wants side sauces directly
  const handleAddSauceToCart = (sauce: typeof sauces[0]) => {
    const sauceAsProduct: Product = {
      id: `side-${sauce.id}`,
      name: `Side: ${sauce.name}`,
      category: 'ENTRADAS',
      level: 'ROOKIE',
      price: sauce.price,
      description: sauce.description,
      ingredients: ['House Specialty Dip'],
      image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=600&q=80',
      calories: 90,
      spiceLevel: sauce.spiceLevel,
      allergens: sauce.allergens,
      available: true,
      extras: [],
      toppings: [],
      story: 'Extra ringside dip cup.',
      discipline: ['BOXING', 'KICKBOXING']
    };
    addToCart(sauceAsProduct, 1, [], [], 'Side sauce cup');
  };

  const handleAddToppingToCart = (topping: typeof toppings[0]) => {
    const toppingAsProduct: Product = {
      id: `side-${topping.id}`,
      name: `Side: ${topping.name}`,
      category: 'ENTRADAS',
      level: 'ROOKIE',
      price: topping.price,
      description: topping.description,
      ingredients: [topping.name],
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
      calories: 120,
      spiceLevel: 0,
      allergens: topping.allergens,
      available: true,
      extras: [],
      toppings: [],
      story: 'Extra topping portion in a side cup.',
      discipline: ['BOXING']
    };
    addToCart(toppingAsProduct, 1, [], [], 'Side topping portion');
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0e15] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ================= 1. THE SAUCE CORNER ================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-500/40 text-xs font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>RINGSIDE DIPPING ARSENAL</span>
              </div>
              <h3 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white">
                THE SAUCE CORNER
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Signature artisan dips crafted to amplify every burger, tender, and fry with fight-night punch.
              </p>
            </div>
            <span className="text-xs font-bold text-neutral-400">
              AVAILABLE FOR INDIVIDUAL SIDE ORDER OR IN-BURGER CUSTOMIZATION
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sauces.map((sauce) => (
              <div
                key={sauce.id}
                className="p-5 rounded-2xl bg-[#11141e] border border-white/10 hover:border-red-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bebas text-2xl tracking-wide text-white">
                      {sauce.name}
                    </h4>
                    {sauce.spiceLevel > 0 && (
                      <div className="flex items-center gap-0.5 text-red-500 shrink-0">
                        {Array.from({ length: sauce.spiceLevel }).map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 fill-red-500" />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {sauce.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase font-bold">DIP PRICE</span>
                    <span className="font-bebas text-2xl text-white font-bold">
                      {formatCurrency(sauce.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddSauceToCart(sauce)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bebas text-sm tracking-wider border border-red-400 transition-transform active:scale-95"
                    title="Add extra sauce cup to order"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD SIDE CUP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. TOPPING CHALLENGE ================= */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-500/40 text-xs font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>LOADED TEXTURE UPGRADES</span>
              </div>
              <h3 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white">
                TOPPING CHALLENGE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                Premium toppings to stack high on your burgers, loaded fries, and championship platters.
              </p>
            </div>
            <span className="text-xs font-bold text-neutral-400">
              CRAFTED FRESH DAILY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toppings.map((topping) => (
              <div
                key={topping.id}
                className="p-5 rounded-2xl bg-[#11141e] border border-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bebas text-2xl tracking-wide text-white">
                    {topping.name}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {topping.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase font-bold">TOPPING PRICE</span>
                    <span className="font-bebas text-2xl text-white font-bold">
                      {formatCurrency(topping.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToppingToCart(topping)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bebas text-sm tracking-wider border border-blue-400 transition-transform active:scale-95"
                    title="Add extra topping cup to order"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD SIDE PORTION</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
