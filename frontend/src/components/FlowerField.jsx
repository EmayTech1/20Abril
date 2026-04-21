import { useMemo } from "react";
import Tulip from "@/components/flowers/Tulip";
import Jasmine from "@/components/flowers/Jasmine";
import Lilac from "@/components/flowers/Lilac";

// Pastel palettes (color, accent)
const TULIP_PALETTE = [
  ["#ffc6de", "#f29bc1"], // pink
  ["#ffd7b5", "#f5ad85"], // peach
  ["#ffe6a8", "#f5c874"], // butter
  ["#d6f0c2", "#a6cf90"], // mint
  ["#c8e5ff", "#95bfe8"], // sky
  ["#e6c9ff", "#b48ae0"], // lavender
  ["#ffd0e8", "#e88fb8"], // rose
  ["#c6f0e2", "#8dd1bd"], // aqua mint
];

const JASMINE_PALETTE = [
  ["#fffdf4", "#fff1c7"],
  ["#fff8f0", "#ffe4c7"],
  ["#fdf6ff", "#ecd6ff"],
];

const LILAC_PALETTE = [
  ["#dcc2ff", "#b798e8"],
  ["#c7b8ff", "#9f8ad6"],
  ["#f0c2e6", "#cf8fc2"],
  ["#bed8ff", "#90b2e0"],
  ["#e0c2ff", "#b18ad8"],
];

const STEMS = ["#b7d9a4", "#9ecb88", "#a9c99a", "#c2dbaa"];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * FlowerField — massive bloom of pastel tulips, jasmines and lilacs.
 * Positions + colors are generated once per mount.
 * Props:
 *  - density: approximate flower count (default 70)
 */
export default function FlowerField({ density = 80 }) {
  const flowers = useMemo(() => {
    const list = [];
    // Each layer is a row-band with evenly spaced columns + tiny jitter,
    // so the meadow reads symmetric but still organic.
    const layers = [
      // [yMin, yMax, sizeMin, sizeMax, cols, rows, jitterX, jitterY, delayMax, opacity]
      { yMin: 14, yMax: 36, sizeMin: 28, sizeMax: 52, cols: 18, rows: 2, jx: 1.8, jy: 2.5, delayMax: 700, opacity: 0.8 },
      { yMin: 36, yMax: 58, sizeMin: 48, sizeMax: 80, cols: 15, rows: 2, jx: 2.0, jy: 2.5, delayMax: 1000, opacity: 0.92 },
      { yMin: 58, yMax: 78, sizeMin: 62, sizeMax: 108, cols: 13, rows: 2, jx: 2.2, jy: 2.8, delayMax: 1200, opacity: 0.96 },
      { yMin: 76, yMax: 94, sizeMin: 78, sizeMax: 138, cols: 11, rows: 2, jx: 2.5, jy: 3, delayMax: 1500, opacity: 1 },
      { yMin: 90, yMax: 108, sizeMin: 115, sizeMax: 185, cols: 9, rows: 2, jx: 2.8, jy: 3, delayMax: 1900, opacity: 1 },
    ];

    let id = 0;
    for (const layer of layers) {
      const rowHeight = (layer.yMax - layer.yMin) / layer.rows;
      for (let r = 0; r < layer.rows; r++) {
        // alternate stagger per row so columns interleave — more natural symmetry
        const stagger = r % 2 === 0 ? 0 : 100 / layer.cols / 2;
        for (let c = 0; c < layer.cols; c++) {
          const baseLeft = (c + 0.5) * (100 / layer.cols) + stagger;
          const baseTop = layer.yMin + (r + 0.5) * rowHeight;
          const typeRand = Math.random();
          const kind = typeRand < 0.5 ? "tulip" : typeRand < 0.78 ? "lilac" : "jasmine";
          let color, accent;
          if (kind === "tulip") {
            [color, accent] = TULIP_PALETTE[Math.floor(Math.random() * TULIP_PALETTE.length)];
          } else if (kind === "lilac") {
            [color, accent] = LILAC_PALETTE[Math.floor(Math.random() * LILAC_PALETTE.length)];
          } else {
            [color, accent] = JASMINE_PALETTE[Math.floor(Math.random() * JASMINE_PALETTE.length)];
          }
          list.push({
            id: id++,
            kind,
            color,
            accent,
            stem: STEMS[Math.floor(Math.random() * STEMS.length)],
            left: baseLeft + rand(-layer.jx, layer.jx),
            top: baseTop + rand(-layer.jy, layer.jy),
            size: rand(layer.sizeMin, layer.sizeMax),
            delay: rand(0, layer.delayMax),
            swayDur: rand(4, 8),
            rotate: rand(-5, 5),
            opacity: layer.opacity,
            z: Math.floor(layer.sizeMin),
          });
        }
      }
    }
    // sort by top so lower flowers render on top
    list.sort((a, b) => a.top - b.top);
    return list;
  }, [density]);

  const petals = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: rand(0, 100),
      size: rand(12, 22),
      dur: rand(9, 18),
      delay: rand(0, 10),
      color: [
        "#ffc6de",
        "#e6c9ff",
        "#ffd7b5",
        "#c8e5ff",
        "#d6f0c2",
        "#ffe6a8",
        "#dcc2ff",
      ][Math.floor(Math.random() * 7)],
    }));
  }, []);

  return (
    <>
      {/* Floating petals */}
      <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
        {petals.map((p) => (
          <svg
            key={p.id}
            className="petal-float"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2 C 18 6, 20 14, 12 22 C 4 14, 6 6, 12 2 Z"
              fill={p.color}
              opacity="0.9"
            />
          </svg>
        ))}
      </div>

      {/* Flower field */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        data-testid="flower-field"
        aria-hidden="true"
      >
        {flowers.map((f) => {
          const Comp = f.kind === "tulip" ? Tulip : f.kind === "jasmine" ? Jasmine : Lilac;
          return (
            <div
              key={f.id}
              className="flower"
              style={{
                left: `${f.left}%`,
                top: `${f.top}%`,
                animationDelay: `${f.delay}ms, ${f.delay + 1200}ms`,
                animationDuration: `1200ms, ${f.swayDur}s`,
                opacity: f.opacity,
                zIndex: f.z,
                transform: `rotate(${f.rotate}deg)`,
              }}
              data-testid={`flower-${f.kind}-${f.id}`}
            >
              <Comp color={f.color} accent={f.accent} stem={f.stem} size={f.size} />
            </div>
          );
        })}
      </div>
    </>
  );
}
