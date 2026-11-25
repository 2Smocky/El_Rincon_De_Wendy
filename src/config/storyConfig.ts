/**
 * Configuración principal de "El Rincón de Wendy".
 * Puedes editar aquí el nombre y la fecha en que comenzó su historia.
 * La contraseña secreta se valida directamente en Cloud Firestore.
 */

export const HER_NAME = 'Wendy';

/**
 * Fecha y hora de inicio de su relación (formato ISO local).
 * 14 de agosto de 2024
 */
export const LOVE_START_DATE = '2024-08-14T00:00:00';

export const NARRATIVE_CAPTIONS = {
  meet: 'Todo empezó con una mirada tímida y dos caminos que por fin se cruzaron.',
  talk: 'Las primeras charlas se volvieron horas, y sin darnos cuenta ya éramos nuestro lugar favorito.',
  love: 'Nos enamoramos con el alma. Entre risas, abrazos y días felices, construimos nuestro propio mundo.',
  fight: 'También llegaron los días grises, el orgullo y las tormentas que nos dolieron a los dos.',
  distance:
    'La distancia nos puso lejos, sí... pero ni el silencio más frío pudo romper todo el amor que nos sigue uniendo.',
} as const;
