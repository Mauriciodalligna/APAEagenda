import { NextResponse } from "next/server";
import { listarAvisos, criarAviso } from "@/controllers/muralController";
import { authenticate, authorize } from "@/middlewares/auth";

export async function GET(req) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }
    
    // Todos os usuários autenticados podem ver o mural
    const mockReq = { 
      query: Object.fromEntries(new URL(req.url).searchParams),
      user: auth.user 
    };
    
    let responseData = null;
    let statusCode = 200;
    
    const mockRes = { 
      json: (data) => {
        responseData = data;
        return data;
      },
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => {
            responseData = data;
            return data;
          }
        };
      }
    };
    
    await listarAvisos(mockReq, mockRes);
    return NextResponse.json(responseData, { status: statusCode });

  } catch (error) {
    console.error("[Mural] Erro na rota GET:", error.message);
    return NextResponse.json(
      { ok: false, error: "Erro interno do servidor: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    // Gestores, secretaria e profissionais podem criar avisos
    const authError = authorize(auth.user, ["gestor", "secretaria", "profissional"]);
    if (authError) {
      return NextResponse.json({ ok: false, error: authError.error }, { status: authError.status });
    }

    const body = await req.json();
    
    let responseData = null;
    let statusCode = 200;
    
    const mockReq = { body, user: auth.user };
    const mockRes = { 
      json: (data) => {
        responseData = data;
        return data;
      }, 
      status: (code) => {
        statusCode = code;
        return {
          json: (data) => {
            responseData = data;
            return data;
          }
        };
      } 
    };

    await criarAviso(mockReq, mockRes);
    return NextResponse.json(responseData, { status: statusCode });

  } catch (error) {
    console.error("[Mural] Erro na rota POST:", error.message);
    return NextResponse.json(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
