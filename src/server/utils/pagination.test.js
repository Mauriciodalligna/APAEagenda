import { describe, it, expect } from "vitest";
import { DEFAULT_LIMIT, MAX_PAGE_SIZE, parsePagination } from "@/server/utils/pagination";

const err = { ok: false, error: "Parâmetros de paginação inválidos" };

function params(obj) {
  return new URLSearchParams(obj);
}

describe("parsePagination", () => {
  it("usa default de limit e offset quando omitidos", () => {
    expect(parsePagination(new URLSearchParams())).toEqual({
      ok: true,
      limit: DEFAULT_LIMIT,
      offset: 0,
    });
  });

  it("aceita limit e offset válidos", () => {
    expect(parsePagination(params({ limit: "10", offset: "5" }))).toEqual({
      ok: true,
      limit: 10,
      offset: 5,
    });
  });

  it("aceita limit máximo permitido", () => {
    expect(parsePagination(params({ limit: String(MAX_PAGE_SIZE), offset: "0" }))).toEqual({
      ok: true,
      limit: MAX_PAGE_SIZE,
      offset: 0,
    });
  });

  it("rejeita limit acima do máximo", () => {
    expect(parsePagination(params({ limit: "101", offset: "0" }))).toEqual(err);
  });

  it("rejeita limit zero", () => {
    expect(parsePagination(params({ limit: "0", offset: "0" }))).toEqual(err);
  });

  it("rejeita offset negativo", () => {
    expect(parsePagination(params({ limit: "10", offset: "-1" }))).toEqual(err);
  });

  it("rejeita limit não numérico (abc)", () => {
    expect(parsePagination(params({ limit: "abc", offset: "0" }))).toEqual(err);
  });

  it("rejeita limit com decimais (não casam com inteiros)", () => {
    expect(parsePagination(params({ limit: "10.5", offset: "0" }))).toEqual(err);
  });
});
