import React, { useState } from 'react';
import { soundFx } from '../utils/audio';

interface GrammarCodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopicIndex?: number;
}

export const GrammarCodexModal: React.FC<GrammarCodexModalProps> = ({
  isOpen,
  onClose,
  defaultTopicIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTopicIndex);

  if (!isOpen) return null;

  const topics = [
    {
      title: "01. 'To Be' & Daily Routines",
      subtitle: "Present Simple & Subject-Verb Agreement",
      color: "#4cd7f6",
      content: (
        <div className="space-y-4">
          <div className="bg-[#070e1d] p-3.5 rounded-lg border border-[#232a3a]">
            <h4 className="text-[#4cd7f6] font-bold text-sm font-mono mb-1">
              RULE: 3rd-Person Singular Inflection (-s / -es)
            </h4>
            <p className="text-xs text-[#bcc9cd] leading-relaxed">
              When the subject is third-person singular (<strong className="text-white">He, She, It, Dr. Aris, The Vault</strong>), we add <strong className="text-[#4edea3]">-s</strong> or <strong className="text-[#4edea3]">-es</strong> to the base verb.
            </p>
            <div className="mt-2 text-xs font-mono text-[#dce2f7] space-y-1">
              <p>• He <span className="text-[#4edea3] font-bold">works</span> in the archive daily. (NOT: He work)</p>
              <p>• She <span className="text-[#4edea3] font-bold">watches</span> the monitors every hour.</p>
              <p>• The system <span className="text-[#4edea3] font-bold">studies</span> linguistics data.</p>
            </div>
          </div>

          <div className="bg-[#070e1d] p-3.5 rounded-lg border border-[#232a3a]">
            <h4 className="text-[#ffb95f] font-bold text-sm font-mono mb-1">
              RULE: Verb 'To Be' Agreement (am / is / are)
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono mt-1 text-center">
              <div className="bg-[#191f2f] p-2 rounded border border-[#232a3a]">
                <div className="text-[#869397]">I</div>
                <div className="text-[#4cd7f6] font-bold mt-0.5">am</div>
              </div>
              <div className="bg-[#191f2f] p-2 rounded border border-[#232a3a]">
                <div className="text-[#869397]">He / She / It</div>
                <div className="text-[#ffb95f] font-bold mt-0.5">is</div>
              </div>
              <div className="bg-[#191f2f] p-2 rounded border border-[#232a3a]">
                <div className="text-[#869397]">We / You / They / Gates</div>
                <div className="text-[#4edea3] font-bold mt-0.5">are</div>
              </div>
            </div>
            <p className="text-xs text-[#869397] mt-2 italic">
              Watch out for plural nouns: "The gates <span className="text-[#4edea3] font-bold">are</span> locked" (gates = they).
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "02. Past Simple vs. Continuous",
      subtitle: "Finished Past Events vs. Live In-Progress Actions",
      color: "#4edea3",
      content: (
        <div className="space-y-4">
          <div className="bg-[#070e1d] p-3.5 rounded-lg border border-[#232a3a]">
            <h4 className="text-[#4edea3] font-bold text-sm font-mono mb-1">
              CONTRAST: Time Signal Markers
            </h4>
            <p className="text-xs text-[#bcc9cd] leading-relaxed">
              Match your verb tense to the chronological context marker in the sentence:
            </p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-[#191f2f] p-2.5 rounded border border-[#232a3a]">
                <div className="text-[#ffb95f] font-bold">PAST SIMPLE</div>
                <div className="text-[#869397] text-[11px]">yesterday, last night, in 2024</div>
                <div className="text-[#dce2f7] mt-1 font-semibold">"The pipe <span className="text-[#ffb95f]">burst</span> yesterday."</div>
              </div>
              <div className="bg-[#191f2f] p-2.5 rounded border border-[#232a3a]">
                <div className="text-[#4cd7f6] font-bold">PRESENT CONTINUOUS</div>
                <div className="text-[#869397] text-[11px]">right now, currently, at the moment</div>
                <div className="text-[#dce2f7] mt-1 font-semibold">"Coolant <span className="text-[#4cd7f6]">is flowing</span> now."</div>
              </div>
            </div>
          </div>

          <div className="bg-[#070e1d] p-3.5 rounded-lg border border-[#232a3a]">
            <h4 className="text-[#ffb4ab] font-bold text-sm font-mono mb-1">
              RULE: Interrupted Actions (While + Continuous)
            </h4>
            <p className="text-xs text-[#bcc9cd] leading-relaxed">
              When a long background action was already in progress and got interrupted by a sudden event:
            </p>
            <div className="mt-2 text-xs font-mono text-[#dce2f7] bg-[#191f2f] p-2 rounded border border-[#232a3a]">
              "While the technician <span className="text-[#4cd7f6] font-bold">was repairing</span> the unit, the siren <span className="text-[#ff5449] font-bold">sounded</span>."
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "03. Modal Verbs",
      subtitle: "Must Not vs. Should vs. Don't Have To",
      color: "#ffb95f",
      content: (
        <div className="space-y-4">
          <div className="bg-[#070e1d] p-3.5 rounded-lg border border-[#232a3a]">
            <h4 className="text-[#ffb95f] font-bold text-sm font-mono mb-1">
              CORE MODAL DIRECTIVES
            </h4>
            <div className="space-y-2 text-xs font-mono mt-2">
              <div className="flex items-start gap-2 bg-[#191f2f] p-2 rounded border border-[#ff5449]/30">
                <span className="text-[#ff5449] font-bold w-28 flex-shrink-0">MUST NOT</span>
                <span className="text-[#bcc9cd]">Strict prohibition! It is forbidden & dangerous. (e.g. "You must not touch high-voltage wires.")</span>
              </div>
              <div className="flex items-start gap-2 bg-[#191f2f] p-2 rounded border border-[#4cd7f6]/30">
                <span className="text-[#4cd7f6] font-bold w-28 flex-shrink-0">SHOULD</span>
                <span className="text-[#bcc9cd]">Friendly advice or safe recommendation. (e.g. "You should wear goggles.")</span>
              </div>
              <div className="flex items-start gap-2 bg-[#191f2f] p-2 rounded border border-[#4edea3]/30">
                <span className="text-[#4edea3] font-bold w-28 flex-shrink-0">DON'T HAVE TO</span>
                <span className="text-[#bcc9cd]">No obligation; optional. (e.g. "You don't have to restart if the backup is running.")</span>
              </div>
            </div>
          </div>

          <div className="bg-[#070e1d] p-3 rounded-lg border border-[#ffb4ab]/30 text-xs text-[#ffdad6]">
            <strong>CRITICAL RULE:</strong> Modal verbs are followed directly by the <strong className="text-white">bare infinitive</strong> (base verb without 'to'). Never write "must to go" or "can to see".
          </div>
        </div>
      ),
    },
    {
      title: "04. Conditionals & Directives",
      subtitle: "First Conditional & Imperatives for Emergency Action",
      color: "#4cd7f6",
      content: (
        <div className="space-y-4">
          <div className="bg-[#070e1d] p-3.5 rounded-lg border border-[#232a3a]">
            <h4 className="text-[#4cd7f6] font-bold text-sm font-mono mb-1">
              FIRST CONDITIONAL FORMULA
            </h4>
            <p className="text-xs text-[#bcc9cd] leading-relaxed">
              Used for real, probable future situations and emergency directives:
            </p>
            <div className="mt-2 p-2.5 bg-[#191f2f] rounded border border-[#232a3a] font-mono text-xs">
              <div className="text-[#ffb95f] font-bold">IF-Clause: If + Present Simple (Subject + Verb-s)</div>
              <div className="text-[#4edea3] font-bold mt-1">MAIN-Clause: Imperative (Base Verb) OR will + Base Verb</div>
            </div>
            <div className="mt-2 text-xs font-mono text-[#dce2f7]">
              "If the cabin pressure <span className="text-[#ffb95f] font-bold">drops</span>, immediately <span className="text-[#4edea3] font-bold">pull</span> the lever."
            </div>
          </div>

          <div className="bg-[#070e1d] p-3 rounded-lg border border-[#ff5449]/30 text-xs text-[#ffb4ab]">
            <strong>AVOID THIS PITFALL:</strong> Never use "will" in the IF-clause! <br />
            <span className="line-through text-[#869397]">"If it will rain..."</span> → <span className="text-[#4edea3] font-bold">"If it rains..."</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1d]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#141b2b] border border-[#232a3a] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#191f2f] border-b border-[#232a3a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">menu_book</span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white">
                Tactical Linguistic Codex
              </h3>
              <p className="font-mono text-[10px] text-[#869397]">
                Cipher Labs English Pedagogical Grammar Reference
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-[#232a3a] hover:bg-[#2e3545] border border-[#3d494c] flex items-center justify-center text-[#869397] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">close</span>
          </button>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex items-center gap-1 p-2 bg-[#0c1322] border-b border-[#191f2f] overflow-x-auto">
          {topics.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab(idx);
              }}
              className={`px-3 py-1.5 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === idx
                  ? 'bg-[#191f2f] text-[#4cd7f6] border border-[#4cd7f6]/40 shadow-sm'
                  : 'text-[#869397] hover:text-[#dce2f7] hover:bg-[#141b2b]'
              }`}
            >
              {t.title.split('.')[1].trim()}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto flex-1 font-['Inter']">
          <div className="mb-3">
            <h4 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
              {topics[activeTab].title}
            </h4>
            <p className="text-xs text-[#869397] font-mono mt-0.5">
              {topics[activeTab].subtitle}
            </p>
          </div>

          {topics[activeTab].content}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#070e1d] border-t border-[#191f2f] flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#869397]">
            Available in Tactical Deck Slot 01 anytime
          </span>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#06b6d4] hover:bg-[#4cd7f6] text-[#003640] hover:text-black font-['Plus_Jakarta_Sans'] font-bold text-xs transition-colors shadow-sm"
          >
            Close Codex
          </button>
        </div>
      </div>
    </div>
  );
};
