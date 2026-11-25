import {
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';

export const DAILY_MEMORY_LIMIT = 5;
export const TOTAL_MEMORIES_COUNT = 30;

export interface MapProgressState {
  unlocked: boolean;
  openedIds: number[];
  historyByDate: Record<string, number[]>;
  finaleUnlocked: boolean;
}

export const INITIAL_MAP_PROGRESS: MapProgressState = {
  unlocked: false,
  openedIds: [],
  historyByDate: {},
  finaleUnlocked: false,
};

export function getTodayDateKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function normalizePasswordToSlug(raw: string): string {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!cleaned || /\s/.test(cleaned) || !/^[a-z0-9_]+$/.test(cleaned)) {
    return '';
  }

  return cleaned;
}

function sanitizeState(raw: unknown): MapProgressState {
  if (!raw || typeof raw !== 'object') return INITIAL_MAP_PROGRESS;
  const obj = raw as Record<string, unknown>;
  const openedIds = Array.isArray(obj.openedIds)
    ? Array.from(
        new Set(
          obj.openedIds.filter(
            (n): n is number =>
              typeof n === 'number' && n >= 1 && n <= TOTAL_MEMORIES_COUNT
          )
        )
      )
    : [];

  const historyByDate: Record<string, number[]> = {};
  if (obj.historyByDate && typeof obj.historyByDate === 'object') {
    for (const [dateKey, list] of Object.entries(
      obj.historyByDate as Record<string, unknown>
    )) {
      if (Array.isArray(list)) {
        historyByDate[dateKey] = Array.from(
          new Set(
            list.filter(
              (n): n is number =>
                typeof n === 'number' && n >= 1 && n <= TOTAL_MEMORIES_COUNT
            )
          )
        );
      }
    }
  }

  return {
    unlocked: Boolean(obj.unlocked),
    openedIds,
    historyByDate,
    finaleUnlocked:
      Boolean(obj.finaleUnlocked) || openedIds.length >= TOTAL_MEMORIES_COUNT,
  };
}

export async function verifySecretPassword(rawInput: string): Promise<boolean> {
  const slug = normalizePasswordToSlug(rawInput);
  if (!slug || !db) return false;

  const keySnap = await getDoc(doc(db, 'claves_wendy', slug));
  if (!keySnap.exists() || keySnap.data()?.active !== true) {
    return false;
  }

  const progressRef = doc(db, 'progreso_wendy', 'estado_mapa');
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(progressRef);
    const current = snap.exists()
      ? sanitizeState(snap.data())
      : INITIAL_MAP_PROGRESS;

    tx.set(progressRef, {
      unlocked: true,
      openedIds: current.openedIds,
      historyByDate: current.historyByDate,
      finaleUnlocked: current.finaleUnlocked,
      updatedAt: serverTimestamp(),
    });
  });

  return true;
}

export async function loadMapProgress(): Promise<MapProgressState> {
  if (!db) return INITIAL_MAP_PROGRESS;

  const snap = await getDoc(doc(db, 'progreso_wendy', 'estado_mapa'));
  if (!snap.exists()) return INITIAL_MAP_PROGRESS;
  return sanitizeState(snap.data());
}

export function subscribeMapProgress(
  onChange: (state: MapProgressState) => void
): Unsubscribe {
  if (!db) {
    onChange(INITIAL_MAP_PROGRESS);
    return () => {};
  }

  return onSnapshot(doc(db, 'progreso_wendy', 'estado_mapa'), (snap) => {
    if (!snap.exists()) {
      onChange(INITIAL_MAP_PROGRESS);
      return;
    }
    onChange(sanitizeState(snap.data()));
  });
}

export interface OpenPointResult {
  ok: boolean;
  alreadyOpened?: boolean;
  reason?: 'daily_limit' | 'unavailable';
  state: MapProgressState;
}

export async function openMemoryPoint(pointId: number): Promise<OpenPointResult> {
  const todayKey = getTodayDateKey();

  if (!db) {
    return {
      ok: false,
      reason: 'unavailable',
      state: INITIAL_MAP_PROGRESS,
    };
  }

  const progressRef = doc(db, 'progreso_wendy', 'estado_mapa');

  return runTransaction(db, async (tx) => {
    const snap = await tx.get(progressRef);
    const current = snap.exists()
      ? sanitizeState(snap.data())
      : { ...INITIAL_MAP_PROGRESS, unlocked: true };

    if (current.openedIds.includes(pointId)) {
      return { ok: true, alreadyOpened: true, state: current };
    }

    const todayOpened = current.historyByDate[todayKey] ?? [];
    if (todayOpened.length >= DAILY_MEMORY_LIMIT) {
      return {
        ok: false,
        reason: 'daily_limit' as const,
        state: current,
      };
    }

    const nextOpened = [...current.openedIds, pointId];
    const nextHistory: Record<string, number[]> = {
      ...current.historyByDate,
      [todayKey]: [...todayOpened, pointId],
    };
    const nextState: MapProgressState = {
      unlocked: true,
      openedIds: nextOpened,
      historyByDate: nextHistory,
      finaleUnlocked: nextOpened.length >= TOTAL_MEMORIES_COUNT,
    };

    tx.set(progressRef, {
      ...nextState,
      updatedAt: serverTimestamp(),
    });

    return { ok: true, alreadyOpened: false, state: nextState };
  });
}
