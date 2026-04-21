import { useEffect, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Sparkles, Lock, User2, Rocket, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SpaceBackground from "@/components/SpaceBackground";
import { isAuthed, setAuthed } from "@/App";

const VALID_USER = "urvi";
const VALID_PASS = "20deabril";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  if (isAuthed()) return <Navigate to="/welcome" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const u = username.trim().toLowerCase();
      const p = password.trim();
      if (u === VALID_USER && p === VALID_PASS) {
        setAuthed(true);
        toast.success("Acceso concedido, preparando la galaxia...");
        setTimeout(() => navigate("/welcome"), 500);
      } else {
        setLoading(false);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        toast.error("Credenciales incorrectas", {
          description: "Revisa tu usuario y contraseña.",
        });
      }
    }, 650);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SpaceBackground />

      {/* Content */}
      <div className="relative z-30 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-6 fade-up">
            <div className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
              <Rocket className="h-4.5 w-4.5" size={18} color="#f7c8e5" />
            </div>
            <span className="font-body text-sm tracking-[0.3em] text-white/70 uppercase">
              Cosmos · Urvi
            </span>
          </div>

          {/* Card */}
          <div
            className={`relative glass-card rounded-[1.75rem] p-8 sm:p-10 fade-up fade-up-delay-1 ${shake ? "animate-[shake_0.45s_ease]" : ""}`}
            data-testid="login-card"
          >
            <span className="glow-ring rounded-[1.75rem]" />

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-pink-200/80 mb-3">
                <Sparkles size={14} /> Portal estelar
              </div>
              <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white">
                Inicia tu <span className="font-serif-italic italic text-pink-200">viaje</span>
                <br />
                entre estrellas.
              </h1>
              <p className="mt-3 text-sm text-white/60 max-w-sm">
                Accede para que el universo florezca sólo para ti.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5" data-testid="login-form">
              {/* Username */}
              <label className="block">
                <span className="text-xs font-medium tracking-wider uppercase text-white/55">
                  Usuario
                </span>
                <div className="relative mt-2">
                  <User2
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                  />
                  <input
                    ref={userRef}
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="tu nombre cósmico"
                    className="cosmic-input w-full h-12 rounded-xl pl-11 pr-4 text-[15px]"
                    data-testid="login-username-input"
                    required
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block">
                <span className="text-xs font-medium tracking-wider uppercase text-white/55">
                  Contraseña
                </span>
                <div className="relative mt-2">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"
                  />
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="clave secreta"
                    className="cosmic-input w-full h-12 rounded-xl pl-11 pr-4 text-[15px]"
                    data-testid="login-password-input"
                    required
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn-cosmic w-full h-12 text-[15px] flex items-center justify-center gap-2"
                data-testid="login-submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Despegando...
                  </>
                ) : (
                  <>
                    Ingresar al universo
                    <Sparkles size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-5 text-center text-xs text-white/40 fade-up fade-up-delay-3">
            Un pequeño jardín te espera al otro lado ✦
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-2px) }
          20%, 80% { transform: translateX(4px) }
          30%, 50%, 70% { transform: translateX(-6px) }
          40%, 60% { transform: translateX(6px) }
        }
      `}</style>
    </div>
  );
}
