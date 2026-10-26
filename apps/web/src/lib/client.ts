import { StreamoraClient } from "@streamora/sdk";
import { config } from "../config";

export const client = new StreamoraClient({
  network: config.network,
  contractId: config.contractId,
  rpcUrl: config.rpcUrl,
});
