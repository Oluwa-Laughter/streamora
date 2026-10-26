export const CONTRACT_ERRORS: Record<number, string> = {
  1: "Amount must be greater than zero",
  2: "Invalid times: start must be before end, and end must be in the future",
  3: "Invalid recipients: 1-10 recipients, each 1-100%, summing to 100%",
  4: "Stream not found",
  5: "This address is not a recipient of the stream",
  6: "Nothing is available to withdraw yet",
  7: "Stream is already cancelled",
  8: "Amount exceeds the withdrawable balance",
};

export class StreamoraError extends Error {
  constructor(message: string, public readonly code?: number) {
    super(message);
    this.name = "StreamoraError";
  }
}

/** Turns RPC / simulation failures into a readable StreamoraError. */
export function parseError(err: unknown): StreamoraError {
  if (err instanceof StreamoraError) return err;
  const text = err instanceof Error ? err.message : String(err);
  const m = /Error\(Contract, #(\d+)\)/.exec(text);
  if (m) {
    const code = Number(m[1]);
    return new StreamoraError(CONTRACT_ERRORS[code] ?? `Contract error #${code}`, code);
  }
  if (/fetch|network|ECONN|ENOTFOUND|timeout/i.test(text)) {
    return new StreamoraError("RPC service is unavailable. Check your connection and try again.");
  }
  if (/insufficient|resulting balance is not within the allowed range/i.test(text)) {
    return new StreamoraError("Insufficient token balance");
  }
  return new StreamoraError(text);
}
