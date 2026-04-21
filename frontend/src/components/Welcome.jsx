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
    <div className="relative min-h-screen w-full overflow-x-hidden" data-testid="welcome-screen">
      <div className="welcome-sky" />

      {/* Soft sun / moon glow */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,236,246,0.9) 0%, rgba(255,214,236,0.35) 40%, transparent 70%)",
          filter: "blur(6px)",
          zIndex: 1,
        }}
      />

      {/* Flowers */}
      {mounted && <FlowerField density={300} />}

      {/* Confetti burst */}
      {mounted && <Confetti count={260} duration={5000} />}

      {/* Header */}
      <header className="relative z-[70] flex items-center justify-between gap-2 px-4 sm:px-10 py-4 sm:py-6">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
            <Heart size={16} className="text-pink-400" fill="#f9a8c7" />
          </div>
          <span className="hidden sm:inline font-body text-xs tracking-[0.3em] text-purple-900/70 uppercase">
            Jardín · Urvi
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur border border-white/70 hover:bg-white/80 transition px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-900/80 shadow-sm"
            data-testid="sound-toggle-button"
            aria-label={soundOn ? "Silenciar música" : "Activar música"}
          >
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="hidden xs:inline sm:inline">{soundOn ? "Música" : "Silencio"}</span>
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur border border-white/70 hover:bg-white/80 transition px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-900/80 shadow-sm"
            data-testid="logout-button"
          >
            <LogOut size={14} />
            <span className="hidden xs:inline sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-[70] px-5 sm:px-10 pt-4 sm:pt-10 pb-40 sm:pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-purple-500/80 bg-white/50 border border-white/60 backdrop-blur rounded-full px-3 py-1 fade-up">
            <Sparkles size={12} /> Florecimiento galáctico
          </div>
          <h1
            className="mt-4 sm:mt-5 font-display text-[44px] leading-[1.02] sm:text-7xl lg:text-8xl headline-gradient fade-up fade-up-delay-1"
            data-testid="welcome-title"
          >
            Bienvenida,
            <br />
            <span className="font-serif-italic italic">Urvi</span>.
          </h1>
          <blockquote className="mt-5 sm:mt-6 max-w-2xl fade-up fade-up-delay-2">
            <p className="text-base sm:text-2xl text-purple-900/80 font-serif-italic italic leading-snug">
              “Eres como un pequeño boulevard de esperanzas”{" "}
              <span className="not-italic font-body text-xs sm:text-base text-purple-900/60 align-baseline">
                (Boulevard, Flor M. Salvador, 2020, p. 182).
              </span>
            </p>
          </blockquote>
        </div>
      </main>

      {/* Footer — always above flowers with a soft backdrop on mobile */}
      <footer className="fixed bottom-0 left-0 right-0 z-[80] px-4 pb-4 pt-6 pointer-events-none">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/70 backdrop-blur-md border border-white/70 shadow-sm px-4 py-3 pointer-events-auto">
          <p className="text-center text-[12px] sm:text-sm tracking-wide text-purple-900/70 font-serif-italic italic leading-snug">
            Vamos al cine a ver{" "}
            <span className="not-italic font-display font-semibold text-purple-900/85">Boulevard</span>.
            Si no te gusto, al menos será una buena película.
          </p>
        </div>
      </footer>
    </div>
  );
}
