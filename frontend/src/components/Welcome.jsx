import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Heart, Sparkles, Volume2, VolumeX } from "lucide-react";
import FlowerField from "@/components/FlowerField";
import Confetti from "@/components/Confetti";
import AmbientAudio from "@/components/ambientAudio";
import { setAuthed } from "@/App";

export default function Welcome() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new AmbientAudio();
    // Attempt autoplay; browsers may silently block until user gesture.
    try {
      audioRef.current.start();
      setSoundOn(true);
    } catch (e) {
      setSoundOn(false);
    }
    return () => audioRef.current?.stop();
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.stop();
      setSoundOn(false);
    } else {
      audioRef.current = new AmbientAudio();
      audioRef.current.start();
      setSoundOn(true);
    }
  };

  const logout = () => {
    audioRef.current?.stop();
    setAuthed(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" data-testid="welcome-screen">
      <div className="welcome-sky" />

      {/* Soft sun / moon glow */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,236,246,0.9) 0%, rgba(255,214,236,0.35) 40%, transparent 70%)",
          filter: "blur(6px)",
          zIndex: 1,
        }}
      />

      {/* Flowers — abundant bloom */}
      {mounted && <FlowerField density={170} />}

      {/* Confetti burst */}
      {mounted && <Confetti count={260} duration={5000} />}

      {/* Header */}
      <header className="relative z-[70] flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
            <Heart size={16} className="text-pink-400" fill="#f9a8c7" />
          </div>
          <span className="font-body text-xs tracking-[0.3em] text-purple-900/70 uppercase">
            Jardín · Urvi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="group inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur border border-white/70 hover:bg-white/80 transition px-4 py-2 text-sm text-purple-900/80 shadow-sm"
            data-testid="sound-toggle-button"
            aria-label={soundOn ? "Silenciar música" : "Activar música"}
          >
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundOn ? "Música" : "Silencio"}
          </button>
          <button
            onClick={logout}
            className="group inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur border border-white/70 hover:bg-white/80 transition px-4 py-2 text-sm text-purple-900/80 shadow-sm"
            data-testid="logout-button"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-[70] px-6 sm:px-10 pt-6 sm:pt-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-purple-500/80 bg-white/50 border border-white/60 backdrop-blur rounded-full px-3 py-1 fade-up">
            <Sparkles size={12} /> Florecimiento galáctico
          </div>
          <h1
            className="mt-5 font-display text-5xl sm:text-7xl lg:text-8xl leading-[1.02] headline-gradient fade-up fade-up-delay-1"
            data-testid="welcome-title"
          >
            Bienvenida,
            <br />
            <span className="font-serif-italic italic">Urvi</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg sm:text-2xl text-purple-900/75 font-serif-italic italic fade-up fade-up-delay-2">
            Vamos al cine a ver <span className="not-italic font-display font-semibold text-purple-900/85">Boulevard</span>. Si no te gusto, al menos será una buena película.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 fade-up fade-up-delay-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-white/70 backdrop-blur px-4 py-2 text-xs tracking-wider uppercase text-purple-900/70">
              <span className="h-2 w-2 rounded-full bg-pink-300" /> tulipán
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-white/70 backdrop-blur px-4 py-2 text-xs tracking-wider uppercase text-purple-900/70">
              <span className="h-2 w-2 rounded-full bg-amber-200" /> jazmín
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-white/70 backdrop-blur px-4 py-2 text-xs tracking-wider uppercase text-purple-900/70">
              <span className="h-2 w-2 rounded-full bg-purple-300" /> lila
            </span>
          </div>
        </div>
      </main>

      <footer className="relative z-[70] fixed bottom-6 left-0 right-0 flex justify-center px-4">
        <p className="text-center max-w-2xl text-[13px] sm:text-base tracking-wide text-purple-900/60 font-serif-italic italic">
          ✦ Eres como un pequeño boulevard de esperanzas ✦
        </p>
      </footer>
    </div>
  );
}
