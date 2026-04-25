export const DEFAULT_LIMIT = 20;
export const MAX_PAGE_SIZE = 100;

const PAGINATION_ERROR_MESSAGE = "Parâmetros de paginação inválidos";

function parseNonNegativeInt(value) {
  if (value == null) return { ok: true, value: null };
  if (typeof value !== "string") return { ok: false };
  if (!/^\d+$/.test(value)) return { ok: false };
  const parsed = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(parsed)) return { ok: false };
  return { ok: true, value: parsed };
}

/**
 * @param {URLSearchParams} searchParams
 * @returns {{ ok: true, limit: number, offset: number } | { ok: false, error: string }}
 */
export function parsePagination(searchParams) {
  const parsedLimit = parseNonNegativeInt(searchParams?.get?.("limit"));
  const parsedOffset = parseNonNegativeInt(searchParams?.get?.("offset"));

  if (!parsedLimit.ok || !parsedOffset.ok) {
    return { ok: false, error: PAGINATION_ERROR_MESSAGE };
  }

  const limit = parsedLimit.value ?? DEFAULT_LIMIT;
  const offset = parsedOffset.value ?? 0;

  if (limit <= 0 || offset < 0 || limit > MAX_PAGE_SIZE) {
    return { ok: false, error: PAGINATION_ERROR_MESSAGE };
  }

  return { ok: true, limit, offset };
}

