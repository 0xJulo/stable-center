"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface InvestmentCardProps {
    apr: number;
    name: string;
    chain: string;
    risk: string;
    totalRewards: number;
    unclaimedRewards: number;
    investedAmount: number;
  }

function InvestmentActions({ 
  onClaimRewards, 
  onWithdraw, 
  onAdd 
}: {
  onClaimRewards: () => void;
  onWithdraw: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-row gap-2">
      <Button onClick={onClaimRewards} className="font-medium py-[1rem] px-4 bg-light-green cursor-pointer">
        Claim Rewards
      </Button>
      <Button onClick={onWithdraw} className="font-medium py-[1rem] px-4 bg-light-green cursor-pointer">
        Withdraw
      </Button>
      <Button onClick={onAdd} className="font-medium py-[1rem] px-4 bg-light-green cursor-pointer">
        Add
      </Button>
    </div>
  );
}

function WithdrawInput({ 
  onBack, 
  onConfirm 
}: {
  onBack: () => void;
  onConfirm: (amount: string) => void;
}) {
  const [amount, setAmount] = useState('');
  
  return (
    <div className="flex flex-row gap-2 items-center">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        size="sm"
        className="p-1 h-8 w-8 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Input 
        type="number" 
        placeholder="Amount in USD" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="flex-1 bg-[#17404C]"
      />
      <Button 
        onClick={() => onConfirm(amount)} 
        className="font-medium py-[1rem] px-4 bg-light-green cursor-pointer"
      >
        Withdraw
      </Button>
    </div>
  );
}

function AddInput({ 
  onBack, 
  onConfirm 
}: {
  onBack: () => void;
  onConfirm: (amount: string) => void;
}) {
  const [amount, setAmount] = useState('');
  
  return (
    <div className="flex flex-row gap-2 items-center">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        size="sm"
        className="p-1 h-8 w-8 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Input 
        type="number" 
        placeholder="Amount in USD" 
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="flex-1 bg-[#17404C]"
      />
      <Button 
        onClick={() => onConfirm(amount)} 
        className="font-medium py-[1rem] px-4 bg-light-green cursor-pointer"
      >
        Add
      </Button>
    </div>
  );
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
    const [mode, setMode] = useState<'default' | 'withdraw' | 'add'>('default');
    return (
      <Card className="w-full bg-[#102E37] border border-[#B5CAA9/20] grid grid-cols-[1fr_1.1fr_0.9fr_0.8fr_1fr_1fr_1fr_2.6fr] gap-4 items-center p-3">
        <p className="text-light-green text-2xl font-bold">{apr}%</p>
        <p className="text-white text-1rem">{name}</p>
        <p className="text-white text-1rem">{chain}</p>
        <p className="text-white text-1rem">${investedAmount}</p>
        <p className="text-white text-1rem">{risk}</p>
        <p className="text-white text-1rem">${totalRewards}</p>
        <p className="text-white text-1rem">${unclaimedRewards}</p>
        {mode === 'default' && (
          <InvestmentActions 
            onClaimRewards={() => console.log('Claim rewards')}
            onWithdraw={() => setMode('withdraw')}
            onAdd={() => setMode('add')}
          />
        )}
        {mode === 'withdraw' && (
          <WithdrawInput 
            onBack={() => setMode('default')}
            onConfirm={(amount) => {
              console.log('Withdraw amount:', amount);
              setMode('default');
            }}
          />
        )}
        {mode === 'add' && (
          <AddInput 
            onBack={() => setMode('default')}
            onConfirm={(amount) => {
              console.log('Add amount:', amount);
              setMode('default');
            }}
          />
        )}
      </Card>
    );
  }