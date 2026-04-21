/**
 * Pastel lilac — cluster of tiny 4-petal flowers forming a panicle.
 */
export default function Lilac({ color = "#d8bfff", accent = "#b798e8", stem = "#a9c99a", size = 110 }) {
  const Floret = ({ cx, cy, s = 1 }) => (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <circle r="4.5" fill={accent} opacity="0.9" />
      <circle cx="0" cy="-5" r="3.2" fill={color} />
      <circle cx="5" cy="0" r="3.2" fill={color} />
      <circle cx="0" cy="5" r="3.2" fill={color} />
      <circle cx="-5" cy="0" r="3.2" fill={color} />
      <circle r="1.6" fill="#fff8dc" />
    </g>
  );

  // panicle cluster positions
  const florets = [
    [50, 18, 1.1], [40, 25, 0.95], [60, 25, 0.95],
    [34, 36, 1], [50, 34, 1.05], [66, 36, 1],
    [30, 48, 0.95], [44, 48, 1], [56, 48, 1], [70, 48, 0.95],
    [36, 60, 0.9], [50, 60, 1], [64, 60, 0.9],
    [42, 72, 0.85], [58, 72, 0.85], [50, 80, 0.8],
  ];

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 100 130"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M50 80 C 48 100, 52 115, 50 128" stroke={stem} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Leaves */}
      <path d="M50 105 C 30 100, 20 115, 28 125 C 42 122, 50 115, 52 106 Z" fill={stem} opacity="0.9" />
      <path d="M50 95 C 70 92, 80 105, 72 115 C 58 112, 52 105, 50 96 Z" fill={stem} opacity="0.85" />

      {florets.map(([x, y, s], i) => (
        <Floret key={i} cx={x} cy={y} s={s} />
      ))}
    </svg>
  );
}
