"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

interface InvestmentCardProps {
    apr: number;
    name: string;
    aprExample: string;
    risk: string;
    estimatedFees: number;
    chain: string;
    trending?: boolean;
  }
  
  export default function InvestmentCard({
    apr,
    name,
    aprExample,
    risk,
    estimatedFees,
    chain,
    trending,
  }: InvestmentCardProps) {
    const { isConnected } = useAuth();
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
            <div className="flex flex-1">
              <Input className="bg-[#17404C] w-[9rem] rounded-r-none border-r-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" placeholder="Amount" />
              <Select>
                <SelectTrigger className="bg-[#17404C] border-[#B5CAA9/20] text-white w-[7rem] rounded-l-none cursor-pointer">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="wbtc">WBTC</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="dai">DAI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="font-medium py-[1rem] px-4 bg-light-green">
              <Link href="/my-investments">Invest</Link>
            </Button>
          </div>
        ) : (
          <p className="text-white text-center">Login to invest</p>
        )}
      </Card>
    );
  }