import { RoomData } from '../types/game';

export const roomsData: RoomData[] = [
  // ==========================================
  // ROOM 01: The Archive Vault (Verb To Be & Daily Routines)
  // ==========================================
  {
    id: 'room-01',
    index: 0,
    name: "Professor Vane's Study",
    code: '01 // TO BE & ROUTINES',
    sectorTag: 'ACTIVE ARCHIVE // SECTOR-7B',
    clearance: 'CLEARANCE-A',
    level: 'LVL 01',
    locationName: 'VAULT_01_CORE',
    frequency: '142.80 MHz',
    primaryObjectiveTitle: 'Present Simple Syntax Decryption',
    primaryObjectiveDesc: 'Investigate the encrypted research memo to deduce the 4-verb combination for the brass drawer and calibrate the security terminal.',
    clueMatrixCount: '2/4',
    grammarTopic: 'Verb To Be & Daily Routines (Present Simple)',
    competencyScore: 100,
    hotspots: [
      {
        id: 'bookshelf',
        title: 'Syntax Encyclopedia',
        subtitle: 'Reference: 3rd Person Singular Rules',
        icon: 'menu_book',
        color: 'primary',
        coords: { top: '28%', left: '17%' },
        tooltip: '[CLICK] Syntax Encyclopedia',
        modalTag: 'ARCHIVE REFERENCE // SYNTAX ENCYCLOPEDIA',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Linguistic Grammar Codex</p>
            <p class="text-sm text-[#bcc9cd]">Chapter IV: Habits, Routines & General Truths (Present Simple).</p>
            <div class="bg-[#070e1d] p-4 rounded-lg font-mono text-[13px] text-[#dce2f7] space-y-2 border border-[#232a3a]">
              <p><span class="text-[#4cd7f6] font-bold">I / You / We / They</span> → Verb (base form): <span class="text-[#4edea3]">I inspect, they study.</span></p>
              <p><span class="text-[#ffb95f] font-bold">He / She / It</span> → Verb + <span class="text-[#4edea3] font-bold">-s / -es</span>: <span class="text-[#4edea3]">He inspects, she studies.</span></p>
              <div class="border-t border-[#191f2f] pt-2 text-[#869397] text-xs">
                // IRREGULAR FORMS: "To Be" → <em>am / is / are</em>. "Have" → <em>has</em>. "Go" → <em>goes</em>.
              </div>
            </div>
            <p class="text-xs text-[#869397]">Keep this rule in mind when inspecting the locked mahogany desk drawer and the vault door keypad.</p>
          </div>
        `,
        hint: 'Cross-reference this rule with the note on the laboratory counter.',
        actionType: 'inspect',
      },
      {
        id: 'memo',
        title: 'Encrypted Memo',
        subtitle: 'Decryption Clue: "The Professor\'s Day"',
        icon: 'description',
        color: 'secondary',
        coords: { top: '58%', right: '27%' },
        tooltip: '[CLICK] Encrypted Memo',
        modalTag: 'FIELD MEMO // PROFESSOR\'S DAILY LOG',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Decrypted Diary Fragment:</p>
            <div class="p-4 bg-[#070e1d] rounded-lg font-mono text-[13px] text-[#4cd7f6] space-y-2 border border-[#232a3a]">
              <p>"Every day at 07:00, Dr. Vane <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">unlocks</span> the outer gate."</p>
              <p>"He never <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">drinks</span> coffee before he <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">reviews</span> the cipher logs."</p>
              <p>"At noon, he <span class="text-[#ffb95f] font-bold underline decoration-[#ffb95f]">locks</span> the security vault."</p>
            </div>
            <p class="text-xs text-[#869397]">Observation: The desk drawer tumbler requires four verbs matching the Professor's sequence. Notice the Present Simple 3rd-person singular endings (<span class="text-[#4edea3]">-s / -es</span>).</p>
          </div>
        `,
        hint: 'The verbs in sequence: UNLOCKS, DRINKS, REVIEWS, LOCKS.',
        actionType: 'inspect',
      },
      {
        id: 'drawer',
        title: 'Locked Desk Drawer',
        subtitle: 'Grammar Cipher Dial // Present Simple',
        icon: 'key',
        color: 'tertiary',
        coords: { bottom: '16%', left: '58%' },
        tooltip: '[CLICK] Locked Desk Drawer',
        modalTag: 'CIPHER LOCK // DESK DRAWER CYLINDER',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Present Simple Dial Tumbler</p>
            <p class="text-sm text-[#bcc9cd]">Select the correct 3rd-person singular verb forms according to Dr. Vane's schedule:</p>
            <div class="bg-[#070e1d] p-4 rounded-lg space-y-2.5 font-mono text-[13px] border border-[#232a3a]">
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">1. He (unlock / unlocks):</span>
                <span class="text-[#4edea3] bg-[#191f2f] px-2.5 py-0.5 rounded font-bold">UNLOCKS</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">2. He (drink / drinks):</span>
                <span class="text-[#4edea3] bg-[#191f2f] px-2.5 py-0.5 rounded font-bold">DRINKS</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">3. He (review / reviews):</span>
                <span class="text-[#4edea3] bg-[#191f2f] px-2.5 py-0.5 rounded font-bold">REVIEWS</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[#869397]">4. He (lock / locks):</span>
                <span class="text-[#4edea3] bg-[#191f2f] px-2.5 py-0.5 rounded font-bold">LOCKS</span>
              </div>
            </div>
            <div class="p-3 bg-[#005236]/20 rounded border border-[#4edea3]/40 text-[#4edea3] text-xs">
              Tumblers aligned! The brass cylinder pops open, exposing the security override code for the terminal!
            </div>
          </div>
        `,
        hint: 'Proceed to the Vault Door terminal to calibrate the access cipher.',
        actionType: 'inspect',
      },
      {
        id: 'door',
        title: 'High-Security Vault Door',
        subtitle: 'Auth Override Required',
        icon: 'lock',
        color: 'error',
        coords: { top: '42%', right: '11%' },
        tooltip: '[CLICK] High-Security Vault Door Terminal',
        modalTag: 'PERIMETER LOCK // HIGH-SECURITY VAULT',
        contentHtml: '',
        hint: 'Launch the Cipher Decoder to solve the Subject-Verb Agreement puzzle!',
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
        promptSentence: '“Dr. Aris _____ in the research vault every night, but today the security gates _____ locked.”',
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
        pedagogicalExplanation: `‘Dr. Aris’ is a third-person singular noun (He/She), which demands the present simple verb ending in ‘-s’ (works). Meanwhile, ‘the security gates’ is a plural noun subject, requiring the corresponding plural form of the verb to be — which is are (rather than singular is).`,
        syntaxBlueprint: {
          rulePart1: 'He / She / It + Verb(-s/-es)',
          operator: '+',
          rulePart2: 'Plural Subject + are',
        },
        solvedSentence: {
          part1: 'Dr. Aris',
          highlight1: 'works',
          part2: 'in the research vault every night, but today the security gates',
          highlight2: 'are locked',
          part3: '.',
        },
        sentenceBreakdown: [
          { label: 'Habitual Routine', value: 'works', type: 'Simple Present 3rd Sing.', color: 'primary' },
          { label: 'Contrast Marker', value: 'today', type: 'Temporary Context', color: 'tertiary' },
          { label: 'Passive State', value: 'are locked', type: 'Plural Verb to Be', color: 'secondary' },
        ],
        unlockedItem: {
          id: 'keycard_lvl2',
          name: 'Keycard',
          title: 'BLUE CIPHER KEYCARD (LEVEL 2 ACCESS)',
          cipherId: '#CC-9021',
          icon: 'badge',
          color: 'primary',
          description: 'Frequency matched. Use this card at the Primary Vault Exit Door to unlock Room 2 (Tenses & Irregular Verbs).',
          lore: 'Military-grade cryptographic access card encoded with 3rd-person singular syntax hash.',
        },
      },
    ],
  },

  // ==========================================
  // ROOM 02: The Cryo-Chamber & Power Conduit (Past Simple vs. Continuous)
  // ==========================================
  {
    id: 'room-02',
    index: 1,
    name: 'Sub-Level Cryo-Conduit',
    code: '02 // VERB TENSES',
    sectorTag: 'CRYO-CONTAINMENT // SECTOR-4C',
    clearance: 'CLEARANCE-B',
    level: 'LVL 02',
    locationName: 'CRYO_CHAMBER_NORTH',
    frequency: '218.45 MHz',
    primaryObjectiveTitle: 'Past Simple vs. Continuous Calibration',
    primaryObjectiveDesc: 'Diagnose the coolant rupture log to balance the temporal valves and bypass the sub-zero blast hatch.',
    clueMatrixCount: '3/4',
    grammarTopic: 'Past Simple vs. Present/Past Continuous',
    competencyScore: 95,
    hotspots: [
      {
        id: 'coolant_gauge',
        title: 'Cryo Pressure Gauge',
        subtitle: 'Temporal Analysis: Finished Past vs. Ongoing Action',
        icon: 'speed',
        color: 'primary',
        coords: { top: '35%', left: '22%' },
        tooltip: '[CLICK] Pressure Gauge Log',
        modalTag: 'TELEMETRY RECORD // PRESSURE FLUIDICS',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Sub-Zero Pressure Diagnostic</p>
            <div class="p-4 bg-[#070e1d] rounded-lg font-mono text-[13px] space-y-2 border border-[#232a3a]">
              <p class="text-[#bcc9cd]">&gt; EVENT T-24H: "Yesterday at 04:00, the main intake valve <span class="text-[#4cd7f6] font-bold">burst</span> (Past Simple: completed past event)."</p>
              <p class="text-[#bcc9cd]">&gt; EVENT LIVE: "At this exact moment, coolant <span class="text-[#4edea3] font-bold">is flowing</span> into the emergency conduits (Present Continuous: happening right now)."</p>
            </div>
            <p class="text-xs text-[#869397]">Notice the contrast: Specific past time ("yesterday") uses Past Simple. "Right now / at this moment" demands Present Continuous (am/is/are + verb-ing).</p>
          </div>
        `,
        hint: 'Past Simple shows completed past events. Present Continuous shows live actions in progress.',
        actionType: 'inspect',
      },
      {
        id: 'incident_recorder',
        title: 'Wiretap Incident Audio Log',
        subtitle: 'Interrupted Past Action Analysis',
        icon: 'graphic_eq',
        color: 'secondary',
        coords: { top: '60%', left: '46%' },
        tooltip: '[CLICK] Audio Log Terminal',
        modalTag: 'AUDIO DOSSIER // CRYO INCIDENT WIRE',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Technician Comm Log #402:</p>
            <div class="p-4 bg-[#070e1d] rounded-lg font-mono text-[13px] text-[#dce2f7] space-y-2 border border-[#232a3a]">
              <p>"Listen closely to the order of events: While the engineer <span class="text-[#ffb95f] font-bold underline">was repairing</span> the conduit, the alarm suddenly <span class="text-[#ffb4ab] font-bold underline">sounded</span>."</p>
              <p class="text-xs text-[#869397] pt-2">// GRAMMAR BLUEPRINT: Long continuous background activity (was/were + -ing) + Sudden interrupting event (Past Simple -ed or irregular).</p>
            </div>
          </div>
        `,
        hint: 'While + Past Continuous, Past Simple interruption.',
        actionType: 'inspect',
      },
      {
        id: 'cryo_hatch',
        title: 'Sub-Zero Bulkhead Hatch',
        subtitle: 'Thermal Lock Override',
        icon: 'lock',
        color: 'error',
        coords: { top: '40%', right: '14%' },
        tooltip: '[CLICK] Sub-Zero Bulkhead Hatch',
        modalTag: 'BULKHEAD OVERRIDE // SECTOR 4C',
        contentHtml: '',
        hint: 'Open the Cipher Decoder to solve the Tense Calibration puzzle!',
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
        promptSentence: '“Yesterday the cooling conduit _____ under pressure, but right now the auxiliary pumps _____ nitrogen safely.”',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'burst / are circulating',
            errorNote: 'Candidate Pattern // 01',
          },
          {
            id: 'B',
            label: 'B',
            text: 'was bursting / circulate',
            errorNote: 'SYNTAX_ERROR: TENSE_ASPECT_INVERSION',
          },
          {
            id: 'C',
            label: 'C',
            text: 'bursts / circulated',
            errorNote: 'SYNTAX_ERROR: CHRONOLOGY_ERROR',
          },
          {
            id: 'D',
            label: 'D',
            text: 'is bursting / was circulating',
            errorNote: 'SYNTAX_ERROR: TEMPORAL_MISALIGNMENT',
          },
        ],
        correctOptionId: 'A',
        pedagogicalRuleTitle: 'Past Simple vs. Continuous Contrast',
        pedagogicalExplanation: `‘Yesterday’ is a definite finished past time marker, which requires the Past Simple form of the irregular verb ‘burst’ (burst remains burst in past simple). In contrast, ‘right now’ explicitly denotes an ongoing action happening at the current moment, which requires Present Continuous with plural agreement: ‘are circulating’.`,
        syntaxBlueprint: {
          rulePart1: 'Past Simple (Completed Past Event)',
          operator: 'vs.',
          rulePart2: 'Present Continuous (are + verb-ing / Right Now)',
        },
        solvedSentence: {
          part1: 'Yesterday the cooling conduit',
          highlight1: 'burst',
          part2: 'under pressure, but right now the auxiliary pumps',
          highlight2: 'are circulating',
          part3: 'nitrogen safely.',
        },
        sentenceBreakdown: [
          { label: 'Completed Past', value: 'burst', type: 'Irregular Past Simple', color: 'primary' },
          { label: 'Time Signal', value: 'right now', type: 'Present In-Progress', color: 'tertiary' },
          { label: 'Ongoing Action', value: 'are circulating', type: 'Present Continuous Plural', color: 'secondary' },
        ],
        unlockedItem: {
          id: 'cryo_bypass',
          name: 'Cryo Bypass',
          title: 'CRYO-THERMAL BYPASS MODULE',
          cipherId: '#CR-5542',
          icon: 'ac_unit',
          color: 'secondary',
          description: 'Sub-zero heat exchanger key. Unlocks the high-voltage laser grid in Sector-9A.',
          lore: 'Cooled superconducting module tuned to past/continuous phase shift.',
        },
      },
    ],
  },

  // ==========================================
  // ROOM 03: The High-Voltage Security Grid (Modal Verbs)
  // ==========================================
  {
    id: 'room-03',
    index: 2,
    name: 'Neural Core Defense Grid',
    code: '03 // MODAL VERBS',
    sectorTag: 'NEURAL CORE // SECTOR-9A',
    clearance: 'CLEARANCE-C',
    level: 'LVL 03',
    locationName: 'LASER_MATRIX_CORE',
    frequency: '584.10 MHz',
    primaryObjectiveTitle: 'Modal Verbs: Obligation & Prohibition',
    primaryObjectiveDesc: 'Analyze the laser security protocols to deduce rules for Must, Must Not, Should, and Don\'t Have To.',
    clueMatrixCount: '4/4',
    grammarTopic: 'Modal Verbs of Obligation, Prohibition & Advice',
    competencyScore: 90,
    hotspots: [
      {
        id: 'safety_hologram',
        title: 'Safety Matrix Warning',
        subtitle: 'Rules: Must Not vs. Don\'t Have To',
        icon: 'warning',
        color: 'tertiary',
        coords: { top: '30%', left: '26%' },
        tooltip: '[CLICK] Safety Matrix Warning',
        modalTag: 'SAFETY CODE // MODAL DIRECTIVES',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">High-Voltage Protocol Handbook</p>
            <div class="bg-[#070e1d] p-4 rounded-lg font-mono text-[13px] space-y-2.5 border border-[#232a3a]">
              <p><span class="text-[#ffb4ab] font-bold">MUST NOT</span> = Strict Prohibition (It is forbidden & dangerous!). <br><span class="text-[#869397]">"You must not touch the live coil."</span></p>
              <p><span class="text-[#4cd7f6] font-bold">DON\'T HAVE TO</span> = No obligation (It is optional, not forbidden!). <br><span class="text-[#869397]">"You don\'t have to wear the heavy helmet if the shields are up."</span></p>
              <p><span class="text-[#ffb95f] font-bold">SHOULD</span> = Recommendation or friendly advice. <br><span class="text-[#869397]">"You should calibrate the sensors before entry."</span></p>
            </div>
            <p class="text-xs text-[#869397]">Confusing 'must not' and 'don\'t have to' causes fatal circuit failures. Remember: Modal verbs are followed by bare infinitive (no "to").</p>
          </div>
        `,
        hint: 'Must not = strictly forbidden. Don\'t have to = not necessary.',
        actionType: 'inspect',
      },
      {
        id: 'circuit_breaker',
        title: 'Laser Grid Power Shunt',
        subtitle: 'Optic Isolation Terminal',
        icon: 'bolt',
        color: 'primary',
        coords: { top: '65%', right: '35%' },
        tooltip: '[CLICK] Laser Grid Power Shunt',
        modalTag: 'OPTIC CIRCUIT // LASER SHUNT',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Optic Shield Protocol</p>
            <p class="text-sm text-[#bcc9cd]">To pass the laser grid safely, enter the correct modal permission code at the central console.</p>
          </div>
        `,
        hint: 'Focus on strict prohibition vs advisable actions.',
        actionType: 'inspect',
      },
      {
        id: 'firewall_console',
        title: 'Laser Matrix Core Terminal',
        subtitle: 'Modal Decoder Node',
        icon: 'lock',
        color: 'error',
        coords: { top: '44%', right: '12%' },
        tooltip: '[CLICK] Laser Matrix Core Terminal',
        modalTag: 'FIREWALL DECRYPTION // MODAL VERBS',
        contentHtml: '',
        hint: 'Launch the Cipher Decoder to solve the Modal Verb puzzle!',
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
        promptSentence: '“Security Warning: Operatives _____ cross the energized laser barrier without an isolator shield, but you _____ consult the terminal logs first for safety.”',
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
        pedagogicalExplanation: `‘Must not’ is essential here because crossing a lethal laser barrier is strictly forbidden by safety protocol (not merely optional). Conversely, consulting terminal logs is good advice and best practice, which correctly uses the advisory modal ‘should’. Note that modal verbs are followed directly by the base verb without ‘to’.`,
        syntaxBlueprint: {
          rulePart1: 'MUST NOT + Base Verb (Strict Prohibition)',
          operator: '+',
          rulePart2: 'SHOULD + Base Verb (Sound Advice)',
        },
        solvedSentence: {
          part1: 'Security Warning: Operatives',
          highlight1: 'must not',
          part2: 'cross the energized laser barrier without an isolator shield, but you',
          highlight2: 'should',
          part3: 'consult the terminal logs first for safety.',
        },
        sentenceBreakdown: [
          { label: 'Prohibition', value: 'must not', type: 'Modal of Prohibition', color: 'primary' },
          { label: 'Base Verb', value: 'cross', type: 'Bare Infinitive', color: 'secondary' },
          { label: 'Advisory', value: 'should', type: 'Modal of Advice', color: 'tertiary' },
        ],
        unlockedItem: {
          id: 'quantum_key',
          name: 'Decryption Key',
          title: 'QUANTUM CRYPTOGRAPHIC KEY',
          cipherId: '#QK-7719',
          icon: 'vpn_key',
          color: 'tertiary',
          description: 'Master decryption key for the Final Extraction Airlock in Sector-10.',
          lore: 'Entangled photon key coded with modal directives of authority.',
        },
      },
    ],
  },

  // ==========================================
  // ROOM 04: The Final Extraction Airlock (Conditionals & Synthesis)
  // ==========================================
  {
    id: 'room-04',
    index: 3,
    name: 'Orbital Extraction Airlock',
    code: '04 // FINAL EXTRACTION',
    sectorTag: 'ORBITAL DOCK // EXTRACTION AIRLOCK',
    clearance: 'CLEARANCE-OMEGA',
    level: 'LVL 04',
    locationName: 'EXTRACTION_BAY_04',
    frequency: '992.00 MHz',
    primaryObjectiveTitle: 'Master Conditional Directives & Extraction',
    primaryObjectiveDesc: 'Execute the final conditional decompression protocol to unlock the main blast doors and initiate orbital extraction.',
    clueMatrixCount: '4/4',
    grammarTopic: 'Zero/First Conditionals & Imperative Directives',
    competencyScore: 100,
    hotspots: [
      {
        id: 'airlock_slate',
        title: 'Emergency Decompression Slate',
        subtitle: 'Conditional Protocols: If + Present, Will / Imperative',
        icon: 'terminal',
        color: 'primary',
        coords: { top: '35%', left: '20%' },
        tooltip: '[CLICK] Decompression Slate',
        modalTag: 'FINAL DIRECTIVE // CONDITIONAL CLAUSES',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Airlock Evacuation Protocol</p>
            <div class="bg-[#070e1d] p-4 rounded-lg font-mono text-[13px] space-y-2 border border-[#232a3a]">
              <p><span class="text-[#4cd7f6] font-bold">First Conditional:</span> Real possibilities in the future.</p>
              <p class="text-[#bcc9cd]">&gt; IF-Clause: <span class="text-[#ffb95f]">If + Present Simple</span> ("If the warning light <span class="text-[#4edea3]">flashes</span>...")</p>
              <p class="text-[#bcc9cd]">&gt; Command / Result: <span class="text-[#ffb95f]">Imperative (Base Verb)</span> or <span class="text-[#ffb95f]">will + verb</span> ("...<span class="text-[#4edea3]">press</span> the manual release immediately.")</p>
              <div class="border-t border-[#191f2f] pt-2 text-[#ffb4ab] text-xs">
                RULE: NEVER put "will" inside the IF-clause! (Incorrect: "If it will flash...")
              </div>
            </div>
          </div>
        `,
        hint: 'If-clause takes Present Simple. The instruction clause takes Imperative base verb.',
        actionType: 'inspect',
      },
      {
        id: 'manual_lever',
        title: 'Hydraulic Emergency Lever',
        subtitle: 'Secondary Mechanical Safeguard',
        icon: 'tune',
        color: 'secondary',
        coords: { bottom: '22%', right: '35%' },
        tooltip: '[CLICK] Hydraulic Emergency Lever',
        modalTag: 'MECHANICAL SAFEGUARD // HYDRAULIC LEVER',
        contentHtml: `
          <div class="flex flex-col gap-3">
            <p class="text-[#dce2f7] font-semibold text-lg">Manual Extraction Safeguard</p>
            <p class="text-sm text-[#bcc9cd]">Armed and primed. Awaiting digital authorization from the main airlock keypad.</p>
          </div>
        `,
        hint: 'Enter the final syntax sequence into the blast door terminal.',
        actionType: 'inspect',
      },
      {
        id: 'final_blast_door',
        title: 'Orbital Extraction Blast Doors',
        subtitle: 'Final Extraction Protocol',
        icon: 'lock',
        color: 'error',
        coords: { top: '40%', right: '15%' },
        tooltip: '[CLICK] Orbital Blast Doors',
        modalTag: 'FINAL EXTRACTION // BLAST DOOR KEYPAD',
        contentHtml: '',
        hint: 'Solve the final Conditional Directive puzzle to blow the doors open!',
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
        promptSentence: '“Emergency Directive: If the cabin pressure _____ below safety margins, immediately _____ the hydraulic override lever.”',
        promptBlank1: '_____',
        promptBlank2: '_____',
        options: [
          {
            id: 'A',
            label: 'A',
            text: 'will drop / pull',
            errorNote: 'SYNTAX_ERROR: FUTURE_IN_IF_CLAUSE',
          },
          {
            id: 'B',
            label: 'B',
            text: 'drops / pull',
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
        pedagogicalExplanation: `In English conditional directives, the ‘if’-clause requires the Present Simple with third-person singular agreement (‘cabin pressure drops’). We never use ‘will’ inside the ‘if’ condition. The following action clause is a direct instruction (Imperative), which uses the bare base form of the verb (‘pull’).`,
        syntaxBlueprint: {
          rulePart1: 'If + Subject + Present Simple(-s)',
          operator: '→',
          rulePart2: 'Imperative Base Verb (pull)',
        },
        solvedSentence: {
          part1: 'Emergency Directive: If the cabin pressure',
          highlight1: 'drops',
          part2: 'below safety margins, immediately',
          highlight2: 'pull',
          part3: 'the hydraulic override lever.',
        },
        sentenceBreakdown: [
          { label: 'Condition', value: 'drops', type: 'Present Simple 3rd Person', color: 'primary' },
          { label: 'Imperative Command', value: 'pull', type: 'Base Form Instruction', color: 'secondary' },
          { label: 'Syntax Synthesis', value: 'Conditional', type: 'First Conditional Form', color: 'tertiary' },
        ],
        unlockedItem: {
          id: 'extraction_token',
          name: 'Extraction Pass',
          title: 'ORBITAL EXTRACTION AUTHORITY',
          cipherId: '#EX-9900',
          icon: 'verified',
          color: 'primary',
          description: 'Full linguistic clearance granted. Blast doors opening into orbital extraction shuttle.',
          lore: 'Master pedagogical certificate of completion signed by Cipher Labs AI.',
        },
      },
    ],
  },
];
