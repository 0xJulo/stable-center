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
  BadgeCheck,
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
    <Card className="flex-1 flex flex-col gap-4 bg-[#b5e09c] px-4">
      <IconComponent className="w-8 h-8 text-[#17404C]" />
      <div className="flex flex-col gap-1">
        <h3 className="text-[#17404C] text-[1.25rem] font-medium">{title}</h3>
        <p className="text-[#17404C] leading-[1.2rem]">{description}</p>
      </div>
    </Card>
  );
}

export default function StablecoinExplainer() {
  return (
    <section
      id="what-are-stabelcoins"
      className="py-[8rem] pb-42 bg-light-green w-screen relative -mx-8 sm:-mx-20"
    >
      <div className="px-8 sm:px-20">
        <h2 className="text-[#17404C] mb-3">Why invest in Stablecoins?</h2>
        <div className="flex flex-col gap-2">
          <p className="w-3/4 text-[1.25rem] text-[#17404C]">
            The rise of stablecoins has reshaped crypto, evolving from niche
            tools to key finance assets, with market cap surging to over{" "}
            <span className="font-bold">$267 billion by August 2025</span> from
            $140 billion in early 2024, thanks to fiat-pegged stability amid
            volatility.
          </p>
          <p className="w-3/4 text-[1.25rem] text-[#17404C]">
            Enabling over{" "}
            <span className="font-bold">
              $27 trillion in annual transactions
            </span>{" "}
            for payments, DeFi, remittances, and more, they promise to redefine
            global money transfers as regulations advance and banking
            integration grows.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
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
          <StablecoinExplainerCard
            icon="ChartNoAxesCombined"
            title="Earn Passive Income"
            description="Invest and earn 5-15% annual returns, far above traditional savings accounts."
          />
          <StablecoinExplainerCard
            icon="Users"
            title="No Middleman"
            description="Skip banks and control your money directly with secure blockchain apps."
          />
          <StablecoinExplainerCard
            icon="ChartGantt"
            title="Flexibility"
            description="Choose from a variety of opportunities that match your preferences."
          />
          <StablecoinExplainerCard
            icon="BadgeCheck"
            title="Accessible to All"
            description="Unlock earning opportunities in DeFi with predictable returns."
          />
        </div>
      </div>
    </section>
  );
}
