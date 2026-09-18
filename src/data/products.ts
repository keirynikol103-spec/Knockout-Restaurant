import { Product } from '../types';
import onionRingsImage from '../assets/images/crispy_onion_rings_1789758087480.jpg';

export const products: Product[] = [
  // ================= ENTRADAS =================
  {
    id: "ko-nachos-heavyweight",
    name: "Heavyweight Nachos Supreme",
    category: "ENTRADAS",
    level: "CHAMPION",
    price: 28000,
    description: "Crispy artisan tortilla chips loaded with melted cheddar, shredded slow-cooked beef, pico de gallo, guacamole, jalapeños, and knockout sour cream.",
    ingredients: ["Corn Tortilla Chips", "Aged Cheddar", "Pulled Beef", "Guacamole", "Pico de Gallo", "Jalapeños", "Sour Cream"],
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
    calories: 820,
    spiceLevel: 2,
    allergens: ["Milk", "Gluten"],
    available: true,
    extras: [
      { id: "ext-nacho-cheese", name: "Extra Melted Cheddar", price: 4500 },
      { id: "ext-guacamole", name: "Double Guacamole Scoop", price: 5000 },
      { id: "ext-jalapenos", name: "Fire Pickled Jalapeños", price: 3000 }
    ],
    toppings: [
      { id: "top-bacon-bits", name: "Smoked Bacon Crumbles", price: 4000 },
      { id: "top-chipotle-drizzle", name: "Chipotle Cream Drizzle", price: 2500 }
    ],
    story: "Engineered for ringside sharing before the main card kicks off. Heavyweight crunch with punchy layers.",
    discipline: ["BOXING", "KICKBOXING"],
    recommended: true
  },
  {
    id: "ko-loaded-fries-sparring",
    name: "Sparring Loaded Fries",
    category: "ENTRADAS",
    level: "FIGHTER",
    price: 22000,
    description: "Golden rustic skin-on french fries showered with melted Monterey Jack, smoked bacon dust, and signature knockout athletic bbq.",
    ingredients: ["Rustic Russet Potatoes", "Smoked Bacon", "Monterey Jack", "Chives", "Knockout BBQ"],
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80",
    calories: 640,
    spiceLevel: 1,
    allergens: ["Milk"],
    available: true,
    extras: [
      { id: "ext-bacon", name: "Double Crispy Bacon", price: 4500 },
      { id: "ext-cheese-sauce", name: "Extra Cheese Lava", price: 4000 }
    ],
    toppings: [
      { id: "top-spring-onions", name: "Fresh Chives & Scallions", price: 1500 },
      { id: "top-crispy-onions", name: "Golden Crispy Onions", price: 2500 }
    ],
    story: "The warmup round: packed with crisp texture to keep your stamina ready for round two.",
    discipline: ["BOXING", "KICKBOXING"],
    recommended: true
  },
  {
    id: "ko-dojo-edamame-bites",
    name: "Dojo Crisp Onion Rings",
    category: "ENTRADAS",
    level: "ROOKIE",
    price: 16000,
    description: "Thick-cut sweet white onions beer-battered to a light, clean crunch served with sweet chili karate dip.",
    ingredients: ["Sweet Onions", "Golden Batter", "Sweet Chili Sesame Sauce", "Sea Salt"],
    image: onionRingsImage,
    calories: 410,
    spiceLevel: 0,
    allergens: ["Gluten"],
    available: true,
    extras: [
      { id: "ext-sweet-chili", name: "Extra Karate Sweet Chili", price: 2500 }
    ],
    toppings: [
      { id: "top-sesame-seeds", name: "Toasted Black Sesame", price: 1000 }
    ],
    story: "Clean, precise crunch balanced with harmonious sweetness inspired by classic dojo discipline.",
    discipline: ["KARATE"]
  },
  {
    id: "ko-spicy-strips-kick",
    name: "Roundhouse Chicken Poppers",
    category: "ENTRADAS",
    level: "FIGHTER",
    price: 24000,
    description: "100% chicken breast poppers double-dusted in cayenne-paprika batter with intense kickboxing dipping glaze.",
    ingredients: ["Chicken Breast", "Paprika Pepper Crust", "House Kick Sauce", "Celery Sticks"],
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    calories: 580,
    spiceLevel: 3,
    allergens: ["Gluten", "Eggs"],
    available: true,
    extras: [
      { id: "ext-blue-cheese", name: "Cooling Blue Cheese Dip", price: 3500 },
      { id: "ext-fire-sauce", name: "Triple Hot Kick Sauce", price: 3000 }
    ],
    toppings: [
      { id: "top-crushed-peanuts", name: "Crushed Chili Peanuts", price: 2000 }
    ],
    story: "Fast impact and fiery delivery like a spinning kick landing right on target.",
    discipline: ["KICKBOXING"]
  },

  // ================= PLATOS PRINCIPALES =================
  {
    id: "ko-burger-the-knockout",
    name: "The KNOCKOUT Championship Burger",
    category: "PLATOS PRINCIPALES",
    level: "CHAMPION",
    price: 36000,
    description: "Double 150g certified Angus beef patties, double smoked cheddar, caramelized onions, crisp iceberg lettuce, thick-cut bacon, and championship secret knockout sauce on toasted brioche.",
    ingredients: ["Certified Angus Beef (300g)", "Aged Cheddar", "Smoked Applewood Bacon", "Caramelized Onions", "Artisan Brioche Bun", "KO Secret Sauce"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    calories: 960,
    spiceLevel: 1,
    allergens: ["Gluten", "Milk", "Eggs"],
    available: true,
    extras: [
      { id: "ext-extra-patty", name: "Extra 150g Angus Beef Patty", price: 9000 },
      { id: "ext-extra-bacon", name: "Double Smoked Bacon", price: 4500 },
      { id: "ext-fried-egg", name: "Runny Fried Egg", price: 3000 }
    ],
    toppings: [
      { id: "top-pickles", name: "Dill Pickle Chips", price: 1500 },
      { id: "top-grilled-mushrooms", name: "Sautéed Herb Mushrooms", price: 3500 }
    ],
    story: "Our undisputed headline belt. Two heavyweight beef patties striking with savory intensity.",
    discipline: ["BOXING"],
    recommended: true
  },
  {
    id: "ko-burger-undisputed-legend",
    name: "The Undisputed Titan Burger",
    category: "PLATOS PRINCIPALES",
    level: "LEGEND",
    price: 48000,
    description: "Triple 150g Angus beef (450g total), pulled BBQ brisket, melted provolone, crispy onion strings, glazed bacon, and arena smoked aioli.",
    ingredients: ["Triple Angus Patties (450g)", "Pulled BBQ Brisket", "Provolone", "Crispy Onions", "Glazed Bacon", "Smoked Aioli", "Brioche Bun"],
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    calories: 1420,
    spiceLevel: 1,
    allergens: ["Gluten", "Milk", "Eggs"],
    available: true,
    extras: [
      { id: "ext-onion-rings-inside", name: "Stuffed Onion Ring Crown", price: 4000 },
      { id: "ext-triple-cheese", name: "Triple Melted Cheese Blend", price: 6000 }
    ],
    toppings: [
      { id: "top-bbq-drizzle", name: "Extra Smoky Bourbon BBQ", price: 2000 }
    ],
    story: "Built exclusively for the all-time legends who walk out to roaring arenas.",
    discipline: ["BOXING"],
    recommended: true
  },
  {
    id: "ko-burger-rookie-classic",
    name: "Rookie Smash Burger",
    category: "PLATOS PRINCIPALES",
    level: "ROOKIE",
    price: 24000,
    description: "Single 120g smashed Angus patty with crispy lace edges, American cheese, sweet pickles, diced onions, and classic house relish.",
    ingredients: ["Smashed Angus Beef (120g)", "American Cheese", "Dill Pickles", "Diced White Onions", "Brioche Bun", "Classic Mustard-Relish"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    calories: 590,
    spiceLevel: 0,
    allergens: ["Gluten", "Milk", "Eggs"],
    available: true,
    extras: [
      { id: "ext-extra-patty-rookie", name: "Add Second Patty", price: 7000 },
      { id: "ext-bacon-rookie", name: "Add Crispy Bacon", price: 4000 }
    ],
    toppings: [
      { id: "top-tomato-slice", name: "Fresh Vine Tomato Slices", price: 1500 }
    ],
    story: "Pure fundamentals done right: perfect crust, melted cheese, and clean execution.",
    discipline: ["BOXING"]
  },
  {
    id: "ko-chicken-roundhouse-spicy",
    name: "Roundhouse Hot Chicken Sandwich",
    category: "PLATOS PRINCIPALES",
    level: "FIGHTER",
    price: 31000,
    description: "Jumbo crispy chicken breast dunked in kickboxing Nashville spicy oil, topped with creamy cider slaw, quick-pickles, and spicy habanero mayo on toasted brioche.",
    ingredients: ["Crispy Buttermilk Chicken Breast", "Nashville Hot Pepper Oil", "Cider Slaw", "Pickles", "Habanero Mayo", "Brioche"],
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    calories: 840,
    spiceLevel: 3,
    allergens: ["Gluten", "Milk", "Eggs"],
    available: true,
    extras: [
      { id: "ext-melted-pepperjack", name: "Pepper Jack Cheese Slice", price: 3500 },
      { id: "ext-double-chicken", name: "Extra Crispy Tender", price: 7500 }
    ],
    toppings: [
      { id: "top-jalapeno-slices", name: "Fire Jalapeños", price: 2000 }
    ],
    story: "Crisp as a high roundhouse kick, packing a spicy crescendo that reverberates round after round.",
    discipline: ["KICKBOXING"],
    recommended: true
  },
  {
    id: "ko-chicken-dojo-teriyaki",
    name: "Dojo Black Belt Chicken Plate",
    category: "PLATOS PRINCIPALES",
    level: "CHAMPION",
    price: 33000,
    description: "Grilled lean herb-marinated chicken breast glazed with artisan dark teriyaki glaze, served with steamed jasmine rice, sesame broccoli, and ginger-carrot dipping sauce.",
    ingredients: ["Grilled Free-Range Chicken Breast", "House Teriyaki Glaze", "Jasmine Rice", "Sesame Broccoli", "Ginger Dip"],
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    calories: 610,
    spiceLevel: 0,
    allergens: ["Soy", "Sesame"],
    available: true,
    extras: [
      { id: "ext-extra-breast", name: "Additional 150g Grilled Chicken", price: 8000 },
      { id: "ext-avocado", name: "Fresh Sliced Hass Avocado", price: 4500 }
    ],
    toppings: [
      { id: "top-sesame-crunch", name: "Nori & Sesame Crunch", price: 1500 }
    ],
    story: "High-protein discipline inspired by the Karate dojo. Clean fuel for swift, calculated strikes.",
    discipline: ["KARATE"]
  },
  {
    id: "ko-combo-legend-heavyweight",
    name: "Main Event Championship Combo",
    category: "PLATOS PRINCIPALES",
    level: "LEGEND",
    price: 49000,
    description: "Full fight-night banquet: The KNOCKOUT Championship Burger + Large Sparring Fries + 4 Roundhouse Poppers + 1 Artisan Shake or Craft Soda.",
    ingredients: ["KNOCKOUT Burger", "Large Loaded Fries", "4 Chicken Poppers", "Any Large Drink/Shake"],
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    calories: 1680,
    spiceLevel: 1,
    allergens: ["Gluten", "Milk", "Eggs"],
    available: true,
    extras: [
      { id: "ext-upgrade-shake", name: "Upgrade to Whey Protein Shake", price: 3500 },
      { id: "ext-extra-sauce-duo", name: "Duo House Sauces", price: 3000 }
    ],
    toppings: [],
    story: "The complete fight card in a single tray. Fuel up for all 12 rounds.",
    discipline: ["BOXING", "KICKBOXING"],
    recommended: true
  },

  // ================= POSTRES =================
  {
    id: "ko-dessert-brownie-ko",
    name: "TKO Warm Fudge Brownie",
    category: "POSTRES",
    level: "FIGHTER",
    price: 16000,
    description: "Decadent warm dark chocolate walnut brownie crowned with vanilla bean ice cream and hot chocolate lava drizzle.",
    ingredients: ["Belgian Dark Chocolate", "Walnuts", "Madagascar Vanilla Ice Cream", "Fudge Sauce"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    calories: 520,
    spiceLevel: 0,
    allergens: ["Milk", "Gluten", "Tree Nuts", "Eggs"],
    available: true,
    extras: [
      { id: "ext-extra-icecream", name: "Extra Scoop Vanilla Ice Cream", price: 3500 },
      { id: "ext-caramel-drizzle", name: "Sea Salt Caramel Drizzle", price: 2000 }
    ],
    toppings: [
      { id: "top-crushed-oreos", name: "Crushed Oreo Crumbs", price: 2000 }
    ],
    story: "Rich chocolate hit that puts a sweet knockout to your intense hunger.",
    discipline: ["BOXING"],
    recommended: true
  },
  {
    id: "ko-dessert-cheesecake-ring",
    name: "Championship NY Cheesecake",
    category: "POSTRES",
    level: "CHAMPION",
    price: 18000,
    description: "Dense, velvety New York-style cheesecake on a buttery graham cracker crust, finished with fresh wild strawberry compote.",
    ingredients: ["Philadelphia Cream Cheese", "Graham Cracker", "Wild Strawberry Compote", "Fresh Mint"],
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
    calories: 480,
    spiceLevel: 0,
    allergens: ["Milk", "Gluten", "Eggs"],
    available: true,
    extras: [
      { id: "ext-berries", name: "Extra Wild Berries", price: 3000 }
    ],
    toppings: [
      { id: "top-white-choco", name: "White Chocolate Shavings", price: 1500 }
    ],
    story: "Classic American fast-food dessert elevated for the victory banquet.",
    discipline: ["BOXING", "KARATE"]
  },
  {
    id: "ko-dessert-shake-slam",
    name: "Heavy Punch Milkshake",
    category: "POSTRES",
    level: "FIGHTER",
    price: 17000,
    description: "Ultra-thick hand-spun milkshake made with whole milk, malt, crushed cookies & cream, and whipped cream topping.",
    ingredients: ["Whole Milk", "Malted Vanilla Ice Cream", "Crushed Cookies", "Whipped Cream", "Maraschino Cherry"],
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    calories: 630,
    spiceLevel: 0,
    allergens: ["Milk", "Gluten"],
    available: true,
    extras: [
      { id: "ext-shot-espresso", name: "Add Espresso Shot (Energy Kick)", price: 3000 },
      { id: "ext-peanut-butter", name: "Creamy Peanut Butter Swirl", price: 3000 }
    ],
    toppings: [
      { id: "top-chocolate-sprinkles", name: "Rainbow or Dark Sprinkles", price: 1000 }
    ],
    story: "Thick, creamy, and cool. The ultimate post-bout reward.",
    discipline: ["BOXING", "KICKBOXING"]
  },

  // ================= BEBIDAS =================
  {
    id: "ko-drink-protein-karate",
    name: "Dojo Champion Whey Shake",
    category: "BEBIDAS",
    level: "CHAMPION",
    price: 15000,
    description: "32g cold-filtered whey isolate blended with almond milk, banana, honey, and chia seeds. Pure recovery fuel.",
    ingredients: ["Whey Protein Isolate (32g)", "Unsweetened Almond Milk", "Fresh Banana", "Raw Honey", "Chia Seeds"],
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    calories: 320,
    spiceLevel: 0,
    allergens: ["Milk", "Tree Nuts"],
    available: true,
    extras: [
      { id: "ext-creatine", name: "Add 5g Creatine Monohydrate", price: 3000 },
      { id: "ext-peanut-butter-shake", name: "All-Natural Peanut Butter", price: 2500 }
    ],
    toppings: [
      { id: "top-cacao-nibs", name: "Raw Cacao Nibs", price: 1500 }
    ],
    story: "Crafted for athletes who respect body conditioning, swift movement, and rapid muscle repair.",
    discipline: ["KARATE", "KICKBOXING"],
    recommended: true
  },
  {
    id: "ko-drink-artisan-soda-red",
    name: "Fight-Night Red Cherry Soda",
    category: "BEBIDAS",
    level: "ROOKIE",
    price: 9000,
    description: "Craft carbonated red cherry soda with fresh lime squeeze and aromatic botanical bitters.",
    ingredients: ["Sparkling Mountain Water", "Natural Red Cherry Puree", "Lime Juice", "Cane Sugar"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    calories: 140,
    spiceLevel: 0,
    allergens: [],
    available: true,
    extras: [
      { id: "ext-extra-lime", name: "Extra Crushed Lime & Mint", price: 1500 }
    ],
    toppings: [],
    story: "Crisp bubbles and ruby red hues mirroring the corner bell lights.",
    discipline: ["BOXING", "KICKBOXING"]
  },
  {
    id: "ko-drink-blue-corner-lemonade",
    name: "Blue Corner Electrolyte Lemonade",
    category: "BEBIDAS",
    level: "ROOKIE",
    price: 10000,
    description: "Ice-cold athletic blue lemonade infused with blue spirulina, Himalayan pink salt electrolytes, and fresh squeezed lemons.",
    ingredients: ["Cold-Pressed Lemon Juice", "Blue Spirulina", "Electrolyte Minerals", "Agave Nectar", "Filtered Ice"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    calories: 90,
    spiceLevel: 0,
    allergens: [],
    available: true,
    extras: [
      { id: "ext-sparkling", name: "Make it Sparkling Bubbles", price: 1500 }
    ],
    toppings: [],
    story: "Designed for immediate hydration in the corner between intense exchanges.",
    discipline: ["KICKBOXING", "KARATE"],
    recommended: true
  },
  {
    id: "ko-drink-classic-soft",
    name: "Arena American Draft Soda",
    category: "BEBIDAS",
    level: "ROOKIE",
    price: 7000,
    description: "Ice-cold fountain draft with crisp fizz (Cola, Diet Cola, Lemon-Lime, Ginger Ale).",
    ingredients: ["Carbonated Water", "Cane Syrup", "Natural Flavors"],
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    calories: 150,
    spiceLevel: 0,
    allergens: [],
    available: true,
    extras: [],
    toppings: [],
    story: "The staple of American sports stadiums and fight arenas across the nation.",
    discipline: ["BOXING"]
  }
];
