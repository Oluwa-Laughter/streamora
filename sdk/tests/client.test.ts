import { describe, it, expect } from "vitest";
import { StreamoraClient } from "../src/client";
import { Network } from "../src/types";

describe("StreamoraClient", () => {
  const validAddress = "GBBD47UZM2HO7K4E2YSQWPHWVXJ35Z5GBHB5ETUVFSXLBF2ZKOZWS7AG";
  const validContractId = "CBQHNAXSI55GXVBA3WQ2IMP4XGLNWWPSTLRWNQGWS7UJJHGNAJW223HI";

  const config = {
    network: Network.TESTNET,
    contractId: validContractId,
    signerPublicKey: validAddress,
  };

  it("initializes with valid config", () => {
    const client = new StreamoraClient(config);
    expect(client.getNetwork()).toBe(Network.TESTNET);
    expect(client.getContractId()).toBe(validContractId);
  });

  it("throws on invalid signer public key", () => {
    const invalidConfig = { ...config, signerPublicKey: "invalid" };
    expect(() => new StreamoraClient(invalidConfig)).toThrow();
  });

  it("validates stream creation params", () => {
    const client = new StreamoraClient(config);

    const validParams = {
      recipientAddress: validAddress,
      tokenAddress: validAddress,
      amount: 1000n,
      startTime: Math.floor(Date.now() / 1000) + 3600,
      endTime: Math.floor(Date.now() / 1000) + 7200,
    };

    const result = client.validateStreamParams(validParams);
    expect(result.valid).toBe(true);
  });

  it("rejects negative amounts", () => {
    const client = new StreamoraClient(config);

    const invalidParams = {
      recipientAddress: validAddress,
      tokenAddress: validAddress,
      amount: -100n,
      startTime: 1000,
      endTime: 2000,
    };

    const result = client.validateStreamParams(invalidParams);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("positive");
  });

  it("rejects invalid time range", () => {
    const client = new StreamoraClient(config);

    const invalidParams = {
      recipientAddress: validAddress,
      tokenAddress: validAddress,
      amount: 1000n,
      startTime: 2000,
      endTime: 1000,
    };

    const result = client.validateStreamParams(invalidParams);
    expect(result.valid).toBe(false);
    expect(result.error).toContain("before");
  });
});
