import React from 'react';
import { restaurantConfig } from '../data/restaurantConfig';
import { buildWhatsAppLink } from '../utils/whatsapp';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  ExternalLink,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const link = buildWhatsAppLink('Hola KNOCKOUT FAST-FOOD, deseo información de sus productos y reservas.');
    window.open(link, '_blank');
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-white/10 scroll-mt-20"
    >
      {/* Target anchor for #location */}
      <span id="location" className="relative -top-24 block invisible" />

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>DIRECT FIGHTER LINE</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            CONTACT THE CORNER
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Visítanos en nuestra arena o contáctanos por WhatsApp para pedidos, domicilios y reservas.
          </p>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* WhatsApp Card */}
          <div className="p-6 rounded-3xl bg-[#11141e] border border-white/10 flex flex-col justify-between space-y-4 hover:border-green-500/50 transition-all">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-green-950/60 border border-green-500/50 flex items-center justify-center text-green-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-white">
                OFFICIAL WHATSAPP
              </h3>
              <p className="text-sm font-bold text-white">
                {restaurantConfig.whatsapp}
              </p>
              <p className="text-xs text-neutral-400">
                Línea directa para atención al cliente, pedidos inmediatos y reservas.
              </p>
            </div>
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bebas text-lg tracking-wider transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT NOW</span>
            </button>
          </div>

          {/* Location Card with Clickable Address and Google Maps Navigation */}
          <div className="p-6 rounded-3xl bg-[#11141e] border border-white/10 flex flex-col justify-between space-y-4 hover:border-red-500/50 transition-all group">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-white flex items-center gap-2">
                <span>LOCATION</span>
              </h3>

              {/* Clickable Address that opens real Google Maps */}
              <div>
                <a
                  href={restaurantConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-red-400 hover:text-red-300 underline underline-offset-4 transition-colors cursor-pointer"
                  title="Haz clic para abrir calle 40 # 4b Macarena Alta en Google Maps"
                >
                  <span>{restaurantConfig.address}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>

              <p className="text-xs text-neutral-400">
                Macarena Alta, Ibagué. Mesas disponibles, pickup y delivery a domicilio.
              </p>
            </div>

            <a
              href={restaurantConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bebas text-lg tracking-wider transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>VER EN GOOGLE MAPS</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* Opening Hours Card */}
          <div className="p-6 rounded-3xl bg-[#11141e] border border-white/10 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/50 flex items-center justify-center text-blue-400">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-white">
                OPENING HOURS
              </h3>
              <p className="text-sm font-bold text-blue-400">
                {restaurantConfig.hours}
              </p>
              <p className="text-xs text-neutral-400">
                Abierto todos los días de 4:00 PM a 12:00 AM medianoche.
              </p>
            </div>
            <span className="text-[11px] text-neutral-500 block font-semibold uppercase tracking-wider">
              FIGHT NIGHTS & DAILY COMBAT SESSIONS
            </span>
          </div>

          {/* Social Channels Card */}
          <div className="p-6 rounded-3xl bg-[#11141e] border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/20 flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-white">
                SOCIAL CORNER
              </h3>
              <div className="space-y-1 text-xs">
                <p className="text-neutral-300">
                  <strong className="text-neutral-400">Instagram:</strong>{' '}
                  <span className="text-red-400 font-semibold">{restaurantConfig.socialMedia.instagram}</span>
                </p>
                <p className="text-neutral-300">
                  <strong className="text-neutral-400">TikTok:</strong>{' '}
                  <span className="text-blue-400 font-semibold">{restaurantConfig.socialMedia.tiktok}</span>
                </p>
              </div>
            </div>
            <span className="text-[11px] text-neutral-500 block font-semibold uppercase tracking-wider">
              TAG US: #KNOCKOUTFASTFOOD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
