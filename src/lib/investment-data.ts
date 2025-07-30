interface InvestmentCardData {
  apr: number;
  name: string;
  aprExample: string;
  risk: string;
  estimatedFees: number;
  chain: string;
  trending?: boolean;
}

const mockInvestmentData: InvestmentCardData[] = [
  {
    apr: 4.5,
    name: "Uniswap",
    aprExample: "$45 annually on $1,000",
    risk: "Low",
    estimatedFees: 0.85,
    chain: "Arbitrum"
  },
  {
    apr: 8.2,
    name: "Aave",
    aprExample: "$82 annually on $1,000",
    risk: "Medium",
    estimatedFees: 1.20,
    chain: "Ethereum",
    trending: true
  },
  {
    apr: 12.1,
    name: "Compound",
    aprExample: "$121 annually on $1,000",
    risk: "Medium",
    estimatedFees: 1.50,
    chain: "Optimism"
  },
  {
    apr: 6.8,
    name: "Lido",
    aprExample: "$68 annually on $1,000",
    risk: "Low",
    estimatedFees: 0.95,
    chain: "Ethereum",
    trending: true
  },
  {
    apr: 15.3,
    name: "Curve",
    aprExample: "$153 annually on $1,000",
    risk: "High",
    estimatedFees: 2.10,
    chain: "Ethereum",
    trending: true
  },
  {
    apr: 9.7,
    name: "Yearn",
    aprExample: "$97 annually on $1,000",
    risk: "Medium",
    estimatedFees: 1.35,
    chain: "Base"
  },
  {
    apr: 5.2,
    name: "MakerDAO",
    aprExample: "$52 annually on $1,000",
    risk: "Low",
    estimatedFees: 0.75,
    chain: "BSC"
  },
  {
    apr: 18.9,
    name: "SushiSwap",
    aprExample: "$189 annually on $1,000",
    risk: "High",
    estimatedFees: 2.50,
    chain: "Polygon"
  }
];

export async function getInvestmentData(): Promise<InvestmentCardData[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInvestmentData);
    }, 500);
  });
}

export { type InvestmentCardData };