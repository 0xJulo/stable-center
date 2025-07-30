"use client";

import { useState, useEffect } from "react";
import InvestmentCard from "@/components/global/InvestmentCard";
import { getInvestmentData, InvestmentCardData } from "@/lib/investment-data";

export default function AllInvestments({ id }: { id: string }) {
  const [allInvestments, setAllInvestments] = useState<InvestmentCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllInvestments = async () => {
      try {
        const data = await getInvestmentData();
        setAllInvestments(data);
      } catch (error) {
        console.error("Failed to fetch investment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllInvestments();
  }, []);

  if (loading) {
    return (
      <section id={id} className="flex flex-col gap-4 items-start w-full py-24">
        <h2>All investments</h2>
        <p className="text-white">Loading all investments...</p>
      </section>
    );
  }

  return (
    <section id={id} className="flex flex-col gap-4 items-start w-full py-24">
      <h2>All investments</h2>
      <div className="w-full grid grid-cols-[10%_12%_25%_10%_10%_26%] gap-4 items-start p-3">
        <p className="text-white text-[0.75rem]">APY</p>
        <p className="text-white text-[0.75rem]">Project</p>
        <p className="text-white text-[0.75rem]">Returns estimate</p>
        <p className="text-white text-[0.75rem]">Risks</p>
        <p className="text-white text-[0.75rem]">Estimated fees</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {allInvestments.map((investment, index) => (
          <InvestmentCard
            key={`${investment.name}-${index}`}
            apr={investment.apr}
            name={investment.name}
            aprExample={investment.aprExample}
            risk={investment.risk}
            estimatedFees={investment.estimatedFees}
            trending={investment.trending}
          />
        ))}
      </div>
    </section>
  );
}