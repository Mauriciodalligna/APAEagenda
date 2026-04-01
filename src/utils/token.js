/**
 * Utilitários para gerenciamento de token JWT no cliente
 */

function decodeToken(token) {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token) return true;
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  const expirationTime = decoded.exp * 1000;
  return Date.now() >= expirationTime;
}

/**
 * Token do storage (sessionStorage ou localStorage). Retorna string vazia se ausente.
 */
export function getStoredToken() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("token") || localStorage.getItem("token") || "";
}

export function clearAuthData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

export function redirectToLogin(router) {
  clearAuthData();
  if (router) {
    router.replace("/login");
  } else if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
