/**
 * Hero illustration — original hand-crafted SVG. A stylised isometric vignette
 * of an HVAC mechanical room: chiller on the left, air handling unit in the
 * middle, ductwork riser on the right, on a soft blueprint grid. Pure SVG,
 * no external image generation, no CDN, ships in the bundle.
 */
export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle blueprint grid pattern */}
        <pattern
          id="grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="chillerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="ahuGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="ductGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="320" fill="url(#bgGrad)" />
      <rect width="480" height="320" fill="url(#grid)" />

      {/* Floating airflow lines (decorative) */}
      <g stroke="rgba(34,211,238,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="4 4">
        <path d="M 30 60 Q 130 50 220 100" />
        <path d="M 60 280 Q 200 270 330 220" />
      </g>

      {/* ===== CHILLER (left) ===== */}
      <g transform="translate(70 150)">
        {/* Main body — isometric block */}
        <polygon points="0,40 60,10 110,40 110,110 60,140 0,110" fill="url(#chillerGrad)" />
        {/* Top face */}
        <polygon points="0,40 60,10 110,40 60,70" fill="#67e8f9" />
        {/* Right shadow face */}
        <polygon points="110,40 110,110 60,140 60,70" fill="#0e7490" />
        {/* Vent slats */}
        <g stroke="rgba(15,23,42,0.4)" strokeWidth="2">
          <line x1="10" y1="85" x2="55" y2="62" />
          <line x1="10" y1="95" x2="55" y2="72" />
          <line x1="10" y1="105" x2="55" y2="82" />
        </g>
        {/* Pressure gauge — orange dot */}
        <circle cx="85" cy="95" r="6" fill="url(#orangeGrad)" />
        <circle cx="85" cy="95" r="3" fill="#fff" opacity="0.9" />
        {/* Refrigerant pipe rising out the top */}
        <rect x="58" y="-20" width="8" height="35" fill="#cffafe" rx="2" />
        <rect x="58" y="-20" width="8" height="35" fill="url(#chillerGrad)" opacity="0.4" rx="2" />
      </g>

      {/* ===== AIR HANDLING UNIT (centre) ===== */}
      <g transform="translate(190 140)">
        {/* Main body */}
        <rect x="0" y="20" width="120" height="100" rx="6" fill="url(#ahuGrad)" />
        {/* Top depth slab */}
        <polygon points="0,20 20,5 140,5 120,20" fill="#a5f3fc" />
        {/* Right depth slab */}
        <polygon points="120,20 140,5 140,105 120,120" fill="#0891b2" />
        {/* Filter section (mesh) */}
        <rect x="10" y="35" width="32" height="70" fill="#0e7490" />
        <g stroke="rgba(255,255,255,0.5)" strokeWidth="1">
          {[42, 49, 56, 63, 70, 77, 84, 91, 98].map((y) => (
            <line key={y} x1="12" y1={y} x2="40" y2={y} />
          ))}
        </g>
        {/* Cooling coil */}
        <rect x="52" y="35" width="20" height="70" fill="#67e8f9" />
        <g stroke="#0891b2" strokeWidth="2" fill="none">
          {[40, 50, 60, 70, 80, 90, 100].map((y) => (
            <path key={y} d={`M 54 ${y} q 8 ${y > 70 ? -4 : 4} 16 0`} />
          ))}
        </g>
        {/* Fan disc */}
        <circle cx="92" cy="70" r="18" fill="#0e7490" />
        <circle cx="92" cy="70" r="14" fill="none" stroke="#22d3ee" strokeWidth="2" />
        {/* Fan blades */}
        <g transform="translate(92 70)" fill="#22d3ee">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-9"
              rx="3"
              ry="7"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="3" fill="#cffafe" />
        </g>
      </g>

      {/* ===== DUCTWORK RISER (right) ===== */}
      <g transform="translate(330 60)">
        {/* Vertical duct */}
        <rect x="0" y="0" width="40" height="160" fill="url(#ductGrad)" />
        {/* Top depth */}
        <polygon points="0,0 20,-12 60,-12 40,0" fill="#cbd5e1" />
        {/* Right depth */}
        <polygon points="40,0 60,-12 60,148 40,160" fill="#334155" />
        {/* Joining flanges */}
        <g fill="#1e293b">
          <rect x="-2" y="60" width="44" height="5" />
          <rect x="-2" y="100" width="44" height="5" />
        </g>
        {/* Horizontal branch (with diffuser) */}
        <rect x="40" y="115" width="70" height="22" fill="url(#ductGrad)" />
        <polygon points="40,115 50,107 120,107 110,115" fill="#cbd5e1" />
        <polygon points="110,115 120,107 120,129 110,137" fill="#334155" />
        {/* Diffuser grille at the end */}
        <rect x="108" y="111" width="6" height="30" fill="#0f172a" />
        <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
          <line x1="110" y1="118" x2="110" y2="134" />
          <line x1="112" y1="115" x2="112" y2="137" />
        </g>
      </g>

      {/* ===== AIRFLOW arrows (warm orange — Ghana accent) ===== */}
      <g fill="url(#orangeGrad)">
        {/* Arrow from AHU into ductwork */}
        <path d="M 312 178 l 14 -4 l -3 8 l -10 0 z" opacity="0.9" />
        <path d="M 322 178 l 14 -4 l -3 8 l -10 0 z" opacity="0.6" />
      </g>

      {/* Floor reflection / base shadow */}
      <ellipse cx="240" cy="290" rx="200" ry="14" fill="rgba(0,0,0,0.35)" />
    </svg>
  );
}
