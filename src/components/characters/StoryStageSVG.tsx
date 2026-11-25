import { NARRATIVE_CAPTIONS } from '../../config/storyConfig';

const RAIN_DROPS = Array.from({ length: 38 }, (_, i) => ({
  x: 40 + ((i * 39) % 1380),
  y: 25 + ((i * 87) % 620),
  len: 48 + (i % 4) * 12,
}));

const LOVE_HEARTS = [
  { x: 585, y: 405, scale: 0.92 },
  { x: 645, y: 342, scale: 1.1 },
  { x: 720, y: 302, scale: 1.3 },
  { x: 795, y: 344, scale: 1.06 },
  { x: 855, y: 408, scale: 0.88 },
  { x: 678, y: 268, scale: 0.78 },
  { x: 762, y: 270, scale: 0.82 },
  { x: 615, y: 365, scale: 0.74 },
  { x: 825, y: 368, scale: 0.76 },
];

const FESTOON_BULBS = [
  { x: 170, y: 255, color: '#F4C97A' },
  { x: 265, y: 274, color: '#FAD2D9' },
  { x: 365, y: 292, color: '#F4C97A' },
  { x: 470, y: 306, color: '#FCE6B4' },
  { x: 575, y: 315, color: '#FAD2D9' },
  { x: 680, y: 320, color: '#F4C97A' },
  { x: 785, y: 318, color: '#FCE6B4' },
  { x: 890, y: 311, color: '#FAD2D9' },
  { x: 995, y: 299, color: '#F4C97A' },
  { x: 1098, y: 282, color: '#FCE6B4' },
  { x: 1198, y: 263, color: '#FAD2D9' },
  { x: 1295, y: 242, color: '#F4C97A' },
];

export function StoryStageSVG({ isNightMood }: { isNightMood: boolean }) {
  return (
    <section
      className="act-layer act-story"
      data-anim="act-story"
      aria-label="Historia animada de nuestra relación"
    >
      <svg
        className="story-fullscreen-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Ilustración animada de dos muñecos recorriendo su historia de amor"
      >
        <defs>
          <linearGradient id="daySkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDF1E4" />
            <stop offset="52%" stopColor="#F9E4D4" />
            <stop offset="100%" stopColor="#F2D4C6" />
          </linearGradient>

          <radialGradient id="sunGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FCE3A6" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#F4C97A" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#F4C97A" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="goldenAuraGrad" cx="50%" cy="48%" r="60%">
            <stop offset="0%" stopColor="#FAD5C5" stopOpacity="0.94" />
            <stop offset="52%" stopColor="#F2AFBF" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#FCE7D9" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="nightSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E1628" />
            <stop offset="58%" stopColor="#172440" />
            <stop offset="100%" stopColor="#213254" />
          </linearGradient>

          <radialGradient id="lampGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBE1A4" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#F4C97A" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5470" />
            <stop offset="50%" stopColor="#F4C97A" />
            <stop offset="100%" stopColor="#FF5470" />
          </linearGradient>

          <filter id="warmGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================= 1. FULL-BLEED DAYLIGHT STORYBOOK WORLD ================= */}
        <g data-anim="bg-daylight">
          <rect width="1440" height="900" fill="url(#daySkyGrad)" />

          {/* Sun & Sunbeams */}
          <circle cx="1110" cy="185" r="190" fill="url(#sunGlowGrad)" />
          <circle cx="1110" cy="185" r="56" fill="#FBE1A4" fillOpacity="0.88" />
          <g opacity="0.16" fill="#F4C97A">
            <polygon points="1110,185 820,620 920,645" />
            <polygon points="1110,185 1020,650 1125,660" />
            <polygon points="1110,185 1230,660 1350,640" />
          </g>

          {/* Drifting Storybook Clouds */}
          <g transform="translate(220, 150)">
            <g data-anim="sky-cloud" fill="#FFFAF4" fillOpacity="0.84">
              <circle cx="0" cy="18" r="24" />
              <circle cx="32" cy="8" r="32" />
              <circle cx="68" cy="18" r="24" />
              <rect x="0" y="18" width="68" height="24" rx="12" />
            </g>
          </g>
          <g transform="translate(650, 118) scale(1.15)">
            <g data-anim="sky-cloud" fill="#FFFAF4" fillOpacity="0.78">
              <circle cx="0" cy="18" r="22" />
              <circle cx="28" cy="6" r="30" />
              <circle cx="64" cy="16" r="22" />
              <rect x="0" y="16" width="64" height="24" rx="12" />
            </g>
          </g>
          <g transform="translate(1220, 140) scale(0.95)">
            <g data-anim="sky-cloud" fill="#FFFAF4" fillOpacity="0.72">
              <circle cx="0" cy="18" r="22" />
              <circle cx="28" cy="8" r="28" />
              <circle cx="58" cy="18" r="20" />
              <rect x="0" y="18" width="58" height="22" rx="11" />
            </g>
          </g>

          {/* Distant Misty Mountains & Storybook Bell-Tower Silhouette */}
          <path
            d="M0 570 Q240 470 500 548 T980 515 T1440 555 L1440 900 L0 900 Z"
            fill="#E7CFC4"
          />
          <g fill="#D5B6AC">
            <rect x="938" y="485" width="32" height="58" rx="3" />
            <polygon points="934,486 954,452 974,486" />
            <circle cx="954" cy="504" r="5" fill="#FAF3EB" fillOpacity="0.75" />
          </g>

          {/* Mid-ground Rolling Meadows */}
          <path
            d="M0 622 Q340 546 720 606 T1440 584 L1440 900 L0 900 Z"
            fill="#E2C7B0"
          />
          <path
            d="M0 668 Q390 615 760 662 T1440 644 L1440 900 L0 900 Z"
            fill="#D7B89C"
          />

          {/* Distant Cypress & Cherry Blossom Framing Trees */}
          {/* Left Orchard */}
          <g>
            <rect x="108" y="490" width="22" height="205" rx="8" fill="#8C6253" />
            <circle cx="118" cy="462" r="78" fill="#EBB4BF" />
            <circle cx="72" cy="495" r="52" fill="#E39EAE" />
            <circle cx="164" cy="498" r="50" fill="#F2C8D0" />
            <circle cx="122" cy="418" r="46" fill="#F5D3DA" />
          </g>
          {/* Right Orchard */}
          <g>
            <rect x="1312" y="485" width="24" height="215" rx="8" fill="#8C6253" />
            <circle cx="1322" cy="456" r="82" fill="#EBB4BF" />
            <circle cx="1272" cy="494" r="54" fill="#F2C8D0" />
            <circle cx="1370" cy="492" r="52" fill="#E39EAE" />
            <circle cx="1316" cy="410" r="48" fill="#F5D3DA" />
          </g>
          {/* Accent Cypress Silhouettes */}
          <ellipse cx="290" cy="575" rx="22" ry="74" fill="#7D9473" fillOpacity="0.82" />
          <ellipse cx="1165" cy="568" rx="24" ry="78" fill="#7D9473" fillOpacity="0.82" />

          {/* Wooden Park Bench (Left-Center background) */}
          <g transform="translate(335, 628)">
            <rect x="10" y="34" width="8" height="36" rx="2" fill="#6E474F" />
            <rect x="118" y="34" width="8" height="36" rx="2" fill="#6E474F" />
            <rect x="0" y="10" width="136" height="12" rx="4" fill="#A66E53" />
            <rect x="0" y="26" width="136" height="11" rx="4" fill="#955E45" />
            <rect x="-4" y="42" width="144" height="10" rx="4" fill="#B57B5E" />
          </g>

          {/* Vintage Wrought-Iron Streetlamp */}
          <g>
            <rect x="218" y="438" width="9" height="266" rx="4" fill="#4D3439" />
            <path d="M214 704 H231 L236 716 H209 Z" fill="#3B2328" />
            <path d="M222 442 C222 420 250 416 254 434" fill="none" stroke="#4D3439" strokeWidth="6" strokeLinecap="round" />
            <polygon points="242,436 266,436 261,466 247,466" fill="#FCE6B4" stroke="#4D3439" strokeWidth="3" />
          </g>

          {/* Stone & Earth Garden Promenade */}
          <path
            d="M0 726 Q720 692 1440 726 L1440 900 L0 900 Z"
            fill="#CAA88A"
          />
          <g fill="#B99476" fillOpacity="0.48">
            <ellipse cx="380" cy="756" rx="34" ry="8" />
            <ellipse cx="520" cy="770" rx="26" ry="7" />
            <ellipse cx="715" cy="762" rx="42" ry="9" />
            <ellipse cx="920" cy="768" rx="30" ry="7" />
            <ellipse cx="1070" cy="754" rx="36" ry="8" />
          </g>

          {/* Meadow Wildflowers & Butterflies */}
          <g fill="#E8A5B2">
            <circle cx="160" cy="712" r="6" />
            <circle cx="192" cy="722" r="5" fill="#F4C97A" />
            <circle cx="1245" cy="716" r="6" />
            <circle cx="1280" cy="726" r="5" fill="#FFFAF4" />
          </g>
          <g transform="translate(475, 515)">
            <g data-anim="butterfly">
              <ellipse cx="-5" cy="-3" rx="6" ry="4" transform="rotate(-25 -5 -3)" fill="#E8A5B2" />
              <ellipse cx="5" cy="-3" rx="6" ry="4" transform="rotate(25 5 -3)" fill="#E8A5B2" />
              <line x1="0" y1="-6" x2="0" y2="5" stroke="#3B2328" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </g>
          <g transform="translate(975, 505)">
            <g data-anim="butterfly">
              <ellipse cx="-5" cy="-3" rx="6" ry="4" transform="rotate(-25 -5 -3)" fill="#F4C97A" />
              <ellipse cx="5" cy="-3" rx="6" ry="4" transform="rotate(25 5 -3)" fill="#F4C97A" />
              <line x1="0" y1="-6" x2="0" y2="5" stroke="#3B2328" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* ================= 2. GOLDEN LOVE AURA + FESTOON LIGHTS ================= */}
        <g data-anim="bg-golden-love">
          <rect width="1440" height="900" fill="url(#goldenAuraGrad)" />

          {/* Overhead Festoon String Lights */}
          <path
            d="M 110 245 Q 720 390 1330 235"
            fill="none"
            stroke="#5D3A3E"
            strokeOpacity="0.45"
            strokeWidth="2.5"
          />
          {FESTOON_BULBS.map((bulb, idx) => (
            <g key={idx} transform={`translate(${bulb.x}, ${bulb.y})`}>
              <g data-anim="festoon-bulb">
                <circle cx="0" cy="8" r="22" fill={bulb.color} fillOpacity="0.34" />
                <circle cx="0" cy="8" r="7.5" fill={bulb.color} stroke="#FFFDF9" strokeWidth="1.4" />
              </g>
            </g>
          ))}

          {/* Floating Stage Love Hearts */}
          {LOVE_HEARTS.map((h, i) => (
            <g key={i} transform={`translate(${h.x}, ${h.y}) scale(${h.scale})`}>
              <g data-anim="love-heart">
                <path
                  d="M0 16 C0 16 -14 6.5 -14 -2.5 C-14 -7.5 -10 -11 -5.5 -11 C-2.6 -11 -0.8 -9.5 0 -7.2 C0.8 -9.5 2.6 -11 5.5 -11 C10 -11 14 -7.5 14 -2.5 C14 6.5 0 16 0 16Z"
                  fill="#D9536F"
                  fillOpacity="0.9"
                />
              </g>
            </g>
          ))}
        </g>

        {/* ================= 3. STORM NIGHT BACKDROP ================= */}
        <g data-anim="bg-storm-night">
          <rect width="1440" height="900" fill="url(#nightSkyGrad)" />

          {/* Distant hills & path in moonlight */}
          <path
            d="M0 622 Q340 546 720 606 T1440 584 L1440 900 L0 900 Z"
            fill="#15213A"
          />
          <path
            d="M0 668 Q390 615 760 662 T1440 644 L1440 900 L0 900 Z"
            fill="#111B30"
          />
          <path
            d="M0 726 Q720 692 1440 726 L1440 900 L0 900 Z"
            fill="#0C1424"
          />

          {/* Glowing Streetlamp Halo in the Storm */}
          <circle cx="254" cy="452" r="95" fill="url(#lampGlowGrad)" />
          <rect x="218" y="438" width="9" height="266" rx="4" fill="#2A354F" />
          <polygon points="242,436 266,436 261,466 247,466" fill="#FBE1A4" />

          {/* Rain puddle reflections */}
          <ellipse cx="430" cy="770" rx="70" ry="10" fill="#2B4069" fillOpacity="0.48" />
          <ellipse cx="1010" cy="770" rx="70" ry="10" fill="#2B4069" fillOpacity="0.48" />

          {/* Heavy Storm Clouds across full 1440px sky */}
          <g data-anim="storm-cloud" fill="#273659" fillOpacity="0.94">
            <path d="M120 190 C90 190 70 166 75 138 C80 110 110 96 136 108 C154 72 204 64 236 90 C264 72 312 88 320 122 C348 125 368 150 360 176 C352 190 334 192 316 192 Z" />
            <path d="M510 156 C482 156 462 134 468 110 C474 84 504 74 530 84 C550 48 606 42 638 72 C670 54 718 72 726 104 C752 108 770 132 762 156 Z" />
            <path d="M960 184 C934 184 914 162 918 136 C924 108 956 96 982 108 C1002 70 1054 62 1088 88 C1118 70 1168 86 1178 120 C1204 124 1224 148 1216 174 C1208 184 1190 186 1170 186 Z" />
          </g>

          {/* Diagonal Rain */}
          <g data-anim="rain-layer">
            {RAIN_DROPS.map((drop, idx) => (
              <line
                key={idx}
                data-anim="rain-line"
                x1={drop.x}
                y1={drop.y}
                x2={drop.x - 18}
                y2={drop.y + drop.len}
                stroke="#8BA5D6"
                strokeOpacity="0.52"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ))}
          </g>
        </g>

        {/* ================= 4. SPEECH BUBBLES (Scene 3B) ================= */}
        <g transform="translate(500, 336)">
          <g data-anim="chat-bubble-boy">
            <path
              d="M0 26 C0 11 13 0 30 0 H98 C115 0 128 11 128 26 V58 C128 73 115 84 98 84 H58 L38 104 L42 84 H30 C13 84 0 73 0 58 Z"
              fill="#FFFAF4"
              stroke="#3B2328"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
            <path
              d="M46 56 V29 L68 23 V50"
              fill="none"
              stroke="#C85A6E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="56" r="5.5" fill="#C85A6E" />
            <circle cx="62" cy="50" r="5.5" fill="#C85A6E" />
            <path
              d="M94 28 L97 35 L104 38 L97 41 L94 48 L91 41 L84 38 L91 35 Z"
              fill="#C9963B"
            />
          </g>
        </g>

        <g transform="translate(812, 330)">
          <g data-anim="chat-bubble-girl">
            <path
              d="M0 26 C0 11 13 0 30 0 H98 C115 0 128 11 128 26 V58 C128 73 115 84 98 84 H86 L90 104 L70 84 H30 C13 84 0 73 0 58 Z"
              fill="#FFFAF4"
              stroke="#3B2328"
              strokeOpacity="0.22"
              strokeWidth="2"
            />
            <path
              d="M64 60 C64 60 44 46 44 33 C44 26 49.4 20.5 55.8 20.5 C59.6 20.5 62.4 22.5 64 25.8 C65.6 22.5 68.4 20.5 72.2 20.5 C78.6 20.5 84 26 84 33 C84 46 64 60 64 60Z"
              fill="#C85A6E"
            />
          </g>
        </g>

        {/* ================= 5. ARTICULATED BOY CHARACTER (Center x=720, feet y=742) ================= */}
        <g data-anim="boy-root">
          <ellipse cx="720" cy="744" rx="46" ry="10" fill="#3B2328" fillOpacity="0.16" />

          {/* Outer left arm */}
          <g data-anim="boy-arm-outer">
            <path
              d="M688 574 C670 604 668 632 676 654"
              fill="none"
              stroke="#B85D43"
              strokeWidth="19"
              strokeLinecap="round"
            />
            <circle cx="677" cy="656" r="9.5" fill="#F2C8AD" />
          </g>

          {/* Legs & Shoes */}
          <rect x="696" y="654" width="19" height="76" rx="9" fill="#3D4B63" />
          <rect x="725" y="654" width="19" height="76" rx="9" fill="#323F54" />
          <ellipse cx="705" cy="734" rx="16" ry="8" fill="#3B2328" />
          <ellipse cx="736" cy="734" rx="16" ry="8" fill="#3B2328" />

          {/* Cozy Terracotta Sweater */}
          <g data-anim="boy-body">
            <path
              d="M681 560 C681 544 759 544 759 560 L764 658 C764 668 676 668 676 658 Z"
              fill="#C86B4B"
            />
            <path
              d="M702 553 Q720 568 738 553"
              fill="none"
              stroke="#FAF3EB"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <g data-anim="boy-chest-heart" filter="url(#warmGlow)">
              <path
                d="M720 618 C720 618 703 607 703 596.5 C703 590.8 707.5 586 713 586 C716.4 586 718.8 588 720 590.6 C721.2 588 723.6 586 727 586 C732.5 586 737 590.8 737 596.5 C737 607 720 618 720 618Z"
                fill="#FF5470"
                stroke="#F4C97A"
                strokeWidth="1.8"
              />
            </g>
          </g>

          {/* Head */}
          <g data-anim="boy-head">
            <rect x="710" y="530" width="20" height="22" rx="7" fill="#E8B99D" />
            <circle cx="720" cy="496" r="46" fill="#F4CBB2" />
            <path
              d="M674 494 C672 458 695 438 724 440 C752 442 770 462 766 494 C758 476 740 468 720 470 C701 466 686 476 674 494 Z"
              fill="#4E312D"
            />
            <path
              d="M690 454 C700 438 716 434 732 440"
              fill="none"
              stroke="#4E312D"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Expressions */}
            <g data-anim="boy-expr-shy">
              <circle cx="706" cy="497" r="4.2" fill="#3B2328" />
              <circle cx="736" cy="497" r="4.2" fill="#3B2328" />
              <ellipse cx="697" cy="508" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.58" />
              <ellipse cx="744" cy="508" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.58" />
              <path d="M712 516 Q720 522 728 516" fill="none" stroke="#3B2328" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            <g data-anim="boy-expr-talk">
              <circle cx="706" cy="496" r="4.4" fill="#3B2328" />
              <circle cx="736" cy="496" r="4.4" fill="#3B2328" />
              <ellipse cx="697" cy="507" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.58" />
              <ellipse cx="744" cy="507" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.58" />
              <path d="M710 512 Q720 527 730 512 Z" fill="#B34A5E" />
            </g>

            <g data-anim="boy-expr-love">
              <path d="M700 497 Q706 490 712 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
              <path d="M730 497 Q736 490 742 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="695" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.74" />
              <ellipse cx="746" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.74" />
              <path d="M710 514 Q720 524 730 514" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            </g>

            <g data-anim="boy-expr-argue">
              <path d="M699 485 L713 490" stroke="#3B2328" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M743 485 L729 490" stroke="#3B2328" strokeWidth="3.2" strokeLinecap="round" />
              <circle cx="706" cy="500" r="4" fill="#3B2328" />
              <circle cx="736" cy="500" r="4" fill="#3B2328" />
              <path d="M710 520 Q720 512 730 520" fill="none" stroke="#3B2328" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            <g data-anim="boy-expr-longing">
              <path d="M698 487 Q705 483 712 486" fill="none" stroke="#3B2328" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M730 486 Q737 483 744 487" fill="none" stroke="#3B2328" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="706" cy="498" r="4.2" fill="#3B2328" />
              <circle cx="736" cy="498" r="4.2" fill="#3B2328" />
              <circle cx="707.5" cy="496" r="1.4" fill="#FFFAF4" />
              <circle cx="737.5" cy="496" r="1.4" fill="#FFFAF4" />
              <path d="M713 517 Q720 521 727 517" fill="none" stroke="#3B2328" strokeWidth="2.6" strokeLinecap="round" />
            </g>

            {/* Gafas ilustradas del niño */}
            <g aria-hidden="true">
              <path d="M694 494 L676 492" stroke="#2D1B1E" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M747.5 494 L765 492" stroke="#2D1B1E" strokeWidth="2.2" strokeLinecap="round" />
              <rect
                x="694"
                y="489"
                width="23"
                height="16.5"
                rx="7"
                fill="#FFFAF4"
                fillOpacity="0.16"
                stroke="#2D1B1E"
                strokeWidth="2.4"
              />
              <rect
                x="724.5"
                y="489"
                width="23"
                height="16.5"
                rx="7"
                fill="#FFFAF4"
                fillOpacity="0.16"
                stroke="#2D1B1E"
                strokeWidth="2.4"
              />
              <path
                d="M717 495.5 Q720.75 493 724.5 495.5"
                fill="none"
                stroke="#2D1B1E"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path d="M698.5 493 L702 491" stroke="#FFFAF4" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M729 493 L732.5 491" stroke="#FFFAF4" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </g>

          {/* Inner right arm */}
          <g data-anim="boy-arm-inner">
            <path
              d="M752 574 C770 602 772 630 765 652"
              fill="none"
              stroke="#D47656"
              strokeWidth="19"
              strokeLinecap="round"
            />
            <circle cx="766" cy="654" r="9.5" fill="#F4CBB2" />
          </g>
        </g>

        {/* ================= 6. ARTICULATED WOMAN CHARACTER — WENDY (Center x=720, feet y=742) ================= */}
        <g data-anim="girl-root">
          <ellipse cx="720" cy="744" rx="46" ry="10" fill="#3B2328" fillOpacity="0.16" />

          {/* Back flowing wavy hair */}
          <path
            d="M671 486 C655 534 664 598 682 614 L758 614 C776 598 785 534 769 486 Z"
            fill="#3A2227"
          />

          {/* Outer right arm */}
          <g data-anim="girl-arm-outer">
            <path
              d="M752 576 C770 604 772 632 764 652"
              fill="none"
              stroke="#BA5266"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <circle cx="763" cy="654" r="9" fill="#F5CFB9" />
          </g>

          {/* Legs & Shoes */}
          <rect x="700" y="668" width="16" height="62" rx="8" fill="#F2C8B0" />
          <rect x="724" y="668" width="16" height="62" rx="8" fill="#EAC0A7" />
          <ellipse cx="707" cy="734" rx="15" ry="7.5" fill="#7D3243" />
          <ellipse cx="733" cy="734" rx="15" ry="7.5" fill="#7D3243" />

          {/* Dusty-Rose Dress with Cream Lace Hem */}
          <g data-anim="girl-body">
            <path
              d="M689 564 C689 548 751 548 751 564 L770 676 C770 686 670 686 670 676 Z"
              fill="#C85A6E"
            />
            <path
              d="M674 676 Q720 686 766 676"
              fill="none"
              stroke="#FAF3EB"
              strokeWidth="4"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            <path
              d="M703 558 Q720 572 737 558"
              fill="none"
              stroke="#FAF3EB"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <g data-anim="girl-chest-heart" filter="url(#warmGlow)">
              <path
                d="M720 618 C720 618 703 607 703 596.5 C703 590.8 707.5 586 713 586 C716.4 586 718.8 588 720 590.6 C721.2 588 723.6 586 727 586 C732.5 586 737 590.8 737 596.5 C737 607 720 618 720 618Z"
                fill="#FF5470"
                stroke="#F4C97A"
                strokeWidth="1.8"
              />
            </g>
          </g>

          {/* Head */}
          <g data-anim="girl-head">
            <rect x="711" y="530" width="18" height="22" rx="7" fill="#EBBFA6" />
            <circle cx="720" cy="496" r="45" fill="#F5CFB9" />
            <path
              d="M674 496 C674 456 695 438 720 438 C745 438 766 456 766 496 C754 474 737 464 715 468 C697 472 684 480 674 496 Z"
              fill="#3A2227"
            />
            <circle cx="748" cy="468" r="7" fill="#E8A5B2" stroke="#C9963B" strokeWidth="2" />

            {/* Expressions */}
            <g data-anim="girl-expr-shy">
              <circle cx="704" cy="497" r="4.2" fill="#3B2328" />
              <circle cx="734" cy="497" r="4.2" fill="#3B2328" />
              <ellipse cx="695" cy="508" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.62" />
              <ellipse cx="743" cy="508" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.62" />
              <path d="M711 516 Q719 522 727 516" fill="none" stroke="#3B2328" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            <g data-anim="girl-expr-talk">
              <circle cx="704" cy="496" r="4.4" fill="#3B2328" />
              <circle cx="734" cy="496" r="4.4" fill="#3B2328" />
              <ellipse cx="695" cy="507" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.62" />
              <ellipse cx="743" cy="507" rx="6.5" ry="3.5" fill="#E88B98" fillOpacity="0.62" />
              <path d="M709 512 Q719 527 729 512 Z" fill="#B34A5E" />
            </g>

            <g data-anim="girl-expr-love">
              <path d="M698 497 Q704 490 710 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
              <path d="M728 497 Q734 490 740 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="693" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.78" />
              <ellipse cx="745" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.78" />
              <path d="M709 514 Q719 524 729 514" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            </g>

            <g data-anim="girl-expr-argue">
              <path d="M697 487 L711 493" stroke="#3B2328" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M741 487 L727 493" stroke="#3B2328" strokeWidth="3.2" strokeLinecap="round" />
              <circle cx="704" cy="500" r="4" fill="#3B2328" />
              <circle cx="734" cy="500" r="4" fill="#3B2328" />
              <path d="M709 520 Q719 512 729 520" fill="none" stroke="#3B2328" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            <g data-anim="girl-expr-longing">
              <path d="M696 490 Q703 486 710 489" fill="none" stroke="#3B2328" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M728 489 Q735 486 742 490" fill="none" stroke="#3B2328" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="704" cy="498" r="4.2" fill="#3B2328" />
              <circle cx="734" cy="498" r="4.2" fill="#3B2328" />
              <circle cx="705.5" cy="496" r="1.4" fill="#FFFAF4" />
              <circle cx="735.5" cy="496" r="1.4" fill="#FFFAF4" />
              <path
                d="M738 504 C738 504 742 509 742 511.5 C742 513.4 740.2 515 738 515 C735.8 515 734 513.4 734 511.5 C734 509 738 504 738 504Z"
                fill="#9CC3F2"
              />
              <path d="M711 517 Q719 521 726 517" fill="none" stroke="#3B2328" strokeWidth="2.6" strokeLinecap="round" />
            </g>
          </g>

          {/* Inner left arm */}
          <g data-anim="girl-arm-inner">
            <path
              d="M688 576 C670 604 668 630 675 652"
              fill="none"
              stroke="#D96D80"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <circle cx="674" cy="654" r="9" fill="#F5CFB9" />
          </g>
        </g>

        {/* ================= 7. FIGHT TENSION SPARKS (Scene 3D-1) ================= */}
        <g data-anim="argue-sparks">
          <path
            d="M702 454 L718 432 L712 447 L728 437 L713 462"
            fill="none"
            stroke="#F4C97A"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M736 476 L753 458 L745 472 L760 465"
            fill="none"
            stroke="#FF6B84"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* ================= 8. UNBREAKABLE GLOWING RED-GOLD LOVE THREAD (Scene 3D-2) ================= */}
        <g data-anim="red-thread-group" filter="url(#warmGlow)">
          <path
            data-anim="red-thread-path"
            d="M 430 602 C 560 538, 880 538, 1010 602"
            fill="none"
            stroke="url(#threadGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={1}
          />
          <circle data-anim="thread-pulse-1" cx="570" cy="566" r="6.5" fill="#F4C97A" />
          <circle data-anim="thread-pulse-2" cx="720" cy="554" r="7.5" fill="#FF6B84" />
          <circle data-anim="thread-pulse-3" cx="870" cy="566" r="6.5" fill="#F4C97A" />
        </g>
      </svg>

      {/* Illustrated Parchment Scroll Caption Banner */}
      <div
        className={`story-scroll-banner${isNightMood ? ' story-scroll-banner--night' : ''}`}
        data-anim="story-scroll-banner"
        aria-live="polite"
      >
        <svg
          className="scroll-banner-ornament scroll-banner-ornament--left"
          width="24"
          height="32"
          viewBox="0 0 24 32"
          aria-hidden="true"
        >
          <path
            d="M18 4 C8 4, 4 12, 12 16 C4 20, 8 28, 18 28"
            fill="none"
            stroke="#C9963B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="10" cy="16" r="2.4" fill="#C85A6E" />
        </svg>

        <p className="story-caption-line" data-anim="caption-meet">
          {NARRATIVE_CAPTIONS.meet}
        </p>
        <p className="story-caption-line" data-anim="caption-talk">
          {NARRATIVE_CAPTIONS.talk}
        </p>
        <p className="story-caption-line" data-anim="caption-love">
          {NARRATIVE_CAPTIONS.love}
        </p>
        <p className="story-caption-line story-caption-line--night" data-anim="caption-fight">
          {NARRATIVE_CAPTIONS.fight}
        </p>
        <p className="story-caption-line story-caption-line--night" data-anim="caption-distance">
          {NARRATIVE_CAPTIONS.distance}
        </p>

        <svg
          className="scroll-banner-ornament scroll-banner-ornament--right"
          width="24"
          height="32"
          viewBox="0 0 24 32"
          aria-hidden="true"
        >
          <path
            d="M18 4 C8 4, 4 12, 12 16 C4 20, 8 28, 18 28"
            fill="none"
            stroke="#C9963B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="10" cy="16" r="2.4" fill="#C85A6E" />
        </svg>
      </div>
    </section>
  );
}
