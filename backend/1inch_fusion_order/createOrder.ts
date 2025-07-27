import {
  HashLock,
  NetworkEnum,
  OrderStatus,
  PresetEnum,
  PrivateKeyProviderConnector,
  SDK,
} from "@1inch/cross-chain-sdk";
import Web3 from "web3";
import { randomBytes } from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

// Validate environment variables
const privateKey = process.env.PRIVATE_KEY;
const authKey = process.env.FUSION_AUTH_KEY;

if (!privateKey) {
  throw new Error("PRIVATE_KEY environment variable is required");
}

if (!authKey) {
  throw new Error("FUSION_AUTH_KEY environment variable is required");
}

// Validate private key format
if (!privateKey.startsWith("0x") || privateKey.length !== 66) {
  throw new Error(
    "PRIVATE_KEY must be a valid 32-byte hex string starting with '0x' (64 hex characters + '0x' prefix)"
  );
}

const rpc = "https://ethereum-rpc.publicnode.com";
const source = "stablescenter";

const web3 = new Web3(rpc);

// Validate private key by trying to create an account
let walletAddress: string;
try {
  walletAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
} catch (error) {
  throw new Error(`Invalid PRIVATE_KEY: ${(error as Error).message}`);
}

const sdk = new SDK({
  url: "https://api.1inch.dev/fusion-plus",
  authKey,
  blockchainProvider: new PrivateKeyProviderConnector(privateKey, web3 as any),
});

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Chain IDs
const CHAIN_IDS = {
  ETHEREUM: NetworkEnum.ETHEREUM,
  SOLANA: NetworkEnum.SOLANA,
  BASE: NetworkEnum.COINBASE,
  AVALANCHE: NetworkEnum.AVALANCHE,
  BSC: NetworkEnum.BINANCE,
};

// Default token addresses for different chains
const DEFAULT_TOKENS = {
  [CHAIN_IDS.ETHEREUM]: {
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC on Ethereum
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH on Ethereum
  },
  [CHAIN_IDS.SOLANA]: {
    USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC on Solana
    USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT on Solana
  },
  [CHAIN_IDS.BASE]: {
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    USDT: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // USDT on Base
    WETH: "0x4200000000000000000000000000000000000006", // WETH on Base
  },
  [CHAIN_IDS.AVALANCHE]: {
    USDC: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", // USDC on Avalanche
    USDT: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", // USDT on Avalanche
    WAVAX: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // Wrapped AVAX
  },
  [CHAIN_IDS.BSC]: {
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", // USDC on BSC
    USDT: "0x55d398326f99059fF775485246999027B3197955", // USDT on BSC
    WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB on BSC
  },
};

export async function createFusionOrder({
  amount,
  srcChainId,
  dstChainId,
  srcTokenAddress,
  dstTokenAddress,
  simulate = false,
}: {
  amount: string;
  srcChainId: number;
  dstChainId: number;
  srcTokenAddress?: string;
  dstTokenAddress?: string;
  simulate?: boolean;
}) {
  try {
    // Validate chain IDs
    if (!srcChainId || !dstChainId) {
      throw new Error("Source and destination chain IDs are required");
    }

    if (srcChainId === dstChainId) {
      throw new Error(
        "Source and destination chain IDs must be different for cross-chain swaps"
      );
    }

    // Use default tokens if not provided, based on the source chain
    let finalSrcToken = srcTokenAddress;
    let finalDstToken = dstTokenAddress;

    // Helper function to get default token for a chain
    const getDefaultTokenForChain = (
      chainId: number,
      tokenType: "USDC" | "USDT" | "WETH" | "WAVAX" = "USDC"
    ) => {
      const chainTokens =
        DEFAULT_TOKENS[chainId as keyof typeof DEFAULT_TOKENS];
      if (chainTokens && chainTokens[tokenType]) {
        return chainTokens[tokenType];
      }
      return null;
    };

    if (!finalSrcToken) {
      const defaultToken = getDefaultTokenForChain(srcChainId);
      if (defaultToken) {
        finalSrcToken = defaultToken;
      } else {
        throw new Error(
          `Source token address is required for chain ID ${srcChainId}. No default token available.`
        );
      }
    }

    if (!finalDstToken) {
      const defaultToken = getDefaultTokenForChain(dstChainId);
      if (defaultToken) {
        finalDstToken = defaultToken;
      } else {
        throw new Error(
          `Destination token address is required for chain ID ${dstChainId}. No default token available.`
        );
      }
    }

    console.log(
      `Creating ${
        simulate ? "simulated " : ""
      }cross-chain order from chain ${srcChainId} to chain ${dstChainId}`
    );
    console.log(`Source token: ${finalSrcToken}`);
    console.log(`Destination token: ${finalDstToken}`);
    console.log(`Amount: ${amount}`);

    if (simulate) {
      // Return simulated order data without making actual API calls
      const mockSecrets = Array.from({ length: 1 }).map(
        () => "0x" + randomBytes(32).toString("hex")
      );
      const mockSecretHashes = mockSecrets.map((s) => HashLock.hashSecret(s));

      return {
        hash: "0x" + randomBytes(32).toString("hex"),
        secrets: mockSecrets,
        secretHashes: mockSecretHashes,
        quote: {
          srcChainId,
          dstChainId,
          srcTokenAddress: finalSrcToken,
          dstTokenAddress: finalDstToken,
          amount,
          estimatedAmount: (parseFloat(amount) * 0.99).toString(), // Simulate 1% fee
          presets: {
            [PresetEnum.fast]: {
              secretsCount: 1,
              estimatedTime: 300, // 5 minutes
            },
          },
        },
        status: "simulated",
        simulation: true,
      };
    }

    // Get quote
    const quotePayload = {
      amount,
      srcChainId,
      dstChainId,
      enableEstimate: true,
      srcTokenAddress: finalSrcToken,
      dstTokenAddress: finalDstToken,
      walletAddress,
    };

    console.log("📤 Creating fusion order - Quote payload:");
    console.log(JSON.stringify(quotePayload, null, 2));

    const quote = await sdk.getQuote(quotePayload);

    const preset = PresetEnum.fast;

    // Generate secrets
    const secrets = Array.from({
      length: quote.presets[preset].secretsCount,
    }).map(() => "0x" + randomBytes(32).toString("hex"));

    const hashLock =
      secrets.length === 1
        ? HashLock.forSingleFill(secrets[0])
        : HashLock.forMultipleFills(HashLock.getMerkleLeaves(secrets));

    const secretHashes = secrets.map((s) => HashLock.hashSecret(s));

    // Create order
    const { hash, quoteId, order } = await sdk.createOrder(quote, {
      walletAddress,
      hashLock,
      preset,
      source,
      secretHashes,
    });
    console.log({ hash }, "order created");

    // Submit order
    const _orderInfo = await sdk.submitOrder(
      quote.srcChainId,
      order as any,
      quoteId,
      secretHashes
    );
    console.log({ hash }, "order submitted");

    return {
      hash,
      secrets,
      secretHashes,
      quote,
      status: "submitted",
      simulation: false,
    };
  } catch (error) {
    console.error("Error creating fusion order:", error);
    throw new Error(
      `Failed to create fusion order: ${(error as Error).message}`
    );
  }
}

export async function monitorOrderStatus(
  hash: string,
  secrets: string[]
): Promise<any> {
  try {
    console.log(`Monitoring order status for hash: ${hash}`);

    // Submit secrets for deployed escrows
    while (true) {
      const secretsToShare = await sdk.getReadyToAcceptSecretFills(hash);

      if (secretsToShare.fills.length) {
        for (const { idx } of secretsToShare.fills) {
          await sdk.submitSecret(hash, secrets[idx]);
          console.log({ idx }, "shared secret");
        }
      }

      // Check if order finished
      const { status } = await sdk.getOrderStatus(hash);

      if (
        status === OrderStatus.Executed ||
        status === OrderStatus.Expired ||
        status === OrderStatus.Refunded
      ) {
        break;
      }

      await sleep(1000);
    }

    const statusResponse = await sdk.getOrderStatus(hash);
    console.log("Final order status:", statusResponse);
    return statusResponse;
  } catch (error) {
    console.error("Error monitoring order status:", error);
    throw new Error(
      `Failed to monitor order status: ${(error as Error).message}`
    );
  }
}

export async function createCompleteFusionOrder({
  amount,
  srcChainId,
  dstChainId,
  srcTokenAddress,
  dstTokenAddress,
  simulate = false,
}: {
  amount: string;
  srcChainId: number;
  dstChainId: number;
  srcTokenAddress?: string;
  dstTokenAddress?: string;
  simulate?: boolean;
}) {
  try {
    // Create the order
    const orderResult = await createFusionOrder({
      amount,
      srcChainId,
      dstChainId,
      srcTokenAddress,
      dstTokenAddress,
      simulate,
    });

    if (simulate) {
      return {
        ...orderResult,
        finalStatus: "simulated",
      };
    }

    // Monitor the order status until completion
    const finalStatus = await monitorOrderStatus(
      orderResult.hash,
      orderResult.secrets
    );

    return {
      ...orderResult,
      finalStatus,
    };
  } catch (error) {
    console.error("Error in complete fusion order:", error);
    throw error;
  }
}
