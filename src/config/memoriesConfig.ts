export type MemoryKind = 'good' | 'hard';

export type MemorySceneVariant =
  | 'starlight-talk'
  | 'walk-together'
  | 'warm-embrace'
  | 'playful-joy'
  | 'storm-argument'
  | 'healing-distance';

export interface HeartMemory {
  id: number;
  title: string;
  story: string;
  kind: MemoryKind;
  sceneVariant: MemorySceneVariant;
  x: number;
  y: number;
}

interface Point2D {
  x: number;
  y: number;
}

function evalHeartPoint(
  t: number,
  cx: number,
  cy: number,
  sx: number,
  sy: number
): Point2D {
  const sinT = Math.sin(t);
  const x = cx + sx * 16 * sinT * sinT * sinT;
  const y =
    cy -
    sy *
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t));
  return { x, y };
}

export function buildHeartSvgPath(
  cx: number,
  cy: number,
  sx: number,
  sy: number,
  steps = 160
): string {
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const pt = evalHeartPoint(t, cx, cy, sx, sy);
    const cmd = i === 0 ? 'M' : 'L';
    parts.push(`${cmd}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
  }
  return `${parts.join(' ')} Z`;
}

function sampleHeartByFractions(
  fractions: readonly number[],
  cx: number,
  cy: number,
  sx: number,
  sy: number
): Point2D[] {
  const denseSteps = 1200;
  const pts: Point2D[] = [];
  const cumLen: number[] = [0];

  for (let i = 0; i <= denseSteps; i++) {
    const t = (i / denseSteps) * Math.PI * 2;
    const p = evalHeartPoint(t, cx, cy, sx, sy);
    pts.push(p);
    if (i > 0) {
      const prev = pts[i - 1];
      const seg = Math.hypot(p.x - prev.x, p.y - prev.y);
      cumLen.push(cumLen[i - 1] + seg);
    }
  }

  const totalLen = cumLen[denseSteps];
  return fractions.map((frac) => {
    const target = frac * totalLen;
    let idx = 1;
    while (idx < denseSteps && cumLen[idx] < target) {
      idx += 1;
    }
    const prevLen = cumLen[idx - 1];
    const segLen = Math.max(0.0001, cumLen[idx] - prevLen);
    const alpha = (target - prevLen) / segLen;
    const a = pts[idx - 1];
    const b = pts[idx];
    return {
      x: Math.round(a.x + (b.x - a.x) * alpha),
      y: Math.round(a.y + (b.y - a.y) * alpha),
    };
  });
}

// Geometría exacta para viewBox="0 0 1200 780" con corazón central en (600, 438)
export const OUTER_HEART_PATH = buildHeartSvgPath(600, 392, 24.2, 18.8);
export const INNER_HEART_PATH = buildHeartSvgPath(600, 416, 14.2, 10.8);

const OUTER_FRACTIONS = Array.from({ length: 20 }, (_, i) => (i + 0.5) / 20);
const INNER_FRACTIONS = [0.1, 0.19, 0.28, 0.37, 0.46, 0.54, 0.63, 0.72, 0.81, 0.9];

const OUTER_COORDS = sampleHeartByFractions(OUTER_FRACTIONS, 600, 392, 24.2, 18.8);
const INNER_COORDS = sampleHeartByFractions(INNER_FRACTIONS, 600, 416, 14.2, 10.8);
const ALL_POINT_COORDS = [...OUTER_COORDS, ...INNER_COORDS];

interface RawHeartMemory {
  id: number;
  title: string;
  story: string;
  kind: MemoryKind;
  sceneVariant: MemorySceneVariant;
}

const RAW_HEART_MEMORIES: readonly RawHeartMemory[] = [
  {
    id: 1,
    title: 'La primera chispa',
    story:
      'Ese instante en que nuestras miradas se encontraron por primera vez y el mundo pareció bajar el volumen para dejarnos vernos.',
    kind: 'good',
    sceneVariant: 'walk-together',
  },
  {
    id: 2,
    title: 'Conversaciones interminables',
    story:
      'Nos despedíamos diciendo que ya era tarde y terminábamos hablando una hora más, buscando cualquier excusa para no colgar.',
    kind: 'good',
    sceneVariant: 'starlight-talk',
  },
  {
    id: 3,
    title: 'Tu risa contagiosa',
    story:
      'Descubrí que escuchar tu risa podía arreglar cualquier día pesado en cuestión de segundos.',
    kind: 'good',
    sceneVariant: 'playful-joy',
  },
  {
    id: 4,
    title: 'El primer 14 de agosto',
    story:
      'El día en que decidimos caminar juntos de verdad y empezar a escribir nuestra propia fecha en el calendario.',
    kind: 'good',
    sceneVariant: 'warm-embrace',
  },
  {
    id: 5,
    title: 'La primera diferencia',
    story:
      'Nos costó entendernos y el orgullo habló más fuerte que nosotros, pero aprendimos que escucharnos valía más que tener la razón.',
    kind: 'hard',
    sceneVariant: 'storm-argument',
  },
  {
    id: 6,
    title: 'Caminar sin prisa',
    story:
      'No hacía falta tener un gran plan; bastaba caminar lado a lado hablando de cualquier tontería para sentir paz.',
    kind: 'good',
    sceneVariant: 'walk-together',
  },
  {
    id: 7,
    title: 'Tomados de la mano',
    story:
      'Cuando entrelazas tus dedos con los míos, siento que no importa qué tan ruidoso esté afuera todo.',
    kind: 'good',
    sceneVariant: 'warm-embrace',
  },
  {
    id: 8,
    title: 'Noches bajo las estrellas',
    story:
      'Mirar el cielo contigo y hacer promesas sencillas que todavía hoy sigo queriendo cumplir una por una.',
    kind: 'good',
    sceneVariant: 'starlight-talk',
  },
  {
    id: 9,
    title: 'Días de silencio frío',
    story:
      'Hubo horas pesadas en que la distancia se sintió enorme, pero incluso en silencio seguía pensando en cuidarte.',
    kind: 'hard',
    sceneVariant: 'healing-distance',
  },
  {
    id: 10,
    title: 'El abrazo que todo lo calma',
    story:
      'Ese reencuentro en que no hizo falta explicar nada porque el abrazo dijo todo lo que las palabras no sabían.',
    kind: 'good',
    sceneVariant: 'warm-embrace',
  },
  {
    id: 11,
    title: 'Complicidad en cada mirada',
    story:
      'Basta una seña mínima entre los dos para reírnos de algo que solo tú y yo entendemos.',
    kind: 'good',
    sceneVariant: 'playful-joy',
  },
  {
    id: 12,
    title: 'Nuestra meta compartida',
    story:
      'Cada vez que imagino el futuro, tú apareces ahí con esa luz tuya que vuelve hogar cualquier lugar.',
    kind: 'good',
    sceneVariant: 'walk-together',
  },
  {
    id: 13,
    title: 'Palabras que dolieron',
    story:
      'Nos dijimos cosas desde el cansancio y la herida, pero ninguno dejó que la tormenta apagara lo que sentíamos.',
    kind: 'hard',
    sceneVariant: 'storm-argument',
  },
  {
    id: 14,
    title: 'Pequeños detalles tuyos',
    story:
      'Guardo en la memoria cada mensaje inesperado, cada gesto dulce y cada forma tuya de demostrar cariño.',
    kind: 'good',
    sceneVariant: 'starlight-talk',
  },
  {
    id: 15,
    title: 'Bailar sin música',
    story:
      'Momentos absurdos y felices en los que el tiempo se olvidó del reloj solo por vernos sonreír.',
    kind: 'good',
    sceneVariant: 'playful-joy',
  },
  {
    id: 16,
    title: 'Distancia que pesa',
    story:
      'Estar lejos cuando más queríamos vernos dolió mucho, pero demostró que lo nuestro no depende de estar cerca todo el tiempo.',
    kind: 'hard',
    sceneVariant: 'healing-distance',
  },
  {
    id: 17,
    title: 'Refugio en tus ojos',
    story:
      'Cuando el mundo se complica, mirarte sigue siendo el lugar más seguro que conozco.',
    kind: 'good',
    sceneVariant: 'warm-embrace',
  },
  {
    id: 18,
    title: 'Tardes que saben a paz',
    story:
      'Compartir silencios cómodos contigo es tan bonito como reírnos durante horas.',
    kind: 'good',
    sceneVariant: 'walk-together',
  },
  {
    id: 19,
    title: 'Cuando casi nos soltamos',
    story:
      'Pasamos por una prueba muy fuerte, pero al mirar atrás recordamos por qué valía la pena luchar por los dos.',
    kind: 'hard',
    sceneVariant: 'storm-argument',
  },
  {
    id: 20,
    title: 'Volver a elegirnos',
    story:
      'Después de la lluvia, entendimos que querernos también es elegirnos de nuevo con más paciencia y verdad.',
    kind: 'good',
    sceneVariant: 'warm-embrace',
  },
  {
    id: 21,
    title: 'Chistes solo nuestros',
    story:
      'Esa alegría liviana que nace cuando bajamos la guardia y simplemente disfrutamos ser nosotros.',
    kind: 'good',
    sceneVariant: 'playful-joy',
  },
  {
    id: 22,
    title: 'Extrañarnos con el alma',
    story:
      'Hubo noches largas en que faltaba tu abrazo, pero el hilo invisible entre nuestros corazones nunca dejó de brillar.',
    kind: 'hard',
    sceneVariant: 'healing-distance',
  },
  {
    id: 23,
    title: 'Tu forma de cuidar',
    story:
      'Me enamora cómo te preocupas por los detalles y haces sentir amado a quien está a tu lado.',
    kind: 'good',
    sceneVariant: 'starlight-talk',
  },
  {
    id: 24,
    title: 'Tormentas pasajeras',
    story:
      'Incluso cuando chocamos fuerte, en el fondo los dos sabíamos que nuestro lugar seguía siendo el mismo.',
    kind: 'hard',
    sceneVariant: 'storm-argument',
  },
  {
    id: 25,
    title: 'Paseos inolvidables',
    story:
      'Cada calle y cada tarde contigo termina convertida en un recuerdo que me hace sonreír semanas después.',
    kind: 'good',
    sceneVariant: 'walk-together',
  },
  {
    id: 26,
    title: 'Latidos que se entienden',
    story:
      'Aprender tu ritmo, tus gestos y lo que dices sin hablar ha sido el viaje más bonito de mi vida.',
    kind: 'good',
    sceneVariant: 'warm-embrace',
  },
  {
    id: 27,
    title: 'Aprender a perdonar',
    story:
      'Sanar heridas no siempre es fácil, pero contigo descubrí que el amor real sabe pedir perdón y empezar mejor.',
    kind: 'hard',
    sceneVariant: 'healing-distance',
  },
  {
    id: 28,
    title: 'Celebrar tus logros',
    story:
      'Verte brillar y cumplir lo que te propones me llena de orgullo como si cada paso tuyo también fuera mío.',
    kind: 'good',
    sceneVariant: 'playful-joy',
  },
  {
    id: 29,
    title: 'Resistencia en los días duros',
    story:
      'No todo fue perfecto, pero sobrevivimos a la distancia y a las peleas porque nuestro amor siempre pesó más.',
    kind: 'hard',
    sceneVariant: 'healing-distance',
  },
  {
    id: 30,
    title: 'Lo que sigue naciendo',
    story:
      'Hoy sigo descubriendo razones nuevas para quererte más fuerte que ayer y seguir construyendo este rincón contigo.',
    kind: 'good',
    sceneVariant: 'starlight-talk',
  },
];

/**
 * Los 30 recuerdos del Mapa del Corazón de Wendy, distribuidos por longitud de arco.
 */
export const HEART_MEMORIES: readonly HeartMemory[] = RAW_HEART_MEMORIES.map(
  (memory, index) => ({
    ...memory,
    x: ALL_POINT_COORDS[index].x,
    y: ALL_POINT_COORDS[index].y,
  })
);
