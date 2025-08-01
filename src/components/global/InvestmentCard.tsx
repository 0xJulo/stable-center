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
    <Card className="w-full bg-[#102E37] border border-[#B5CAA9/20] grid grid-cols-[7%_9%_12%_18%_10%_10%_26%] gap-4 items-center p-3">
      <p className="text-light-green text-2xl font-bold">{apr}%</p>
      <p className="text-white text-1rem">{name}</p>
      <p className="text-white text-1rem">{chain}</p>
      <p className="text-white text-1rem">{aprExample}</p>
      <p className="text-white text-1rem">{risk}</p>
      <p className="text-white text-1rem">${estimatedFees}</p>
      {isConnected ? (
        <div className="flex flex-row gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="font-medium py-[1rem] px-4 bg-light-green cursor-pointer">
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
