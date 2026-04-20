import { useState, useEffect } from "react";
import Envelope from "@/components/Envelope";
import InvitationCard from "@/components/InvitationCard";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "auto" : "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleOpen = () => {
    setStartMusic(true);
    setIsOpen(true);
  };

  return (
    <div>
      <Envelope isOpen={isOpen} onOpen={handleOpen} />

      <BackgroundMusic start={startMusic} showControl={isOpen} />

      {isOpen && <InvitationCard />}
    </div>
  );
};

export default Index;
