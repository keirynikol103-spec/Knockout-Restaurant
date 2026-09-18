import React from 'react';
import { weekendEvents } from '../data/events';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { Calendar, Clock, Ticket, MessageCircle } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const handleReservePlace = (eventName: string, day: string) => {
    const message = `🥊 FIGHT NIGHT RESERVATION 🥊\n\nHello KNOCKOUT FAST-FOOD,\nI would like to reserve a place for the "${eventName}" on ${day}!\nPlease let me know available table seating and ticket details.`;
    const link = buildWhatsAppLink(message);
    window.open(link, '_blank');
  };

  return (
    <section id="fight-events" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#07090e] border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Ticket className="w-3.5 h-3.5 text-red-500" />
            <span>SATURDAY & SUNDAY ARENA SPECIALS</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            FIGHT NIGHT WEEKENDS
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Experience the roar of live boxing broadcasted on stadium screens with ringside American fast-food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weekendEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl bg-[#0f121a] border border-white/10 hover:border-red-500/50 overflow-hidden shadow-2xl flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                      [EVENT IMAGE PLACEHOLDER]
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-600 text-white font-bebas text-lg tracking-wider shadow-lg">
                    {event.day.toUpperCase()} ARENA
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                    {event.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Date: {event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Time: {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Tickets: {event.ticketInfo}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => handleReservePlace(event.name, event.day)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider border border-red-400 shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>RESERVE YOUR PLACE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
