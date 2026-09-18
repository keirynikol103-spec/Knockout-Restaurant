import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Discipline } from '../types';

export const Navbar: React.FC = () => {
  const {
    discipline,
    setDiscipline,
    soundMuted,
    toggleSound,
    cartCount,
    setCartOpen,
    setQrModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'MENU', href: '#menu' },
    { label: 'PROMOTIONS', href: '#promotions' },
    { label: 'MARTIAL ARTS', href: '#martial-arts' },
    { label: 'FIGHT EVENTS', href: '#fight-events' },
    { label: 'ABOUT US', href: '#about-us' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const disciplineConfigs: { id: Discipline; label: string; icon: string; activeColor: string }[] = [
    { id: 'BOXING', label: 'BOXING', icon: '🥊', activeColor: 'bg-red-600 border-red-500 text-white' },
    { id: 'KARATE', label: 'KARATE', icon: '🥋', activeColor: 'bg-slate-100 border-white text-black' },
    { id: 'KICKBOXING', label: 'KICKBOXING', icon: '🔥', activeColor: 'bg-blue-600 border-blue-500 text-white' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090b10]/95 backdrop-blur-md">
      {/* Top Banner Alert / Table Notice */}
      <div className="bg-gradient-to-r from-red-700 via-neutral-900 to-blue-800 text-[11px] font-semibold tracking-wider text-center py-1 text-white/90 px-4 flex items-center justify-center gap-3">
        <span>🥊 AMERICAN FIGHT NIGHT FAST FOOD</span>
        <span className="opacity-50">|</span>
        <span className="hidden sm:inline">BIG FLAVORS. STRONGER PUNCHES!</span>
        <span className="opacity-50 hidden sm:inline">|</span>
        <span className="text-red-300">WHATSAPP: 3028305329</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#home"
          id="nav-logo"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 border border-red-500 transform group-hover:scale-105 transition-transform">
            <span className="text-2xl" role="img" aria-label="Boxing Glove">🥊</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bebas text-3xl sm:text-4xl tracking-wider leading-none text-white flex items-center gap-1.5">
              KNOCKOUT
              <span className="text-red-500 font-bebas text-2xl">★</span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-neutral-400 font-bold uppercase -mt-1">
              FAST-FOOD
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-xs font-bold tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls: Discipline Switcher, Sound, Cart, Order */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Discipline Switcher Pills (Desktop/Tablet) */}
          <div className="hidden md:flex items-center bg-black/60 p-1 rounded-full border border-white/10" title="Select martial arts style">
            {disciplineConfigs.map((disc) => {
              const active = discipline === disc.id;
              return (
                <button
                  key={disc.id}
                  onClick={() => setDiscipline(disc.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full transition-all border ${
                    active ? disc.activeColor : 'text-neutral-400 hover:text-white border-transparent'
                  }`}
                  aria-pressed={active}
                >
                  <span>{disc.icon}</span>
                  <span className="text-[10px] tracking-wider">{disc.label}</span>
                </button>
              );
            })}
          </div>

          {/* QR Table Code Button */}
          <button
            id="nav-qr-button"
            onClick={() => setQrModalOpen(true)}
            className="p-2.5 rounded-lg bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-white/10 transition-colors"
            title="Scan Table QR Code"
            aria-label="Scan Table QR Code"
          >
            <QrCode className="w-5 h-5" />
          </button>

          {/* Sound Toggle (OFF by default) */}
          <button
            id="nav-sound-toggle"
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
              soundMuted
                ? 'bg-neutral-900 text-neutral-400 border-white/10 hover:text-white'
                : 'bg-red-600/20 text-red-400 border-red-500/50 hover:bg-red-600/30'
            }`}
            title={soundMuted ? 'Sound is currently OFF. Click to turn ON.' : 'Sound is ON. Click to mute.'}
            aria-label={soundMuted ? 'Sound OFF' : 'Sound ON'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400 animate-pulse" />}
            <span className="hidden sm:inline">{soundMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          {/* Cart Trigger */}
          <button
            id="nav-cart-button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white transition-all hover:scale-105 active:scale-95"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 text-red-500" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-red-600 text-white text-[11px] font-black flex items-center justify-center border-2 border-[#090b10] shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button: ORDER NOW */}
          <button
            id="nav-order-button"
            onClick={() => handleNavClick('#menu')}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-lg tracking-wider border border-red-400 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            ORDER NOW
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2.5 rounded-lg bg-neutral-900 text-white border border-white/10 hover:bg-neutral-800 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0c0e14] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          {/* Mobile Discipline Switcher */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
              Discipline Atmosphere:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {disciplineConfigs.map((disc) => {
                const active = discipline === disc.id;
                return (
                  <button
                    key={disc.id}
                    onClick={() => {
                      setDiscipline(disc.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-lg border transition-all ${
                      active ? disc.activeColor : 'bg-neutral-900 border-white/10 text-neutral-300'
                    }`}
                  >
                    <span>{disc.icon}</span>
                    <span>{disc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <nav className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-2.5 rounded-md bg-neutral-900/60 hover:bg-neutral-800 text-xs font-bold tracking-wider text-neutral-200 border border-white/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Mobile Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleNavClick('#menu')}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bebas text-lg tracking-wider rounded-lg shadow-md border border-red-400 text-center"
            >
              ORDER NOW
            </button>
            <button
              onClick={() => handleNavClick('#reservations')}
              className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white font-bebas text-lg tracking-wider rounded-lg border border-blue-500 text-center"
            >
              RESERVE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
