import { verifyDatabaseConnection } from "@/server/db/sequelize";

export async function GET() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_DB_CHECK !== "true"
  ) {
    return new Response(JSON.stringify({ ok: false, error: "Não encontrado" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const started = Date.now();
    await verifyDatabaseConnection();
    const latencyMs = Date.now() - started;
    return Response.json({ ok: true, latencyMs });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error?.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
