"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import CustomConnectButton from "@/components/global/ConnectButton";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "motion/react";

export default function Header() {
  const { isConnected } = useAuth();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.8 }}
      className="fixed top-0 z-10 w-full flex justify-between items-center p-4 bg-[#051419e6] backdrop-blur-sm"
    >
      <div className="flex items-end gap-8">
        <Link href="/">
          <h1 className="text-white hover:text-light-green text-2xl font-bold cursor-pointer">
            StableCenter
          </h1>
        </Link>
        {isHomePage && (
          <nav className="flex items-center gap-4">
            <Link
              href="#how-it-works"
              className="text-white hover:text-light-green"
            >
              How it works
            </Link>
            <Link
              href="#top-investments"
              className="text-white hover:text-light-green"
            >
              Top Investments
            </Link>
            <Link
              href="#what-are-stabelcoins"
              className="text-white hover:text-light-green"
            >
              What are stablecoins?
            </Link>
            <Link
              href="#why-defi"
              className="text-white hover:text-light-green"
            >
              Why invest in DeFi?
            </Link>
            <Link
              href="#all-investments"
              className="text-white hover:text-light-green"
            >
              All Investments
            </Link>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isConnected && (
          <Button className="font-medium py-[1rem] px-4 bg-light-green">
            <Link href="/my-investments">My Investments</Link>
          </Button>
        )}
        <CustomConnectButton />
      </div>
    </motion.header>
  );
}
