/**
 * Pastel tulip SVG. Accepts color (main), accent (deeper), stem (green).
 */
export default function Tulip({ color = "#ffc6de", accent = "#f29bc1", stem = "#b7d9a4", size = 90 }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`tg-${color.replace("#", "")}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={accent} />
        </radialGradient>
      </defs>
      {/* Stem */}
      <path
        d="M50 55 C 48 80, 52 100, 50 135"
        stroke={stem}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaf */}
      <path
        d="M50 95 C 30 95, 18 108, 22 122 C 38 118, 48 108, 50 98 Z"
        fill={stem}
        opacity="0.95"
      />
      {/* Back petal */}
      <path
        d="M28 55 C 28 22, 50 5, 72 55 Z"
        fill={accent}
        opacity="0.9"
      />
      {/* Front left petal */}
      <path
        d="M28 55 C 30 28, 48 16, 50 55 Z"
        fill={`url(#tg-${color.replace("#", "")})`}
      />
      {/* Front right petal */}
      <path
        d="M50 55 C 52 18, 70 28, 72 55 Z"
        fill={`url(#tg-${color.replace("#", "")})`}
      />
      {/* Center petal highlight */}
      <path
        d="M40 55 C 44 24, 56 24, 60 55 Z"
        fill={color}
        opacity="0.9"
      />
      {/* Shine */}
      <ellipse cx="45" cy="35" rx="4" ry="9" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}
