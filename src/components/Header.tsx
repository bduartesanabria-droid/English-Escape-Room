import React from 'react';
import { TabType, RoomData } from '../types/game';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentRoom: RoomData;
  rooms: RoomData[];
  roomsUnlocked: boolean[];
  roomsCompleted: boolean[];
  roomProgress: number[];
  timerSeconds: number;
  hintsUsed: number;
  totalAttempts: number;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  onOpenRules: () => void;
  onOpenDev: () => void;
  onSelectRoom: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentRoom,
  rooms,
  roomsUnlocked,
  roomsCompleted,
  roomProgress,
  timerSeconds,
  hintsUsed,
  totalAttempts,
  audioEnabled,
  setAudioEnabled,
  onOpenRules,
  onOpenDev,
  onSelectRoom,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    soundFx.setEnabled(next);
    if (next) soundFx.playClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070e1d]/85 backdrop-blur-xl border-b border-[#191f2f]/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-24 w-full px-4 sm:px-6 flex flex-col justify-between py-1.5 max-w-7xl mx-auto">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Brand & Room Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#141b2b] px-2.5 py-1 rounded-lg border border-[#232a3a]">
              <div className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></div>
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[12px] uppercase tracking-wider text-[#4cd7f6]">
                Cipher Labs
              </span>
              <span className="font-mono text-[10px] text-[#869397]">// LAB-SYS 4.02</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 bg-[#191f2f] px-2.5 py-1 rounded-lg border border-[#232a3a]">
              <span className="font-mono text-[11px] text-[#ffb95f]">ROOM 0{currentRoom.index + 1}:</span>
              <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#dce2f7] font-medium">
                {currentRoom.name} ({currentRoom.grammarTopic.split('(')[0].trim()})
              </span>
            </div>
          </div>

          {/* Countdown Timer & Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#141b2b] px-3 py-1 rounded-lg border border-[#232a3a]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">timer</span>
              <span className="font-mono text-[17px] text-[#4cd7f6] font-bold tracking-widest">
                {formatTime(timerSeconds)}
              </span>
              <span className="font-mono text-[10px] text-[#869397] uppercase">Rem</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleAudio}
                className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center ${
                  audioEnabled
                    ? 'bg-[#191f2f] border-[#232a3a] text-[#4cd7f6] hover:bg-[#232a3a]'
                    : 'bg-[#141b2b] border-[#232a3a] text-[#869397] hover:text-[#dce2f7]'
                }`}
                title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {audioEnabled ? 'volume_up' : 'volume_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs & Status */}
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1.5 bg-[#141b2b] p-1 rounded-lg border border-[#232a3a]">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('vault-room');
                }}
                className={`px-3 py-1 rounded-md text-[12px] font-['Plus_Jakarta_Sans'] font-semibold transition-all ${
                  activeTab === 'vault-room'
                    ? 'bg-[#06b6d4] text-[#003640] font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                    : 'text-[#bcc9cd] hover:text-[#dce2f7] hover:bg-[#191f2f]'
                }`}
              >
                Vault Room
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('cipher-decoders');
                }}
                className={`px-3 py-1 rounded-md text-[12px] font-['Plus_Jakarta_Sans'] font-semibold transition-all ${
                  activeTab === 'cipher-decoders'
                    ? 'bg-[#06b6d4] text-[#003640] font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                    : 'text-[#bcc9cd] hover:text-[#dce2f7] hover:bg-[#191f2f]'
                }`}
              >
                Cipher Decoders
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('mission-logs');
                }}
                className={`px-3 py-1 rounded-md text-[12px] font-['Plus_Jakarta_Sans'] font-semibold transition-all ${
                  activeTab === 'mission-logs'
                    ? 'bg-[#06b6d4] text-[#003640] font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                    : 'text-[#bcc9cd] hover:text-[#dce2f7] hover:bg-[#191f2f]'
                }`}
              >
                Mission Logs
              </button>
            </nav>

            {/* Quick Stats */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#141b2b] px-2.5 py-1 rounded-lg border border-[#232a3a] font-mono text-[11px] text-[#869397]">
              <span>
                Hints: <span className="text-[#ffb95f] font-bold">{hintsUsed}/2</span>
              </span>
              <span className="text-[#3d494c]">•</span>
              <span>
                Att: <span className="text-[#4cd7f6] font-bold">{totalAttempts}</span>
              </span>
            </div>

            {/* Dev Mode button */}
            <button
              type="button"
              onClick={onOpenDev}
              className="flex items-center gap-1 bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] px-2 py-1 rounded-lg font-mono text-[11px] text-[#869397] hover:text-[#4cd7f6] transition-colors"
              title="Toggle Dev Panel"
            >
              <span className="material-symbols-outlined text-[15px]">terminal</span>
              <span className="hidden md:inline">[F2] Dev</span>
            </button>

            {/* Rules button */}
            <button
              type="button"
              onClick={onOpenRules}
              className="p-1 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#4cd7f6] hover:text-white transition-colors flex items-center justify-center"
              title="Grammar Codex & Rules"
            >
              <span className="material-symbols-outlined text-[19px]">help_center</span>
            </button>
          </div>
        </div>

        {/* 4-Sector Progression Trackers */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-t border-[#191f2f]/60">
          {rooms.map((room, idx) => {
            const unlocked = roomsUnlocked[idx];
            const completed = roomsCompleted[idx];
            const progress = roomProgress[idx] || (completed ? 100 : (idx === 0 ? 75 : 0));
            const isCurrent = currentRoom.index === idx;

            return (
              <div
                key={room.id}
                onClick={() => {
                  if (unlocked) {
                    soundFx.playClick();
                    onSelectRoom(idx);
                  }
                }}
                className={`flex flex-col gap-1 cursor-pointer transition-opacity ${
                  unlocked ? 'opacity-100 hover:opacity-90' : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-center font-mono text-[10px] truncate">
                  <span
                    className={`truncate font-semibold ${
                      completed
                        ? 'text-[#4edea3]'
                        : isCurrent
                        ? 'text-[#4cd7f6]'
                        : unlocked
                        ? 'text-[#bcc9cd]'
                        : 'text-[#869397]'
                    }`}
                  >
                    {room.code}
                  </span>
                  <span
                    className={
                      completed
                        ? 'text-[#4edea3] font-bold'
                        : isCurrent
                        ? 'text-[#4cd7f6] font-bold'
                        : unlocked
                        ? 'text-[#bcc9cd]'
                        : 'text-[#3d494c]'
                    }
                  >
                    {completed ? '100%' : unlocked ? `${progress}%` : 'LOCKED'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#191f2f] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      completed
                        ? 'bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.5)]'
                        : isCurrent
                        ? 'bg-[#4cd7f6] shadow-[0_0_8px_rgba(76,215,246,0.5)]'
                        : unlocked
                        ? 'bg-[#00a572]'
                        : 'bg-[#232a3a]'
                    }`}
                    style={{ width: unlocked ? `${progress}%` : '0%' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};
