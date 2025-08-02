"use client";

import { motion } from "motion/react";
import Image from "next/image";
import HomePageConnectButton from "@/components/home/HomePageConnectButton";

export default function Hero() {
  return (
    <div className="h-screen w-screen relative -mx-8 sm:-mx-20 -mt-2 sm:-mt-20 pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: "url(/hero-background.jpg)" }}
      ></div>
      <div className="relative z-0 flex flex-col gap-4 justify-center items-start w-full h-full py-12 px-8 sm:px-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 5.2 }}
          className="flex flex-row gap-2 items-center"
        >
          <Image src="/1inch2.png" alt="1inch" width={35} height={35} />
          <p className="text-[1rem] text-white">
            Powered by <span className="font-bold">1inch</span>
          </p>
        </motion.div>

        <motion.h1 className="text-[6.5rem] leading-[5.75rem] font-semibold flex flex-col justify-center items-start tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            Earn with stablecoins
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#d8fac5]"
          >
            without the headache.
          </motion.span>
        </motion.h1>

        <div className="flex flex-col gap-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-[1.5rem]"
          >
            Cross-chain opportunities with stable returns in one place.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="text-[1.5rem]"
          >
            We handle the complexity.{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 4 }}
              className="text-[#d8fac5]"
            >
              You reap the benefits.
            </motion.span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 5.2 }}
          className="flex flex-row gap-2 mt-6"
        >
          <HomePageConnectButton />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 5.2 }}
        className="absolute bottom-0 bg-light-green w-full h-16 flex justify-center items-center"
      >
        <p className="text-[#051419]">
          Built as part of ETH Global’s{" "}
          <span className="font-bold">Unite DeFi</span> Hackathon{" "}
        </p>
      </motion.div>
    </div>
  );
}
