"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import InvestmentInteraction from "./InvesementInteraction";

interface InvestmentCardProps {
  apr: number;
  name: string;
  aprExample: string;
  risk: string;
  estimatedFees: number;
  chain: string;
}

export default function InvestmentCard({
  apr,
  name,
  aprExample,
  risk,
  estimatedFees,
  chain,
}: InvestmentCardProps) {
  const { isConnected } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Card className="w-full h-20 bg-[#102E37] border border-[#B5CAA9/20] grid grid-cols-[1fr_1.25fr_1.2fr_2.5fr_1fr_1.2fr_1.5fr] gap-4 items-center p-3 px-6">
      <p className="text-light-green text-2xl font-bold">{apr}%</p>
      <p className="text-white text-[1.25rem]">{name}</p>
      <p className="text-white text-[1.25rem]">{chain}</p>
      <p className="text-white text-[1.25rem]">{aprExample}</p>
      <p className="text-white text-[1.25rem]">{risk}</p>
      <p className="text-white text-[1.25rem]">${estimatedFees}</p>
      {isConnected ? (
        <div className="flex flex-row gap-2 justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="font-medium py-[1.5rem] px-[2rem] text-[1rem] bg-light-green cursor-pointer">
                Invest
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="bg-black/80" />
              <DialogContent className="!max-w-[10rem] sm:!max-w-[40rem] bg-[#102E37]">
                <DialogTitle className="sr-only">Investment Dialog</DialogTitle>
                <InvestmentInteraction type="invest" />
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      ) : (
        <p className="text-white text-center">Login to invest</p>
      )}
    </Card>
  );
}
