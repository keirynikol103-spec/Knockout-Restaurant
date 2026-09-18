import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CartCustomizationItem } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { X, Minus, Plus, Flame, ShieldAlert, Sparkles, BookOpen, Film } from 'lucide-react';

export const ProductPunchModal: React.FC = () => {
  const {
    punchingProduct,
    activeProductModal,
    closeProductModal,
    addToCart
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedExtras, setSelectedExtras] = useState<CartCustomizationItem[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<CartCustomizationItem[]>([]);
  const [observations, setObservations] = useState<string>('');

  // Reset local state whenever activeProductModal changes
  useEffect(() => {
    if (activeProductModal) {
      setQuantity(1);
      setSelectedExtras([]);
      setSelectedToppings([]);
      setObservations('');
    }
  }, [activeProductModal]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProductModal) {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProductModal, closeProductModal]);

  if (!punchingProduct && !activeProductModal) return null;

  // 1. FAST CINEMATIC PUNCH IMPACT OVERLAY
  if (punchingProduct) {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Flash background */}
        <div className="absolute inset-0 bg-red-950/40 backdrop-blur-xs animate-in fade-in duration-100" />

        {/* Speed lines */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444]" />

        {/* Cinematic Glove Silhouette Strike */}
        <div className="relative z-10 flex items-center justify-center animate-in zoom-in-50 slide-in-from-left-48 duration-300">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-4 border-white/60 shadow-[0_0_80px_rgba(239,68,68,0.8)] flex items-center justify-center transform -rotate-12">
            <span className="text-7xl filter drop-shadow-2xl">🥊</span>
          </div>
          {/* Impact word */}
          <span className="absolute -bottom-8 font-bebas text-5xl tracking-widest text-white text-glow-red uppercase font-black">
            STRIKE!
          </span>
        </div>
      </div>
    );
  }

  // 2. PRODUCT DETAILS MODAL
  if (!activeProductModal) return null;

  const product = activeProductModal;

  const toggleExtra = (extra: { id: string; name: string; price: number }) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const toggleTopping = (topping: { id: string; name: string; price: number }) => {
    setSelectedToppings(prev => {
      const exists = prev.some(t => t.id === topping.id);
      if (exists) {
        return prev.filter(t => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const toppingsTotal = selectedToppings.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = product.price + extrasTotal + toppingsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    addToCart(product, quantity, selectedExtras, selectedToppings, observations);
    closeProductModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#0c0f16] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/20 transition-all focus:outline-none"
          aria-label="Close product details"
        >
          <X className="w-5 h-5 text-red-400" />
        </button>

        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          {/* Top Banner / Image Section */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500 font-bold">
                [PRODUCT IMAGE PLACEHOLDER]
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f16] via-transparent to-black/40" />

            {/* Badges in Media */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-black/80 border border-white/20 text-white shadow-lg">
                🥊 {product.level} LEVEL
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-red-600/90 text-white shadow-lg border border-red-400">
                {product.category}
              </span>
            </div>

            {/* Video Placeholder Tag if requested */}
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-3 py-1 rounded bg-black/80 border border-white/15 text-[11px] text-neutral-300">
              <Film className="w-3.5 h-3.5 text-red-500" />
              <span>[PRODUCT VIDEO PLACEHOLDER]</span>
            </div>
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 id="modal-product-title" className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
                {product.name}
              </h3>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="sm:text-right shrink-0">
              <span className="text-xs text-neutral-400 font-bold block uppercase tracking-wider">
                BASE PRICE
              </span>
              <span className="font-bebas text-3xl sm:text-4xl text-white font-bold">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>

          {/* Key Specs: Calories, Spice, Allergens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-900/60 border border-white/10 text-xs">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">SPICE IMPACT</span>
              <div className="flex items-center gap-1 mt-1">
                {product.spiceLevel > 0 ? (
                  Array.from({ length: product.spiceLevel }).map((_, i) => (
                    <Flame key={i} className="w-4 h-4 text-red-500 fill-red-500" />
                  ))
                ) : (
                  <span className="text-neutral-400">Mild / Non-spicy</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">CALORIC PROFILE</span>
              <span className="font-semibold text-neutral-200 mt-1 block">
                {product.calories ? `${product.calories} kcal` : 'Information pending'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">ALLERGENS</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.allergens && product.allergens.length > 0 ? (
                  product.allergens.map((alg, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-900/60 text-[10px] font-bold">
                      {alg}
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-400 text-[11px]">[ALLERGEN INFORMATION TO BE ADDED]</span>
                )}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Ingredients:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-200">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Creative Product Story */}
          {product.story && (
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black tracking-wider uppercase text-red-400 block mb-0.5">
                  THE FIGHT STORY:
                </span>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "{product.story}"
                </p>
              </div>
            </div>
          )}

          {/* Extras Customization */}
          {product.extras && product.extras.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-black tracking-wider text-neutral-300 uppercase block">
                CUSTOMIZE EXTRAS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.extras.map(extra => {
                  const checked = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all ${
                        checked
                          ? 'bg-red-950/50 border-red-500 text-white'
                          : 'bg-neutral-900/50 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <span className="font-semibold">{extra.name}</span>
                      <span className="font-bold text-red-400">+{formatCurrency(extra.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toppings Customization */}
          {product.toppings && product.toppings.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-black tracking-wider text-neutral-300 uppercase block">
                SELECT TOPPINGS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.toppings.map(top => {
                  const checked = selectedToppings.some(t => t.id === top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all ${
                        checked
                          ? 'bg-blue-950/50 border-blue-500 text-white'
                          : 'bg-neutral-900/50 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <span className="font-semibold">{top.name}</span>
                      <span className="font-bold text-blue-400">+{formatCurrency(top.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Requests / Customer Observations */}
          <div className="space-y-1.5">
            <label htmlFor="product-obs" className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              SPECIAL REQUESTS / OBSERVATIONS:
            </label>
            <textarea
              id="product-obs"
              value={observations}
              onChange={e => setObservations(e.target.value)}
              placeholder="e.g. No onions, extra crispy fries, sauce on the side..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900/80 border border-white/10 focus:border-red-500 focus:outline-none text-xs text-white placeholder-neutral-500"
            />
            <span className="text-[11px] text-neutral-500 block">
              Requests are subject to availability and restaurant confirmation.
            </span>
          </div>
        </div>

        {/* Modal Bottom Footer: Quantity + Final Add to Order Button */}
        <div className="p-4 sm:p-6 border-t border-white/15 bg-[#090b10] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector [-] [1] [+] */}
          <div className="flex items-center bg-neutral-900 border border-white/15 rounded-xl p-1 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bebas text-2xl w-12 text-center text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-red-600/30 border border-red-400 flex items-center justify-between transition-all hover:scale-[1.01] active:scale-98"
          >
            <span>ADD TO ORDER</span>
            <span>{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
