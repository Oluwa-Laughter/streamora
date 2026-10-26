/**
 * Advanced vesting curve calculations
 * Extends basic linear vesting with more sophisticated patterns
 */

export enum VestingCurve {
  LINEAR = "linear",
  QUADRATIC = "quadratic",
  CUBIC = "cubic",
  EXPONENTIAL = "exponential",
  CLIFF = "cliff",
}

/**
 * Calculate vested amount using linear interpolation (simple)
 */
export function linearVesting(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime <= startTime) return 0n;
  if (currentTime >= endTime) return amount;

  const elapsed = BigInt(currentTime - startTime);
  const duration = BigInt(endTime - startTime);
  return (amount * elapsed) / duration;
}

/**
 * Calculate vested amount using quadratic curve (accelerates over time)
 * Useful for incentivizing longer holding
 */
export function quadraticVesting(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime <= startTime) return 0n;
  if (currentTime >= endTime) return amount;

  const elapsed = currentTime - startTime;
  const duration = endTime - startTime;
  const progress = elapsed / duration; // 0 to 1

  const sqrtProgress = Math.sqrt(progress);
  return BigInt(Math.floor(Number(amount) * sqrtProgress * sqrtProgress));
}

/**
 * Calculate vested amount using cubic curve (accelerates even more)
 */
export function cubicVesting(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime <= startTime) return 0n;
  if (currentTime >= endTime) return amount;

  const elapsed = currentTime - startTime;
  const duration = endTime - startTime;
  const progress = elapsed / duration;

  const cubeRoot = Math.cbrt(progress);
  return BigInt(Math.floor(Number(amount) * cubeRoot * cubeRoot * cubeRoot));
}

/**
 * Calculate vested amount using exponential curve (rapid acceleration)
 */
export function exponentialVesting(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime <= startTime) return 0n;
  if (currentTime >= endTime) return amount;

  const elapsed = currentTime - startTime;
  const duration = endTime - startTime;
  const progress = elapsed / duration;

  // e^x - 1 curve (normalized)
  const eValue = Math.exp(progress) - 1;
  const eMax = Math.exp(1) - 1;
  const normalized = eValue / eMax;

  return BigInt(Math.floor(Number(amount) * Math.min(normalized, 1)));
}

/**
 * Calculate vested amount with cliff vesting
 * No vesting until cliff time, then immediate full or partial vesting
 */
export function cliffVesting(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number,
  cliffTime: number,
  cliffAmount: bigint
): bigint {
  if (currentTime < cliffTime) return 0n;

  // After cliff, vest the cliff amount + linear vesting of remainder
  const remainingAmount = amount - cliffAmount;
  const timeAfterCliff = currentTime - cliffTime;
  const timeAfterCliffEnd = endTime - cliffTime;

  if (timeAfterCliff >= timeAfterCliffEnd) return amount;

  const vestedAfterCliff = (remainingAmount * BigInt(timeAfterCliff)) / BigInt(timeAfterCliffEnd);
  return cliffAmount + vestedAfterCliff;
}

/**
 * Generic vesting curve calculator
 * Supports multiple curve types
 */
export function calculateVestedAmount(
  amount: bigint,
  startTime: number,
  endTime: number,
  currentTime: number,
  curve: VestingCurve = VestingCurve.LINEAR
): bigint {
  switch (curve) {
    case VestingCurve.LINEAR:
      return linearVesting(amount, startTime, endTime, currentTime);
    case VestingCurve.QUADRATIC:
      return quadraticVesting(amount, startTime, endTime, currentTime);
    case VestingCurve.CUBIC:
      return cubicVesting(amount, startTime, endTime, currentTime);
    case VestingCurve.EXPONENTIAL:
      return exponentialVesting(amount, startTime, endTime, currentTime);
    default:
      return linearVesting(amount, startTime, endTime, currentTime);
  }
}

/**
 * Get curve description for display
 */
export function getCurveDescription(curve: VestingCurve): string {
  switch (curve) {
    case VestingCurve.LINEAR:
      return "Steady vesting - equal amounts per unit time";
    case VestingCurve.QUADRATIC:
      return "Accelerating vesting - rewards patience";
    case VestingCurve.CUBIC:
      return "Strongly accelerating vesting - highest reward for patience";
    case VestingCurve.EXPONENTIAL:
      return "Exponential vesting - rapid acceleration toward end";
    case VestingCurve.CLIFF:
      return "Cliff vesting - immediate vesting after cliff period";
    default:
      return "Unknown curve";
  }
}
