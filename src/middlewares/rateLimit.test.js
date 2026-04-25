import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  assertRateLimit,
  checkRateLimit,
  getClientIp,
  getRateLimitDeniedResponse,
  RATE_LIMIT_LOGIN,
} from "@/middlewares/rateLimit";

describe("getClientIp", () => {
  it("usa o primeiro endereço de x-forwarded-for", () => {
    const req = new Request("http://example.com", {
      headers: { "x-forwarded-for": "7.7.7.7, 8.8.8.8" },
    });
    expect(getClientIp(req)).toBe("7.7.7.7");
  });

  it("usa x-real-ip na ausência de x-forwarded-for", () => {
    const req = new Request("http://example.com", { headers: { "x-real-ip": "1.1.1.1" } });
    expect(getClientIp(req)).toBe("1.1.1.1");
  });

  it("retorna unknown se não houver IP nos headers", () => {
    expect(getClientIp(new Request("http://example.com"))).toBe("unknown");
  });
});

describe("getRateLimitDeniedResponse", () => {
  it("define status 429, JSON e Retry-After", () => {
    const res = getRateLimitDeniedResponse(42);
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("42");
  });
});

describe("checkRateLimit", () => {
  it("bloqueia após atingir o máximo de tentativas", () => {
    const key = `rl-burst-${Date.now()}-${Math.random()}`;
    const options = { max: 2, windowMs: 60_000 };
    expect(checkRateLimit(key, options).allowed).toBe(true);
    expect(checkRateLimit(key, options).allowed).toBe(true);
    const last = checkRateLimit(key, options);
    expect(last.allowed).toBe(false);
    expect(last.retryAfterSec).toBeGreaterThan(0);
  });
});

describe("assertRateLimit", () => {
  const origDisabled = process.env.RATE_LIMIT_DISABLED;
  const origNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    delete process.env.RATE_LIMIT_DISABLED;
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = "test";
    }
  });

  afterEach(() => {
    if (origDisabled === undefined) {
      delete process.env.RATE_LIMIT_DISABLED;
    } else {
      process.env.RATE_LIMIT_DISABLED = origDisabled;
    }
    if (origNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = origNodeEnv;
    }
    vi.restoreAllMocks();
  });

  it("não aplica limite com RATE_LIMIT_DISABLED=true", () => {
    process.env.RATE_LIMIT_DISABLED = "true";
    const req = new Request("http://x");
    expect(assertRateLimit(req, { ...RATE_LIMIT_LOGIN })).toBeNull();
  });

  it("retorna 429 após exceder limite por IP (comportamento smoke)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const ip = `9.8.${(Math.random() * 200) | 0}.1`;
    const makeReq = () =>
      new Request("http://x", { headers: { "x-forwarded-for": ip } });

    const { max, windowMs, prefix } = { max: 2, windowMs: 10 * 60 * 1000, prefix: "t-smoke" };

    for (let i = 0; i < max; i += 1) {
      expect(assertRateLimit(makeReq(), { max, windowMs, prefix })).toBeNull();
    }
    const blocked = assertRateLimit(makeReq(), { max, windowMs, prefix });
    expect(blocked).toBeInstanceOf(Response);
    expect(blocked?.status).toBe(429);
    expect(warn).toHaveBeenCalled();
  });

  it("registra aviso no console sem PII (apenas 429)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const cleanIp = "10.11.12.13";
    const { max, windowMs, prefix } = { max: 1, windowMs: 5 * 60_000, prefix: "t-warn" };

    expect(
      assertRateLimit(
        new Request("http://x", { headers: { "x-forwarded-for": cleanIp } }),
        { max, windowMs, prefix }
      )
    ).toBeNull();

    assertRateLimit(
      new Request("http://x", { headers: { "x-forwarded-for": cleanIp } }),
      { max, windowMs, prefix }
    );

    expect(warn).toHaveBeenCalled();
    const [msg] = warn.mock.calls[0] ?? [""];
    expect(String(msg)).not.toContain("10.11.12.13");
    expect(String(msg)).toMatch(/client=10\.11\.12\.x/);
  });
});
