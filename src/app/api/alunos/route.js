import { ensureRole } from "@/middlewares/auth";
import { listar, criar } from "@/controllers/alunoController";
import { parsePagination } from "@/server/utils/pagination";

export async function GET(request) {
  // Gestores, secretaria e profissionais podem consultar alunos
  const auth = ensureRole(request.headers, ["gestor", "secretaria", "profissional"]);
  if (!auth.ok) {
    return new Response(JSON.stringify(auth), { status: auth.status || 403, headers: { "content-type": "application/json" } });
  }
  const { searchParams } = new URL(request.url);
  const search = {
    nome: searchParams.get("nome") || undefined,
    turma: searchParams.get("turma") || undefined,
    turno: searchParams.get("turno") || undefined,
    cidade: searchParams.get("cidade") || undefined,
    status: searchParams.get("status") || undefined,
  };
  const paginationResult = parsePagination(searchParams);
  if (!paginationResult.ok) {
    return new Response(JSON.stringify(paginationResult), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const pagination = { offset: paginationResult.offset, limit: paginationResult.limit };
  const result = await listar({ search, pagination });
  return new Response(JSON.stringify(result), { status: result.ok ? 200 : result.status || 400, headers: { "content-type": "application/json" } });
}

export async function POST(request) {
  const auth = ensureRole(request.headers, ["gestor", "secretaria"]);
  if (!auth.ok) {
    return new Response(JSON.stringify(auth), { status: auth.status || 403, headers: { "content-type": "application/json" } });
  }
  const body = await request.json();
  const result = await criar({ adminId: auth.payload?.sub, ...body });
  return new Response(JSON.stringify(result), { status: result.ok ? 201 : result.status || 400, headers: { "content-type": "application/json" } });
}


