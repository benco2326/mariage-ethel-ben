import { motion } from "framer-motion";
import jerusalemBg from "@/assets/jerusalem-stone-bg.jpg";
import type { EventData } from "./EventCard";
import GoldOrnament from "./GoldOrnament";
import RSVPForm from "./RSVPForm";
import Countdown from "./Countdown";
import CardStack from "./CardStack";

const SOIREE_DATE = new Date("2026-09-02T18:00:00");

const events: EventData[] = [
  {
    id: "chabbat",
    title: "Chabbat",
    date: "Vendredi 04 Septembre 2026",
    time: "19h00",
    venue: "Golden Tulip",
    address: "1 Rue du Paettit Marais, 95470, Saint Witz",
    mapQuery: "Saint Witz France",
    description:
      "Un moment de recueillement et de partage en famille pour accueillir le Chabbat ensemble.",
  },
  {
    id: "soiree",
    title: "Houppa & Soirée",
    date: "Mercredi 02 Septembre 2026",
    time: "18h00",
    venue: "Manège de Saint Cloud",
    address: "121bis Rue du Lieutenant Colonel de Montbrison, 92500, Reuil-Malmaison",
    mapQuery: "Manège de Saint Cloud",
    description:
      "La soirée se poursuivra avec musique et danse. Tenue de Tsinout souhaitée.",
  },
  {
    id: "henne",
    title: "Henné",
    date: "Lundi 31 Août 2026",
    time: "19h30",
    venue: "Le Manoir du Paris Country Club",
    address: "84 Av. de Fouilleuse, 92500, Reuil-Malmaison",
    mapQuery: "Le Manoir du Paris Country Club",
    description:
      "Une soirée traditionnelle où la mariée sera parée de henné dans une ambiance chaleureuse et festive.",
  },
  {
    id: "mairie",
    title: "Mairie",
    date: "Lundi 31 Août 2026",
    time: "11h00",
    venue: "Mairie de Vincennes",
    address: "Cours Marigny, 94300, Vincennes",
    mapQuery: "Mairie de Vincennes",
    description:
      "La cérémonie civile sera suivie d'un vin d'honneur.\nMerci de vous présenter 15 minutes avant l'heure.",
  },
];

const InvitationCard = () => {
  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: "hsl(38 14% 85%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Jerusalem stone background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${jerusalemBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Voile transparent pour atténuer le fond 
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundColor: "hsl(38 14% 90% / 0.55)" }}
      />*/}

      <div className="relative max-w-2xl mx-auto px-4 pt-10 md:pt-16 pb-10">
        {/* ====== HERO HEADER ====== */}
        <motion.div
          className="text-center mb-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="font-body text-xs md:text-sm tracking-[0.4em] uppercase"
            style={{ color: "hsl(35 15% 40%)" }}
          >
            Ensemble avec leurs familles
          </p>
          <h1 className="font-script text-6xl md:text-8xl gold-text leading-tight py-2">
            Ethel & Ben
          </h1>
          <GoldOrnament className="my-3" />
          <p
            className="font-display text-base md:text-lg tracking-[0.18em] uppercase font-medium"
            style={{ color: "hsl(35 12% 32%)" }}
          >
            ​ont le plaisir de vous convier à leur mariage 
          </p>
          <p
            className="font-body text-sm md:text-xl tracking-[0.2em] uppercase mt-1"
            style={{ color: "hsl(35 10% 38%)" }}
          >
            ​02 Septembre 2026 
          </p>

          <div className="mt-4 mb-2">
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "hsl(35 15% 40%)" }}>
              Le grand jour dans
            </p>
            <Countdown targetDate={SOIREE_DATE} />
          </div>
        </motion.div>

        {/* ====== STACKED CARDS ====== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <CardStack events={events} />
        </motion.div>

        {/* RSVP */}
        <div className="mt-12 relative" style={{ zIndex: 5 }}>
          <RSVPForm events={events} />
        </div>

        {/* Footer */}
        <motion.div
          className="mt-10 text-center space-y-3 relative"
          style={{ zIndex: 5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <GoldOrnament />
          <p className="font-script text-2xl md:text-3xl gold-text">Avec tout notre amour</p>
          <p
            className="font-body text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "hsl(35 15% 38%)" }}
          >
            Ethel & Ben
          </p>
        </motion.div>

        <div className="h-10" />
      </div>
    </motion.div>
  );
};

export default InvitationCard;
