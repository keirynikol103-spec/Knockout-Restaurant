import { CartItem, CustomerOrderData } from '../types';
import { restaurantConfig } from '../data/restaurantConfig';

/**
 * Format currency in Colombian Pesos (COP)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Builds the exact dynamic WhatsApp order message specified in user instructions
 */
export function generateOrderWhatsAppMessage(
  cart: CartItem[],
  customerData: CustomerOrderData,
  subtotal: number,
  discount: number,
  deliveryFee: number | null
): string {
  const lines: string[] = [];

  lines.push('🥊 NEW ORDER — KNOCKOUT FAST-FOOD 🥊');
  lines.push('');
  lines.push('👤 CUSTOMER:');
  lines.push((customerData.customerName || '').trim());
  lines.push('');
  lines.push('📱 PHONE:');
  lines.push((customerData.customerPhone || '').trim());
  lines.push('');
  lines.push('🛒 ORDER:');
  lines.push('');

  cart.forEach((item, index) => {
    lines.push(`${item.quantity}x ${item.product.name} (${formatCurrency(item.unitPrice)})`);

    if (item.extras && item.extras.length > 0) {
      const extrasText = item.extras.map(e => `${e.name} (+${formatCurrency(e.price)})`).join(', ');
      lines.push(`Extra: ${extrasText}`);
    }

    if (item.toppings && item.toppings.length > 0) {
      const toppingsText = item.toppings.map(t => `${t.name} (+${formatCurrency(t.price)})`).join(', ');
      lines.push(`Topping: ${toppingsText}`);
    }

    if (item.observations && typeof item.observations === 'string' && item.observations.trim().length > 0) {
      lines.push(`Note: ${item.observations.trim()}`);
    }

    lines.push(`Subtotal: ${formatCurrency(item.totalPrice)}`);
    if (index < cart.length - 1) {
      lines.push('---');
    }
  });

  lines.push('');
  lines.push('💰 SUBTOTAL:');
  lines.push(formatCurrency(subtotal));
  lines.push('');
  lines.push('🚚 DELIVERY:');
  if (customerData.orderType === 'DELIVERY') {
    lines.push(deliveryFee !== null ? formatCurrency(deliveryFee) : 'To be confirmed via WhatsApp');
  } else {
    lines.push('$0 (Not applicable)');
  }
  lines.push('');
  lines.push('🔥 DISCOUNT:');
  lines.push(formatCurrency(discount));
  lines.push('');

  const finalTotal = Math.max(0, subtotal - discount + (deliveryFee || 0));
  lines.push('🥊 TOTAL:');
  lines.push(formatCurrency(finalTotal) + (deliveryFee === null && customerData.orderType === 'DELIVERY' ? ' + Delivery Fee' : ''));
  lines.push('');
  lines.push('📍 ORDER TYPE:');
  lines.push(customerData.orderType);

  if (customerData.orderType === 'DELIVERY') {
    lines.push('');
    lines.push('🏠 ADDRESS INFORMATION:');
    lines.push(`Address: ${customerData.address || '[No address provided]'}`);
    if (customerData.neighborhood) {
      lines.push(`Neighborhood: ${customerData.neighborhood}`);
    }
    if (customerData.reference) {
      lines.push(`Reference: ${customerData.reference}`);
    }
    if (customerData.deliveryInstructions) {
      lines.push(`Instructions: ${customerData.deliveryInstructions}`);
    }
  } else if (customerData.orderType === 'DINE IN') {
    lines.push('');
    lines.push(`🪑 TABLE: ${customerData.tableNumber || 'To be designated upon arrival'}`);
  }

  lines.push('');
  lines.push('💳 PAYMENT:');
  lines.push(customerData.paymentMethod);
  lines.push('');
  lines.push('📝 SPECIAL REQUESTS:');
  lines.push((customerData.specialRequests || '').trim() || 'None');

  return lines.join('\n');
}

/**
 * Creates the official wa.me link with encoded text
 */
export function buildWhatsAppLink(message: string): string {
  const technicalNumber = restaurantConfig.whatsappTechnical; // '573028305329'
  const encoded = encodeURIComponent(message || '');
  return `https://wa.me/${technicalNumber}?text=${encoded}`;
}

/**
 * Generates reservation WhatsApp message
 */
export function generateReservationWhatsAppMessage(data: {
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number | string;
  observations: string;
}): string {
  const lines: string[] = [
    '🥊 RESERVATION — KNOCKOUT FAST-FOOD',
    '',
    'Name:',
    (data.name || '').trim(),
    '',
    'Phone:',
    (data.phone || '').trim(),
    '',
    'Date:',
    data.date,
    '',
    'Time:',
    data.time,
    '',
    'People:',
    String(data.people),
    '',
    'Observations:',
    (data.observations || '').trim() || 'None'
  ];
  return lines.join('\n');
}

/**
 * Creates a WhatsApp link directed to the customer's own phone number
 */
export function buildCustomerWhatsAppLink(customerPhone: string, message: string): string {
  const digitsOnly = (customerPhone || '').replace(/\D/g, '');
  // Default to Colombian country code 57 if standard 10 digit mobile is provided
  const targetNumber = digitsOnly.startsWith('57') ? digitsOnly : (digitsOnly.length === 10 ? `57${digitsOnly}` : digitsOnly);
  const encoded = encodeURIComponent(message || '');
  return `https://wa.me/${targetNumber}?text=${encoded}`;
}

/**
 * Generates spin wheel prize verification WhatsApp message sent to KNOCKOUT FAST-FOOD official number
 */
export function generateSpinVerificationWhatsAppMessage(data: {
  customerName?: string;
  documentId?: string;
  customerPhone?: string;
  prizeLabel?: string;
  prizeDescription?: string;
  ipAddress?: string;
  ticketCode?: string;
  timestamp?: string;
}): string {
  const lines: string[] = [
    '🥊 VALIDACIÓN OFICIAL DE GANADOR — KNOCKOUT FAST-FOOD 🥊',
    '',
    '¡Hola equipo KNOCKOUT! Acabo de participar en la ruleta "WIN A COMBO". Aquí están mis datos oficiales para verificar y redimir mi premio:',
    '',
    '👤 NOMBRE DEL CLIENTE:',
    (data.customerName || '').trim() || '[No especificado]',
    '',
    '🆔 DOCUMENTO DE IDENTIDAD:',
    (data.documentId || '').trim() || '[No especificado]',
    '',
    '📱 WHATSAPP DEL CLIENTE:',
    (data.customerPhone || '').trim() || '[No especificado]',
    '',
    '🎁 PREMIO GANADO:',
    (data.prizeLabel || '').toUpperCase(),
    data.prizeDescription || '',
    '',
    '🎫 CÓDIGO ÚNICO DE TICKET:',
    data.ticketCode || 'KO-SPIN',
    '',
    '🌐 IP REGISTRADA:',
    data.ipAddress || 'Verificada en dispositivo',
    '',
    '⏰ FECHA Y HORA:',
    data.timestamp || new Date().toLocaleString(),
    '',
    '⚠️ Control de seguridad: 1 solo intento al mes por dirección IP, Documento y WhatsApp.'
  ];
  return lines.join('\n');
}

/**
 * Generates personal winner certificate message so the customer can receive and save their proof in their own WhatsApp
 */
export function generateCustomerPrizeCertificateMessage(data: {
  customerName?: string;
  documentId?: string;
  customerPhone?: string;
  prizeLabel?: string;
  prizeDescription?: string;
  ticketCode?: string;
  timestamp?: string;
}): string {
  const nameClean = (data.customerName || '').trim() || 'Ganador';
  const lines: string[] = [
    '🥊 COMPROBANTE OFICIAL DE GANADOR — KNOCKOUT FAST-FOOD 🥊',
    '',
    `¡Felicitaciones ${nameClean}! 🎉`,
    'Has participado y ganado en la ruleta oficial "WIN A COMBO". Guarda este mensaje como tu soporte y comprobante de veracidad:',
    '',
    `🏆 PREMIO: ${(data.prizeLabel || '').toUpperCase()}`,
    `📋 DESCRIPCIÓN: ${data.prizeDescription || ''}`,
    `🎫 CÓDIGO DE TICKET: ${data.ticketCode || 'KO-SPIN'}`,
    `🆔 DOCUMENTO: ${(data.documentId || '').trim() || '[No especificado]'}`,
    `📱 NÚMERO REGISTRADO: ${(data.customerPhone || '').trim() || '[No especificado]'}`,
    `⏰ FECHA DE PARTICIPACIÓN: ${data.timestamp || new Date().toLocaleString()}`,
    '',
    `Para redimir tu premio, presenta este comprobante o menciónalo al realizar tu pedido con KNOCKOUT FAST-FOOD (${restaurantConfig.whatsapp}).`,
    '¡Big flavors, stronger punches! 🍔🥊'
  ];
  return lines.join('\n');
}
