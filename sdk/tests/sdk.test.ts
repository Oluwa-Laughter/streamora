import { describe, it, expect, vi } from "vitest";
import {
  calculateVestedAmount,
  calculateWithdrawable,
  recipientEntitlement,
  parseUnits,
  formatUnits,
  validateCreateParams,
  parseError,
  StreamoraClient,
} from "../src";

const A = "GDHLHKGQFWANAUZF4Z7LI7IJQF4IEUFPMLFVIF7OSQC5K335K5FLKYQE";
const B = "GBBD47UZM2HO7K4E2YSQWPHWVXJ35Z5GBHB5ETUVFSXLBF2ZKOZWS7AG";
const TOKEN = "CABJ22MJTXMZHACHV25MFD6ECVRQ3NRUJ2HYB2B4LVP3PQ6R2N72RN3K";

describe("vesting math (mirrors contract)", () => {
  it("boundaries", () => {
    expect(calculateVestedAmount(1000n, 100, 200, 50)).toBe(0n);
    expect(calculateVestedAmount(1000n, 100, 200, 100)).toBe(0n);
    expect(calculateVestedAmount(1000n, 100, 200, 150)).toBe(500n);
    expect(calculateVestedAmount(1000n, 100, 200, 200)).toBe(1000n);
    expect(calculateVestedAmount(1000n, 100, 200, 999)).toBe(1000n);
  });
  it("floors", () => expect(calculateVestedAmount(10n, 0, 3, 1)).toBe(3n));
  it("no float precision loss on large amounts", () => {
    const big = 10n ** 30n;
    expect(calculateVestedAmount(big, 0, 3, 1)).toBe(big / 3n);
  });
  it("withdrawable never negative", () => {
    expect(calculateWithdrawable(100n, 30n)).toBe(70n);
    expect(calculateWithdrawable(100n, 100n)).toBe(0n);
    expect(calculateWithdrawable(50n, 80n)).toBe(0n);
  });
  it("recipient entitlement floors", () => expect(recipientEntitlement(1000n, 33)).toBe(330n));
});

describe("units", () => {
  it("parses and formats exactly", () => {
    expect(parseUnits("1", 7)).toBe(10_000_000n);
    expect(parseUnits("0.0000001", 7)).toBe(1n);
    expect(parseUnits("12.5", 7)).toBe(125_000_000n);
    expect(formatUnits(125_000_000n, 7)).toBe("12.5");
    expect(formatUnits(1n, 7)).toBe("0.0000001");
    expect(formatUnits(0n, 7)).toBe("0");
  });
  it("rejects bad input", () => {
    expect(() => parseUnits("1.00000001", 7)).toThrow();
    expect(() => parseUnits("-1", 7)).toThrow();
    expect(() => parseUnits("abc", 7)).toThrow();
    expect(() => parseUnits("", 7)).toThrow();
  });
});

describe("validateCreateParams", () => {
  const now = 1000;
  const ok = { recipients: [{ address: A, shares: 100 }], token: TOKEN, amount: 5n, startTime: 1100, endTime: 2000 };
  it("accepts valid", () => expect(validateCreateParams(ok, now)).toBeNull());
  it("rejects share sums", () =>
    expect(validateCreateParams({ ...ok, recipients: [{ address: A, shares: 60 }, { address: B, shares: 30 }] }, now)).toMatch(/sum to 100/));
  it("rejects duplicates", () =>
    expect(validateCreateParams({ ...ok, recipients: [{ address: A, shares: 50 }, { address: A, shares: 50 }] }, now)).toMatch(/Duplicate/));
  it("rejects bad address / token / amount / times", () => {
    expect(validateCreateParams({ ...ok, recipients: [{ address: "x", shares: 100 }] }, now)).toMatch(/Invalid recipient/);
    expect(validateCreateParams({ ...ok, token: "G123" }, now)).toMatch(/token/);
    expect(validateCreateParams({ ...ok, amount: 0n }, now)).toMatch(/Amount/);
    expect(validateCreateParams({ ...ok, startTime: 2000 }, now)).toMatch(/Start/);
    expect(validateCreateParams({ ...ok, startTime: 100, endTime: 900 }, now)).toMatch(/future/);
  });
});

describe("errors", () => {
  it("maps contract error codes", () => {
    expect(parseError(new Error("HostError: Error(Contract, #6)")).message).toMatch(/Nothing is available/);
    expect(parseError(new Error("HostError: Error(Contract, #8)")).code).toBe(8);
  });
  it("detects RPC outages", () => expect(parseError(new Error("fetch failed")).message).toMatch(/RPC/));
});

describe("StreamoraClient", () => {
  it("rejects invalid contract id", () =>
    expect(() => new StreamoraClient({ network: "testnet", contractId: "nope" })).toThrow());
  it("computes withdrawable locally, freezing at cancellation", () => {
    const s = {
      id: 1n, payer: B, token: TOKEN, amount: 1000n, startTime: 1000, endTime: 2000, cancelledAt: 1250,
      recipients: [{ address: A, shares: 60, withdrawn: 0n }],
    };
    expect(StreamoraClient.withdrawableAt(s, A, 1500)).toBe(150n);
    expect(StreamoraClient.withdrawableAt(s, B, 1500)).toBe(0n);
  });
  it("blocks invalid create before any network call", () => {
    const c = new StreamoraClient({ network: "testnet", contractId: TOKEN });
    expect(() => c.prepareCreateStream({ payer: A, recipients: [], token: TOKEN, amount: 1n, startTime: 1, endTime: 2 })).toThrow();
  });
});

describe("read path", () => {
  it("READ_SOURCE is a valid ed25519 public key (a bad one broke every read in the browser)", async () => {
    const { READ_SOURCE } = await import("../src/client");
    const { StrKey } = await import("@stellar/stellar-sdk");
    expect(StrKey.isValidEd25519PublicKey(READ_SOURCE)).toBe(true);
  });

  it("builds and simulates a read without throwing before the network call", async () => {
    const c = new StreamoraClient({ network: "testnet", contractId: TOKEN });
    const sim = vi.fn().mockResolvedValue({ error: "HostError: Error(Contract, #4)" });
    (c.server as unknown as { simulateTransaction: unknown }).simulateTransaction = sim;
    await expect(c.getStream(1n)).rejects.toThrow(/Stream not found/);
    expect(sim).toHaveBeenCalledOnce();
  });
});
