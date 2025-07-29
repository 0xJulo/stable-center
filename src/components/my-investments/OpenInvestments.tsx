import OpenInvestmentCard from "@/components/my-investments/OpenInvestmentCard";

export default function OpenInvestments() {
    return (
      <section id="open-investments" className="flex flex-col gap-4 items-center w-full py-24">
        <h2 className="text-light-green text-4xl font-bold">Open investments</h2>
        <div className="w-full grid grid-cols-[1fr_1.2fr_0.8fr_1fr_1fr_1fr_2.6fr] gap-4 items-center p-3">
          <p className="text-white text-[0.75rem]">APY</p>
          <p className="text-white text-[0.75rem]">Project</p>
          <p className="text-white text-[0.75rem]">Investment</p>
          <p className="text-white text-[0.75rem]">Risks</p>
          <p className="text-white text-[0.75rem]">Total rewards</p>
          <p className="text-white text-[0.75rem]">Unclaimed</p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <OpenInvestmentCard
            apr={10.25}
            name="Uniswap v3"
            aprExample="$1,108"
            risk="low risk"
            estimatedFees={1.2}
          />
          <OpenInvestmentCard
            apr={7.25}
            name="Uniswap v3"
            aprExample="$1,108"
            risk="low risk"
            estimatedFees={1.2}
          />
        </div>
      </section>
    );
  }