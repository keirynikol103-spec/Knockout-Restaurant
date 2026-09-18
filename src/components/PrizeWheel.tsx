import React, { useState, useEffect, useMemo } from 'react';
import { prizeWheelItems, prizeWheelTermsPlaceholder } from '../data/prizes';
import { PrizeItem } from '../types';
import { combatSound } from '../utils/sound';
import {
  Trophy,
  RotateCcw,
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  Lock,
  Phone,
  Copy,
  Check,
  Smartphone,
  Calendar,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  buildWhatsAppLink,
  buildCustomerWhatsAppLink,
  generateSpinVerificationWhatsAppMessage,
  generateCustomerPrizeCertificateMessage
} from '../utils/whatsapp';
import { restaurantConfig } from '../data/restaurantConfig';

interface MonthlySpinRecord {
  customerName: string;
  documentId: string;
  customerPhone: string;
  ipAddress: string;
  ticketCode: string;
  prize: PrizeItem;
  timestamp: string;
  monthKey: string; // Format: "YYYY-MM" (e.g. "2026-09")
  isWinner: boolean;
  whatsappSent?: boolean;
}

const REGISTRY_KEY = 'knockout_monthly_spins_registry';
const MY_SPIN_KEY = 'knockout_my_monthly_spin';

// Helpers for monthly promotion cycle
const getMonthKey = (date: Date = new Date()): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const getMonthNameSpanish = (date: Date = new Date()): string => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const getNextMonthResetDateSpanish = (date: Date = new Date()): string => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const nextMonthIdx = (date.getMonth() + 1) % 12;
  const nextYear = date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear();
  return `1 de ${months[nextMonthIdx]} de ${nextYear}`;
};

export const PrizeWheel: React.FC = () => {
  const { applyDiscount } = useApp();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  // IP & Monthly cycle state
  const [userIp, setUserIp] = useState<string>('Detectando IP...');
  const [isIpLoading, setIsIpLoading] = useState(true);
  const [alreadySpunThisMonth, setAlreadySpunThisMonth] = useState(false);
  const [spinRecord, setSpinRecord] = useState<MonthlySpinRecord | null>(null);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [copiedSupport, setCopiedSupport] = useState(false);

  // Wheel animation states
  const [spinning, setSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);

  const currentMonthKey = useMemo(() => getMonthKey(), []);
  const currentMonthName = useMemo(() => getMonthNameSpanish(), []);
  const nextResetDate = useMemo(() => getNextMonthResetDateSpanish(), []);

  const numSlices = prizeWheelItems.length; // 6 slices (1 Champion Combo, 5 Try Again)
  const sliceAngle = 360 / numSlices; // 60 degrees

  // Helper to load registry
  const getRegistry = (): Record<string, MonthlySpinRecord> => {
    try {
      const raw = localStorage.getItem(REGISTRY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  // Helper to save spin to registry for this month
  const saveSpinToRegistry = (record: MonthlySpinRecord) => {
    try {
      const registry = getRegistry();
      const month = record.monthKey || currentMonthKey;

      if (record.ipAddress) {
        registry[`ip:${record.ipAddress}:${month}`] = record;
      }
      if (record.documentId) {
        registry[`doc:${record.documentId.trim().toLowerCase()}:${month}`] = record;
      }
      if (record.customerPhone) {
        const digits = record.customerPhone.replace(/\D/g, '');
        if (digits) {
          registry[`phone:${digits}:${month}`] = record;
        }
      }
      localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
      localStorage.setItem(MY_SPIN_KEY, JSON.stringify(record));
    } catch (e) {
      console.error('Failed to save spin to registry', e);
    }
  };

  // Detect client IP address on mount and check monthly eligibility
  useEffect(() => {
    let isMounted = true;

    const detectIpAndCheckMonth = async () => {
      let resolvedIp = '';
      try {
        const res = await fetch('https://api.ipify.org?format=json', {
          signal: AbortSignal.timeout(3500)
        });
        const data = await res.json();
        if (data?.ip) {
          resolvedIp = data.ip;
        }
      } catch {
        try {
          const res2 = await fetch('https://api64.ipify.org?format=json', {
            signal: AbortSignal.timeout(3000)
          });
          const data2 = await res2.json();
          if (data2?.ip) {
            resolvedIp = data2.ip;
          }
        } catch {
          const storedClientId =
            localStorage.getItem('ko_device_ip_id') ||
            `CLIENT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
          localStorage.setItem('ko_device_ip_id', storedClientId);
          resolvedIp = storedClientId;
        }
      }

      if (!isMounted) return;

      setUserIp(resolvedIp);
      setIsIpLoading(false);

      // Check if this IP has already spun in the current month
      const registry = getRegistry();
      const ipMonthKey = `ip:${resolvedIp}:${currentMonthKey}`;
      const existingByIp = registry[ipMonthKey];

      let localSpin: MonthlySpinRecord | null = null;
      try {
        const rawLocal = localStorage.getItem(MY_SPIN_KEY);
        if (rawLocal) {
          const parsed = JSON.parse(rawLocal);
          // Only consider active if it belongs to the current month!
          if (parsed && (parsed.monthKey === currentMonthKey || !parsed.monthKey)) {
            localSpin = parsed;
          }
        }
      } catch {
        localSpin = null;
      }

      const match = existingByIp || localSpin;
      if (match) {
        setAlreadySpunThisMonth(true);
        setSpinRecord(match);
        setWonPrize(match.prize);
        setCustomerName(match.customerName || '');
        setDocumentId(match.documentId || '');
        setCustomerPhone(match.customerPhone || '');
        if (match.whatsappSent) {
          setWhatsappSent(true);
        }
      }
    };

    detectIpAndCheckMonth();

    return () => {
      isMounted = false;
    };
  }, [currentMonthKey]);

  // Handle spin execution
  const handleSpin = () => {
    if (spinning) return;

    if (alreadySpunThisMonth) {
      setInputError(`Ya has utilizado tu único intento permitido para el mes de ${currentMonthName}. Tu próximo intento estará disponible el ${nextResetDate}.`);
      return;
    }

    const trimmedName = (customerName || '').trim();
    const trimmedDoc = (documentId || '').trim();
    const trimmedPhone = (customerPhone || '').trim();
    const cleanedDigits = trimmedPhone.replace(/\D/g, '');

    if (!trimmedName) {
      setInputError('Por favor ingresa tu nombre y apellido.');
      return;
    }

    if (!trimmedDoc || trimmedDoc.length < 5) {
      setInputError('Por favor ingresa un documento de identidad válido (mínimo 5 dígitos).');
      return;
    }

    if (!trimmedPhone || cleanedDigits.length < 7) {
      setInputError('Por favor ingresa tu número de WhatsApp válido (mínimo 7 a 10 dígitos).');
      return;
    }

    // Check if this document or phone has already been used this month
    const registry = getRegistry();
    const docKey = `doc:${trimmedDoc.toLowerCase()}:${currentMonthKey}`;
    if (registry[docKey]) {
      setInputError(`Este documento de identidad ya utilizó su intento del mes de ${currentMonthName}. Próximo intento: ${nextResetDate}.`);
      return;
    }

    const phoneKey = `phone:${cleanedDigits}:${currentMonthKey}`;
    if (registry[phoneKey]) {
      setInputError(`Este número de WhatsApp ya utilizó su intento del mes de ${currentMonthName}. Próximo intento: ${nextResetDate}.`);
      return;
    }

    setInputError(null);
    setWonPrize(null);
    setSpinning(true);
    combatSound.playRingBell();

    // Pick random slice index (0 = Champion Combo, 1..5 = Vuelve a intentarlo otro día)
    const randomSliceIndex = Math.floor(Math.random() * numSlices);
    const selected = prizeWheelItems[randomSliceIndex];

    // Mathematical rotation calculation to land the top pointer (at 12 o'clock, 0 deg)
    // precisely at the center of randomSliceIndex.
    // Each slice starts at index * 60 deg, center is at index * 60 + 30 deg.
    const sliceCenterAngle = randomSliceIndex * sliceAngle + sliceAngle / 2;
    const targetNormalized = (360 - sliceCenterAngle) % 360;
    const currentNormalized = currentRotation % 360;
    let forwardDistance = (targetNormalized - currentNormalized) % 360;
    if (forwardDistance < 0) {
      forwardDistance += 360;
    }
    // Add 5 full rotations (1800 deg) for suspenseful wheel motion
    const extraRounds = 5 * 360;
    const newTotalRotation = currentRotation + extraRounds + forwardDistance;

    setCurrentRotation(newTotalRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(selected);

      const isWinner = selected.isWinner ?? (selected.type === 'combo');

      if (isWinner) {
        combatSound.playKO();
      } else {
        combatSound.playPunch();
      }

      const ticketPrefix = isWinner ? 'KO-CHAMPION' : 'KO-ATTEMPT';
      const ticketCode = `${ticketPrefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const timestamp = new Date().toLocaleString('es-CO', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const newRecord: MonthlySpinRecord = {
        customerName: trimmedName,
        documentId: trimmedDoc,
        customerPhone: trimmedPhone,
        ipAddress: userIp,
        ticketCode,
        prize: selected,
        timestamp,
        monthKey: currentMonthKey,
        isWinner,
        whatsappSent: false
      };

      setSpinRecord(newRecord);
      setAlreadySpunThisMonth(true);
      saveSpinToRegistry(newRecord);

      if (isWinner && selected.type === 'discount') {
        applyDiscount(5000);
      }
    }, 4200);
  };

  // Send official verification to Knockout Fast-Food official WhatsApp
  const handleSendKnockoutWhatsAppVerification = () => {
    if (!spinRecord) return;

    const message = generateSpinVerificationWhatsAppMessage({
      customerName: spinRecord.customerName || '',
      documentId: spinRecord.documentId || '',
      customerPhone: spinRecord.customerPhone || '',
      prizeLabel: spinRecord.prize?.label || '',
      prizeDescription: spinRecord.prize?.description || '',
      ipAddress: spinRecord.ipAddress || '',
      ticketCode: spinRecord.ticketCode || '',
      timestamp: spinRecord.timestamp || ''
    });

    const link = buildWhatsAppLink(message);
    window.open(link, '_blank');

    setWhatsappSent(true);
    const updatedRecord = { ...spinRecord, whatsappSent: true };
    setSpinRecord(updatedRecord);
    saveSpinToRegistry(updatedRecord);
  };

  // Send certificate copy directly to customer's own WhatsApp
  const handleSendCustomerWhatsAppCopy = () => {
    if (!spinRecord) return;

    const message = generateCustomerPrizeCertificateMessage({
      customerName: spinRecord.customerName || '',
      documentId: spinRecord.documentId || '',
      customerPhone: spinRecord.customerPhone || '',
      prizeLabel: spinRecord.prize?.label || '',
      prizeDescription: spinRecord.prize?.description || '',
      ticketCode: spinRecord.ticketCode || '',
      timestamp: spinRecord.timestamp || ''
    });

    const link = buildCustomerWhatsAppLink(spinRecord.customerPhone || '', message);
    window.open(link, '_blank');
  };

  // Copy support ticket text to clipboard
  const handleCopySupportTicket = () => {
    if (!spinRecord) return;

    const message = generateCustomerPrizeCertificateMessage({
      customerName: spinRecord.customerName || '',
      documentId: spinRecord.documentId || '',
      customerPhone: spinRecord.customerPhone || '',
      prizeLabel: spinRecord.prize?.label || '',
      prizeDescription: spinRecord.prize?.description || '',
      ticketCode: spinRecord.ticketCode || '',
      timestamp: spinRecord.timestamp || ''
    });

    navigator.clipboard.writeText(message);
    setCopiedSupport(true);
    setTimeout(() => setCopiedSupport(false), 3000);
  };

  // SVG Geometry calculations for the 6 slices
  // Center: (160, 160), Radius: 150. Angle 0 deg = top (12 o'clock).
  const cx = 160;
  const cy = 160;
  const radius = 150;

  const slicePaths = useMemo(() => {
    return prizeWheelItems.map((prize, idx) => {
      const startAngle = idx * sliceAngle;
      const endAngle = (idx + 1) * sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;

      // Convert angles in degrees (0 = 12 o'clock, clockwise) to radians
      const toRad = (deg: number) => (deg * Math.PI) / 180;
      const x1 = cx + radius * Math.sin(toRad(startAngle));
      const y1 = cy - radius * Math.cos(toRad(startAngle));
      const x2 = cx + radius * Math.sin(toRad(endAngle));
      const y2 = cy - radius * Math.cos(toRad(endAngle));

      // Path from center to start point, arc to end point, line back to center
      const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${radius} ${radius} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

      return {
        prize,
        idx,
        d,
        midAngle,
        isChampionCombo: prize.isWinner ?? (prize.type === 'combo')
      };
    });
  }, [prizeWheelItems, sliceAngle]);

  return (
    <section
      id="win-a-combo"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#090b10] border-b border-white/10 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-950/60 text-red-400 border border-red-500/40 text-xs font-bold tracking-widest uppercase mb-2">
            <Trophy className="w-3.5 h-3.5 text-red-500" />
            <span>RIFA MENSUAL DEL CAMPEONATO</span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide text-white">
            WIN A COMBO
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mt-1">
            Gira la ruleta y participa por el <strong className="text-amber-400">CHAMPION COMBO</strong>.
            Solo 1 triángulo tiene el gran premio; los demás espacios son tu oportunidad para volver a intentarlo.
          </p>
        </div>

        {/* IP and Monthly Cycle Security Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-white/10 text-xs text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              1 Intento al Mes por IP: <strong className="text-white font-mono text-[11px]">{userIp}</strong>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-xs text-amber-300">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Mes Activo: <strong>{currentMonthName}</strong></span>
          </div>
        </div>

        {/* Input Boxes for Name, Document & WhatsApp */}
        <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#0e121a] border border-white/10 shadow-2xl text-left space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <User className="w-4 h-4 text-red-500" />
              Datos de Registro del Jugador
            </span>
            {alreadySpunThisMonth ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                <Lock className="w-3 h-3" /> Intento de {currentMonthName} Utilizado
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                <Sparkles className="w-3 h-3" /> 1 Intento Disponible
              </span>
            )}
          </div>

          <div className="space-y-3">
            {/* Box 1: Customer Name */}
            <div>
              <label htmlFor="customer-name-spin" className="block text-xs font-semibold text-neutral-300 mb-1">
                Nombre y Apellido <span className="text-red-500">*</span>
              </label>
              <input
                id="customer-name-spin"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setInputError(null);
                }}
                disabled={spinning || alreadySpunThisMonth}
                placeholder="Ej. Carlos Mendoza"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm placeholder:text-neutral-600 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Box 2: Document of Identity */}
            <div>
              <label htmlFor="customer-doc-spin" className="block text-xs font-semibold text-neutral-300 mb-1">
                Documento de Identidad (Cédula / D.I.) <span className="text-red-500">*</span>
              </label>
              <input
                id="customer-doc-spin"
                type="text"
                value={documentId}
                onChange={(e) => {
                  setDocumentId(e.target.value);
                  setInputError(null);
                }}
                disabled={spinning || alreadySpunThisMonth}
                placeholder="Ej. 1005892341"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm placeholder:text-neutral-600 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Box 3: Customer WhatsApp Phone */}
            <div>
              <label htmlFor="customer-phone-spin" className="block text-xs font-semibold text-neutral-300 mb-1">
                Número de WhatsApp del Cliente <span className="text-red-500">*</span>
              </label>
              <input
                id="customer-phone-spin"
                type="tel"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  setInputError(null);
                }}
                disabled={spinning || alreadySpunThisMonth}
                placeholder="Ej. 3028305329"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm placeholder:text-neutral-600 disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <p className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Control de seguridad mensual vinculado a tu IP, documento y WhatsApp.</span>
              </p>
            </div>
          </div>

          {/* Validation Error Message */}
          {inputError && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 flex items-start gap-2 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{inputError}</span>
            </div>
          )}

          {/* Notice when already spun this month */}
          {alreadySpunThisMonth && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Lock className="w-4 h-4" />
                <span>Intento mensual completado ({currentMonthName})</span>
              </div>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">
                Esta dirección IP, documento y WhatsApp ya han registrado su intento de este mes. Tu próximo intento se habilitará el <strong className="text-white">{nextResetDate}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Wheel Container with SVG Precision */}
        <div className="relative w-72 sm:w-88 h-72 sm:h-88 mx-auto flex items-center justify-center">
          {/* Top Indicator Arrow (Pointer) */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-6 h-8 bg-gradient-to-b from-amber-300 to-amber-500 clip-triangle shadow-2xl border-2 border-black" />
          </div>

          {/* Outer Ring Casing with Championship Studs */}
          <div className="absolute inset-0 rounded-full border-8 border-neutral-800 bg-neutral-950 shadow-[0_0_50px_rgba(239,68,68,0.25)] pointer-events-none" />

          {/* Rotating SVG Wheel Disc */}
          <div
            className="w-full h-full rounded-full overflow-hidden relative shadow-2xl transition-transform duration-[4200ms]"
            style={{
              transform: `rotate(${currentRotation}deg)`,
              transitionTimingFunction: 'cubic-bezier(0.12, 0.85, 0.18, 1)'
            }}
          >
            <svg
              viewBox="0 0 320 320"
              className="w-full h-full select-none"
              style={{ display: 'block' }}
            >
              <defs>
                {/* Gold gradient for Champion Combo text */}
                <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>

              {slicePaths.map(({ prize, idx, d, midAngle, isChampionCombo }) => (
                <g key={prize.id}>
                  {/* Slice Sector */}
                  <path
                    d={d}
                    fill={prize.color}
                    stroke="#000000"
                    strokeWidth="1.5"
                    className={isChampionCombo ? 'brightness-110' : ''}
                  />

                  {/* Gold highlight line for the Champion Combo slice */}
                  {isChampionCombo && (
                    <path
                      d={d}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      opacity="0.8"
                    />
                  )}

                  {/* Slice Text Content Rotated to midAngle */}
                  <g transform={`rotate(${midAngle} 160 160)`}>
                    {isChampionCombo ? (
                      /* ONLY 1 TRIANGLE: CHAMPION COMBO */
                      <g>
                        <text
                          x="160"
                          y="42"
                          textAnchor="middle"
                          fontSize="18"
                        >
                          🏆
                        </text>
                        <text
                          x="160"
                          y="62"
                          textAnchor="middle"
                          fill="#fef08a"
                          fontSize="12"
                          fontWeight="900"
                          letterSpacing="0.08em"
                          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                          CHAMPION
                        </text>
                        <text
                          x="160"
                          y="78"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="14"
                          fontWeight="900"
                          letterSpacing="0.08em"
                          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                          COMBO
                        </text>
                        <text
                          x="160"
                          y="94"
                          textAnchor="middle"
                          fill="#fef08a"
                          fontSize="8"
                          fontWeight="800"
                          letterSpacing="0.05em"
                        >
                          ★ GRAN PREMIO ★
                        </text>
                      </g>
                    ) : (
                      /* OTHER TRIANGLES: VUELVE A INTENTARLO OTRO DÍA */
                      <g opacity="0.95">
                        <text
                          x="160"
                          y="48"
                          textAnchor="middle"
                          fill="#94a3b8"
                          fontSize="9"
                          fontWeight="800"
                          letterSpacing="0.06em"
                        >
                          VUELVE A
                        </text>
                        <text
                          x="160"
                          y="65"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="900"
                          letterSpacing="0.05em"
                          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
                        >
                          INTENTARLO
                        </text>
                        <text
                          x="160"
                          y="81"
                          textAnchor="middle"
                          fill="#cbd5e1"
                          fontSize="10"
                          fontWeight="800"
                          letterSpacing="0.06em"
                        >
                          OTRO DÍA
                        </text>
                        <text
                          x="160"
                          y="100"
                          textAnchor="middle"
                          fontSize="11"
                          opacity="0.7"
                        >
                          🥊
                        </text>
                      </g>
                    )}
                  </g>
                </g>
              ))}
            </svg>
          </div>

          {/* Center Stationary Hub */}
          <div className="absolute w-20 h-20 rounded-full bg-neutral-950 border-4 border-amber-400 shadow-2xl flex items-center justify-center z-20 pointer-events-none">
            <span className="text-2xl select-none">🥊</span>
          </div>
        </div>

        {/* Spin Control Button */}
        <div>
          <button
            onClick={handleSpin}
            disabled={spinning || alreadySpunThisMonth || isIpLoading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-red-600/30 border border-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            {alreadySpunThisMonth ? (
              <>
                <Lock className="w-5 h-5 text-amber-300" />
                <span>INTENTO DE {currentMonthName.toUpperCase()} COMPLETADO</span>
              </>
            ) : (
              <>
                <RotateCcw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
                <span>{spinning ? 'GIRANDO LA RULETA...' : 'GIRAR LA RULETA / SPIN'}</span>
              </>
            )}
          </button>
        </div>

        {/* Result Cards */}
        {wonPrize && spinRecord && (
          <>
            {spinRecord.isWinner ? (
              /* WINNER CARD: CHAMPION COMBO WON! */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#191e2e] to-[#090b10] border-2 border-amber-400 max-w-lg mx-auto animate-in zoom-in-95 duration-300 shadow-[0_0_40px_rgba(245,158,11,0.25)] text-left space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-4xl">🏆</span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                        ¡GRAN CAMPEÓN KNOCKOUT! • {currentMonthName.toUpperCase()}
                      </span>
                      <h4 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
                        ¡CHAMPION COMBO GANADO!
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono font-bold">
                    {spinRecord.ticketCode}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {wonPrize.description}
                </p>

                {/* Verification details table */}
                <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">Cliente:</span>
                    <span className="text-white font-medium truncate block">{spinRecord.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">Documento:</span>
                    <span className="text-white font-medium">{spinRecord.documentId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">WhatsApp Cliente:</span>
                    <span className="text-emerald-400 font-mono text-[11px] truncate block font-semibold">
                      {spinRecord.customerPhone}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">Código Validación:</span>
                    <span className="text-amber-400 font-mono text-[11px] block">{spinRecord.ticketCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">IP Registrada:</span>
                    <span className="text-neutral-300 font-mono text-[11px] truncate block">{spinRecord.ipAddress}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-bold">Mes / Fecha:</span>
                    <span className="text-neutral-300 text-[11px] block">{spinRecord.timestamp}</span>
                  </div>
                </div>

                {/* Actions for WhatsApp Notification & Customer Support */}
                <div className="space-y-3 pt-1">
                  <div>
                    <button
                      type="button"
                      onClick={handleSendKnockoutWhatsAppVerification}
                      className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bebas text-2xl tracking-wider shadow-xl shadow-emerald-950/60 border border-emerald-400/50 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-6 h-6 text-white shrink-0" />
                      <span>ENVIAR AL WHATSAPP DE KNOCKOUT</span>
                    </button>
                    <p className="text-[11px] text-neutral-400 mt-1 text-center">
                      Envía esta notificación con todos tus datos al WhatsApp de Knockout (
                      <span className="text-white font-medium">{restaurantConfig.whatsapp}</span>) para reclamar y redimir tu Champion Combo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleSendCustomerWhatsAppCopy}
                      className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-xs font-bold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Recibir Soporte en mi WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopySupportTicket}
                      className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-xs font-bold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSupport ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado al Portapapeles!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-neutral-400" />
                          <span>Copiar Comprobante Digital</span>
                        </>
                      )}
                    </button>
                  </div>

                  {whatsappSent && (
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 py-2 px-3 rounded-xl border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Notificación enviada al WhatsApp de Knockout. ¡Listo para validar!</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* TRY AGAIN CARD: NO PRIZE THIS MONTH */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#141824] to-[#090b10] border border-white/15 max-w-lg mx-auto animate-in zoom-in-95 duration-300 shadow-2xl text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">🥊</span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block">
                        INTENTO REGISTRADO • {currentMonthName.toUpperCase()}
                      </span>
                      <h4 className="font-bebas text-3xl tracking-wider text-white">
                        VUELVE A INTENTARLO OTRO DÍA
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-neutral-900 border border-white/20 text-neutral-300 font-mono">
                    {spinRecord.ticketCode}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  No obtuviste el Champion Combo en esta ocasión, ¡pero no te desanimes! Recuerda que en KNOCKOUT FAST-FOOD dispones de <strong className="text-white">1 intento cada mes</strong> para ganar.
                </p>

                {/* Monthly renewal box */}
                <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Intento actual:</span>
                    <span className="text-amber-400 font-semibold">{currentMonthName} (Completado)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Próximo intento disponible:</span>
                    <span className="text-emerald-400 font-bold">{nextResetDate}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-neutral-400">IP registrada:</span>
                    <span className="text-neutral-300 font-mono text-[11px]">{spinRecord.ipAddress}</span>
                  </div>
                </div>

                {/* Direct Action: Order Knockout food on WhatsApp */}
                <div className="pt-2 space-y-2">
                  <a
                    href="#menu"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bebas text-xl tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-transform active:scale-95"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>VER MENÚ Y HACER PEDIDO</span>
                  </a>

                  <a
                    href={`https://wa.me/${restaurantConfig.whatsappTechnical}?text=${encodeURIComponent('¡Hola Knockout! Participé en la ruleta mensual y quiero hacer un pedido hoy 🍔🥊')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Pedir Directamente por WhatsApp</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>
              </div>
            )}
          </>
        )}

        {/* Mandatory Rules / Terms */}
        <div className="pt-4 border-t border-white/10 max-w-lg mx-auto text-xs text-neutral-500">
          <p className="font-semibold text-neutral-400 mb-1">CONDICIONES DE LA PROMOCIÓN:</p>
          <p className="italic">
            {prizeWheelTermsPlaceholder} Límite estricto de un (1) intento al mes por persona, dirección IP, número de documento de identidad y número de WhatsApp. El intento se renueva automáticamente el primer día de cada mes calendario. El premio del Champion Combo debe ser verificado por el equipo oficial de KNOCKOUT a través de WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
};
