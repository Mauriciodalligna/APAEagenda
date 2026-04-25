import { login } from "@/controllers/authController";
import { assertRateLimit, RATE_LIMIT_LOGIN } from "@/middlewares/rateLimit";

export async function POST(request) {
  const limited = assertRateLimit(request, RATE_LIMIT_LOGIN);
  if (limited) {
    return limited;
  }
  try {
    const body = await request.json();
    const result = await login(body);
    if (!result.ok) {
      return new Response(JSON.stringify(result), {
        status: result.status || 401,
        headers: { "content-type": "application/json" },
      });
    }
    return Response.json(result);
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error?.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}


