import React from 'react';
import { InventoryItem } from '../types/game';
import { soundFx } from '../utils/audio';

interface FooterTacticalDeckProps {
  inventory: InventoryItem[];
  selectedItem: InventoryItem | null;
  onSelectItem: (item: InventoryItem) => void;
  onInspect: () => void;
  onRequestHint: () => void;
  hintsRemaining: number;
}

export const FooterTacticalDeck: React.FC<FooterTacticalDeckProps> = ({
  inventory,
  selectedItem,
  onSelectItem,
  onInspect,
  onRequestHint,
  hintsRemaining,
}) => {
  const maxSlots = 6;
  const emptySlotsCount = Math.max(0, maxSlots - inventory.length);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#070e1d]/85 backdrop-blur-xl border-t border-[#191f2f]/80 shadow-[0_-1px_8px_rgba(0,0,0,0.3)]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        {/* Left: Tactical Deck Label */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-[#869397]">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">backpack</span>
          <span className="uppercase font-bold tracking-widest text-[#dce2f7]">Tactical Deck</span>
        </div>

        {/* Center: Inventory Slots */}
        <div className="flex-1 flex items-center justify-center gap-2.5 overflow-x-auto py-1">
          {inventory.map((item, idx) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectItem(item);
                }}
                className={`relative flex-shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group ${
                  isSelected
                    ? 'bg-[#191f2f] border-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.3)] scale-105'
                    : 'bg-[#141b2b] border-[#232a3a] hover:border-[#3d494c] hover:bg-[#191f2f]'
                }`}
                title={`${item.title} - Click to Inspect`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] sm:text-[22px] ${
                    item.color === 'secondary'
                      ? 'text-[#4edea3]'
                      : item.color === 'tertiary'
                      ? 'text-[#ffb95f]'
                      : 'text-[#4cd7f6]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-mono text-[9px] text-[#bcc9cd] truncate max-w-[48px] leading-tight mt-0.5">
                  {item.name}
                </span>

                {/* Equipped green dot for active tool */}
                {idx === 0 && (
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#4edea3] rounded-full ring-2 ring-[#070e1d] shadow-[0_0_6px_#4edea3]"></div>
                )}
              </div>
            );
          })}

          {/* Empty placeholders */}
          {Array.from({ length: emptySlotsCount }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex-shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#141b2b]/40 border border-[#191f2f]/60 flex items-center justify-center opacity-30 select-none"
            >
              <span className="font-mono text-[9px] text-[#869397]">
                SLOT 0{inventory.length + i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onInspect();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#4cd7f6] hover:text-[#dce2f7] transition-colors font-['Plus_Jakarta_Sans'] font-semibold text-[12px]"
          >
            <span className="material-symbols-outlined text-[17px]">search</span>
            <span className="hidden sm:inline">Inspect</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onRequestHint();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e79400] hover:bg-[#ffb95f] text-[#2a1700] hover:text-black transition-colors font-['Plus_Jakarta_Sans'] font-bold text-[12px] shadow-[0_0_12px_rgba(231,148,0,0.35)]"
          >
            <span className="material-symbols-outlined text-[17px]">lightbulb</span>
            <span className="hidden sm:inline">Hint ({hintsRemaining})</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
