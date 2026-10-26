# Protocol Specification

## Streaming Payment Protocol

### Core Concepts

**Stream**: A time-based payment agreement where a payer commits funds to accrue linearly over time, and a recipient can withdraw accumulated amounts.

**Vesting**: The process by which a stream amount becomes available for withdrawal over time.

**Linear Vesting**: A simple formula where the amount available increases proportionally with elapsed time.

## Stream Structure

A stream is defined by:

```
struct Stream {
  id: String,              // Unique identifier
  payer: Address,          // Party funding the stream
  recipient: Address,      // Party receiving the stream
  token: Address,          // Token contract address
  amount: i128,            // Total amount being streamed
  startTime: u64,          // Stream start (Unix timestamp)
  endTime: u64,            // Stream end (Unix timestamp)
  withdrawn: i128,         // Amount already withdrawn
  isCancelled: bool,       // Whether stream is cancelled
}
```

## Vesting Formula

At a given timestamp `t`, the amount vested is calculated as:

```
if t <= startTime:
  vested = 0
elif t >= endTime:
  vested = amount
else:
  vested = floor(amount * (t - startTime) / (endTime - startTime))
```

The withdrawable amount is:

```
withdrawable = max(0, vested - withdrawn)
```

### Integer Arithmetic

All calculations use integer arithmetic to avoid floating-point precision issues:

- `amount`: i128 (supports large values and decimals via unit conversion)
- `vested`: Computed as `amount * (t - startTime) / (endTime - startTime)` with floor division
- `withdrawn`: i128, tracks cumulative withdrawals

Tokens are represented in their smallest unit (e.g., stroops for Stellar):
- 1 XLM = 10,000,000 stroops
- SDK provides `toSmallestUnit()` and `fromSmallestUnit()` helpers

## Operations

### 1. Create Stream

**Function:** `create_stream(payer, recipient, token, amount, start_time, end_time)`

**Preconditions:**
- Caller is authorized (typically payer or contract owner)
- `recipient` is a valid address
- `token` is a valid contract address
- `amount > 0`
- `start_time < end_time`
- `start_time >= current_time` (cannot start in past)
- Payer has sufficient balance and approves token transfer

**Effects:**
- Create stream with unique ID
- Transfer `amount` of token from payer to contract (escrowed)
- Emit `StreamCreated` event
- Return stream ID

**Error Cases:**
- Invalid addresses
- Negative or zero amount
- Invalid time range
- Insufficient balance
- Token transfer failure

### 2. Get Stream

**Function:** `get_stream(stream_id) -> Stream`

**Returns:** Current stream state

**Error Cases:**
- Stream not found

### 3. Get Vested Amount

**Function:** `get_vested_amount(stream_id, timestamp) -> u128`

**Returns:** Amount vested at the given timestamp

**Notes:**
- Does not require authorization
- Useful for off-chain calculations and UI display

### 4. Withdraw

**Function:** `withdraw(stream_id, amount)`

**Preconditions:**
- Caller is the recipient
- Stream is not cancelled
- `amount > 0`
- `amount <= withdrawable_amount`
- Contract has sufficient balance (escrowed)

**Effects:**
- Increment stream's `withdrawn` counter
- Transfer `amount` of token from contract to recipient
- Emit `Withdrawn` event
- Return confirmation

**Error Cases:**
- Stream not found or cancelled
- Caller is not recipient
- Amount exceeds withdrawable balance
- Token transfer failure

### 5. Cancel Stream

**Function:** `cancel_stream(id) -> i128` (refunded amount)

**Who / when:** only the payer, at any time before it has been cancelled.

**Effects:**
- Vesting freezes at the cancellation timestamp (`cancelled_at`).
- The unvested remainder (`amount - vested`) is refunded to the payer immediately.
- Recipients keep their vested share and can still withdraw it after cancellation.
- Per-recipient floor-division dust stays escrowed in the contract.

## Events

### StreamCreated
```
event StreamCreated {
  streamId: string,
  payer: address,
  recipient: address,
  token: address,
  amount: i128,
  startTime: u64,
  endTime: u64,
}
```

### Withdrawn
```
event Withdrawn {
  streamId: string,
  amount: i128,
  timestamp: u64,
}
```

### Cancelled (Planned)
```
event Cancelled {
  streamId: string,
  timestamp: u64,
}
```

## Token Handling

The protocol is token-agnostic. Any Stellar-compatible token can be used.

**Token Decimal Handling:**
- Standard Stellar tokens use 7 decimals (XLM, USDC, etc.)
- Contract and SDK handle conversions consistently
- Amount stored in smallest unit (stroops) internally

## Authorization Model

### MVP
- No complex multi-signature
- Payer authorization for creation (signature validation)
- Recipient authorization for withdrawal (signature validation)

### Future
- Conditional authorization (e.g., third-party approvers)
- Multi-signature requirements

## Time Handling

- All timestamps are Unix seconds (not milliseconds)
- Contract uses Soroban's ledger time for current time
- SDK converts from JavaScript milliseconds to seconds

## Limitations (MVP)

1. **Single Recipient**: Streams have one recipient. Multi-recipient patterns require multiple streams.
2. **Linear Vesting Only**: No curve-based, milestone-based, or recurring vesting.
3. **Cancellation is payer-only** and cannot be undone.
4. **No Pause/Resume**: Streams run continuously once created.
5. **Fixed Time Bounds**: Cannot be extended or modified.

See ROADMAP for planned features.
