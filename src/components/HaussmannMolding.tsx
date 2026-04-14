/**
 * Haussmannian-inspired ceiling molding / relief ornament.
 * Renders an SVG border frame with classical rosettes, scrollwork
 * and corner cartouches reminiscent of Parisian apartment plasterwork.
 */
const HaussmannMolding = ({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 400 500"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    {/* ── Outer frame ── */}
    <rect x="8" y="8" width="384" height="484" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.12" />
    <rect x="14" y="14" width="372" height="472" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />

    {/* ── Inner decorative frame with bead-and-reel motif ── */}
    <rect x="22" y="22" width="356" height="456" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
    {/* Bead pattern along top */}
    {Array.from({ length: 16 }).map((_, i) => (
      <circle key={`bt-${i}`} cx={44 + i * 21} cy="22" r="1.8" fill="currentColor" opacity="0.06" />
    ))}
    {/* Bead pattern along bottom */}
    {Array.from({ length: 16 }).map((_, i) => (
      <circle key={`bb-${i}`} cx={44 + i * 21} cy="478" r="1.8" fill="currentColor" opacity="0.06" />
    ))}
    {/* Bead pattern along left */}
    {Array.from({ length: 20 }).map((_, i) => (
      <circle key={`bl-${i}`} cx="22" cy={44 + i * 22} r="1.8" fill="currentColor" opacity="0.06" />
    ))}
    {/* Bead pattern along right */}
    {Array.from({ length: 20 }).map((_, i) => (
      <circle key={`br-${i}`} cx="378" cy={44 + i * 22} r="1.8" fill="currentColor" opacity="0.06" />
    ))}

    {/* ── Corner cartouches (TL, TR, BL, BR) ── */}
    {[
      { tx: 0, ty: 0, sx: 1, sy: 1 },
      { tx: 400, ty: 0, sx: -1, sy: 1 },
      { tx: 0, ty: 500, sx: 1, sy: -1 },
      { tx: 400, ty: 500, sx: -1, sy: -1 },
    ].map(({ tx, ty, sx, sy }, i) => (
      <g key={`corner-${i}`} transform={`translate(${tx},${ty}) scale(${sx},${sy})`}>
        {/* Acanthus scroll */}
        <path
          d="M28 8 C28 8 30 28 50 32 C38 34 32 42 30 52 C28 42 20 34 10 32 C28 28 28 8 28 8Z"
          fill="currentColor"
          opacity="0.04"
        />
        <path
          d="M28 8 C28 8 30 28 50 32 C38 34 32 42 30 52"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.1"
        />
        <path
          d="M30 52 C28 42 20 34 10 32 C28 28 28 8 28 8"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.1"
        />
        {/* Inner curl */}
        <path
          d="M28 18 Q34 26 42 28"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.08"
        />
        <path
          d="M28 18 Q22 26 16 28"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.08"
        />
        {/* Tiny rosette */}
        <circle cx="30" cy="30" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
        <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.06" />
      </g>
    ))}

    {/* ── Top center medallion / rosette ── */}
    <g transform="translate(200, 22)">
      <ellipse cx="0" cy="0" rx="24" ry="8" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />
      <ellipse cx="0" cy="0" rx="16" ry="5" stroke="currentColor" strokeWidth="0.4" opacity="0.07" />
      {/* Petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`petal-t-${i}`}
          x1="0"
          y1="0"
          x2={Math.cos((i * Math.PI) / 4) * 12}
          y2={Math.sin((i * Math.PI) / 4) * 4}
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.06"
        />
      ))}
      <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.05" />
    </g>

    {/* ── Bottom center medallion ── */}
    <g transform="translate(200, 478)">
      <ellipse cx="0" cy="0" rx="24" ry="8" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />
      <ellipse cx="0" cy="0" rx="16" ry="5" stroke="currentColor" strokeWidth="0.4" opacity="0.07" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`petal-b-${i}`}
          x1="0"
          y1="0"
          x2={Math.cos((i * Math.PI) / 4) * 12}
          y2={Math.sin((i * Math.PI) / 4) * 4}
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.06"
        />
      ))}
      <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.05" />
    </g>

    {/* ── Side scrollwork (left & right mid) ── */}
    {[22, 378].map((x) => (
      <g key={`side-${x}`} transform={`translate(${x}, 250)`}>
        <path
          d="M0 -20 Q6 -10 0 0 Q-6 10 0 20"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.08"
        />
        <circle cx="0" cy="0" r="2.5" stroke="currentColor" strokeWidth="0.4" opacity="0.07" />
        <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.05" />
      </g>
    ))}

    {/* ── Garland swags along top edge ── */}
    <path
      d="M60 18 Q130 30 200 18 Q270 30 340 18"
      stroke="currentColor"
      strokeWidth="0.4"
      opacity="0.06"
      fill="none"
    />
    <path
      d="M60 482 Q130 470 200 482 Q270 470 340 482"
      stroke="currentColor"
      strokeWidth="0.4"
      opacity="0.06"
      fill="none"
    />

    {/* ── Fine crosshatch texture fill for "plaster" feel ── */}
    <defs>
      <pattern id="plaster" width="8" height="8" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="8" y2="8" stroke="currentColor" strokeWidth="0.15" opacity="0.03" />
        <line x1="8" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.15" opacity="0.02" />
      </pattern>
    </defs>
    <rect x="22" y="22" width="356" height="456" fill="url(#plaster)" />
  </svg>
);

export default HaussmannMolding;
