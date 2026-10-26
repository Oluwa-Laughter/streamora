import { useState, useEffect } from "react";

export interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
  error: string | null;
  isLoading: boolean;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    publicKey: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const freighter = (window as any).freighter;
      if (!freighter) return;

      const publicKey = await freighter.getPublicKey();
      if (publicKey) {
        setWallet({
          isConnected: true,
          publicKey,
          error: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Wallet check failed:", error);
    }
  };

  const connectWallet = async () => {
    setWallet((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const freighter = (window as any).freighter;
      if (!freighter) {
        throw new Error("Freighter wallet not found. Please install it.");
      }

      const publicKey = await freighter.getPublicKey();
      setWallet({
        isConnected: true,
        publicKey,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet";
      setWallet({
        isConnected: false,
        publicKey: null,
        error: errorMessage,
        isLoading: false,
      });
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      publicKey: null,
      error: null,
      isLoading: false,
    });
  };

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    checkWalletConnection,
  };
}
