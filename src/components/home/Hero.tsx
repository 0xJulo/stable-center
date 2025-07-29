import ConnectButton from "@/components/ConnectButton";

export default function Hero() {
    return (
      <div className="flex flex-col gap-4 justify-center items-center py-12">
        <h1 className="text-7xl font-semibold flex flex-col justify-center items-center tracking-tight">
          <span className="text-white">Earn with your stablecoins</span>
          <span className="text-[#d8fac5]">without the headache.</span>
        </h1>
        <p className="text-[1.5rem]">
          We handle the complexity.{" "}
          <span className="text-[#d8fac5]">You earn.</span>
        </p>
        <div className="flex flex-row gap-2 mt-6">
          <ConnectButton />
        </div>
      </div>
    );
  }