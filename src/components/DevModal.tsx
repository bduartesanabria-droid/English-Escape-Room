import React from 'react';
import { RoomData } from '../types/game';
import { soundFx } from '../utils/audio';

interface DevModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: RoomData[];
  currentRoomIndex: number;
  onJumpToRoom: (index: number) => void;
  onUnlockAllRooms: () => void;
  onCompleteCurrentRoom: () => void;
  onResetTimer: () => void;
  onResetAll: () => void;
}

export const DevModal: React.FC<DevModalProps> = ({
  isOpen,
  onClose,
  rooms,
  currentRoomIndex,
  onJumpToRoom,
  onUnlockAllRooms,
  onCompleteCurrentRoom,
  onResetTimer,
  onResetAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1d]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#141b2b] border border-[#ffb95f]/40 rounded-xl shadow-2xl overflow-hidden flex flex-col p-5 gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#232a3a]">
          <div className="flex items-center gap-2 text-[#ffb95f]">
            <span className="material-symbols-outlined text-[22px]">terminal</span>
            <span className="font-mono text-xs uppercase font-bold tracking-widest">
              [F2] INSTRUCTOR & DEV OVERRIDE
            </span>
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

        {/* Room Switcher */}
        <div>
          <label className="font-mono text-[11px] text-[#869397] uppercase block mb-1.5 font-semibold">
            Jump to Sector / Room:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {rooms.map((room, idx) => (
              <button
                key={room.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onJumpToRoom(idx);
                  onClose();
                }}
                className={`px-3 py-2 rounded-lg font-mono text-xs text-left border transition-all ${
                  currentRoomIndex === idx
                    ? 'bg-[#06b6d4] text-[#003640] border-[#4cd7f6] font-bold'
                    : 'bg-[#191f2f] text-[#bcc9cd] border-[#232a3a] hover:border-[#4cd7f6]'
                }`}
              >
                Room 0{idx + 1}: {room.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Cheats & Overrides */}
        <div className="space-y-2">
          <label className="font-mono text-[11px] text-[#869397] uppercase block font-semibold">
            Simulation Controls:
          </label>

          <button
            type="button"
            onClick={() => {
              soundFx.playSuccess();
              onCompleteCurrentRoom();
              onClose();
            }}
            className="w-full px-3.5 py-2 bg-[#191f2f] hover:bg-[#232a3a] border border-[#4edea3]/40 text-[#4edea3] font-mono text-xs rounded-lg flex items-center justify-between transition-colors"
          >
            <span>Auto-Solve Current Room Puzzle</span>
            <span className="material-symbols-outlined text-[17px]">done_all</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playSuccess();
              onUnlockAllRooms();
              onClose();
            }}
            className="w-full px-3.5 py-2 bg-[#191f2f] hover:bg-[#232a3a] border border-[#4cd7f6]/40 text-[#4cd7f6] font-mono text-xs rounded-lg flex items-center justify-between transition-colors"
          >
            <span>Unlock All 4 Sectors & Items</span>
            <span className="material-symbols-outlined text-[17px]">lock_open</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onResetTimer();
            }}
            className="w-full px-3.5 py-2 bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#bcc9cd] font-mono text-xs rounded-lg flex items-center justify-between transition-colors"
          >
            <span>Reset Countdown Timer (15:00)</span>
            <span className="material-symbols-outlined text-[17px]">timer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playError();
              onResetAll();
              onClose();
            }}
            className="w-full px-3.5 py-2 bg-[#93000a]/30 hover:bg-[#93000a]/50 border border-[#ff5449]/40 text-[#ffb4ab] font-mono text-xs rounded-lg flex items-center justify-between transition-colors"
          >
            <span>Wipe Progression & Reset Game</span>
            <span className="material-symbols-outlined text-[17px]">delete_forever</span>
          </button>
        </div>

        <div className="pt-2 border-t border-[#232a3a] text-center font-mono text-[10px] text-[#869397]">
          Press F2 anytime to toggle this panel.
        </div>
      </div>
    </div>
  );
};
