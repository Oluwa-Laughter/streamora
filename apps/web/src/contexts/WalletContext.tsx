import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetworkDetails,
  signTransaction,
} from "@stellar/freighter-api";
import { PreparedTransaction } from "@streamora/sdk";
import { config } from "../config";

export type WalletStatus = "disconnected" | "connecting" | "connected" | "no-wallet";

export class UserRejectedError extends Error {
  constructor() {
    super("You rejected the request in your wallet");
  }
}

interface WalletCtx {
  status: WalletStatus;
  address: string | null;
  wrongNetwork: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  sign: (tx: PreparedTransaction) => Promise<string>;
}

const Ctx = createContext<WalletCtx | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<WalletStatus>("disconnected");
  const [address, setAddress] = useState<string | null>(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkNetwork = useCallback(async () => {
    const n = await getNetworkDetails();
    setWrongNetwork(!n.error && n.networkPassphrase !== config.passphrase);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const c = await isConnected();
        if (!c.isConnected) return;
        const a = await isAllowed();
        if (!a.isAllowed) return;
        const addr = await getAddress();
        if (!addr.error && addr.address) {
          setAddress(addr.address);
          setStatus("connected");
          await checkNetwork();
        }
      } catch {
        /* wallet not available; stay disconnected */
      }
    })();
  }, [checkNetwork]);

  const connect = useCallback(async () => {
    setError(null);
    setStatus("connecting");
    try {
      const c = await isConnected();
      if (c.error || !c.isConnected) {
        setStatus("no-wallet");
        setError("Freighter wallet not detected. Install it from freighter.app and reload.");
        return;
      }
      const r = await requestAccess();
      if (r.error || !r.address) {
        setStatus("disconnected");
        setError(r.error?.message ?? "Connection was rejected");
        return;
      }
      setAddress(r.address);
      setStatus("connected");
      await checkNetwork();
    } catch (e) {
      setStatus("disconnected");
      setError(e instanceof Error ? e.message : "Failed to connect wallet");
    }
  }, [checkNetwork]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setStatus("disconnected");
    setWrongNetwork(false);
  }, []);

  const sign = useCallback(
    async (tx: PreparedTransaction) => {
      if (!address) throw new Error("Connect your wallet first");
      await checkNetwork();
      const r = await signTransaction(tx.xdr, { networkPassphrase: tx.networkPassphrase, address });
      if (r.error || !r.signedTxXdr) throw new UserRejectedError();
      return r.signedTxXdr;
    },
    [address, checkNetwork]
  );

  const value = useMemo(
    () => ({ status, address, wrongNetwork, error, connect, disconnect, sign }),
    [status, address, wrongNetwork, error, connect, disconnect, sign]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWallet() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWallet must be used inside WalletProvider");
  return v;
}
