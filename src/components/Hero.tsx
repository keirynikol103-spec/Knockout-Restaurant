import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { discipline, setDiscipline } = useApp();
  const [introStep, setIntroStep] = useState<number>(0);
  const [introSkipped, setIntroSkipped] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already visited or prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('ko_intro_seen');

    if (prefersReducedMotion || hasSeenIntro) {
      setIntroStep(5);
      setIntroSkipped(true);
      return;
    }

    // Sequence timer: 1. Arena lights (400ms) -> 2. Crowd/Ropes (900ms) -> 3. Logo (1500ms) -> 4. Slogan & Full (2100ms)
    const t1 = setTimeout(() => setIntroStep(1), 350);
    const t2 = setTimeout(() => setIntroStep(2), 850);
    const t3 = setTimeout(() => setIntroStep(3), 1400);
    const t4 = setTimeout(() => {
      setIntroStep(4);
      sessionStorage.setItem('ko_intro_seen', 'true');
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleSkipIntro = () => {
    setIntroStep(4);
    setIntroSkipped(true);
    sessionStorage.setItem('ko_intro_seen', 'true');
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#07090e]">
      {/* SKIP INTRO Button (Visible while intro is playing) */}
      {!introSkipped && introStep < 4 && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full bg-black/80 hover:bg-neutral-800 text-xs font-bold tracking-widest text-neutral-300 hover:text-white border border-white/20 transition-all backdrop-blur"
          aria-label="Skip entrance animation"
        >
          SKIP INTRO ⏩
        </button>
      )}

      {/* Atmospheric Arena Lights Beam Layer */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          introStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Arena Red Beam */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[700px] bg-red-600/15 blur-[120px] rounded-full transform -rotate-12 pointer-events-none" />
        {/* Right Arena Blue Beam */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[700px] bg-blue-600/15 blur-[120px] rounded-full transform rotate-12 pointer-events-none" />
        {/* Overhead Center Arena Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-white/10 via-red-500/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Crowd Silhouettes Graphic Background */}
      <div
        className={`absolute bottom-0 inset-x-0 h-48 pointer-events-none bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent z-10 transition-opacity duration-1000 ${
          introStep >= 2 ? 'opacity-90' : 'opacity-0'
        }`}
      >
        {/* Silhouetted Crowd Shapes */}
        <div className="absolute bottom-0 inset-x-0 h-28 opacity-25 flex justify-around items-end overflow-hidden px-4">
          <div className="w-12 h-20 bg-neutral-800 rounded-t-full" />
          <div className="w-14 h-24 bg-neutral-800 rounded-t-full" />
          <div className="w-10 h-16 bg-neutral-800 rounded-t-full" />
          <div className="w-16 h-28 bg-neutral-800 rounded-t-full" />
          <div className="w-12 h-22 bg-neutral-800 rounded-t-full" />
          <div className="w-14 h-20 bg-neutral-800 rounded-t-full" />
          <div className="w-10 h-14 bg-neutral-800 rounded-t-full" />
          <div className="w-16 h-26 bg-neutral-800 rounded-t-full" />
        </div>
      </div>

      {/* Realistic Boxing Ring Graphical Frame */}
      <div
        className={`absolute inset-x-4 sm:inset-x-12 top-10 bottom-16 pointer-events-none border border-white/5 rounded-3xl overflow-hidden transition-all duration-1000 ${
          introStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Ring Corner Turnbuckles */}
        <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-red-600 border-2 border-white/40 shadow-lg shadow-red-600/50" />
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 border-2 border-white/40 shadow-lg shadow-blue-600/50" />
        <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-neutral-400 border-2 border-white/40" />
        <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-neutral-400 border-2 border-white/40" />

        {/* 4 Ring Ropes (Top Red, Middle White, Bottom Blue) */}
        <div className="absolute top-16 inset-x-8 h-[2px] bg-red-600/60 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        <div className="absolute top-28 inset-x-8 h-[2px] bg-white/40" />
        <div className="absolute bottom-28 inset-x-8 h-[2px] bg-blue-600/60 shadow-[0_0_8px_rgba(37,99,235,0.5)]" />
        <div className="absolute bottom-16 inset-x-8 h-[2px] bg-white/40" />

        {/* Canvas Mat Texture Subtle Grid */}
        <div className="absolute inset-0 fight-mesh opacity-40" />
      </div>

      {/* Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center py-12 flex flex-col items-center">
        {/* Belt / Match Headline Eyebrow */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/40 text-red-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-lg shadow-red-900/30 transition-all duration-700 ${
            introStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <Sparkles className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>AMERICAN FIGHT NIGHT × FAST FOOD EXPERIENCE</span>
          <span className="text-red-500 font-black">★</span>
        </div>

        {/* KNOCKOUT Logo Heading */}
        <div
          className={`transition-all duration-700 ${
            introStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-wider text-white leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            KNOCKOUT
          </h1>
          <div className="text-xl sm:text-3xl font-black tracking-[0.35em] text-red-500 uppercase -mt-2 sm:-mt-4">
            FAST-FOOD
          </div>
        </div>

        {/* Main Slogan & Secondary Message */}
        <div
          className={`mt-6 space-y-3 max-w-2xl transition-all duration-700 delay-100 ${
            introStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-bebas text-3xl sm:text-5xl tracking-wide text-neutral-100 uppercase text-glow-red">
            BIG FLAVORS. STRONGER PUNCHES!
          </p>
          <p className="text-sm sm:text-base text-neutral-300 font-medium tracking-wide">
            «“A great American fight night turned into a fast-food experience.”»
          </p>
          <div className="inline-block px-4 py-1 rounded bg-neutral-900/80 border border-white/10 text-xs sm:text-sm font-black tracking-[0.25em] text-neutral-400 uppercase">
            WE COOK. WE SERVE. WE WIN.
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-200 ${
            introStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => scrollToSection('#menu')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-red-600/30 border border-red-400 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group"
          >
            <span>ENTER THE FIGHT & ORDER</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('#reservations')}
            className="px-7 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-bebas text-2xl tracking-wider border border-white/20 hover:border-white/40 transition-all hover:scale-105 active:scale-95"
          >
            STEP INTO THE RING (RESERVE)
          </button>
        </div>

        {/* Quick Discipline Badge in Hero */}
        <div
          className={`mt-8 pt-6 border-t border-white/10 w-full max-w-md flex items-center justify-center gap-6 text-xs text-neutral-400 transition-all duration-700 delay-300 ${
            introStep >= 4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-semibold text-neutral-300">FEATURING:</span>
          <span className="flex items-center gap-1.5 hover:text-red-400 transition-colors cursor-pointer" onClick={() => setDiscipline('BOXING')}>
            🥊 BOXING
          </span>
          <span className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors cursor-pointer" onClick={() => setDiscipline('KARATE')}>
            🥋 KARATE
          </span>
          <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer" onClick={() => setDiscipline('KICKBOXING')}>
            🔥 KICKBOXING
          </span>
        </div>
      </div>
    </section>
  );
};
