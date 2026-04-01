import jwt from "jsonwebtoken";
import { getJwtSecret } from "@/server/utils/jwtSecret";

export function extractBearerToken(authorizationHeader) {
  if (!authorizationHeader) return null;
  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2) return null;
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return null;
  return token;
}

function jwtMisconfiguredResponse() {
  return { ok: false, status: 503, error: "Servidor não configurado (JWT)" };
}

export function verifyAuthFromHeaders(headers) {
  const secret = getJwtSecret();
  if (!secret) return jwtMisconfiguredResponse();

  const authHeader = headers.get?.("authorization") || headers["authorization"];
  const token = extractBearerToken(authHeader);
  if (!token) {
    return { ok: false, status: 401, error: "Token ausente" };
  }
  try {
    const payload = jwt.verify(token, secret);
    return { ok: true, payload };
  } catch (error) {
    return { ok: false, status: 401, error: "Token inválido" };
  }
}

export function ensureRole(headers, allowedRoles = []) {
  const auth = verifyAuthFromHeaders(headers);
  if (!auth.ok) return auth;
  if (allowedRoles.length === 0) return auth;
  const userRole = auth.payload?.perfil;
  if (!allowedRoles.includes(userRole)) {
    return { ok: false, status: 403, error: "Acesso negado" };
  }
  return auth;
}

export function authenticate(req) {
  const secret = getJwtSecret();
  if (!secret) {
    return { error: "Servidor não configurado (JWT)", status: 503 };
  }

  const authHeader = req.headers?.get?.("authorization") || req.headers?.["authorization"];
  const token = extractBearerToken(authHeader);

  if (!token) {
    return { error: "Token ausente", status: 401 };
  }

  try {
    const payload = jwt.verify(token, secret);
    return { user: payload };
  } catch (error) {
    return { error: "Token inválido", status: 401 };
  }
}

export function authorize(user, allowedRoles = []) {
  if (!user) {
    return { error: "Usuário não autenticado", status: 401 };
  }

  if (allowedRoles.length === 0) {
    return null;
  }

  const userRole = user.perfil || user.roles?.[0];
  if (!allowedRoles.includes(userRole)) {
    return { error: "Acesso negado", status: 403 };
  }

  return null;
}
