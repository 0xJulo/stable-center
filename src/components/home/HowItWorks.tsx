"use client";

import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";

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

interface StepsProps {
  step: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  bottomBorder?: boolean;
}

function Steps({ step, title, description, children, bottomBorder = true }: StepsProps) {
  return (
    <div className={`flex flex-col gap-4 w-[75%] ${bottomBorder ? "border-b border-light-stroke pb-24" : "pb-0"}`}>
      <div className="flex flex-col gap-0">
        <p className="text-[1rem] text-light-green">{step}</p>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-[1.5rem] leading-[2rem]">{description}</p>
      {children}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      className="flex flex-col gap-24 items-start py-24 pb-36"
      id="how-it-works"
    >
      <h2>How it works</h2>
      <div className="flex flex-col gap-24 mt-1">
        {/* <HowItWorksCard
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
        /> */}
        <Steps
          step="Step 1"
          title="Login and connect your wallet"
          description="Login with your existing wallet, or create a new one, to quickly access a whole range of investment opportunities across multiple networks."
        >
          <Link href="" className="text-[1rem] text-light-green underline">
            New to the blockchain and need some help?
          </Link>
        </Steps>
        <Steps
          step="Step 2"
          title="Select an investment"
          description="There are a range of good investment opportunities across multiple chains, don’t worry we’ve got you covered when it comes to accessing them. By leveraging 1inch Protocol we handle cross-chain operations, leaving you to selecting the most appropriate one for you regardless of where they are. "
        ></Steps>
        <Steps
          step="Step 3"
          title="Select your asset"
          description="The investment opportunities we offer are in stablecoins, but you may use other assets such as ETH to invest in these. If you opt to invest using a non-stable asset, we will handle the swap for you whether this is on the same chain or cross-chain."
        ></Steps>
        <Steps
          step="Step 4"
          title="Invest & manage"
          description="Manage your open positions, add or withdraw funds, claim rewards and track your rewards all from one convenient and easy to use interface. "
          bottomBorder={false}
        ></Steps>
      </div>
    </section>
  );
}
