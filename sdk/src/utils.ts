/** floor(amount * (t - start) / (end - start)), clamped to [0, amount]. Mirrors the contract. */
export function calculateVestedAmount(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime <= startTime) return 0n;
  if (currentTime >= endTime) return amount;
  return (amount * BigInt(currentTime - startTime)) / BigInt(endTime - startTime);
}

export function calculateWithdrawable(entitled: bigint, withdrawn: bigint): bigint {
  const a = entitled - withdrawn;
  return a > 0n ? a : 0n;
}

/** A recipient's entitlement: floor(vested * shares / 100). */
export function recipientEntitlement(vested: bigint, shares: number): bigint {
  return (vested * BigInt(shares)) / 100n;
}

export function isValidAddress(address: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(address);
}

export function isValidContractId(id: string): boolean {
  return /^C[A-Z2-7]{55}$/.test(id);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (d) parts.push(`${d} day${d > 1 ? "s" : ""}`);
  if (h) parts.push(`${h} hour${h > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} minute${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "0 minutes";
}

export function validateCreateParams(p: {
  recipients: { address: string; shares: number }[];
  token: string;
  amount: bigint;
  startTime: number;
  endTime: number;
}, now = Math.floor(Date.now() / 1000)): string | null {
  if (p.recipients.length < 1 || p.recipients.length > 10) return "Add between 1 and 10 recipients";
  let total = 0;
  const seen = new Set<string>();
  for (const r of p.recipients) {
    if (!isValidAddress(r.address)) return `Invalid recipient address: ${r.address || "(empty)"}`;
    if (seen.has(r.address)) return "Duplicate recipient address";
    seen.add(r.address);
    if (!Number.isInteger(r.shares) || r.shares < 1 || r.shares > 100) return "Each share must be a whole number from 1 to 100";
    total += r.shares;
  }
  if (total !== 100) return `Shares must sum to 100 (currently ${total})`;
  if (!isValidContractId(p.token)) return "Invalid token contract address";
  if (p.amount <= 0n) return "Amount must be greater than zero";
  if (p.startTime >= p.endTime) return "Start time must be before end time";
  if (p.endTime <= now) return "End time must be in the future";
  return null;
}
