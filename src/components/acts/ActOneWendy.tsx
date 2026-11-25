import { HER_NAME } from '../../config/storyConfig';

interface FloatingHeartSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  rotate: number;
  opacity: number;
  outline?: boolean;
}

const FLOATING_HEARTS: FloatingHeartSpec[] = [
  { id: 1, left: '6%', top: '28%', size: 30, color: '#C85A6E', rotate: -14, opacity: 0.82 },
  { id: 2, left: '14%', top: '44%', size: 22, color: '#E8A5B2', rotate: 12, opacity: 0.78 },
  { id: 3, left: '10%', top: '64%', size: 38, color: '#C85A6E', rotate: -10, opacity: 0.86 },
  { id: 4, left: '20%', top: '20%', size: 20, color: '#C9963B', rotate: 16, opacity: 0.76, outline: true },
  { id: 5, left: '24%', top: '74%', size: 28, color: '#E8A5B2', rotate: 18, opacity: 0.8 },
  { id: 6, left: '30%', top: '34%', size: 18, color: '#C9963B', rotate: -8, opacity: 0.72 },
  { id: 7, left: '34%', top: '14%', size: 24, color: '#C85A6E', rotate: 14, opacity: 0.7 },
  { id: 8, left: '38%', top: '80%', size: 26, color: '#C9963B', rotate: -15, opacity: 0.76, outline: true },
  { id: 9, left: '46%', top: '12%', size: 19, color: '#E8A5B2', rotate: -6, opacity: 0.72 },
  { id: 10, left: '54%', top: '84%', size: 28, color: '#C85A6E', rotate: 12, opacity: 0.82 },
  { id: 11, left: '62%', top: '15%', size: 24, color: '#C9963B', rotate: -12, opacity: 0.76 },
  { id: 12, left: '68%', top: '76%', size: 22, color: '#E8A5B2', rotate: -14, opacity: 0.78, outline: true },
  { id: 13, left: '72%', top: '26%', size: 32, color: '#E8A5B2', rotate: 15, opacity: 0.84 },
  { id: 14, left: '78%', top: '62%', size: 36, color: '#C85A6E', rotate: 10, opacity: 0.86 },
  { id: 15, left: '84%', top: '20%', size: 26, color: '#C85A6E', rotate: 18, opacity: 0.78 },
  { id: 16, left: '88%', top: '44%', size: 24, color: '#C9963B', rotate: -16, opacity: 0.78 },
  { id: 17, left: '92%', top: '68%', size: 30, color: '#E8A5B2', rotate: -9, opacity: 0.82 },
  { id: 18, left: '16%', top: '56%', size: 16, color: '#C9963B', rotate: 20, opacity: 0.7 },
  { id: 19, left: '82%', top: '52%', size: 18, color: '#E8A5B2', rotate: -18, opacity: 0.74 },
  { id: 20, left: '44%', top: '73%', size: 20, color: '#C85A6E', rotate: 8, opacity: 0.72 },
  { id: 21, left: '58%', top: '24%', size: 17, color: '#C85A6E', rotate: -11, opacity: 0.68, outline: true },
  { id: 22, left: '26%', top: '60%', size: 21, color: '#C85A6E', rotate: 11, opacity: 0.72 },
  { id: 23, left: '74%', top: '40%', size: 20, color: '#C9963B', rotate: 13, opacity: 0.74 },
  { id: 24, left: '50%', top: '22%', size: 15, color: '#C9963B', rotate: 5, opacity: 0.7 },
];

export function ActOneWendy() {
  return (
    <section
      className="act-layer act-wendy"
      data-anim="act-wendy"
      aria-label="Inicio: Wendy"
    >
      <div className="wendy-sunbeam-halo" aria-hidden="true" />

      <div className="wendy-hearts-field" aria-hidden="true">
        {FLOATING_HEARTS.map((heart) => (
          <svg
            key={heart.id}
            data-anim="wendy-heart"
            className="wendy-heart-item"
            viewBox="0 0 40 38"
            width={heart.size}
            height={heart.size}
            style={{
              left: heart.left,
              top: heart.top,
              transform: `rotate(${heart.rotate}deg)`,
              opacity: heart.opacity,
            }}
          >
            <path
              d="M20 34.5C20 34.5 4.5 24.4 4.5 13.4C4.5 7.9 8.7 4 13.8 4C16.9 4 19 5.6 20 8.1C21 5.6 23.1 4 26.2 4C31.3 4 35.5 7.9 35.5 13.4C35.5 24.4 20 34.5 20 34.5Z"
              fill={heart.outline ? 'none' : heart.color}
              stroke={heart.outline ? heart.color : '#3B2328'}
              strokeOpacity={heart.outline ? 0.85 : 0.14}
              strokeWidth={heart.outline ? 2.2 : 1.1}
            />
            {!heart.outline && (
              <path
                d="M11.2 10.2C12.3 8.9 13.9 8.4 15.4 8.7"
                fill="none"
                stroke="#FFFAF4"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeOpacity="0.68"
              />
            )}
          </svg>
        ))}
      </div>

      <div className="wendy-title-wrap">
        <h1 className="wendy-title" data-anim="wendy-title">
          {HER_NAME}
        </h1>

        <svg
          className="wendy-flourish"
          viewBox="0 0 340 36"
          aria-hidden="true"
        >
          <path
            data-anim="wendy-flourish-path"
            d="M18 20 C76 30, 124 8, 170 20 C216 32, 264 10, 322 18"
            fill="none"
            stroke="#C9963B"
            strokeWidth="2.4"
            strokeLinecap="round"
            pathLength={1}
          />
          <path
            d="M78 24 C70 15, 82 10, 86 21 Z"
            fill="#7D9E71"
            opacity="0.85"
          />
          <path
            d="M262 21 C270 12, 258 8, 254 19 Z"
            fill="#7D9E71"
            opacity="0.85"
          />
          <path
            data-anim="wendy-flourish-heart"
            d="M170 29 C170 29 159 21.5 159 14.8 C159 11.4 161.7 9 164.9 9 C167 9 168.8 10.2 170 12.1 C171.2 10.2 173 9 175.1 9 C178.3 9 181 11.4 181 14.8 C181 21.5 170 29 170 29Z"
            fill="#C85A6E"
          />
        </svg>

        <p className="wendy-subtitle" data-anim="wendy-subtitle">
          Un rincón dibujado para guardar cada instante contigo.
        </p>
      </div>
    </section>
  );
}
