import InvestmentCard from "@/components/home/InvestmentCard";

export default function TopInvestments() {
    return (
      <section id="top-investments" className="flex flex-col gap-4 items-center w-full py-24">
        <h2 className="text-light-green text-4xl font-bold">Top investments</h2>
        <div className="w-full grid grid-cols-[10%_12%_25%_10%_10%_26%] gap-4 items-center p-3">
          <p className="text-white text-[0.75rem]">APY</p>
          <p className="text-white text-[0.75rem]">Project</p>
          <p className="text-white text-[0.75rem]">Returns estimate</p>
          <p className="text-white text-[0.75rem]">Risks</p>
          <p className="text-white text-[0.75rem]">Estimated fees</p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <InvestmentCard
            apr={10.25}
            name="Uniswap v3"
            aprExample="$1,000 = $1,102.50 after one year"
            risk="low risk"
            estimatedFees={1.2}
          />
          <InvestmentCard
            apr={7.25}
            name="Uniswap v3"
            aprExample="$1,000 = $1,102.50 after one year"
            risk="low risk"
            estimatedFees={1.2}
          />
        </div>
      </section>
    );
  }