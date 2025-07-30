"use client";

import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

interface HowItWorksCardProps {
  title: string;
  description: string;
}

function HowItWorksCard({ title, description }: HowItWorksCardProps) {
  return (
    <Card className="flex-1 bg-[#0C2329] border border-[#B5CAA9/20] flex flex-col gap-2 px-4 pt-4 pb-6">
      <h3 className="text-light-green text-[1.25rem] font-medium m-0">
        {title}
      </h3>
      <p className="text-white text-1rem mt-0">{description}</p>
    </Card>
  );
}

export default function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 4, ease: "easeOut" }}
      className="flex flex-col gap-4 items-start py-24"
    >
      <h2>How it works</h2>
      <div className="flex flex-row gap-4 mt-1">
        <HowItWorksCard
          title="Login and connect your wallet"
          description="SIgn in with your existing wallet to StableCenter. New to the blockchain? Don’t worry, we’ve got you covered below."
        />
        <HowItWorksCard
          title="One click invest"
          description="Select an investment that matches your preferences, such as APY, risk tolerance or project name. Enter the amount and complete your transaction."
        />
        <HowItWorksCard
          title="Offramp your rewards"
          description="Track your investments in your dedicated portal, including offramping your funds to your bank through Transakt offramping (future development)."
        />
      </div>
    </motion.section>
  );
}
