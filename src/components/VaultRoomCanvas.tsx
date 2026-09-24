import React from 'react';
import { RoomData, Hotspot } from '../types/game';
import { soundFx } from '../utils/audio';

interface VaultRoomCanvasProps {
  room: RoomData;
  onSelectHotspot: (hotspot: Hotspot) => void;
  onOpenDecoder: () => void;
  onRequestHint: () => void;
  discoveredHotspotsCount: number;
}

export const VaultRoomCanvas: React.FC<VaultRoomCanvasProps> = ({
  room,
  onSelectHotspot,
  onOpenDecoder,
  onRequestHint,
  discoveredHotspotsCount,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
      {/* Atmospheric Header Status & Objective Bar */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Sector Indicator Card */}
        <div className="lg:col-span-4 bg-[#141b2b]/90 border border-[#232a3a] backdrop-blur-md p-4 rounded-xl flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]"></span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#4edea3]">
                {room.sectorTag}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#869397] px-2 py-0.5 rounded bg-[#191f2f] border border-[#232a3a]">
              SEC: {room.clearance}
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#dce2f7]">
                {room.name}
              </h2>
              <p className="font-['Inter'] text-xs text-[#bcc9cd]">
                Linguistic Forensics & Syntax Verification
              </p>
            </div>
            <span className="font-mono text-[#4cd7f6] text-[13px] font-bold">{room.level}</span>
          </div>
        </div>

        {/* Main Tactical Directive / Linguistic Target Widget */}
        <div className="lg:col-span-8 bg-[#141b2b]/90 border border-[#232a3a] backdrop-blur-md p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/20 border border-[#4cd7f6]/40 text-[#4cd7f6] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(6,182,212,0.25)]">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[11px] text-[#ffb95f] uppercase font-semibold">
                  Primary Objective
                </span>
                <span className="text-[#3d494c] text-[10px]">•</span>
                <span className="font-mono text-[11px] text-[#869397]">
                  {room.primaryObjectiveTitle}
                </span>
              </div>
              <p className="font-['Inter'] text-sm text-[#dce2f7] font-semibold truncate mt-0.5">
                {room.primaryObjectiveDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onOpenDecoder();
              }}
              className="px-3.5 py-2 bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#4cd7f6] font-['Plus_Jakarta_Sans'] font-semibold text-[12px] rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">rule</span>
              <span>Open Decoder Terminal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Central Interactive Point & Click Room Canvas */}
      <div className="relative w-full aspect-[16/9] min-h-[480px] max-h-[640px] bg-[#070e1d] rounded-xl overflow-hidden shadow-2xl border border-[#191f2f] group select-none">
        {/* ROOM 01 SVG: Professor Vane's Cyber-Noir Study */}
        {room.index === 0 && (
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            viewBox="0 0 1600 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#070e1d" />
                <stop offset="60%" stopColor="#0c1322" />
                <stop offset="100%" stopColor="#141b2b" />
              </linearGradient>
              <linearGradient id="floorGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#0c1322" />
                <stop offset="100%" stopColor="#050810" />
              </linearGradient>
              <radialGradient id="cyanLampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="amberDeskLamp" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffb95f" stopOpacity="0.55" />
                <stop offset="40%" stopColor="#e79400" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ffb95f" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="doorMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#191f2f" />
                <stop offset="50%" stopColor="#2e3545" />
                <stop offset="100%" stopColor="#141b2b" />
              </linearGradient>
              <linearGradient id="deskWood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a1a12" />
                <stop offset="70%" stopColor="#190e09" />
                <stop offset="100%" stopColor="#0d0705" />
              </linearGradient>
              <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Room Architecture */}
            <rect width="1600" height="900" fill="url(#wallGrad)" />
            <polygon points="0,620 1600,620 1600,900 0,900" fill="url(#floorGrad)" />

            {/* Floor Grid Lines */}
            <line x1="150" y1="620" x2="-200" y2="900" stroke="#232a3a" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="450" y1="620" x2="250" y2="900" stroke="#232a3a" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="750" y1="620" x2="680" y2="900" stroke="#232a3a" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="1050" y1="620" x2="1120" y2="900" stroke="#232a3a" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="1350" y1="620" x2="1550" y2="900" stroke="#232a3a" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="0" y1="670" x2="1600" y2="670" stroke="#191f2f" strokeWidth="1" />
            <line x1="0" y1="740" x2="1600" y2="740" stroke="#191f2f" strokeWidth="1" />
            <line x1="0" y1="820" x2="1600" y2="820" stroke="#191f2f" strokeWidth="1.5" />

            {/* Ambient Lighting Cones */}
            <polygon points="800,-40 500,900 1100,900" fill="#4cd7f6" fillOpacity="0.02" />
            <circle cx="490" cy="510" r="280" fill="url(#amberDeskLamp)" />
            <circle cx="1080" cy="590" r="160" fill="url(#cyanLampGlow)" />

            {/* Bookshelf Group */}
            <g id="bookshelf-group" opacity="0.95">
              <rect x="120" y="90" width="380" height="530" rx="4" fill="#141b2b" />
              <rect x="135" y="105" width="350" height="500" fill="#070e1d" />
              <rect x="130" y="210" width="360" height="12" fill="#232a3a" />
              <rect x="130" y="330" width="360" height="12" fill="#232a3a" />
              <rect x="130" y="450" width="360" height="12" fill="#232a3a" />

              {/* Shelf 1 Books */}
              <rect x="150" y="130" width="22" height="80" fill="#2e3545" />
              <rect x="174" y="120" width="28" height="90" fill="#004e5c" />
              <rect x="204" y="135" width="18" height="75" fill="#323949" />
              <rect x="224" y="125" width="30" height="85" fill="#06b6d4" fillOpacity="0.4" />
              <g transform="rotate(12 280 200)">
                <rect x="260" y="125" width="24" height="80" fill="#ffb95f" fillOpacity="0.7" />
              </g>
              <rect x="330" y="140" width="45" height="70" fill="#232a3a" />
              <rect x="380" y="130" width="35" height="80" fill="#005236" />
              <rect x="420" y="122" width="26" height="88" fill="#2e3545" />

              {/* Shelf 2 Target Glowing Syntax Book */}
              <rect x="150" y="240" width="32" height="90" fill="#191f2f" />
              <rect x="185" y="235" width="24" height="95" fill="#323949" />
              <rect
                x="215"
                y="222"
                width="38"
                height="108"
                fill="#06b6d4"
                stroke="#4cd7f6"
                strokeWidth="2"
                filter="url(#neonBlur)"
              />
              <line x1="228" y1="235" x2="242" y2="235" stroke="#ffffff" strokeWidth="2" />
              <line x1="228" y1="245" x2="238" y2="245" stroke="#ffffff" strokeWidth="2" />

              {/* Alchemical Vials */}
              <rect x="310" y="265" width="16" height="65" rx="8" fill="#4edea3" fillOpacity="0.5" filter="url(#neonBlur)" />
              <rect x="335" y="275" width="14" height="55" rx="7" fill="#ffb95f" fillOpacity="0.6" />
              <rect x="375" y="250" width="30" height="80" fill="#2e3545" />
              <rect x="410" y="242" width="40" height="88" fill="#141b2b" />

              {/* Lower Shelves */}
              <rect x="150" y="370" width="90" height="80" fill="#191f2f" />
              <rect x="260" y="360" width="24" height="90" fill="#323949" />
              <rect x="286" y="355" width="30" height="95" fill="#232a3a" />
              <rect x="150" y="480" width="130" height="120" rx="3" fill="#191f2f" />
              <rect x="300" y="490" width="150" height="110" rx="3" fill="#141b2b" />
            </g>

            {/* Terminal Pinboard */}
            <g id="pinboard-group" opacity="0.9">
              <rect x="560" y="140" width="460" height="260" rx="6" fill="#141b2b" />
              <rect x="575" y="155" width="430" height="230" rx="4" fill="#070e1d" />
              <line x1="575" y1="185" x2="1005" y2="185" stroke="#232a3a" strokeWidth="1.5" />
              <circle cx="595" cy="170" r="4" fill="#ffb4ab" />
              <circle cx="610" cy="170" r="4" fill="#ffb95f" />
              <circle cx="625" cy="170" r="4" fill="#4edea3" />
              <text x="645" y="174" fill="#869397" fontFamily="monospace" fontSize="11" letterSpacing="1">
                SYNTAX ANALYZER // ARCHIVE LINK
              </text>
              <text x="595" y="218" fill="#4cd7f6" fontFamily="monospace" fontSize="13">
                &gt; THE PROFESSOR [STUDIES / STUDY] ANOMALIES DAILY.
              </text>
              <text x="595" y="244" fill="#bcc9cd" fontFamily="monospace" fontSize="12">
                &gt; RULE: Subject + Base Verb (+s/-es in 3rd person singular)
              </text>
              <text x="595" y="270" fill="#ffb95f" fontFamily="monospace" fontSize="12">
                &gt; VERIFY: "He rarely [forget / forgets] the master sequence."
              </text>
              <path
                d="M 595,340 L 640,320 L 700,345 L 750,300 L 820,330 L 900,285 L 985,310"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                opacity="0.7"
              />
            </g>

            {/* Countertop on Right */}
            <polygon points="1040,540 1260,540 1260,650 1020,650" fill="#191f2f" />
            <polygon points="1020,530 1260,530 1260,540 1040,540" fill="#2e3545" />

            {/* Glowing Clue Note */}
            <g id="clue-note-art" filter="url(#neonBlur)">
              <polygon points="1090,560 1170,550 1185,605 1105,615" fill="#acedff" fillOpacity="0.9" />
              <line x1="1102" y1="568" x2="1160" y2="560" stroke="#003640" strokeWidth="2" />
              <line x1="1105" y1="578" x2="1168" y2="570" stroke="#003640" strokeWidth="2" />
              <line x1="1108" y1="588" x2="1150" y2="581" stroke="#003640" strokeWidth="2" />
              <line x1="1112" y1="598" x2="1175" y2="591" stroke="#e79400" strokeWidth="2.5" />
            </g>

            {/* Vault Door */}
            <g id="vault-door-group">
              <polygon points="1280,160 1560,100 1560,780 1280,740" fill="#141b2b" />
              <polygon points="1300,180 1540,125 1540,760 1300,725" fill="url(#doorMetal)" />
              <line x1="1305" y1="240" x2="1535" y2="190" stroke="#0c1322" strokeWidth="4" />
              <line x1="1305" y1="460" x2="1535" y2="420" stroke="#0c1322" strokeWidth="4" />
              <line x1="1305" y1="670" x2="1535" y2="640" stroke="#0c1322" strokeWidth="4" />
              {/* Keypad Scanner */}
              <rect x="1335" y="380" width="85" height="135" rx="5" fill="#070e1d" stroke="#323949" strokeWidth="2" />
              <rect x="1345" y="395" width="65" height="22" rx="2" fill="#690005" stroke="#ffb4ab" strokeWidth="1" />
              <circle cx="1355" cy="406" r="3.5" fill="#ff5449" filter="url(#neonBlur)" />
              <text x="1364" y="410" fill="#ffdad6" fontFamily="monospace" fontSize="8" fontWeight="700">
                LOCKED
              </text>
              <g fill="#232a3a">
                <rect x="1345" y="425" width="16" height="12" rx="1" />
                <rect x="1369" y="425" width="16" height="12" rx="1" />
                <rect x="1393" y="425" width="16" height="12" rx="1" />
                <rect x="1345" y="443" width="16" height="12" rx="1" />
                <rect x="1369" y="443" width="16" height="12" rx="1" />
                <rect x="1393" y="443" width="16" height="12" rx="1" />
                <rect x="1345" y="461" width="16" height="12" rx="1" />
                <rect x="1369" y="461" width="16" height="12" rx="1" />
                <rect x="1393" y="461" width="16" height="12" rx="1" />
                <rect x="1369" y="479" width="16" height="12" rx="1" />
              </g>
              <rect x="1345" y="495" width="64" height="10" rx="2" fill="#06b6d4" fillOpacity="0.3" />
            </g>

            {/* Foreground Mahogany Desk */}
            <g id="mahogany-desk-group">
              <polygon points="260,540 980,540 1060,840 140,840" fill="url(#deskWood)" />
              <polygon points="140,840 1060,840 1060,890 140,890" fill="#140b07" />
              <line x1="260" y1="540" x2="980" y2="540" stroke="#4a3022" strokeWidth="2" />
              <line x1="140" y1="840" x2="1060" y2="840" stroke="#7a533d" strokeWidth="2" />
              {/* Lamp */}
              <ellipse cx="400" cy="590" rx="38" ry="14" fill="#1f1610" />
              <path d="M 400,590 Q 360,520 420,470" fill="none" stroke="#c48a37" strokeWidth="8" strokeLinecap="round" />
              <path d="M 415,465 Q 450,455 470,480" fill="none" stroke="#e79400" strokeWidth="12" strokeLinecap="round" />
              <path d="M 450,465 L 500,455 L 520,495 L 455,490 Z" fill="#ffddb8" filter="url(#neonBlur)" />
              {/* Blueprint */}
              <polygon points="460,580 690,565 720,680 480,700" fill="#003640" stroke="#06b6d4" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle cx="580" cy="620" r="22" fill="none" stroke="#4cd7f6" strokeOpacity="0.7" strokeWidth="1.5" />
              {/* Locked Brass Drawer */}
              <rect x="780" y="730" width="220" height="100" rx="3" fill="#1a110b" stroke="#3a2517" strokeWidth="2" />
              <rect x="795" y="745" width="190" height="70" rx="2" fill="#241710" />
              <rect x="850" y="765" width="80" height="30" rx="4" fill="#653e00" stroke="#ffddb8" strokeWidth="1" />
              <circle cx="890" cy="780" r="8" fill="#e79400" filter="url(#neonBlur)" />
              <circle cx="890" cy="775" r="4.5" fill="none" stroke="#2a1700" strokeWidth="2" />
              <rect x="886" y="776" width="8" height="8" rx="1" fill="#2a1700" />
            </g>
          </svg>
        )}

        {/* ROOM 02 SVG: Cryo-Conduit & Sub-Zero Storage */}
        {room.index === 1 && (
          <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none" viewBox="0 0 1600 900" fill="none">
            <rect width="1600" height="900" fill="#070e1d" />
            {/* Cryo tanks */}
            <rect x="180" y="140" width="260" height="520" rx="20" fill="#141b2b" stroke="#06b6d4" strokeWidth="2" opacity="0.8" />
            <rect x="210" y="170" width="200" height="460" rx="10" fill="#003640" opacity="0.6" />
            <line x1="210" y1="280" x2="410" y2="280" stroke="#4cd7f6" strokeWidth="2" opacity="0.7" />
            <line x1="210" y1="420" x2="410" y2="420" stroke="#4cd7f6" strokeWidth="2" opacity="0.7" />
            {/* Coolant mist pipes */}
            <path d="M 440,280 L 780,280 L 780,600 L 1100,600" fill="none" stroke="#4cd7f6" strokeWidth="14" opacity="0.6" strokeLinecap="round" />
            <path d="M 440,420 L 700,420 L 700,700 L 1100,700" fill="none" stroke="#4edea3" strokeWidth="10" opacity="0.6" strokeLinecap="round" />
            {/* Central Diagnostic Console */}
            <polygon points="560,520 1020,520 1100,820 480,820" fill="#141b2b" stroke="#232a3a" strokeWidth="2" />
            <rect x="620" y="560" width="340" height="180" rx="6" fill="#070e1d" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="640" y="600" fill="#4cd7f6" fontFamily="monospace" fontSize="13">
              TEMPORAL CRYO DIAGNOSTIC // SECTOR 4C
            </text>
            <text x="640" y="630" fill="#bcc9cd" fontFamily="monospace" fontSize="12">
              &gt; T-PAST: "Valve [burst] yesterday." (Finished)
            </text>
            <text x="640" y="660" fill="#4edea3" fontFamily="monospace" fontSize="12">
              &gt; T-NOW: "Nitrogen [is flowing] right now." (Live)
            </text>
            {/* Sub-Zero Bulkhead Door */}
            <polygon points="1240,140 1540,80 1540,800 1240,750" fill="#141b2b" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="1390" cy="440" r="70" fill="#070e1d" stroke="#4cd7f6" strokeWidth="3" />
            <circle cx="1390" cy="440" r="30" fill="#ffb4ab" opacity="0.8" />
          </svg>
        )}

        {/* ROOM 03 SVG: Neural Core Laser Defense Grid */}
        {room.index === 2 && (
          <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none" viewBox="0 0 1600 900" fill="none">
            <rect width="1600" height="900" fill="#070e1d" />
            {/* Server racks in background */}
            <rect x="100" y="100" width="320" height="600" rx="8" fill="#141b2b" stroke="#232a3a" strokeWidth="2" />
            <rect x="120" y="130" width="280" height="40" fill="#070e1d" />
            <rect x="120" y="190" width="280" height="40" fill="#070e1d" />
            <rect x="120" y="250" width="280" height="40" fill="#070e1d" />
            {/* Red Laser Beams */}
            <line x1="500" y1="180" x2="1300" y2="400" stroke="#ff5449" strokeWidth="4" opacity="0.85" />
            <line x1="500" y1="320" x2="1300" y2="550" stroke="#ff5449" strokeWidth="4" opacity="0.85" />
            <line x1="500" y1="460" x2="1300" y2="700" stroke="#ff5449" strokeWidth="4" opacity="0.85" />
            {/* Warning Hologram Terminal */}
            <polygon points="560,500 1000,500 1080,780 480,780" fill="#141b2b" stroke="#ffb95f" strokeWidth="1.5" />
            <rect x="620" y="530" width="320" height="180" rx="6" fill="#070e1d" stroke="#ffb95f" strokeWidth="1.5" />
            <text x="640" y="570" fill="#ffb4ab" fontFamily="monospace" fontSize="13" fontWeight="bold">
              SECURITY DIRECTIVE // MODAL CODES
            </text>
            <text x="640" y="605" fill="#ffb95f" fontFamily="monospace" fontSize="12">
              &gt; PROHIBITION: Operatives MUST NOT touch laser lines.
            </text>
            <text x="640" y="635" fill="#4cd7f6" fontFamily="monospace" fontSize="12">
              &gt; ADVISORY: You SHOULD wear insulated gear.
            </text>
            {/* Core Door */}
            <polygon points="1260,160 1540,100 1540,780 1260,740" fill="#141b2b" stroke="#ffb95f" strokeWidth="2" />
          </svg>
        )}

        {/* ROOM 04 SVG: Orbital Extraction Airlock */}
        {room.index === 3 && (
          <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none" viewBox="0 0 1600 900" fill="none">
            <rect width="1600" height="900" fill="#070e1d" />
            {/* Cosmic Portals */}
            <ellipse cx="800" cy="360" rx="550" ry="240" fill="#001f26" stroke="#4cd7f6" strokeWidth="3" opacity="0.8" />
            <circle cx="720" cy="300" r="80" fill="#4edea3" opacity="0.1" />
            <circle cx="890" cy="380" r="120" fill="#06b6d4" opacity="0.1" />
            {/* Giant Blast Door Mechanism */}
            <polygon points="1200,100 1560,50 1560,840 1200,790" fill="#141b2b" stroke="#4edea3" strokeWidth="3" />
            <rect x="1280" y="380" width="120" height="160" rx="8" fill="#070e1d" stroke="#4edea3" strokeWidth="2" />
            <circle cx="1340" cy="440" r="28" fill="#4edea3" opacity="0.6" />
            {/* Extraction Console */}
            <polygon points="480,540 1080,540 1140,820 420,820" fill="#191f2f" stroke="#232a3a" strokeWidth="2" />
            <rect x="560" y="580" width="440" height="170" rx="6" fill="#070e1d" stroke="#4edea3" strokeWidth="1.5" />
            <text x="590" y="620" fill="#4edea3" fontFamily="monospace" fontSize="14" fontWeight="bold">
              FINAL EXTRACTION PROTOCOL // CLEARANCE OMEGA
            </text>
            <text x="590" y="655" fill="#bcc9cd" fontFamily="monospace" fontSize="12">
              &gt; IF cabin pressure drops (Present Simple)...
            </text>
            <text x="590" y="685" fill="#ffb95f" fontFamily="monospace" fontSize="12">
              &gt; ...THEN pull emergency release (Imperative Base Verb)!
            </text>
          </svg>
        )}

        {/* Ambient Dark Scrim Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1d]/80 via-transparent to-[#070e1d]/40 pointer-events-none"></div>

        {/* ======================================================== */}
        {/* INTERACTIVE HOTSPOTS FOR CURRENT ROOM */}
        {/* ======================================================== */}
        {room.hotspots.map((spot) => {
          const isError = spot.color === 'error';
          const isTertiary = spot.color === 'tertiary';
          const isSecondary = spot.color === 'secondary';

          return (
            <div
              key={spot.id}
              style={{
                top: spot.coords.top,
                left: spot.coords.left,
                right: spot.coords.right,
                bottom: spot.coords.bottom,
              }}
              className="absolute -translate-y-1/2 flex flex-col items-center group/spot cursor-pointer z-20"
              onClick={() => {
                soundFx.playPing();
                onSelectHotspot(spot);
              }}
            >
              {/* Radar Pulse Rings */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <span
                  className={`absolute inset-0 rounded-full animate-ping duration-1000 ${
                    isError
                      ? 'bg-[#ff5449]/30'
                      : isTertiary
                      ? 'bg-[#ffb95f]/30'
                      : isSecondary
                      ? 'bg-[#4edea3]/30'
                      : 'bg-[#4cd7f6]/30'
                  }`}
                ></span>
                <span
                  className={`absolute w-10 h-10 rounded-full animate-pulse ${
                    isError
                      ? 'bg-[#ff5449]/20'
                      : isTertiary
                      ? 'bg-[#ffb95f]/20'
                      : isSecondary
                      ? 'bg-[#4edea3]/20'
                      : 'bg-[#4cd7f6]/20'
                  }`}
                ></span>
                <div
                  className={`w-8 h-8 rounded-full bg-[#070e1d]/90 border flex items-center justify-center transition-all group-hover/spot:scale-115 ${
                    isError
                      ? 'border-[#ff5449] text-[#ff5449] shadow-[0_0_16px_rgba(255,84,73,0.6)] group-hover/spot:bg-[#ff5449] group-hover/spot:text-black'
                      : isTertiary
                      ? 'border-[#ffb95f] text-[#ffb95f] shadow-[0_0_16px_rgba(255,185,95,0.6)] group-hover/spot:bg-[#ffb95f] group-hover/spot:text-black'
                      : isSecondary
                      ? 'border-[#4edea3] text-[#4edea3] shadow-[0_0_16px_rgba(78,222,163,0.6)] group-hover/spot:bg-[#4edea3] group-hover/spot:text-black'
                      : 'border-[#4cd7f6] text-[#4cd7f6] shadow-[0_0_16px_rgba(76,215,246,0.6)] group-hover/spot:bg-[#4cd7f6] group-hover/spot:text-black'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{spot.icon}</span>
                </div>
              </div>

              {/* Tooltip Badge */}
              <div className="mt-1.5 opacity-0 group-hover/spot:opacity-100 transition-all transform translate-y-1 group-hover/spot:translate-y-0 pointer-events-none flex flex-col items-center whitespace-nowrap">
                <div className="bg-[#070e1d]/95 border border-[#232a3a] backdrop-blur-md px-2.5 py-1 rounded shadow-xl flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isError
                        ? 'bg-[#ff5449]'
                        : isTertiary
                        ? 'bg-[#ffb95f]'
                        : isSecondary
                        ? 'bg-[#4edea3]'
                        : 'bg-[#4cd7f6]'
                    }`}
                  ></span>
                  <span className="font-mono text-[11px] text-[#dce2f7] font-bold">
                    {spot.tooltip}
                  </span>
                </div>
                <span
                  className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 ${
                    isError
                      ? 'text-[#ff5449]'
                      : isTertiary
                      ? 'text-[#ffb95f]'
                      : isSecondary
                      ? 'text-[#4edea3]'
                      : 'text-[#4cd7f6]'
                  }`}
                >
                  {spot.subtitle}
                </span>
              </div>
            </div>
          );
        })}

        {/* Floating Room Telemetry Top-Left Overlay */}
        <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1 z-10">
          <div className="bg-[#070e1d]/80 border border-[#232a3a] backdrop-blur-md px-2.5 py-1 rounded flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#869397]">LOC:</span>
            <span className="font-mono text-[11px] text-[#4cd7f6] font-bold">{room.locationName}</span>
            <span className="text-[#3d494c]">•</span>
            <span className="font-mono text-[10px] text-[#ffb95f]">FREQ: {room.frequency}</span>
          </div>
          <div className="bg-[#070e1d]/70 border border-[#232a3a] backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-[#869397] font-mono">
            HOTSPOTS DISCOVERED: {discoveredHotspotsCount} / {room.hotspots.length}
          </div>
        </div>
      </div>

      {/* Bottom Action HUD: Equipped Items & Pedagogical Interactive Prompts */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Equipped Tactical Tool Indicator */}
        <div className="md:col-span-4 bg-[#141b2b]/90 border border-[#232a3a] backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center gap-3.5 shadow-md">
          <div className="w-11 h-11 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30 flex items-center justify-center text-[#4edea3] flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">menu_book</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span className="font-mono text-[10px] text-[#4edea3] uppercase font-bold">
                Equipped Tool
              </span>
            </div>
            <p className="font-['Inter'] text-sm text-[#dce2f7] font-semibold truncate">
              Grammar Notebook (Vol. {room.index + 1})
            </p>
            <span className="font-mono text-[10px] text-[#869397] truncate block">
              [Click hotspot or tactical deck to review notes]
            </span>
          </div>
        </div>

        {/* Pedagogical Hint & Grammar Assist Prompt */}
        <div className="md:col-span-8 bg-[#141b2b]/90 border border-[#232a3a] backdrop-blur-md px-4 py-2.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#e79400]/20 border border-[#ffb95f]/30 flex items-center justify-center text-[#ffb95f] flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[10px] text-[#ffb95f] uppercase font-bold">
                Linguistic Guidance Agent
              </span>
              <p className="font-['Inter'] text-xs text-[#bcc9cd] truncate">
                Target Topic: <strong className="text-[#4cd7f6]">{room.grammarTopic}</strong>. Need help?
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onRequestHint();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#191f2f] hover:bg-[#232a3a] border border-[#232a3a] text-[#ffb95f] font-['Plus_Jakarta_Sans'] font-semibold text-[12px] flex items-center gap-1.5 flex-shrink-0 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Syntax Hint</span>
          </button>
        </div>
      </div>
    </div>
  );
};
