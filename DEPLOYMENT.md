# Streamora Deployment Guide

## Prerequisites
- Rust 1.70+ with Soroban tools
- Node.js 18+
- Stellar wallet (Freighter recommended)
- Git configured with GitHub credentials

## Contract Deployment to Testnet

### 1. Build the Contract
```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
```

### 2. Deploy to Stellar Testnet
```bash
# Set Soroban RPC endpoint
export SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443

# Generate or use existing account
soroban config identity create-testnet streamora

# Deploy contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/streamora_streaming.wasm \
  --id streamora-stream
```

This will output a contract ID. Save this for frontend configuration.

## Frontend Environment Setup

### 1. Create .env.local
```
VITE_CONTRACT_ID=<contract-id-from-deployment>
VITE_STELLAR_NETWORK=testnet
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org:443
```

### 2. Install Dependencies
```bash
cd apps/web
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Testing

### Smart Contract Tests
```bash
cd contracts
cargo test
```

### SDK Tests
```bash
cd sdk
npm test
```

### Frontend Tests (when implemented)
```bash
cd apps/web
npm test
```

## Testnet Faucet
Get test funds for deployment:
1. Go to: https://friendbot.stellar.org/
2. Enter your public key from `soroban config identity show streamora`
3. Receive 10,000 XLM for testing

## Verification

After deployment, verify the contract:
```bash
soroban contract info --id streamora-stream
```

View contract source:
```bash
soroban contract code --id streamora-stream
```

## Mainnet Deployment (Future)

Only after security audit:
1. Conduct professional security audit
2. Update contract for mainnet requirements
3. Deploy to mainnet using same process
4. Update frontend configuration
5. Monitor for issues

Do NOT deploy to mainnet without audit.

