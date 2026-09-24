import React from 'react';
import { Hotspot } from '../types/game';
import { soundFx } from '../utils/audio';

interface ClueModalProps {
  hotspot: Hotspot | null;
  onClose: () => void;
  onOpenDecoder?: () => void;
}

export const ClueModal: React.FC<ClueModalProps> = ({
  hotspot,
  onClose,
  onOpenDecoder,
}) => {
  if (!hotspot) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1d]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141b2b] border border-[#232a3a] p-5 sm:p-6 rounded-xl shadow-2xl flex flex-col gap-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#191f2f]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">
              {hotspot.icon}
            </span>
            <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-wider font-bold">
              {hotspot.modalTag}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] flex items-center justify-center text-[#869397] hover:text-[#dce2f7] transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="font-['Inter'] text-sm text-[#bcc9cd] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: hotspot.contentHtml }}
        />

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#191f2f]">
          <span className="font-mono text-[11px] text-[#ffb95f]">
            HINT: {hotspot.hint}
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {hotspot.actionType === 'puzzle' && onOpenDecoder && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                  onOpenDecoder();
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-[#06b6d4] hover:bg-[#4cd7f6] text-[#003640] hover:text-black font-['Plus_Jakarta_Sans'] font-bold text-xs rounded-lg transition-colors shadow-md"
              >
                Launch Cipher Terminal
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#dce2f7] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-lg transition-colors"
            >
              Acknowledge & Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
