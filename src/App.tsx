import React, { useState, useEffect, useRef } from 'react';
import { TabType, InventoryItem, Hotspot, EvaluationResponse } from './types/game';
import { roomsData } from './data/roomsData';
import { soundFx } from './utils/audio';
import { Header } from './components/Header';
import { FooterTacticalDeck } from './components/FooterTacticalDeck';
import { VaultRoomCanvas } from './components/VaultRoomCanvas';
import { CipherDecoderScreen } from './components/CipherDecoderScreen';
import { MissionLogsScreen } from './components/MissionLogsScreen';
import { ClueModal } from './components/ClueModal';
import { GrammarCodexModal } from './components/GrammarCodexModal';
import { DevModal } from './components/DevModal';
import { ItemInspectModal } from './components/ItemInspectModal';
import { HintModal } from './components/HintModal';

export default function App() {
  // Navigation & Room state
  const [activeTab, setActiveTab] = useState<TabType>('vault-room');
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);
  const [roomsUnlocked, setRoomsUnlocked] = useState<boolean[]>([true, false, false, false]);
  const [roomsCompleted, setRoomsCompleted] = useState<boolean[]>([false, false, false, false]);
  const [roomProgress, setRoomProgress] = useState<number[]>([75, 0, 0, 0]);

  // Telemetry & Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(875); // 14:35
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [hintsUsed, setHintsUsed] = useState<number>(1);
  const [totalAttempts, setTotalAttempts] = useState<number>(2);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Inventory Deck
  const initialNotebook: InventoryItem = {
    id: 'notes',
    name: 'Notes',
    title: 'Grammar Notebook (Vol. I)',
    icon: 'menu_book',
    color: 'secondary',
    description: 'Field notes containing crucial rules on 3rd-Person Singular, Present Simple, and Subject-Verb Agreement.',
    lore: 'Handwritten annotations compiled by Dr. Vane during linguistic field analysis.',
  };
  const [inventory, setInventory] = useState<InventoryItem[]>([initialNotebook]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<InventoryItem | null>(null);

  // Discovered hotspots
  const [discoveredHotspots, setDiscoveredHotspots] = useState<Record<number, string[]>>({
    0: ['bookshelf', 'memo', 'drawer', 'door'],
    1: ['coolant_gauge'],
    2: ['safety_hologram'],
    3: ['airlock_slate'],
  });

  // Modal states
  const [activeHotspotModal, setActiveHotspotModal] = useState<Hotspot | null>(null);
  const [codexModalOpen, setCodexModalOpen] = useState<boolean>(false);
  const [devModalOpen, setDevModalOpen] = useState<boolean>(false);
  const [itemInspectModalOpen, setItemInspectModalOpen] = useState<boolean>(false);

  // Evaluation & Decoder state
  const [evaluationResults, setEvaluationResults] = useState<Record<number, EvaluationResponse | null>>({
    0: null,
    1: null,
    2: null,
    3: null,
  });
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Progressive Hint modal state
  const [hintModalOpen, setHintModalOpen] = useState<boolean>(false);
  const [hintData, setHintData] = useState<{
    hintText: string | null;
    ruleText: string | null;
    isLoading: boolean;
  }>({
    hintText: null,
    ruleText: null,
    isLoading: false,
  });

  const currentRoom = roomsData[currentRoomIndex] || roomsData[0];
  const currentPuzzle = currentRoom.puzzles[0];
  const currentEvaluationResult = evaluationResults[currentRoomIndex] || null;

  // Countdown timer effect
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          soundFx.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  // F2 key listener for Dev Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        setDevModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hotspot selection handler
  const handleSelectHotspot = (hotspot: Hotspot) => {
    // Record hotspot as discovered
    setDiscoveredHotspots((prev) => {
      const list = prev[currentRoomIndex] || [];
      if (!list.includes(hotspot.id)) {
        return { ...prev, [currentRoomIndex]: [...list, hotspot.id] };
      }
      return prev;
    });

    if (hotspot.actionType === 'puzzle') {
      setActiveTab('cipher-decoders');
    } else {
      setActiveHotspotModal(hotspot);
    }
  };

  // Puzzle answer submission & evaluation
  const handleEvaluatePuzzle = async (selectedOptionId: string) => {
    setIsEvaluating(true);
    setTotalAttempts((prev) => prev + 1);

    const isOptionCorrect = selectedOptionId === currentPuzzle.correctOptionId;
    const selectedOption = currentPuzzle.options.find((o) => o.id === selectedOptionId);

    try {
      // Call backend AI pedagogical evaluator endpoint
      const response = await fetch('/api/evaluate-puzzle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleId: currentPuzzle.id,
          roomIndex: currentRoomIndex,
          topic: currentPuzzle.topic,
          promptText: currentPuzzle.promptSentence,
          userAnswer: selectedOption?.text || selectedOptionId,
          correctAnswer:
            currentPuzzle.options.find((o) => o.id === currentPuzzle.correctOptionId)?.text ||
            currentPuzzle.correctOptionId,
          roomName: currentRoom.name,
          unlockedItemName: currentPuzzle.unlockedItem.title,
        }),
      });

      const data: EvaluationResponse = await response.json();

      setEvaluationResults((prev) => ({
        ...prev,
        [currentRoomIndex]: data,
      }));

      if (data.isCorrect || isOptionCorrect) {
        // Mark room as completed
        setRoomsCompleted((prev) => {
          const updated = [...prev];
          updated[currentRoomIndex] = true;
          return updated;
        });

        // Set progress to 100%
        setRoomProgress((prev) => {
          const updated = [...prev];
          updated[currentRoomIndex] = 100;
          return updated;
        });

        // Add unlocked item to inventory if not already present
        setInventory((prev) => {
          if (prev.some((item) => item.id === currentPuzzle.unlockedItem.id)) {
            return prev;
          }
          return [...prev, currentPuzzle.unlockedItem];
        });

        // Unlock next room if available
        if (currentRoomIndex < 3) {
          setRoomsUnlocked((prev) => {
            const updated = [...prev];
            updated[currentRoomIndex + 1] = true;
            return updated;
          });
          setRoomProgress((prev) => {
            const updated = [...prev];
            if (updated[currentRoomIndex + 1] === 0) {
              updated[currentRoomIndex + 1] = 50;
            }
            return updated;
          });
        }
      }
    } catch (err) {
      console.error('Network evaluation failed, using local pedagogical engine:', err);

      // Deterministic fallback if server network times out
      const fallbackResult: EvaluationResponse = {
        isCorrect: isOptionCorrect,
        feedbackMessage: isOptionCorrect
          ? `Linguistic syntax verified! Your mastery of ${currentPuzzle.topic} has authorized terminal override.`
          : `Not quite! ${currentPuzzle.pedagogicalExplanation}`,
        hint: currentPuzzle.pedagogicalRuleTitle,
        unlockedItem: isOptionCorrect ? currentPuzzle.unlockedItem.title : null,
      };

      setEvaluationResults((prev) => ({
        ...prev,
        [currentRoomIndex]: fallbackResult,
      }));

      if (isOptionCorrect) {
        setRoomsCompleted((prev) => {
          const updated = [...prev];
          updated[currentRoomIndex] = true;
          return updated;
        });
        setRoomProgress((prev) => {
          const updated = [...prev];
          updated[currentRoomIndex] = 100;
          return updated;
        });
        setInventory((prev) => {
          if (prev.some((item) => item.id === currentPuzzle.unlockedItem.id)) return prev;
          return [...prev, currentPuzzle.unlockedItem];
        });
        if (currentRoomIndex < 3) {
          setRoomsUnlocked((prev) => {
            const updated = [...prev];
            updated[currentRoomIndex + 1] = true;
            return updated;
          });
        }
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Proceed to next sector after solving
  const handleSuccessProceed = () => {
    if (currentRoomIndex < 3) {
      const nextIndex = currentRoomIndex + 1;
      setCurrentRoomIndex(nextIndex);
      setActiveTab('vault-room');
    } else {
      // Completed all 4 rooms! Show Mission Accomplished Debrief Screen!
      setActiveTab('mission-logs');
      soundFx.playSuccess();
    }
  };

  // Request progressive hint from AI
  const handleRequestHint = async () => {
    setHintModalOpen(true);
    setHintData({ hintText: null, ruleText: null, isLoading: true });

    setHintsUsed((prev) => prev + 1);

    try {
      const response = await fetch('/api/request-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleId: currentPuzzle.id,
          topic: currentPuzzle.topic,
          promptText: currentPuzzle.promptSentence,
          hintTier: hintsUsed % 2 === 0 ? 2 : 1,
        }),
      });
      const data = await response.json();
      setHintData({
        hintText: data.hint || currentRoom.hotspots[0]?.hint || 'Look closely at subject-verb agreement.',
        ruleText: data.pedagogicalRule || currentPuzzle.pedagogicalRuleTitle,
        isLoading: false,
      });
    } catch (e) {
      setHintData({
        hintText: currentPuzzle.pedagogicalExplanation,
        ruleText: currentPuzzle.pedagogicalRuleTitle,
        isLoading: false,
      });
    }
  };

  // Tactical Deck item selection
  const handleSelectInventoryItem = (item: InventoryItem) => {
    setSelectedInventoryItem(item);
    if (item.id === 'notes') {
      setCodexModalOpen(true);
    } else {
      setItemInspectModalOpen(true);
    }
  };

  // Reset entire game
  const handleResetGame = () => {
    setCurrentRoomIndex(0);
    setRoomsUnlocked([true, false, false, false]);
    setRoomsCompleted([false, false, false, false]);
    setRoomProgress([75, 0, 0, 0]);
    setTimerSeconds(875);
    setHintsUsed(1);
    setTotalAttempts(2);
    setInventory([initialNotebook]);
    setEvaluationResults({ 0: null, 1: null, 2: null, 3: null });
    setActiveTab('vault-room');
  };

  return (
    <div className="min-h-screen bg-[#0c1322] text-[#dce2f7] flex flex-col justify-between selection:bg-[#06b6d4] selection:text-[#003640] relative overflow-x-hidden font-['Inter']">
      {/* Top Telemetry Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRoom={currentRoom}
        rooms={roomsData}
        roomsUnlocked={roomsUnlocked}
        roomsCompleted={roomsCompleted}
        roomProgress={roomProgress}
        timerSeconds={timerSeconds}
        hintsUsed={hintsUsed}
        totalAttempts={totalAttempts}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        onOpenRules={() => setCodexModalOpen(true)}
        onOpenDev={() => setDevModalOpen(true)}
        onSelectRoom={(idx) => {
          setCurrentRoomIndex(idx);
          setActiveTab('vault-room');
        }}
      />

      {/* Main Game Stage */}
      <main className="relative w-full pt-28 pb-32 px-4 sm:px-6 flex-1 flex flex-col justify-center items-center overflow-x-hidden">
        {activeTab === 'vault-room' && (
          <VaultRoomCanvas
            room={currentRoom}
            onSelectHotspot={handleSelectHotspot}
            onOpenDecoder={() => setActiveTab('cipher-decoders')}
            onRequestHint={handleRequestHint}
            discoveredHotspotsCount={(discoveredHotspots[currentRoomIndex] || []).length}
          />
        )}

        {activeTab === 'cipher-decoders' && (
          <CipherDecoderScreen
            puzzle={currentPuzzle}
            currentRoom={currentRoom}
            onReturnToVault={() => setActiveTab('vault-room')}
            onSuccessProceed={handleSuccessProceed}
            onRequestHint={handleRequestHint}
            hintsRemaining={Math.max(0, 2 - (hintsUsed % 3))}
            attempts={totalAttempts}
            evaluationResult={currentEvaluationResult}
            onEvaluate={handleEvaluatePuzzle}
            isEvaluating={isEvaluating}
          />
        )}

        {activeTab === 'mission-logs' && (
          <MissionLogsScreen
            rooms={roomsData}
            roomsCompleted={roomsCompleted}
            elapsedSeconds={875 - timerSeconds > 0 ? 875 - timerSeconds : 768}
            totalAttempts={totalAttempts}
            hintsUsed={hintsUsed}
            onResetGame={handleResetGame}
            onOpenCodex={() => setCodexModalOpen(true)}
          />
        )}
      </main>

      {/* Bottom Action HUD / Tactical Deck */}
      <FooterTacticalDeck
        inventory={inventory}
        selectedItem={selectedInventoryItem}
        onSelectItem={handleSelectInventoryItem}
        onInspect={() => setCodexModalOpen(true)}
        onRequestHint={handleRequestHint}
        hintsRemaining={Math.max(0, 2 - (hintsUsed % 3))}
      />

      {/* Modals */}
      <ClueModal
        hotspot={activeHotspotModal}
        onClose={() => setActiveHotspotModal(null)}
        onOpenDecoder={() => {
          setActiveHotspotModal(null);
          setActiveTab('cipher-decoders');
        }}
      />

      <GrammarCodexModal
        isOpen={codexModalOpen}
        onClose={() => setCodexModalOpen(false)}
        defaultTopicIndex={currentRoomIndex}
      />

      <ItemInspectModal
        item={selectedInventoryItem}
        onClose={() => setItemInspectModalOpen(false)}
      />

      <HintModal
        isOpen={hintModalOpen}
        onClose={() => setHintModalOpen(false)}
        hintText={hintData.hintText}
        ruleText={hintData.ruleText}
        isLoading={hintData.isLoading}
        hintsRemaining={Math.max(0, 2 - (hintsUsed % 3))}
      />

      <DevModal
        isOpen={devModalOpen}
        onClose={() => setDevModalOpen(false)}
        rooms={roomsData}
        currentRoomIndex={currentRoomIndex}
        onJumpToRoom={(idx) => {
          setCurrentRoomIndex(idx);
          setRoomsUnlocked((prev) => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
          });
        }}
        onUnlockAllRooms={() => {
          setRoomsUnlocked([true, true, true, true]);
          setRoomProgress([100, 100, 100, 100]);
          setRoomsCompleted([true, true, true, true]);
          setInventory([
            initialNotebook,
            roomsData[0].puzzles[0].unlockedItem,
            roomsData[1].puzzles[0].unlockedItem,
            roomsData[2].puzzles[0].unlockedItem,
            roomsData[3].puzzles[0].unlockedItem,
          ]);
        }}
        onCompleteCurrentRoom={() => {
          handleEvaluatePuzzle(currentPuzzle.correctOptionId);
        }}
        onResetTimer={() => setTimerSeconds(900)}
        onResetAll={handleResetGame}
      />
    </div>
  );
}
