"use client";

import { useState, useEffect } from "react";
import InvestmentCard from "@/components/global/InvestmentCard";
import { getInvestmentData, InvestmentCardData } from "@/lib/investment-data";
import Link from "next/link";

export default function AllInvestments({ id, manage }: { id: string; manage?: boolean }) {
  const [allInvestments, setAllInvestments] = useState<InvestmentCardData[]>(
    []
  );
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
    <section id={id} className="flex flex-col gap-4 items-start w-full pt-24">
      <div className="flex flex-col gap-8 mb-24">
        {manage ? (
          <div>
            <h2>All investments</h2>
          </div>
        ) : (
          <>
            <div>
              <h2 className="mb-3">Ready to get started?</h2>
              <p className="w-3/4 text-[1.15rem]">
                Login and connect your wallet to access exciting stablecoin
                opportunities across different chains. Select form the protocols
                that match your personal preferences, and managed their growth in
                your dedicated dashboard.
              </p>
            </div>
            <Link href="" className="text-[1rem] text-light-green underline">
              New to the blockchain and need some help?
            </Link>
          </>
        )}
      </div>
      <div className="w-full grid grid-cols-[1fr_1.25fr_1.2fr_2.5fr_1fr_1.2fr_1.5fr] gap-4 items-start p-3 px-6">
        <p className="text-white text-[1rem]">APY</p>
        <p className="text-white text-[1rem]">Project</p>
        <p className="text-white text-[1rem]">Chain</p>
        <p className="text-white text-[1rem]">Returns estimate</p>
        <p className="text-white text-[1rem]">Risks</p>
        <p className="text-white text-[1rem]">Estimated fees</p>
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
            chain={investment.chain}
          />
        ))}
      </div>
    </section>
  );
}
