import { describe, it, expect } from "vitest";
import {
  calculateVestedAmount,
  calculateWithdrawable,
  toSmallestUnit,
  fromSmallestUnit,
  isValidAddress,
  formatDate,
  formatDuration,
} from "../src/utils";

describe("Stream Calculations", () => {
  it("calculates vested amount before start time", () => {
    const startTime = 1000;
    const endTime = 2000;
    const amount = 1000n;

    const vested = calculateVestedAmount(amount, startTime, endTime, 500);
    expect(vested).toBe(0n);
  });

  it("calculates vested amount after end time", () => {
    const startTime = 1000;
    const endTime = 2000;
    const amount = 1000n;

    const vested = calculateVestedAmount(amount, startTime, endTime, 3000);
    expect(vested).toBe(amount);
  });

  it("calculates vested amount at halfway point", () => {
    const startTime = 1000;
    const endTime = 2000;
    const amount = 1000n;

    const vested = calculateVestedAmount(amount, startTime, endTime, 1500);
    expect(vested).toBe(500n);
  });

  it("calculates withdrawable amount correctly", () => {
    const vested = 1000n;
    const withdrawn = 300n;

    const withdrawable = calculateWithdrawable(vested, withdrawn);
    expect(withdrawable).toBe(700n);
  });

  it("returns zero withdrawable when already fully withdrawn", () => {
    const vested = 1000n;
    const withdrawn = 1000n;

    const withdrawable = calculateWithdrawable(vested, withdrawn);
    expect(withdrawable).toBe(0n);
  });
});

describe("Unit Conversions", () => {
  it("converts to smallest unit with 7 decimals", () => {
    const amount = 1;
    const smallestUnit = toSmallestUnit(amount, 7);
    expect(smallestUnit).toBe(10000000n);
  });

  it("converts from smallest unit with 7 decimals", () => {
    const amount = 10000000n;
    const result = fromSmallestUnit(amount, 7);
    expect(result).toBe(1);
  });

  it("handles bigint input for toSmallestUnit", () => {
    const amount = 5n;
    const smallestUnit = toSmallestUnit(amount, 7);
    expect(smallestUnit).toBe(50000000n);
  });
});

describe("Address Validation", () => {
  it("validates correct Stellar addresses", () => {
    const validAddress = "GBBD47UZM2HO7K4E2YSQWPHWVXJ35Z5GBHB5ETUVFSXLBF2ZKOZWS7AG";
    expect(isValidAddress(validAddress)).toBe(true);
  });

  it("rejects invalid addresses", () => {
    expect(isValidAddress("invalid")).toBe(false);
    expect(isValidAddress("")).toBe(false);
  });
});

describe("Formatting", () => {
  it("formats timestamp to readable date", () => {
    const timestamp = 1609459200; // 2021-01-01
    const formatted = formatDate(timestamp);
    expect(formatted).toContain("2021");
  });

  it("formats duration in seconds", () => {
    const seconds = 86400 + 3600 + 60; // 1 day, 1 hour, 1 minute
    const formatted = formatDuration(seconds);
    expect(formatted).toContain("day");
    expect(formatted).toContain("hour");
    expect(formatted).toContain("minute");
  });
});
