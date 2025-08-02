import { useState, useEffect } from "react";

interface UnderlyingToken {
  chain_id: number;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  amount: number;
  price_usd: number;
  value_usd: number;
}

interface TokenSnapshot {
  index: string;
  chain: number;
  contract_address: string;
  token_id: number;
  address: string;
  block_number_created: number;
  block_number: number | null;
  timestamp: number | null;
  protocol_type: string;
  protocol_handler_id: string;
  protocol_group_id: string;
  protocol_group_name: string;
  protocol_group_icon: string;
  protocol_sub_group_id: string | null;
  protocol_sub_group_name: string | null;
  contract_name: string;
  contract_symbol: string;
  asset_sign: number;
  status: number;
  underlying_tokens: UnderlyingToken[];
  reward_tokens: any[];
  value_usd: number;
  locked: boolean;
}

interface PortfolioTokensData {
  result: TokenSnapshot[];
}

interface UsePortfolioTokensProps {
  address: string;
  chainId: string;
  enabled?: boolean;
}

export function usePortfolioTokens({
  address,
  chainId,
  enabled = true,
}: UsePortfolioTokensProps) {
  const [data, setData] = useState<PortfolioTokensData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !address || !chainId) {
      return;
    }

    const fetchTokensData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          addresses: address,
          chain_id: chainId,
        });

        const response = await fetch(
          `https://stable-center-backend-production.up.railway.app/api/defi/portfolio/tokens?${params}`
        );
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Failed to fetch tokens data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchTokensData();
  }, [address, chainId, enabled]);

  // Helper function to get native token data
  const getNativeToken = () => {
    if (!data?.result) return null;

    // Find the native token (usually has contract_address "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    return data.result.find(
      (token) =>
        token.protocol_handler_id === "native" ||
        token.contract_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
  };

  // Helper function to get total portfolio value
  const getTotalValue = () => {
    if (!data?.result) return 0;

    return data.result.reduce((total, token) => total + token.value_usd, 0);
  };

  return {
    data,
    loading,
    error,
    getNativeToken,
    getTotalValue,
    refetch: () => {
      setData(null);
      setError(null);
      // Trigger re-fetch by updating a dependency
    },
  };
}
