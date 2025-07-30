"use client";

import { motion } from "motion/react";
import Image from "next/image";
import HomePageConnectButton from "@/components/home/HomePageConnectButton";

export default function Hero() {
  return (
    <div className="flex flex-col gap-4 justify-center items-start py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="flex flex-row gap-2 items-center"
      >
        <Image src="/1inch2.png" alt="1inch" width={35} height={35} />
        <p className="text-sm text-white">
          Powered by <span className="font-bold">1inch</span>
        </p>
      </motion.div>

      <motion.h1 className="text-[5.25rem] leading-[5.25rem] font-semibold flex flex-col justify-center items-start tracking-tight">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          Earn with your stablecoins
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#d8fac5]"
        >
          without the headache.
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-[1.5rem]"
      >
        We handle the complexity.{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-[#d8fac5]"
        >
          You reap the benefits.
        </motion.span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.8 }}
        className="flex flex-row gap-2 mt-6"
      >
        <HomePageConnectButton />
      </motion.div>
    </div>
  );
}
