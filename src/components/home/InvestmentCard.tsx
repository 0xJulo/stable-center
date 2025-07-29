import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface InvestmentCardProps {
    apr: number;
    name: string;
    aprExample: string;
    risk: string;
    estimatedFees: number;
  }
  
  export default function InvestmentCard({
    apr,
    name,
    aprExample,
    risk,
    estimatedFees,
  }: InvestmentCardProps) {
    return (
      <Card className="w-full bg-[#102E37] border border-[#B5CAA9/20] grid grid-cols-[10%_12%_25%_10%_10%_26%] gap-4 items-center p-3">
        <p className="text-light-green text-2xl font-bold">{apr}%</p>
        <p className="text-white text-1rem">{name}</p>
        <p className="text-white text-1rem">{aprExample}</p>
        <p className="text-white text-1rem">{risk}</p>
        <p>$1.20</p>
        <div className="flex flex-row gap-2">
          <Input type="number" placeholder="Amount in USD" />
          <Button className="font-medium py-[1rem] px-4 bg-light-green">
            <Link href="/my-investments">Invest</Link>
          </Button>
        </div>
      </Card>
    );
  }