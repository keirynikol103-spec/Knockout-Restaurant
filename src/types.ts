export type Discipline = 'BOXING' | 'KARATE' | 'KICKBOXING';

export type CombatLevel = 'ROOKIE' | 'FIGHTER' | 'CHAMPION' | 'LEGEND';

export type ProductCategory = 'ENTRADAS' | 'PLATOS PRINCIPALES' | 'POSTRES' | 'BEBIDAS';

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
}

export interface ProductTopping {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  level: CombatLevel;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  secondaryImage?: string;
  video?: string;
  calories: number | null;
  spiceLevel: number; // 0 to 3
  allergens: string[];
  available: boolean;
  extras: ProductExtra[];
  toppings: ProductTopping[];
  story: string;
  discipline: Discipline[];
  recommended?: boolean;
}

export interface CartCustomizationItem {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string; // unique ID representing this specific combination of product + customizations
  productId: string;
  product: Product;
  quantity: number;
  extras: CartCustomizationItem[];
  toppings: CartCustomizationItem[];
  observations: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'DELIVERY' | 'DINE IN' | 'PICKUP';

export interface CustomerOrderData {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  // Delivery specific fields
  address?: string;
  neighborhood?: string;
  reference?: string;
  deliveryInstructions?: string;
  // Dine-in specific fields
  tableNumber?: string;
  // Common fields
  paymentMethod: string;
  specialRequests: string;
}

export interface SauceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  spiceLevel: number;
  allergens: string[];
  available: boolean;
}

export interface ToppingItem {
  id: string;
  name: string;
  price: number;
  description: string;
  allergens: string[];
  available: boolean;
}

export interface PromotionItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discount: number;
  validityPeriod: string;
  terms: string;
  available: boolean;
}

export interface MartialArtsClass {
  id: string;
  name: string;
  discipline: Discipline;
  description: string;
  schedule: string;
  duration: string;
  price: string;
  instructor: string;
  available: boolean;
  image?: string;
}

export interface WeekendEvent {
  id: string;
  name: string;
  date: string;
  day: 'Saturday' | 'Sunday';
  time: string;
  description: string;
  image?: string;
  ticketInfo: string;
  available: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  isVerified?: boolean;
  photo?: string;
}

export interface PrizeItem {
  id: string;
  label: string;
  color: string;
  type: 'fries' | 'drink' | 'discount' | 'sauce' | 'dessert' | 'combo' | 'no-prize' | 'try-again';
  description: string;
  isWinner?: boolean;
}
