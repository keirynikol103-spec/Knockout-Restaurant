import { ToppingItem } from '../types';

export const toppings: ToppingItem[] = [
  {
    id: "topping-smoked-bacon-crush",
    name: "Applewood Smoked Bacon Dust",
    price: 3500,
    description: "Thick-cut bacon slowly crisped and crushed into savory crunch sprinkles.",
    allergens: [],
    available: true
  },
  {
    id: "topping-crispy-fried-onions",
    name: "Golden Onion Haystack",
    price: 2500,
    description: "Flash-fried thin onion ribbons with light sea salt crunch.",
    allergens: ["Gluten"],
    available: true
  },
  {
    id: "topping-pickled-jalapenos",
    name: "Fiery Pickled Jalapeño Rings",
    price: 2000,
    description: "Crisp brine-pickled green jalapeño peppers for an instant acidic spark.",
    allergens: [],
    available: true
  },
  {
    id: "topping-melted-cheddar-lava",
    name: "Melted Aged Cheddar Lava",
    price: 4000,
    description: "Warm, velvety sharp Wisconsin cheddar poured generously.",
    allergens: ["Milk"],
    available: true
  },
  {
    id: "topping-avocado-fan",
    name: "Fresh Sliced Hass Avocado",
    price: 4500,
    description: "Creamy, ripe Hass avocado fans with lime sea salt seasoning.",
    allergens: [],
    available: true
  },
  {
    id: "topping-sauteed-mushrooms",
    name: "Garlic Butter Sautéed Mushrooms",
    price: 3500,
    description: "Brown button mushrooms pan-seared in fresh garlic, thyme, and unsalted butter.",
    allergens: ["Milk"],
    available: true
  }
];
