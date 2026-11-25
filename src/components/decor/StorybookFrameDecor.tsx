interface PetalSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  rotate: number;
  kind: 'petal' | 'sparkle';
}

const AMBIENT_PETALS: PetalSpec[] = [
  { id: 1, left: '12%', top: '24%', size: 15, color: '#E8A5B2', rotate: 18, kind: 'petal' },
  { id: 2, left: '28%', top: '14%', size: 12, color: '#F4C97A', rotate: -12, kind: 'sparkle' },
  { id: 3, left: '48%', top: '18%', size: 14, color: '#E8A5B2', rotate: 42, kind: 'petal' },
  { id: 4, left: '65%', top: '22%', size: 13, color: '#C85A6E', rotate: -28, kind: 'petal' },
  { id: 5, left: '84%', top: '34%', size: 12, color: '#F4C97A', rotate: 24, kind: 'sparkle' },
  { id: 6, left: '16%', top: '54%', size: 14, color: '#C85A6E', rotate: 30, kind: 'petal' },
  { id: 7, left: '36%', top: '42%', size: 11, color: '#F4C97A', rotate: -15, kind: 'sparkle' },
  { id: 8, left: '72%', top: '58%', size: 15, color: '#E8A5B2', rotate: -38, kind: 'petal' },
  { id: 9, left: '90%', top: '64%', size: 13, color: '#F4C97A', rotate: 14, kind: 'sparkle' },
  { id: 10, left: '24%', top: '76%', size: 12, color: '#F4C97A', rotate: 22, kind: 'sparkle' },
  { id: 11, left: '56%', top: '72%', size: 14, color: '#E8A5B2', rotate: -20, kind: 'petal' },
  { id: 12, left: '78%', top: '78%', size: 13, color: '#C85A6E', rotate: 35, kind: 'petal' },
  { id: 13, left: '8%', top: '72%', size: 11, color: '#F4C97A', rotate: -8, kind: 'sparkle' },
  { id: 14, left: '42%', top: '82%', size: 12, color: '#E8A5B2', rotate: 19, kind: 'petal' },
];

export function StorybookFrameDecor({ isNightMood }: { isNightMood: boolean }) {
  return (
    <div className="storybook-frame-decor" aria-hidden="true">
      {/* Top-Left Botanical Rose Arch & Hanging Warm Lanterns (top-right kept clear for Calendar) */}
      <svg className="frame-top-left-arch" viewBox="0 0 380 260" fill="none">
        {/* Climbing vine */}
        <path
          d="M-10 22 C85 38, 175 18, 285 16 C320 15, 348 8, 365 2"
          stroke="#5E7A56"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M-8 64 C55 92, 95 145, 58 210"
          stroke="#5E7A56"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Leaves */}
        <path d="M52 34 C38 14, 62 6, 72 28 Z" fill="#6E8D63" />
        <path d="M122 30 C138 12, 158 22, 138 38 Z" fill="#7D9E71" />
        <path d="M196 20 C212 4, 232 14, 214 28 Z" fill="#6E8D63" />
        <path d="M46 112 C22 104, 18 128, 42 132 Z" fill="#7D9E71" />
        <path d="M74 156 C96 150, 98 172, 74 176 Z" fill="#6E8D63" />

        {/* Hanging Warm Paper/Glass Lanterns */}
        <g transform="translate(106, 30)">
          <g data-anim="frame-lantern">
            <line x1="0" y1="0" x2="0" y2="38" stroke="#6E474F" strokeWidth="1.6" />
            <circle
              cx="0"
              cy="56"
              r={isNightMood ? 30 : 22}
              fill="#F4C97A"
              fillOpacity={isNightMood ? 0.42 : 0.24}
            />
            <rect x="-12" y="38" width="24" height="32" rx="9" fill="#FCE6B4" stroke="#C9963B" strokeWidth="2" />
            <line x1="-12" y1="48" x2="12" y2="48" stroke="#C9963B" strokeWidth="1.2" />
            <line x1="-12" y1="60" x2="12" y2="60" stroke="#C9963B" strokeWidth="1.2" />
          </g>
        </g>

        <g transform="translate(218, 20)">
          <g data-anim="frame-lantern">
            <line x1="0" y1="0" x2="0" y2="26" stroke="#6E474F" strokeWidth="1.5" />
            <circle
              cx="0"
              cy="40"
              r={isNightMood ? 24 : 18}
              fill="#F4C97A"
              fillOpacity={isNightMood ? 0.38 : 0.22}
            />
            <rect x="-9" y="26" width="18" height="25" rx="7" fill="#FAD2D9" stroke="#C85A6E" strokeWidth="1.8" />
          </g>
        </g>

        {/* Blooming Storybook Roses */}
        <g transform="translate(42, 42)">
          <circle cx="0" cy="0" r="18" fill="#C85A6E" />
          <circle cx="-5" cy="-4" r="10" fill="#E8A5B2" />
          <circle cx="4" cy="3" r="6" fill="#A33E53" />
        </g>
        <g transform="translate(160, 24)">
          <circle cx="0" cy="0" r="14" fill="#E8A5B2" />
          <circle cx="-3" cy="-2" r="7" fill="#FFFAF4" fillOpacity="0.6" />
          <circle cx="2" cy="2" r="4" fill="#C85A6E" />
        </g>
        <g transform="translate(66, 198)">
          <circle cx="0" cy="0" r="13" fill="#C85A6E" />
          <circle cx="0" cy="0" r="5" fill="#F4C97A" />
        </g>
      </svg>

      {/* Bottom-Left Wildflower & Rose Cluster */}
      <svg className="frame-bottom-left-garden" viewBox="0 0 340 240" fill="none">
        <path d="M-10 245 Q55 155 150 228" stroke="#587450" strokeWidth="5" strokeLinecap="round" />
        <path d="M22 245 Q88 120 112 185" stroke="#6E8D63" strokeWidth="4" strokeLinecap="round" />
        <path d="M0 190 Q78 160 195 245" stroke="#5E7A56" strokeWidth="3.5" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="48" cy="175" rx="18" ry="8" transform="rotate(-38 48 175)" fill="#6E8D63" />
        <ellipse cx="96" cy="168" rx="16" ry="7" transform="rotate(24 96 168)" fill="#7D9E71" />
        <ellipse cx="142" cy="204" rx="17" ry="7" transform="rotate(-14 142 204)" fill="#6E8D63" />
        {/* Roses & Gold Berries */}
        <circle cx="44" cy="196" r="22" fill="#C85A6E" />
        <circle cx="38" cy="192" r="11" fill="#E8A5B2" />
        <circle cx="46" cy="198" r="6" fill="#A33E53" />

        <circle cx="94" cy="192" r="17" fill="#E8A5B2" />
        <circle cx="94" cy="192" r="7" fill="#C85A6E" />

        <circle cx="150" cy="222" r="13" fill="#FFFAF4" stroke="#E8A5B2" strokeWidth="2" />
        <circle cx="150" cy="222" r="5" fill="#C9963B" />

        <circle cx="70" cy="144" r="5" fill="#F4C97A" />
        <circle cx="122" cy="172" r="4.5" fill="#F4C97A" />
      </svg>

      {/* Bottom-Right Wildflower & Rose Cluster */}
      <svg className="frame-bottom-right-garden" viewBox="0 0 340 240" fill="none">
        <path d="M350 245 Q285 155 190 228" stroke="#587450" strokeWidth="5" strokeLinecap="round" />
        <path d="M318 245 Q252 120 228 185" stroke="#6E8D63" strokeWidth="4" strokeLinecap="round" />
        <path d="M340 190 Q262 160 145 245" stroke="#5E7A56" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="292" cy="175" rx="18" ry="8" transform="rotate(38 292 175)" fill="#6E8D63" />
        <ellipse cx="244" cy="168" rx="16" ry="7" transform="rotate(-24 244 168)" fill="#7D9E71" />
        <ellipse cx="198" cy="204" rx="17" ry="7" transform="rotate(14 198 204)" fill="#6E8D63" />

        <circle cx="296" cy="196" r="22" fill="#C85A6E" />
        <circle cx="302" cy="192" r="11" fill="#E8A5B2" />
        <circle cx="294" cy="198" r="6" fill="#A33E53" />

        <circle cx="246" cy="192" r="17" fill="#E8A5B2" />
        <circle cx="246" cy="192" r="7" fill="#C85A6E" />

        <circle cx="190" cy="222" r="13" fill="#FFFAF4" stroke="#E8A5B2" strokeWidth="2" />
        <circle cx="190" cy="222" r="5" fill="#C9963B" />

        <circle cx="270" cy="144" r="5" fill="#F4C97A" />
        <circle cx="218" cy="172" r="4.5" fill="#F4C97A" />
      </svg>

      {/* Full-Screen Drifting Rose Petals & Golden Fireflies */}
      {AMBIENT_PETALS.map((item) => (
        <svg
          key={item.id}
          data-anim="ambient-petal"
          className="ambient-petal"
          width={item.size}
          height={item.size}
          viewBox="0 0 24 24"
          style={{
            left: item.left,
            top: item.top,
            transform: `rotate(${item.rotate}deg)`,
          }}
        >
          {item.kind === 'petal' ? (
            <path
              d="M12 2 C17 6, 19 13, 12 21 C5 13, 7 6, 12 2 Z"
              fill={item.color}
              fillOpacity={isNightMood ? 0.45 : 0.72}
            />
          ) : (
            <path
              d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z"
              fill={item.color}
              fillOpacity={isNightMood ? 0.85 : 0.65}
            />
          )}
        </svg>
      ))}
    </div>
  );
}
