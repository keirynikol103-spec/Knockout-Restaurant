export const restaurantConfig = {
  name: "KNOCKOUT – FAST-FOOD",
  slogan: "BIG FLAVORS. STRONGER PUNCHES!",
  secondaryMessage: "WE COOK. WE SERVE. WE WIN.",
  whatsapp: "3028305329",
  whatsappTechnical: "573028305329",

  owners: [
    "Keiry Nikol Gutierrez Peralta",
    "Valery Rodriguez Zapata",
    "John Tavera"
  ],

  address: "Calle 40 # 4b, Macarena Alta, Ibagué",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+40+%23+4b%2C+Macarena+Alta%2C+Ibagu%C3%A9%2C+Tolima",
  hours: "4pm - 12am",

  socialMedia: {
    instagram: "Knockout Fast-Food SM",
    tiktok: "Knockour Fast-Food SM"
  },

  delivery: {
    enabled: true,
    fee: null as number | null // null indicates "To be confirmed via WhatsApp"
  },

  paymentMethods: [
    "Cash",
    "Bank Transfer",
    "Card",
    "[OTHER PAYMENT METHOD]"
  ],

  configuredDiscount: 0, // default configured discount

  qrUrl: typeof window !== 'undefined' ? window.location.origin : 'https://knockout-fastfood.com'
};
