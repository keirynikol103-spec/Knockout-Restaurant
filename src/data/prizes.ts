import { PrizeItem } from '../types';

export const prizeWheelItems: PrizeItem[] = [
  {
    id: 'prize-champion-combo',
    label: 'CHAMPION COMBO',
    color: '#dc2626',
    type: 'combo',
    isWinner: true,
    description: '¡Felicidades, eres el Gran Campeón! Has ganado un Champion Combo completo con hamburguesa Knockout, papas rústicas y bebida.'
  },
  {
    id: 'prize-try-again-1',
    label: 'VUELVE A INTENTARLO OTRO DÍA',
    color: '#1e293b',
    type: 'try-again',
    isWinner: false,
    description: '¡Casi lo logras! Gracias por participar. Vuelve a intentarlo en tu próximo mes y sigue disfrutando de Knockout Fast-Food.'
  },
  {
    id: 'prize-try-again-2',
    label: 'VUELVE A INTENTARLO OTRO DÍA',
    color: '#0f172a',
    type: 'try-again',
    isWinner: false,
    description: '¡Estuviste muy cerca! Recuerda que cada mes tienes una nueva oportunidad para ganar el Champion Combo.'
  },
  {
    id: 'prize-try-again-3',
    label: 'VUELVE A INTENTARLO OTRO DÍA',
    color: '#1e293b',
    type: 'try-again',
    isWinner: false,
    description: '¡Sigue entrenando en el ring! Vuelve a intentarlo en tu siguiente oportunidad mensual.'
  },
  {
    id: 'prize-try-again-4',
    label: 'VUELVE A INTENTARLO OTRO DÍA',
    color: '#0f172a',
    type: 'try-again',
    isWinner: false,
    description: '¡No te rindas campeón! Tu intento mensual se renueva el primer día de cada mes.'
  },
  {
    id: 'prize-try-again-5',
    label: 'VUELVE A INTENTARLO OTRO DÍA',
    color: '#1e293b',
    type: 'try-again',
    isWinner: false,
    description: '¡Por poco! Gracias por participar en la ruleta Knockout. Vuelve a intentarlo el próximo mes.'
  }
];

export const prizeWheelTermsPlaceholder =
  "Rifa oficial del Champion Combo. Válido 1 intento por mes por dirección IP, documento de identidad y número de WhatsApp.";
