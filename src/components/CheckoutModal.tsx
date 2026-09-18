import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderType } from '../types';
import { restaurantConfig } from '../data/restaurantConfig';
import { formatCurrency, generateOrderWhatsAppMessage, buildWhatsAppLink } from '../utils/whatsapp';
import { X, CheckCircle, ShieldAlert, Phone, User, MapPin, CreditCard, MessageCircle } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    deliveryFee,
    total,
    checkoutOpen,
    setCheckoutOpen,
    tableParam,
    setWhatsAppReady,
    clearCart
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>(tableParam ? 'DINE IN' : 'DELIVERY');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [tableNumber, setTableNumber] = useState(tableParam || '');
  const [paymentMethod, setPaymentMethod] = useState(restaurantConfig.paymentMethods[0]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!checkoutOpen) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validation checks
    if (cart.length === 0) {
      setErrorMessage('Your combat cart is empty. Please add items before checking out.');
      return;
    }

    if (!(customerName || '').trim()) {
      setErrorMessage('Please provide your name for the order.');
      return;
    }

    if (!(customerPhone || '').trim()) {
      setErrorMessage('Please provide your contact phone number.');
      return;
    }

    if (orderType === 'DELIVERY') {
      if (!(address || '').trim()) {
        setErrorMessage('Delivery address is required when Delivery is selected.');
        return;
      }
    }

    // 2. Generate dynamic order WhatsApp message
    const orderData = {
      customerName,
      customerPhone,
      orderType,
      address,
      neighborhood,
      reference,
      deliveryInstructions,
      tableNumber,
      paymentMethod,
      specialRequests
    };

    const dynamicMessage = generateOrderWhatsAppMessage(
      cart,
      orderData,
      subtotal,
      discount,
      deliveryFee
    );

    const whatsAppUrl = buildWhatsAppLink(dynamicMessage);

    // 3. Open WhatsApp link
    window.open(whatsAppUrl, '_blank');

    // 4. Open confirmation modal with mandatory instruction:
    // “WhatsApp is ready. Review your order and press SEND to finalize it.”
    setCheckoutOpen(false);
    setWhatsAppReady({
      open: true,
      message: dynamicMessage,
      url: whatsAppUrl
    });

    // Clear cart after order is initiated
    clearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0c0f16] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-[#090b10] flex items-center justify-between">
          <div>
            <h3 id="checkout-title" className="font-bebas text-3xl sm:text-4xl tracking-wide text-white">
              ROUND CHECKOUT
            </h3>
            <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
              FINAL STEP BEFORE ENTERING WHATSAPP
            </span>
          </div>

          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleConfirmOrder} className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs font-bold animate-in fade-in flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Customer Information */}
          <div className="space-y-3">
            <span className="text-xs font-black tracking-wider text-neutral-300 uppercase block">
              1. CUSTOMER INFORMATION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="chk-name" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="chk-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. John Henderson"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-phone" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="chk-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 3028305329"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Order Type Selection */}
          <div className="space-y-3">
            <span className="text-xs font-black tracking-wider text-neutral-300 uppercase block">
              2. ORDER TYPE
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['DELIVERY', 'DINE IN', 'PICKUP'] as OrderType[]).map((type) => {
                const active = orderType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      active
                        ? 'bg-red-600 border-red-400 text-white shadow-md'
                        : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {type === 'DELIVERY' && '🚚 DELIVERY'}
                    {type === 'DINE IN' && '🍽️ DINE IN'}
                    {type === 'PICKUP' && '🛍️ PICKUP'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Address / Dine In / Pickup Specific Fields */}
          {orderType === 'DELIVERY' && (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3 animate-in fade-in">
              <span className="text-xs font-black text-red-400 uppercase tracking-wider block">
                DELIVERY ADDRESS DETAILS:
              </span>
              <div>
                <label htmlFor="chk-address" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                  Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="chk-address"
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Street, number, building / house"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="chk-neighborhood" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                    Neighborhood
                  </label>
                  <input
                    id="chk-neighborhood"
                    type="text"
                    value={neighborhood}
                    onChange={e => setNeighborhood(e.target.value)}
                    placeholder="Barrio / Neighborhood"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="chk-ref" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                    Reference
                  </label>
                  <input
                    id="chk-ref"
                    type="text"
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    placeholder="Nearby landmark or building"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="chk-delivery-notes" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                  Additional Delivery Instructions
                </label>
                <input
                  id="chk-delivery-notes"
                  type="text"
                  value={deliveryInstructions}
                  onChange={e => setDeliveryInstructions(e.target.value)}
                  placeholder="e.g. Ring buzzer 402, leave at reception..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>

              <p className="text-[11px] text-neutral-500 italic">
                * Delivery fee is calculated and confirmed directly via WhatsApp.
              </p>
            </div>
          )}

          {orderType === 'DINE IN' && (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-3 animate-in fade-in">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider block">
                DINE IN DETAILS:
              </span>
              <div>
                <label htmlFor="chk-table" className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                  Table Number (If already seated)
                </label>
                <input
                  id="chk-table"
                  type="text"
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 12 (Leave blank if arriving soon)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {orderType === 'PICKUP' && (
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2 animate-in fade-in text-xs text-neutral-300">
              <span className="font-black text-white uppercase block">
                PICKUP INSTRUCTIONS:
              </span>
              <p>
                Your combat order will be prepared fresh for pickup at the counter. Estimated time will be sent directly via WhatsApp upon confirmation.
              </p>
              <p className="text-[11px] text-neutral-400">
                Restaurant address:{' '}
                <a
                  href={restaurantConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 font-medium underline underline-offset-2 inline-flex items-center gap-1 transition-colors"
                  title="Abrir en Google Maps"
                >
                  <span>{restaurantConfig.address}</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </p>
            </div>
          )}

          {/* 4. Payment Method Selection */}
          <div className="space-y-2">
            <span className="text-xs font-black tracking-wider text-neutral-300 uppercase block">
              3. PAYMENT METHOD
            </span>
            <div className="relative">
              <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none appearance-none cursor-pointer"
              >
                {restaurantConfig.paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[11px] text-neutral-500 block">
              The website records your payment preference to prepare change or invoice on WhatsApp.
            </span>
          </div>

          {/* 5. Special Requests */}
          <div className="space-y-1.5">
            <label htmlFor="chk-special-requests" className="text-xs font-black tracking-wider text-neutral-300 uppercase block">
              4. SPECIAL REQUESTS / CHEF NOTES:
            </label>
            <textarea
              id="chk-special-requests"
              rows={2}
              value={specialRequests}
              onChange={e => setSpecialRequests(e.target.value)}
              placeholder="e.g. No pickles on burgers, extra napkins, cut sandwiches in half..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
            />
            <p className="text-[11px] text-neutral-500 italic">
              Requests are subject to availability and restaurant confirmation.
            </p>
          </div>

          {/* Order Summary Breakdown */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs">
            <span className="font-bold text-neutral-300 uppercase block pb-1 border-b border-white/10">
              ORDER SUMMARY ({cart.length} ITEMS)
            </span>
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal:</span>
              <span className="text-white font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount:</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Fee:</span>
              <span className="text-neutral-300">
                {orderType === 'DELIVERY'
                  ? (deliveryFee !== null ? formatCurrency(deliveryFee) : 'To be confirmed via WhatsApp')
                  : '$0 (Not applicable)'}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10 text-white font-bold text-sm">
              <span className="font-bebas text-xl">ESTIMATED TOTAL:</span>
              <span className="font-bebas text-2xl text-red-400">
                {formatCurrency(total)}
                {deliveryFee === null && orderType === 'DELIVERY' && (
                  <span className="text-[10px] text-neutral-400 font-sans ml-1">+ Delivery fee</span>
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-red-600/30 border border-red-400 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-98"
            >
              <MessageCircle className="w-6 h-6" />
              <span>CONFIRM ORDER VIA WHATSAPP</span>
            </button>
            <p className="text-[11px] text-neutral-500 text-center mt-2">
              Clicking will open WhatsApp directly with your complete order formatted.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
