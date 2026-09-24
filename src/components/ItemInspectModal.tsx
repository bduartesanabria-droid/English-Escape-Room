import React from 'react';
import { InventoryItem } from '../types/game';
import { soundFx } from '../utils/audio';

interface ItemInspectModalProps {
  item: InventoryItem | null;
  onClose: () => void;
}

export const ItemInspectModal: React.FC<ItemInspectModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1d]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#141b2b] border border-[#232a3a] rounded-xl shadow-2xl p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#191f2f]">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[24px] ${
                item.color === 'secondary'
                  ? 'text-[#4edea3]'
                  : item.color === 'tertiary'
                  ? 'text-[#ffb95f]'
                  : 'text-[#4cd7f6]'
              }`}
            >
              {item.icon}
            </span>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#869397] block">
                TACTICAL DECK // ITEM INSPECTOR
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] flex items-center justify-center text-[#869397] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">close</span>
          </button>
        </div>

        {/* Card Artwork / Preview */}
        <div className="w-full h-32 bg-[#070e1d] rounded-lg border border-[#232a3a] p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1 font-mono text-[10px] text-[#4cd7f6] uppercase font-bold">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>AUTH: VERIFIED</span>
            </div>
            {item.cipherId && (
              <span className="font-mono text-[11px] text-[#ffb95f] font-bold">
                {item.cipherId}
              </span>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-[9px] text-[#869397] uppercase block">
                CLASSIFICATION
              </span>
              <span className="font-mono text-xs text-[#dce2f7] font-semibold">
                SECURITY OVERRIDE COMPONENT
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[32px] opacity-80 ${
                item.color === 'secondary'
                  ? 'text-[#4edea3]'
                  : item.color === 'tertiary'
                  ? 'text-[#ffb95f]'
                  : 'text-[#4cd7f6]'
              }`}
            >
              {item.icon}
            </span>
          </div>
        </div>

        {/* Description & Lore */}
        <div className="space-y-2 font-['Inter'] text-xs text-[#bcc9cd]">
          <p className="leading-relaxed text-white font-medium">{item.description}</p>
          <div className="p-2.5 bg-[#070e1d] rounded border border-[#191f2f] font-mono text-[11px] text-[#869397]">
            &gt; LORE: "{item.lore}"
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#191f2f] flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-white font-['Plus_Jakarta_Sans'] font-semibold text-xs transition-colors"
          >
            Return to Deck
          </button>
        </div>
      </div>
    </div>
  );
};
