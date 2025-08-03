"use client"

import { useAccount, useReadContracts } from 'wagmi'
import { useState, useEffect } from 'react'

const STABLECOIN_CONTRACTS = {
  // Ethereum mainnet addresses - verified official contracts
  1: {
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  // Optimism mainnet addresses - verified official contracts
  10: {
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    USDC: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', // Native USDC (recommended)
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  },
}

const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export function useWalletBalance() {
  const { address, chainId } = useAccount()
  const [totalUsdValue, setTotalUsdValue] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const contracts = chainId && STABLECOIN_CONTRACTS[chainId as keyof typeof STABLECOIN_CONTRACTS]
    ? Object.entries(STABLECOIN_CONTRACTS[chainId as keyof typeof STABLECOIN_CONTRACTS]).flatMap(([, contractAddress]) => [
        {
          address: contractAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [address],
        },
        {
          address: contractAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'decimals',
        },
      ])
    : []

  const { data: contractResults } = useReadContracts({
    contracts,
    query: {
      enabled: !!address && !!chainId && contracts.length > 0,
    },
  })

  useEffect(() => {
    if (!contractResults || !address) {
      setTotalUsdValue(0)
      return
    }

    setIsLoading(true)
    
    try {
      let total = 0
      const tokenCount = contracts.length / 2 // Each token has 2 calls (balance + decimals)
      
      for (let i = 0; i < tokenCount; i++) {
        const balanceResult = contractResults[i * 2]
        const decimalsResult = contractResults[i * 2 + 1]
        
        if (balanceResult.status === 'success' && decimalsResult.status === 'success') {
          const balance = balanceResult.result as unknown as bigint
          const decimals = decimalsResult.result as unknown as number
          
          // Convert balance to USD (assuming 1:1 peg for stablecoins)
          if (balance > 0n) {
            const balanceInUsd = Number(balance) / Math.pow(10, decimals)
            total += balanceInUsd
          }
        }
      }
      
      setTotalUsdValue(total)
    } catch (error) {
      console.error('Error calculating wallet balance:', error)
      setTotalUsdValue(0)
    } finally {
      setIsLoading(false)
    }
  }, [contractResults, address, contracts.length])

  return {
    totalUsdValue,
    isLoading,
    formattedValue: totalUsdValue > 0 
      ? `$${totalUsdValue.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}` 
      : '$0.00'
  }
}