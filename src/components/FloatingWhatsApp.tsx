import React from 'react';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    const message = 'Hello KNOCKOUT FAST-FOOD, I would like some information.';
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank');
  };

  return (
    <button
      id="floating-whatsapp-btn"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-green-950/60 border-2 border-white/30 transform hover:scale-105 active:scale-95 transition-all focus:outline-none"
      aria-label="Contact restaurant on WhatsApp"
      title="Chat with KNOCKOUT FAST-FOOD on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="font-bebas text-lg tracking-wider hidden sm:inline">
        CHAT ON WHATSAPP
      </span>
    </button>
  );
};
