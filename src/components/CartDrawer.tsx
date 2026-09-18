import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/whatsapp';
import { products } from '../data/products';
import { Product } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartItemQuantity,
    removeCartItem,
    subtotal,
    discount,
    deliveryFee,
    total,
    setCheckoutOpen,
    addToCart
  } = useApp();

  // Smart Recommendations: "WANT ANOTHER PUNCH?"
  const recommendations = useMemo(() => {
    if (cart.length === 0) return [];

    const recList: Product[] = [];
    const hasBurger = cart.some(i => i.product.name.toLowerCase().includes('burger'));
    const hasChicken = cart.some(i => i.product.name.toLowerCase().includes('chicken') || i.product.name.toLowerCase().includes('popper'));
    const hasNachos = cart.some(i => i.product.name.toLowerCase().includes('nacho'));
    const hasDessert = cart.some(i => i.product.category === 'POSTRES');
    const hasProtein = cart.some(i => i.product.name.toLowerCase().includes('protein') || i.product.name.toLowerCase().includes('whey'));

    const findProduct = (idOrName: string) =>
      products.find(p => p.available && (p.id.includes(idOrName) || p.name.toLowerCase().includes(idOrName)));

    if (hasBurger || hasChicken) {
      const fries = findProduct('fries');
      const soda = findProduct('soda');
      if (fries && !cart.some(c => c.productId === fries.id)) recList.push(fries);
      if (soda && !cart.some(c => c.productId === soda.id)) recList.push(soda);
    } else if (hasNachos) {
      const drink = findProduct('cherry') || findProduct('soda');
      if (drink && !cart.some(c => c.productId === drink.id)) recList.push(drink);
    }

    if (hasDessert) {
      const shake = findProduct('shake') || findProduct('milkshake');
      if (shake && !cart.some(c => c.productId === shake.id)) recList.push(shake);
    } else {
      const brownie = findProduct('brownie');
      if (brownie && !cart.some(c => c.productId === brownie.id) && recList.length < 2) {
        recList.push(brownie);
      }
    }

    if (hasProtein) {
      const chickenPlate = findProduct('teriyaki');
      if (chickenPlate && !cart.some(c => c.productId === chickenPlate.id) && recList.length < 2) {
        recList.push(chickenPlate);
      }
    }

    // Fallback if list is short: recommend best-selling item not in cart
    if (recList.length === 0) {
      const topPick = products.find(p => p.recommended && !cart.some(c => c.productId === p.id));
      if (topPick) recList.push(topPick);
    }

    return recList.slice(0, 2);
  }, [cart]);

  if (!cartOpen) return null;

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Your combat shopping cart"
    >
      <div
        className="w-full max-w-md sm:max-w-lg bg-[#0c0f16] h-full shadow-2xl border-l border-white/15 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#090b10]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bebas text-3xl tracking-wide text-white">
                YOUR COMBAT CART
              </h3>
              <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block -mt-1">
                {cart.length} distinct item{cart.length !== 1 ? 's' : ''} in your corner
              </span>
            </div>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4 text-neutral-400">
              <span className="text-6xl block">🥊</span>
              <h4 className="font-bebas text-3xl tracking-wider text-white">
                YOUR CART IS EMPTY
              </h4>
              <p className="text-xs max-w-xs mx-auto">
                Step into the ring! Browse the championship menu and add your favorite fast-food rounds.
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  const el = document.querySelector('#menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bebas text-lg tracking-wider border border-red-400"
              >
                EXPLORE MENU
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cartItemId}
                className="p-4 rounded-2xl bg-[#11141f] border border-white/10 flex flex-col justify-between space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    {item.product.image && (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="font-bebas text-xl tracking-wide text-white leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="text-xs font-bold text-red-400 block">
                        {formatCurrency(item.unitPrice)} each
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeCartItem(item.cartItemId)}
                    className="text-neutral-500 hover:text-red-400 p-1.5 transition-colors"
                    title="Remove item"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Customizations tags */}
                {(item.extras.length > 0 || item.toppings.length > 0 || item.observations) && (
                  <div className="text-[11px] bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1">
                    {item.extras.length > 0 && (
                      <div className="text-neutral-300">
                        <strong className="text-red-400">Extras:</strong>{' '}
                        {item.extras.map(e => `${e.name} (+${formatCurrency(e.price)})`).join(', ')}
                      </div>
                    )}
                    {item.toppings.length > 0 && (
                      <div className="text-neutral-300">
                        <strong className="text-blue-400">Toppings:</strong>{' '}
                        {item.toppings.map(t => `${t.name} (+${formatCurrency(t.price)})`).join(', ')}
                      </div>
                    )}
                    {item.observations && (
                      <div className="text-neutral-400 italic">
                        <strong>Note:</strong> "{item.observations}"
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity Control & Total */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center bg-neutral-900 border border-white/10 rounded-lg p-0.5">
                    <button
                      onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-bebas text-xl text-white font-bold">
                    {formatCurrency(item.totalPrice)}
                  </span>
                </div>
              </div>
            ))
          )}

          {/* Section 28: SMART RECOMMENDATIONS: WANT ANOTHER PUNCH? */}
          {cart.length > 0 && recommendations.length > 0 && (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-red-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-red-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>WANT ANOTHER PUNCH?</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Recommended ringside accompaniments for your current fight card:
              </p>

              <div className="space-y-2">
                {recommendations.map(rec => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-black/50 border border-white/5"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img
                        src={rec.image}
                        alt={rec.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="font-bold text-xs text-white block truncate">
                          {rec.name}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-semibold">
                          {formatCurrency(rec.price)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(rec, 1, [], [], 'Quick Smart Recommendation')}
                      className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bebas text-xs tracking-wider border border-red-400 shrink-0"
                    >
                      + ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Totals and Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-white/15 bg-[#090b10] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>Discount Applied:</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Delivery:</span>
                <span className="font-medium text-neutral-300">
                  {deliveryFee !== null ? formatCurrency(deliveryFee) : 'To be confirmed via WhatsApp'}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-white/10 text-white font-bold text-base">
                <span className="font-bebas text-2xl">TOTAL:</span>
                <span className="font-bebas text-3xl text-red-400">
                  {formatCurrency(total)}
                  {deliveryFee === null && <span className="text-xs text-neutral-400 ml-1 font-sans font-normal">+ Delivery</span>}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-red-600/30 border border-red-400 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-98"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
