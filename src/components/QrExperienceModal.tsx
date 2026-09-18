import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { restaurantConfig } from '../data/restaurantConfig';
import { X, QrCode, Copy, Check, ExternalLink } from 'lucide-react';

export const QrExperienceModal: React.FC = () => {
  const { qrModalOpen, setQrModalOpen, tableParam } = useApp();
  const [testTable, setTestTable] = useState(tableParam || '12');
  const [copied, setCopied] = useState(false);

  if (!qrModalOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : restaurantConfig.qrUrl;
  const tableUrl = `${currentOrigin}?table=${encodeURIComponent(testTable)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(tableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenTableUrl = () => {
    window.location.href = tableUrl;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0e121b] border border-white/15 shadow-2xl p-6 sm:p-8 text-center space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setQrModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/60 text-red-400 border border-red-500/40 text-xs font-bold tracking-widest uppercase">
            <span>TABLETOP QR SYSTEM</span>
          </div>
          <h3 className="font-bebas text-4xl tracking-wide text-white">
            ENTER THE FIGHT
          </h3>
          <p className="text-xs text-neutral-400">
            Scan your table QR code to order straight from your seat. Table numbers are automatically detected during checkout.
          </p>
        </div>

        {/* QR Code Graphic Representation */}
        <div className="p-6 rounded-2xl bg-white text-black inline-block shadow-2xl mx-auto">
          <div className="w-48 h-48 flex flex-col items-center justify-center border-4 border-black p-2 relative">
            <QrCode className="w-40 h-40 text-black" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bebas text-sm font-bold shadow border border-white">
                KO
              </div>
            </div>
          </div>
          <span className="font-bebas text-lg tracking-wider text-black block mt-2 font-bold">
            TABLE {testTable || 'ARENA'}
          </span>
        </div>

        {/* Table Number Customizer */}
        <div className="space-y-2 text-left bg-neutral-900 p-4 rounded-xl border border-white/10 text-xs">
          <label htmlFor="qr-table-num" className="font-bold text-neutral-300 uppercase block">
            Simulate Table Number:
          </label>
          <div className="flex gap-2">
            <input
              id="qr-table-num"
              type="text"
              value={testTable}
              onChange={e => setTestTable(e.target.value)}
              placeholder="e.g. 12"
              className="flex-1 px-3 py-2 rounded-lg bg-black border border-white/15 text-white font-bold text-xs focus:border-red-500 focus:outline-none"
            />
            <button
              onClick={handleOpenTableUrl}
              className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bebas text-sm tracking-wider flex items-center gap-1"
            >
              <span>APPLY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copy Link Row */}
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs">
          <span className="truncate text-neutral-400 text-[11px] font-mono">
            {tableUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white shrink-0 text-xs font-bold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
