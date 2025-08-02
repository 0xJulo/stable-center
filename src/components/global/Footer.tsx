import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-row bg-[#051419] items-center justify-between w-full px-6 py-8">
      <div
        className="flex flex-col gap-0
         items-start"
      >
        <h4 className="text-white hover:text-light-green text-2xl font-medium cursor-pointer">
          Stable<span className="font-bold">Center</span>
        </h4>
        <p className="text-white">v0.1</p>
      </div>
      <div className="flex flex-col gap-0 items-end">
        <p className="text-white">
          Built as part of ETH Global’s{" "}
          <span className="font-bold">Unite DeFi</span> Hackathon{" "}
        </p>
        <Link
          href="https://github.com/0xJulo/stable-center"
          className="text-light-green hover:underline cursor-pointer flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
          <ExternalLink size={16} />
        </Link>
      </div>
    </footer>
  );
}
