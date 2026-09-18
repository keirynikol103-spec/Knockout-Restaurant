import React from 'react';
import { promotions } from '../data/promotions';
import { formatCurrency } from '../utils/whatsapp';
import { useApp } from '../context/AppContext';
import { Flame, Calendar, Tag, ArrowRight } from 'lucide-react';

export const PromotionsSection: React.FC = () => {
  const { setCartOpen } = useApp();

  const handleOrderPromotion = () => {
    const menuEl = document.querySelector('#menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="promotions" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>FIGHT NIGHT SPECIAL BILLING</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            MAIN EVENT
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Championship headliner promos designed with arena poster aesthetics.
          </p>
        </div>

        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="relative rounded-3xl bg-[#0e111a] border-2 border-red-600/40 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-red-500 transition-all duration-300"
              >
                {/* Poster Header Tag */}
                <div className="bg-red-700 text-white font-bebas text-lg px-6 py-2 flex items-center justify-between tracking-wider">
                  <span>★ OFFICIAL FIGHT NIGHT PROMOTION ★</span>
                  <span className="text-xs font-bold bg-black/40 px-2 py-0.5 rounded">
                    SAVE {formatCurrency(promo.discount)}
                  </span>
                </div>

                {/* Poster Image Area */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                  {promo.image ? (
                    <img
                      src={promo.image}
                      alt={promo.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                      [PRODUCT IMAGE PLACEHOLDER]
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-transparent to-transparent" />
                </div>

                {/* Poster Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                      {promo.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Calendar className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{promo.validityPeriod}</span>
                    </div>

                    <div className="text-[11px] text-neutral-500 italic">
                      Terms: {promo.terms}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-500 block uppercase">
                          SPECIAL PRICE
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-bebas text-3xl text-white font-bold">
                            {formatCurrency(promo.price)}
                          </span>
                          <span className="text-xs text-neutral-500 line-through">
                            {formatCurrency(promo.price + promo.discount)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleOrderPromotion}
                        className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bebas text-xl tracking-wider shadow-lg border border-red-400 flex items-center gap-2 transition-transform active:scale-95"
                      >
                        <span>ORDER PROMO</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-neutral-900/40 rounded-3xl border border-white/10">
            <span className="text-4xl block mb-2">🥊</span>
            <p className="font-bebas text-2xl tracking-wider text-neutral-400">
              [NO PROMOTIONS CONFIGURED]
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
