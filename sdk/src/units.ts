/** Parses a decimal string like "12.5" into the token's smallest unit, with no floating point. */
export function parseUnits(value: string, decimals: number): bigint {
  const v = value.trim();
  if (!/^\d+(\.\d+)?$/.test(v)) throw new Error("Enter a valid positive number");
  const [whole, frac = ""] = v.split(".");
  if (frac.length > decimals) throw new Error(`At most ${decimals} decimal places`);
  return BigInt(whole + frac.padEnd(decimals, "0"));
}

export function formatUnits(value: bigint, decimals: number): string {
  const neg = value < 0n;
  const s = (neg ? -value : value).toString().padStart(decimals + 1, "0");
  const whole = s.slice(0, s.length - decimals);
  const frac = s.slice(s.length - decimals).replace(/0+$/, "");
  return `${neg ? "-" : ""}${whole}${frac ? "." + frac : ""}`;
}
