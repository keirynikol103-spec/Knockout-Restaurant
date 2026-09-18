import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageCircle, ExternalLink, X } from 'lucide-react';

export const WhatsAppReadyModal: React.FC = () => {
  const { whatsAppReady, setWhatsAppReady } = useApp();

  if (!whatsAppReady.open) return null;

  const handleClose = () => {
    setWhatsAppReady({ open: false, message: '', url: '' });
  };

  const handleOpenAgain = () => {
    if (whatsAppReady.url) {
      window.open(whatsAppReady.url, '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#0e121b] border-2 border-red-500 shadow-2xl p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          aria-label="Close message"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-green-950/60 border-2 border-green-500/60 flex items-center justify-center text-green-400 shadow-lg shadow-green-900/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
            WHATSAPP ORDER PREPARED
          </h3>
        </div>

        {/* Mandatory Exact Instruction Quote */}
        <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 text-sm text-neutral-200 font-medium leading-relaxed">
          <p className="text-base text-red-400 font-bold mb-1">
            “WhatsApp is ready. Review your order and press SEND to finalize it.”
          </p>
          <p className="text-xs text-neutral-400">
            Your dynamic fight card order has been compiled and opened in WhatsApp. Make sure to press Send in WhatsApp so our team can immediately confirm and fire up the grill!
          </p>
        </div>

        {/* Preview of order message in scrollable box */}
        {whatsAppReady.message && (
          <div className="text-left bg-black/60 p-4 rounded-xl border border-white/10 text-[11px] font-mono text-neutral-300 max-h-40 overflow-y-auto whitespace-pre-wrap">
            {whatsAppReady.message}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleOpenAgain}
            className="flex-1 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bebas text-xl tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-transform active:scale-95"
          >
            <ExternalLink className="w-5 h-5" />
            <span>RE-OPEN WHATSAPP (573028305329)</span>
          </button>

          <button
            onClick={handleClose}
            className="py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bebas text-xl tracking-wider border border-white/10 transition-colors"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};
