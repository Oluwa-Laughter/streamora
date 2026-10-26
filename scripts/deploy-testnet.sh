#!/bin/bash

# Streamora Testnet Deployment Script
# This script deploys the smart contract to Stellar testnet

set -e

echo "🚀 Streamora Testnet Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check prerequisites
if ! command -v soroban &> /dev/null; then
    echo "❌ soroban-cli not installed"
    echo "Install with: cargo install soroban-cli"
    exit 1
fi

if ! command -v rustc &> /dev/null; then
    echo "❌ Rust not installed"
    echo "Install from: https://rustup.rs/"
    exit 1
fi

# Step 1: Build the contract
echo ""
echo "📦 Step 1: Building smart contract..."
cd contracts/streaming
cargo build --target wasm32-unknown-unknown --release
WASM_FILE="target/wasm32-unknown-unknown/release/streamora_streaming.wasm"

if [ ! -f "$WASM_FILE" ]; then
    echo "❌ Contract build failed"
    exit 1
fi

echo "✅ Contract built: $WASM_FILE"
cd ../..

# Step 2: Setup Soroban network
echo ""
echo "🌐 Step 2: Configuring Soroban testnet..."
soroban config network add \
  --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015" || true

# Step 3: Create identity (if needed)
IDENTITY_NAME="streamora-testnet"
echo ""
echo "🔐 Step 3: Setting up identity..."
soroban config identity create "$IDENTITY_NAME" --global || true

# Get the public key
PUBLIC_KEY=$(soroban config identity address "$IDENTITY_NAME")
echo "   Identity: $IDENTITY_NAME"
echo "   Public Key: $PUBLIC_KEY"

# Step 4: Deploy contract
echo ""
echo "🚀 Step 4: Deploying contract to testnet..."
echo "   This may take a minute..."

CONTRACT_ID=$(soroban contract deploy \
  --wasm $WASM_FILE \
  --source-account "$IDENTITY_NAME" \
  --network testnet)

echo ""
echo "✅ Contract deployed successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Deployment Information:"
echo "   Contract ID: $CONTRACT_ID"
echo "   Network: Testnet"
echo "   RPC: https://soroban-testnet.stellar.org:443"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Next Steps:"
echo "   1. Update .env.local with the Contract ID:"
echo "      VITE_CONTRACT_ID=$CONTRACT_ID"
echo ""
echo "   2. Verify contract on testnet:"
echo "      https://stellar.expert/explorer/testnet/contract/$CONTRACT_ID"
echo ""
echo "   3. Start the app: npm run dev"
echo ""
echo "✨ Deployment complete!"
