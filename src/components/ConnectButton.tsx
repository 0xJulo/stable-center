"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { User } from "lucide-react";

export default function CustomConnectButton() {
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
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
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
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <div className="text-sm font-medium">
                                            {account.displayName}
                                        </div>
                                    </button>
                                    <button
                                        onClick={openChainModal}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                        {chain.hasIcon && (
                                            <div className="w-4 h-4">
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        className="w-4 h-4"
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <span className="text-sm">{chain.name}</span>
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