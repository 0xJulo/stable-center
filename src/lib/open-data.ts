interface OpenInvestmentData {
  apr: number;
  name: string;
  risk: string;
  totalRewards: number;
  unclaimedRewards: number;
  investedAmount: number;
  chain: string;
}

const mockOpenInvestmentData: OpenInvestmentData[] = [
  {
    apr: 10.25,
    name: "Uniswap v3",
    risk: "Low",
    totalRewards: 125.50,
    unclaimedRewards: 23.75,
    investedAmount: 1000,
    chain: "Ethereum"
  },
  {
    apr: 8.7,
    name: "Aave",
    risk: "Low",
    totalRewards: 198.30,
    unclaimedRewards: 45.20,
    investedAmount: 2500,
    chain: "Polygon"
  },
  {
    apr: 12.1,
    name: "Compound",
    risk: "Medium",
    totalRewards: 67.80,
    unclaimedRewards: 18.90,
    investedAmount: 500,
    chain: "Optimism"
  },
  {
    apr: 6.8,
    name: "Lido",
    risk: "Low",
    totalRewards: 412.50,
    unclaimedRewards: 85.60,
    investedAmount: 5000,
    chain: "Base"
  },
  {
    apr: 15.3,
    name: "Curve",
    risk: "High",
    totalRewards: 89.25,
    unclaimedRewards: 31.40,
    investedAmount: 750,
    chain: "BSC"
  },
  {
    apr: 9.4,
    name: "Yearn",
    risk: "Medium",
    totalRewards: 203.70,
    unclaimedRewards: 67.80,
    investedAmount: 1500,
    chain: "Arbitrum"
  }
];

export async function getOpenInvestmentData(): Promise<OpenInvestmentData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOpenInvestmentData);
    }, 500);
  });
}

export { type OpenInvestmentData };