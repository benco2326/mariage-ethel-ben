import { motion } from "framer-motion";
import jerusalemBg from "@/assets/jerusalem-stone-bg.jpg";
import type { EventData } from "./EventCard";
import GoldOrnament from "./GoldOrnament";
import RSVPForm from "./RSVPForm";
import Countdown from "./Countdown";
import CardStack from "./CardStack";

const SOIREE_DATE = new Date("2026-09-02T18:00:00");

const allEvents: EventData[] = [
  {
    id: "chabbat",
    title: "Chabbat",
    date: "Vendredi 04 Septembre 2026",
    time: "19h00",
    venue: "Golden Tulip",
    address: "1 Rue du Petit Marais, 95470, Saint-Witz",
    mapQuery: "Saint Witz France",
    description:
      "Les chambres seront disponibles vers 16h30.",
  },
  {
    id: "soiree",
    title: "Houppa & Soirée",
    date: "Mercredi 02 Septembre 2026",
    time: "18h00",
    venue: "Manège de Saint Cloud",
    address: "121 Rue du Lieutenant Colonel de Montbrison, 92500, Reuil-Malmaison",
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
      "Johanna et Corine vous convient à la soirée du Henné.",
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
      "La cérémonie civile sera suivie d'un vin d'honneur.",
  },
];

const InvitationCard = () => {
 const params = new URLSearchParams(window.location.search);
  const invitationType = params.get("inv");
  const family = params.get("fam");

  const validInvitations = ["K9xA2", "ZpL88", "Qw7T1"];
  const validFamilies = ["korn", "cohen", "haddad"];

  const isValidInvitation =
    !!invitationType && validInvitations.includes(invitationType);

  const isValidFamily =
    !!family && validFamilies.includes(family);

  if (!isValidInvitation || !isValidFamily) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h2 className="font-script text-4xl mb-4" style={{ color: "hsl(38 40% 32%)" }}>
            Merci d’utiliser votre lien personnel.
          </h2>
        </div>
      </div>
    );
  }

  let allowedEventIds: string[] = [];

  if (invitationType === "K9xA2") {
    allowedEventIds = ["mairie", "soiree"];
  } else if (invitationType === "ZpL88") {
    allowedEventIds = ["mairie", "henne", "soiree"];
  } else {
    allowedEventIds = ["mairie", "henne", "soiree", "chabbat"];
  }

  const filteredEvents = allEvents.filter((event) =>
    allowedEventIds.includes(event.id)
  );
  return (
    <motion.div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "hsl(38 14% 85%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Jerusalem stone background */}
      <div
        className="fixed inset-0 pointer-events-none "
        style={{
          backgroundImage: `url(${jerusalemBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <div className="relative max-w-2xl mx-auto px-4 pt-10 md:pt-16 pb-10">
        {/* ====== HERO HEADER ====== */}
        <motion.div
          className="text-center mb-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
          <h1 className="font-script text-6xl md:text-8xl leading-tight py-2 "
          style={{ color: "hsl(38 40% 32%)" }}>
            Ethel & Ben
          </h1>
          
          <p
            className="font-script text-3xl md:text-5xl leading-tight -mt-1"
            style={{ color: "hsl(38 40% 32%)" }}
          >
            ​ont le plaisir de vous convier à leur mariage 
            <p> ​02 Septembre 2026 </p>
          </p>
          
          <div className="scale-125 md:scale-150">
            <p
              className="font-body text-xl md:text-3xl mb-2"
              style={{ color: "hsl(35 15% 40%)" }}
            >
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
          <CardStack events={filteredEvents} />
        </motion.div>

        {/* RSVP */}
        <div className="mt-12 relative" style={{ zIndex: 5 }}>
          <RSVPForm events={filteredEvents} />
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
          <p className="font-script text-4xl md:text-3xl"style={{ color: "hsl(38 40% 32%)" }}>
            Avec tout notre amour <br />
            Ethel & Ben
           </p>
        </motion.div>

        <div className="h-10" />
      </div>
    </motion.div>
  );
};

export default InvitationCard;
