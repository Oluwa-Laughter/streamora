#!/usr/bin/env node

/**
 * Generate a test Stellar wallet for testnet
 */

import { Keypair } from "stellar-sdk";
import fs from "fs";

// Generate a new random keypair
const keypair = Keypair.random();

const publicKey = keypair.publicKey();
const secretKey = keypair.secret();

console.log("\n🚀 Stellar Testnet Wallet Generated\n");
console.log("━".repeat(60));
console.log("\n📍 PUBLIC KEY (Use this to receive funds):");
console.log(`   ${publicKey}\n`);
console.log("🔐 SECRET KEY (KEEP THIS SAFE - Do not share):");
console.log(`   ${secretKey}\n`);
console.log("━".repeat(60));
console.log("\n💡 Next Steps:");
console.log("   1. Fund this account from faucet:");
console.log("      https://laboratory.stellar.org/#account-creator\n");
console.log("   2. Paste the public key above in the faucet");
console.log("   3. You'll receive test XLM on testnet\n");
console.log("━".repeat(60) + "\n");

// Also save to .env
const envContent = `# Stellar Testnet Wallet
VITE_SIGNER_PUBLIC_KEY=${publicKey}

# Smart Contract Address (to be updated after deployment)
VITE_CONTRACT_ID=

# Network Configuration
VITE_NETWORK=testnet
VITE_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
`;

fs.writeFileSync(".env.local", envContent);
console.log("✅ Saved to .env.local");
console.log("⚠️  Keep your SECRET KEY safe. Never commit it to git!\n");
