import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/whatsapp';
import { Flame, ShieldAlert, Sparkles, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { triggerProductPunch, discipline } = useApp();

  const isDisciplineRecommended = product.discipline.includes(discipline);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'ROOKIE':
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
      case 'FIGHTER':
        return 'bg-blue-900/60 text-blue-300 border-blue-600/50';
      case 'CHAMPION':
        return 'bg-red-900/60 text-red-300 border-red-600/50';
      case 'LEGEND':
        return 'bg-amber-900/60 text-amber-300 border-amber-500/60 font-black';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div
      onClick={() => triggerProductPunch(product)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0e1118] border border-white/10 hover:border-red-500/50 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-900/20"
      id={`product-card-${product.id}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-500 font-bold text-xs p-4 text-center">
            [PRODUCT IMAGE PLACEHOLDER]
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Combat Level Badge */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-md ${getLevelBadgeColor(
              product.level
            )}`}
          >
            🥊 {product.level}
          </span>

          {/* Recommended for current discipline badge */}
          {isDisciplineRecommended && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-red-600 text-white shadow-md flex items-center gap-1 border border-red-400">
              <Sparkles className="w-3 h-3" />
              HOT MATCH
            </span>
          )}
        </div>

        {/* Bottom Image Specs: Spice level & Calories */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-neutral-300">
          {/* Spice indicators */}
          {product.spiceLevel > 0 ? (
            <div className="flex items-center gap-0.5 bg-black/70 px-2 py-0.5 rounded-md border border-red-500/30">
              {Array.from({ length: product.spiceLevel }).map((_, i) => (
                <Flame key={i} className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              ))}
              <span className="text-[10px] font-bold text-red-400 ml-1">HOT</span>
            </div>
          ) : (
            <div />
          )}

          {product.calories && (
            <span className="text-[10px] font-semibold bg-black/70 px-2 py-0.5 rounded text-neutral-400 border border-white/10">
              {product.calories} kcal
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bebas text-2xl tracking-wide text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {product.name}
          </h4>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              PRICE
            </span>
            <span className="font-bebas text-2xl tracking-wide text-white font-bold">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600/90 group-hover:bg-red-600 text-white font-bebas text-base tracking-wider border border-red-400 shadow-md transition-transform group-hover:scale-105 active:scale-95"
            aria-label={`Select ${product.name}`}
          >
            <Plus className="w-4 h-4" />
            <span>ADD TO ORDER</span>
          </button>
        </div>
      </div>
    </div>
  );
};
