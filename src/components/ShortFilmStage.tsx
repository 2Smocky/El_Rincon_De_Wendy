import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { LOVE_START_DATE } from '../config/storyConfig';
import { ActOneWendy } from './acts/ActOneWendy';
import { StoryStageSVG } from './characters/StoryStageSVG';
import { ActFourContinue } from './acts/ActFourContinue';
import {
  CalendarCornerWidget,
  getRealTotalDays,
  type CalendarWidgetHandle,
} from './CalendarCornerWidget';
import { StorybookFrameDecor } from './decor/StorybookFrameDecor';
import { HeartConstellationMap } from './map/HeartConstellationMap';
import { GrandFinaleLoveAnimation } from './map/GrandFinaleLoveAnimation';
import {
  INITIAL_MAP_PROGRESS,
  subscribeMapProgress,
  type MapProgressState,
} from '../lib/wendyFirestore';

gsap.registerPlugin(useGSAP);

type StageViewMode = 'film' | 'map' | 'finale';

export function ShortFilmStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const calendarRef = useRef<CalendarWidgetHandle | null>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [viewMode, setViewMode] = useState<StageViewMode>('film');
  const [mapProgress, setMapProgress] = useState<MapProgressState>(INITIAL_MAP_PROGRESS);
  const [isNightMood, setIsNightMood] = useState(false);

  const lastDayRef = useRef(1);
  const lastNightRef = useRef(false);
  const finaleTriggeredRef = useRef(false);

  useEffect(() => {
    const unsubscribe = subscribeMapProgress((nextState) => {
      setMapProgress(nextState);
    });
    return () => unsubscribe();
  }, []);

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
          const dur = (val: number) => (reduceMotion ? Math.min(0.25, val * 0.4) : val);

          // Persistent ambient frame animations
          if (!reduceMotion) {
            gsap.to('[data-anim="frame-lantern"]', {
              rotation: 3.5,
              transformOrigin: '50% 0%',
              duration: 2.8,
              yoyo: true,
              repeat: -1,
              stagger: 0.6,
              ease: 'sine.inOut',
            });

            gsap.to('[data-anim="ambient-petal"]', {
              x: '+=24',
              y: '+=32',
              rotation: '+=28',
              duration: 5.5,
              yoyo: true,
              repeat: -1,
              stagger: { each: 0.35, from: 'random' },
              ease: 'sine.inOut',
            });
          }

          if (viewMode !== 'film') {
            masterTlRef.current?.kill();
            masterTlRef.current = null;
            gsap.set('[data-anim="film-night-wash"]', { autoAlpha: 0 });
            gsap.set('[data-anim="corner-calendar"]', {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            const totalDays = getRealTotalDays(LOVE_START_DATE);
            calendarRef.current?.setDayProgress(totalDays);
            calendarRef.current?.setFinaleMode(true);
            return;
          }

          const totalDays = getRealTotalDays(LOVE_START_DATE);
          const dayProxy = { value: 1 };

          // Reset corner calendar to natural anchor before measuring center offset
          gsap.set('[data-anim="corner-calendar"]', { x: 0, y: 0, scale: 1 });
          calendarRef.current?.resetToStart();

          const calEl = stageRef.current?.querySelector<HTMLElement>(
            '[data-anim="corner-calendar"]'
          );
          const rect = calEl?.getBoundingClientRect();
          const centerOffsetX = rect
            ? window.innerWidth / 2 - (rect.left + rect.width / 2)
            : -window.innerWidth * 0.35;
          const centerOffsetY = rect
            ? window.innerHeight / 2 - (rect.top + rect.height / 2)
            : window.innerHeight * 0.35;
          const centerScale = window.innerWidth < 640 ? 1.35 : 1.72;

          // 1. Initial clean hidden states
          gsap.set('[data-anim="film-night-wash"]', { autoAlpha: 0 });
          gsap.set('[data-anim="act-wendy"]', { autoAlpha: 1, y: 0 });
          gsap.set('[data-anim="wendy-title"]', { autoAlpha: 0, y: 26, scale: 0.9 });
          gsap.set('[data-anim="wendy-flourish-path"]', {
            strokeDasharray: 1,
            strokeDashoffset: 1,
          });
          gsap.set('[data-anim="wendy-flourish-heart"]', {
            autoAlpha: 0,
            scale: 0,
            svgOrigin: '170 19',
          });
          gsap.set('[data-anim="wendy-subtitle"]', { autoAlpha: 0, y: 14 });
          gsap.set('[data-anim="wendy-heart"]', { autoAlpha: 0, y: 50, scale: 0.4 });

          gsap.set('[data-anim="corner-calendar"]', {
            autoAlpha: 0,
            x: centerOffsetX,
            y: centerOffsetY,
            scale: centerScale * 0.9,
          });

          gsap.set('[data-anim="act-story"]', { autoAlpha: 0 });
          gsap.set('[data-anim="story-scroll-banner"]', { autoAlpha: 0, y: 22 });
          gsap.set('[data-anim="bg-daylight"]', { autoAlpha: 1 });
          gsap.set('[data-anim="bg-golden-love"]', { autoAlpha: 0 });
          gsap.set('[data-anim="bg-storm-night"]', { autoAlpha: 0 });
          gsap.set('[data-anim="festoon-bulb"]', {
            autoAlpha: 0.25,
            scale: 0.85,
            transformOrigin: '50% 50%',
          });
          gsap.set('[data-anim="love-heart"]', {
            autoAlpha: 0,
            y: 18,
            scale: 0.5,
            transformOrigin: '50% 50%',
          });
          gsap.set('[data-anim="storm-cloud"]', { autoAlpha: 0, x: -45 });
          gsap.set('[data-anim="rain-layer"]', { autoAlpha: 0 });
          gsap.set('[data-anim="argue-sparks"]', {
            autoAlpha: 0,
            scale: 0.6,
            svgOrigin: '720 455',
          });
          gsap.set('[data-anim="red-thread-group"]', { autoAlpha: 0 });
          gsap.set('[data-anim="red-thread-path"]', {
            strokeDasharray: 1,
            strokeDashoffset: 1,
          });
          gsap.set(
            '[data-anim="thread-pulse-1"], [data-anim="thread-pulse-2"], [data-anim="thread-pulse-3"]',
            { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%' }
          );

          gsap.set('[data-anim="chat-bubble-boy"], [data-anim="chat-bubble-girl"]', {
            autoAlpha: 0,
            scale: 0.6,
            y: 12,
            transformOrigin: '50% 85%',
          });

          gsap.set('[data-anim="boy-root"]', { x: -520, y: 0, autoAlpha: 0 });
          gsap.set('[data-anim="girl-root"]', { x: 520, y: 0, autoAlpha: 0 });
          gsap.set('[data-anim="boy-body"]', { rotation: 0, svgOrigin: '720 650' });
          gsap.set('[data-anim="girl-body"]', { rotation: 0, svgOrigin: '720 650' });
          gsap.set('[data-anim="boy-head"]', { rotation: 0, svgOrigin: '720 540' });
          gsap.set('[data-anim="girl-head"]', { rotation: 0, svgOrigin: '720 540' });
          gsap.set('[data-anim="boy-arm-inner"]', { rotation: 0, svgOrigin: '752 574' });
          gsap.set('[data-anim="boy-arm-outer"]', { rotation: 0, svgOrigin: '688 574' });
          gsap.set('[data-anim="girl-arm-inner"]', { rotation: 0, svgOrigin: '688 576' });
          gsap.set('[data-anim="girl-arm-outer"]', { rotation: 0, svgOrigin: '752 576' });
          gsap.set('[data-anim="boy-chest-heart"]', {
            autoAlpha: 0.25,
            scale: 0.85,
            svgOrigin: '720 602',
          });
          gsap.set('[data-anim="girl-chest-heart"]', {
            autoAlpha: 0.25,
            scale: 0.85,
            svgOrigin: '720 602',
          });

          gsap.set(
            '[data-anim="boy-expr-talk"], [data-anim="boy-expr-love"], [data-anim="boy-expr-argue"], [data-anim="boy-expr-longing"]',
            { autoAlpha: 0 }
          );
          gsap.set(
            '[data-anim="girl-expr-talk"], [data-anim="girl-expr-love"], [data-anim="girl-expr-argue"], [data-anim="girl-expr-longing"]',
            { autoAlpha: 0 }
          );
          gsap.set('[data-anim="boy-expr-shy"], [data-anim="girl-expr-shy"]', {
            autoAlpha: 1,
          });

          gsap.set(
            '[data-anim="caption-meet"], [data-anim="caption-talk"], [data-anim="caption-love"], [data-anim="caption-fight"], [data-anim="caption-distance"]',
            { autoAlpha: 0, y: 10 }
          );

          gsap.set('[data-anim="act-continue"]', { autoAlpha: 0, y: 20 });
          gsap.set('[data-anim="continue-header"]', { autoAlpha: 0, y: 14 });
          gsap.set('[data-anim="password-card"]', { autoAlpha: 0, y: 20, scale: 0.96 });
          gsap.set('[data-anim="replay-btn"]', { autoAlpha: 0 });

          // 2. Ambient stage life (clouds, butterflies, rain)
          if (!reduceMotion) {
            gsap.to('[data-anim="sky-cloud"]', {
              x: 42,
              duration: 18,
              yoyo: true,
              repeat: -1,
              stagger: 3,
              ease: 'sine.inOut',
            });

            gsap.to('[data-anim="butterfly"]', {
              y: -14,
              x: 16,
              rotation: 8,
              transformOrigin: '50% 50%',
              duration: 2.1,
              yoyo: true,
              repeat: -1,
              stagger: 0.8,
              ease: 'sine.inOut',
            });

            gsap.to('[data-anim="rain-line"]', {
              x: -18,
              y: 44,
              duration: 0.55,
              stagger: { each: 0.03, repeat: -1 },
              ease: 'none',
            });
          }

          // 3. Master Continuous Short-Film Timeline
          const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            onUpdate: () => {
              const t = tl.time();
              const stormStart = tl.labels['act3d-storm'] ?? 35.1;
              const continueStart = tl.labels['act4-continue'] ?? 47.5;

              const nightActive = t >= stormStart && t < continueStart - 0.5;
              if (nightActive !== lastNightRef.current) {
                lastNightRef.current = nightActive;
                setIsNightMood(nightActive);
              }

              if (t >= continueStart && !finaleTriggeredRef.current) {
                finaleTriggeredRef.current = true;
                calendarRef.current?.setDayProgress(totalDays);
                calendarRef.current?.setFinaleMode(true);
              }
            },
            onComplete: () => {
              lastNightRef.current = false;
              finaleTriggeredRef.current = true;
              setIsNightMood(false);
              calendarRef.current?.setDayProgress(totalDays);
              calendarRef.current?.setFinaleMode(true);
              window.setTimeout(() => {
                passwordInputRef.current?.focus();
              }, 120);
            },
          });

          masterTlRef.current = tl;

          // ---------------- ACT I: WENDY + HEARTS (0s - 6.1s) ----------------
          tl.addLabel('act1-wendy', 0);
          tl.to('[data-anim="wendy-heart"]', {
            autoAlpha: 0.88,
            y: reduceMotion ? 0 : -26,
            scale: 1,
            duration: dur(1.4),
            stagger: { each: 0.05, from: 'random' },
            ease: 'power3.out',
          })
            .to(
              '[data-anim="wendy-title"]',
              { autoAlpha: 1, y: 0, scale: 1, duration: dur(1.05), ease: 'back.out(1.4)' },
              0.3
            )
            .to(
              '[data-anim="wendy-flourish-path"]',
              { strokeDashoffset: 0, duration: dur(0.95), ease: 'power2.inOut' },
              0.95
            )
            .to(
              '[data-anim="wendy-flourish-heart"]',
              { autoAlpha: 1, scale: 1, duration: dur(0.45), ease: 'back.out(2)' },
              1.45
            )
            .to(
              '[data-anim="wendy-subtitle"]',
              { autoAlpha: 1, y: 0, duration: dur(0.85) },
              1.6
            )
            .to(
              '[data-anim="wendy-heart"]',
              {
                y: reduceMotion ? 0 : -48,
                rotation: reduceMotion ? 0 : '+=10',
                duration: dur(3.0),
                ease: 'sine.inOut',
              },
              2.2
            )
            .to(
              '[data-anim="act-wendy"]',
              { autoAlpha: 0, y: -20, duration: dur(0.85), ease: 'power2.inOut' },
              5.2
            );

          // ---------------- ACT II: DAY 1 IN CENTER -> GLIDE TO TOP-RIGHT CORNER (6.0s - 13.2s) ----------------
          tl.addLabel('act2-calendar', 6.0);
          tl.to(
            '[data-anim="corner-calendar"]',
            {
              autoAlpha: 1,
              scale: centerScale,
              duration: dur(0.9),
              ease: 'power3.out',
            },
            'act2-calendar'
          ).to(
            '[data-anim="corner-calendar"]',
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: dur(1.5),
              ease: 'power3.inOut',
            },
            11.6
          );

          // ---------------- CONTINUOUS +1 DAY PROGRESSION IN CORNER (13.6s -> 47.0s) ----------------
          tl.to(
            dayProxy,
            {
              value: totalDays,
              duration: 33.4,
              ease: 'none',
              onUpdate: () => {
                const currentDay = Math.min(
                  totalDays,
                  Math.max(1, Math.round(dayProxy.value))
                );
                if (currentDay !== lastDayRef.current) {
                  lastDayRef.current = currentDay;
                  calendarRef.current?.setDayProgress(currentDay);
                }
              },
            },
            13.6
          );

          // ---------------- ACT III: FULL-BLEED STORYBOOK DOLLS ----------------
          // 3A. Meeting (13.8s - 20.8s)
          tl.addLabel('act3a-meet', 13.8);
          tl.to(
            '[data-anim="act-story"]',
            { autoAlpha: 1, duration: dur(0.9) },
            'act3a-meet'
          )
            .to(
              '[data-anim="story-scroll-banner"]',
              { autoAlpha: 1, y: 0, duration: dur(0.8) },
              'act3a-meet+=0.3'
            )
            .to(
              '[data-anim="boy-root"]',
              { x: -150, autoAlpha: 1, duration: dur(2.1), ease: 'power2.out' },
              'act3a-meet+=0.3'
            )
            .to(
              '[data-anim="girl-root"]',
              { x: 150, autoAlpha: 1, duration: dur(2.1), ease: 'power2.out' },
              'act3a-meet+=0.3'
            )
            .to(
              '[data-anim="boy-root"], [data-anim="girl-root"]',
              {
                y: reduceMotion ? 0 : -6,
                duration: dur(0.32),
                yoyo: true,
                repeat: 5,
                ease: 'sine.inOut',
              },
              'act3a-meet+=0.3'
            )
            .to(
              '[data-anim="caption-meet"]',
              { autoAlpha: 1, y: 0, duration: dur(0.8) },
              'act3a-meet+=0.8'
            )
            .to(
              '[data-anim="boy-arm-inner"]',
              { rotation: -56, duration: dur(0.55), ease: 'power2.out' },
              'act3a-meet+=2.2'
            )
            .to(
              '[data-anim="boy-arm-inner"]',
              { rotation: -36, duration: dur(0.35), yoyo: true, repeat: 2, ease: 'sine.inOut' },
              'act3a-meet+=2.75'
            )
            .to(
              '[data-anim="girl-head"]',
              { rotation: -7, duration: dur(0.7), ease: 'sine.inOut' },
              'act3a-meet+=2.3'
            )
            .to(
              '[data-anim="boy-arm-inner"]',
              { rotation: 0, duration: dur(0.5) },
              'act3a-meet+=4.0'
            )
            .to(
              '[data-anim="caption-meet"]',
              { autoAlpha: 0, y: -8, duration: dur(0.5) },
              20.2
            );

          // 3B. Talking & Laughing (20.8s - 27.5s)
          tl.addLabel('act3b-talk', 20.8);
          tl.to(
            '[data-anim="boy-root"]',
            { x: -92, duration: dur(1.1), ease: 'power2.inOut' },
            'act3b-talk'
          )
            .to(
              '[data-anim="girl-root"]',
              { x: 92, duration: dur(1.1), ease: 'power2.inOut' },
              'act3b-talk'
            )
            .to(
              '[data-anim="boy-expr-shy"], [data-anim="girl-expr-shy"]',
              { autoAlpha: 0, duration: 0.25 },
              'act3b-talk+=0.3'
            )
            .to(
              '[data-anim="boy-expr-talk"], [data-anim="girl-expr-talk"]',
              { autoAlpha: 1, duration: 0.3 },
              'act3b-talk+=0.45'
            )
            .to('[data-anim="girl-head"]', { rotation: 4, duration: dur(0.5) }, 'act3b-talk+=0.5')
            .to(
              '[data-anim="caption-talk"]',
              { autoAlpha: 1, y: 0, duration: dur(0.75) },
              'act3b-talk+=0.55'
            )
            .to(
              '[data-anim="chat-bubble-boy"]',
              { autoAlpha: 1, scale: 1, y: 0, duration: dur(0.6), ease: 'back.out(1.6)' },
              'act3b-talk+=0.9'
            )
            .to('[data-anim="boy-arm-inner"]', { rotation: -24, duration: dur(0.45) }, 'act3b-talk+=1.0')
            .to(
              '[data-anim="chat-bubble-girl"]',
              { autoAlpha: 1, scale: 1, y: 0, duration: dur(0.6), ease: 'back.out(1.6)' },
              'act3b-talk+=1.8'
            )
            .to('[data-anim="girl-arm-inner"]', { rotation: 24, duration: dur(0.45) }, 'act3b-talk+=1.9')
            .to(
              '[data-anim="boy-head"]',
              { rotation: 5, duration: dur(0.45), yoyo: true, repeat: 2, ease: 'sine.inOut' },
              'act3b-talk+=2.3'
            )
            .to(
              '[data-anim="chat-bubble-boy"], [data-anim="chat-bubble-girl"]',
              { autoAlpha: 0, scale: 0.8, duration: dur(0.5) },
              26.7
            )
            .to(
              '[data-anim="caption-talk"]',
              { autoAlpha: 0, y: -8, duration: dur(0.5) },
              26.8
            );

          // 3C. Falling in Love & Happiness (27.4s - 35.2s)
          tl.addLabel('act3c-love', 27.4);
          tl.to(
            '[data-anim="bg-golden-love"]',
            { autoAlpha: 1, duration: dur(1.4), ease: 'power2.inOut' },
            'act3c-love'
          )
            .to(
              '[data-anim="festoon-bulb"]',
              {
                autoAlpha: 1,
                scale: 1.12,
                duration: dur(0.45),
                stagger: 0.07,
                ease: 'back.out(1.8)',
              },
              'act3c-love+=0.35'
            )
            .to(
              '[data-anim="boy-root"]',
              { x: -46, duration: dur(1.2), ease: 'power2.inOut' },
              'act3c-love'
            )
            .to(
              '[data-anim="girl-root"]',
              { x: 46, duration: dur(1.2), ease: 'power2.inOut' },
              'act3c-love'
            )
            .to(
              '[data-anim="boy-expr-talk"], [data-anim="girl-expr-talk"]',
              { autoAlpha: 0, duration: 0.25 },
              'act3c-love+=0.3'
            )
            .to(
              '[data-anim="boy-expr-love"], [data-anim="girl-expr-love"]',
              { autoAlpha: 1, duration: 0.35 },
              'act3c-love+=0.45'
            )
            .to('[data-anim="boy-arm-inner"]', { rotation: -10, duration: dur(0.7) }, 'act3c-love+=0.6')
            .to('[data-anim="girl-arm-inner"]', { rotation: 10, duration: dur(0.7) }, 'act3c-love+=0.6')
            .to('[data-anim="boy-head"]', { rotation: 6, duration: dur(0.8) }, 'act3c-love+=0.7')
            .to('[data-anim="girl-head"]', { rotation: -6, duration: dur(0.8) }, 'act3c-love+=0.7')
            .to(
              '[data-anim="boy-chest-heart"], [data-anim="girl-chest-heart"]',
              { autoAlpha: 1, scale: 1.08, duration: dur(0.8), ease: 'back.out(1.7)' },
              'act3c-love+=0.8'
            )
            .to(
              '[data-anim="caption-love"]',
              { autoAlpha: 1, y: 0, duration: dur(0.8) },
              'act3c-love+=0.75'
            )
            .to(
              '[data-anim="love-heart"]',
              {
                autoAlpha: 0.92,
                y: -22,
                scale: 1,
                duration: dur(1.5),
                stagger: 0.14,
                ease: 'power2.out',
              },
              'act3c-love+=1.0'
            )
            .to(
              '[data-anim="love-heart"]',
              { y: -44, autoAlpha: 0, duration: dur(1.5), stagger: 0.12 },
              'act3c-love+=4.5'
            )
            .to(
              '[data-anim="caption-love"]',
              { autoAlpha: 0, y: -8, duration: dur(0.5) },
              34.5
            );

          // 3D. Fights & Strong Distance Connected by Love (35.1s - 46.8s)
          tl.addLabel('act3d-storm', 35.1);
          tl.to(
            '[data-anim="film-night-wash"]',
            { autoAlpha: 1, duration: dur(1.5), ease: 'power2.inOut' },
            'act3d-storm'
          )
            .to(
              '[data-anim="bg-golden-love"]',
              { autoAlpha: 0, duration: dur(1.1) },
              'act3d-storm'
            )
            .to(
              '[data-anim="bg-storm-night"]',
              { autoAlpha: 1, duration: dur(1.5), ease: 'power2.inOut' },
              'act3d-storm'
            )
            .to(
              '[data-anim="storm-cloud"]',
              { autoAlpha: 0.94, x: 0, duration: dur(1.4), stagger: 0.12 },
              'act3d-storm+=0.2'
            )
            .to(
              '[data-anim="rain-layer"]',
              { autoAlpha: 1, duration: dur(1.2) },
              'act3d-storm+=0.5'
            )
            .to(
              '[data-anim="boy-expr-love"], [data-anim="girl-expr-love"]',
              { autoAlpha: 0, duration: 0.25 },
              'act3d-storm+=0.3'
            )
            .to(
              '[data-anim="boy-expr-argue"], [data-anim="girl-expr-argue"]',
              { autoAlpha: 1, duration: 0.3 },
              'act3d-storm+=0.45'
            )
            .to(
              '[data-anim="boy-arm-inner"], [data-anim="girl-arm-inner"]',
              { rotation: 0, duration: dur(0.45) },
              'act3d-storm+=0.4'
            )
            .to(
              '[data-anim="boy-root"]',
              { x: -115, duration: dur(0.75), ease: 'power2.out' },
              'act3d-storm+=0.5'
            )
            .to(
              '[data-anim="girl-root"]',
              { x: 115, duration: dur(0.75), ease: 'power2.out' },
              'act3d-storm+=0.5'
            )
            .to(
              '[data-anim="boy-body"], [data-anim="boy-head"]',
              { rotation: -6, duration: dur(0.5) },
              'act3d-storm+=0.6'
            )
            .to(
              '[data-anim="girl-body"], [data-anim="girl-head"]',
              { rotation: 6, duration: dur(0.5) },
              'act3d-storm+=0.6'
            )
            .to(
              '[data-anim="argue-sparks"]',
              { autoAlpha: 1, scale: 1.05, duration: dur(0.35), ease: 'back.out(2)' },
              'act3d-storm+=0.8'
            )
            .to(
              '[data-anim="caption-fight"]',
              { autoAlpha: 1, y: 0, duration: dur(0.75) },
              'act3d-storm+=0.7'
            )
            .to(
              '[data-anim="argue-sparks"]',
              { autoAlpha: 0, scale: 0.6, duration: dur(0.4) },
              'act3d-storm+=3.9'
            )
            .to(
              '[data-anim="caption-fight"]',
              { autoAlpha: 0, y: -8, duration: dur(0.45) },
              'act3d-storm+=4.2'
            )
            .to(
              '[data-anim="boy-expr-argue"], [data-anim="girl-expr-argue"]',
              { autoAlpha: 0, duration: 0.25 },
              'act3d-storm+=4.4'
            )
            .to(
              '[data-anim="boy-expr-longing"], [data-anim="girl-expr-longing"]',
              { autoAlpha: 1, duration: 0.4 },
              'act3d-storm+=4.55'
            )
            .to(
              '[data-anim="boy-root"]',
              { x: -290, duration: dur(2.1), ease: 'power2.inOut' },
              'act3d-storm+=4.6'
            )
            .to(
              '[data-anim="girl-root"]',
              { x: 290, duration: dur(2.1), ease: 'power2.inOut' },
              'act3d-storm+=4.6'
            )
            .to('[data-anim="boy-body"]', { rotation: 0, duration: dur(1.0) }, 'act3d-storm+=4.9')
            .to('[data-anim="girl-body"]', { rotation: 0, duration: dur(1.0) }, 'act3d-storm+=4.9')
            .to('[data-anim="boy-head"]', { rotation: 5, duration: dur(1.1) }, 'act3d-storm+=5.3')
            .to('[data-anim="girl-head"]', { rotation: -5, duration: dur(1.1) }, 'act3d-storm+=5.3')
            .to('[data-anim="boy-arm-inner"]', { rotation: 28, duration: dur(0.9) }, 'act3d-storm+=5.3')
            .to('[data-anim="girl-arm-inner"]', { rotation: -28, duration: dur(0.9) }, 'act3d-storm+=5.3')
            .to(
              '[data-anim="boy-chest-heart"], [data-anim="girl-chest-heart"]',
              { scale: 1.24, autoAlpha: 1, duration: dur(0.7), yoyo: true, repeat: 3 },
              'act3d-storm+=5.6'
            )
            .to(
              '[data-anim="red-thread-group"]',
              { autoAlpha: 1, duration: 0.3 },
              'act3d-storm+=5.9'
            )
            .to(
              '[data-anim="red-thread-path"]',
              { strokeDashoffset: 0, duration: dur(1.8), ease: 'power2.inOut' },
              'act3d-storm+=6.0'
            )
            .to(
              '[data-anim="thread-pulse-1"], [data-anim="thread-pulse-2"], [data-anim="thread-pulse-3"]',
              {
                autoAlpha: 0.95,
                scale: 1.28,
                duration: dur(0.8),
                stagger: 0.25,
                yoyo: true,
                repeat: 2,
                ease: 'sine.inOut',
              },
              'act3d-storm+=6.9'
            )
            .to(
              '[data-anim="caption-distance"]',
              { autoAlpha: 1, y: 0, duration: dur(0.85) },
              'act3d-storm+=5.3'
            )
            .to(
              '[data-anim="story-scroll-banner"]',
              { autoAlpha: 0, y: 14, duration: dur(0.75) },
              46.3
            )
            .to(
              '[data-anim="act-story"]',
              { autoAlpha: 0, duration: dur(1.0), ease: 'power2.inOut' },
              46.5
            )
            .to(
              '[data-anim="film-night-wash"]',
              { autoAlpha: 0, duration: dur(1.2), ease: 'power2.inOut' },
              46.7
            );

          // ---------------- ACT IV: CONTINUARÁ + PASSWORD (47.5s - End) ----------------
          tl.addLabel('act4-continue', 47.5);
          tl.to(
            '[data-anim="act-continue"]',
            { autoAlpha: 1, y: 0, duration: dur(0.9), ease: 'power3.out' },
            'act4-continue'
          )
            .to(
              '[data-anim="continue-header"]',
              { autoAlpha: 1, y: 0, duration: dur(0.85) },
              'act4-continue+=0.2'
            )
            .to(
              '[data-anim="password-card"]',
              { autoAlpha: 1, y: 0, scale: 1, duration: dur(0.85), ease: 'back.out(1.25)' },
              'act4-continue+=0.55'
            )
            .to(
              '[data-anim="replay-btn"]',
              { autoAlpha: 1, duration: dur(0.6) },
              'act4-continue+=1.05'
            );

          return () => {
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: stageRef, dependencies: [viewMode] }
  );

  const handleReplay = () => {
    const tl = masterTlRef.current;
    if (!tl) return;
    lastDayRef.current = 1;
    lastNightRef.current = false;
    finaleTriggeredRef.current = false;
    setIsNightMood(false);
    calendarRef.current?.resetToStart();
    tl.restart();
  };

  const handleEnterMap = () => {
    setIsNightMood(false);
    setMapProgress((prev) => ({ ...prev, unlocked: true }));
    setViewMode('map');
  };

  const handleWatchIntroFromMap = () => {
    lastDayRef.current = 1;
    lastNightRef.current = false;
    finaleTriggeredRef.current = false;
    setIsNightMood(false);
    setViewMode('film');
  };

  return (
    <main className="film-stage" ref={stageRef}>
      <div className="film-backdrop-tint" aria-hidden="true" />
      <div className="film-night-wash" data-anim="film-night-wash" aria-hidden="true" />

      {/* Subtle warm paper grain overlay */}
      <svg className="film-paper-grain" aria-hidden="true">
        <filter id="paperGrainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperGrainFilter)" />
      </svg>

      {/* Persistent full-viewport botanical roses, lanterns & drifting petals */}
      <StorybookFrameDecor isNightMood={isNightMood} />

      {/* Persistent corner calendar */}
      <CalendarCornerWidget ref={calendarRef} isNightMood={isNightMood} />

      <div className="film-viewport">
        {viewMode === 'film' && (
          <>
            <ActOneWendy />
            <StoryStageSVG isNightMood={isNightMood} />
            <ActFourContinue
              onReplay={handleReplay}
              onUnlock={handleEnterMap}
              inputRef={passwordInputRef}
            />
          </>
        )}

        {viewMode === 'map' && (
          <HeartConstellationMap
            progress={mapProgress}
            onProgressChange={setMapProgress}
            onOpenFinale={() => setViewMode('finale')}
          />
        )}

        {viewMode === 'finale' && (
          <GrandFinaleLoveAnimation onBackToMap={() => setViewMode('map')} />
        )}
      </div>

      {/* Bottom-left navigation buttons rendered ABOVE StorybookFrameDecor (z-index: 36) */}
      {viewMode === 'film' && mapProgress.unlocked && (
        <button
          type="button"
          className="shortcut-to-map-btn"
          onClick={handleEnterMap}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 21 C12 21 3 14.8 3 8.6 C3 5.4 5.5 3 8.6 3 C10.4 3 11.5 4 12 5.4 C12.5 4 13.6 3 15.4 3 C18.5 3 21 5.4 21 8.6 C21 14.8 12 21 12 21Z"
              fill="currentColor"
            />
          </svg>
          <span>Ir al Mapa del Corazón</span>
        </button>
      )}

      {viewMode === 'map' && (
        <button
          type="button"
          className="map-watch-intro-btn"
          onClick={handleWatchIntroFromMap}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 4 L20 12 L6 20 Z" fill="currentColor" />
          </svg>
          <span>Volver a ver la película</span>
        </button>
      )}
    </main>
  );
}
