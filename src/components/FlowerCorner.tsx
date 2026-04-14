/** Decorative floral corner ornament — white & gold flowers */
const FlowerCorner = ({
  className = "",
  style = {},
  position = "top-left",
}: {
  className?: string;
  style?: React.CSSProperties;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const rotations: Record<string, string> = {
    "top-left": "rotate(0)",
    "top-right": "rotate(90)",
    "bottom-right": "rotate(180)",
    "bottom-left": "rotate(270)",
  };

  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      style={{ ...style, transform: rotations[position] }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main flower */}
      <circle cx="18" cy="18" r="3" fill="hsl(40 30% 78%)" opacity="0.5" />
      <ellipse cx="18" cy="12" rx="2.5" ry="5" fill="hsl(40 20% 92%)" opacity="0.4" />
      <ellipse cx="12" cy="18" rx="5" ry="2.5" fill="hsl(40 20% 92%)" opacity="0.4" />
      <ellipse cx="14" cy="13" rx="2.2" ry="4.5" fill="hsl(40 25% 85%)" opacity="0.35" transform="rotate(-45 14 13)" />
      <ellipse cx="13" cy="14" rx="4.5" ry="2.2" fill="hsl(40 25% 85%)" opacity="0.35" transform="rotate(-45 13 14)" />

      {/* Small bud */}
      <circle cx="32" cy="8" r="1.8" fill="hsl(40 30% 75%)" opacity="0.4" />
      <ellipse cx="32" cy="4" rx="1.5" ry="3" fill="hsl(40 18% 90%)" opacity="0.35" />
      <ellipse cx="29" cy="8" rx="3" ry="1.5" fill="hsl(40 18% 90%)" opacity="0.35" />

      {/* Another bud */}
      <circle cx="8" cy="32" r="1.8" fill="hsl(40 30% 75%)" opacity="0.4" />
      <ellipse cx="4" cy="32" rx="3" ry="1.5" fill="hsl(40 18% 90%)" opacity="0.35" />
      <ellipse cx="8" cy="29" rx="1.5" ry="3" fill="hsl(40 18% 90%)" opacity="0.35" />

      {/* Stems/branches */}
      <path
        d="M18 18 C24 12, 28 10, 32 8"
        stroke="hsl(40 25% 70%)"
        strokeWidth="0.6"
        opacity="0.35"
      />
      <path
        d="M18 18 C12 24, 10 28, 8 32"
        stroke="hsl(40 25% 70%)"
        strokeWidth="0.6"
        opacity="0.35"
      />
      <path
        d="M18 18 C28 22, 38 18, 48 12"
        stroke="hsl(40 25% 70%)"
        strokeWidth="0.5"
        opacity="0.25"
      />
      <path
        d="M18 18 C22 28, 18 38, 12 48"
        stroke="hsl(40 25% 70%)"
        strokeWidth="0.5"
        opacity="0.25"
      />

      {/* Tiny leaves */}
      <ellipse cx="24" cy="14" rx="2" ry="1" fill="hsl(40 20% 80%)" opacity="0.25" transform="rotate(-30 24 14)" />
      <ellipse cx="14" cy="24" rx="1" ry="2" fill="hsl(40 20% 80%)" opacity="0.25" transform="rotate(-30 14 24)" />
      <ellipse cx="38" cy="14" rx="2.5" ry="1" fill="hsl(40 20% 80%)" opacity="0.2" transform="rotate(-15 38 14)" />
      <ellipse cx="14" cy="38" rx="1" ry="2.5" fill="hsl(40 20% 80%)" opacity="0.2" transform="rotate(-15 14 38)" />

      {/* Tiny dot accents */}
      <circle cx="44" cy="10" r="0.8" fill="hsl(40 30% 75%)" opacity="0.2" />
      <circle cx="10" cy="44" r="0.8" fill="hsl(40 30% 75%)" opacity="0.2" />
      <circle cx="26" cy="6" r="0.6" fill="hsl(40 25% 82%)" opacity="0.25" />
      <circle cx="6" cy="26" r="0.6" fill="hsl(40 25% 82%)" opacity="0.25" />
    </svg>
  );
};

export default FlowerCorner;
