import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface GrandFinaleLoveAnimationProps {
  onBackToMap: () => void;
}

const BLOOMING_FLOWERS = [
  { x: 240, y: 740, scale: 1.0, color: '#C85A6E' },
  { x: 350, y: 760, scale: 0.85, color: '#E8A5B2' },
  { x: 470, y: 750, scale: 0.95, color: '#F4C97A' },
  { x: 560, y: 768, scale: 0.8, color: '#C85A6E' },
  { x: 880, y: 768, scale: 0.82, color: '#E8A5B2' },
  { x: 970, y: 750, scale: 0.95, color: '#F4C97A' },
  { x: 1090, y: 760, scale: 0.88, color: '#C85A6E' },
  { x: 1200, y: 742, scale: 1.0, color: '#E8A5B2' },
];

const TREE_HEART_BLOSSOMS = [
  { x: 720, y: 245, scale: 1.25, color: '#C85A6E' },
  { x: 655, y: 280, scale: 1.05, color: '#E8A5B2' },
  { x: 785, y: 280, scale: 1.05, color: '#E8A5B2' },
  { x: 595, y: 330, scale: 1.1, color: '#F4C97A' },
  { x: 845, y: 330, scale: 1.1, color: '#F4C97A' },
  { x: 690, y: 318, scale: 0.95, color: '#D93854' },
  { x: 752, y: 318, scale: 0.95, color: '#D93854' },
  { x: 635, y: 372, scale: 0.88, color: '#C85A6E' },
  { x: 805, y: 372, scale: 0.88, color: '#C85A6E' },
  { x: 720, y: 195, scale: 0.92, color: '#F4C97A' },
];

const RISING_HEARTS = [
  { x: 640, y: 460, scale: 0.85 },
  { x: 720, y: 430, scale: 1.1 },
  { x: 800, y: 460, scale: 0.85 },
  { x: 680, y: 390, scale: 0.72 },
  { x: 760, y: 390, scale: 0.72 },
];

export function GrandFinaleLoveAnimation({
  onBackToMap,
}: GrandFinaleLoveAnimationProps) {
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

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
          const dur = (v: number) => (reduceMotion ? Math.min(0.25, v * 0.4) : v);

          gsap.set('[data-finale="burst-ring"]', { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' });
          gsap.set('[data-finale="boy"]', { x: -420, autoAlpha: 0 });
          gsap.set('[data-finale="girl"]', { x: 420, autoAlpha: 0 });
          gsap.set('[data-finale="boy-arm"]', { rotation: 0, svgOrigin: '752 574' });
          gsap.set('[data-finale="girl-arm"]', { rotation: 0, svgOrigin: '688 576' });
          gsap.set('[data-finale="flow-stream-1"], [data-finale="flow-stream-2"]', {
            strokeDasharray: '18 14',
            strokeDashoffset: 0,
            autoAlpha: 0,
          });
          gsap.set('[data-finale="tree-trunk"]', { scaleY: 0, transformOrigin: '50% 100%' });
          gsap.set('[data-finale="tree-blossom"]', { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%' });
          gsap.set('[data-finale="ground-flower"]', { scale: 0, autoAlpha: 0, transformOrigin: '50% 100%' });
          gsap.set('[data-finale="rising-heart"]', { autoAlpha: 0, y: 24, scale: 0.5, transformOrigin: '50% 50%' });
          gsap.set('[data-finale="copy-block"]', { autoAlpha: 0, y: 18 });

          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
          tlRef.current = tl;

          tl.to('[data-finale="burst-ring"]', {
            autoAlpha: 0.7,
            scale: 1.6,
            duration: dur(1.4),
            stagger: 0.25,
            ease: 'power2.out',
          })
            .to(
              '[data-finale="burst-ring"]',
              { autoAlpha: 0, duration: dur(0.8) },
              1.1
            )
            .to('[data-finale="boy"]', { x: -44, autoAlpha: 1, duration: dur(2.0) }, 0.4)
            .to('[data-finale="girl"]', { x: 44, autoAlpha: 1, duration: dur(2.0) }, 0.4)
            .to('[data-finale="boy-arm"]', { rotation: -12, duration: dur(0.7) }, 2.1)
            .to('[data-finale="girl-arm"]', { rotation: 12, duration: dur(0.7) }, 2.1)
            // Twin flowing love streams between their hearts
            .to(
              '[data-finale="flow-stream-1"], [data-finale="flow-stream-2"]',
              { autoAlpha: 1, duration: dur(1.0) },
              2.4
            )
            // Blooming tree of hearts & new flowers growing from the earth
            .to(
              '[data-finale="tree-trunk"]',
              { scaleY: 1, duration: dur(1.8), ease: 'power3.out' },
              2.8
            )
            .to(
              '[data-finale="tree-blossom"]',
              {
                scale: 1,
                autoAlpha: 0.94,
                duration: dur(1.0),
                stagger: { each: 0.14, from: 'center' },
                ease: 'back.out(1.7)',
              },
              3.9
            )
            .to(
              '[data-finale="ground-flower"]',
              {
                scale: 1,
                autoAlpha: 1,
                duration: dur(0.9),
                stagger: 0.12,
                ease: 'back.out(1.8)',
              },
              4.2
            )
            .to(
              '[data-finale="copy-block"]',
              { autoAlpha: 1, y: 0, duration: dur(1.0) },
              5.4
            );

          if (!reduceMotion) {
            gsap.to('[data-finale="flow-stream-1"]', {
              strokeDashoffset: -128,
              duration: 2.6,
              repeat: -1,
              ease: 'none',
            });
            gsap.to('[data-finale="flow-stream-2"]', {
              strokeDashoffset: 128,
              duration: 2.6,
              repeat: -1,
              ease: 'none',
            });
            gsap.to('[data-finale="rising-heart"]', {
              autoAlpha: 0.9,
              y: -70,
              scale: 1.05,
              duration: 3.4,
              stagger: { each: 0.45, repeat: -1 },
              ease: 'sine.inOut',
              delay: 3.2,
            });
          } else {
            tl.set('[data-finale="rising-heart"]', { autoAlpha: 0.85, y: -20, scale: 1 }, 4.5);
          }

          return () => {
            tl.kill();
          };
        }
      );
      return () => mm.revert();
    },
    { scope: finaleRef }
  );

  return (
    <section
      className="grand-finale-screen"
      ref={finaleRef}
      aria-label="El amor que fluye y seguirá naciendo entre los dos"
    >
      <svg
        className="grand-finale-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="finaleSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDF2E6" />
            <stop offset="55%" stopColor="#F9DFD8" />
            <stop offset="100%" stopColor="#F3C9CD" />
          </linearGradient>
          <radialGradient id="finaleSun" cx="50%" cy="54%" r="52%">
            <stop offset="0%" stopColor="#FCE4AD" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#F4B7C2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FCE7D9" stopOpacity="0" />
          </radialGradient>
          <filter id="finaleGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#finaleSky)" />
        <circle cx="720" cy="490" r="460" fill="url(#finaleSun)" />

        {/* Radiant bloom burst rings */}
        <circle data-finale="burst-ring" cx="720" cy="520" r="140" fill="none" stroke="#F4C97A" strokeWidth="4" />
        <circle data-finale="burst-ring" cx="720" cy="520" r="210" fill="none" stroke="#C85A6E" strokeWidth="3" />

        {/* Meadow hills */}
        <path d="M0 680 Q720 620 1440 680 L1440 900 L0 900 Z" fill="#DFC0A5" />
        <path d="M0 735 Q720 695 1440 735 L1440 900 L0 900 Z" fill="#CFA98B" />

        {/* Growing Tree of Hearts behind the couple */}
        <g>
          <path
            data-finale="tree-trunk"
            d="M710 738 C712 600 714 480 720 330 C726 480 728 600 730 738 Z"
            fill="#8D6152"
          />
          {TREE_HEART_BLOSSOMS.map((b, idx) => (
            <g key={idx} transform={`translate(${b.x}, ${b.y}) scale(${b.scale})`}>
              <g data-finale="tree-blossom">
                <path
                  d="M0 24 C0 24 -22 9 -22 -4 C-22 -12 -15.5 -17.5 -8.5 -17.5 C-4.2 -17.5 -1.2 -15 0 -11.4 C1.2 -15 4.2 -17.5 8.5 -17.5 C15.5 -17.5 22 -12 22 -4 C22 9 0 24 0 24Z"
                  fill={b.color}
                />
              </g>
            </g>
          ))}
        </g>

        {/* New Ground Flowers Sprouting */}
        {BLOOMING_FLOWERS.map((fl, idx) => (
          <g key={idx} transform={`translate(${fl.x}, ${fl.y}) scale(${fl.scale})`}>
            <g data-finale="ground-flower">
              <path d="M0 0 Q-3 -22 0 -42" stroke="#5E7A56" strokeWidth="4" strokeLinecap="round" fill="none" />
              <ellipse cx="-10" cy="-18" rx="9" ry="4" transform="rotate(-30 -10 -18)" fill="#7D9E71" />
              <ellipse cx="10" cy="-24" rx="9" ry="4" transform="rotate(30 10 -24)" fill="#6E8D63" />
              <circle cx="0" cy="-46" r="12" fill={fl.color} />
              <circle cx="0" cy="-46" r="5" fill="#FFFDF9" />
            </g>
          </g>
        ))}

        {/* Boy (with glasses) */}
        <g data-finale="boy">
          <ellipse cx="720" cy="744" rx="46" ry="10" fill="#3B2328" fillOpacity="0.16" />
          <rect x="696" y="654" width="19" height="76" rx="9" fill="#3D4B63" />
          <rect x="725" y="654" width="19" height="76" rx="9" fill="#323F54" />
          <path d="M681 560 C681 544 759 544 759 560 L764 658 C764 668 676 668 676 658 Z" fill="#C86B4B" />
          <g filter="url(#finaleGlow)">
            <path
              d="M720 618 C720 618 703 607 703 596.5 C703 590.8 707.5 586 713 586 C716.4 586 718.8 588 720 590.6 C721.2 588 723.6 586 727 586 C732.5 586 737 590.8 737 596.5 C737 607 720 618 720 618Z"
              fill="#FF5470"
              stroke="#F4C97A"
              strokeWidth="1.8"
            />
          </g>
          <g transform="rotate(6 720 540)">
            <rect x="710" y="530" width="20" height="22" rx="7" fill="#E8B99D" />
            <circle cx="720" cy="496" r="46" fill="#F4CBB2" />
            <path d="M674 494 C672 458 695 438 724 440 C752 442 770 462 766 494 C758 476 740 468 720 470 C701 466 686 476 674 494 Z" fill="#4E312D" />
            <path d="M700 497 Q706 490 712 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            <path d="M730 497 Q736 490 742 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="695" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.74" />
            <ellipse cx="746" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.74" />
            <path d="M710 514 Q720 524 730 514" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            <path d="M694 494 L676 492" stroke="#2D1B1E" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M747.5 494 L765 492" stroke="#2D1B1E" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="694" y="489" width="23" height="16.5" rx="7" fill="#FFFAF4" fillOpacity="0.16" stroke="#2D1B1E" strokeWidth="2.4" />
            <rect x="724.5" y="489" width="23" height="16.5" rx="7" fill="#FFFAF4" fillOpacity="0.16" stroke="#2D1B1E" strokeWidth="2.4" />
            <path d="M717 495.5 Q720.75 493 724.5 495.5" fill="none" stroke="#2D1B1E" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          <g data-finale="boy-arm">
            <path d="M752 574 C770 602 772 630 765 652" fill="none" stroke="#D47656" strokeWidth="19" strokeLinecap="round" />
            <circle cx="766" cy="654" r="9.5" fill="#F4CBB2" />
          </g>
        </g>

        {/* Wendy */}
        <g data-finale="girl">
          <ellipse cx="720" cy="744" rx="46" ry="10" fill="#3B2328" fillOpacity="0.16" />
          <path d="M671 486 C655 534 664 598 682 614 L758 614 C776 598 785 534 769 486 Z" fill="#3A2227" />
          <rect x="700" y="668" width="16" height="62" rx="8" fill="#F2C8B0" />
          <rect x="724" y="668" width="16" height="62" rx="8" fill="#EAC0A7" />
          <path d="M689 564 C689 548 751 548 751 564 L770 676 C770 686 670 686 670 676 Z" fill="#C85A6E" />
          <g filter="url(#finaleGlow)">
            <path
              d="M720 618 C720 618 703 607 703 596.5 C703 590.8 707.5 586 713 586 C716.4 586 718.8 588 720 590.6 C721.2 588 723.6 586 727 586 C732.5 586 737 590.8 737 596.5 C737 607 720 618 720 618Z"
              fill="#FF5470"
              stroke="#F4C97A"
              strokeWidth="1.8"
            />
          </g>
          <g transform="rotate(-6 720 540)">
            <rect x="711" y="530" width="18" height="22" rx="7" fill="#EBBFA6" />
            <circle cx="720" cy="496" r="45" fill="#F5CFB9" />
            <path d="M674 496 C674 456 695 438 720 438 C745 438 766 456 766 496 C754 474 737 464 715 468 C697 472 684 480 674 496 Z" fill="#3A2227" />
            <circle cx="748" cy="468" r="7" fill="#E8A5B2" stroke="#C9963B" strokeWidth="2" />
            <path d="M698 497 Q704 490 710 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            <path d="M728 497 Q734 490 740 497" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="693" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.78" />
            <ellipse cx="745" cy="508" rx="7.5" ry="4" fill="#E37B8E" fillOpacity="0.78" />
            <path d="M709 514 Q719 524 729 514" fill="none" stroke="#3B2328" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g data-finale="girl-arm">
            <path d="M688 576 C670 604 668 630 675 652" fill="none" stroke="#D96D80" strokeWidth="17" strokeLinecap="round" />
            <circle cx="674" cy="654" r="9" fill="#F5CFB9" />
          </g>
        </g>

        {/* Intertwined Flowing Love Streams */}
        <g filter="url(#finaleGlow)">
          <path
            data-finale="flow-stream-1"
            d="M 676 602 C 620 530, 820 530, 764 602 C 830 658, 610 658, 676 602"
            fill="none"
            stroke="#FF5470"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            data-finale="flow-stream-2"
            d="M 764 602 C 820 530, 620 530, 676 602 C 610 658, 830 658, 764 602"
            fill="none"
            stroke="#F4C97A"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
        </g>

        {/* Rising hearts */}
        {RISING_HEARTS.map((h, idx) => (
          <g key={idx} transform={`translate(${h.x}, ${h.y}) scale(${h.scale})`}>
            <g data-finale="rising-heart">
              <path
                d="M0 16 C0 16 -14 6.5 -14 -2.5 C-14 -7.5 -10 -11 -5.5 -11 C-2.6 -11 -0.8 -9.5 0 -7.2 C0.8 -9.5 2.6 -11 5.5 -11 C10 -11 14 -7.5 14 -2.5 C14 6.5 0 16 0 16Z"
                fill="#E0526F"
              />
            </g>
          </g>
        ))}
      </svg>

      <div className="grand-finale-overlay" data-finale="copy-block">
        <h2 className="grand-finale-title">Un amor que fluye y seguirá naciendo</h2>
        <p className="grand-finale-text">
          Cada risa y cada tormenta nos trajeron hasta aquí, Wendy. Lo nuestro sigue vivo,
          creciendo y floreciendo cada nuevo día.
        </p>

        <div className="grand-finale-actions">
          <button
            type="button"
            className="password-submit-btn grand-finale-primary"
            onClick={onBackToMap}
          >
            Volver al Mapa del Corazón
          </button>
          <button
            type="button"
            className="replay-story-btn"
            onClick={() => tlRef.current?.restart()}
          >
            Repetir este momento
          </button>
        </div>
      </div>
    </section>
  );
}
