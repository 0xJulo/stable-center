interface OpenInvestmentData {
  apr: number;
  name: string;
  risk: string;
  totalRewards: number;
  unclaimedRewards: number;
  investedAmount: number;
  chain: string;
  txHash?: string;
  timestamp?: string;
  type?: string;
}

const mockOpenInvestmentData: OpenInvestmentData[] = [
  {
    apr: 10.25,
    name: "Uniswap v3",
    risk: "Low",
    totalRewards: 125.5,
    unclaimedRewards: 23.75,
    investedAmount: 1000,
    chain: "Ethereum",
  },
  {
    apr: 8.7,
    name: "Aave",
    risk: "Low",
    totalRewards: 198.3,
    unclaimedRewards: 45.2,
    investedAmount: 2500,
    chain: "Polygon",
  },
  {
    apr: 12.1,
    name: "Compound",
    risk: "Medium",
    totalRewards: 67.8,
    unclaimedRewards: 18.9,
    investedAmount: 500,
    chain: "Optimism",
  },
  {
    apr: 6.8,
    name: "Lido",
    risk: "Low",
    totalRewards: 412.5,
    unclaimedRewards: 85.6,
    investedAmount: 5000,
    chain: "Base",
  },
  {
    apr: 15.3,
    name: "Curve",
    risk: "High",
    totalRewards: 89.25,
    unclaimedRewards: 31.4,
    investedAmount: 750,
    chain: "BSC",
  },
  {
    apr: 9.4,
    name: "Yearn",
    risk: "Medium",
    totalRewards: 203.7,
    unclaimedRewards: 67.8,
    investedAmount: 1500,
    chain: "Arbitrum",
  },
];

export async function getOpenInvestmentData(): Promise<OpenInvestmentData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get Morpho investments from localStorage
      const morphoInvestments = JSON.parse(
        localStorage.getItem("morphoInvestments") || "[]"
      );

      // Convert Morpho investments to the expected format
      const morphoData: OpenInvestmentData[] = morphoInvestments.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (investment: any) => ({
          apr: 10.27, // Mock APY for Morpho
          name: "Morpho",
          risk: "Low",
          totalRewards: parseFloat(investment.amount) * 0.085, // Mock rewards (8.5% of invested amount)
          unclaimedRewards: parseFloat(investment.amount) * 0.085, // Mock unclaimed rewards
          investedAmount: parseFloat(investment.amount),
          chain: "Base",
          txHash: investment.txHash,
          timestamp: investment.timestamp,
          type: "morpho",
        })
      );

      // Combine mock data with Morpho investments
      const allInvestments = [...mockOpenInvestmentData, ...morphoData];
      resolve(allInvestments);
    }, 500);
  });
}

export { type OpenInvestmentData };
