import { register } from "@/controllers/authController";

export async function POST(request) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_PUBLIC_REGISTER !== "true"
  ) {
    return new Response(JSON.stringify({ ok: false, error: "Cadastro público desativado" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const body = await request.json();
    const result = await register(body);
    if (!result.ok) {
      return new Response(JSON.stringify(result), {
        status: result.status || 400,
        headers: { "content-type": "application/json" },
      });
    }
    return Response.json(result, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error?.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
