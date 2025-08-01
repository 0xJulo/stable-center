"use client";

import { useState, useEffect } from "react";
import InvestmentCard from "@/components/global/InvestmentCard";
import { getInvestmentData, InvestmentCardData } from "@/lib/investment-data";

export default function TopInvestments({ id }: { id: string }) {
  const [topInvestments, setTopInvestments] = useState<
    InvestmentCardData[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopInvestments = async () => {
      try {
        const data = await getInvestmentData();
        // Show top 3 investments by APR
        const topByApr = data.sort((a, b) => b.apr - a.apr).slice(0, 3);
        setTopInvestments(topByApr);
      } catch (error) {
        console.error("Failed to fetch investment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopInvestments();
  }, []);

  if (loading) {
    return (
      <section id={id} className="flex flex-col gap-4 items-start w-full py-24">
        <h2>Top investments</h2>
        <p className="text-white">Loading top investments...</p>
      </section>
    );
  }

  return (
    <section id={id} className="flex flex-col gap-4 items-start w-full py-24">
      <h2>Top investments</h2>
      <p className="w-3/4 text-[1.15rem] mb-12">
        Below are our recommended top investments to get started! You may also use other
        assets to invest, such as ETH, and we will handle the swap and
        investment for you. If cross-chain swaps are
        required, we will do that also.
      </p>
      <div className="w-full grid grid-cols-[7%_9%_12%_18%_10%_10%_26%] gap-4 items-start p-3">
        <p className="text-white text-[0.75rem]">APY</p>
        <p className="text-white text-[0.75rem]">Project</p>
        <p className="text-white text-[0.75rem]">Chain</p>
        <p className="text-white text-[0.75rem]">Returns estimate</p>
        <p className="text-white text-[0.75rem]">Risks</p>
        <p className="text-white text-[0.75rem]">Estimated fees</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {topInvestments.map((investment, index) => (
          <InvestmentCard
            key={`${investment.name}-${index}`}
            apr={investment.apr}
            name={investment.name}
            aprExample={investment.aprExample}
            risk={investment.risk}
            estimatedFees={investment.estimatedFees}
            chain={investment.chain}
          />
        ))}
      </div>
    </section>
  );
}
