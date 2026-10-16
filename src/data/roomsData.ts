import { RoomData } from '../types/game';

export const roomsData: RoomData[] = [
  // ==========================================
  // ROOM 01: Language Lab - Part 1 (The Lockdown)
  // ==========================================
  {
    id: 'room-01',
    index: 0,
    name: "Language Lab - Room 1",
    code: '01 // TO BE & ROUTINES',
    sectorTag: 'LANGUAGE LAB // AREA 1',
    clearance: 'CLEARANCE-A',
    level: 'LVL 01',
    locationName: 'LAB_ROOM_01',
    frequency: '142.80 MHz',
    primaryObjectiveTitle: 'Open the First Door',
    primaryObjectiveDesc: 'You are in the English Language Lab. Suddenly, the automatic lockdown turns on. The first door is locked. You need to find clues in the room to answer the question and open the first door so you can go forward.',
    clueMatrixCount: '2/4',
    grammarTopic: 'Verb To Be & Daily Routines (Present Simple)',
    competencyScore: 100,
    hotspots: [
      {
        id: 'bookshelf',
        title: 'Grammar Book',
        subtitle: 'Look at the rules',
        icon: 'menu_book',
        color: 'primary',
        coords: { top: '28%', left: '17%' },
        tooltip: '[CLICK] Grammar Book',
        modalTag: 'GRAMMAR HELP // RULES',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Grammar Help</p>
            <p class="text-sm text-[#bcc9cd]">Present Simple - He / She / It</p>
            <div class="bg-[#070e1d] p-4 rounded-lg font-mono text-[13px] text-[#dce2f7] space-y-2 border border-[#232a3a]">
              <p><span class="text-[#4cd7f6] font-bold">I / You / We / They</span> → verb: <span class="text-[#4edea3]">I work, they work.</span></p>
              <p><span class="text-[#ffb95f] font-bold">He / She / It</span> → verb + <span class="text-[#4edea3] font-bold">-s / -es</span>: <span class="text-[#4edea3]">He works, she works.</span></p>
              <div class="border-t border-[#191f2f] pt-2 text-[#869397] text-xs">
                "To Be" → <em>am / is / are</em>.
              </div>
            </div>
            <p class="text-xs text-[#869397]">Use this to help you answer the question and open the door.</p>
          </div>
        `,
        hint: 'Read the rules. They can help you answer the question.',
        actionType: 'inspect',
      },
      {
        id: 'memo',
        title: 'Clue Note',
        subtitle: 'Read this clue',
        icon: 'description',
        color: 'secondary',
        coords: { top: '58%', right: '27%' },
        tooltip: '[CLICK] Clue Note',
        modalTag: 'CLUE // LOCKDOWN INFO',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue</p>
            <div class="p-4 bg-[#070e1d] rounded-lg font-mono text-[13px] text-[#4cd7f6] space-y-2 border border-[#232a3a]">
              <p>"Every day at 07:00, Dr. Vane <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">unlocks</span> the outer gate."</p>
              <p>"He never <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">drinks</span> coffee before he <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">reviews</span> the cipher logs."</p>
              <p>"At noon, he <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">locks</span> the security vault."</p>
            </div>
            <p class="text-xs text-[#869397]">Look at the verbs with -s. They can help you answer the question to open the first door.</p>
          </div>
        `,
        hint: 'Look at these verbs: unlocks, drinks, reviews, locks. Use them to help you answer the question.',
        actionType: 'inspect',
      },
      {
        id: 'drawer',
        title: 'Locked Drawer',
        subtitle: 'Look here for a clue',
        icon: 'key',
        color: 'tertiary',
        coords: { bottom: '16%', left: '58%' },
        tooltip: '[CLICK] Locked Drawer',
        modalTag: 'CLUE // HELP',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue</p>
            <p class="text-sm text-[#bcc9cd]">Look at the verbs in the note. Pay attention to He + -s.</p>
            <div class="bg-[#070e1d] p-4 rounded-lg space-y-2.5 font-mono text-[13px] border border-[#232a3a]">
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">1. He unlocks</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">2. He drinks</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">3. He reviews</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">4. He locks</span>
              </div>
            </div>
            <div class="p-3 bg-[#005236]/20 rounded border border-[#4edea3]/40 text-[#4edea3] text-xs">
              These clues can help you answer the question to open the first door.
            </div>
          </div>
        `,
        hint: 'Use the clues you found to answer the question at the door.',
        actionType: 'inspect',
      },
      {
        id: 'door',
        title: 'Locked Door',
        subtitle: 'Answer the question to open it',
        icon: 'lock',
        color: 'error',
        coords: { top: '42%', right: '11%' },
        tooltip: '[CLICK] Locked Door',
        modalTag: 'LOCKED DOOR // LOCKDOWN',
        contentHtml: '',
        hint: 'Click here to answer the question and open the first door.',
        actionType: 'puzzle',
        puzzleTargetId: 'room1_p1',
      },
    ],
    puzzles: [
      {
        id: 'room1_p1',
        roomIndex: 0,
        title: "Present Simple & 'To Be' Calibration",
        code: 'VERB PUZZLE #01',
        topic: 'Verb To Be & Daily Routines (Subject-Verb Agreement)',
        frequency: '432.8 MHz',
        promptSentence: '"Dr. Lee _____ in the lab every day, but today the lab doors _____ locked."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'works / is',
            errorNote: 'SYNTAX_ERROR: AGREEMENT_MISMATCH',
          },
          {
            id: 'B',
            label: 'B',
            text: 'work / are',
            errorNote: 'Candidate Pattern // 02',
          },
          {
            id: 'C',
            label: 'C',
            text: 'works / are',
            errorNote: 'Candidate Pattern // 03',
          },
          {
            id: 'D',
            label: 'D',
            text: 'is working / was',
            errorNote: 'Candidate Pattern // 04',
          },
        ],
        correctOptionId: 'C',
        pedagogicalRuleTitle: 'Subject-Verb Agreement Rule',
        pedagogicalExplanation: `'Dr. Lee' is a third-person singular noun (He/She), which demands the present simple verb ending in '-s' (works). Meanwhile, 'the lab doors' is a plural noun subject, requiring the plural form of 'to be' - 'are'.`,
        syntaxBlueprint: {
          rulePart1: 'He / She / It + Verb(-s/-es)',
          operator: '+',
          rulePart2: 'Plural Subject + are',
        },
        solvedSentence: {
          part1: 'Dr. Lee',
          highlight1: 'works',
          part2: 'in the lab every day, but today the lab doors',
          highlight2: 'are locked',
          part3: '.',
        },
        sentenceBreakdown: [
          { label: 'Habitual Routine', value: 'works', type: 'Simple Present 3rd Sing.', color: 'primary' },
          { label: 'Contrast Marker', value: 'today', type: 'Temporary Context', color: 'tertiary' },
          { label: 'Passive State', value: 'are locked', type: 'Plural Verb to Be', color: 'secondary' },
        ],
      },
      {
        id: 'room1_p2',
        roomIndex: 0,
        title: 'Daily Routines: He / She / It',
        code: 'VERB PUZZLE #01B',
        topic: 'Daily Routines (Present Simple, He / She / It) & Verb To Be',
        frequency: '432.8 MHz',
        promptSentence: '"Every day, Dr. Vane _____ his notes at noon, but today he _____ at home."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'reviews / is',
            errorNote: 'Candidate Pattern // 01',
          },
          {
            id: 'B',
            label: 'B',
            text: 'review / is',
            errorNote: 'SYNTAX_ERROR: 3RD_SINGULAR_OMISSION',
          },
          {
            id: 'C',
            label: 'C',
            text: 'reviews / are',
            errorNote: 'SYNTAX_ERROR: AGREEMENT_MISMATCH',
          },
          {
            id: 'D',
            label: 'D',
            text: 'reviewing / was',
            errorNote: 'SYNTAX_ERROR: TEMPORAL_MISALIGNMENT',
          },
        ],
        correctOptionId: 'A',
        pedagogicalRuleTitle: 'He / She / It: Verb + -s and "Is"',
        pedagogicalExplanation: `'Dr. Vane' is a third-person singular subject (he), so the routine verb takes '-s' (reviews). With 'he', the verb 'to be' is 'is', not 'are'. 'Today' refers to the present, so present forms are correct.`,
        syntaxBlueprint: {
          rulePart1: 'He / She / It + Verb(-s/-es)',
          operator: '+',
          rulePart2: 'He / She / It + is',
        },
        solvedSentence: {
          part1: 'Every day, Dr. Vane',
          highlight1: 'reviews',
          part2: 'his notes at noon, but today he',
          highlight2: 'is',
          part3: 'at home.',
        },
        sentenceBreakdown: [
          { label: 'Routine', value: 'reviews', type: 'Simple Present 3rd Sing.', color: 'primary' },
          { label: 'Time Signal', value: 'every day', type: 'Habitual Routine', color: 'tertiary' },
          { label: 'State', value: 'is', type: 'Verb To Be (he)', color: 'secondary' },
        ],
        unlockedItem: {
          id: 'keycard_lvl2',
          name: 'Keycard',
          title: 'BLUE CIPHER KEYCARD (LEVEL 2 ACCESS)',
          cipherId: '#CC-9021',
          icon: 'badge',
          color: 'primary',
          description: 'You can use this keycard to go to the next room.',
          lore: 'Keycard to open the next door.',
        },
      },
    ],
  },

  // ==========================================
  // ROOM 02: Language Lab - Part 2 (The Lockdown)
  // ==========================================
  {
    id: 'room-02',
    index: 1,
    name: 'Language Lab - Room 2',
    code: '02 // VERB TENSES',
    sectorTag: 'LANGUAGE LAB // AREA 2',
    clearance: 'CLEARANCE-B',
    level: 'LVL 02',
    locationName: 'LAB_ROOM_02',
    frequency: '218.45 MHz',
    primaryObjectiveTitle: 'Open the Second Door',
    primaryObjectiveDesc: 'You open the first door and go forward. But the lockdown stops you again. There is a problem with the power. You need to find clues in the room, answer the question, and open the second door to go on.',
    clueMatrixCount: '3/4',
    grammarTopic: 'Past Simple vs. Present/Past Continuous',
    competencyScore: 95,
    hotspots: [
      {
        id: 'coolant_gauge',
        title: 'Power Log',
        subtitle: 'Look at this clue',
        icon: 'speed',
        color: 'primary',
        coords: { top: '35%', left: '22%' },
        tooltip: '[CLICK] Power Log',
        modalTag: 'CLUE // POWER',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue - Power Log</p>
            <div class="p-4 bg-[#070e1d] rounded-lg font-mono text-[13px] space-y-2 border border-[#232a3a]">
              <p class="text-[#bcc9cd]">"Yesterday at 04:00, the power <span class="text-[#4cd7f6] font-bold">burst</span>." (Past Simple - finished action in the past.)</p>
              <p class="text-[#bcc9cd]">"Right now, the power <span class="text-[#4edea3] font-bold">is flowing</span> again." (Present Continuous - action happening now.)</p>
            </div>
            <p class="text-xs text-[#869397]">Look at 'yesterday' and 'right now'. They help you choose the right words for the question.</p>
          </div>
        `,
        hint: 'Use "yesterday" (past) and "right now" (happening now) to help you answer the question.',
        actionType: 'inspect',
      },
      {
        id: 'incident_recorder',
        title: 'Tech Note',
        subtitle: 'Read this clue',
        icon: 'graphic_eq',
        color: 'secondary',
        coords: { top: '60%', left: '46%' },
        tooltip: '[CLICK] Tech Note',
        modalTag: 'CLUE // TECH NOTE',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue</p>
            <div class="p-4 bg-[#070e1d] rounded-lg font-mono text-[13px] text-[#dce2f7] space-y-2 border border-[#232a3a]">
              <p>"While the engineer <span class="text-[#ffb95f] font-bold underline">was repairing</span> the conduit, the alarm suddenly <span class="text-[#ffb4ab] font-bold underline">sounded</span>."</p>
              <p class="text-xs text-[#869397] pt-2">Tip: One action was happening (was + -ing). Then another action happened (Past Simple).</p>
            </div>
          </div>
        `,
        hint: 'One action happens while another is in progress. Use this to answer the question.',
        actionType: 'inspect',
      },
      {
        id: 'cryo_hatch',
        title: 'Locked Door',
        subtitle: 'Answer the question to open it',
        icon: 'lock',
        color: 'error',
        coords: { top: '40%', right: '14%' },
        tooltip: '[CLICK] Locked Door',
        modalTag: 'LOCKED DOOR // LOCKDOWN',
        contentHtml: '',
        hint: 'Click here to answer the question and open the second door.',
        actionType: 'puzzle',
        puzzleTargetId: 'room2_p1',
      },
    ],
    puzzles: [
      {
        id: 'room2_p1',
        roomIndex: 1,
        title: 'Past Simple vs. Continuous Calibration',
        code: 'TENSE PUZZLE #02',
        topic: 'Past Simple vs. Present Continuous & Interrupted Past',
        frequency: '218.45 MHz',
        promptSentence: '"Yesterday the lab power _____ off, but right now the power _____ on again."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'went / is',
            errorNote: 'Candidate Pattern // 01',
          },
          {
            id: 'B',
            label: 'B',
            text: 'was going / go',
            errorNote: 'SYNTAX_ERROR: TENSE_ASPECT_INVERSION',
          },
          {
            id: 'C',
            label: 'C',
            text: 'goes / was',
            errorNote: 'SYNTAX_ERROR: CHRONOLOGY_ERROR',
          },
          {
            id: 'D',
            label: 'D',
            text: 'is going / was going',
            errorNote: 'SYNTAX_ERROR: TEMPORAL_MISALIGNMENT',
          },
        ],
        correctOptionId: 'A',
        pedagogicalRuleTitle: 'Past Simple vs. Continuous Contrast',
        pedagogicalExplanation: `'Yesterday' means the past. We use the Past Simple: 'went'. 'Right now' means now. We use 'is' for 'the power' (it).`,
        syntaxBlueprint: {
          rulePart1: 'Past Simple (Completed Past Event)',
          operator: 'vs.',
          rulePart2: 'Present Continuous (are + verb-ing / Right Now)',
        },
        solvedSentence: {
          part1: 'Yesterday the lab power',
          highlight1: 'went',
          part2: 'off, but right now the power',
          highlight2: 'is',
          part3: 'on again.',
        },
        sentenceBreakdown: [
          { label: 'Completed Past', value: 'went', type: 'Past Simple', color: 'primary' },
          { label: 'Time Signal', value: 'right now', type: 'Present In-Progress', color: 'tertiary' },
          { label: 'Now', value: 'is', type: 'Present Simple (it)', color: 'secondary' },
        ],
      },
      {
        id: 'room2_p2',
        roomIndex: 1,
        title: 'Interrupted Past: Was/Were + -ing',
        code: 'TENSE PUZZLE #02B',
        topic: 'Past Continuous (Background Action) & Past Simple (Interruption)',
        frequency: '218.45 MHz',
        promptSentence: '"While the technicians _____ the cooling pipes, the lights suddenly _____."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'repaired / were going off',
            errorNote: 'SYNTAX_ERROR: CHRONOLOGY_ERROR',
          },
          {
            id: 'B',
            label: 'B',
            text: 'were repair / go off',
            errorNote: 'SYNTAX_ERROR: AGREEMENT_MISMATCH',
          },
          {
            id: 'C',
            label: 'C',
            text: 'were repairing / went off',
            errorNote: 'Candidate Pattern // 03',
          },
          {
            id: 'D',
            label: 'D',
            text: 'are repairing / was going off',
            errorNote: 'SYNTAX_ERROR: TENSE_ASPECT_INVERSION',
          },
        ],
        correctOptionId: 'C',
        pedagogicalRuleTitle: 'Background Action vs. Sudden Interruption',
        pedagogicalExplanation: `'While' introduces a longer action in progress in the past: 'were repairing' (Past Continuous). The sudden event that interrupts it is a completed action: 'went off' (Past Simple).`,
        syntaxBlueprint: {
          rulePart1: 'While + Past Continuous (was/were + -ing)',
          operator: '+',
          rulePart2: 'Past Simple (sudden interruption)',
        },
        solvedSentence: {
          part1: 'While the technicians',
          highlight1: 'were repairing',
          part2: 'the cooling pipes, the lights suddenly',
          highlight2: 'went off',
          part3: '.',
        },
        sentenceBreakdown: [
          { label: 'Background Action', value: 'were repairing', type: 'Past Continuous', color: 'primary' },
          { label: 'Interruption', value: 'went off', type: 'Past Simple', color: 'secondary' },
          { label: 'Time Marker', value: 'While', type: 'Background Clause', color: 'tertiary' },
        ],
        unlockedItem: {
          id: 'cryo_bypass',
          name: 'Cryo Bypass',
          title: 'CRYO-THERMAL BYPASS MODULE',
          cipherId: '#CR-5542',
          icon: 'ac_unit',
          color: 'secondary',
          description: 'You can use this item to go to the next room.',
          lore: 'Item to open the next door.',
        },
      },
    ],
  },

  // ==========================================
  // ROOM 03: Language Lab - Part 3 (The Lockdown)
  // ==========================================
  {
    id: 'room-03',
    index: 2,
    name: 'Language Lab - Room 3',
    code: '03 // MODAL VERBS',
    sectorTag: 'LANGUAGE LAB // AREA 3',
    clearance: 'CLEARANCE-C',
    level: 'LVL 03',
    locationName: 'LAB_ROOM_03',
    frequency: '584.10 MHz',
    primaryObjectiveTitle: 'Open the Third Door',
    primaryObjectiveDesc: 'You go on. Now the security system tries to stop you. You must follow the safety rules to pass this area. Find clues, answer the question, and open the third door to go to the exit.',
    clueMatrixCount: '4/4',
    grammarTopic: 'Modal Verbs of Obligation, Prohibition & Advice',
    competencyScore: 90,
    hotspots: [
      {
        id: 'safety_hologram',
        title: 'Safety Rules',
        subtitle: 'Read these rules',
        icon: 'warning',
        color: 'tertiary',
        coords: { top: '30%', left: '26%' },
        tooltip: '[CLICK] Safety Rules',
        modalTag: 'CLUE // SAFETY RULES',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Safety Rules</p>
            <div class="bg-[#070e1d] p-4 rounded-lg font-mono text-[13px] space-y-2.5 border border-[#232a3a]">
              <p><span class="text-[#ffb4ab] font-bold">MUST NOT</span> = It is not allowed. <br><span class="text-[#869397]">"You must not touch the laser."</span></p>
              <p><span class="text-[#ffb95f] font-bold">SHOULD</span> = Good idea / advice. <br><span class="text-[#869397]">"You should read the rules first."</span></p>
            </div>
            <p class="text-xs text-[#869397]">Use these rules to help you answer the question.</p>
          </div>
        `,
        hint: 'must not = not allowed. should = advice. Use them to answer the question.',
        actionType: 'inspect',
      },
      {
        id: 'circuit_breaker',
        title: 'Clue',
        subtitle: 'Look here',
        icon: 'bolt',
        color: 'primary',
        coords: { top: '65%', right: '35%' },
        tooltip: '[CLICK] Clue',
        modalTag: 'CLUE // SAFETY',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue</p>
            <p class="text-sm text-[#bcc9cd]">Remember: You must not cross the laser without protection. You should be careful.</p>
          </div>
        `,
        hint: 'must not = not allowed. should = good advice.',
        actionType: 'inspect',
      },
      {
        id: 'firewall_console',
        title: 'Locked Door',
        subtitle: 'Answer the question to open it',
        icon: 'lock',
        color: 'error',
        coords: { top: '44%', right: '12%' },
        tooltip: '[CLICK] Locked Door',
        modalTag: 'LOCKED DOOR // LOCKDOWN',
        contentHtml: '',
        hint: 'Click here to answer the question and open the third door.',
        actionType: 'puzzle',
        puzzleTargetId: 'room3_p1',
      },
    ],
    puzzles: [
      {
        id: 'room3_p1',
        roomIndex: 2,
        title: 'Modal Verbs: Prohibition vs. Advice',
        code: 'MODAL PUZZLE #03',
        topic: 'Modal Verbs (Must Not, Should, Can, Don\'t Have To)',
        frequency: '584.10 MHz',
        promptSentence: '"Security warning: You _____ cross the laser without permission, but you _____ read the safety rules first."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'don’t have to / must',
            errorNote: 'SYNTAX_ERROR: PROHIBITION_WEAKENED',
          },
          {
            id: 'B',
            label: 'B',
            text: 'must not / should',
            errorNote: 'Candidate Pattern // 02',
          },
          {
            id: 'C',
            label: 'C',
            text: 'should not / must not',
            errorNote: 'SYNTAX_ERROR: REDUNDANT_ADVICE',
          },
          {
            id: 'D',
            label: 'D',
            text: 'cannot to / should to',
            errorNote: 'SYNTAX_ERROR: INFINITIVE_MARKER_ERROR',
          },
        ],
        correctOptionId: 'B',
        pedagogicalRuleTitle: 'Strict Prohibition vs. Advisory Modals',
        pedagogicalExplanation: `'Must not' means it is not allowed. 'Should' means it is a good idea. Modal verbs are followed by the base verb (no 'to').`,
        syntaxBlueprint: {
          rulePart1: 'MUST NOT + Base Verb (Strict Prohibition)',
          operator: '+',
          rulePart2: 'SHOULD + Base Verb (Sound Advice)',
        },
        solvedSentence: {
          part1: 'Security warning: You',
          highlight1: 'must not',
          highlight2: 'should',
          part2: 'cross the laser without permission, but you',
          part3: 'read the safety rules first.',
        },
        sentenceBreakdown: [
          { label: 'Prohibition', value: 'must not', type: 'Modal of Prohibition', color: 'primary' },
          { label: 'Base Verb', value: 'cross', type: 'Bare Infinitive', color: 'secondary' },
          { label: 'Advisory', value: 'should', type: 'Modal of Advice', color: 'tertiary' },
        ],
      },
      {
        id: 'room3_p2',
        roomIndex: 2,
        title: 'Modal Verbs: Necessity vs. Permission',
        code: 'MODAL PUZZLE #03B',
        topic: "Modal Verbs (Don't Have To, Can, Must Not)",
        frequency: '584.10 MHz',
        promptSentence: '"The backup generator is working, so you _____ shut down the reactor. Still, you _____ use the emergency elevator if you need it."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'must not / can',
            errorNote: 'SYNTAX_ERROR: PROHIBITION_MISPLACED',
          },
          {
            id: 'B',
            label: 'B',
            text: "don't have to / can",
            errorNote: 'Candidate Pattern // 02',
          },
          {
            id: 'C',
            label: 'C',
            text: 'cannot to / should',
            errorNote: 'SYNTAX_ERROR: INFINITIVE_MARKER_ERROR',
          },
          {
            id: 'D',
            label: 'D',
            text: 'must / should not',
            errorNote: 'SYNTAX_ERROR: REDUNDANT_ADVICE',
          },
        ],
        correctOptionId: 'B',
        pedagogicalRuleTitle: "Don't Have To (No Obligation) vs. Must Not",
        pedagogicalExplanation: `"Don't have to" means something is not necessary. "Can" shows permission. "Must not" would mean the action is forbidden, which does not fit this situation.`,
        syntaxBlueprint: {
          rulePart1: "DON'T HAVE TO + Base Verb (No obligation)",
          operator: '+',
          rulePart2: 'CAN + Base Verb (Permission)',
        },
        solvedSentence: {
          part1: 'The backup generator is working, so you',
          highlight1: "don't have to",
          part2: 'shut down the reactor. Still, you',
          highlight2: 'can',
          part3: 'use the emergency elevator if you need it.',
        },
        sentenceBreakdown: [
          { label: 'No Obligation', value: "don't have to", type: 'Modal of Necessity', color: 'primary' },
          { label: 'Base Verb', value: 'shut down', type: 'Bare Infinitive', color: 'secondary' },
          { label: 'Permission', value: 'can', type: 'Modal of Permission', color: 'tertiary' },
        ],
        unlockedItem: {
          id: 'quantum_key',
          name: 'Decryption Key',
          title: 'QUANTUM CRYPTOGRAPHIC KEY',
          cipherId: '#QK-7719',
          icon: 'vpn_key',
          color: 'tertiary',
          description: 'You can use this key to go to the next room.',
          lore: 'Key to open the next door.',
        },
      },
    ],
  },

  // ==========================================
  // ROOM 04: Language Lab - Part 4 (The Lockdown)
  // ==========================================
  {
    id: 'room-04',
    index: 3,
    name: 'Language Lab - Room 4',
    code: '04 // FINAL EXTRACTION',
    sectorTag: 'LANGUAGE LAB // AREA 4',
    clearance: 'CLEARANCE-OMEGA',
    level: 'LVL 04',
    locationName: 'LAB_ROOM_04',
    frequency: '992.00 MHz',
    primaryObjectiveTitle: 'Open the Exit Door',
    primaryObjectiveDesc: 'You are now near the main exit. The lockdown is still on. You need to find clues, answer the question, and open the exit door to get out of the lab.',
    clueMatrixCount: '4/4',
    grammarTopic: 'Zero/First Conditionals & Imperative Directives',
    competencyScore: 100,
    hotspots: [
      {
        id: 'airlock_slate',
        title: 'Exit Instructions',
        subtitle: 'Read this clue',
        icon: 'terminal',
        color: 'primary',
        coords: { top: '35%', left: '20%' },
        tooltip: '[CLICK] Exit Instructions',
        modalTag: 'CLUE // EXIT INSTRUCTIONS',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue</p>
            <div class="bg-[#070e1d] p-4 rounded-lg font-mono text-[13px] space-y-2 border border-[#232a3a]">
              <p><span class="text-[#4cd7f6] font-bold">Rule:</span> If + Present Simple, Imperative (base verb)</p>
              <p class="text-[#bcc9cd]">Example: "If the light <span class="text-[#4edea3]">flashes</span>, <span class="text-[#4edea3]">press</span> the button."</p>
              <div class="border-t border-[#191f2f] pt-2 text-[#ffb4ab] text-xs">
                Do NOT use "will" after "If".
              </div>
            </div>
            <p class="text-xs text-[#869397]">Use this to help you answer the question and open the exit door.</p>
          </div>
        `,
        hint: 'If + Present Simple. Then use the base verb (imperative). Do not use "will" after If.',
        actionType: 'inspect',
      },
      {
        id: 'manual_lever',
        title: 'Last Clue',
        subtitle: 'Look here',
        icon: 'tune',
        color: 'secondary',
        coords: { bottom: '22%', right: '35%' },
        tooltip: '[CLICK] Last Clue',
        modalTag: 'CLUE // LAST CLUE',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Clue</p>
            <p class="text-sm text-[#bcc9cd]">You are very close to the exit. Use all the clues you found to answer the last question.</p>
          </div>
        `,
        hint: 'Use the rule: If + Present Simple, then use the base verb (imperative).',
        actionType: 'inspect',
      },
      {
        id: 'final_blast_door',
        title: 'Exit Door',
        subtitle: 'Answer the question to open it',
        icon: 'lock',
        color: 'error',
        coords: { top: '40%', right: '15%' },
        tooltip: '[CLICK] Exit Door',
        modalTag: 'LOCKED DOOR // EXIT',
        contentHtml: '',
        hint: 'Click here to answer the question and open the exit door to get out.',
        actionType: 'puzzle',
        puzzleTargetId: 'room4_p1',
      },
    ],
    puzzles: [
      {
        id: 'room4_p1',
        roomIndex: 3,
        title: 'Final Conditional & Extraction Command',
        code: 'FINAL PUZZLE #04',
        topic: 'Conditionals (If-clauses) & Imperative Commands',
        frequency: '992.00 MHz',
        promptSentence: '"Emergency: If the door pressure _____ low, immediately _____ the button."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'will drop / press',
            errorNote: 'SYNTAX_ERROR: FUTURE_IN_IF_CLAUSE',
          },
          {
            id: 'B',
            label: 'B',
            text: 'drops / press',
            errorNote: 'Candidate Pattern // 02',
          },
          {
            id: 'C',
            label: 'C',
            text: 'drop / pulling',
            errorNote: 'SYNTAX_ERROR: 3RD_SINGULAR_OMISSION',
          },
          {
            id: 'D',
            label: 'D',
            text: 'is dropping / you pull',
            errorNote: 'SYNTAX_ERROR: IMPERATIVE_STRUCTURE_FAULT',
          },
        ],
        correctOptionId: 'B',
        pedagogicalRuleTitle: 'First Conditional with Imperative Directive',
        pedagogicalExplanation: `In a first conditional with an instruction, use Present Simple in the 'if' part ('drops'). Do not use 'will' after 'if'. Use the base verb (imperative) in the second part ('press').`,
        syntaxBlueprint: {
          rulePart1: 'If + Subject + Present Simple(-s)',
          operator: '→',
          rulePart2: 'Imperative Base Verb (press)',
        },
        solvedSentence: {
          part1: 'Emergency: If the door pressure',
          highlight1: 'drops',
          part2: 'low, immediately',
          highlight2: 'press',
          part3: 'the button.',
        },
        sentenceBreakdown: [
          { label: 'Condition', value: 'drops', type: 'Present Simple 3rd Person', color: 'primary' },
          { label: 'Imperative Command', value: 'press', type: 'Base Form Instruction', color: 'secondary' },
          { label: 'Syntax Synthesis', value: 'Conditional', type: 'First Conditional Form', color: 'tertiary' },
        ],
      },
      {
        id: 'room4_p2',
        roomIndex: 3,
        title: 'Zero Conditional: Scientific Facts',
        code: 'FINAL PUZZLE #04B',
        topic: 'Zero Conditional (If + Present Simple, Present Simple)',
        frequency: '992.00 MHz',
        promptSentence: '"Lab fact: If water _____ 100 degrees Celsius, it _____ into steam."',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'will reach / turns',
            errorNote: 'SYNTAX_ERROR: FUTURE_IN_IF_CLAUSE',
          },
          {
            id: 'B',
            label: 'B',
            text: 'reaches / will turn',
            errorNote: 'SYNTAX_ERROR: FACT_VS_PREDICTION',
          },
          {
            id: 'C',
            label: 'C',
            text: 'reaches / turns',
            errorNote: 'Candidate Pattern // 03',
          },
          {
            id: 'D',
            label: 'D',
            text: 'reach / turning',
            errorNote: 'SYNTAX_ERROR: 3RD_SINGULAR_OMISSION',
          },
        ],
        correctOptionId: 'C',
        pedagogicalRuleTitle: 'Zero Conditional: General Truths',
        pedagogicalExplanation: `A zero conditional describes general truths. Use the Present Simple in both parts: 'reaches' (water is third-person singular) and 'turns' (it). 'Will' is used for predictions, not for scientific facts.`,
        syntaxBlueprint: {
          rulePart1: 'If + Subject + Present Simple (-s)',
          operator: '+',
          rulePart2: 'Subject + Present Simple (-s)',
        },
        solvedSentence: {
          part1: 'Lab fact: If water',
          highlight1: 'reaches',
          part2: '100 degrees Celsius, it',
          highlight2: 'turns',
          part3: 'into steam.',
        },
        sentenceBreakdown: [
          { label: 'Condition', value: 'reaches', type: 'Present Simple 3rd Person', color: 'primary' },
          { label: 'Result', value: 'turns', type: 'Present Simple (it)', color: 'secondary' },
          { label: 'Fact Type', value: 'Zero Conditional', type: 'General Truth', color: 'tertiary' },
        ],
        unlockedItem: {
          id: 'extraction_token',
          name: 'Extraction Pass',
          title: 'ORBITAL EXTRACTION AUTHORITY',
          cipherId: '#EX-9900',
          icon: 'verified',
          color: 'primary',
          description: 'Exit pass. You can open the exit door and get out of the lab.',
          lore: 'You completed all the rooms. Time to get out!',
        },
      },
    ],
  },
];
