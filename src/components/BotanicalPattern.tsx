/** Botanical leaf branch SVG pattern for embossed effect */
const BotanicalPattern = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 400 500"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main branch */}
    <path
      d="M200 480 C200 400, 180 350, 160 300 C140 250, 170 200, 200 150 C230 100, 210 60, 200 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.12"
    />
    {/* Left leaves */}
    <path
      d="M160 300 C130 290, 100 310, 80 280 C100 270, 130 275, 160 300Z"
      fill="currentColor"
      opacity="0.06"
    />
    <path
      d="M155 260 C125 240, 90 255, 65 230 C90 225, 125 230, 155 260Z"
      fill="currentColor"
      opacity="0.05"
    />
    <path
      d="M170 220 C140 200, 110 210, 85 190 C110 185, 145 195, 170 220Z"
      fill="currentColor"
      opacity="0.06"
    />
    <path
      d="M185 180 C155 160, 130 170, 105 150 C130 145, 160 155, 185 180Z"
      fill="currentColor"
      opacity="0.05"
    />
    <path
      d="M195 140 C170 120, 145 125, 125 108 C148 104, 172 115, 195 140Z"
      fill="currentColor"
      opacity="0.06"
    />
    <path
      d="M200 100 C180 80, 158 85, 140 68 C160 64, 182 75, 200 100Z"
      fill="currentColor"
      opacity="0.05"
    />
    {/* Right leaves */}
    <path
      d="M175 340 C205 325, 240 340, 260 310 C240 308, 210 318, 175 340Z"
      fill="currentColor"
      opacity="0.06"
    />
    <path
      d="M165 290 C200 275, 235 288, 260 262 C235 258, 200 268, 165 290Z"
      fill="currentColor"
      opacity="0.05"
    />
    <path
      d="M175 240 C205 225, 235 235, 260 215 C235 210, 205 218, 175 240Z"
      fill="currentColor"
      opacity="0.06"
    />
    <path
      d="M190 195 C215 180, 240 188, 262 170 C240 166, 215 175, 190 195Z"
      fill="currentColor"
      opacity="0.05"
    />
    <path
      d="M198 155 C220 140, 245 145, 265 128 C245 124, 222 133, 198 155Z"
      fill="currentColor"
      opacity="0.06"
    />
    <path
      d="M202 115 C222 98, 245 102, 262 88 C245 84, 224 93, 202 115Z"
      fill="currentColor"
      opacity="0.05"
    />
    {/* Sub-branches */}
    <path
      d="M160 300 C140 288, 110 295, 80 280"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.08"
    />
    <path
      d="M175 340 C200 328, 235 335, 260 310"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.08"
    />
    <path
      d="M170 220 C148 208, 120 215, 85 190"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.08"
    />
    <path
      d="M175 240 C200 228, 230 232, 260 215"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.08"
    />
    {/* Additional small leaves for density */}
    <path
      d="M200 60 C185 45, 168 50, 155 38 C170 35, 187 42, 200 60Z"
      fill="currentColor"
      opacity="0.04"
    />
    <path
      d="M200 60 C215 45, 232 48, 248 38 C232 35, 218 42, 200 60Z"
      fill="currentColor"
      opacity="0.04"
    />
    {/* Bottom leaves */}
    <path
      d="M185 380 C155 370, 125 385, 105 360 C128 355, 158 365, 185 380Z"
      fill="currentColor"
      opacity="0.05"
    />
    <path
      d="M192 410 C220 395, 250 408, 275 385 C252 382, 222 390, 192 410Z"
      fill="currentColor"
      opacity="0.05"
    />
    <path
      d="M195 440 C170 425, 140 435, 118 415 C142 412, 172 420, 195 440Z"
      fill="currentColor"
      opacity="0.04"
    />
  </svg>
);

export default BotanicalPattern;
