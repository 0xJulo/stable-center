"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { User } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import Image from "next/image";

export default function CustomConnectButton() {
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
                                        className="bg-[#102E37] border border-[#B5CAA9/20] hover:bg-light-green text-light-green hover:text-[#051419] font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <User className="w-4 h-4" />
                                        Login
                                    </button>
                                )
                            }

                            return (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={openAccountModal}
                                        className="bg-[#102E37] border border-[#B5CAA9/20] hover:bg-light-green text-light-green hover:text-[#051419] font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <div className="text-sm font-medium">
                                            {account.displayName}
                                        </div>
                                    </button>
                                    <div className="bg-[#102E37] border border-[#B5CAA9/20] text-light-green font-medium py-2 px-4 rounded-lg">
                                        <div className="text-sm">
                                            {isLoading ? "Loading..." : formattedValue}
                                        </div>
                                    </div>
                                    <button
                                        onClick={openChainModal}
                                        className="bg-[#102E37] border border-[#B5CAA9/20] hover:bg-light-green text-light-green hover:text-[#051419] font-medium py-2 px-4 rounded-lg transition-colors flex items-center cursor-pointer"
                                    >
                                        {chain.hasIcon && (
                                            <div className="w-4 h-4">
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        width={16}
                                                        height={16}
                                                        className="w-4 h-4"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}