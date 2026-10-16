import React, { useState, useEffect, useRef } from 'react';
import { TabType, InventoryItem, Hotspot, EvaluationResponse, RoomData } from './types/game';
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

// Reward item of a module: granted when its last question is solved
const getRoomReward = (room: RoomData): InventoryItem | undefined =>
  room.puzzles[room.puzzles.length - 1]?.unlockedItem;

export default function App() {
  // Navigation & Room state
  const [activeTab, setActiveTab] = useState<TabType>('vault-room');
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);
  const [roomsUnlocked, setRoomsUnlocked] = useState<boolean[]>([true, false, false, false]);
  const [roomsCompleted, setRoomsCompleted] = useState<boolean[]>([false, false, false, false]);
  const [roomProgress, setRoomProgress] = useState<number[]>([75, 0, 0, 0]);
  // Current question index (0 or 1) inside each module
  const [puzzleStep, setPuzzleStep] = useState<number[]>([0, 0, 0, 0]);

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
  const currentStep = puzzleStep[currentRoomIndex] ?? 0;
  const currentPuzzle = currentRoom.puzzles[currentStep] || currentRoom.puzzles[0];
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

  // Mark a module as solved: set progress, grant its reward and unlock the next module
  const completeRoom = (roomIdx: number) => {
    const reward = getRoomReward(roomsData[roomIdx]);

    setRoomsCompleted((prev) => {
      const updated = [...prev];
      updated[roomIdx] = true;
      return updated;
    });

    setRoomProgress((prev) => {
      const updated = [...prev];
      updated[roomIdx] = 100;
      if (roomIdx < 3 && updated[roomIdx + 1] === 0) {
        updated[roomIdx + 1] = 50;
      }
      return updated;
    });

    if (reward) {
      setInventory((prev) => {
        if (prev.some((item) => item.id === reward.id)) return prev;
        return [...prev, reward];
      });
    }

    if (roomIdx < 3) {
      setRoomsUnlocked((prev) => {
        const updated = [...prev];
        updated[roomIdx + 1] = true;
        return updated;
      });
    }
  };

  // Puzzle answer submission & evaluation
  const handleEvaluatePuzzle = async (selectedOptionId: string) => {
    const roomIdx = currentRoomIndex;
    const room = roomsData[roomIdx] || roomsData[0];
    const step = puzzleStep[roomIdx] ?? 0;
    const puzzle = room.puzzles[step] || room.puzzles[0];
    const isLastStep = step >= room.puzzles.length - 1;
    const reward = getRoomReward(room);

    setIsEvaluating(true);
    setTotalAttempts((prev) => prev + 1);

    const isOptionCorrect = selectedOptionId === puzzle.correctOptionId;
    const selectedOption = puzzle.options.find((o) => o.id === selectedOptionId);

    try {
      // Correct answer on a non-final question: advance to the next question of the same module
      if (isOptionCorrect && !isLastStep) {
        setPuzzleStep((prev) => {
          const updated = [...prev];
          updated[roomIdx] = step + 1;
          return updated;
        });
        setEvaluationResults((prev) => ({ ...prev, [roomIdx]: null }));
        return;
      }

      // Call backend AI pedagogical evaluator endpoint
      const response = await fetch('/api/evaluate-puzzle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleId: puzzle.id,
          roomIndex: roomIdx,
          topic: puzzle.topic,
          promptText: puzzle.promptSentence,
          userAnswer: selectedOption?.text || selectedOptionId,
          correctAnswer:
            puzzle.options.find((o) => o.id === puzzle.correctOptionId)?.text ||
            puzzle.correctOptionId,
          roomName: room.name,
          unlockedItemName: reward?.title,
        }),
      });

      const data: EvaluationResponse = await response.json();

      setEvaluationResults((prev) => ({
        ...prev,
        [roomIdx]: data,
      }));

      if (isLastStep && (data.isCorrect || isOptionCorrect)) {
        completeRoom(roomIdx);
      }
    } catch (err) {
      console.error('Network evaluation failed, using local pedagogical engine:', err);

      // Deterministic fallback if server network times out
      const fallbackResult: EvaluationResponse = {
        isCorrect: isOptionCorrect,
        feedbackMessage: isOptionCorrect
          ? `Linguistic syntax verified! Your mastery of ${puzzle.topic} has authorized terminal override.`
          : `Not quite! ${puzzle.pedagogicalExplanation}`,
        hint: puzzle.pedagogicalRuleTitle,
        unlockedItem: isOptionCorrect ? reward?.title || null : null,
      };

      setEvaluationResults((prev) => ({
        ...prev,
        [roomIdx]: fallbackResult,
      }));

      if (isLastStep && isOptionCorrect) {
        completeRoom(roomIdx);
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
    setPuzzleStep([0, 0, 0, 0]);
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
            key={`${currentRoomIndex}-${currentStep}`}
            puzzle={currentPuzzle}
            currentRoom={currentRoom}
            questionNumber={currentStep + 1}
            questionTotal={currentRoom.puzzles.length}
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
          setPuzzleStep(roomsData.map((room) => room.puzzles.length - 1));
          setInventory([
            initialNotebook,
            ...roomsData
              .map(getRoomReward)
              .filter((item): item is InventoryItem => item !== undefined),
          ]);
        }}
        onCompleteCurrentRoom={() => {
          // Instructor override: solve every question of the current module at once
          const roomIdx = currentRoomIndex;
          const room = roomsData[roomIdx];
          setPuzzleStep((prev) => {
            const updated = [...prev];
            updated[roomIdx] = room.puzzles.length - 1;
            return updated;
          });
          setEvaluationResults((prev) => ({
            ...prev,
            [roomIdx]: {
              isCorrect: true,
              feedbackMessage: 'Module auto-solved by instructor override.',
              hint: '',
              unlockedItem: getRoomReward(room)?.title || null,
            },
          }));
          completeRoom(roomIdx);
        }}
        onResetTimer={() => setTimerSeconds(900)}
        onResetAll={handleResetGame}
      />
    </div>
  );
}
