/**
 * Pastel jasmine cluster — 5-petal star flowers with yellow center.
 */
export default function Jasmine({ color = "#fffdf4", accent = "#fff1c7", stem = "#b7d9a4", size = 110 }) {
  const Petal = ({ angle }) => (
    <ellipse
      cx="50"
      cy="30"
      rx="10"
      ry="18"
      fill={color}
      stroke={accent}
      strokeWidth="1"
      transform={`rotate(${angle} 50 50)`}
    />
  );

  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 100 110"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M50 55 C 48 75, 52 90, 50 108" stroke={stem} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M50 85 C 38 85, 30 94, 32 104 C 44 102, 50 96, 52 88 Z" fill={stem} opacity="0.9" />

      {/* 5 petals */}
      {[0, 72, 144, 216, 288].map((a) => (
        <Petal key={a} angle={a} />
      ))}

      {/* Center */}
      <circle cx="50" cy="50" r="7" fill="#ffd77a" />
      <circle cx="50" cy="50" r="3.5" fill="#f3a94a" />

      {/* Tiny bud */}
      <circle cx="68" cy="28" r="4" fill={color} stroke={accent} />
      <circle cx="32" cy="72" r="3" fill={color} stroke={accent} />
    </svg>
  );
}
