"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { usePortfolioTokens } from "@/hooks/use-portfolio-tokens";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function HomePageConnectButton() {
  const { formattedValue, isLoading } = useWalletBalance();
  const { address, isConnected } = useAuth();

  // Fetch portfolio tokens data
  const {
    data: tokensData,
    loading: tokensLoading,
    error: tokensError,
    getNativeToken,
  } = usePortfolioTokens({
    address: address || "",
    chainId: "1", // Ethereum mainnet
    enabled: isConnected && !!address,
  });

  // Get native token data
  const nativeToken = getNativeToken();

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
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-light-green hover:bg-light-green/90 text-[#051419] font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <span className="text-[1rem]">Get started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                );
              }

              return (
                <div className="space-y-3">
                  <div className="bg-light-green border border-[#B5CAA9/20] text-[#051419] font-medium py-3 px-4 rounded-lg">
                    <div className="text-sm">
                      Available to invest:{" "}
                      {isLoading ? "Loading..." : formattedValue}
                    </div>
                  </div>

                  {/* Native token available for trading */}
                  {isConnected && address && (
                    <div className="bg-[#102E37] border border-[#B5CAA9/20] text-white font-medium py-3 px-4 rounded-lg">
                      <div className="text-sm">
                        {tokensLoading ? (
                          "Loading native token..."
                        ) : tokensError ? (
                          "Error loading token data"
                        ) : nativeToken ? (
                          <>
                            Available to trade to stables:{" "}
                            {nativeToken.underlying_tokens[0]?.amount.toFixed(
                              6
                            )}{" "}
                            {nativeToken.contract_symbol}
                            <span className="text-gray-400 ml-2">
                              (${nativeToken.value_usd.toFixed(2)})
                            </span>
                          </>
                        ) : (
                          "No native token found"
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
