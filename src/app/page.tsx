import HowItWorks from "@/components/home/HowItWorks";
import Hero from "@/components/home/Hero";
import TopInvestments from "@/components/home/TopInvestments";

export default function Home() {
  return (
    <div className="bg-background font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-w-7xl mx-auto p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Hero />
        <HowItWorks />
        <TopInvestments />
      </main>
    </div>
  );
}
