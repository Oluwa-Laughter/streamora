import { useCallback, useState } from "react";
import { parseError, PreparedTransaction, TxResult } from "@streamora/sdk";
import { client } from "../lib/client";
import { UserRejectedError, useWallet } from "../contexts/WalletContext";

export type TxPhase = "idle" | "simulating" | "signing" | "pending" | "confirmed" | "failed" | "rejected";

export interface TxState {
  phase: TxPhase;
  hash?: string;
  error?: string;
  result?: TxResult;
}

/** Runs prepare -> wallet signature -> submit -> confirm. "confirmed" is only set once the network reports SUCCESS. */
export function useTx() {
  const { sign } = useWallet();
  const [state, setState] = useState<TxState>({ phase: "idle" });

  const run = useCallback(
    async (prepare: () => Promise<PreparedTransaction>): Promise<TxResult | null> => {
      try {
        setState({ phase: "simulating" });
        const prepared = await prepare();
        setState({ phase: "signing" });
        const signed = await sign(prepared);
        setState({ phase: "pending" });
        const result = await client.submit(signed);
        if (result.status === "SUCCESS") {
          setState({ phase: "confirmed", hash: result.hash, result });
        } else {
          setState({ phase: "failed", hash: result.hash, error: result.error, result });
        }
        return result;
      } catch (e) {
        if (e instanceof UserRejectedError) setState({ phase: "rejected", error: e.message });
        else setState({ phase: "failed", error: parseError(e).message });
        return null;
      }
    },
    [sign]
  );

  const reset = useCallback(() => setState({ phase: "idle" }), []);
  return { state, run, reset };
}
