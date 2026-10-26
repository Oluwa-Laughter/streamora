# Streamora

> **Money that moves with time.**

Streamora is open-source streaming-payments infrastructure built on Stellar using Soroban smart contracts. It enables time-based payments where payers create payment streams and recipients withdraw accumulated amounts as time progresses.

## Vision

Streaming payments are fundamental to modern finance—payroll, vendor contracts, and subscriptions all benefit from continuous accrual rather than lump-sum transactions. Streamora brings this capability to Stellar and the broader blockchain ecosystem as a transparent, auditable, open-source platform.

## Features

- ✅ **Linear Time-Based Vesting**: Smart contracts calculate withdrawable amounts based on elapsed time.
- ✅ **Stellar Native**: Built on Soroban smart contracts using Rust.
- ✅ **TypeScript SDK**: Clean, typed SDK for contract interaction.
- ✅ **React Application**: Dashboard for creating and managing streams.
- ✅ **Open Source**: MIT licensed. Community-driven development.
- 🔄 **Planned**: Multi-recipient streams, batch operations, recurring patterns.

## Quick Start

### Prerequisites

- **Rust 1.70+** with Soroban tools
- **Node.js 18+**
- **A Stellar testnet wallet** (Freighter or equivalent)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Strea-mora/Streamora.git
cd Streamora

# Set up the Rust environment
rustup update
cargo install soroban-cli

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
Streamora/
├── contracts/              # Soroban smart contracts (Rust)
│   ├── streaming/         # Core streaming contract
│   └── tests/             # Contract unit tests
├── sdk/                   # TypeScript SDK
│   ├── src/
│   │   ├── client.ts
│   │   ├── types.ts
│   │   └── utils/
│   └── tests/
├── apps/                  # Frontend applications
│   ├── web/               # React + Vite application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   └── App.tsx
│   │   └── public/
│   └── docs/              # Documentation website
├── docs/                  # Markdown documentation
│   ├── architecture.md
│   ├── protocol-spec.md
│   ├── security.md
│   └── deployment.md
├── CONTRIBUTING.md
├── SECURITY.md
└── package.json
```

## Contract MVP Specification

### Creating a Stream

```
stream = Stream {
  id: String,
  payer: Address,
  recipient: Address,
  token: Address,
  amount: i128,
  start_time: u64,
  end_time: u64,
  withdrawn: i128,
  is_cancelled: bool,
}
```

### Vesting Formula

At time `t`:
- If `t ≤ start_time`: vested = 0
- If `t ≥ end_time`: vested = amount
- Otherwise: vested = `floor(amount * (t - start_time) / (end_time - start_time))`

Withdrawable = vested - withdrawn

### Key Functions

- `create_stream()`: Payer initiates a new stream
- `withdraw()`: Recipient claims accumulated amount
- `get_stream()`: View stream details
- `get_vested_amount()`: Calculate amount vested at a timestamp
- `cancel_stream()`: Payer cancels the stream (unreleased work)

## Routes

### Public Pages

- `/` – Landing page with hero and features
- `/how-it-works` – Stream mechanics explained
- `/features` – Feature list and roadmap
- `/use-cases` – Real-world examples
- `/developers` – Developer entry point
- `/docs` – Documentation hub
- `/about` – Project mission
- `/community` – Links and contribution info

### Application Routes (Authenticated)

- `/app` – Dashboard
- `/app/streams` – Stream list
- `/app/streams/create` – Create new stream
- `/app/streams/:id` – Stream details
- `/app/streams/:id/withdraw` – Withdrawal interface
- `/app/activity` – Transaction history
- `/app/settings` – Network and preferences

## Documentation

- **[Architecture](./docs/architecture.md)** – System design and contract architecture
- **[Protocol Spec](./docs/protocol-spec.md)** – Detailed stream specification
- **[Security](./docs/security.md)** – Security assumptions and threat model
- **[Frontend](./docs/frontend.md)** – UI/UX patterns and component library
- **[SDK](./docs/sdk.md)** – TypeScript SDK API reference
- **[Deployment](./docs/deployment.md)** – Testnet and mainnet setup

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](./SECURITY.md) for security disclosure and known limitations.

## License

MIT. See LICENSE file.

## Status

**Alpha**. Core smart contract and SDK are under development. APIs may change.

---

Built with ❤️ on Stellar. [Contribute](./CONTRIBUTING.md) | [Report Issues](https://github.com/Strea-mora/Streamora/issues)
