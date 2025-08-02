import HowItWorks from "@/components/home/HowItWorks";
import Hero from "@/components/home/Hero";
import TopInvestments from "@/components/global/TopInvestments";
import AllInvestments from "@/components/global/AllInvestments";
import StablecoinExplainer from "@/components/home/StablecoinExplainer";


export default function Home() {
  return (
    <div className="bg-background font-sans grid grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen w-full px-8  gap-16 sm:px-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-start">
        <Hero />
        <HowItWorks />
        {/* <TopInvestments id="top-investments" /> */}
        <StablecoinExplainer />
        <AllInvestments id="all-investments" />
      </main>
    </div>
  );
}
