"use client";

import { useState, useEffect } from "react";
import OpenInvestmentCard from "@/components/my-investments/OpenInvestmentCard";
import { getOpenInvestmentData, OpenInvestmentData } from "@/lib/open-data";

export default function OpenInvestments() {
  const [openInvestments, setOpenInvestments] = useState<OpenInvestmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpenInvestments = async () => {
      try {
        const data = await getOpenInvestmentData();
        setOpenInvestments(data);
      } catch (error) {
        console.error("Failed to fetch open investment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpenInvestments();
  }, []);

  if (loading) {
    return (
      <section id="open-investments" className="flex flex-col gap-4 items-start w-full py-24">
        <h2>Open investments</h2>
        <p className="text-white">Loading open investments...</p>
      </section>
    );
  }

  return (
    <section id="open-investments" className="flex flex-col gap-4 items-start w-full py-24">
      <h2>Open investments</h2>
      <div className="w-full grid grid-cols-[1fr_1.2fr_0.8fr_1fr_1fr_1fr_2.6fr] gap-4 items-start p-3">
        <p className="text-white text-[0.75rem]">APY</p>
        <p className="text-white text-[0.75rem]">Project</p>
        <p className="text-white text-[0.75rem]">Investment</p>
        <p className="text-white text-[0.75rem]">Risks</p>
        <p className="text-white text-[0.75rem]">Total rewards</p>
        <p className="text-white text-[0.75rem]">Unclaimed</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {openInvestments.map((investment, index) => (
          <OpenInvestmentCard
            key={`${investment.name}-${index}`}
            apr={investment.apr}
            name={investment.name}
            investedAmount={investment.investedAmount}
            risk={investment.risk}
            totalRewards={investment.totalRewards}
            unclaimedRewards={investment.unclaimedRewards}
          />
        ))}
      </div>
    </section>
  );
}