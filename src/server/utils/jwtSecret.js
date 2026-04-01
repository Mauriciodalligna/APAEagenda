/**
 * JWT: em produção exige JWT_SECRET forte; em dev/test permite fallback local.
 */
export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret || secret.length < 32) {
      return null;
    }
    return secret;
  }
  return secret || "dev-secret";
}
