
interface Stablecoin {
    name: string;
    creator: string;
    description: string;
    network: string;
    liquidity: string;
    volume24h: string;
  }
  
  interface ChainData {
    stablecoins: Stablecoin[];
  }
  
  const mockDatabase: Record<string, ChainData> = {
    Ethereum: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin widely used for trading and transfers across blockchains.',
          network: 'Ethereum',
          liquidity: '~$65B',
          volume24h: '~$30B',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin designed for secure, transparent transactions on multiple networks.',
          network: 'Ethereum',
          liquidity: '~$35B',
          volume24h: '~$20B',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized stablecoin pegged to the USD, backed by crypto collateral for trustless stability across blockchains.',
          network: 'Ethereum',
          liquidity: '~$3.5B',
          volume24h: '~$5B',
        },
        {
          name: 'TUSD (TrueUSD)',
          creator: 'TrustToken',
          description: 'A USD-backed stablecoin designed for audited transparency and secure transactions on multiple networks.',
          network: 'Ethereum',
          liquidity: '~$0.5B',
          volume24h: '~$0.5B',
        },
        {
          name: 'USDD',
          creator: 'TRON DAO',
          description: 'A USD-pegged stablecoin used for DeFi and payments on multiple chains.',
          network: 'Ethereum',
          liquidity: '~$0.1B',
          volume24h: '~$0.1B',
        },
        {
          name: 'EURS (STASIS EURO)',
          creator: 'STASIS',
          description: 'A Euro-backed stablecoin designed for transparency and efficiency.',
          network: 'Ethereum',
          liquidity: '~$80M',
          volume24h: '~$8M',
        },
        {
          name: 'EURT (Tether EURt)',
          creator: 'Tether Limited',
          description: 'A Euro-backed stablecoin simplifying digital Euro use.',
          network: 'Ethereum',
          liquidity: '~$150M',
          volume24h: '~$15M',
        },
        {
          name: 'EURI',
          creator: 'Monerium',
          description: 'A Euro-backed stablecoin backed by Euros in segregated accounts.',
          network: 'Ethereum',
          liquidity: '~$10M',
          volume24h: '~$1M',
        },
        {
          name: 'AEUR (Anchored Coins EUR)',
          creator: 'Anchored Coins',
          description: 'A Euro-backed stablecoin regulated in Switzerland.',
          network: 'Ethereum',
          liquidity: '~$15M',
          volume24h: '~$2M',
        },
        {
          name: 'EURR (StablR)',
          creator: 'StablR',
          description: 'A Euro-backed stablecoin collateralized by fiat and bonds.',
          network: 'Ethereum',
          liquidity: '~$5M',
          volume24h: '~$0.5M',
        },
        {
          name: 'tGBP',
          creator: 'BCP Technologies',
          description: 'A GBP-backed stablecoin, a proof-of-concept for UK regulation.',
          network: 'Ethereum',
          liquidity: '~$1M',
          volume24h: '~$0.1M',
        },
        {
          name: 'GBPP (Great British Pound Pegged)',
          creator: 'London Block Exchange with AlphaPoint',
          description: 'A GBP-backed stablecoin backed by GBP in UK banks.',
          network: 'Ethereum',
          liquidity: '~$5M',
          volume24h: '~$0.5M',
        },
      ],
    },
    Polygon: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin used for low-cost DeFi transactions.',
          network: 'Polygon',
          liquidity: '~$1B',
          volume24h: '~$200M',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for efficient swaps and yields.',
          network: 'Polygon',
          liquidity: '~$0.8B',
          volume24h: '~$200M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for trustless DeFi applications.',
          network: 'Polygon',
          liquidity: '~$0.2B',
          volume24h: '~$100M',
        },
        {
          name: 'EURS (STASIS EURO)',
          creator: 'STASIS',
          description: 'A Euro-backed stablecoin for cross-border payments.',
          network: 'Polygon',
          liquidity: '~$20M',
          volume24h: '~$2M',
        },
        {
          name: 'AEUR (Anchored Coins EUR)',
          creator: 'Anchored Coins',
          description: 'A Euro-backed stablecoin for regulated transactions.',
          network: 'Polygon',
          liquidity: '~$5M',
          volume24h: '~$0.5M',
        },
      ],
    },
    Arbitrum: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for high-speed DeFi trades.',
          network: 'Arbitrum',
          liquidity: '~$2B',
          volume24h: '~$700M',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for scalable transactions.',
          network: 'Arbitrum',
          liquidity: '~$1.5B',
          volume24h: '~$600M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for secure DeFi yields.',
          network: 'Arbitrum',
          liquidity: '~$0.5B',
          volume24h: '~$200M',
        },
      ],
    },
    Optimism: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for fast, low-cost swaps.',
          network: 'Optimism',
          liquidity: '~$0.8B',
          volume24h: '~$400M',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for DeFi efficiency.',
          network: 'Optimism',
          liquidity: '~$0.6B',
          volume24h: '~$300M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for trustless applications.',
          network: 'Optimism',
          liquidity: '~$0.1B',
          volume24h: '~$100M',
        },
      ],
    },
    'BNB Chain': {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for broad DeFi use.',
          network: 'BNB Chain',
          liquidity: '~$5B',
          volume24h: '~$1.5B',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for secure trading.',
          network: 'BNB Chain',
          liquidity: '~$3B',
          volume24h: '~$1B',
        },
        {
          name: 'BUSD (Binance USD)',
          creator: 'Binance and Paxos',
          description: 'A USD-backed stablecoin phasing out but still used.',
          network: 'BNB Chain',
          liquidity: '~$1B',
          volume24h: '~$0.3B',
        },
        {
          name: 'USDD',
          creator: 'TRON DAO',
          description: 'A USD-pegged stablecoin for DeFi and payments.',
          network: 'BNB Chain',
          liquidity: '~$1B',
          volume24h: '~$0.2B',
        },
      ],
    },
    Avalanche: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for rapid DeFi transactions.',
          network: 'Avalanche',
          liquidity: '~$0.6B',
          volume24h: '~$200M',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for scalable yields.',
          network: 'Avalanche',
          liquidity: '~$0.5B',
          volume24h: '~$150M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for trustless DeFi.',
          network: 'Avalanche',
          liquidity: '~$0.1B',
          volume24h: '~$50M',
        },
        {
          name: 'EURC',
          creator: 'Circle',
          description: 'A Euro-backed stablecoin for compliant cross-border use.',
          network: 'Avalanche',
          liquidity: '~$10M',
          volume24h: '~$1M',
        },
      ],
    },
    Fantom: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for fast DeFi swaps.',
          network: 'Fantom',
          liquidity: '~$0.1B',
          volume24h: '~$50M',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for efficient yields.',
          network: 'Fantom',
          liquidity: '~$0.08B',
          volume24h: '~$40M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for secure DeFi.',
          network: 'Fantom',
          liquidity: '~$0.02B',
          volume24h: '~$10M',
        },
      ],
    },
    Gnosis: {
      stablecoins: [
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for secure transactions.',
          network: 'Gnosis',
          liquidity: '~$0.2B',
          volume24h: '~$20M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for trustless applications.',
          network: 'Gnosis',
          liquidity: '~$0.1B',
          volume24h: '~$30M',
        },
      ],
    },
    Linea: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for emerging DeFi use.',
          network: 'Linea',
          liquidity: '~$0.08B',
          volume24h: '~$40M',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle and Coinbase',
          description: 'A USD-backed stablecoin for scalable swaps.',
          network: 'Linea',
          liquidity: '~$0.07B',
          volume24h: '~$40M',
        },
      ],
    },
    'NEAR (including Aurora)': {
      stablecoins: [
        {
          name: 'USDC.e',
          creator: 'Circle',
          description: 'A USD-backed bridged stablecoin transferred from Ethereum or other chains via Rainbow Bridge, differing from native USDC by relying on bridge contracts for cross-chain compatibility, used in NEAR DeFi.',
          network: 'NEAR (including Aurora)',
          liquidity: '~$0.3B',
          volume24h: '~$100M',
        },
        {
          name: 'USDT.e',
          creator: 'Tether Limited',
          description: 'A USD-pegged bridged stablecoin for NEAR ecosystems.',
          network: 'NEAR (including Aurora)',
          liquidity: '~$0.1B',
          volume24h: '~$50M',
        },
        {
          name: 'USDC',
          creator: 'Circle',
          description: 'A USD-backed native stablecoin growing in NEAR DeFi adoption.',
          network: 'NEAR (including Aurora)',
          liquidity: '~$0.08B',
          volume24h: '~$40M',
        },
        {
          name: 'FRAX',
          creator: 'Frax Finance',
          description: 'A decentralized USD-pegged stablecoin for yield farming.',
          network: 'NEAR (including Aurora)',
          liquidity: '~$0.02B',
          volume24h: '~$10M',
        },
        {
          name: 'EURS (STASIS EURO)',
          creator: 'STASIS',
          description: 'A Euro-backed stablecoin designed for transparency and efficiency, available on Aurora for cross-chain DeFi use.',
          network: 'NEAR (including Aurora)',
          liquidity: '~$5M',
          volume24h: '~$0.5M',
        },
        {
          name: 'A$DC',
          creator: 'Australia and New Zealand Banking Group (ANZ)',
          description: 'A stablecoin pegged to the Australian Dollar (AUD) used on Aurora for institutional and DeFi applications.',
          network: 'NEAR (including Aurora)',
          liquidity: '~$2M',
          volume24h: '~$0.2M',
        },
      ],
    },
    Sui: {
      stablecoins: [
        {
          name: 'USDC',
          creator: 'Circle',
          description: 'A USD-backed stablecoin for high-speed DeFi on Sui.',
          network: 'Sui',
          liquidity: '~$0.4B',
          volume24h: '~$150M',
        },
        {
          name: 'USDT',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for broad DeFi use.',
          network: 'Sui',
          liquidity: '~$0.4B',
          volume24h: '~$150M',
        },
      ],
    },
    Tron: {
      stablecoins: [
        {
          name: 'USDT (Tether)',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin dominating Tron’s DeFi.',
          network: 'Tron',
          liquidity: '~$60B',
          volume24h: '~$35B',
        },
        {
          name: 'USDC (USD Coin)',
          creator: 'Circle',
          description: 'A USD-backed stablecoin for secure transactions.',
          network: 'Tron',
          liquidity: '~$5B',
          volume24h: '~$3B',
        },
        {
          name: 'TUSD (TrueUSD)',
          creator: 'TrustToken',
          description: 'A USD-backed stablecoin for audited DeFi use.',
          network: 'Tron',
          liquidity: '~$2B',
          volume24h: '~$1B',
        },
        {
          name: 'USDD',
          creator: 'TRON DAO',
          description: 'A USD-pegged stablecoin for ecosystem payments.',
          network: 'Tron',
          liquidity: '~$3B',
          volume24h: '~$1B',
        },
        {
          name: 'EURT (Tether EURt)',
          creator: 'Tether Limited',
          description: 'A Euro-backed stablecoin for digital Euro use.',
          network: 'Tron',
          liquidity: '~$50M',
          volume24h: '~$5M',
        },
      ],
    },
    Aptos: {
      stablecoins: [
        {
          name: 'USDC',
          creator: 'Circle',
          description: 'A USD-backed stablecoin for emerging Aptos DeFi.',
          network: 'Aptos',
          liquidity: '~$0.1B',
          volume24h: '~$50M',
        },
        {
          name: 'USDT',
          creator: 'Tether Limited',
          description: 'A USD-pegged stablecoin for scalable transactions.',
          network: 'Aptos',
          liquidity: '~$0.1B',
          volume24h: '~$50M',
        },
      ],
    },
    Cosmos: {
      stablecoins: [
        {
          name: 'USDC',
          creator: 'Circle',
          description: 'A USD-backed stablecoin bridged via IBC for Cosmos DeFi.',
          network: 'Cosmos',
          liquidity: '~$0.3B',
          volume24h: '~$100M',
        },
        {
          name: 'DAI',
          creator: 'MakerDAO',
          description: 'A decentralized USD-pegged stablecoin for cross-chain DeFi.',
          network: 'Cosmos',
          liquidity: '~$0.1B',
          volume24h: '~$50M',
        },
        {
          name: 'IST (Inter Stable Token)',
          creator: 'Inter Protocol',
          description: 'A USD-pegged stablecoin native to Cosmos ecosystems.',
          network: 'Cosmos',
          liquidity: '~$0.2B',
          volume24h: '~$100M',
        },
      ],
    },
    Stellar: {
      stablecoins: [
        {
          name: 'USDC',
          creator: 'Circle',
          description: 'A USD-backed stablecoin for tokenized asset transfers.',
          network: 'Stellar',
          liquidity: '~$0.05B',
          volume24h: '~N/A',
        },
        {
          name: 'XLM-based variants',
          creator: 'Varies',
          description: 'Custom GBP/EUR-backed stablecoins for niche Stellar use.',
          network: 'Stellar',
          liquidity: '~$0.05B',
          volume24h: '~N/A',
        },
      ],
    },
    Bitcoin: {
      stablecoins: [
        {
          name: 'wUSDC',
          creator: 'Circle',
          description: 'A USD-backed wrapped stablecoin for sidechain DeFi (e.g., Rootstock).',
          network: 'Bitcoin',
          liquidity: '~$0.3B',
          volume24h: '~N/A',
        },
        {
          name: 'wUSDT',
          creator: 'Tether Limited',
          description: 'A USD-pegged wrapped stablecoin for sidechain use.',
          network: 'Bitcoin',
          liquidity: '~$0.2B',
          volume24h: '~N/A',
        },
      ],
    },
  };
  
  export async function getStablecoinData(chain: string): Promise<ChainData | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockDatabase[chain];
        resolve(data ?? null);
      }, 500);
    });
  }
