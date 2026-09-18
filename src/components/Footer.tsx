import React from 'react';
import { restaurantConfig } from '../data/restaurantConfig';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080d] border-t border-white/10 text-neutral-400 text-xs">
      {/* Top Banner Stripe */}
      <div className="bg-gradient-to-r from-red-600 via-neutral-900 to-blue-700 h-1.5 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Slogans */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-xl text-white shadow-md">
                🥊
              </div>
              <span className="font-bebas text-3xl tracking-wider text-white">
                KNOCKOUT
              </span>
            </div>
            <p className="font-bebas text-xl text-neutral-200 tracking-wide">
              {restaurantConfig.slogan}
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed">
              «“A great American fight night turned into a fast-food experience.”»
            </p>
            <div className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
              {restaurantConfig.secondaryMessage}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bebas text-xl tracking-wider text-white">
              ARENA NAVIGATION
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'HOME', href: '#home' },
                { label: 'MENU', href: '#menu' },
                { label: 'PROMOTIONS', href: '#promotions' },
                { label: 'MARTIAL ARTS', href: '#martial-arts' },
                { label: 'FIGHT EVENTS', href: '#fight-events' },
                { label: 'ABOUT US', href: '#about-us' },
                { label: 'REVIEWS', href: '#reviews' },
                { label: 'CONTACT', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="hover:text-white transition-colors text-xs font-semibold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Owners & Management */}
          <div className="space-y-3">
            <h4 className="font-bebas text-xl tracking-wider text-white">
              FOUNDING TEAM
            </h4>
            <ul className="space-y-2 text-xs">
              {restaurantConfig.owners.map((owner) => (
                <li key={owner} className="flex items-center gap-2 text-neutral-300 font-medium">
                  <span className="text-red-500 text-sm">★</span>
                  <span>{owner}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-neutral-400">
              <span className="font-bold text-white block">WhatsApp Orders:</span>
              <span className="text-red-400 font-bold">{restaurantConfig.whatsapp}</span>
            </div>
          </div>

          {/* Col 4: Location, Hours & Social */}
          <div className="space-y-3">
            <h4 className="font-bebas text-xl tracking-wider text-white">
              ARENA DETAILS
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-white block">Address:</span>
                <a
                  href={restaurantConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline underline-offset-2 inline-flex items-center gap-1 transition-colors"
                  title="Ver en Google Maps"
                >
                  <span>{restaurantConfig.address}</span>
                  <span className="text-[10px] opacity-70">↗</span>
                </a>
              </div>
              <div>
                <span className="font-bold text-white block">Hours:</span>
                <span>{restaurantConfig.hours}</span>
              </div>
              <div>
                <span className="font-bold text-white block">Social Media:</span>
                <p className="text-neutral-400">
                  IG: <span className="text-red-400 font-medium">{restaurantConfig.socialMedia.instagram}</span>
                </p>
                <p className="text-neutral-400">
                  TikTok: <span className="text-blue-400 font-medium">{restaurantConfig.socialMedia.tiktok}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} KNOCKOUT – FAST-FOOD. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🥊 BOXING</span>
            <span>🥋 KARATE</span>
            <span>🔥 KICKBOXING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
