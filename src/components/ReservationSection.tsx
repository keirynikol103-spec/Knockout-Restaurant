import React, { useState } from 'react';
import { generateReservationWhatsAppMessage, buildWhatsAppLink } from '../utils/whatsapp';
import { Calendar, Clock, Users, Phone, User, MessageCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReservationSection: React.FC = () => {
  const { setWhatsAppReady } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState<number>(2);
  const [observations, setObservations] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!(name || '').trim()) {
      setError('Please enter your full name for the reservation.');
      return;
    }
    if (!(phone || '').trim()) {
      setError('Please enter your contact phone number.');
      return;
    }
    if (!date) {
      setError('Please select a reservation date.');
      return;
    }
    if (!time) {
      setError('Please select a reservation time.');
      return;
    }
    if (!people || people < 1) {
      setError('Number of people must be at least 1.');
      return;
    }

    const message = generateReservationWhatsAppMessage({
      name,
      phone,
      date,
      time,
      people,
      observations
    });

    const url = buildWhatsAppLink(message);

    // Show WhatsApp ready confirmation modal per guidelines
    setWhatsAppReady({
      open: true,
      message,
      url
    });

    window.open(url, '_blank');
  };

  return (
    <section id="reservations" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0d14] border-b border-white/10 relative overflow-hidden">
      {/* Visual Arena Flare */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>TABLE & BOOTH BOOKINGS</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wide text-white">
            STEP INTO THE RING
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Reserve your front-row table for fight nights, friend sparring sessions, and championship celebrations.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-[#10141e] border border-white/15 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500 text-red-200 text-xs font-bold animate-in fade-in">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleReserve} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="res-name" className="text-xs font-bold text-neutral-300 uppercase block mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="res-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="res-phone" className="text-xs font-bold text-neutral-300 uppercase block mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="res-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 3028305329"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="res-date" className="text-xs font-bold text-neutral-300 uppercase block mb-1.5">
                  Reservation Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="res-date"
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="res-time" className="text-xs font-bold text-neutral-300 uppercase block mb-1.5">
                  Time *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="res-time"
                    type="time"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="res-people" className="text-xs font-bold text-neutral-300 uppercase block mb-1.5">
                Number of People *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="res-people"
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={people}
                  onChange={e => setPeople(parseInt(e.target.value) || 1)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="res-obs" className="text-xs font-bold text-neutral-300 uppercase block mb-1.5">
                Special Requests / Observations
              </label>
              <textarea
                id="res-obs"
                rows={3}
                value={observations}
                onChange={e => setObservations(e.target.value)}
                placeholder="e.g. Ringside screen view, birthday celebration, quiet booth..."
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-red-500 focus:outline-none"
              />
              <span className="text-[11px] text-neutral-500 block mt-1">
                Requests are subject to availability and restaurant confirmation.
              </span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-red-600/30 border border-red-400 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <MessageCircle className="w-6 h-6" />
                <span>RESERVE VIA WHATSAPP</span>
              </button>
              <p className="text-[11px] text-neutral-400 text-center mt-2">
                Sends a formatted reservation request directly to our official WhatsApp (573028305329).
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
