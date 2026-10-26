# Deployment

## Contract (Stellar testnet) — deployed

- Contract: `CABJ22MJTXMZHACHV25MFD6ECVRQ3NRUJ2HYB2B4LVP3PQ6R2N72RN3K`
- Native XLM token contract (testnet): `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC`

Redeploying your own copy:

```bash
cargo install --locked soroban-cli          # needs libdbus-1-dev + pkg-config on Linux, or add --no-default-features
rustup target add wasm32v1-none
stellar keys generate me --network testnet --fund
bash scripts/deploy-testnet.sh
```

Build for `wasm32v1-none`. The default `wasm32-unknown-unknown` output from recent Rust versions is rejected by the network.

Never commit secret keys. `.env.local` is git-ignored.

## Frontend (Vercel)

`vercel.json` sets the build, output directory and the SPA rewrite so deep links work.

Environment variables (Project Settings → Environment Variables):

| Name | Value |
|---|---|
| `VITE_NETWORK` | `testnet` |
| `VITE_CONTRACT_ID` | contract id above |
| `VITE_RPC_URL` | `https://soroban-testnet.stellar.org` |
| `VITE_NETWORK_PASSPHRASE` | `Test SDF Network ; September 2015` |
| `VITE_DEFAULT_TOKEN` | native token contract above |

```bash
npm i -g vercel && vercel login
vercel          # keep the repo root as the project root
vercel --prod
```

Or import the GitHub repo in the Vercel dashboard (framework: Other; settings are read from `vercel.json`).

Users need the Freighter extension set to **Testnet**. Mainnet requires an independent audit first.
