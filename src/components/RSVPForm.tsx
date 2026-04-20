import { motion } from "framer-motion";
import { useState } from "react";
import type { EventData } from "./EventCard";
import GoldOrnament from "./GoldOrnament";
import BotanicalPattern from "./BotanicalPattern";
import initialeForm from "../assets/initialeform.png";

interface RSVPFormProps {
  events: EventData[];
}

const RSVPForm = ({ events }: RSVPFormProps) => {
  const params = new URLSearchParams(window.location.search);
  const family = params.get("family");

  const maxGuests = family === "haddad" ? 6 : 3;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    attending: "",
    eventResponses: {} as Record<string, { attending: "yes" | "no" | ""; guests: number }>,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (loading) return;

  if (!formData.firstName || !formData.lastName) {
    alert("Merci de renseigner votre prénom et nom.");
    return;
  }

  if (!formData.attending) {
    alert("Merci d’indiquer votre présence.");
    return;
  }

  if (formData.attending === "yes") {
    const totalEvents = events.length;

    const answeredEvents = Object.values(formData.eventResponses)
      .filter((val: any) => val && val.attending).length;

    if (answeredEvents < totalEvents) {
      alert("Merci de répondre à tous les événements.");
      return;
    }
  }

  setLoading(true);
  setSubmitted(true);

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    family: family,
    attending: formData.attending,
    message: formData.message,
    eventResponses: formData.eventResponses,
  };

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbzu0OCtLsFgJf7UyfpNjuBKJEcspSPyuxRH-F7q3dplHfwsUoAliY6zBcAfNW21LC3u/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      }
    );
  } catch (error) {
    console.error("Erreur envoi :", error);
  }
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
          <p className="font-body text-l text-muted-foreground">
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
          <div className="text-center">
            <p className=" texte-center uppercase -mt-[70px]">
              <img
              src={initialeForm}
              alt="RSVP"
              className="mx-auto w-32 md:w-44 object-contain"
            />
            </p>
            <h2 className="font-body font-bold text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5 -mt-[60px]">
            Réponse souhaitée s'il vous plaît
          </h2>
            <GoldOrnament className="" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="font-body font-bold text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-transparent border-b border-accent/80  focus:border-white outline-none font-body text-sm text-foreground py-1 transition-colors"
                />
              </div>
              <div>
                <label className="font-body font-bold text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-transparent border-b border-accent/80  focus:border-white outline-none font-body text-sm text-foreground py-1 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-body font-bold text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-2.5">
                Présence
              </label>
              <div className="flex gap-3 font-bold">
                {[
                  { value: "yes", label: "Accepte avec joie" },
                  { value: "no", label: "N'assistera pas" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: opt.value })}
                    className={`flex-1 py-2.5 rounded-[2px] border font-body text-xs tracking-wide transition-all ${
                      formData.attending === opt.value
                    ? "border-2 border-accent/50 text-foreground"
                    : "border-2 border-accent/20 text-muted-foreground hover:border-accent/20"
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
                  <label className="font-body font-bold text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-3">
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
                                className={`px-3 py-1 rounded-[2px] border font-body font-bold text-[10px] tracking-wide transition-all ${
                                  resp?.attending === "yes"
                                      ? "border-2 border-accent/50 text-foreground"
                                      : "border-2 border-accent/20 text-muted-foreground hover:border-accent/20"
                                }`}
                              >
                                Présent
                              </button>
                              <button
                                type="button"
                                onClick={() => setEventAttending(event.id, "no")}
                                className={`px-3 py-1 rounded-[2px] border font-body font-bold text-[10px] tracking-wide transition-all ${
                                  resp?.attending === "no"
                                      ? "border-2 border-accent/50 text-foreground"
                                      : "border-2 border-accent/20 text-muted-foreground hover:border-accent/20"
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
                              <span className="font-body font-bold text-[10px] text-muted-foreground tracking-wide">
                                Nombre de personnes :
                              </span>
                              <select
                                value={resp.guests}
                                onChange={(e) => setEventGuests(event.id, Number(e.target.value))}
                                className="bg-transparent border-b border-white/60 focus:border-white outline-none font-body text-xs text-foreground py-0.5 transition-colors w-12 text-center"
                                style={{ textAlignLast: "center" }}
                              >
                                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
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
              <label className="font-body font-bold text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-1.5">
                Un petit mot
              </label>
              <textarea
                value={formData.message}
                maxLength={1000}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={2}
                className="w-full bg-transparent border-b border-accent/80 outline-none font-body text-sm text-foreground py-0 h-8 transition-colors resize-none placeholder:text-[hsl(38_40%_32%)]"
                placeholder="Facultatif..."
              />
            </div>

            <div className="text-center pt-1">
              <motion.button
                type="submit"
                disabled={loading}
                className={`px-8 py-2.5 border-2 border-accent/50 text-foreground font-body font-bold text-xs tracking-[0.2em] uppercase rounded-[2px] transition-all ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/10"
                }`}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? "Envoi..." : "Envoyer"}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default RSVPForm;
