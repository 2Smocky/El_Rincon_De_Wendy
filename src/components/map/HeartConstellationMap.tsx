import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  HEART_MEMORIES,
  INNER_HEART_PATH,
  OUTER_HEART_PATH,
  type HeartMemory,
} from '../../config/memoriesConfig';
import {
  DAILY_MEMORY_LIMIT,
  TOTAL_MEMORIES_COUNT,
  getTodayDateKey,
  openMemoryPoint,
  type MapProgressState,
} from '../../lib/wendyFirestore';
import { MemorySceneModal } from './MemorySceneModal';

gsap.registerPlugin(useGSAP);

interface HeartConstellationMapProps {
  progress: MapProgressState;
  onProgressChange: (next: MapProgressState) => void;
  onOpenFinale: () => void;
}

function getTimeUntilMidnightText(): string {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const diffMs = Math.max(0, midnight.getTime() - now.getTime());
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

function getFilamentCurve(x: number, y: number): string {
  const midX = (x + 600) / 2 + (600 - x) * 0.1;
  const midY = (y + 438) / 2 - 22;
  return `M ${x} ${y} Q ${midX.toFixed(1)} ${midY.toFixed(1)} 600 438`;
}

const CENTRAL_HEART_PATH =
  'M600 536 C600 536 498 468 498 406 C498 371 525 346 557 346 C578 346 592 357 600 374 C608 357 622 346 643 346 C675 346 702 371 702 406 C702 468 600 536 600 536Z';

const CENTRAL_HEART_HALO_PATH =
  'M600 552 C600 552 480 474 480 403 C480 361 513 332 550 332 C574 332 590 345 600 364 C610 345 626 332 650 332 C687 332 720 361 720 403 C720 474 600 552 600 552Z';

const SKY_SPARKLES = [
  { x: 295, y: 185, s: 0.9 },
  { x: 430, y: 140, s: 0.65 },
  { x: 1015, y: 175, s: 0.85 },
  { x: 1120, y: 245, s: 0.7 },
  { x: 325, y: 540, s: 0.7 },
  { x: 1110, y: 515, s: 0.8 },
];

export function HeartConstellationMap({
  progress,
  onProgressChange,
  onOpenFinale,
}: HeartConstellationMapProps) {
  const mapRootRef = useRef<HTMLDivElement | null>(null);
  const sparkOrbRef = useRef<SVGCircleElement | null>(null);
  const liquidGroupRef = useRef<SVGGElement | null>(null);

  const [activeMemory, setActiveMemory] = useState<{
    memory: HeartMemory;
    wasAlreadyOpened: boolean;
  } | null>(null);
  const [hoveredMemory, setHoveredMemory] = useState<HeartMemory | null>(null);
  const [busyPointId, setBusyPointId] = useState<number | null>(null);
  const [limitAlert, setLimitAlert] = useState('');

  const todayKey = getTodayDateKey();
  const openedSet = useMemo(() => new Set(progress.openedIds), [progress.openedIds]);
  const openedTodayCount = progress.historyByDate[todayKey]?.length ?? 0;
  const usedDaysCount = Object.keys(progress.historyByDate).length;
  const percentage = Math.round(
    (progress.openedIds.length / TOTAL_MEMORIES_COUNT) * 100
  );
  const isCompleted = progress.openedIds.length >= TOTAL_MEMORIES_COUNT;
  const dailyExhausted = !isCompleted && openedTodayCount >= DAILY_MEMORY_LIMIT;

  // Compensar estrechez de la punta inferior del corazón para percepción visual fiel
  const visualRatio =
    percentage === 0 ? 0 : 0.16 + 0.84 * Math.pow(percentage / 100, 0.78);
  const liquidOffsetY = 190 * (1 - visualRatio);

  useEffect(() => {
    if (!liquidGroupRef.current) return;
    gsap.to(liquidGroupRef.current, {
      y: liquidOffsetY,
      duration: 0.9,
      ease: 'power3.out',
    });
  }, [liquidOffsetY]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-anim="map-point-blink"]', {
          scale: 1.18,
          autoAlpha: 1,
          duration: 1.2,
          stagger: { each: 0.14, from: 'random', repeat: -1, yoyo: true },
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });

        gsap.to('[data-anim="map-liquid-wave-front"]', {
          x: -36,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('[data-anim="map-liquid-wave-back"]', {
          x: 34,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('[data-anim="central-heart-halo"]', {
          scale: 1.1,
          autoAlpha: 0.65,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });

        gsap.to('[data-anim="world-sparkle"]', {
          scale: 1.25,
          autoAlpha: 0.95,
          duration: 1.8,
          stagger: { each: 0.3, repeat: -1, yoyo: true },
          ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });
      });
      return () => mm.revert();
    },
    { scope: mapRootRef, dependencies: [progress.openedIds.length] }
  );

  const launchChargingSpark = (fromX: number, fromY: number) => {
    const orb = sparkOrbRef.current;
    if (!orb) return;
    gsap.killTweensOf(orb);
    gsap.fromTo(
      orb,
      {
        attr: { cx: fromX, cy: fromY },
        autoAlpha: 1,
        scale: 1.25,
        transformOrigin: '50% 50%',
      },
      {
        attr: { cx: 600, cy: 438 },
        scale: 0.4,
        autoAlpha: 0,
        duration: 0.78,
        ease: 'power2.inOut',
      }
    );
  };

  const handleSelectPoint = async (memory: HeartMemory) => {
    if (busyPointId !== null) return;
    setLimitAlert('');

    const wasAlreadyOpened = openedSet.has(memory.id);
    if (wasAlreadyOpened) {
      setActiveMemory({ memory, wasAlreadyOpened: true });
      return;
    }

    setBusyPointId(memory.id);
    try {
      const result = await openMemoryPoint(memory.id);
      onProgressChange(result.state);

      if (!result.ok) {
        if (result.reason === 'daily_limit') {
          setLimitAlert(
            `Ya abriste tus ${DAILY_MEMORY_LIMIT} recuerdos de hoy. Vuelve en ${getTimeUntilMidnightText()} para seguir abriendo nuestro corazón.`
          );
        } else {
          setLimitAlert(
            'No pudimos conectar con el mapa en este momento. Intenta de nuevo.'
          );
        }
        return;
      }

      setActiveMemory({ memory, wasAlreadyOpened: false });
    } finally {
      setBusyPointId(null);
    }
  };

  const handleCloseModal = () => {
    if (activeMemory && !activeMemory.wasAlreadyOpened) {
      launchChargingSpark(activeMemory.memory.x, activeMemory.memory.y);
    }
    setActiveMemory(null);
  };

  const activeTooltipText = hoveredMemory
    ? openedSet.has(hoveredMemory.id)
      ? `Recuerdo #${hoveredMemory.id} · ${hoveredMemory.title}`
      : `Recuerdo #${hoveredMemory.id} · Toca para descubrir`
    : null;

  return (
    <section
      className="heart-map-screen"
      ref={mapRootRef}
      aria-label="Mapa del Corazón de Wendy"
    >
      {/* Full-bleed illustrated romantic garden & celestial backdrop */}
      <svg
        className="heart-map-world-bg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mapWorldSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDF2E6" />
            <stop offset="56%" stopColor="#F8DFD6" />
            <stop offset="100%" stopColor="#F0C7CF" />
          </linearGradient>
          <radialGradient id="mapWorldHalo" cx="50%" cy="54%" r="48%">
            <stop offset="0%" stopColor="#FCE4B0" stopOpacity="0.58" />
            <stop offset="52%" stopColor="#F3B8C6" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#FAF3EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mapLanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBE1A4" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#F4C97A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#mapWorldSky)" />
        <circle cx="720" cy="495" r="500" fill="url(#mapWorldHalo)" />

        {/* Subtle golden astrolabe celestial rings */}
        <circle
          cx="720"
          cy="495"
          r="330"
          fill="none"
          stroke="#C9963B"
          strokeOpacity="0.14"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
        <circle
          cx="720"
          cy="495"
          r="435"
          fill="none"
          stroke="#C9963B"
          strokeOpacity="0.11"
          strokeWidth="1.5"
        />

        {/* Twinkling four-point stars */}
        {SKY_SPARKLES.map((sp, i) => (
          <g key={i} transform={`translate(${sp.x}, ${sp.y}) scale(${sp.s})`}>
            <path
              data-anim="world-sparkle"
              d="M0 -10 L2.4 -2.4 L10 0 L2.4 2.4 L0 10 L-2.4 2.4 L-10 0 L-2.4 -2.4 Z"
              fill="#C9963B"
              fillOpacity="0.55"
            />
          </g>
        ))}

        {/* Soft distant hills */}
        <path
          d="M0 685 Q340 618 720 676 T1440 658 L1440 900 L0 900 Z"
          fill="#E5C9BE"
        />
        <path
          d="M0 742 Q390 692 750 738 T1440 720 L1440 900 L0 900 Z"
          fill="#D9B8A3"
        />

        {/* Left Cherry Blossom & Cypress Framing */}
        <g>
          <ellipse cx="268" cy="610" rx="22" ry="74" fill="#7D9473" fillOpacity="0.72" />
          <rect x="104" y="510" width="22" height="215" rx="8" fill="#8C6253" />
          <circle cx="115" cy="482" r="76" fill="#EBB4BF" />
          <circle cx="68" cy="515" r="52" fill="#E39EAE" />
          <circle cx="160" cy="516" r="50" fill="#F2C8D0" />
          <circle cx="118" cy="436" r="46" fill="#F5D3DA" />
        </g>

        {/* Right Cherry Blossom & Cypress Framing */}
        <g>
          <ellipse cx="1172" cy="605" rx="22" ry="76" fill="#7D9473" fillOpacity="0.72" />
          <rect x="1312" y="505" width="24" height="220" rx="8" fill="#8C6253" />
          <circle cx="1322" cy="476" r="78" fill="#EBB4BF" />
          <circle cx="1274" cy="512" r="52" fill="#F2C8D0" />
          <circle cx="1368" cy="510" r="50" fill="#E39EAE" />
          <circle cx="1316" cy="432" r="48" fill="#F5D3DA" />
        </g>

        {/* Left Garden Lantern */}
        <g>
          <circle cx="222" cy="508" r="58" fill="url(#mapLanternGlow)" />
          <rect x="196" y="492" width="8" height="218" rx="4" fill="#5D3E43" />
          <path
            d="M200 496 C200 478 220 476 222 490"
            fill="none"
            stroke="#5D3E43"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon
            points="212,492 232,492 228,518 216,518"
            fill="#FCE6B4"
            stroke="#5D3E43"
            strokeWidth="2.5"
          />
        </g>

        {/* Right Garden Lantern */}
        <g>
          <circle cx="1218" cy="508" r="58" fill="url(#mapLanternGlow)" />
          <rect x="1236" y="492" width="8" height="218" rx="4" fill="#5D3E43" />
          <path
            d="M1240 496 C1240 478 1220 476 1218 490"
            fill="none"
            stroke="#5D3E43"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon
            points="1208,492 1228,492 1224,518 1212,518"
            fill="#FCE6B4"
            stroke="#5D3E43"
            strokeWidth="2.5"
          />
        </g>
      </svg>

      {/* Compact Top Header */}
      <header className="heart-map-header">
        <h2 className="heart-map-title">El Mapa de Nuestro Corazón</h2>

        <div className="heart-map-status-row">
          <span className="heart-map-status-pill">
            Hoy: <strong>{openedTodayCount}/{DAILY_MEMORY_LIMIT}</strong> · Total:{' '}
            <strong>{progress.openedIds.length}/{TOTAL_MEMORIES_COUNT}</strong>
            {usedDaysCount > 0 ? ` · ${usedDaysCount} ${usedDaysCount === 1 ? 'día' : 'días'}` : ''}
          </span>

          {(dailyExhausted || limitAlert) && !isCompleted && (
            <span className="heart-map-timer-pill" role="status">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 3 H18 M6 21 H18 M8 3 C8 9 12 11 12 12 C12 13 8 15 8 21 M16 3 C16 9 12 11 12 12 C12 13 16 15 16 21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {limitAlert || `Próximos 5 recuerdos en ${getTimeUntilMidnightText()}`}
              </span>
            </span>
          )}
        </div>
      </header>

      {/* Main Constellation Canvas */}
      <div className="heart-map-canvas-wrap">
        {activeTooltipText && (
          <div className="heart-map-tooltip" role="status">
            {activeTooltipText}
          </div>
        )}

        <svg
          className="heart-map-svg"
          viewBox="0 0 1200 780"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="centralHeartClip">
              <path d={CENTRAL_HEART_PATH} />
            </clipPath>

            <linearGradient id="heartLiquidGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC6781" />
              <stop offset="55%" stopColor="#C85A6E" />
              <stop offset="100%" stopColor="#9B3148" />
            </linearGradient>

            <linearGradient id="heartSanctuaryFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFCF7" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#FCECE5" stopOpacity="0.48" />
            </linearGradient>

            <filter id="pointGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Translucent Sanctuary Parchment Heart Backing */}
          <path d={OUTER_HEART_PATH} fill="url(#heartSanctuaryFill)" />

          {/* Outer & Inner Constellation Heart Paths */}
          <path
            d={OUTER_HEART_PATH}
            fill="none"
            stroke="#C9963B"
            strokeOpacity="0.42"
            strokeWidth="2.4"
            strokeDasharray="7 9"
          />
          <path
            d={INNER_HEART_PATH}
            fill="none"
            stroke="#C85A6E"
            strokeOpacity="0.24"
            strokeWidth="1.8"
            strokeDasharray="4 8"
          />

          {/* Curved luminous filaments from opened points to the central heart */}
          {HEART_MEMORIES.filter((m) => openedSet.has(m.id)).map((m) => (
            <path
              key={`link-${m.id}`}
              d={getFilamentCurve(m.x, m.y)}
              fill="none"
              stroke={m.kind === 'hard' ? '#C9963B' : '#C85A6E'}
              strokeOpacity="0.34"
              strokeWidth="2"
              strokeDasharray="5 6"
            />
          ))}

          {/* CENTRAL RELIC CHARGING HEART AT (600, 438) */}
          <g
            className={isCompleted ? 'central-heart-ready' : undefined}
            role={isCompleted ? 'button' : undefined}
            tabIndex={isCompleted ? 0 : undefined}
            aria-label={
              isCompleted
                ? 'Corazón al 100 por ciento. Abrir animación final'
                : `Corazón cargado al ${percentage} por ciento`
            }
            onClick={() => {
              if (isCompleted) onOpenFinale();
            }}
            onKeyDown={(e) => {
              if (isCompleted && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onOpenFinale();
              }
            }}
          >
            {isCompleted && (
              <path
                data-anim="central-heart-halo"
                d={CENTRAL_HEART_HALO_PATH}
                fill="none"
                stroke="#F4C97A"
                strokeWidth="5"
                strokeOpacity="0.85"
              />
            )}

            {/* Outer delicate laurel/gold frame */}
            <path
              d={CENTRAL_HEART_HALO_PATH}
              fill="none"
              stroke="#C9963B"
              strokeOpacity="0.28"
              strokeWidth="1.5"
              strokeDasharray="3 6"
            />

            {/* Heart glass vessel */}
            <path d={CENTRAL_HEART_PATH} fill="#FFFDF9" fillOpacity="0.92" />

            {/* Dual-wave animated liquid fill */}
            <g clipPath="url(#centralHeartClip)">
              <g
                ref={liquidGroupRef}
                style={{ transform: `translateY(${liquidOffsetY}px)` }}
              >
                <path
                  data-anim="map-liquid-wave-back"
                  d="M440 356 Q490 342 540 356 T640 356 T740 356 T840 356 L840 590 L440 590 Z"
                  fill="#F192A6"
                  fillOpacity="0.65"
                />
                <path
                  data-anim="map-liquid-wave-front"
                  d="M450 354 Q498 340 546 354 T642 354 T738 354 T834 354 L834 590 L450 590 Z"
                  fill="url(#heartLiquidGrad)"
                />
              </g>
            </g>

            {/* Specular glass highlight on left lobe */}
            <path
              d="M522 396 C524 374 540 364 554 366"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.72"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Heart border */}
            <path
              d={CENTRAL_HEART_PATH}
              fill="none"
              stroke={isCompleted ? '#C9963B' : '#C85A6E'}
              strokeWidth="3.8"
            />

            {/* Percentage readout */}
            <text
              x="600"
              y="442"
              textAnchor="middle"
              className={`central-heart-percent${
                percentage >= 58 ? ' central-heart-percent--filled' : ''
              }`}
            >
              {percentage}%
            </text>
            <text
              x="600"
              y="470"
              textAnchor="middle"
              className={`central-heart-sub${
                percentage >= 42 ? ' central-heart-sub--filled' : ''
              }`}
            >
              {progress.openedIds.length} / {TOTAL_MEMORIES_COUNT}
            </text>
          </g>

          {/* 30 INTERACTIVE JEWEL MEDALLION POINTS */}
          {HEART_MEMORIES.map((memory) => {
            const isOpened = openedSet.has(memory.id);
            const isBusy = busyPointId === memory.id;
            const isHard = memory.kind === 'hard';

            return (
              <g
                key={memory.id}
                transform={`translate(${memory.x}, ${memory.y})`}
                className={`heart-map-point${isOpened ? ' heart-map-point--opened' : ''}${
                  isBusy ? ' heart-map-point--busy' : ''
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Recuerdo ${memory.id}: ${memory.title}${
                  isOpened ? ' (ya abierto)' : ' (por descubrir)'
                }`}
                onMouseEnter={() => setHoveredMemory(memory)}
                onMouseLeave={() => setHoveredMemory(null)}
                onFocus={() => setHoveredMemory(memory)}
                onBlur={() => setHoveredMemory(null)}
                onClick={() => handleSelectPoint(memory)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectPoint(memory);
                  }
                }}
              >
                <circle r="23" fill="transparent" />

                <g
                  data-anim={isOpened ? 'map-point-opened' : 'map-point-blink'}
                  filter="url(#pointGlowFilter)"
                >
                  {!isOpened ? (
                    <>
                      <circle r="19" fill="#F4C97A" fillOpacity="0.28" />
                      <circle
                        r="14.5"
                        fill="#FFFDF9"
                        stroke="#C9963B"
                        strokeWidth="1.9"
                      />
                      <path
                        d="M0 7.5 C0 7.5 -7.5 2.4 -7.5 -2 C-7.5 -4.7 -5.4 -6.6 -3 -6.6 C-1.4 -6.6 -0.4 -5.7 0 -4.2 C0.4 -5.7 1.4 -6.6 3 -6.6 C5.4 -6.6 7.5 -4.7 7.5 -2 C7.5 2.4 0 7.5 0 7.5Z"
                        fill="#E88B9D"
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        r="15.5"
                        fill={isHard ? '#D4A243' : '#D94865'}
                        stroke="#F4C97A"
                        strokeWidth="2"
                      />
                      <path
                        d="M0 7.5 C0 7.5 -7.5 2.4 -7.5 -2 C-7.5 -4.7 -5.4 -6.6 -3 -6.6 C-1.4 -6.6 -0.4 -5.7 0 -4.2 C0.4 -5.7 1.4 -6.6 3 -6.6 C5.4 -6.6 7.5 -4.7 7.5 -2 C7.5 2.4 0 7.5 0 7.5Z"
                        fill="#FFFDF9"
                      />
                    </>
                  )}
                </g>

                {/* Crisp integrated number badge */}
                <g transform="translate(0, 17)">
                  <rect
                    x="-10"
                    y="-7.5"
                    width="20"
                    height="14"
                    rx="7"
                    fill="#FFFDF9"
                    stroke={isOpened ? (isHard ? '#C9963B' : '#C85A6E') : 'rgba(110, 71, 79, 0.32)'}
                    strokeWidth="1.2"
                  />
                  <text y="3" textAnchor="middle" className="heart-map-point-num">
                    {memory.id}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Flying spark orb when a new memory is saved */}
          <circle
            ref={sparkOrbRef}
            r="10"
            fill="#F4C97A"
            filter="url(#pointGlowFilter)"
            style={{ opacity: 0, pointerEvents: 'none' }}
          />
        </svg>

        {isCompleted && (
          <button
            type="button"
            className="open-finale-btn"
            onClick={onOpenFinale}
          >
            <span>Abrir nuestro corazón (100%)</span>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 21 C12 21 3 14.8 3 8.6 C3 5.4 5.5 3 8.6 3 C10.4 3 11.5 4 12 5.4 C12.5 4 13.6 3 15.4 3 C18.5 3 21 5.4 21 8.6 C21 14.8 12 21 12 21Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>

      {activeMemory && (
        <MemorySceneModal
          memory={activeMemory.memory}
          isAlreadyOpened={activeMemory.wasAlreadyOpened}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
