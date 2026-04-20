import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BotanicalPattern from "./BotanicalPattern";
import HaussmannMolding from "./HaussmannMolding";
import FlowerCorner from "./FlowerCorner";
 
export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapQuery: string;
  description: string;
}
 
interface EventDetailProps {
  event: EventData;
  onClose: () => void;
}
 
const EventDetail = ({ event, onClose }: EventDetailProps) => {
  const isSoiree = event.id === "soiree";
  const isHenne = event.id === "henne";
  const isMairie = event.id === "mairie";
  const isChabbat = event.id === "chabbat";
  const [cardRevealed, setCardRevealed] = useState(false);
 
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop — fades in with blur, page disappears behind */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "hsl(0 0% 0% / 0.6)" }}
        onClick={onClose}
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
      />
 
      {/* Card slides up naturally */}
      <motion.div
        className="relative w-full max-w-lg h-[500px] md:h-[720px] flex flex-col rounded-[4px] overflow-hidden cardboard-surface-deep"
        style={{
         transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8,
        }}
        onAnimationComplete={() => setCardRevealed(true)}
      >
        {/* Shadow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[4px]"
          initial={{ boxShadow: "0 0 0 hsl(0 0% 0% / 0)" }}
          animate={{
            boxShadow: "0 30px 80px hsl(0 0% 0% / 0.3), 0 10px 30px hsl(0 0% 0% / 0.2)",
          }}
          transition={{ duration: 0.5 }}
          style={{ zIndex: -1 }}
        />
 
          <HaussmannMolding
            className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
            style={{ opacity: isSoiree ? 0.6 : 0.75 }}
          />
          <BotanicalPattern
            className="absolute inset-0 w-full h-full pointer-events-none text-foreground"
            style={{ opacity: isSoiree ? 0.08 : 0.12 }}
          />
 
          {/* Double border frame */}
          <div className="absolute inset-3 md:inset-5 pointer-events-none" style={{ border: "1px solid hsl(var(--gold) / 0.15)" }} />
          <div className="absolute inset-[14px] md:inset-[22px] pointer-events-none" style={{ border: "1px solid hsl(var(--gold) / 0.08)" }} />
 
          {/* Flower corner ornaments */}
          <FlowerCorner position="top-left" className="absolute top-1 left-1 w-14 h-14 md:w-16 md:h-16 pointer-events-none" />
          <FlowerCorner position="top-right" className="absolute top-1 right-1 w-14 h-14 md:w-16 md:h-16 pointer-events-none" />
          <FlowerCorner position="bottom-left" className="absolute bottom-1 left-1 w-14 h-14 md:w-16 md:h-16 pointer-events-none" />
          <FlowerCorner position="bottom-right" className="absolute bottom-1 right-1 w-14 h-14 md:w-16 md:h-16 pointer-events-none" />
 
          <div className="relative z-10 p-8 md:p-12 text-center flex-1 overflow-hidden">
           
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
            >
              ✕
            </button>
 
            {isSoiree && (
              <>
                {/* 🔥 BACKGROUND CADRE */}
                <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("/src/assets/soiree.png")`,
                  backgroundSize: "101% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.9,                
                  }}
              />
              <div
              style={{
                background: "rgba(255, 248, 238, 0)",
                backdropFilter: "blur(0px)",        
              }}
              >
                {/* Small blessing */}
                <motion.p
                  className="font-body text-[8px] md:text-[9px] tracking-[0.2em]"
                  style={{ color: "hsl(35 12% 55%)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardRevealed ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                >
                  בס״ד
                </motion.p>
 
                {/* Arc headline */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 10 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <svg viewBox="0 0 380 80" className="w-[340px] md:w-[360px] mx-auto mt-3" style={{ overflow: "visible" }}>
                  <defs>
                    <path id="arc-main" d="M 15,48 Q 190,-10 365,64" fill="none" />
                  </defs>
                  <text
                    fill="hsl(var(--gold))"
                    fontSize="36"
                    fontFamily="'Noto Serif Hebrew', 'David Libre', serif"
                    direction="rtl"
                    unicodeBidi="bidi-override"
                  >
                    <textPath href="#arc-main" startOffset="43.5%" textAnchor="middle" >
                    </textPath>
                  </text>
                </svg>
                </motion.div>
 
                {/* Body lines */}
                <motion.div
                  className=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardRevealed ? 1 : 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                   <div className="flex justify-between w-full -mt-[13.5px]">
                    <div className="text-left">
                      <p className="font-body text-[12px] md:text-[10px] font-medium" style={{ color: "hsl(35 10% 35%)" }}>
                        Nicole, Blanche & Lilliane
                      </p> 
                      <p className="font-body text-[12px] md:text-[10px] font-medium" style={{ color: "hsl(35 10% 35%)" }}>
                        Stéphane & Johanna Haddad
                      </p>
                      <p className="font-body text-[12px] md:text-[10px] font-medium" style={{ color: "hsl(35 10% 35%)" }}>
                        Alexandre Korn
                      </p>
                    </div>
 
                    <div className="text-right">
                      <p className="font-body text-[12px] md:text-[10px] font-medium" style={{ color: "hsl(35 10% 35%)" }}>
                        Aimée Journo
                      </p> 
                      <p className="font-body text-[12px] md:text-[10px] font-medium" style={{ color: "hsl(35 10% 35%)" }}>
                        Elvis & Corine Cohen
                      </p>
                    </div>
                  </div>
 
                  <p className="font-body text-l md:text-sm italic mt-2.5"
                    style={{ color: "hsl(35 10% 35%)" }}>
                    Ont la joie de vous faire part du mariage
                  </p>
                  <p className="font-body text-l md:text-sm italic -mt-1"
                    style={{ color: "hhsl(35 10% 35%)" }}>
                    de leurs petits-enfants et enfants
                  </p>
                </motion.div>
 
                {/* Names */}
                <motion.div
                className="flex items-center justify-center gap-3 my-4 overflow-visible"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: cardRevealed ? 1 : 0,
                  scale: cardRevealed ? 1 : 0.9
                }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                {/* ETHEL */}
                <div className="text-center">
                  <p  className="font-script text-2xl md:text-3xl mt-0.5"
                    style={{ color: "#b8924f" }}>
                    Ethel
                  </p>
                  <p
                    className="font-body text-[12px] md:text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "hsl(35 12% 55%)" }}
                  >
                    חנה
                  </p>
                </div>

                {/* ANNEAUX */}
                <svg
                  width="49"
                  height="28"
                  viewBox="0 0 100 56"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-1"
                >
                  <circle
                    cx="40"
                    cy="28"
                    r="15"
                    fill="none"
                    stroke="#D8BE7A"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="59"
                    cy="28"
                    r="15"
                    fill="none"
                    stroke="#D8BE7A"
                    strokeWidth="1.8"
                  />
                </svg>

                {/* BEN */}
                <div className="text-center ">
                  <p className="font-script text-2xl md:text-3xl mt-0.5"
                    style={{ color: "#b8924f" }}>
                    Ben
                  </p>
                  <p
                    className="font-body text-[12px] md:text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "hsl(35 12% 55%)" }}
                  >
                    ניסים
                  </p>
                </div>
              </motion.div>
 
                <div className="gold-divider w-12 mx-auto my-2 -mt-[10px]" />
 
                {/* Date & time */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 8 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <p className="font-display text-sm md:text-base tracking-[0.2em] uppercase font-semibold"
                    style={{ color: "hsl(38 45% 42%)" }}>
                    {event.date}
                  </p>
                  <p className="font-display text-lg md:text-xl font-bold italic mt-1"
                    style={{ color: "hsl(40 50% 45%)" }}>
                    à {event.time}
                  </p>
                </motion.div>
 
                <div className="gold-divider w-10 mx-auto my-2" />
 
                {/* Venue */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 8 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                >
                  <p className="font-display text-base md:text-lg font-bold tracking-wide"
                    style={{ color: "hsl(38 40% 32%)"}}>
                    {event.venue}
                  </p>
                  <p className="font-body text-sm md:text-base font-medium mt-0.5"
                    style={{ color: "hsl(38 30% 45%)", whiteSpace: "pre-line" }}>
                    <a
                      href={`https://waze.com/ul?q=${encodeURIComponent(event.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm md:text-base font-medium underline cursor-pointer"
                    >
                    121 Rue du Lieutenant Colonel de Montbrison{"\n"}
                    92500, Reuil-Malmaison
                    </a>
                  </p>
                </motion.div>
 
                <div className="gold-divider w-10 mx-auto my-3" />
 
                {/* Families */}
                <motion.div
                  className="flex justify-between px-4 md:px-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardRevealed ? 1 : 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
               
                </motion.div>
                </div>
                <p className="font-body text-[8px] md:text-[9px] tracking-[0.25em] uppercase mt-4"
                  style={{ color: "hsl(35 12% 58%)" }}>
                  Tenue de tsinout exigée
                </p>
              </>
            )}      
 
            {isHenne && (
              <>
              {/* 🔥 BACKGROUND CADRE */}
                <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("/src/assets/henne.png")`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.9,                
                  }}
              />
              <div
              style={{
                background: "rgba(255, 248, 238, 0.13)",
                backdropFilter: "blur(0px)",        
              }}
              >
                  {/* Arc headline */}
                <motion.p
                className="mt-[60px] text-center font-script text-4xl md:text-5xl "
                style={{ color: "hsl(var(--gold))" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: cardRevealed ? 1 : 0 }}
              >
                {event.title}
                 <p className="font-script mt-[19px] text-2xl md:text-4xl leading-tight italic"
                    style={{ color: "hsl(38 45% 42%)" }}>
                    {event.description}                  
                    </p>
              </motion.p>
 
                <motion.div
                  className="flex items-center justify-center mt-[30px] "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardRevealed ? 1 : 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  
                  <div className="gold-divider flex-1 max-w-[50px] " />
                  <p className="font-display text-xs md:text-sm font-semibold tracking-wider uppercase"
                    style={{ color: "hsl(38 45% 42%)" }}>
                    {event.date}
                  </p>
                  <div className="gold-divider flex-1 max-w-[40px]" />
                </motion.div>
 
                <motion.div
                  className="mt-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 10 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <p className=" font-display text-lg md:text-xl font-bold italic"
                    style={{ color: "hsl(40 50% 45%)" }}>
                    à {event.time}
                  </p>
                  <div className="">
                  <div className="mt-[12px] md:mt-[260px]">
                    <p className="font-display text-base md:text-lg font-bold tracking-wide"
                      style={{ color: "hsl(38 40% 32%)" }}>
                      {event.venue}
                    </p>
                    <p className="font-body text-sm md:text-base font-medium"
                      style={{ color: "hsl(38 30% 45%)" }}>
                      <a
                        href={`https://waze.com/ul?q=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm md:text-base font-medium underline cursor-pointer"
                      >
                      {event.address}
                      </a>
                    </p>
                  </div>              
                  </div>
                </motion.div>
                </div>
              </>
            )}
 
            {isMairie && (
             <>
               {/* 🔥 BACKGROUND CADRE */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("/src/assets/mairie-vincennes-fond.png")`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.6,                
                  }}
              />
              <div
              style={{
                background: "rgba(255, 248, 238, 0.13)",
                backdropFilter: "blur(0px)",        
              }}
              >
                {/* Arc headline */}
                <motion.p
                className="text-center font-script text-4xl md:text-5xl "
                style={{ color: "hsl(var(--gold))" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: cardRevealed ? 1 : 0 }}
              >
                {event.title}
              </motion.p>
 
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 10 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <p className="font-script text-3xl md:text-4xl leading-tight font-bold italic"
                    style={{ color: "hsl(40 50% 45%)" }}>
                    Ethel & Ben
                  </p>
                  <p className="font-display text-lg md:text-xl italic -mt-1.5"
                    style={{ color: "hsl(40 50% 45%)" }}>
                    se diront "OUI"
                  </p>

                  <div className="">
                  <div className="mt-[245px] md:mt-[260px]">
                    <p className="font-display text-lg md:text-xl font-bold italic"
                    style={{ color: "hsl(40 50% 45%)" }}>
                    {event.date} à {event.time}
                  </p>
                    <p className="font-display text-base md:text-lg font-bold italic"
                      style={{ color: "hsl(38 40% 32%)" }}>
                      {event.venue}                      
                    </p>
                     <p className="font-body text-sm md:text-base font-medium"
                      style={{ color: "hsl(38 30% 45%)" }}>
                      <a
                        href={`https://waze.com/ul?q=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm md:text-base font-medium underline cursor-pointer"
                      >
                      {event.address}
                      </a>
                    </p>
                  </div>                  
                  <div className="gold-divider w-12 mx-auto" />
                  <p className="font-body text-sm md:text-base italic leading-relaxed max-w-sm mx-auto description-text">
                    {event.description}
                  </p>
                  </div>
                </motion.div>
                </div>
              </>
            )}
 
            {isChabbat && (
               <>
              {/* 🔥 BACKGROUND CADRE */}
                <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("/src/assets/chabbat.png")`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.9,                
                  }}
              />
              <div
              style={{
                background: "rgba(255, 248, 238, 0.13)",
                backdropFilter: "blur(0px)",        
              }}
              >
                  {/* Arc headline */}
                <motion.p
                className="mt-[55px] text-center font-script text-4xl md:text-5xl "
                style={{ color: "hsl(var(--gold))" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: cardRevealed ? 1 : 0 }}
              >
                {event.title} Hatan              
                  <p className=" font-display text-xs md:text-sm font-semibold tracking-wider uppercase"
                    style={{ color: "hsl(38 45% 42%)" }}>
                    {event.date}
                  </p>                
              </motion.p>
 
                <motion.div
                  className="flex items-center justify-center "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: cardRevealed ? 1 : 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  
                </motion.div>
 
                <motion.div
                  className=""
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: cardRevealed ? 1 : 0, y: cardRevealed ? 0 : 10 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                   <div className="mt-[92px] md:mt-[260px]">
                    <p className=" font-display text-lg md:text-xl font-bold italic"
                    style={{ color: "hsl(40 50% 45%)" }}>
                    à {event.time}
                  </p>
                  </div> 
                  
                  <div className="mt-[30px]">
                    <p className="font-display text-base md:text-lg font-bold tracking-wide"
                      style={{ color: "hsl(38 40% 32%)" }}>
                      {event.venue}
                    </p>
                    <p className="font-body text-sm md:text-base font-medium"
                      style={{ color: "hsl(38 30% 45%)" }}>
                      <a
                        href={`https://waze.com/ul?q=${encodeURIComponent(event.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm md:text-base font-medium underline cursor-pointer"
                      >
                      {event.address}
                      </a>
                    </p>
                                   
                  <div className="mt-[10px] gold-divider w-12 mx-auto" />
                  <p className="font-body text-sm md:text-base text-muted-foreground italic leading-relaxed max-w-sm mx-auto description-text">
                    {event.description}
                  </p>
                  </div>
                </motion.div>
                </div>
              </>
            )}
 
          </div>
        </motion.div>
    </motion.div>
  );
};
 
export { EventDetail };
export default EventDetail;