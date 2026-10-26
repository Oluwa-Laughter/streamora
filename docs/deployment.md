# Deployment Guide

## Testnet Deployment

### Prerequisites

- Rust 1.70+ with `soroban-cli` installed
- Node.js 18+
- A Stellar testnet account with XLM for fees
- Source code cloned from the repository

### Step 1: Build the Contract

```bash
cd contracts/streaming
cargo build --target wasm32-unknown-unknown --release
```

This creates a WebAssembly binary at:
```
target/wasm32-unknown-unknown/release/streamora_streaming.wasm
```

### Step 2: Setup Soroban CLI

Initialize your Soroban configuration:

```bash
soroban config identity create <identity-name>
soroban config network add --global testnet --rpc-url https://soroban-testnet.stellar.org:443 --network-passphrase "Test SDF Network ; September 2015"
```

Get testnet XLM from the Stellar faucet.

### Step 3: Deploy the Contract

```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/streamora_streaming.wasm \
  --source-account <identity-name> \
  --network testnet
```

Save the returned contract ID for later use.

### Step 4: Configure the SDK

Update your client config with the deployed contract ID:

```typescript
import { StreamoraClient, Network } from "streamora-sdk";

const client = new StreamoraClient({
  network: Network.TESTNET,
  contractId: "CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI", // Your contract ID
  signerPublicKey: "GBBD47UZ...",
});
```

### Step 5: Test on Testnet

Create a test stream:

```typescript
const result = await client.prepareCreateStream({
  recipientAddress: "GCPD7RQ36...",
  tokenAddress: "CAAAAAAA...",
  amount: 1000000000n,
  startTime: Math.floor(Date.now() / 1000),
  endTime: Math.floor(Date.now() / 1000) + 2592000,
});

// Sign and submit (implementation depends on your wallet)
```

## Local Development with Standalone Soroban

For local testing without testnet:

```bash
# Start local Soroban instance (requires Docker)
soroban network add --global standalone --rpc-url http://localhost:8000

# Deploy locally
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/streamora_streaming.wasm \
  --network standalone
```

## Mainnet Deployment (Future)

Mainnet deployment requires:

1. **Security Audit**: Independent third-party code review
2. **Testnet Validation**: Weeks of testing on testnet
3. **Contract Review**: Final review of deployment configuration
4. **Monitoring**: Real-time monitoring and alert systems
5. **Documentation**: Clear upgrade and rollback procedures

### Mainnet Contract Upgrade Process

Once deployed, contract upgrades are not possible without migration:

1. Deploy new contract with updated code
2. Migrate user streams to new contract
3. Deprecate old contract

This design ensures immutability and security.

## Environment Variables

Create a `.env.example` file for configuration:

```env
# Network Configuration
VITE_NETWORK=testnet
VITE_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Contract Address
VITE_CONTRACT_ID=CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI

# Optional: Sentry for error tracking
VITE_SENTRY_DSN=

# Optional: Analytics
VITE_ANALYTICS_ID=
```

## Monitoring and Maintenance

### Metrics to Monitor

- Transaction latency
- Success/failure rates
- Token transfer failures
- Stream creation patterns
- Withdrawal patterns

### Log Aggregation

Implement centralized logging for:

- Contract execution errors
- Authorization failures
- Token transfer issues
- Network connectivity problems

### Rollback Plan

If a critical issue is discovered:

1. Alert users immediately
2. Pause new stream creation (if possible)
3. Encourage withdrawals
4. Deploy fixed contract
5. Migrate active streams

## Troubleshooting

### "Invalid WASM"

Ensure the contract is built for the correct target:
```bash
cargo build --target wasm32-unknown-unknown --release
```

### "Account not found"

Create the account on testnet:
```bash
soroban config identity create my-account
# Fund from faucet
```

### "Contract not found"

Verify the contract ID matches the deployed contract. Check:
```bash
soroban contract info --id <contract-id> --network testnet
```

### "Transaction timeout"

Network may be congested. Retry or increase fee. Check Stellar network status.

## References

- [Soroban Documentation](https://developers.stellar.org/docs/smart-contracts)
- [Stellar Testnet](https://stellar.expert/directory/testnet)
- [Soroban CLI](https://github.com/stellar/rs-soroban-cli)
