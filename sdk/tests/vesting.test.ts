import { describe, it, expect } from "vitest";
import {
  linearVesting,
  quadraticVesting,
  cubicVesting,
  exponentialVesting,
  cliffVesting,
  VestingCurve,
} from "../src/vesting";

describe("Vesting Curves", () => {
  const amount = 10000n;
  const startTime = 1000;
  const endTime = 2000;

  describe("Linear Vesting", () => {
    it("vests 0 before start time", () => {
      const vested = linearVesting(amount, startTime, endTime, 500);
      expect(vested).toBe(0n);
    });

    it("vests full amount after end time", () => {
      const vested = linearVesting(amount, startTime, endTime, 2500);
      expect(vested).toBe(amount);
    });

    it("vests 50% at midpoint", () => {
      const vested = linearVesting(amount, startTime, endTime, 1500);
      expect(vested).toBe(5000n);
    });

    it("vests 25% at 25% duration", () => {
      const vested = linearVesting(amount, startTime, endTime, 1250);
      expect(vested).toBe(2500n);
    });
  });

  describe("Quadratic Vesting", () => {
    it("vests 0 before start time", () => {
      const vested = quadraticVesting(amount, startTime, endTime, 500);
      expect(vested).toBe(0n);
    });

    it("vests full amount after end time", () => {
      const vested = quadraticVesting(amount, startTime, endTime, 2500);
      expect(vested).toBe(amount);
    });

    it("vests less at midpoint than linear (acceleration)", () => {
      const linearVest = linearVesting(amount, startTime, endTime, 1500);
      const quadraticVest = quadraticVesting(amount, startTime, endTime, 1500);
      expect(quadraticVest).toBeLessThan(linearVest);
    });

    it("accelerates vesting toward end", () => {
      const quarter = quadraticVesting(amount, startTime, endTime, 1250);
      const halfway = quadraticVesting(amount, startTime, endTime, 1500);
      const threeQuarter = quadraticVesting(amount, startTime, endTime, 1750);

      // Vesting should increase with acceleration
      expect(halfway - quarter).toBeGreaterThan(0n);
      expect(threeQuarter - halfway).toBeGreaterThan(halfway - quarter);
    });
  });

  describe("Cubic Vesting", () => {
    it("vests even slower at midpoint than quadratic", () => {
      const quadraticVest = quadraticVesting(amount, startTime, endTime, 1500);
      const cubicVest = cubicVesting(amount, startTime, endTime, 1500);
      expect(cubicVest).toBeLessThan(quadraticVest);
    });
  });

  describe("Exponential Vesting", () => {
    it("vests 0 before start time", () => {
      const vested = exponentialVesting(amount, startTime, endTime, 500);
      expect(vested).toBe(0n);
    });

    it("vests full amount after end time", () => {
      const vested = exponentialVesting(amount, startTime, endTime, 2500);
      expect(vested).toBe(amount);
    });
  });

  describe("Cliff Vesting", () => {
    it("vests 0 before cliff", () => {
      const vested = cliffVesting(amount, startTime, endTime, 1400, 1500, 2000n);
      expect(vested).toBe(0n);
    });

    it("vests cliff amount immediately at cliff time", () => {
      const cliffAmount = 3000n;
      const vested = cliffVesting(amount, startTime, endTime, 1500, 1500, cliffAmount);
      expect(vested).toBe(cliffAmount);
    });

    it("vests cliff + linear after cliff", () => {
      const cliffAmount = 3000n;
      const cliffTime = 1500;
      const timeAfterCliff = 1750; // Midpoint between cliff and end
      const vested = cliffVesting(amount, startTime, endTime, timeAfterCliff, cliffTime, cliffAmount);

      // Should be cliff amount + 50% of remaining
      const expected = cliffAmount + (amount - cliffAmount) / 2n;
      expect(vested).toBe(expected);
    });

    it("vests full amount at end time", () => {
      const vested = cliffVesting(amount, startTime, endTime, 2500, 1500, 3000n);
      expect(vested).toBe(amount);
    });
  });
});
