import { NETWORKS, NetworkName } from "@streamora/sdk";

const network = (import.meta.env.VITE_NETWORK ?? "testnet") as NetworkName;

export const config = {
  network,
  contractId:
    import.meta.env.VITE_CONTRACT_ID ?? "CABJ22MJTXMZHACHV25MFD6ECVRQ3NRUJ2HYB2B4LVP3PQ6R2N72RN3K",
  rpcUrl: import.meta.env.VITE_RPC_URL ?? NETWORKS[network].rpcUrl,
  passphrase: import.meta.env.VITE_NETWORK_PASSPHRASE ?? NETWORKS[network].passphrase,
  // Testnet native XLM Stellar Asset Contract; override for other tokens.
  defaultToken:
    import.meta.env.VITE_DEFAULT_TOKEN ?? "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
  decimals: 7,
  explorer:
    network === "public" ? "https://stellar.expert/explorer/public" : "https://stellar.expert/explorer/testnet",
};
