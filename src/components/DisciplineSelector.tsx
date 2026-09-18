import React from 'react';
import { useApp } from '../context/AppContext';
import { Discipline } from '../types';
import { Sparkles } from 'lucide-react';

export const DisciplineSelector: React.FC = () => {
  const { discipline, setDiscipline } = useApp();

  const disciplines: {
    id: Discipline;
    title: string;
    icon: string;
    tagline: string;
    palette: string;
    recommended: string[];
    bgActive: string;
    borderActive: string;
  }[] = [
    {
      id: 'BOXING',
      title: 'BOXING',
      icon: '🥊',
      tagline: 'Heavyweight Impact & Ringside Classics',
      palette: 'Red + Charcoal + White',
      recommended: ['Angus Burgers', 'Loaded Fries', 'Nachos', 'Championship Combos'],
      bgActive: 'bg-red-950/40 border-red-500 shadow-red-900/30',
      borderActive: 'border-red-500 text-red-400'
    },
    {
      id: 'KARATE',
      title: 'KARATE',
      icon: '🥋',
      tagline: 'Precision Technique & Dojo Nutrition',
      palette: 'White + Charcoal + Red Accents',
      recommended: ['Lean Chicken', 'Protein Shakes', 'Teriyaki Plates', 'Clean Sodas'],
      bgActive: 'bg-slate-900/70 border-slate-300 shadow-slate-800/30',
      borderActive: 'border-slate-200 text-slate-100'
    },
    {
      id: 'KICKBOXING',
      title: 'KICKBOXING',
      icon: '🔥',
      tagline: 'High Octane Strikes & Intense Heat',
      palette: 'Athletic Blue + Red + Black',
      recommended: ['Spicy Poppers', 'Nashville Chicken', 'Blue Lemonade', 'Loaded Nachos'],
      bgActive: 'bg-blue-950/40 border-blue-500 shadow-blue-900/30',
      borderActive: 'border-blue-500 text-blue-400'
    }
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-[#0a0c12]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>INTERACTIVE ATMOSPHERE</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white">
            CHOOSE YOUR FIGHT
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mt-1">
            Select your combat discipline to dynamically tune the arena lighting, accent colors, and recommended chef selections.
          </p>
        </div>

        {/* 3 Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {disciplines.map((item) => {
            const isSelected = discipline === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setDiscipline(item.id)}
                className={`relative p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? `${item.bgActive} border-2 shadow-2xl scale-[1.02]`
                    : 'bg-neutral-900/60 border-white/10 hover:border-white/25 hover:bg-neutral-900'
                }`}
                aria-pressed={isSelected}
              >
                {/* Active Glow Accent Indicator */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl filter drop-shadow-md">{item.icon}</span>
                    <span
                      className={`text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                        isSelected
                          ? item.borderActive
                          : 'border-white/10 text-neutral-400'
                      }`}
                    >
                      {isSelected ? 'ACTIVE MODE' : 'SELECT'}
                    </span>
                  </div>

                  <h3 className="font-bebas text-3xl tracking-wider text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium mt-1">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase block mb-1.5">
                    Recommended Disciplines:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recommended.map((food, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
