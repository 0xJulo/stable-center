"use client"

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
import { useState } from "react";
import InvestmentInteraction from "../global/InvesementInteraction";

interface InvestmentCardProps {
    apr: number;
    name: string;
    chain: string;
    risk: string;
    totalRewards: number;
    unclaimedRewards: number;
    investedAmount: number;
  }

  
export default function OpenInvestmentCard({
  apr,
  name,
  chain,
  risk,
  totalRewards,
  unclaimedRewards,
  investedAmount,
}: InvestmentCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Card className="w-full h-20 bg-[#102E37] border border-[#B5CAA9/20] grid grid-cols-[1fr_1.1fr_0.9fr_0.8fr_1fr_1fr_1fr_2.6fr] gap-4 items-center p-3">
      <p className="text-light-green text-2xl font-bold">{apr}%</p>
      <p className="text-white text-[1.25rem]">{name}</p>
      <p className="text-white text-[1.25rem]">{chain}</p>
      <p className="text-white text-[1.25rem]">${investedAmount}</p>
      <p className="text-white text-[1.25rem]">{risk}</p>
      <p className="text-white text-[1.25rem]">${totalRewards}</p>
      <p className="text-white text-[1.25rem]">${unclaimedRewards}</p>
      <div className="flex flex-row gap-2 justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-medium py-[1.5rem] px-[2rem] text-[1rem] bg-light-green cursor-pointer">
              Manage
            </Button>
          </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/80" />
          <DialogContent className="!max-w-[10rem] sm:!max-w-[40rem] bg-[#102E37]">
            <DialogTitle className="sr-only">Manage Investment Dialog</DialogTitle>
            <InvestmentInteraction type="manage" />
          </DialogContent>
        </DialogPortal>
      </Dialog>
      </div>
    </Card>
  );
}