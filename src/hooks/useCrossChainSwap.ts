"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWalletClient,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
  useBalance,
} from "wagmi";
import { base } from "wagmi/chains";
import { parseUnits } from "ethers";

// ERC20 ABI
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Morpho Vault ABI
const MORPHO_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Constants
const MORPHO_VAULT_ADDRESS = "0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183";
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_DECIMALS = 6;

export interface SwapState {
  status:
    | "idle"
    | "swapping"
    | "approving"
    | "depositing"
    | "complete"
    | "error";
  progress: number;
  message: string;
  error?: string;
  swapHash?: string;
  approvalHash?: string;
  depositHash?: string;
}

export function useCrossChainSwap() {
  const { address, chain } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Use chain.id as the primary source, fallback to chainId
  const currentChainId = chain?.id || chainId;

  const [swapState, setSwapState] = useState<SwapState>({
    status: "idle",
    progress: 0,
    message: "Ready to invest",
  });

  const [amount, setAmount] = useState<string>("");
  const [pendingStep, setPendingStep] = useState<null | "approve" | "deposit">(
    null
  );
  const [depositTrigger, setDepositTrigger] = useState(0);
  const [approvalTrigger, setApprovalTrigger] = useState(0);
  const [isChainSwitching, setIsChainSwitching] = useState(false);
  const [isOnBaseChain, setIsOnBaseChain] = useState(false);

  // Check if amount is valid
  const isValidAmount = Boolean(
    !!amount && !isNaN(Number(amount)) && Number(amount) > 0 && address
  );

  // Get user balance
  const { data: balanceData } = useBalance({
    address,
    token: USDC_ADDRESS as `0x${string}`,
  });

  const parsedAmount = parseFloat(amount) || 0;
  const userBalance = balanceData?.value
    ? Number(balanceData.value) / Math.pow(10, USDC_DECIMALS)
    : 0;
  const notEnoughBalance = parsedAmount > userBalance;

  // Approve transaction simulation - hardcoded to Base chain
  const shouldSimulateApprove = isValidAmount && approvalTrigger > 0;

  console.log("🔍 Approval simulation conditions:", {
    isValidAmount,
    approvalTrigger,
    shouldSimulateApprove,
  });

  const { data: dataApproveTransaction, error: errorApproveTransaction } =
    useSimulateContract(
      shouldSimulateApprove
        ? {
            address: USDC_ADDRESS as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [
              MORPHO_VAULT_ADDRESS as `0x${string}`,
              parseUnits(amount, USDC_DECIMALS),
            ],
            chainId: 8453, // Hardcoded to Base chain
          }
        : undefined
    );

  // Debug approval simulation
  useEffect(() => {
    if (shouldSimulateApprove) {
      console.log("🔍 Approval simulation triggered:", {
        shouldSimulateApprove,
        approvalTrigger,
        dataApproveTransaction,
        errorApproveTransaction,
      });
    }
  }, [
    shouldSimulateApprove,
    approvalTrigger,
    dataApproveTransaction,
    errorApproveTransaction,
  ]);

  const {
    data: hashApprove,
    writeContract: writeApprove,
    isPending: isApprovePending,
    error: writeApproveError,
  } = useWriteContract();

  const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } =
    useWaitForTransactionReceipt({ hash: hashApprove });

  // Deposit transaction simulation - hardcoded to Base chain
  const shouldSimulateDeposit =
    isValidAmount && pendingStep === "deposit" && depositTrigger > 0;

  const { data: dataDepositTransaction, error: errorDepositTransaction } =
    useSimulateContract(
      shouldSimulateDeposit
        ? {
            address: MORPHO_VAULT_ADDRESS as `0x${string}`,
            abi: MORPHO_ABI,
            functionName: "deposit",
            args: [parseUnits(amount, USDC_DECIMALS), address],
            chainId: 8453, // Hardcoded to Base chain
          }
        : undefined
    );

  const {
    data: hashDeposit,
    writeContract: writeDeposit,
    isPending: isDepositPending,
    error: writeDepositError,
  } = useWriteContract();

  const { isLoading: isLoadingDeposit, isSuccess: isSuccessDeposit } =
    useWaitForTransactionReceipt({ hash: hashDeposit });

  // After approval is confirmed, trigger deposit simulation
  useEffect(() => {
    if (pendingStep === "approve" && isSuccessApprove) {
      console.log("✅ Approval successful, triggering deposit...");
      setPendingStep("deposit");
      setDepositTrigger((t) => t + 1); // increment to trigger simulation
      updateProgress(95, "Approval complete, preparing deposit...");
    }
  }, [isSuccessApprove, pendingStep]);

  // After deposit simulation is ready, trigger deposit write
  useEffect(() => {
    if (pendingStep === "deposit" && dataDepositTransaction?.request) {
      console.log("💰 Deposit simulation ready, executing deposit...");
      writeDeposit(dataDepositTransaction.request);
    }
  }, [pendingStep, dataDepositTransaction]);

  // Update status based on pending step
  useEffect(() => {
    if (pendingStep === "approve") {
      setSwapState((prev) => ({
        ...prev,
        status: "approving",
      }));
    } else if (pendingStep === "deposit") {
      setSwapState((prev) => ({
        ...prev,
        status: "depositing",
      }));
    }
  }, [pendingStep]);

  // Update swap status during the swap process
  useEffect(() => {
    if (swapState.progress >= 10 && swapState.progress < 80 && !pendingStep) {
      setSwapState((prev) => ({
        ...prev,
        status: "swapping",
      }));
    }
  }, [swapState.progress, pendingStep]);

  // After deposit is successful, complete the investment
  useEffect(() => {
    if (isSuccessDeposit && hashDeposit) {
      console.log("✅ Deposit completed successfully!");
      updateProgress(100, `Investment completed successfully!`);
      completeInvestment(hashDeposit);

      // Store the investment data for the my-investments page
      const investmentData = {
        id: Date.now().toString(),
        type: "morpho",
        amount: amount,
        asset: "USDC",
        txHash: hashDeposit,
        timestamp: new Date().toISOString(),
        status: "active",
        vaultAddress: MORPHO_VAULT_ADDRESS,
        chainId: 8453,
      };

      // Store in localStorage for demo purposes
      const existingInvestments = JSON.parse(
        localStorage.getItem("morphoInvestments") || "[]"
      );
      existingInvestments.push(investmentData);
      localStorage.setItem(
        "morphoInvestments",
        JSON.stringify(existingInvestments)
      );

      console.log("💾 Investment data stored:", investmentData);
    }
  }, [isSuccessDeposit, hashDeposit, amount]);

  // Handle approval errors
  useEffect(() => {
    if (writeApproveError && pendingStep === "approve") {
      console.error("❌ Approval failed:", writeApproveError);
      setSwapState({
        status: "error",
        progress: 0,
        message: "Approval failed",
        error: writeApproveError.message,
      });
    }
  }, [writeApproveError, pendingStep]);

  // Handle deposit errors
  useEffect(() => {
    if (writeDepositError && pendingStep === "deposit") {
      console.error("❌ Deposit failed:", writeDepositError);
      setSwapState({
        status: "error",
        progress: 0,
        message: "Deposit failed",
        error: writeDepositError.message,
      });
    }
  }, [writeDepositError, pendingStep]);

  const updateProgress = (progress: number, message: string) => {
    setSwapState((prev) => ({
      ...prev,
      progress,
      message,
    }));
  };

  const initiateSwap = async (amount: string, asset: string) => {
    if (!address) {
      throw new Error("Wallet not connected");
    }

    try {
      console.log("🚀 Starting cross-chain swap + Morpho investment flow");

      setAmount(amount);
      setSwapState({
        status: "idle",
        progress: 5,
        message: "Preparing cross-chain swap...",
      });

      // Step 1: Submit cross-chain swap order (includes quote and monitoring internally)
      updateProgress(
        20,
        "Executing cross-chain swap. This may take around 50 seconds..."
      );
      console.log("🔄 Submitting cross-chain swap order...");

      const orderResponse = await fetch("/api/swap/cross-chain/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseUnits(amount, USDC_DECIMALS).toString(),
          srcToken: getTokenAddress(asset, 1),
          dstToken: getTokenAddress(asset, 8453),
          srcChainId: 1,
          dstChainId: 8453,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to submit swap order");
      }

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to submit order");
      }

      console.log("✅ Cross-chain swap completed successfully!");
      console.log("📊 Order data:", orderData.data);
      updateProgress(50, "Cross-chain swap completed successfully!");

      // Step 2: Switch to Base chain after successful swap (only if not already on Base)
      if (currentChainId !== 8453) {
        updateProgress(10, "Switching to Base network...");
        console.log("🔄 Switching to Base chain...");
        setIsChainSwitching(true);

        try {
          await switchChain({ chainId: base.id });

          // Wait for chain switch to complete by checking wallet directly
          let chainSwitchAttempts = 0;
          let isOnBase = false;

          while (!isOnBase && chainSwitchAttempts < 15) {
            try {
              // Check chain directly from wallet
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const chainIdFromWallet = await (window as any).ethereum.request({
                method: "eth_chainId",
              });
              const numericChainId = parseInt(chainIdFromWallet, 16);

              console.log("⏳ Waiting for chain switch to Base...", {
                walletChainId: numericChainId,
                expectedChainId: 8453,
                attempt: chainSwitchAttempts + 1,
              });

              if (numericChainId === 8453) {
                isOnBase = true;
                setIsOnBaseChain(true);
                console.log("✅ Successfully detected Base chain in wallet");
                break;
              }
            } catch (walletError) {
              console.log("⚠️ Error checking wallet chain:", walletError);
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));
            chainSwitchAttempts++;
          }

          if (!isOnBase) {
            throw new Error("Failed to switch to Base chain");
          }
        } catch (error) {
          setIsChainSwitching(false);
          console.error("Failed to switch chain:", error);
          throw new Error(
            "Failed to switch to Base chain. Please switch manually and try again."
          );
        }

        setIsChainSwitching(false);
      } else {
        // Already on Base chain
        setIsOnBaseChain(true);
      }

      console.log("✅ Successfully on Base chain");
      updateProgress(25, "Preparing Morpho investment...");

      // Longer delay to allow simulations to re-run on Base chain
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Step 3: Now trigger Morpho investment
      console.log("💰 Starting Morpho investment process...");

      // Check allowance for Morpho vault
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const allowance = await (window as any).ethereum.request({
        method: "eth_call",
        params: [
          {
            to: USDC_ADDRESS,
            data: `0xdd62ed3e${address
              .slice(2)
              .padStart(64, "0")}${MORPHO_VAULT_ADDRESS.slice(2).padStart(
              64,
              "0"
            )}`,
          },
          "latest",
        ],
      });

      // Handle hex response properly - convert 0x to 0x0 for BigInt
      const allowanceHex = allowance === "0x" ? "0x0" : allowance;
      const allowanceBN = BigInt(allowanceHex);
      const amountBN = parseUnits(amount, USDC_DECIMALS);

      if (allowanceBN < amountBN) {
        console.log("🔐 Need approval for Morpho vault, triggering approve...");
        updateProgress(90, "Approving USDC for Morpho vault...");

        setPendingStep("approve");

        // Create approval transaction manually
        const approvalData = {
          address: USDC_ADDRESS as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "approve" as const,
          args: [
            MORPHO_VAULT_ADDRESS as `0x${string}`,
            parseUnits(amount, USDC_DECIMALS),
          ],
        };

        console.log("✅ Creating approval transaction manually:", approvalData);
        writeApprove(approvalData);

        // Don't wait here - let the useEffect handle the approval success
        console.log(
          "🔐 Approval transaction sent, waiting for confirmation..."
        );
        return; // Exit early, let useEffect handle the rest
      }

      // Step 4: Execute deposit (if no approval needed)
      console.log("💰 Initiating Morpho deposit...");
      updateProgress(95, "Depositing into Morpho vault...");

      setPendingStep("deposit");
      setDepositTrigger((t) => t + 1);

      // Don't wait here - let the useEffect handle the deposit
      console.log("💰 Deposit transaction sent, waiting for confirmation...");
      return {
        success: true,
        swapHash: 10,
        dstTokenAddress: USDC_ADDRESS,
      };
    } catch (error) {
      console.error("Investment error:", error);
      setSwapState({
        status: "error",
        progress: 0,
        message: "Investment failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  };

  // Helper function to get token addresses for different chains
  const getTokenAddress = (asset: string, chainId: number): string => {
    const tokenAddresses: Record<string, Record<number, string>> = {
      USDC: {
        1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Ethereum
        8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base
      },
      USDT: {
        1: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // Ethereum
        8453: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // Base
      },
      ETH: {
        1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH on Ethereum
        8453: "0x4200000000000000000000000000000000000006", // WETH on Base
      },
    };

    const assetTokens = tokenAddresses[asset];
    if (assetTokens && assetTokens[chainId]) {
      return assetTokens[chainId];
    }

    // Fallback to USDC
    const usdcTokens = tokenAddresses.USDC;
    return usdcTokens[chainId] || usdcTokens[1]; // Default to Ethereum USDC
  };

  const resetState = () => {
    setSwapState({
      status: "idle",
      progress: 0,
      message: "Ready to invest",
    });
    setAmount("");
    setPendingStep(null);
    setDepositTrigger(0);
    setApprovalTrigger(0);
    setIsChainSwitching(false);
    setIsOnBaseChain(false);
  };

  const completeInvestment = (investmentHash?: string) => {
    setSwapState((prev) => ({
      ...prev,
      status: "complete",
      progress: 100,
      message: `Investment completed successfully!`,
      depositHash: investmentHash,
    }));
  };

  return {
    swapState,
    initiateSwap,
    resetState,
    completeInvestment,
    isSwapping: swapState.status === "swapping",
    isSwapComplete: swapState.status === "complete",
    isInvesting: swapState.status === "depositing",
    isComplete: swapState.status === "complete",
    hasError: swapState.status === "error",
    // State for UI
    amount,
    setAmount,
    isValidAmount,
    // Transaction states
    isApprovePending,
    isDepositPending,
    isLoadingApprove,
    isLoadingDeposit,
    isSuccessApprove,
    isSuccessDeposit,
    // Errors
    writeApproveError,
    writeDepositError,
    errorDepositTransaction,
    errorApproveTransaction,
  };
}
