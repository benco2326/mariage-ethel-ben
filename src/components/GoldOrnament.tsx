const GoldOrnament = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ornament ${className}`}>
    <div className="gold-divider w-10 md:w-16" />
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="opacity-40">
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" />
    </svg>
    <div className="gold-divider w-10 md:w-16" />
  </div>
);

export default GoldOrnament;
