import { PromotionItem } from '../types';

// Centralized promotions data.
// In accordance with instructions: If no promotions are configured, the UI will display "[NO PROMOTIONS CONFIGURED]".
export const promotions: PromotionItem[] = [
  {
    id: "promo-fight-night-clash",
    name: "Fight Night Clash: 2 Burgers + Loaded Fries",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    description: "Two KNOCKOUT Championship Burgers served with a mountain of Sparring Loaded Fries and two Arena Draft Sodas for the ultimate ringside duo.",
    price: 68000,
    discount: 14000,
    validityPeriod: "Every Saturday & Sunday Fight Night",
    terms: "[PROMOTION TERMS TO BE ADDED]",
    available: true
  },
  {
    id: "promo-tko-tuesday",
    name: "TKO Wing & Popper Challenge",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    description: "16 Roundhouse Spicy Poppers + 4 Artisanal Knockout Sauces + 2 Ice-Cold Drinks.",
    price: 45000,
    discount: 9000,
    validityPeriod: "Limited Fight Card Days",
    terms: "[PROMOTION TERMS TO BE ADDED]",
    available: true
  }
];
