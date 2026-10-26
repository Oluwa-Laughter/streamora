# SDK Documentation

## Overview

The Streamora SDK is a TypeScript library for interacting with Soroban streaming payment contracts. It handles validation, calculations, and transaction preparation while leaving signing and submission to the caller.

## Installation

```bash
npm install streamora-sdk
```

Or from source:

```bash
npm install ./sdk
```

## Quick Start

```typescript
import { StreamoraClient, Network } from "streamora-sdk";

const client = new StreamoraClient({
  network: Network.TESTNET,
  contractId: "CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI",
  signerPublicKey: "GBBD47UZ...",
});

// Calculate vested amount
const vestedAmount = await client.getVestedAmount(stream);
console.log(vestedAmount.toString());
```

## API Reference

### StreamoraClient

Main client class for contract interaction.

#### Constructor

```typescript
constructor(config: ClientConfig)
```

**Parameters:**
- `config.network`: Network enum (TESTNET, PUBLIC, STANDALONE)
- `config.contractId`: Smart contract address
- `config.signerPublicKey`: Caller's public key
- `config.rpcUrl?`: Optional custom RPC endpoint

**Throws:**
- Error if `signerPublicKey` is invalid

#### getNetwork()

```typescript
getNetwork(): Network
```

Returns the configured network.

#### getContractId()

```typescript
getContractId(): string
```

Returns the contract ID being used.

#### getVestedAmount()

```typescript
async getVestedAmount(stream: Stream): Promise<bigint>
```

Calculates the vested amount of a stream at the current time.

**Parameters:**
- `stream`: Stream object with amount, startTime, endTime

**Returns:**
- Vested amount as bigint

**Example:**
```typescript
const stream = await getStreamFromContract("stream-123");
const vested = await client.getVestedAmount(stream);
console.log(`Vested: ${vested.toString()} stroops`);
```

#### getWithdrawableAmount()

```typescript
async getWithdrawableAmount(stream: Stream): Promise<bigint>
```

Calculates the amount currently withdrawable (vested minus already withdrawn).

**Parameters:**
- `stream`: Stream object

**Returns:**
- Withdrawable amount as bigint

#### getStreamInfo()

```typescript
async getStreamInfo(stream: Stream): Promise<StreamInfo>
```

Gets complete stream information including all calculated amounts.

**Returns:**
```typescript
interface StreamInfo {
  stream: Stream;
  vestedAmount: bigint;
  withdrawableAmount: bigint;
  currentTime: number;
}
```

#### prepareCreateStream()

```typescript
async prepareCreateStream(params: StreamCreationParams): Promise<PreparedTxn>
```

Prepares stream creation transaction for signing.

**Parameters:**
```typescript
interface StreamCreationParams {
  recipientAddress: string;
  tokenAddress: string;
  amount: bigint;
  startTime: number;
  endTime: number;
}
```

**Returns:**
```typescript
{
  recipientAddress: string;
  tokenAddress: string;
  amount: bigint;
  startTime: number;
  endTime: number;
}
```

**Throws:**
- Error if parameters are invalid
- Error if start time is in past
- Error if recipient or token address is invalid

**Example:**
```typescript
const txnData = await client.prepareCreateStream({
  recipientAddress: "GCPD7RQ36...",
  tokenAddress: "CAAAAAAA...",
  amount: 1000000000n,
  startTime: Math.floor(Date.now() / 1000) + 3600,
  endTime: Math.floor(Date.now() / 1000) + 2592000,
});

// Sign and submit txnData
```

#### prepareWithdraw()

```typescript
async prepareWithdraw(stream: Stream, params: WithdrawalParams): Promise<PreparedTxn>
```

Prepares withdrawal transaction.

**Parameters:**
```typescript
interface WithdrawalParams {
  streamId: string;
  amount: bigint;
}
```

**Throws:**
- Error if amount exceeds withdrawable balance
- Error if amount is zero or negative

#### validateStreamParams()

```typescript
validateStreamParams(params: StreamCreationParams): { valid: boolean; error?: string }
```

Validates stream parameters without throwing.

**Returns:**
```typescript
{ 
  valid: true // if all checks pass
} 
// or
{ 
  valid: false, 
  error: "Start time must be before end time" 
}
```

**Example:**
```typescript
const validation = client.validateStreamParams(params);
if (!validation.valid) {
  console.error(validation.error);
}
```

## Utility Functions

### calculateVestedAmount()

```typescript
export function calculateVestedAmount(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint
```

Manual vesting calculation (does not require client).

**Example:**
```typescript
import { calculateVestedAmount } from "streamora-sdk";

const amount = 1000000000n;
const start = 1700000000;
const end = 1702592000;
const now = Math.floor(Date.now() / 1000);

const vested = calculateVestedAmount(amount, start, end, now);
```

### calculateWithdrawable()

```typescript
export function calculateWithdrawable(
  vestedAmount: bigint,
  withdrawnAmount: bigint
): bigint
```

Calculates withdrawable amount from vested and withdrawn.

### toSmallestUnit()

```typescript
export function toSmallestUnit(
  amount: number | bigint,
  decimals: number
): bigint
```

Converts from decimal representation to stroops.

**Example:**
```typescript
import { toSmallestUnit } from "streamora-sdk";

// 100 tokens with 7 decimals
const stroops = toSmallestUnit(100, 7); // 1000000000n
```

### fromSmallestUnit()

```typescript
export function fromSmallestUnit(
  amount: bigint,
  decimals: number
): number
```

Converts from stroops back to decimal representation.

**Example:**
```typescript
import { fromSmallestUnit } from "streamora-sdk";

const display = fromSmallestUnit(1000000000n, 7); // 100
```

### isValidAddress()

```typescript
export function isValidAddress(address: string): boolean
```

Validates Stellar address format.

**Example:**
```typescript
import { isValidAddress } from "streamora-sdk";

isValidAddress("GBBD47UZ..."); // true
isValidAddress("invalid"); // false
```

### formatDate()

```typescript
export function formatDate(timestamp: number): string
```

Formats Unix timestamp to readable date.

### formatDuration()

```typescript
export function formatDuration(seconds: number): string
```

Formats duration in seconds to human-readable string.

**Example:**
```typescript
import { formatDuration } from "streamora-sdk";

formatDuration(2592000); // "30 days"
```

## Types

### Stream

```typescript
interface Stream {
  id: string;
  payer: string;
  recipient: string;
  token: string;
  amount: bigint;
  startTime: number;
  endTime: number;
  withdrawn: bigint;
  isCancelled: boolean;
}
```

### ClientConfig

```typescript
interface ClientConfig {
  network: Network;
  contractId: string;
  signerPublicKey: string;
  rpcUrl?: string;
}
```

### Network

```typescript
enum Network {
  TESTNET = "testnet",
  PUBLIC = "public",
  STANDALONE = "standalone",
}
```

## Error Handling

All async methods may throw:

```typescript
try {
  const vested = await client.getVestedAmount(stream);
} catch (error) {
  console.error("Failed to calculate vested:", error.message);
}
```

Common errors:
- "Invalid signer public key"
- "Invalid recipient address"
- "Amount must be positive"
- "Start time must be before end time"
- "Withdrawal amount exceeds withdrawable balance"

## Best Practices

1. **Always validate before submitting:**
   ```typescript
   const { valid, error } = client.validateStreamParams(params);
   if (!valid) throw new Error(error);
   ```

2. **Use bigint for all amounts:**
   ```typescript
   const amount = 1000000000n; // Not 1000000000
   ```

3. **Convert decimals at boundaries:**
   ```typescript
   const userInput = 100; // Display amount
   const stroops = toSmallestUnit(userInput, 7); // For contract
   ```

4. **Never hardcode contract addresses:**
   ```typescript
   const contractId = process.env.VITE_CONTRACT_ID;
   ```

5. **Cache stream data:**
   ```typescript
   // Fetch once, reuse for calculations
   const stream = await getStream("stream-123");
   const vested = calculateVestedAmount(stream.amount, ...);
   const withdrawable = calculateWithdrawable(vested, stream.withdrawn);
   ```

## Testing

Import for tests:

```typescript
import { 
  calculateVestedAmount, 
  calculateWithdrawable,
  StreamoraClient 
} from "streamora-sdk";
```

Example test:

```typescript
import { calculateVestedAmount } from "streamora-sdk";

test("vests 50% at midpoint", () => {
  const vested = calculateVestedAmount(
    1000n,
    1000,
    2000,
    1500 // midpoint
  );
  expect(vested).toBe(500n);
});
```

## Changelog

### v0.1.0

- Initial SDK release
- Core client and utilities
- Address validation
- Vesting calculations
