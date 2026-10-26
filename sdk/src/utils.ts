/**
 * Utility functions for stream calculations and conversions
 */

/**
 * Calculate vested amount at a given timestamp
 * @param amount Total stream amount
 * @param startTime Stream start timestamp
 * @param endTime Stream end timestamp
 * @param currentTime Current timestamp for calculation
 * @returns Vested amount
 */
export function calculateVestedAmount(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime <= startTime) {
    return 0n;
  }

  if (currentTime >= endTime) {
    return amount;
  }

  const elapsed = BigInt(currentTime - startTime);
  const duration = BigInt(endTime - startTime);

  return (amount * elapsed) / duration;
}

/**
 * Calculate withdrawable amount (vested - already withdrawn)
 * @param vestedAmount Amount that has vested
 * @param withdrawnAmount Amount already withdrawn
 * @returns Withdrawable amount
 */
export function calculateWithdrawable(
  vestedAmount: bigint,
  withdrawnAmount: bigint
): bigint {
  const available = vestedAmount - withdrawnAmount;
  return available > 0n ? available : 0n;
}

/**
 * Convert token amount from decimal representation to stroops/smallest unit
 * @param amount Amount in token
 * @param decimals Token decimal places
 * @returns Amount in smallest unit
 */
export function toSmallestUnit(amount: number | bigint, decimals: number): bigint {
  const factor = BigInt(10 ** decimals);
  const bigAmount = typeof amount === "bigint" ? amount : BigInt(Math.floor(amount));
  return bigAmount * factor;
}

/**
 * Convert amount from smallest unit to token representation
 * @param amount Amount in smallest unit
 * @param decimals Token decimal places
 * @returns Amount in token
 */
export function fromSmallestUnit(amount: bigint, decimals: number): number {
  const factor = BigInt(10 ** decimals);
  return Number(amount / factor) + Number(amount % factor) / Number(factor);
}

/**
 * Validate an address format
 * @param address Address to validate
 * @returns True if valid Stellar address
 */
export function isValidAddress(address: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(address);
}

/**
 * Format timestamp to readable date string
 * @param timestamp Unix timestamp
 * @returns Formatted date string
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format duration to human-readable string
 * @param seconds Duration in seconds
 * @returns Formatted duration
 */
export function formatDuration(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.join(" ");
}
