import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, optimism, base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "StableCenter",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  chains: [mainnet, optimism, base],
  ssr: true,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_MAINNET!),
    [base.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_BASE_MAINNET!),
    [optimism.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_MAINNET!),
  },
});
