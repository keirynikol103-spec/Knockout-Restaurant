/**
 * KNOCKOUT – FAST-FOOD
 * "A great American fight night turned into a fast-food experience."
 * Main slogan: BIG FLAVORS. STRONGER PUNCHES!
 * Secondary message: WE COOK. WE SERVE. WE WIN.
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DisciplineSelector } from './components/DisciplineSelector';
import { MenuSection } from './components/MenuSection';
import { SauceAndToppingSection } from './components/SauceAndToppingSection';
import { PrizeWheel } from './components/PrizeWheel';
import { PromotionsSection } from './components/PromotionsSection';
import { ClassesSection } from './components/ClassesSection';
import { EventsSection } from './components/EventsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { SocialGallery } from './components/SocialGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductPunchModal } from './components/ProductPunchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppReadyModal } from './components/WhatsAppReadyModal';
import { QrExperienceModal } from './components/QrExperienceModal';

function MainAppLayout() {
  const { discipline } = useApp();

  // Dynamic discipline atmospheric class tint
  const getAtmosphereClass = () => {
    switch (discipline) {
      case 'BOXING':
        return 'selection:bg-red-600';
      case 'KARATE':
        return 'selection:bg-slate-300 selection:text-black';
      case 'KICKBOXING':
        return 'selection:bg-blue-600';
      default:
        return 'selection:bg-red-600';
    }
  };

  return (
    <div className={`min-h-screen bg-[#07090e] text-white flex flex-col ${getAtmosphereClass()}`}>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Landing with Boxing Ring & Intro */}
        <Hero />

        {/* 2. Martial Arts Mode Selector: Choose Your Fight */}
        <DisciplineSelector />

        {/* 3. Main Menu & Combat Level Selector */}
        <MenuSection />

        {/* 4. The Sauce Corner & Topping Challenge */}
        <SauceAndToppingSection />

        {/* 5. Win a Combo Interactive Prize Wheel */}
        <PrizeWheel />

        {/* 6. Promotions: Main Event */}
        <PromotionsSection />

        {/* 7. Train Like a Champion (Martial Arts Classes) */}
        <ClassesSection />

        {/* 8. Fight Night Weekends (Weekend Boxing Events) */}
        <EventsSection />

        {/* 9. The Crowd Has Spoken (Customer Reviews) */}
        <ReviewsSection />

        {/* 10. Step Into The Ring (Reservations) */}
        <ReservationSection />

        {/* 11. Knockout Social Fight (Social Gallery) */}
        <SocialGallery />

        {/* 12. The Team Behind Knockout (About Us) */}
        <AboutSection />

        {/* 13. Contact The Corner */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Always-accessible Floating WhatsApp button */}
      <FloatingWhatsApp />

      {/* Modals & Overlays */}
      <ProductPunchModal />
      <CartDrawer />
      <CheckoutModal />
      <WhatsAppReadyModal />
      <QrExperienceModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
