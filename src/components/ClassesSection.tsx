import React from 'react';
import { martialArtsClasses } from '../data/classes';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { Dumbbell, Clock, Calendar, User, MessageCircle } from 'lucide-react';

export const ClassesSection: React.FC = () => {
  const handleInquireClass = (className: string) => {
    const message = `🥊 HELLO KNOCKOUT FAST-FOOD 🥊\n\nI would like information about martial arts classes: "${className}". Please let me know current availability, schedules, and details!`;
    const link = buildWhatsAppLink(message);
    window.open(link, '_blank');
  };

  return (
    <section id="martial-arts" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0c12] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Dumbbell className="w-3.5 h-3.5 text-blue-400" />
            <span>DISCIPLINE & CONDITIONING</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            TRAIN LIKE A CHAMPION
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Conditioning, striking drills, and fight fundamentals paired with high-protein nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {martialArtsClasses.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#10131d] border border-white/10 hover:border-blue-500/50 overflow-hidden flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-neutral-900 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                      [CLASS IMAGE PLACEHOLDER]
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-black tracking-widest text-white uppercase">
                    {item.discipline}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-neutral-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Duration: <strong className="text-white font-medium">{item.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Schedule: <strong className="text-white font-medium">{item.schedule}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Instructor: <strong className="text-white font-medium">{item.instructor}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleInquireClass(item.name)}
                  className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bebas text-xl tracking-wider border border-blue-500 shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>ASK ABOUT CLASSES</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
