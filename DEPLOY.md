# Streamora Deployment Guide

## Table of Contents
1. [Generate Testnet Wallet](#generate-testnet-wallet)
2. [Deploy Smart Contract to Testnet](#deploy-smart-contract-to-testnet)
3. [Connect Frontend to Live Contract](#connect-frontend-to-live-contract)
4. [Deploy to Vercel](#deploy-to-vercel)

---

## Generate Testnet Wallet

### Step 1: Generate Wallet

```bash
cd ~/Streamora
node scripts/generate-wallet.js
```

This will output:
```
📍 PUBLIC KEY: GDHLHKGQFWANAUZF4Z7LI7IJQF4IEUFPMLFVIF7OSQC5K335K5FLKYQE
🔐 SECRET KEY: SDSE5G6VM4B6KD7UZ3Z6JGEKCOV2HJ3YJ7AMMVVHYZM7VRZ3TM6LJM4A
```

**⚠️ IMPORTANT**: Never share or commit your SECRET KEY

### Step 2: Fund Your Account

1. Go to [Stellar Laboratory](https://laboratory.stellar.org/#account-creator)
2. Select **Network**: Testnet
3. Paste your PUBLIC KEY
4. Click "Get test XLM"
5. You'll receive 10,000 test XLM

### Step 3: Verify Funding

```bash
soroban config identity create streamora-testnet
soroban config network add --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"
```

Check your balance at:
```
https://stellar.expert/explorer/testnet/account/YOUR_PUBLIC_KEY
```

---

## Deploy Smart Contract to Testnet

### Prerequisites

```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Soroban CLI
cargo install soroban-cli
```

### Deploy

```bash
cd ~/Streamora
bash scripts/deploy-testnet.sh
```

This will:
1. ✅ Build the WebAssembly contract
2. ✅ Setup Soroban testnet configuration
3. ✅ Deploy to Stellar testnet
4. ✅ Output your **Contract ID**

### Output Example

```
✅ Contract deployed successfully!

📋 Deployment Information:
   Contract ID: CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI
   Network: Testnet
   RPC: https://soroban-testnet.stellar.org:443
```

**Save this Contract ID** - you'll need it for the next step.

---

## Connect Frontend to Live Contract

### Step 1: Update Environment Variables

Edit `.env.local` (created by wallet script):

```env
# Your testnet account
VITE_SIGNER_PUBLIC_KEY=GDHLHKGQFWANAUZF4Z7LI7IJQF4IEUFPMLFVIF7OSQC5K335K5FLKYQE

# Contract ID from deployment
VITE_CONTRACT_ID=CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI

# Testnet Configuration
VITE_NETWORK=testnet
VITE_RPC_URL=https://soroban-testnet.stellar.org:443
VITE_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
```

### Step 2: Test Locally

```bash
npm run dev
# Opens at http://localhost:5173
```

### Step 3: Verify Contract Connection

1. Open http://localhost:5173
2. Click "Connect Wallet" (Freighter must be installed)
3. Select your testnet account
4. Dashboard should show "✅ Connected"

### Step 4: View Your Contract on Testnet

```
https://stellar.expert/explorer/testnet/contract/YOUR_CONTRACT_ID
```

---

## Deploy to Vercel

### Option A: Deploy via CLI (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

```bash
cd ~/Streamora
vercel
```

Follow the prompts:
- **Project name**: streamora
- **Framework**: Vite
- **Output directory**: apps/web/dist

#### Step 3: Set Environment Variables

```bash
vercel env add VITE_CONTRACT_ID
# Paste: CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI

vercel env add VITE_SIGNER_PUBLIC_KEY
# Paste: GDHLHKGQFWANAUZF4Z7LI7IJQF4IEUFPMLFVIF7OSQC5K335K5FLKYQE

vercel env add VITE_NETWORK
# Paste: testnet

vercel env add VITE_RPC_URL
# Paste: https://soroban-testnet.stellar.org:443

vercel env add VITE_NETWORK_PASSPHRASE
# Paste: Test SDF Network ; September 2015
```

#### Step 4: Redeploy with Environment Variables

```bash
vercel --prod
```

Your app will be live at: `https://streamora-xyz.vercel.app`

---

### Option B: Deploy via GitHub (Recommended for Teams)

#### Step 1: Push to GitHub

```bash
cd ~/Streamora
git remote set-url origin https://github.com/YOUR_USERNAME/Streamora.git
git push origin main
```

#### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects Vite configuration
5. Add Environment Variables (same as Step 3 above)
6. Click "Deploy"

#### Step 3: Auto-Deployments

Now every push to `main` automatically deploys to Vercel.

---

## Verify Deployment

### Local Testing

```bash
# Test contract interaction
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Live Testing

1. Visit your Vercel URL
2. Connect with Freighter wallet
3. Try creating a test stream:
   - Recipient: Any Stellar address
   - Token: Native Stellar token address
   - Amount: 100
   - Duration: 30 days
4. Verify transaction appears in Activity

---

## Troubleshooting

### "Contract not found" Error

1. Check Contract ID is correct
2. Verify contract is deployed on testnet:
   ```bash
   soroban contract info --id YOUR_CONTRACT_ID --network testnet
   ```

### Wallet Connection Issues

1. Install [Freighter Extension](https://www.freighter.app)
2. Switch to **Testnet** in Freighter settings
3. Fund account with test XLM from faucet

### Deployment to Vercel Fails

1. Ensure `vercel.json` exists in root
2. Check environment variables are set
3. Verify all dependencies installed: `npm install --legacy-peer-deps`
4. Run locally first: `npm run dev`

### Environment Variables Not Loading

1. In Vercel dashboard, go to Settings → Environment Variables
2. Verify variables are set for Production
3. Redeploy: `vercel --prod`

---

## Production Checklist

Before deploying to mainnet:

- [ ] Contract has been audited by security firm
- [ ] Tested extensively on testnet
- [ ] All environment variables configured
- [ ] HTTPS enabled (Vercel default)
- [ ] Error logging configured (Sentry optional)
- [ ] Rate limiting setup if needed
- [ ] Legal/compliance review completed

---

## Next Steps

1. ✅ Test on testnet
2. ✅ Deploy to Vercel
3. ✅ Share your URL
4. 🔄 Gather user feedback
5. 📋 Plan mainnet deployment (requires audit)

---

## Support

- **Stellar Docs**: https://developers.stellar.org
- **Soroban**: https://soroban.stellar.org
- **Vercel**: https://vercel.com/docs
- **Streamora**: https://github.com/Strea-mora/Streamora

---

**Deployed! 🚀**
