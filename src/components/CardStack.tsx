import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventData } from "./EventCard";
import { EventDetail } from "./EventCard";
import HaussmannMolding from "./HaussmannMolding";
import FlowerCorner from "./FlowerCorner";

interface CardStackProps {
  events: EventData[];
}

const CardStack = ({ events }: CardStackProps) => {
  const [openEvent, setOpenEvent] = useState<EventData | null>(null);

  const renderNested = (depth: number): React.ReactNode => {
    if (depth >= events.length) return null;

    const event = events[depth];
    const isLast = depth === events.length - 1;

    return (
      <div className="relative" style={{ zIndex: depth + 1 }}>
        <div className="cardboard-surface-deep relative rounded-[4px] overflow-hidden">
          <HaussmannMolding
            className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
            style={{ opacity: 0.5 + depth * 0.06 }}
          />

          {/* Flower corners */}
          <FlowerCorner position="top-left" className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 pointer-events-none" />
          <FlowerCorner position="top-right" className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 pointer-events-none" />

          <div className="absolute inset-2 border border-gold/5 rounded-[1px] pointer-events-none" />

          {/* Title strip — clickable */}
          <motion.div
            className={`relative z-10 flex flex-col items-center justify-center px-5 md:px-7 cursor-pointer ${isLast ? 'py-5 md:py-6' : ''}`}
            style={isLast ? undefined : { height: 100 }}
            whileHover={{ opacity: 0.7 }}
            onClick={() => setOpenEvent(event)}
          >
            <svg viewBox="0 0 340 48" className="w-[260px] md:w-[320px]" style={{ overflow: "visible" }}>
              <defs>
                <path id={`arc-strip-${depth}`} d="M 10,44 Q 170,-2 330,44" fill="none" />
              </defs>
              <text
                fill="hsl(var(--gold))"
                fontSize="30"
                fontFamily="inherit"
                className="font-script"
              >
                <textPath href={`#arc-strip-${depth}`} startOffset="50%" textAnchor="middle">
                  {event.title}
                </textPath>
              </text>
            </svg>
            <p className="font-display text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1.5 font-semibold"
              style={{ color: "hsl(38 40% 40%)" }}>
              {event.time} — <span style={{ color: "hsl(38 45% 42%)" }}>{event.date}</span>
            </p>

            {/* Show full details inline for the last (innermost) card */}
            {isLast && (
              <div className="mt-3 space-y-1.5 text-center">
                <div className="gold-divider w-10 mx-auto" />
                <p className="font-display text-sm md:text-base font-bold tracking-wide"
                  style={{ color: "hsl(38 40% 32%)" }}>
                  {event.venue}
                </p>
                <p className="font-body text-xs md:text-sm font-medium"
                  style={{ color: "hsl(38 30% 45%)" }}>
                  {event.address}
                </p>
                <p className="font-body text-xs md:text-sm italic text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {event.description}
                </p>
              </div>
            )}
          </motion.div>

          {/* Nested child */}
          {!isLast && (
            <div className="pl-4 md:pl-6 pb-4 md:pb-5 pr-2 md:pr-3 relative z-10">
              {renderNested(depth + 1)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderNested(0)}

      <p
        className="text-center font-body text-xs md:text-sm tracking-[0.3em] uppercase mt-5"
        style={{ color: "hsl(40 18% 55%)" }}
      >
        Cliquez sur un titre pour voir les détails
      </p>

      <AnimatePresence>
        {openEvent && (
          <EventDetail event={openEvent} onClose={() => setOpenEvent(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default CardStack;
