import { SauceItem } from '../types';

export const sauces: SauceItem[] = [
  {
    id: "sauce-knockout-secret",
    name: "KNOCKOUT Championship Secret Sauce",
    price: 3000,
    description: "Our proprietary arena blend of smoked paprika, roasted garlic aioli, sweet relish, and subtle cayenne kick.",
    spiceLevel: 1,
    allergens: ["Eggs", "Mustard"],
    available: true
  },
  {
    id: "sauce-roundhouse-fire",
    name: "Roundhouse Habanero Fire Glaze",
    price: 3500,
    description: "Intense kickboxing heat powered by fire-roasted red habaneros, wildflower honey, and apple cider vinegar.",
    spiceLevel: 3,
    allergens: [],
    available: true
  },
  {
    id: "sauce-bourbon-smoky-bbq",
    name: "Smoky Arena Bourbon BBQ",
    price: 3000,
    description: "Deep, slow-simmered Kentucky bourbon BBQ sauce with molasses and hickory wood smoke.",
    spiceLevel: 0,
    allergens: [],
    available: true
  },
  {
    id: "sauce-dojo-sweet-teriyaki",
    name: "Dojo Sesame Teriyaki",
    price: 3000,
    description: "Reduced gluten-free tamari, toasted sesame oil, ginger root, and Japanese mirin sweetness.",
    spiceLevel: 0,
    allergens: ["Soy", "Sesame"],
    available: true
  },
  {
    id: "sauce-ringside-ranch",
    name: "Ringside Buttermilk Garlic Ranch",
    price: 3000,
    description: "Creamy cultured buttermilk folded with cracked peppercorn, fresh dill, and roasted garlic cloves.",
    spiceLevel: 0,
    allergens: ["Milk", "Eggs"],
    available: true
  },
  {
    id: "sauce-blue-corner-cheese",
    name: "Blue Corner Gorgonzola Dip",
    price: 3500,
    description: "Chunky aged Gorgonzola cheese fold with sour cream, cooling down fiery wings instantly.",
    spiceLevel: 0,
    allergens: ["Milk"],
    available: true
  }
];
