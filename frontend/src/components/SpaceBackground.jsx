import { useEffect, useRef } from "react";

/**
 * SpaceBackground
 * - Canvas twinkling starfield + nebula gradient + soft planets + shooting stars
 */
export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let stars = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 5200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        baseA: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.01,
        hue: Math.random() > 0.85 ? 320 : Math.random() > 0.6 ? 260 : 200,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of stars) {
        const a = s.baseA + Math.sin(t * s.speed + s.phase) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 90%, 90%, ${Math.max(0.1, Math.min(1, a))})`;
        ctx.shadowColor = `hsla(${s.hue}, 90%, 80%, 0.9)`;
        ctx.shadowBlur = s.r * 4;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="cosmic-bg" data-testid="cosmic-bg" />
      <canvas ref={canvasRef} className="stars-canvas" data-testid="stars-canvas" />
      <div className="cosmic-grain" />
      <div className="planet p1" data-testid="planet-1" />
      <div className="planet-ring" />
      <div className="planet p2" data-testid="planet-2" />
      <div className="planet p3" data-testid="planet-3" />
      <span className="shooting-star s1" />
      <span className="shooting-star s2" />
      <span className="shooting-star s3" />
    </>
  );
}
