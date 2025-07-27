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

const privateKey = process.env.PRIVATE_KEY!;
const rpc = "https://ethereum-rpc.publicnode.com";
const authKey = process.env.FUSION_AUTH_KEY!;
const source = "stables-check";

const web3 = new Web3(rpc);
const walletAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

const sdk = new SDK({
  url: "https://api.1inch.dev/fusion-plus",
  authKey,
  blockchainProvider: new PrivateKeyProviderConnector(privateKey, web3 as any),
});

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Default token addresses for Ethereum to NEAR swaps
const DEFAULT_TOKENS = {
  ETHEREUM: {
    USDC: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8C", // USDC on Ethereum
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT on Ethereum
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH on Ethereum
  },
  NEAR: {
    USDC: "0x0000000000000000000000000000000000000000000000000000000000000000", // USDC on NEAR
    USDT: "0x0000000000000000000000000000000000000000000000000000000000000000", // USDT on NEAR
    WNEAR: "0x0000000000000000000000000000000000000000000000000000000000000000", // WNEAR on NEAR
  },
};

// Chain IDs
const CHAIN_IDS = {
  ETHEREUM: NetworkEnum.ETHEREUM, // 1
  NEAR: 1313161554, // NEAR mainnet chain ID
};

export async function createFusionOrder({
  amount,
  srcChainId = CHAIN_IDS.ETHEREUM,
  dstChainId = CHAIN_IDS.NEAR,
  srcTokenAddress,
  dstTokenAddress,
  simulate = false,
}: {
  amount: string;
  srcChainId?: number;
  dstChainId?: number;
  srcTokenAddress?: string;
  dstTokenAddress?: string;
  simulate?: boolean;
}) {
  try {
    // Use default tokens if not provided
    const finalSrcToken = srcTokenAddress || DEFAULT_TOKENS.ETHEREUM.USDC;
    const finalDstToken = dstTokenAddress || DEFAULT_TOKENS.NEAR.USDC;

    console.log(
      `Creating ${
        simulate ? "simulated " : ""
      }order from Ethereum (${srcChainId}) to NEAR (${dstChainId})`
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
    const quote = await sdk.getQuote({
      amount,
      srcChainId,
      dstChainId,
      enableEstimate: true,
      srcTokenAddress: finalSrcToken,
      dstTokenAddress: finalDstToken,
      walletAddress,
    });

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
  srcChainId = CHAIN_IDS.ETHEREUM,
  dstChainId = CHAIN_IDS.NEAR,
  srcTokenAddress,
  dstTokenAddress,
  simulate = false,
}: {
  amount: string;
  srcChainId?: number;
  dstChainId?: number;
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

// Helper function to create Ethereum to NEAR swap specifically
export async function createEthereumToNearSwap({
  amount,
  srcToken = DEFAULT_TOKENS.ETHEREUM.USDC,
  dstToken = DEFAULT_TOKENS.NEAR.USDC,
  simulate = false,
}: {
  amount: string;
  srcToken?: string;
  dstToken?: string;
  simulate?: boolean;
}) {
  return createFusionOrder({
    amount,
    srcChainId: CHAIN_IDS.ETHEREUM,
    dstChainId: CHAIN_IDS.NEAR,
    srcTokenAddress: srcToken,
    dstTokenAddress: dstToken,
    simulate,
  });
}

// Helper function to create complete Ethereum to NEAR swap with monitoring
export async function createCompleteEthereumToNearSwap({
  amount,
  srcToken = DEFAULT_TOKENS.ETHEREUM.USDC,
  dstToken = DEFAULT_TOKENS.NEAR.USDC,
  simulate = false,
}: {
  amount: string;
  srcToken?: string;
  dstToken?: string;
  simulate?: boolean;
}) {
  return createCompleteFusionOrder({
    amount,
    srcChainId: CHAIN_IDS.ETHEREUM,
    dstChainId: CHAIN_IDS.NEAR,
    srcTokenAddress: srcToken,
    dstTokenAddress: dstToken,
    simulate,
  });
}
