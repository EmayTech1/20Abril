# PRD — Login Cósmico · Urvi

## Problem Statement (verbatim)
> hola elabora un login con tematica espacial moderna colores actualizados
> usuario: urvi  contraseña: 20deabril
> al abril el login deben flores tulipanes, jazmines y lilas todas las flores colores pastel
> despues del login las flores deben florecer en gran cantidad todos los colores pasteles, varios muchos
> galaxia con planetas suaves algo espectacular

## User Choice Summary
- Hardcoded frontend auth (urvi / 20deabril)
- Post-login: pantalla "Bienvenida Urvi" con animación masiva de flores
- Fondo: galaxia con planetas suaves

## Architecture
- Frontend-only SPA (React 19 + React Router v7 + Tailwind + Shadcn UI + sonner)
- No backend/auth — credential check in `Login.jsx`; session flag in `sessionStorage` (`urvi_auth`)
- Protected route guard in `App.js`

## Files
- `src/App.js` — routes, auth helpers, Toaster
- `src/App.css` — cosmic bg, planets, shooting stars, glass card, bloom + sway + petalFall animations
- `src/index.css` — fonts (Playfair Display + Cormorant Garamond + Manrope), cosmic theme vars
- `src/components/Login.jsx` — glass cosmic login
- `src/components/Welcome.jsx` — pastel sky + headline + flower field
- `src/components/SpaceBackground.jsx` — canvas starfield + planets + shooting stars
- `src/components/FlowerField.jsx` — randomized cluster of ~85 flowers + floating petals
- `src/components/flowers/{Tulip,Jasmine,Lilac}.jsx` — SVG flowers

## Implemented (Dec 2025)
- [x] Modern cosmic login with galaxy, planets, ring, twinkling stars, shooting stars
- [x] Glass-morphism card with pink/lavender/sky gradient button
- [x] Username/password validation (urvi / 20deabril), error shake + toast
- [x] Success redirect to `/welcome`
- [x] Welcome screen with pastel sky, soft glow, massive bloom of tulips, jasmines, lilacs
- [x] ~85 randomized flowers in 3 depth layers, 8+ pastel palettes
- [x] Floating petals across screen
- [x] Logout button returns to login

## Backlog (P1/P2)
- Music/ambient sound on welcome
- Name personalization via URL param
- Confetti-on-login micro-interaction
- Optional backend auth via MongoDB if needed later

## Test Credentials
See `/app/memory/test_credentials.md`
