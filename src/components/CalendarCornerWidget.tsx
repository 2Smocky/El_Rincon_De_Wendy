import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { LOVE_START_DATE } from '../config/storyConfig';

interface LiveClock {
  totalDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CalendarWidgetHandle {
  setDayProgress: (day: number) => void;
  setFinaleMode: (active: boolean) => void;
  resetToStart: () => void;
}

const SHORT_MONTHS_ES = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
] as const;

function parseStartDate(startIso: string): Date {
  const parsed = new Date(startIso);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function getRealTotalDays(startIso: string): number {
  const start = parseStartDate(startIso);
  const now = new Date();
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(1, Math.floor((nowUtc - startUtc) / 86400000));
}

function formatShortDate(startDate: Date, offsetDays: number): string {
  const baseUtc = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const target = new Date(baseUtc + offsetDays * 86400000);
  const day = target.getUTCDate();
  const month = SHORT_MONTHS_ES[target.getUTCMonth()];
  const year = target.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

function computeLiveClock(startIso: string): LiveClock {
  const start = parseStartDate(startIso);
  const now = new Date();
  const totalDays = getRealTotalDays(startIso);
  const diffSeconds = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000));
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  return { totalDays, hours, minutes, seconds };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

interface CalendarCornerWidgetProps {
  isNightMood: boolean;
}

export const CalendarCornerWidget = forwardRef<
  CalendarWidgetHandle,
  CalendarCornerWidgetProps
>(function CalendarCornerWidget({ isNightMood }, ref) {
  const [clock, setClock] = useState<LiveClock>(() => computeLiveClock(LOVE_START_DATE));

  const dayValueRef = useRef<HTMLParagraphElement | null>(null);
  const dateLabelRef = useRef<HTMLParagraphElement | null>(null);
  const finaleRef = useRef(false);
  const prevTotalDaysRef = useRef(clock.totalDays);

  const startDate = parseStartDate(LOVE_START_DATE);

  useImperativeHandle(
    ref,
    () => ({
      setDayProgress(day: number) {
        const total = getRealTotalDays(LOVE_START_DATE);
        const clamped = Math.min(total, Math.max(1, day));
        if (dayValueRef.current) {
          dayValueRef.current.textContent = `Día ${clamped.toLocaleString('es-CO')}`;
        }
        if (dateLabelRef.current && !finaleRef.current) {
          const offset =
            total <= 1
              ? 0
              : Math.round(((clamped - 1) / (total - 1)) * total);
          dateLabelRef.current.textContent = formatShortDate(startDate, offset);
        }
      },
      setFinaleMode(active: boolean) {
        finaleRef.current = active;
        if (active) {
          const currentTotal = getRealTotalDays(LOVE_START_DATE);
          if (dayValueRef.current) {
            dayValueRef.current.textContent = `${currentTotal.toLocaleString('es-CO')} días`;
          }
          if (dateLabelRef.current) {
            dateLabelRef.current.textContent = '14 ago 2024 — Hoy';
          }
        }
      },
      resetToStart() {
        finaleRef.current = false;
        if (dayValueRef.current) {
          dayValueRef.current.textContent = 'Día 1';
        }
        if (dateLabelRef.current) {
          dateLabelRef.current.textContent = formatShortDate(startDate, 0);
        }
      },
    }),
    [startDate]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextClock = computeLiveClock(LOVE_START_DATE);
      setClock(nextClock);

      if (finaleRef.current && nextClock.totalDays > prevTotalDaysRef.current) {
        prevTotalDaysRef.current = nextClock.totalDays;
        if (dayValueRef.current) {
          dayValueRef.current.textContent = `${nextClock.totalDays.toLocaleString('es-CO')} días`;
        }
      } else {
        prevTotalDaysRef.current = nextClock.totalDays;
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside
      className={`corner-calendar${isNightMood ? ' corner-calendar--night' : ''}`}
      data-anim="corner-calendar"
      aria-label="Calendario de amor"
    >
      {/* Antique gold binder rings */}
      <div className="corner-calendar-rings" aria-hidden="true">
        {[0, 1].map((ring) => (
          <svg key={ring} width="24" height="26" viewBox="0 0 34 36">
            <rect
              x="11"
              y="22"
              width="12"
              height="11"
              rx="4"
              fill="#3B2328"
              fillOpacity="0.2"
            />
            <path
              d="M9 27 C9 12, 10 4, 17 4 C24 4, 25 12, 25 27"
              fill="none"
              stroke="#C9963B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M11 24 C11 12, 12 6.5, 17 6.5"
              fill="none"
              stroke="#F4C97A"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>

      <div className="corner-calendar-card">
        <header className="corner-calendar-header">
          <svg width="16" height="16" viewBox="0 0 28 28" aria-hidden="true">
            <path
              d="M14 24.5C14 24.5 3.5 17.3 3.5 9.8C3.5 6.1 6.4 3.5 9.8 3.5C11.9 3.5 13.3 4.6 14 6.4C14.7 4.6 16.1 3.5 18.2 3.5C21.6 3.5 24.5 6.1 24.5 9.8C24.5 17.3 14 24.5 14 24.5Z"
              fill="#FFFAF4"
            />
          </svg>
          <h2 className="corner-calendar-title">Calendario de amor</h2>
        </header>

        <div className="corner-calendar-body">
          <p className="corner-day-number" ref={dayValueRef}>
            Día 1
          </p>

          <p className="corner-phase-label" ref={dateLabelRef}>
            {formatShortDate(startDate, 0)}
          </p>

          <div
            className="corner-live-clock"
            aria-label="Tiempo transcurrido en horas, minutos y segundos"
          >
            <span>{padTwo(clock.hours)}h</span>
            <span aria-hidden="true">·</span>
            <span>{padTwo(clock.minutes)}m</span>
            <span aria-hidden="true">·</span>
            <span>{padTwo(clock.seconds)}s</span>
          </div>
        </div>
      </div>
    </aside>
  );
});
