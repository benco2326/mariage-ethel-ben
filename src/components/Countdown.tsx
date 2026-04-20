import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calcTimeLeft = (target: Date): TimeLeft => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

const units = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
] as const;

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isPast =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isPast) {
    return (
      <div className="text-center py-6">
        <p className="font-script text-3xl gold-text">Le grand jour est arrivé !</p>
      </div>
    );
  }

  return (
    <motion.div
      className="py-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-3 md:gap-5">
        {units.map(({ key, label }, i) => (
          <div key={key} className="flex items-center gap- md:gap-5">
            <div className="text-center">
              {/* Number */}
              <motion.div
                className="relative"
                key={timeLeft[key]}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span
                  className="font-script text-3xl md:text-4xl "
                  style={{ color: "hsl(40 50% 45%)" }}
                >
                  {pad(timeLeft[key])}
                </span>
              </motion.div>
              {/* Label */}
              <p
                className="font-body text-sm md:text-base italic"
                style={{ color: "hsl(35 15% 45%)" }}
              >
                {label}
              </p>
            </div>

            {/* Separator dot */}
            {i < units.length - 1 && (
              <span
                className="font-script text-xl md:text-2xl pb-4 select-none"
                style={{ color: "hsl(var(--gold) / 0.4)" }}
              >
                ·
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Decorative line under */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-[1px] w-8 md:w-12" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.25))" }} />
        <svg viewBox="0 0 20 8" className="w-4 h-2" style={{ opacity: 0.3 }}>
          <path d="M0 4 Q5 0, 10 4 Q15 8, 20 4" stroke="hsl(var(--gold))" strokeWidth="0.8" fill="none" />
        </svg>
        <div className="h-[1px] w-8 md:w-12" style={{ background: "linear-gradient(-90deg, transparent, hsl(var(--gold) / 0.25))" }} />
      </div>
    </motion.div>
  );
};

export default Countdown;
