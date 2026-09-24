import React from 'react';
import { soundFx } from '../utils/audio';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hintText: string | null;
  ruleText: string | null;
  isLoading: boolean;
  hintsRemaining: number;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  hintText,
  ruleText,
  isLoading,
  hintsRemaining,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1d]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141b2b] border border-[#ffb95f]/40 rounded-xl shadow-2xl p-5 sm:p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#191f2f]">
          <div className="flex items-center gap-2 text-[#ffb95f]">
            <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#869397] block">
                AI GAME MASTER & PEDAGOGICAL TUTOR
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white leading-tight">
                Linguistic Guidance Clue
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

        {/* Content */}
        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-[#ffb95f] border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-xs text-[#bcc9cd]">
              AI Game Master decrypting linguistic clue...
            </span>
          </div>
        ) : (
          <div className="space-y-3 font-['Inter']">
            <div className="p-3.5 bg-[#070e1d] rounded-lg border border-[#232a3a]">
              <span className="font-mono text-[10px] text-[#ffb95f] font-bold uppercase block mb-1">
                PROGRESSIVE CLUE:
              </span>
              <p className="text-sm text-[#dce2f7] leading-relaxed italic">
                “{hintText || 'Observe the subject of the sentence and notice the temporal markers.'}”
              </p>
            </div>

            {ruleText && (
              <div className="p-3 bg-[#191f2f] rounded-lg border border-[#3d494c]/60">
                <span className="font-mono text-[10px] text-[#4cd7f6] font-bold uppercase block mb-0.5">
                  PEDAGOGICAL RULE FOCUS:
                </span>
                <p className="text-xs text-[#bcc9cd] leading-relaxed">{ruleText}</p>
              </div>
            )}

            <div className="font-mono text-[10px] text-[#869397] flex items-center justify-between pt-1">
              <span>Hints remaining in sector: <strong className="text-[#ffb95f]">{hintsRemaining}</strong></span>
              <span>Tone: Pedagogical & Mysterious</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-[#191f2f] flex justify-end">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#06b6d4] hover:bg-[#4cd7f6] text-[#003640] hover:text-black font-['Plus_Jakarta_Sans'] font-bold text-xs transition-colors shadow-sm"
          >
            Acknowledge & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
