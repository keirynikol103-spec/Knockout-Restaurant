import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CartCustomizationItem, Discipline } from '../types';
import { restaurantConfig } from '../data/restaurantConfig';
import { combatSound } from '../utils/sound';

interface WhatsAppReadyState {
  open: boolean;
  message: string;
  url: string;
}

interface AppContextType {
  // Discipline mode
  discipline: Discipline;
  setDiscipline: (d: Discipline) => void;

  // Sound system
  soundMuted: boolean;
  toggleSound: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number | null;
  total: number;
  addToCart: (
    product: Product,
    quantity: number,
    extras: CartCustomizationItem[],
    toppings: CartCustomizationItem[],
    observations: string
  ) => void;
  updateCartItemQuantity: (cartItemId: string, newQty: number) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;

  // UI state
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  tableParam: string | null;

  // Interactive Product Punch and Modal
  punchingProduct: Product | null;
  activeProductModal: Product | null;
  triggerProductPunch: (product: Product) => void;
  closeProductModal: () => void;

  // WhatsApp confirmation dialog
  whatsAppReady: WhatsAppReadyState;
  setWhatsAppReady: (state: WhatsAppReadyState) => void;

  // QR Modal
  qrModalOpen: boolean;
  setQrModalOpen: (open: boolean) => void;

  // Active discount code / applied prize
  applyDiscount: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'knockout_cart_v1';
const LOCAL_STORAGE_SOUND_KEY = 'knockout_sound_muted';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Discipline mode: default BOXING
  const [discipline, setDisciplineState] = useState<Discipline>('BOXING');

  // Sound system: default muted (OFF) per guidelines
  const [soundMuted, setSoundMuted] = useState<boolean>(true);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(restaurantConfig.configuredDiscount);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  // Punch animation and Product Modal
  const [punchingProduct, setPunchingProduct] = useState<Product | null>(null);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  // WhatsApp ready modal
  const [whatsAppReady, setWhatsAppReady] = useState<WhatsAppReadyState>({
    open: false,
    message: '',
    url: ''
  });

  // Table parameter from URL (e.g. ?table=12)
  const [tableParam, setTableParam] = useState<string | null>(null);

  // Initialize from localStorage and URL
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }

      const savedSound = localStorage.getItem(LOCAL_STORAGE_SOUND_KEY);
      if (savedSound !== null) {
        const muted = savedSound === 'true';
        setSoundMuted(muted);
        combatSound.setMuted(muted);
      } else {
        combatSound.setMuted(true);
      }

      // Check URL parameters for table
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const table = urlParams.get('table');
        if (table) {
          setTableParam(table);
        }
      }
    } catch {
      // Ignore storage errors safely
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // Ignore write errors
    }
  }, [cart]);

  const toggleSound = () => {
    setSoundMuted(prev => {
      const next = !prev;
      combatSound.setMuted(next);
      localStorage.setItem(LOCAL_STORAGE_SOUND_KEY, String(next));
      if (!next) {
        combatSound.playRingBell();
      }
      return next;
    });
  };

  const setDiscipline = (d: Discipline) => {
    setDisciplineState(d);
    combatSound.playTap();
  };

  // Helper to generate a unique key based on product + specific customizations
  const createCartItemId = (
    productId: string,
    extras: CartCustomizationItem[],
    toppings: CartCustomizationItem[],
    observations?: string
  ): string => {
    const extraIds = (extras || []).map(e => e.id).sort().join('_');
    const toppingIds = (toppings || []).map(t => t.id).sort().join('_');
    const obsClean = (observations || '').trim().toLowerCase();
    return `${productId}-${extraIds}-${toppingIds}-${obsClean}`;
  };

  const addToCart = (
    product: Product,
    quantity: number,
    extras: CartCustomizationItem[],
    toppings: CartCustomizationItem[],
    observations: string = ''
  ) => {
    if (quantity <= 0) return;

    const extrasTotal = extras.reduce((sum, item) => sum + item.price, 0);
    const toppingsTotal = toppings.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = product.price + extrasTotal + toppingsTotal;
    const totalPrice = unitPrice * quantity;

    const cartItemId = createCartItemId(product.id, extras, toppings, observations);

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        // Increment quantity of exact same customization
        const updated = [...prevCart];
        const current = updated[existingIndex];
        const newQuantity = current.quantity + quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQuantity,
          totalPrice: current.unitPrice * newQuantity
        };
        return updated;
      } else {
        // Add as separate item (different customizations are NEVER incorrectly merged)
        const newItem: CartItem = {
          cartItemId,
          productId: product.id,
          product,
          quantity,
          extras: [...extras],
          toppings: [...toppings],
          observations,
          unitPrice,
          totalPrice
        };
        return [...prevCart, newItem];
      }
    });

    combatSound.playPunch();
  };

  const updateCartItemQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeCartItem(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty
          };
        }
        return item;
      })
    );
    combatSound.playTap();
  };

  const removeCartItem = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    combatSound.playTap();
  };

  const clearCart = () => {
    setCart([]);
  };

  const triggerProductPunch = (product: Product) => {
    // 1. Play punch audio
    combatSound.playPunch();

    // 2. Set punching animation overlay
    setPunchingProduct(product);

    // 3. Fast cinematic reveal transition (380ms)
    setTimeout(() => {
      setPunchingProduct(null);
      setActiveProductModal(product);
    }, 400);
  };

  const closeProductModal = () => {
    setActiveProductModal(null);
  };

  const applyDiscount = (amount: number) => {
    setDiscount(amount);
  };

  // Calculations:
  // subtotal = sum(productPrice * quantity) + extras + toppings (already contained in item.totalPrice)
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = restaurantConfig.delivery.fee;
  const total = Math.max(0, subtotal - discount + (deliveryFee || 0));
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        discipline,
        setDiscipline,
        soundMuted,
        toggleSound,
        cart,
        cartCount,
        subtotal,
        discount,
        deliveryFee,
        total,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        cartOpen,
        setCartOpen,
        checkoutOpen,
        setCheckoutOpen,
        tableParam,
        punchingProduct,
        activeProductModal,
        triggerProductPunch,
        closeProductModal,
        whatsAppReady,
        setWhatsAppReady,
        qrModalOpen,
        setQrModalOpen,
        applyDiscount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
