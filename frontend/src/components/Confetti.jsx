import { useEffect, useRef } from "react";

/**
 * Confetti — one-shot pastel confetti burst from top edges.
 * Emits `count` particles and stops when all fall off-screen.
 */
export default function Confetti({ count = 220, duration = 4500 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "#ffc6de", "#f29bc1", "#ffd7b5", "#ffe6a8",
      "#d6f0c2", "#c8e5ff", "#e6c9ff", "#dcc2ff",
      "#ffd0e8", "#c6f0e2", "#b798e8", "#ffb3d9",
    ];

    const rand = (a, b) => Math.random() * (b - a) + a;
    const particles = [];
    for (let i = 0; i < count; i++) {
      const fromLeft = Math.random() < 0.5;
      particles.push({
        x: fromLeft ? rand(-40, 40) : rand(window.innerWidth - 40, window.innerWidth + 40),
        y: rand(-40, 10),
        vx: fromLeft ? rand(2, 7) : rand(-7, -2),
        vy: rand(2, 6),
        g: rand(0.08, 0.18),
        size: rand(6, 12),
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.2, 0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() < 0.55 ? "rect" : "circle",
        life: 1,
      });
    }

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (elapsed > duration - 1000) p.life = Math.max(0, 1 - (elapsed - (duration - 1000)) / 1000);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      data-testid="confetti-canvas"
    />
  );
}
