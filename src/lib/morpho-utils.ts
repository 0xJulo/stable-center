import { parseUnits, formatUnits } from "ethers";
import {
  useAccount,
  useWalletClient,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
  useBalance,
  useReadContract,
} from "wagmi";

// Supported networks for Morpho
export const SUPPORTED_NETWORKS = {
  MAINNET: 1,
  BASE: 8453,
  ARBITRUM: 42161,
  OPTIMISM: 10,
} as const;

// Stablecoin addresses by network
export const STABLECOIN_ADDRESSES = {
  [SUPPORTED_NETWORKS.MAINNET]: {
    USDC: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8C",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  [SUPPORTED_NETWORKS.BASE]: {
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    USDT: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  [SUPPORTED_NETWORKS.ARBITRUM]: {
    USDC: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  },
  [SUPPORTED_NETWORKS.OPTIMISM]: {
    USDC: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    USDT: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
  },
} as const;

// ERC20 ABI for approvals
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
] as const;

// Morpho Vault ABI for deposits
export const MORPHO_VAULT_ABI = [
  {
    inputs: [
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
    ],
    name: "deposit",
    outputs: [{ name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "shares", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "owner", type: "address" },
    ],
    name: "redeem",
    outputs: [{ name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "assets", type: "uint256" }],
    name: "convertToShares",
    outputs: [{ name: "shares", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "shares", type: "uint256" }],
    name: "convertToAssets",
    outputs: [{ name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export interface VaultInfo {
  networkId: number;
  networkName: string;
  vaultAddress: string;
  supportedStablecoins: string[];
}

export interface InvestmentRequest {
  userAddress: string;
  amount: string;
  stablecoinAddress: string;
  vaultAddress: string;
  networkId: number;
  decimals?: number;
}

export interface InvestmentResponse {
  success: boolean;
  transactionData?: {
    to: string;
    data: string;
    value: string;
    gasLimit?: string;
  };
  error?: string;
  vaultInfo?: VaultInfo;
}

export function useMorphoInvestment(
  vaultAddress: string,
  tokenAddress: string,
  amount: string,
  decimals: number = 18
) {
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();

  // Check if we have valid inputs
  const isValidAmount = Boolean(
    !!amount &&
      !isNaN(Number(amount)) &&
      Number(amount) > 0 &&
      address &&
      vaultAddress &&
      tokenAddress
  );

  // Get user's token balance
  const { data: balanceData } = useBalance({
    address,
    token: tokenAddress as `0x${string}`,
  });

  // Check allowance
  const { data: allowanceData } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, vaultAddress as `0x${string}`],
    query: {
      enabled: isValidAmount && !!address,
    },
  });

  // Simulate approval transaction
  const { data: approveSimulation } = useSimulateContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [vaultAddress as `0x${string}`, parseUnits(amount, decimals)],
    query: {
      enabled: isValidAmount && !!address,
    },
  });

  // Simulate deposit transaction
  const { data: depositSimulation } = useSimulateContract({
    address: vaultAddress as `0x${string}`,
    abi: MORPHO_VAULT_ABI,
    functionName: "deposit",
    args: [parseUnits(amount, decimals), address as `0x${string}`],
    query: {
      enabled: isValidAmount && !!address,
    },
  });

  // Write contract hooks
  const {
    data: approveHash,
    writeContract: writeApprove,
    isPending: isApprovePending,
    error: approveError,
  } = useWriteContract();

  const {
    data: depositHash,
    writeContract: writeDeposit,
    isPending: isDepositPending,
    error: depositError,
  } = useWriteContract();

  // Wait for transaction receipts
  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({ hash: approveHash });

  const { isLoading: isDepositLoading, isSuccess: isDepositSuccess } =
    useWaitForTransactionReceipt({ hash: depositHash });

  // Calculate if approval is needed
  const needsApproval =
    allowanceData && parseUnits(amount, decimals) > (allowanceData as bigint);

  // Helper functions
  const approve = () => {
    if (approveSimulation?.request) {
      writeApprove(approveSimulation.request);
    }
  };

  const deposit = () => {
    if (depositSimulation?.request) {
      writeDeposit(depositSimulation.request);
    }
  };

  // Get user balance in readable format
  const userBalance = balanceData?.value
    ? Number(balanceData.value) / Math.pow(10, decimals)
    : 0;

  const notEnoughBalance = Number(amount) > userBalance;

  return {
    // State
    isValidAmount,
    needsApproval,
    userBalance,
    notEnoughBalance,
    allowance: allowanceData,

    // Actions
    approve,
    deposit,

    // Transaction states
    isApprovePending,
    isApproveLoading,
    isApproveSuccess,
    isDepositPending,
    isDepositLoading,
    isDepositSuccess,

    // Errors
    approveError,
    depositError,

    // Transaction hashes
    approveHash,
    depositHash,
  };
}

export function formatAmount(amount: string, decimals: number = 18): string {
  try {
    return formatUnits(parseUnits(amount, decimals), decimals);
  } catch {
    return "0";
  }
}

export function parseAmount(amount: string, decimals: number = 18): bigint {
  try {
    return parseUnits(amount, decimals);
  } catch {
    return BigInt(0);
  }
}
