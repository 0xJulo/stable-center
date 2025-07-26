import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, optimism } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'StableCenter',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  chains: [mainnet, optimism],
  ssr: true,
})