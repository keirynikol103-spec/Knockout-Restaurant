import React from 'react';
import { restaurantConfig } from '../data/restaurantConfig';
import { Users, Shield, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-us" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0d14] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Users className="w-3.5 h-3.5 text-red-500" />
            <span>FOUNDERS & CORNER TEAM</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            THE TEAM BEHIND KNOCKOUT
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl mx-auto">
            The passionate team behind the brand, uniting authentic American fast food with championship fight-night entertainment and martial arts spirit.
          </p>
        </div>

        {/* Owners Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {restaurantConfig.owners.map((ownerName) => (
            <div
              key={ownerName}
              className="p-8 rounded-3xl bg-[#10131e] border border-white/10 hover:border-red-500/40 text-center space-y-4 shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-red-600 to-blue-700 p-0.5 shadow-lg shadow-red-900/30 flex items-center justify-center">
                <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center text-white">
                  <Award className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div>
                <h3 className="font-bebas text-3xl tracking-wider text-white">
                  {ownerName}
                </h3>
                <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase block mt-0.5">
                  BRAND OWNER & FOUNDING TEAM
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs text-neutral-400">
                <span className="font-medium text-neutral-300">KNOCKOUT FAST-FOOD</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mission Philosophy Card */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-neutral-900/50 border border-white/10 text-center space-y-4">
          <p className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
            «“A great American fight night turned into a fast-food experience.”»
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
            <span>🥊 BOXING</span>
            <span>•</span>
            <span>🥋 KARATE</span>
            <span>•</span>
            <span>🔥 KICKBOXING</span>
            <span>•</span>
            <span>🍔 AMERICAN FAST FOOD</span>
          </div>
          <div className="text-sm font-black text-red-400 tracking-[0.2em] uppercase">
            WE COOK. WE SERVE. WE WIN.
          </div>
        </div>
      </div>
    </section>
  );
};
