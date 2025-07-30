"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import Image from "next/image";

export default function HomePageConnectButton() {
    const { formattedValue, isLoading } = useWalletBalance();
    
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading'
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated')

                return (
                    <div>
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        className="bg-light-green border border-[#B5CAA9/20] hover:bg-light-green text-[#051419] hover:text-[#051419] font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        Get Started
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )
                            }

                            return (
                                <div className="bg-light-green border border-[#B5CAA9/20] text-[#051419] font-medium py-3 px-4 rounded-lg">
                                    <div className="text-sm">
                                        Available to invest: {isLoading ? "Loading..." : formattedValue}
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}