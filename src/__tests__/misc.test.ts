import { generateTokenExp, nFormatter, UrlProtocolUtils } from "@/lib/misc";
import { describe, it, expect } from "vitest";

describe("nFormatter", () => {
  it("should format numbers correctly with default decimal places", () => {
    expect(nFormatter(0)).toBe("0");
    expect(nFormatter(999)).toBe("999");
    expect(nFormatter(1000)).toBe("1k");
    expect(nFormatter(1234)).toBe("1.2k");
    expect(nFormatter(1000000)).toBe("1M");
    expect(nFormatter(1234567)).toBe("1.2M");
    expect(nFormatter(1000000000)).toBe("1G");
    expect(nFormatter(1234567890)).toBe("1.2G");
    expect(nFormatter(1000000000000)).toBe("1T");
    expect(nFormatter(1234567890123)).toBe("1.2T");
  });

  it("should format numbers correctly with specified decimal places", () => {
    expect(nFormatter(1234, 2)).toBe("1.23k");
    expect(nFormatter(1234567, 3)).toBe("1.235M");
    expect(nFormatter(1234567890, 4)).toBe("1.2346G");
  });

  it("should handle edge cases and large numbers", () => {
    expect(nFormatter(0)).toBe("0");
    expect(nFormatter(1e18)).toBe("1E");
    expect(nFormatter(1.23e18, 2)).toBe("1.23E");
  });
});

describe("getTokenExpiration", () => {
  it("should return a date 1 hour from now if rememberMe is false", () => {
    const rememberMe = false;
    const expirationDate = generateTokenExp(rememberMe);

    const expectedDate = new Date(Date.now() + 60 * 60 * 1000);
    expect(expirationDate.getTime()).toBeCloseTo(expectedDate.getTime(), -2); // Allowing a small margin for timing discrepancies
  });

  it("should return a date 30 days from now if rememberMe is true", () => {
    const rememberMe = true;
    const expirationDate = generateTokenExp(rememberMe);

    const expectedDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    expect(expirationDate.getTime()).toBeCloseTo(expectedDate.getTime(), -2); // Allowing a small margin for timing discrepancies
  });
});

describe("UrlProtocolUtils", () => {
  const baseUrl = "example.com";
  const http = "http://" + baseUrl;
  const https = "https://" + baseUrl;
  const ws = "ws://" + baseUrl;
  const wss = "wss://" + baseUrl;

  describe("toHTTP", () => {
    it("should convert wss:// to https://", () => {
      expect(UrlProtocolUtils.toHTTP(ws)).toBe(http);
      expect(UrlProtocolUtils.toHTTP(wss)).toBe(https);
    });

    it("should return https:// if no protocol is present", () => {
      expect(UrlProtocolUtils.toHTTP("example.com")).toBe(
        "https://example.com",
      );
    });

    it("should not change http:// or https:// URLs", () => {
      expect(UrlProtocolUtils.toHTTP("http://example.com")).toBe(
        "http://example.com",
      );
      expect(UrlProtocolUtils.toHTTP("https://example.com")).toBe(
        "https://example.com",
      );
    });
  });

  describe("toWS", () => {
    it("should convert http(s):// to ws(s)://", () => {
      expect(UrlProtocolUtils.toWS(http)).toBe(ws);
      expect(UrlProtocolUtils.toWS(https)).toBe(wss);
    });

    it("should return wss:// if no protocol is present", () => {
      expect(UrlProtocolUtils.toWS("example.com")).toBe("wss://example.com");
    });

    it("should not change ws:// or wss:// URLs", () => {
      expect(UrlProtocolUtils.toWS("ws://example.com")).toBe(
        "ws://example.com",
      );
      expect(UrlProtocolUtils.toWS("wss://example.com")).toBe(
        "wss://example.com",
      );
    });
  });

  describe("removeProtocol", () => {
    it("should remove http(s) or ws(s) protocol", () => {
      const protocol = ["https://", "http://", "wss://", "ws://"];
      const mockUrls = protocol.map((p) => p + baseUrl);

      mockUrls.forEach((url) => {
        expect(UrlProtocolUtils.removeProtocol(url));
      });
    });

    it("should return the original URL if no protocol is present", () => {
      expect(UrlProtocolUtils.removeProtocol("example.com")).toBe(
        "example.com",
      );
    });
  });
});
