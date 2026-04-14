import { useState } from "react";
import Envelope from "@/components/Envelope";
import InvitationCard from "@/components/InvitationCard";
import BackgroundMusic from "@/components/BackgroundMusic";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Envelope isOpen={isOpen} onOpen={() => setIsOpen(true)} />

      <BackgroundMusic start={isOpen} />

      {isOpen && <InvitationCard />}
    </div>
  );
};

export default Index;
