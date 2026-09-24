export type TabType = 'vault-room' | 'cipher-decoders' | 'mission-logs';

export interface InventoryItem {
  id: string;
  name: string;
  title: string;
  cipherId?: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
  description: string;
  lore: string;
}

export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary' | 'error';
  coords: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  tooltip: string;
  modalTag: string;
  contentHtml: string;
  hint: string;
  actionType?: 'puzzle' | 'inspect' | 'dial';
  puzzleTargetId?: string;
}

export interface PuzzleOption {
  id: string;
  label: string;
  text: string;
  errorNote?: string;
}

export interface Puzzle {
  id: string;
  roomIndex: number;
  title: string;
  code: string;
  topic: string;
  frequency: string;
  promptSentence: string;
  promptBlank1: string;
  promptBlank2?: string;
  options: PuzzleOption[];
  correctOptionId: string;
  pedagogicalRuleTitle: string;
  pedagogicalExplanation: string;
  syntaxBlueprint: {
    rulePart1: string;
    operator?: string;
    rulePart2: string;
  };
  solvedSentence: {
    part1: string;
    highlight1: string;
    part2: string;
    highlight2?: string;
    part3?: string;
  };
  sentenceBreakdown: {
    label: string;
    value: string;
    type: string;
    color: 'primary' | 'secondary' | 'tertiary';
  }[];
  unlockedItem: InventoryItem;
}

export interface RoomData {
  id: string;
  index: number;
  name: string;
  code: string;
  sectorTag: string;
  clearance: string;
  level: string;
  locationName: string;
  frequency: string;
  primaryObjectiveTitle: string;
  primaryObjectiveDesc: string;
  clueMatrixCount: string;
  hotspots: Hotspot[];
  puzzles: Puzzle[];
  grammarTopic: string;
  competencyScore: number;
}

export interface EvaluationResponse {
  isCorrect: boolean;
  feedbackMessage: string;
  hint: string;
  unlockedItem?: string | null;
  syntaxBlueprint?: string;
}
