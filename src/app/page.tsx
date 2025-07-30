import HowItWorks from "@/components/home/HowItWorks";
import Hero from "@/components/home/Hero";
import TopInvestments from "@/components/global/TopInvestments";
import AllInvestments from "@/components/global/AllInvestments";

import { Card } from "@/components/ui/card";
import {
  ChartGantt,
  ChartNoAxesCombined,
  PiggyBank,
  Globe,
  HandCoins,
  Landmark,
  Users,
  BadgeCheck,
} from "lucide-react";

const iconMap = {
  ChartGantt,
  ChartNoAxesCombined,
  PiggyBank,
  Globe,
  HandCoins,
  Landmark,
  Users,
  BadgeCheck
};

interface StablecoinExplainerCardProps {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
}

function StablecoinExplainerCard({
  icon,
  title,
  description,
}: StablecoinExplainerCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Card className="flex-1 flex flex-col gap-2 bg-[#0C2329] border border-[#B5CAA9/20] px-4">
      <IconComponent className="w-8 h-8 text-light-green" />
      <div className="flex flex-col gap-0">
        <h3 className="text-light-green text-[1.25rem] font-medium">{title}</h3>
        <p>{description}</p>
      </div>
    </Card>
  );
}

function WhatAreStabelcoins() {
  return (
    <section id="what-are-stabelcoins" className="my-[8rem]">
      <h2>What are Stabelccoins?</h2>
      <p className="w-3/4 text-[1.15rem]">
        Stablecoins are cryptocurrencies designed to hold a steady value,
        typically tied to assets like the US dollar. Unlike other crypto assets
        such as Bitcoin, Ethereum or Solana, which can be volatile, stabelcoins
        like USDC or USDT stay close to $1, making them reliable for everyday
        use and investing.
      </p>
      <div className="flex flex-row gap-4 mt-12">
        <StablecoinExplainerCard
          icon="Landmark"
          title="Stability"
          description="Avoid crypto price swings, so your money holds its value."
        />
        <StablecoinExplainerCard
          icon="HandCoins"
          title="Ease of Use"
          description="Spend, save, or invest like digital cash without worrying about volatility."
        />
        <StablecoinExplainerCard
          icon="Globe"
          title="Global Access"
          description="Send money across borders instantly, with low fees compared to banks."
        />
        <StablecoinExplainerCard
          icon="PiggyBank"
          title="Investment Opportunities"
          description="Unlock earning opportunities in DeFi with predictable returns."
        />
      </div>
    </section>
  );
}

function WhyDeFi() {
  return (
    <section id="why-defi" className="my-[8rem]">
      <h2>Why invest in DeFi?</h2>
      <p className="w-3/4 text-[1.15rem]">
        Decentralized Finance (DeFi) lets you earn money by putting your crypto
        to work in app built on the blockchain, such as Ethereum or Solana. With
        StableCenter, you do not need to know about these chains or how they
        function, we take of that for you!
      </p>
      <div className="flex flex-row gap-4 mt-12">
        <StablecoinExplainerCard
          icon="ChartNoAxesCombined"
          title="Earn Passive Icon"
          description="Invest and earn 5-15% annuals returns, far above traditional savings accounts."
        />
        <StablecoinExplainerCard
          icon="Users"
          title="No Middleman"
          description="Skips banks and control your money directly with secure blockchain apps."
        />
        <StablecoinExplainerCard
          icon="ChartGantt"
          title="Flexibility"
          description="Choose from a variety of opportunities that match your preferences."
        />
        <StablecoinExplainerCard
          icon="BadgeCheck"
          title="Accessible to All"
          description="UUnlock earning opportunities in DeFi with predictable returns."
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-w-[95rem] mx-auto p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-start">
        <Hero />
        <HowItWorks />
        <TopInvestments id="trending-investments" />
        <WhatAreStabelcoins />
        <WhyDeFi />
        <AllInvestments id="all-investments" />
      </main>
    </div>
  );
}
