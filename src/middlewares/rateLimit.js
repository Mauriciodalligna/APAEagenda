/**
 * Rate limiting em memória (Map) por chave. Em produção com várias instâncias,
 * cada processo mantém contadores locais; para limitação coerente entre
 * nós, use store compartilhado (ex.: Redis / Upstash).
 */
import { createHash } from "crypto";

const store = new Map();

export const RATE_LIMIT_LOGIN = { max: 15, windowMs: 15 * 60 * 1000, prefix: "auth:login" };
export const RATE_LIMIT_FORGOT = { max: 5, windowMs: 60 * 60 * 1000, prefix: "auth:forgot" };

/**
 * @param {string} key
 * @param {{ max: number, windowMs: number }} options
 * @returns {{ allowed: true } | { allowed: false, retryAfterSec: number }}
 */
export function checkRateLimit(key, { max, windowMs }) {
  const now = Date.now();
  let entry = store.get(key);
  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  if (entry.count >= max) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  entry.count += 1;
  return { allowed: true };
}

/**
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) {
    const v = real.trim();
    if (v) return v;
  }
  return "unknown";
}

function maskIpForLog(ip) {
  if (!ip || ip === "unknown") return "unknown";
  if (ip.includes(":")) {
    return `h:${createHash("sha256").update(ip).digest("hex").slice(0, 8)}`;
  }
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
  }
  return "masked";
}

const RATE_LIMIT_429_MESSAGE = "Muitas tentativas. Tente novamente em breve.";

/**
 * @param {number} retryAfterSec
 * @returns {Response}
 */
export function getRateLimitDeniedResponse(retryAfterSec) {
  const headers = { "content-type": "application/json" };
  if (retryAfterSec > 0) {
    headers["Retry-After"] = String(retryAfterSec);
  }
  return new Response(JSON.stringify({ ok: false, error: RATE_LIMIT_429_MESSAGE }), {
    status: 429,
    headers,
  });
}

/**
 * @param {Request} request
 * @param {{ max: number, windowMs: number, prefix: string }} options
 * @returns {Response | null} null se dentro do limite; Response 429 caso contrário
 */
export function assertRateLimit(request, options) {
  if (process.env.RATE_LIMIT_DISABLED === "true") {
    return null;
  }
  const ip = getClientIp(request);
  const key = `${options.prefix}:${ip}`;
  const result = checkRateLimit(key, { max: options.max, windowMs: options.windowMs });
  if (result.allowed) {
    return null;
  }
  console.warn(`[rate-limit] 429 ${options.prefix} client=${maskIpForLog(ip)}`);
  return getRateLimitDeniedResponse(result.retryAfterSec);
}
