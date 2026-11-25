import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { HeartMemory } from '../../config/memoriesConfig';

gsap.registerPlugin(useGSAP);

interface MemorySceneModalProps {
  memory: HeartMemory;
  isAlreadyOpened: boolean;
  onClose: () => void;
}

export function MemorySceneModal({
  memory,
  isAlreadyOpened,
  onClose,
}: MemorySceneModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const variant = memory.sceneVariant;
  const isNight =
    variant === 'starlight-talk' ||
    variant === 'storm-argument' ||
    variant === 'healing-distance';

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          normalMotion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const reduceMotion = Boolean(context.conditions?.reduceMotion);
          const dur = (v: number) => (reduceMotion ? Math.min(0.2, v * 0.4) : v);

          gsap.set('[data-scene="card"]', { autoAlpha: 0, scale: 0.94, y: 16 });
          gsap.set('[data-scene="boy"]', { x: -160, y: 0 });
          gsap.set('[data-scene="girl"]', { x: 160, y: 0 });
          gsap.set('[data-scene="boy-head"]', { rotation: 0, svgOrigin: '430 225' });
          gsap.set('[data-scene="girl-head"]', { rotation: 0, svgOrigin: '430 225' });
          gsap.set('[data-scene="boy-arm"]', { rotation: 0, svgOrigin: '456 254' });
          gsap.set('[data-scene="girl-arm"]', { rotation: 0, svgOrigin: '404 256' });
          gsap.set('[data-scene="hearts"]', { autoAlpha: 0, y: 18, scale: 0.7, transformOrigin: '50% 50%' });
          gsap.set('[data-scene="sparks"]', { autoAlpha: 0, scale: 0.6, svgOrigin: '430 185' });
          gsap.set('[data-scene="thread"]', { strokeDasharray: 1, strokeDashoffset: 1, autoAlpha: 0 });
          gsap.set('[data-scene="glow-core"]', { autoAlpha: 0.35, scale: 0.85, transformOrigin: '50% 50%' });
          gsap.set('[data-scene="rain"]', { autoAlpha: variant === 'storm-argument' || variant === 'healing-distance' ? 0.85 : 0 });
          gsap.set('[data-scene="stars"]', { autoAlpha: variant === 'starlight-talk' ? 0.9 : 0 });

          // Expressions default
          gsap.set('[data-scene="boy-happy"], [data-scene="girl-happy"]', { autoAlpha: 0 });
          gsap.set('[data-scene="boy-tense"], [data-scene="girl-tense"]', { autoAlpha: 0 });
          gsap.set('[data-scene="boy-tender"], [data-scene="girl-tender"]', { autoAlpha: 0 });

          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          tl.to('[data-scene="card"]', { autoAlpha: 1, scale: 1, y: 0, duration: dur(0.38) });

          if (variant === 'walk-together') {
            gsap.set('[data-scene="boy-happy"], [data-scene="girl-happy"]', { autoAlpha: 1 });
            tl.to('[data-scene="boy"]', { x: -40, duration: dur(1.4) }, 0.2)
              .to('[data-scene="girl"]', { x: 40, duration: dur(1.4) }, 0.2)
              .to('[data-scene="boy-arm"]', { rotation: -12, duration: dur(0.6) }, 0.8)
              .to('[data-scene="girl-arm"]', { rotation: 12, duration: dur(0.6) }, 0.8)
              .to('[data-scene="hearts"]', { autoAlpha: 0.9, y: -14, scale: 1, duration: dur(1.1), stagger: 0.14 }, 1.1);
            if (!reduceMotion) {
              tl.to('[data-scene="boy"], [data-scene="girl"]', { y: -5, duration: 0.35, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 0.2);
            }
          } else if (variant === 'starlight-talk') {
            gsap.set('[data-scene="boy-happy"], [data-scene="girl-happy"]', { autoAlpha: 1 });
            tl.to('[data-scene="boy"]', { x: -64, duration: dur(1.1) }, 0.2)
              .to('[data-scene="girl"]', { x: 64, duration: dur(1.1) }, 0.2)
              .to('[data-scene="boy-head"]', { rotation: 6, duration: dur(0.6), yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.8)
              .to('[data-scene="girl-head"]', { rotation: -6, duration: dur(0.6), yoyo: true, repeat: 3, ease: 'sine.inOut' }, 1.0)
              .to('[data-scene="hearts"]', { autoAlpha: 0.9, y: -12, scale: 1, duration: dur(1.0), stagger: 0.15 }, 0.9);
          } else if (variant === 'warm-embrace') {
            gsap.set('[data-scene="boy-happy"], [data-scene="girl-happy"]', { autoAlpha: 1 });
            tl.to('[data-scene="boy"]', { x: -32, duration: dur(1.2) }, 0.2)
              .to('[data-scene="girl"]', { x: 32, duration: dur(1.2) }, 0.2)
              .to('[data-scene="boy-head"]', { rotation: 8, duration: dur(0.7) }, 0.9)
              .to('[data-scene="girl-head"]', { rotation: -8, duration: dur(0.7) }, 0.9)
              .to('[data-scene="boy-arm"]', { rotation: -18, duration: dur(0.7) }, 0.8)
              .to('[data-scene="girl-arm"]', { rotation: 18, duration: dur(0.7) }, 0.8)
              .to('[data-scene="glow-core"]', { autoAlpha: 1, scale: 1.2, duration: dur(0.8) }, 0.9)
              .to('[data-scene="hearts"]', { autoAlpha: 0.95, y: -20, scale: 1.05, duration: dur(1.2), stagger: 0.14 }, 1.0);
          } else if (variant === 'playful-joy') {
            gsap.set('[data-scene="boy-happy"], [data-scene="girl-happy"]', { autoAlpha: 1 });
            tl.to('[data-scene="boy"]', { x: -50, duration: dur(0.9) }, 0.2)
              .to('[data-scene="girl"]', { x: 50, duration: dur(0.9) }, 0.2)
              .to('[data-scene="boy-arm"]', { rotation: -42, duration: dur(0.5) }, 0.8)
              .to('[data-scene="girl-arm"]', { rotation: 42, duration: dur(0.5) }, 0.8)
              .to('[data-scene="hearts"]', { autoAlpha: 0.95, y: -18, scale: 1, duration: dur(0.9), stagger: 0.12 }, 0.9);
            if (!reduceMotion) {
              tl.to('[data-scene="boy"], [data-scene="girl"]', { y: -10, duration: 0.42, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 1.0);
            }
          } else if (variant === 'storm-argument') {
            gsap.set('[data-scene="boy-tense"], [data-scene="girl-tense"]', { autoAlpha: 1 });
            tl.to('[data-scene="boy"]', { x: -84, duration: dur(0.9) }, 0.2)
              .to('[data-scene="girl"]', { x: 84, duration: dur(0.9) }, 0.2)
              .to('[data-scene="sparks"]', { autoAlpha: 1, scale: 1, duration: dur(0.4), ease: 'back.out(2)' }, 0.7)
              .to('[data-scene="sparks"]', { autoAlpha: 0, duration: dur(0.4) }, 2.1)
              // Healing turn: hearts glow & tense fades into tender love
              .to('[data-scene="boy-tense"], [data-scene="girl-tense"]', { autoAlpha: 0, duration: 0.3 }, 2.2)
              .to('[data-scene="boy-tender"], [data-scene="girl-tender"]', { autoAlpha: 1, duration: 0.4 }, 2.35)
              .to('[data-scene="boy"]', { x: -48, duration: dur(1.1) }, 2.5)
              .to('[data-scene="girl"]', { x: 48, duration: dur(1.1) }, 2.5)
              .to('[data-scene="glow-core"]', { autoAlpha: 1, scale: 1.25, duration: dur(0.8) }, 2.6);
          } else {
            // healing-distance
            gsap.set('[data-scene="boy-tender"], [data-scene="girl-tender"]', { autoAlpha: 1 });
            tl.to('[data-scene="boy"]', { x: -165, duration: dur(1.2) }, 0.2)
              .to('[data-scene="girl"]', { x: 165, duration: dur(1.2) }, 0.2)
              .to('[data-scene="boy-head"]', { rotation: 5, duration: dur(0.8) }, 0.9)
              .to('[data-scene="girl-head"]', { rotation: -5, duration: dur(0.8) }, 0.9)
              .to('[data-scene="glow-core"]', { autoAlpha: 1, scale: 1.2, duration: dur(0.8) }, 1.1)
              .to('[data-scene="thread"]', { autoAlpha: 1, strokeDashoffset: 0, duration: dur(1.3), ease: 'power2.inOut' }, 1.2);
          }

          if (!reduceMotion && (variant === 'storm-argument' || variant === 'healing-distance')) {
            gsap.to('[data-scene="rain-drop"]', {
              x: -10,
              y: 28,
              duration: 0.55,
              stagger: { each: 0.04, repeat: -1 },
              ease: 'none',
            });
          }
        }
      );
      return () => mm.revert();
    },
    { scope: modalRef, dependencies: [memory.id] }
  );

  return (
    <div
      className="memory-modal-backdrop"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="memory-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="memory-modal-card" data-scene="card">
        <div className="memory-modal-stage">
          <svg
            viewBox="0 0 860 400"
            className="memory-modal-svg"
            role="img"
            aria-label={memory.title}
          >
            <defs>
              <linearGradient id="modalDayBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDF0E2" />
                <stop offset="100%" stopColor="#F3D5C5" />
              </linearGradient>
              <linearGradient id="modalNightBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#121C33" />
                <stop offset="100%" stopColor="#233457" />
              </linearGradient>
              <linearGradient id="modalThreadGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF5470" />
                <stop offset="50%" stopColor="#F4C97A" />
                <stop offset="100%" stopColor="#FF5470" />
              </linearGradient>
            </defs>

            <rect
              width="860"
              height="400"
              fill={isNight ? 'url(#modalNightBg)' : 'url(#modalDayBg)'}
            />
            <path
              d="M0 326 Q430 296 860 326 L860 400 L0 400 Z"
              fill={isNight ? '#10182B' : '#D9BA9D'}
            />

            {/* Starlight layer */}
            <g data-scene="stars" fill="#FCE6B4">
              <circle cx="110" cy="68" r="2.5" />
              <circle cx="235" cy="48" r="3" />
              <circle cx="365" cy="82" r="2" />
              <circle cx="520" cy="54" r="3" />
              <circle cx="670" cy="76" r="2.5" />
              <circle cx="760" cy="46" r="3" />
            </g>

            {/* Rain layer */}
            <g data-scene="rain">
              {Array.from({ length: 18 }, (_, i) => (
                <line
                  key={i}
                  data-scene="rain-drop"
                  x1={40 + i * 46}
                  y1={20 + (i % 3) * 45}
                  x2={30 + i * 46}
                  y2={56 + (i % 3) * 45}
                  stroke="#90ACE0"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Floating hearts */}
            <g transform="translate(390, 125)">
              <g data-scene="hearts">
                <path
                  d="M0 14 C0 14 -12 5 -12 -2.5 C-12 -7 -8.5 -10 -4.5 -10 C-2.2 -10 -0.7 -8.6 0 -6.5 C0.7 -8.6 2.2 -10 4.5 -10 C8.5 -10 12 -7 12 -2.5 C12 5 0 14 0 14Z"
                  fill="#E45C77"
                />
              </g>
            </g>
            <g transform="translate(465, 112)">
              <g data-scene="hearts">
                <path
                  d="M0 11 C0 11 -10 4 -10 -2 C-10 -5.5 -7 -8 -3.8 -8 C-1.8 -8 -0.6 -6.8 0 -5.2 C0.6 -6.8 1.8 -8 3.8 -8 C7 -8 10 -5.5 10 -2 C10 4 0 11 0 11Z"
                  fill="#F4C97A"
                />
              </g>
            </g>

            {/* Boy Character (center 430, with glasses) */}
            <g data-scene="boy">
              <ellipse cx="430" cy="340" rx="34" ry="7" fill="#1C1013" fillOpacity="0.16" />
              <rect x="412" y="274" width="14" height="58" rx="7" fill="#3D4B63" />
              <rect x="434" y="274" width="14" height="58" rx="7" fill="#323F54" />
              <path d="M401 242 C401 230 459 230 459 242 L463 310 C463 318 397 318 397 310 Z" fill="#C86B4B" />
              <g data-scene="glow-core">
                <path
                  d="M430 286 C430 286 417 277 417 269.5 C417 265 420.5 261.5 424.5 261.5 C427.2 261.5 429 263 430 265 C431 263 432.8 261.5 435.5 261.5 C439.5 261.5 443 265 443 269.5 C443 277 430 286 430 286Z"
                  fill="#FF5470"
                  stroke="#F4C97A"
                  strokeWidth="1.5"
                />
              </g>
              <g data-scene="boy-head">
                <rect x="423" y="218" width="14" height="16" rx="5" fill="#E8B99D" />
                <circle cx="430" cy="192" r="34" fill="#F4CBB2" />
                <path d="M396 190 C394 162 412 148 434 150 C454 152 468 166 464 190 C458 176 444 170 430 172 C416 168 404 176 396 190 Z" fill="#4E312D" />

                {/* Expressions */}
                <g data-scene="boy-happy">
                  <path d="M414 193 Q419 187 424 193" fill="none" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M437 193 Q442 187 447 193" fill="none" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M422 206 Q430 214 438 206" fill="none" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                </g>
                <g data-scene="boy-tense">
                  <path d="M414 185 L425 189" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M447 185 L436 189" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="419" cy="195" r="3" fill="#3B2328" />
                  <circle cx="442" cy="195" r="3" fill="#3B2328" />
                  <path d="M422 210 Q430 203 438 210" fill="none" stroke="#3B2328" strokeWidth="2.3" strokeLinecap="round" />
                </g>
                <g data-scene="boy-tender">
                  <circle cx="419" cy="194" r="3.2" fill="#3B2328" />
                  <circle cx="442" cy="194" r="3.2" fill="#3B2328" />
                  <path d="M424 208 Q430 212 436 208" fill="none" stroke="#3B2328" strokeWidth="2.2" strokeLinecap="round" />
                </g>

                {/* Glasses */}
                <path d="M409 191 L397 189" stroke="#2D1B1E" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M451 191 L463 189" stroke="#2D1B1E" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="409" y="187" width="18" height="13" rx="5.5" fill="#FFFAF4" fillOpacity="0.16" stroke="#2D1B1E" strokeWidth="2" />
                <rect x="433" y="187" width="18" height="13" rx="5.5" fill="#FFFAF4" fillOpacity="0.16" stroke="#2D1B1E" strokeWidth="2" />
                <path d="M427 192 Q430 190 433 192" fill="none" stroke="#2D1B1E" strokeWidth="1.8" strokeLinecap="round" />
              </g>

              <g data-scene="boy-arm">
                <path d="M456 254 C469 275 470 296 464 312" fill="none" stroke="#D47656" strokeWidth="14" strokeLinecap="round" />
                <circle cx="464" cy="314" r="7" fill="#F4CBB2" />
              </g>
            </g>

            {/* Wendy Character (center 430) */}
            <g data-scene="girl">
              <ellipse cx="430" cy="340" rx="34" ry="7" fill="#1C1013" fillOpacity="0.16" />
              <path d="M393 184 C381 220 388 268 402 280 L458 280 C472 268 479 220 467 184 Z" fill="#3A2227" />
              <rect x="415" y="284" width="12" height="48" rx="6" fill="#F2C8B0" />
              <rect x="433" y="284" width="12" height="48" rx="6" fill="#EAC0A7" />
              <path d="M407 244 C407 232 453 232 453 244 L468 320 C468 328 392 328 392 320 Z" fill="#C85A6E" />
              <g data-scene="glow-core">
                <path
                  d="M430 286 C430 286 417 277 417 269.5 C417 265 420.5 261.5 424.5 261.5 C427.2 261.5 429 263 430 265 C431 263 432.8 261.5 435.5 261.5 C439.5 261.5 443 265 443 269.5 C443 277 430 286 430 286Z"
                  fill="#FF5470"
                  stroke="#F4C97A"
                  strokeWidth="1.5"
                />
              </g>
              <g data-scene="girl-head">
                <rect x="424" y="218" width="12" height="16" rx="5" fill="#EBBFA6" />
                <circle cx="430" cy="192" r="33" fill="#F5CFB9" />
                <path d="M396 192 C396 162 412 148 430 148 C448 148 464 162 464 192 C455 176 442 168 426 171 C413 174 404 180 396 192 Z" fill="#3A2227" />
                <circle cx="451" cy="171" r="5" fill="#E8A5B2" stroke="#C9963B" strokeWidth="1.5" />

                <g data-scene="girl-happy">
                  <path d="M413 193 Q418 187 423 193" fill="none" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M436 193 Q441 187 446 193" fill="none" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M422 206 Q429 214 437 206" fill="none" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                </g>
                <g data-scene="girl-tense">
                  <path d="M413 185 L424 189" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M446 185 L435 189" stroke="#3B2328" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="418" cy="195" r="3" fill="#3B2328" />
                  <circle cx="441" cy="195" r="3" fill="#3B2328" />
                  <path d="M422 210 Q429 203 437 210" fill="none" stroke="#3B2328" strokeWidth="2.3" strokeLinecap="round" />
                </g>
                <g data-scene="girl-tender">
                  <circle cx="418" cy="194" r="3.2" fill="#3B2328" />
                  <circle cx="441" cy="194" r="3.2" fill="#3B2328" />
                  <path d="M423 208 Q429 212 436 208" fill="none" stroke="#3B2328" strokeWidth="2.2" strokeLinecap="round" />
                </g>
              </g>

              <g data-scene="girl-arm">
                <path d="M404 256 C391 277 390 296 396 312" fill="none" stroke="#D96D80" strokeWidth="13" strokeLinecap="round" />
                <circle cx="396" cy="314" r="6.8" fill="#F5CFB9" />
              </g>
            </g>

            {/* Tension sparks & healing red-gold thread */}
            <g data-scene="sparks">
              <path d="M416 178 L430 160 L424 173 L439 164 L426 185" fill="none" stroke="#F4C97A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path
              data-scene="thread"
              d="M 265 274 C 350 226, 510 226, 595 274"
              fill="none"
              stroke="url(#modalThreadGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
            />
          </svg>
        </div>

        <div className="memory-modal-body">
          <div className="memory-modal-meta">
            <span
              className={`memory-kind-badge ${
                memory.kind === 'hard'
                  ? 'memory-kind-badge--hard'
                  : 'memory-kind-badge--good'
              }`}
            >
              {memory.kind === 'hard'
                ? 'Prueba superada con amor'
                : 'Momento feliz'}
            </span>
            <span className="memory-index-tag">Recuerdo {memory.id} de 30</span>
          </div>

          <h3 id="memory-modal-title" className="memory-modal-title">
            {memory.title}
          </h3>
          <p className="memory-modal-story">{memory.story}</p>

          <button
            type="button"
            className="memory-modal-close-btn"
            onClick={onClose}
          >
            <span>
              {isAlreadyOpened
                ? 'Volver al Mapa del Corazón'
                : 'Guardar en nuestro corazón'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
