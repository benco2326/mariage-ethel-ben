import { motion } from "framer-motion";
import { useState } from "react";
import type { EventData } from "./EventCard";
import GoldOrnament from "./GoldOrnament";
import BotanicalPattern from "./BotanicalPattern";

interface RSVPFormProps {
  events: EventData[];
}

const RSVPForm = ({ events }: RSVPFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    attending: "",
    eventResponses: {} as Record<string, { attending: "yes" | "no" | ""; guests: number }>,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const setEventAttending = (id: string, value: "yes" | "no") => {
    setFormData((prev) => ({
      ...prev,
      eventResponses: {
        ...prev.eventResponses,
        [id]: { attending: value, guests: prev.eventResponses[id]?.guests || 1 },
      },
    }));
  };

  const setEventGuests = (id: string, guests: number) => {
    setFormData((prev) => ({
      ...prev,
      eventResponses: {
        ...prev.eventResponses,
        [id]: { ...prev.eventResponses[id], guests },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="cardboard-surface-deep rounded-[4px] p-8 md:p-12 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ boxShadow: "0 12px 40px hsl(0 0% 0% / 0.18)" }}
      >
        <BotanicalPattern className="absolute inset-0 w-full h-full pointer-events-none text-foreground" style={{ opacity: 0.2 }} />
        <div className="relative z-10">
          <h3 className="font-script text-3xl gold-text mb-2">Merci</h3>
          <GoldOrnament className="my-3" />
          <p className="font-body text-sm text-muted-foreground">
            Votre réponse a bien été enregistrée.
            {formData.attending === "yes" && " Nous avons hâte de vous retrouver !"}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.6 }}
    >
      <div
        className="cardboard-surface-deep rounded-[4px] relative overflow-hidden"
        style={{ boxShadow: "0 12px 40px hsl(0 0% 0% / 0.18), 0 4px 12px hsl(0 0% 0% / 0.08)" }}
      >
        <BotanicalPattern className="absolute inset-0 w-full h-full pointer-events-none text-foreground" style={{ opacity: 0.2 }} />
        {/* Corner ornaments */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl-[2px] pointer-events-none" style={{ borderColor: "hsl(var(--gold) / 0.15)" }} />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-[2px] pointer-events-none" style={{ borderColor: "hsl(var(--gold) / 0.15)" }} />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 rounded-bl-[2px] pointer-events-none" style={{ borderColor: "hsl(var(--gold) / 0.15)" }} />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-[2px] pointer-events-none" style={{ borderColor: "hsl(var(--gold) / 0.15)" }} />

        <div className="p-8 md:p-12 relative z-10">
          <div className="text-center mb-8">
            <p className="font-body text-[10px] text-muted-foreground tracking-[0.35em] uppercase mb-2">
              Répondez s'il vous plaît
            </p>
            <h2 className="font-script text-3xl md:text-4xl gold-text">
              RSVP
            </h2>
            <GoldOrnament className="mt-3" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-transparent border-b border-border focus:border-accent outline-none font-body text-sm text-foreground py-1.5 transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-transparent border-b border-border focus:border-accent outline-none font-body text-sm text-foreground py-1.5 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-2.5">
                Présence
              </label>
              <div className="flex gap-3">
                {[
                  { value: "yes", label: "Accepte avec joie" },
                  { value: "no", label: "Décline avec regret" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: opt.value })}
                    className={`flex-1 py-2.5 rounded-[2px] border font-body text-xs tracking-wide transition-all ${
                      formData.attending === opt.value
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-accent/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {formData.attending === "yes" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-5">
                {/* Per-event attendance with individual guest count */}
                <div>
                  <label className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-3">
                    Pour chaque événement
                  </label>
                  <div className="space-y-3">
                    {events.map((event) => {
                      const resp = formData.eventResponses[event.id];
                      return (
                        <div key={event.id} className="py-2.5 border-b border-border/50 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-body text-xs text-foreground flex-1 min-w-0 truncate">
                              {event.title}
                            </span>
                            <div className="flex gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => setEventAttending(event.id, "yes")}
                                className={`px-3 py-1 rounded-[2px] border font-body text-[10px] tracking-wide transition-all ${
                                  resp?.attending === "yes"
                                    ? "border-accent bg-accent/15 text-foreground"
                                    : "border-border/60 text-muted-foreground hover:border-accent/40"
                                }`}
                              >
                                Présent
                              </button>
                              <button
                                type="button"
                                onClick={() => setEventAttending(event.id, "no")}
                                className={`px-3 py-1 rounded-[2px] border font-body text-[10px] tracking-wide transition-all ${
                                  resp?.attending === "no"
                                    ? "border-destructive/50 bg-destructive/10 text-foreground"
                                    : "border-border/60 text-muted-foreground hover:border-accent/40"
                                }`}
                              >
                                Absent
                              </button>
                            </div>
                          </div>
                          {resp?.attending === "yes" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="flex items-center gap-2 pl-1"
                            >
                              <span className="font-body text-[10px] text-muted-foreground tracking-wide">
                                Nombre de personnes :
                              </span>
                              <select
                                value={resp.guests}
                                onChange={(e) => setEventGuests(event.id, Number(e.target.value))}
                                className="bg-transparent border-b border-border focus:border-accent outline-none font-body text-xs text-foreground py-0.5 transition-colors w-12 text-center"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                  <option key={n} value={n}>{n}</option>
                                ))}
                              </select>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <label className="font-body text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                Un petit mot
              </label>
              <textarea
                value={formData.message}
                maxLength={1000}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={2}
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none font-body text-sm text-foreground py-1.5 transition-colors resize-none"
                placeholder="Facultatif..."
              />
            </div>

            <div className="text-center pt-3">
              <motion.button
                type="submit"
                className="px-8 py-2.5 border border-accent/50 text-foreground font-body text-xs tracking-[0.2em] uppercase rounded-[2px] hover:bg-accent/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default RSVPForm;
