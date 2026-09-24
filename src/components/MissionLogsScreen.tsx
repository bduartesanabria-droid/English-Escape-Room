import React, { useState } from 'react';
import { RoomData } from '../types/game';
import { soundFx } from '../utils/audio';

interface MissionLogsScreenProps {
  rooms: RoomData[];
  roomsCompleted: boolean[];
  elapsedSeconds: number;
  totalAttempts: number;
  hintsUsed: number;
  onResetGame: () => void;
  onOpenCodex: () => void;
}

export const MissionLogsScreen: React.FC<MissionLogsScreenProps> = ({
  rooms,
  roomsCompleted,
  elapsedSeconds,
  totalAttempts,
  hintsUsed,
  onResetGame,
  onOpenCodex,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedCount = roomsCompleted.filter(Boolean).length;
  const isAllComplete = completedCount === 4;

  const handleDownloadReport = () => {
    soundFx.playClick();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      soundFx.playSuccess();

      // Generate a downloadable text/markdown summary report
      const reportText = `=====================================================
CIPHER LABS // LINGUISTIC ESCAPE MISSION REPORT
=====================================================
Status: ${isAllComplete ? 'MISSION ACCOMPLISHED (RANK S)' : 'IN PROGRESS'}
Date: ${new Date().toISOString().split('T')[0]}
Candidate Clearances: CEFR A2 -> B1 Certified
Total Elapsed Time: ${formatTime(elapsedSeconds)}
Total Attempts Logged: ${totalAttempts}
Tactical Hints Consumed: ${hintsUsed} / 8

PEDAGOGICAL COMPETENCIES CERTIFIED:
- Room 01: Verb 'To Be' & Daily Routines (100% Mastery)
- Room 02: Past Simple vs. Present Continuous (95% Mastery)
- Room 03: Modal Verbs: Obligation & Prohibition (90% Mastery)
- Room 04: Conditionals & Imperative Directives (100% Mastery)

VERIFICATION SEED: #CL-8841-B
CRYPTOGRAPHIC CREDENTIAL ID: CIPHER-2025-X71
ISSUING ENGINE: AI Game Master & Pedagogical Tutor (Google AI Studio)
=====================================================`;

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Linguistic_Escape_Dossier.txt';
      link.click();
      URL.revokeObjectURL(url);
    }, 900);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-4">
      {/* Background radial glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-[#4edea3]/15 via-[#06b6d4]/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="relative w-full rounded-xl bg-[#141b2b]/90 border border-[#232a3a] shadow-2xl backdrop-blur-2xl overflow-hidden p-4 sm:p-7">
        {/* Atmospheric Header Banner */}
        <div className="relative rounded-lg overflow-hidden h-44 sm:h-52 w-full mb-6 flex flex-col justify-end p-4 sm:p-6 shadow-inner bg-gradient-to-r from-[#070e1d] via-[#0c1322] to-[#141b2b] border border-[#232a3a]">
          {/* Subtle neon beams */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#4edea3_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#4edea3]/10 to-transparent"></div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#232a3a]/80 backdrop-blur-md px-3 py-1 rounded-full mb-2 border border-[#3d494c]">
                <span className="material-symbols-outlined text-[#4edea3] text-[16px]">
                  military_tech
                </span>
                <span className="font-mono text-[10px] uppercase text-[#4edea3] font-bold tracking-widest">
                  Debrief Telemetry // Code: EXT-99
                </span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl sm:text-3xl text-[#dce2f7] tracking-tight">
                MISSION ACCOMPLISHED:{' '}
                <span className="text-[#4cd7f6]">EXTRACTION MASTER</span>
              </h1>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#bcc9cd] max-w-xl mt-1">
                You cracked all 4 security vaults, decrypted linguistic protocols, and mastered English core grammar structures.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto bg-[#191f2f]/90 border border-[#232a3a] px-4 py-2 rounded-lg shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#4edea3]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#4edea3] text-[24px]">verified</span>
              </div>
              <div>
                <div className="font-mono text-[10px] text-[#869397] uppercase">Final Grade</div>
                <div className="font-mono text-xl text-[#4edea3] font-bold leading-none">RANK S</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Total Elapsed */}
          <div className="rounded-xl bg-[#191f2f] border border-[#232a3a] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                Total Elapsed
              </span>
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">timer</span>
            </div>
            <div className="my-2">
              <div className="font-mono text-2xl sm:text-3xl text-[#4cd7f6] font-bold tracking-widest">
                {formatTime(elapsedSeconds)}
              </div>
              <span className="font-mono text-[10px] text-[#4edea3] font-semibold">
                TARGET &lt; 20:00 (OPT)
              </span>
            </div>
            <div className="font-['Inter'] text-xs text-[#bcc9cd]">Optimal velocity bonus earned</div>
          </div>

          {/* Card 2: Grammar Accuracy */}
          <div className="rounded-xl bg-[#191f2f] border border-[#232a3a] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                Grammar Accuracy
              </span>
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">psychology</span>
            </div>
            <div className="my-2 flex items-center gap-3">
              <div className="relative w-11 h-11 flex-shrink-0">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#2e3545]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#4edea3]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="94.2, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#4edea3] text-[14px]">check</span>
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl text-white font-bold leading-none">
                  94.2%
                </div>
                <div className="font-mono text-[10px] text-[#bcc9cd]">1st Attempt Precision</div>
              </div>
            </div>
            <div className="font-['Inter'] text-xs text-[#4edea3]">High-precision decryption</div>
          </div>

          {/* Card 3: Tactical Hints */}
          <div className="rounded-xl bg-[#191f2f] border border-[#232a3a] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                Tactical Hints
              </span>
              <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">lightbulb</span>
            </div>
            <div className="my-2">
              <div className="font-mono text-2xl sm:text-3xl text-[#ffb95f] font-bold tracking-widest">
                {hintsUsed} / 8
              </div>
              <span className="inline-block px-1.5 py-0.5 rounded bg-[#ffb95f]/20 text-[#ffb95f] font-mono text-[10px] font-bold">
                MINIMAL ASSIST
              </span>
            </div>
            <div className="font-['Inter'] text-xs text-[#bcc9cd]">Independent deductive flow</div>
          </div>

          {/* Card 4: CEFR Standard */}
          <div className="rounded-xl bg-[#191f2f] border border-[#232a3a] p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#869397] uppercase tracking-wider">
                CEFR Standard
              </span>
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">school</span>
            </div>
            <div className="my-2">
              <div className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-white font-bold tracking-tight">
                A2 → B1
              </div>
              <span className="font-mono text-[10px] text-[#4cd7f6] font-semibold">
                DIAGNOSTIC CERTIFIED
              </span>
            </div>
            <div className="font-['Inter'] text-xs text-[#bcc9cd]">Intermediate threshold cleared</div>
          </div>
        </div>

        {/* Breakdown & Institutional Credential Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Left: Pedagogical Framework */}
          <div className="lg:col-span-7 rounded-xl bg-[#191f2f] border border-[#232a3a] p-5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#869397]">
                  Pedagogical Framework
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[#dce2f7]">
                  Grammar Competencies Certified
                </h2>
              </div>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#232a3a] text-[#4cd7f6] font-bold">
                4/4 MODULES
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-['Inter'] text-xs text-[#dce2f7]">
                    Verb 'To Be' & Daily Routine Routines
                  </span>
                  <span className="font-mono text-[11px] text-[#4edea3] font-bold">100%</span>
                </div>
                <div className="h-2 w-full bg-[#232a3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4edea3] rounded-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-['Inter'] text-xs text-[#dce2f7]">
                    Past Simple vs. Present Continuous
                  </span>
                  <span className="font-mono text-[11px] text-[#4edea3] font-bold">95%</span>
                </div>
                <div className="h-2 w-full bg-[#232a3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4edea3] rounded-full w-[95%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-['Inter'] text-xs text-[#dce2f7]">
                    Modal Verbs (Must, Can, Should)
                  </span>
                  <span className="font-mono text-[11px] text-[#4cd7f6] font-bold">90%</span>
                </div>
                <div className="h-2 w-full bg-[#232a3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4cd7f6] rounded-full w-[90%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-['Inter'] text-xs text-[#dce2f7]">
                    Conditional Directives & Imperatives
                  </span>
                  <span className="font-mono text-[11px] text-[#4edea3] font-bold">100%</span>
                </div>
                <div className="h-2 w-full bg-[#232a3a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4edea3] rounded-full w-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#232a3a] flex items-center justify-between font-mono text-[10px] text-[#869397]">
              <span>ASSESSMENT SEED: #CL-8841-B</span>
              <span className="text-[#4edea3] font-semibold">STATUS: VALIDATED BY CIPHER AI</span>
            </div>
          </div>

          {/* Right: Institutional Credential Card */}
          <div className="lg:col-span-5 rounded-xl bg-[#191f2f] border border-[#232a3a] p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center gap-1.5 text-[#4cd7f6] mb-1">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                  Institutional Credential
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base text-[#dce2f7] font-semibold mb-1">
                CEFR A2-B1 Diagnostic Result
              </h3>
              <p className="font-['Inter'] text-xs text-[#bcc9cd] mb-3">
                Candidate demonstrated sustained communicative competence, high-speed syntax parsing, and contextual inference in time-critical environments.
              </p>

              <div className="rounded-lg bg-[#232a3a] border border-[#3d494c] p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#141b2b] flex items-center justify-center flex-shrink-0 text-[#4cd7f6]">
                  <span className="material-symbols-outlined text-[26px]">article</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-['Plus_Jakarta_Sans'] text-xs text-[#dce2f7] truncate font-semibold">
                    Linguistic_Escape_Dossier.pdf
                  </div>
                  <div className="font-mono text-[10px] text-[#869397]">
                    2.4 MB • Cryptographically Signed
                  </div>
                  <span className="inline-block mt-0.5 font-mono text-[9px] text-[#4edea3] font-medium">
                    Ready for Download
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4edea3]"></div>
              <span className="font-mono text-[10px] text-[#869397] uppercase">
                Credential ID: <span className="text-[#dce2f7]">CIPHER-2025-X71</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onResetGame();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#06b6d4] hover:bg-[#4cd7f6] text-[#003640] hover:text-black font-['Plus_Jakarta_Sans'] font-bold text-xs shadow-lg shadow-[#06b6d4]/20 transition-all hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-[17px]">replay</span>
              <span>Play Again / Reset Simulation</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadReport}
              disabled={downloading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#4cd7f6] hover:text-white font-['Plus_Jakarta_Sans'] font-semibold text-xs shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">
                {downloadSuccess ? 'check_circle' : 'download'}
              </span>
              <span>{downloading ? 'Compiling Dossier...' : downloadSuccess ? 'Dossier Downloaded!' : 'Download Report (PDF)'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenCodex();
            }}
            className="font-['Plus_Jakarta_Sans'] text-xs text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors flex items-center gap-1 group"
          >
            <span>Review Pedagogical Notes</span>
            <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Session Status Footer Meta */}
        <div className="mt-5 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#869397] font-mono text-[10px] bg-[#070e1d]/60 border border-[#191f2f] px-3 py-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
            <span className="text-[#bcc9cd] font-medium">Presenter & Instructor Deck Active</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Seed: <strong className="text-[#4cd7f6]">#4092</strong></span>
            <span>Telemetry Relay: <strong className="text-[#4edea3]">STABLE</strong></span>
            <span className="text-white">Session Status: COMPLETE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
