import { Card } from "@/components/ui/card";

interface HowItWorksCardProps {
    title: string;
    description: string;
  }
  
  function HowItWorksCard({ title, description }: HowItWorksCardProps) {
    return (
      <Card className="flex-1 bg-[#102E37] border border-[#B5CAA9/20] px-4 py-4">
        <h3 className="text-light-green text-[1.25rem] font-bold m-0 mb-1">{title}</h3>
        <p className="text-white text-1rem">{description}</p>
      </Card>
    );
  }
  
  export default function HowItWorks() {
    return (
      <section className="flex flex-col gap-4 items-center py-24">
        <h2 className="text-light-green text-4xl font-bold">How it works</h2>
        <div className="flex flex-row gap-4">
          <HowItWorksCard title="Login and connect your wallet" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          <HowItWorksCard title="One click invest" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          <HowItWorksCard title="Offramp your rewards" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        </div>
      </section>
    );
  }