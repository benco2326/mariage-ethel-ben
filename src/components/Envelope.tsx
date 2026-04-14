import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import BotanicalPattern from "./BotanicalPattern";
import HaussmannMolding from "./HaussmannMolding";
import FlowerCorner from "./FlowerCorner";
import jerusalemBg from "@/assets/jerusalem-stone-bg.jpg";
import initialeImg from "@/assets/initiale.png";
import { getAudio } from "../audioManager";

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

type EnvelopeState =
  | "closed"
  | "seal-crack"
  | "flap-open"
  | "card-peek"
  | "card-out"
  | "fade";

const Envelope = ({ onOpen, isOpen }: EnvelopeProps) => {
  const [state, setState] = useState<EnvelopeState>("closed");

  const handleClick = useCallback(() => {
    const audio = getAudio();
    audio.play().catch(() => {}); // 🔥 instantané car user click

    if (state !== "closed") return;

    setState("seal-crack");
    setTimeout(() => setState("flap-open"), 700);
    setTimeout(() => setState("card-peek"), 1700);
    setTimeout(() => setState("card-out"), 2500);
    setTimeout(() => {
      setState("fade");
      onOpen();
    }, 3900);
}, [state, onOpen]);

  const isFlapOpen = state !== "closed" && state !== "seal-crack";
  const isCardMoving = state === "card-peek" || state === "card-out" || state === "fade";

  const flapRotation = isFlapOpen ? -178 : 0;

  const cardY =
    state === "card-peek"
      ? "-18%"
      : state === "card-out" || state === "fade"
        ? "-140%"
        : "0%";

  const cardScale = state === "card-out" || state === "fade" ? 0.92 : 1;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "hsl(38 14% 85%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Jerusalem stone background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${jerusalemBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/*<div
            className="absolute inset-0"
            style={{ backgroundColor: "hsl(38 14% 90% / 0.45)" }}
          />*/}

          {/* === ENVELOPE === */}
          <motion.div
            className="relative cursor-pointer select-none"
            initial={{ y: 60, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={handleClick}
            style={{
              width: "min(460px, 85vw)",
              height: "min(320px, 58vw)",
            }}
          >
            {/* Realistic layered shadow */}
            <motion.div
              className="absolute inset-0 rounded-[2px] pointer-events-none"
              animate={{
                boxShadow: isFlapOpen
                  ? "0 1px 1px hsl(35 15% 40% / 0.06), 0 4px 8px hsl(35 15% 30% / 0.08), 0 16px 40px hsl(35 15% 20% / 0.14), 0 30px 80px hsl(0 0% 0% / 0.18)"
                  : "0 1px 1px hsl(35 15% 40% / 0.05), 0 3px 6px hsl(35 15% 30% / 0.06), 0 12px 32px hsl(35 15% 20% / 0.1), 0 20px 50px hsl(0 0% 0% / 0.12)",
              }}
              transition={{ duration: 0.8 }}
              style={{ zIndex: 0 }}
            />

            {/* Envelope body */}
            <div
              className="absolute inset-0 rounded-[2px] overflow-hidden"
              style={{
                background: "linear-gradient(178deg, hsl(40 26% 91%) 0%, hsl(39 23% 88%) 35%, hsl(38 20% 86%) 65%, hsl(37 18% 84%) 100%)",
              }}
            >
              {/* Paper fiber texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.06,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Subtle directional light — top-left highlight */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 120% 80% at 15% 10%, hsl(42 30% 96% / 0.4) 0%, transparent 50%)",
                }}
              />

              {/* Bottom-right shadow for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 100% 80% at 90% 95%, hsl(35 15% 50% / 0.08) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Thin edge highlight — simulates paper thickness */}
            <div
              className="absolute inset-0 rounded-[2px] pointer-events-none"
              style={{
                boxShadow: "inset 1px 1px 0 0 hsl(42 30% 95% / 0.5), inset -1px -1px 0 0 hsl(35 15% 70% / 0.3)",
              }}
            />

            {/* Moulures */}
            <HaussmannMolding
              className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
              style={{ opacity: 0.45, zIndex: 7 }}
            />

            {/* Gold border */}
            <div
              className="absolute inset-3 md:inset-4 pointer-events-none rounded-[1px]"
              style={{ border: "1px solid hsl(var(--gold) / 0.09)", zIndex: 7 }}
            />
            <div
              className="absolute inset-[14px] md:inset-[18px] pointer-events-none"
              style={{ border: "0.5px solid hsl(var(--gold) / 0.05)", zIndex: 7 }}
            />

            {/* Flower corners */}
            <FlowerCorner position="top-left" className="absolute top-0 left-0 w-12 h-12 md:w-14 md:h-14 pointer-events-none" style={{ zIndex: 7 }} />
            <FlowerCorner position="top-right" className="absolute top-0 right-0 w-12 h-12 md:w-14 md:h-14 pointer-events-none" style={{ zIndex: 7 }} />
            <FlowerCorner position="bottom-left" className="absolute bottom-0 left-0 w-12 h-12 md:w-14 md:h-14 pointer-events-none" style={{ zIndex: 7 }} />
            <FlowerCorner position="bottom-right" className="absolute bottom-0 right-0 w-12 h-12 md:w-14 md:h-14 pointer-events-none" style={{ zIndex: 7 }} />

            <BotanicalPattern
              className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
              style={{ opacity: 0.12 }}
            />

            {/* Inner liner (visible when flap opens) */}
            <div
              className="absolute top-0 left-[1px] right-[1px] overflow-hidden"
              style={{ height: "55%", zIndex: 1 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, hsl(42 28% 94%) 0%, hsl(40 24% 91%) 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 96%)",
                }}
              />
              {/* Diagonal hatch pattern on liner */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(135deg, hsl(var(--gold) / 0.15) 0px, transparent 1px, transparent 6px, hsl(var(--gold) / 0.15) 7px)`,
                  clipPath: "polygon(0 0, 100% 0, 50% 96%)",
                }}
              />
            </div>

            {/* ====== CARD ====== */}
            <motion.div
              className="absolute left-[5%] right-[5%] rounded-[1px] overflow-hidden"
              style={{
                height: "86%",
                bottom: "7%",
                zIndex: 2,
                background: "linear-gradient(176deg, hsl(42 30% 97%) 0%, hsl(40 26% 95%) 60%, hsl(39 24% 94%) 100%)",
              }}
              animate={{
                y: cardY,
                scale: cardScale,
                opacity: state === "fade" ? 0 : 1,
                boxShadow: isCardMoving
                  ? "0 -6px 24px hsl(0 0% 0% / 0.12), 0 2px 8px hsl(0 0% 0% / 0.06)"
                  : "0 0 2px hsl(35 12% 22% / 0.03)",
              }}
              transition={{
                y: {
                  duration: state === "card-peek" ? 0.8 : 1.2,
                  ease: state === "card-peek" ? [0.33, 1, 0.68, 1] : [0.16, 1, 0.3, 1],
                },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.6 },
                boxShadow: { duration: 0.5 },
              }}
            >
              <BotanicalPattern
                className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
                style={{ opacity: 0.2 }}
              />
              <div className="flex flex-col items-center justify-center h-full relative">
                <p
                  className="font-body text-[10px] md:text-xs tracking-[0.35em] uppercase font-semibold"
                  style={{ color: "hsl(35 15% 40%)" }}
                >
                  Ensemble avec leurs familles
                </p>
                <p className="font-script text-3xl md:text-5xl gold-text mt-2">
                  Ethel & Ben
                </p>
                <div className="gold-divider w-12 mt-3" />
                <p
                  className="font-body text-[10px] md:text-xs mt-2 tracking-[0.25em] font-medium"
                  style={{ color: "hsl(35 12% 35%)" }}
                >
                  02 · 09 · 2026
                </p>
              </div>
            </motion.div>

            {/* ====== BOTTOM FLAP ====== */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: "56%",
                zIndex: 6,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(0deg, hsl(39 22% 86%) 0%, hsl(38 20% 83%) 100%)",
                  clipPath: "polygon(0 100%, 100% 100%, 50% 10%)",
                }}
              />
              {/* Fold crease shadow at the peak */}
              <div
                className="absolute left-[20%] right-[20%] pointer-events-none"
                style={{
                  top: "8%",
                  height: "12%",
                  background: "radial-gradient(ellipse 100% 100% at 50% 0%, hsl(35 15% 30% / 0.06) 0%, transparent 70%)",
                  clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
                }}
              />
              <BotanicalPattern
                className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
                style={{ opacity: 0.1 }}
              />
            </div>

            {/* ====== LEFT FLAP ====== */}
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{
                width: "52%",
                zIndex: 5,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(95deg, hsl(39 20% 84%) 0%, hsl(40 23% 87%) 70%, hsl(41 24% 89%) 100%)",
                  clipPath: "polygon(0 0, 0 100%, 97% 50%)",
                }}
              />
              {/* Edge shadow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, hsl(35 15% 50% / 0.04) 0%, transparent 30%)",
                  clipPath: "polygon(0 0, 0 100%, 97% 50%)",
                }}
              />
            </div>

            {/* ====== RIGHT FLAP ====== */}
            <div
              className="absolute top-0 bottom-0 right-0"
              style={{
                width: "52%",
                zIndex: 5,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(-95deg, hsl(38 19% 83%) 0%, hsl(40 23% 87%) 70%, hsl(41 24% 89%) 100%)",
                  clipPath: "polygon(100% 0, 100% 100%, 3% 50%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(-90deg, hsl(35 15% 50% / 0.04) 0%, transparent 30%)",
                  clipPath: "polygon(100% 0, 100% 100%, 3% 50%)",
                }}
              />
            </div>

            {/* ====== TOP FLAP with 3D hinge ====== */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "58%",
                zIndex: state === "closed" || state === "seal-crack" ? 10 : 3,
                perspective: "1000px",
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                }}
                animate={{ rotateX: flapRotation }}
                transition={{ duration: 1.0, ease: [0.4, 0, 0.15, 1] }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, hsl(41 25% 89%) 0%, hsl(40 23% 87%) 40%, hsl(38 20% 84%) 80%, hsl(37 18% 82%) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 93%)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Paper texture on flap */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: 0.05,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <BotanicalPattern
                    className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
                    style={{ opacity: 0.2, transform: "rotate(180deg)" }}
                  />
                  {/* Fold crease shadow at hinge */}
                  <div
                    className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, hsl(35 12% 22% / 0.07) 0%, transparent 100%)",
                    }}
                  />
                  {/* Subtle light on center of flap */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 60% 50% at 50% 35%, hsl(42 28% 94% / 0.25) 0%, transparent 60%)",
                      clipPath: "polygon(0 0, 100% 0, 50% 93%)",
                    }}
                  />
                </div>
                {/* Back face */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(0deg, hsl(42 26% 93%) 0%, hsl(40 23% 90%) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 93%)",
                    transform: "rotateX(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                />
              </motion.div>

              {/* Shadow cast onto body when flap opens */}
              <motion.div
                className="absolute bottom-0 left-[8%] right-[8%] pointer-events-none"
                style={{
                  height: "25%",
                  background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 0% / 0.06) 50%, hsl(0 0% 0% / 0.1) 100%)",
                  clipPath: "polygon(12% 0%, 88% 0%, 50% 100%)",
                  zIndex: -1,
                }}
                animate={{
                  opacity: isFlapOpen ? 1 : 0,
                  scaleY: isFlapOpen ? 1 : 0.2,
                }}
                transition={{ duration: 0.7, delay: isFlapOpen ? 0.2 : 0 }}
              />
            </div>

            {/* ====== WAX SEAL — centered on flap point ====== */}
            <AnimatePresence>
              {(state === "closed" || state === "seal-crack") && (
                <motion.div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 20,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                  className="relative w-28 h-28 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.06 }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    state === "seal-crack"
                      ? {
                          scale: [1, 1.15, 1.1, 0],
                          rotate: [0, -6, 10, 25],
                          y: [0, -3, 0, -18],
                        }
                      : { scale: 1, rotate: 0, y: 0 }
                  }
                  transition={
                    state === "seal-crack"
                      ? { duration: 0.6, ease: "easeOut", times: [0, 0.3, 0.5, 1] }
                      : { type: "spring", stiffness: 200, damping: 15, delay: 0.6 }
                  }
                >
                  <img
                    src={initialeImg}
                    alt="Seal"
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
            </motion.div>

              )}
            </AnimatePresence>

            {/* Interior shadow when open */}
            <motion.div
              className="absolute inset-0 rounded-[2px] pointer-events-none"
              style={{
                background: "linear-gradient(180deg, hsl(0 0% 0% / 0.05) 0%, transparent 20%, transparent 80%, hsl(0 0% 0% / 0.02) 100%)",
                zIndex: 1,
              }}
              animate={{ opacity: isFlapOpen ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Shadow under card as it rises */}
            <motion.div
              className="absolute left-[12%] right-[12%] pointer-events-none"
              style={{
                top: "5%",
                height: "6px",
                borderRadius: "50%",
                background: "hsl(0 0% 0% / 0.08)",
                filter: "blur(5px)",
                zIndex: 1,
              }}
              animate={{
                opacity: isCardMoving ? 1 : 0,
                scaleX: state === "card-out" ? 0.5 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Hint */}
          <motion.p
            className="absolute bottom-[15%] left-0 right-0 text-center font-body text-base md:text-lg tracking-[0.35em] uppercase"
            style={{ color: "hsl(35 15% 35%)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: state === "closed" ? 0.6 : 0,
              y: state === "closed" ? 0 : 10,
            }}
            transition={{ delay: state === "closed" ? 1.5 : 0, duration: 0.8 }}
          >
            Cliquez pour ouvrir
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;
