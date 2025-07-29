"use client"

import { useAccount } from 'wagmi'
import { useEffect } from 'react'

export function useAuth() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()

  // Store auth state in session storage and cookies for middleware access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authState = {
        isConnected,
        address: address || null,
        timestamp: Date.now()
      }
      sessionStorage.setItem('wallet-auth', JSON.stringify(authState))
      
      // Set cookie for middleware
      if (isConnected) {
        document.cookie = 'wallet-connected=true; path=/; secure; samesite=strict'
      } else {
        document.cookie = 'wallet-connected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    }
  }, [isConnected, address])

  // Clear session storage and cookies on disconnect
  useEffect(() => {
    if (typeof window !== 'undefined' && isDisconnected) {
      sessionStorage.removeItem('wallet-auth')
      document.cookie = 'wallet-connected=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }, [isDisconnected])

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    isLoading: isConnecting
  }
}