import React, { useState } from 'react';
import { Puzzle, RoomData, EvaluationResponse } from '../types/game';
import { soundFx } from '../utils/audio';

interface CipherDecoderScreenProps {
  puzzle: Puzzle;
  currentRoom: RoomData;
  onReturnToVault: () => void;
  onSuccessProceed: () => void;
  onRequestHint: () => void;
  hintsRemaining: number;
  attempts: number;
  evaluationResult: EvaluationResponse | null;
  onEvaluate: (selectedOptionId: string) => Promise<void>;
  isEvaluating: boolean;
}

export const CipherDecoderScreen: React.FC<CipherDecoderScreenProps> = ({
  puzzle,
  currentRoom,
  onReturnToVault,
  onSuccessProceed,
  onRequestHint,
  hintsRemaining,
  attempts,
  evaluationResult,
  onEvaluate,
  isEvaluating,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [failedOptionIds, setFailedOptionIds] = useState<string[]>([]);
  const [shakeKey, setShakeKey] = useState<number>(0);

  const isSolved = evaluationResult?.isCorrect === true;

  const handleSelect = (optionId: string) => {
    if (isSolved || isEvaluating) return;
    soundFx.playClick();
    setSelectedOptionId(optionId);
  };

  const handleSubmit = async () => {
    if (!selectedOptionId || isEvaluating) return;

    await onEvaluate(selectedOptionId);

    // If answer is incorrect
    if (selectedOptionId !== puzzle.correctOptionId) {
      soundFx.playError();
      setFailedOptionIds((prev) => Array.from(new Set([...prev, selectedOptionId])));
      setShakeKey((prev) => prev + 1);
    } else {
      soundFx.playSuccess();
    }
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto py-2 flex flex-col items-center justify-center">
      {/* Top Telemetry Micro-Indicator */}
      <div className="w-full flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isSolved ? 'bg-[#4edea3] shadow-[0_0_10px_#4edea3] animate-pulse' : 'bg-[#ff5449] animate-ping'
            }`}
          ></span>
          <span
            className={`font-mono text-[11px] tracking-wider uppercase font-bold ${
              isSolved ? 'text-[#4edea3]' : 'text-[#ff5449]'
            }`}
          >
            {isSolved
              ? 'NODE: DECRYPT_RESOLVED // SYNTAX_VERIFIED'
              : 'Terminal Lockout Imminent // Breach Protocol Active'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#869397]">
          <span>SECURITY_LEVEL:</span>
          <span className="text-[#ffb95f] font-bold">OMEGA-{currentRoom.index + 1}</span>
          <span className="text-[#3d494c]">|</span>
          <span>NODE:</span>
          <span className="text-[#4cd7f6] font-bold">{currentRoom.locationName}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CASE 1: SUCCESS STATE (ACCESS GRANTED // GRAMMATICALLY ACCURATE) */}
      {/* ======================================================== */}
      {isSolved ? (
        <div className="w-full bg-[#141b2b]/95 border border-[#4edea3]/40 backdrop-blur-2xl rounded-xl shadow-[0_0_60px_rgba(78,222,163,0.18)] p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Top Luminous Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4edea3] to-transparent shadow-[0_0_12px_#4edea3]"></div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">lock_open</span>
                <span className="font-mono text-[11px] text-[#4edea3] uppercase font-bold tracking-widest">
                  SECURITY TERMINAL // TERMINAL OVERRIDE GRANTED
                </span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl sm:text-3xl text-[#dce2f7] tracking-tight">
                Vault Protocol Decrypted
              </h1>
            </div>

            {/* Mastery Gauge */}
            <div className="flex items-center gap-3 bg-[#191f2f] border border-[#232a3a] px-4 py-2.5 rounded-lg self-start md:self-auto">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                  <circle
                    className="text-[#2e3545]"
                    cx="22"
                    cy="22"
                    fill="none"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <circle
                    className="text-[#4edea3] transition-all duration-1000"
                    cx="22"
                    cy="22"
                    fill="none"
                    r="18"
                    stroke="currentColor"
                    strokeDasharray="113.1"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-bold text-[#4edea3]">100%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase text-[#869397] tracking-wider">
                  Grammar Mastery
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#4edea3] font-bold">
                  Room {currentRoom.index + 1} Fully Mastered
                </span>
              </div>
            </div>
          </div>

          {/* Central Animated Badge */}
          <div className="flex flex-col items-center justify-center text-center py-2">
            <div className="relative flex items-center justify-center w-20 h-20 mb-2">
              <div className="absolute inset-0 rounded-full bg-[#4edea3]/20 animate-ping"></div>
              <div className="absolute -inset-2 rounded-full bg-[#4edea3]/10 blur-md"></div>
              <div className="relative w-16 h-16 rounded-full bg-[#00a572] flex items-center justify-center shadow-[0_0_30px_rgba(78,222,163,0.5)]">
                <span className="material-symbols-outlined text-[36px] text-[#00311f] font-bold">
                  check
                </span>
              </div>
            </div>
            <span className="font-mono text-base sm:text-lg text-[#4edea3] font-bold tracking-widest uppercase">
              ACCESS GRANTED // GRAMMATICALLY ACCURATE
            </span>
            <span className="font-mono text-[11px] text-[#869397] mt-0.5">
              LINGUISTIC SYNTAX PARSING: 0 ERRORS DETECTED
            </span>
          </div>

          {/* Solved Sentence Display */}
          <div className="bg-[#191f2f] border border-[#232a3a] px-5 py-4 rounded-xl flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#4cd7f6] uppercase font-bold tracking-wider">
                Target Sentence Structure [{currentRoom.grammarTopic}]
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#4edea3] bg-[#232a3a] px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px]">done_all</span> Verified 100% Correct
              </span>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#dce2f7] leading-relaxed">
              “{puzzle.solvedSentence.part1}{' '}
              <span className="text-[#4cd7f6] font-bold underline decoration-[#4cd7f6]">
                {puzzle.solvedSentence.highlight1}
              </span>{' '}
              {puzzle.solvedSentence.part2}{' '}
              {puzzle.solvedSentence.highlight2 && (
                <span className="text-[#4edea3] font-bold underline decoration-[#4edea3]">
                  {puzzle.solvedSentence.highlight2}
                </span>
              )}
              {puzzle.solvedSentence.part3 || ''}”
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px] text-[#bcc9cd]">
              {puzzle.sentenceBreakdown.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.color === 'primary'
                        ? 'bg-[#4cd7f6]'
                        : item.color === 'secondary'
                        ? 'bg-[#4edea3]'
                        : 'bg-[#ffb95f]'
                    }`}
                  ></span>
                  <span>
                    {item.label}:{' '}
                    <strong className="text-white font-mono">{item.value}</strong> ({item.type})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Showcase Card */}
          <div className="bg-[#232a3a] border border-[#3d494c] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#4cd7f6]/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Keycard Visual */}
            <div className="relative w-40 h-24 bg-[#070e1d] rounded-lg p-2.5 flex flex-col justify-between border border-[#4cd7f6]/40 shadow-[0_0_24px_rgba(6,182,212,0.3)] flex-shrink-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">contactless</span>
                  <span className="font-mono text-[9px] text-[#4cd7f6] tracking-widest uppercase font-bold">
                    {puzzle.unlockedItem.cipherId || 'SEC_PASS'}
                  </span>
                </div>
                <div className="w-5 h-4 border border-[#ffb95f] rounded-sm flex items-center justify-center text-[#ffb95f] text-[9px] font-mono">
                  CHIP
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-[#869397] uppercase">CIPHER ID</span>
                  <span className="font-mono text-[11px] text-[#dce2f7] font-bold">
                    {puzzle.unlockedItem.cipherId || '#CC-9021'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">badge</span>
              </div>
            </div>

            {/* Description & Loot Details */}
            <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold tracking-wider">
                  NEW ITEM ACQUIRED
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#4edea3] bg-[#191f2f] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span> Added to Tactical Deck Slot {currentRoom.index + 2}
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#dce2f7] font-bold">
                {puzzle.unlockedItem.title}
              </h2>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#bcc9cd]">
                {puzzle.unlockedItem.description}
              </p>
            </div>
          </div>

          {/* Action Footer Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-[#869397] font-mono text-[11px]">
              <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">info</span>
              <span>Room Objective {currentRoom.index + 1}/4 Cleared • Tactical Deck Updated</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onReturnToVault();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#191f2f] hover:bg-[#2e3545] border border-[#232a3a] text-[#dce2f7] font-['Plus_Jakarta_Sans'] font-semibold text-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">backpack</span>
                <span>Equip & Inspect Room</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playUnlock();
                  onSuccessProceed();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] font-['Plus_Jakarta_Sans'] font-bold text-xs shadow-[0_0_20px_rgba(78,222,163,0.45)] hover:shadow-[0_0_30px_rgba(78,222,163,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{currentRoom.index === 3 ? 'Proceed to Extraction Extraction' : 'Proceed to Next Sector'}</span>
                <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* CASE 2: ACTIVE QUESTION / VERIFICATION SCREEN */
        /* ======================================================== */
        <div
          key={shakeKey}
          className="w-full bg-[#141b2b]/95 border border-[#232a3a] rounded-xl shadow-2xl overflow-hidden flex flex-col relative transition-all duration-300"
        >
          {/* Luminous Accent Top Border */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#ff5449] via-[#e79400] to-[#ff5449]"></div>

          {/* Modal Header Bar */}
          <div className="px-6 py-4 bg-[#232a3a]/80 border-b border-[#3d494c]/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ff5449]/20 border border-[#ff5449]/40 flex items-center justify-center text-[#ff5449]">
                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-[#ff5449] font-bold uppercase">
                    SECURITY TERMINAL
                  </span>
                  <span className="text-[#3d494c] font-mono text-[10px]">//</span>
                  <span className="font-mono text-[10px] text-[#869397] uppercase">
                    {puzzle.code}
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#dce2f7] tracking-tight">
                  {puzzle.title}
                </h2>
              </div>
            </div>

            {/* Status Pill */}
            {failedOptionIds.length > 0 ? (
              <div className="flex items-center gap-1.5 bg-[#93000a]/80 border border-[#ffb4ab]/40 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[#ffdad6] text-[16px] animate-pulse">
                  report_problem
                </span>
                <span className="font-mono text-[10px] text-[#ffdad6] uppercase font-bold tracking-wide">
                  Verification Failed (Attempt {attempts}/3)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-[#191f2f] border border-[#232a3a] px-3 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-[#ffb95f] animate-pulse"></span>
                <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold tracking-wide">
                  Awaiting Input
                </span>
              </div>
            )}
          </div>

          {/* Main Puzzle Content Canvas */}
          <div className="p-6 flex flex-col gap-5">
            {/* Question Prompt Unit */}
            <div className="bg-[#2e3545]/40 border border-[#3d494c]/60 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#4cd7f6] uppercase font-bold tracking-wider">
                  Calibration Prompt
                </span>
                <span className="font-mono text-[10px] text-[#869397]">
                  FREQUENCY: {puzzle.frequency}
                </span>
              </div>
              <p className="font-['Inter'] text-sm text-[#bcc9cd]">
                Select the grammatically correct sentence structure to calibrate the frequency generator:
              </p>

              <div className="mt-1 p-4 bg-[#070e1d]/90 border border-[#191f2f] rounded-lg text-left">
                <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#dce2f7] tracking-wide leading-relaxed">
                  {puzzle.promptSentence}
                </p>
              </div>
            </div>

            {/* Multiple Choice Selection Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="font-mono text-[11px] text-[#869397] uppercase font-semibold">
                  Decryption Candidates
                </span>
                {failedOptionIds.length > 0 && (
                  <span className="font-mono text-[11px] text-[#ff5449]">
                    {failedOptionIds.length} INCORRECT LOGGED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {puzzle.options.map((option) => {
                  const isFailed = failedOptionIds.includes(option.id);
                  const isSelected = selectedOptionId === option.id;

                  if (isFailed) {
                    return (
                      <div
                        key={option.id}
                        className="relative bg-[#93000a]/30 border border-[#ff5449] rounded-xl p-3.5 flex items-center justify-between select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#ff5449] text-black flex items-center justify-center font-mono font-bold text-sm">
                            {option.label}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-base text-[#ffb4ab] font-bold line-through opacity-85">
                              {option.text}
                            </span>
                            <span className="font-mono text-[10px] text-[#ff5449] font-bold">
                              {option.errorNote || 'SYNTAX_ERROR: AGREEMENT_MISMATCH'}
                            </span>
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#ff5449] text-black flex items-center justify-center shadow-md">
                          <span className="material-symbols-outlined text-[16px] font-bold">close</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={`group cursor-pointer rounded-xl p-3.5 flex items-center justify-between transition-all duration-200 border ${
                        isSelected
                          ? 'bg-[#191f2f] border-[#4cd7f6] shadow-[0_0_16px_rgba(76,215,246,0.3)] scale-[1.01]'
                          : 'bg-[#191f2f]/80 border-[#232a3a] hover:bg-[#232a3a] hover:border-[#3d494c]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-colors ${
                            isSelected
                              ? 'bg-[#4cd7f6] text-[#003640]'
                              : 'bg-[#2e3545] text-[#bcc9cd] group-hover:bg-[#4cd7f6] group-hover:text-[#003640]'
                          }`}
                        >
                          {option.label}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`font-mono text-base font-semibold transition-colors ${
                              isSelected
                                ? 'text-[#4cd7f6]'
                                : 'text-[#dce2f7] group-hover:text-[#4cd7f6]'
                            }`}
                          >
                            {option.text}
                          </span>
                          <span className="font-mono text-[10px] text-[#869397]">
                            {option.errorNote || 'Candidate Pattern'}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#06b6d4] text-[#003640]'
                            : 'bg-[#2e3545] text-[#869397] group-hover:bg-[#4cd7f6] group-hover:text-[#003640]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {isSelected ? 'check' : 'arrow_forward'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pedagogical 'Grammar Helper' Callout Banner (Crucial Requirement) */}
            {failedOptionIds.length > 0 && (
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#232a3a] via-[#191f2f] to-[#232a3a] border border-[#ffb95f]/30 p-4 shadow-xl flex flex-col gap-2 animate-fadeIn">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#ffb95f]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e79400]/20 border border-[#ffb95f]/40 text-[#ffb95f] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#ffb95f] font-bold uppercase tracking-wider">
                        Pedagogical Grammar Alert
                      </span>
                      <span className="text-[#3d494c]">•</span>
                      <span className="font-mono text-[11px] text-[#bcc9cd]">
                        {puzzle.pedagogicalRuleTitle}
                      </span>
                    </div>

                    <p className="font-['Inter'] text-xs sm:text-sm text-[#dce2f7] leading-relaxed mt-1">
                      {evaluationResult?.feedbackMessage || puzzle.pedagogicalExplanation}
                    </p>

                    {/* Algorithmic Rule Formula Strip */}
                    <div className="mt-2 p-2 rounded-lg bg-[#070e1d]/80 border border-[#191f2f] flex flex-wrap items-center gap-2 font-mono text-[11px]">
                      <span className="text-[#869397] uppercase font-bold">Syntax Blueprint:</span>
                      <span className="text-[#ffb95f] font-bold bg-[#191f2f] px-2 py-0.5 rounded border border-[#ffb95f]/30">
                        {puzzle.syntaxBlueprint.rulePart1}
                      </span>
                      <span className="text-[#869397] font-bold">
                        {puzzle.syntaxBlueprint.operator || '+'}
                      </span>
                      <span className="text-[#4cd7f6] font-bold bg-[#191f2f] px-2 py-0.5 rounded border border-[#4cd7f6]/30">
                        {puzzle.syntaxBlueprint.rulePart2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Interactive Footer Controls */}
          <div className="px-6 py-4 bg-[#070e1d]/90 border-t border-[#191f2f] flex flex-wrap items-center justify-between gap-3">
            {/* Left: Secondary Clue Assist */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onRequestHint();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#ffb95f] transition-all font-['Plus_Jakarta_Sans'] font-semibold text-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">psychology_alt</span>
              <span>
                Ask for Pedagogical Clue <span className="text-[#869397] font-mono">({hintsRemaining}/2 Remaining)</span>
              </span>
            </button>

            {/* Right: Action Buttons Group */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onReturnToVault();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#bcc9cd] hover:text-white transition-all font-['Plus_Jakarta_Sans'] text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[17px]">logout</span>
                <span>Return to Vault</span>
              </button>

              <button
                type="button"
                disabled={!selectedOptionId || isEvaluating}
                onClick={handleSubmit}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-lg font-['Plus_Jakarta_Sans'] font-bold text-xs transition-all shadow-lg ${
                  !selectedOptionId || isEvaluating
                    ? 'bg-[#191f2f] text-[#869397] border border-[#232a3a] cursor-not-allowed opacity-50'
                    : 'bg-[#06b6d4] hover:bg-[#4cd7f6] text-[#003640] hover:text-black shadow-[0_0_16px_rgba(6,182,212,0.35)] active:scale-98'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#003640] border-t-transparent rounded-full animate-spin"></span>
                    <span>AI Verifying...</span>
                  </>
                ) : failedOptionIds.length > 0 ? (
                  <>
                    <span className="material-symbols-outlined text-[17px]">replay</span>
                    <span>Try Again</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[17px]">send</span>
                    <span>Authorize Calibration</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Log Data Feed */}
      <div className="w-full mt-3 flex items-center justify-between px-2 font-mono text-[10px] text-[#869397]">
        <div className="flex items-center gap-2">
          <span>LOG // ERR_CODE: #0x8892</span>
          <span className="text-[#3d494c]">•</span>
          <span>LATENCY: 14ms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${isSolved ? 'bg-[#4edea3]' : 'bg-[#ff5449]'}`}
          ></span>
          <span className={isSolved ? 'text-[#4edea3] uppercase' : 'text-[#ff5449] uppercase'}>
            {isSolved ? 'Frequency Generator Calibrated' : 'Frequency Calibrator Misaligned'}
          </span>
        </div>
      </div>
    </div>
  );
};
