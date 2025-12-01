import { NextResponse } from "next/server";
import { listar, criar } from "@/controllers/agendamentoController";
import { initAssociations } from "@/server/db/models";
import { authenticate, authorize } from "@/middlewares/auth";

// Inicializar associações
initAssociations();

export async function GET(req) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
    }

    // GET: gestor, secretaria, profissional podem listar
    const authError = authorize(auth.user, ["gestor", "secretaria", "profissional"]);
    if (authError) {
      return NextResponse.json({ ok: false, error: authError.error }, { status: authError.status });
    }

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams);
    
    // Criar mock response que funciona com NextResponse
    let responseData = null;
    let responseStatus = 200;
    
    const mockRes = {
      json: (data) => {
        responseData = data;
        return data;
      },
      status: (code) => ({
        json: (data) => {
          responseData = data;
          responseStatus = code;
          return data;
        }
      })
    };

    // Simular req.query para o controller
    const mockReq = { query: queryParams, user: auth.user };
    
    await listar(mockReq, mockRes);
    
    // Garantir que há uma resposta válida
    if (!responseData) {
      console.error("[Agendamentos API] Controller não retornou dados");
      return NextResponse.json(
        { ok: false, error: "Erro ao processar requisição" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(responseData, { status: responseStatus });

  } catch (error) {
    console.error("[Agendamentos API] Erro na rota GET:", error.message);
    if (process.env.NODE_ENV === "development") {
      console.error("[Agendamentos API] Stack:", error.stack);
    }
    return NextResponse.json(
      { ok: false, error: "Erro interno do servidor" },
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

    // POST: apenas gestor e secretaria podem criar
    const authError = authorize(auth.user, ["gestor", "secretaria"]);
    if (authError) {
      return NextResponse.json({ ok: false, error: authError.error }, { status: authError.status });
    }

    const body = await req.json();
    
    // Criar mock response que funciona com NextResponse
    let responseData = null;
    let responseStatus = 200;
    
    const mockRes = {
      json: (data) => {
        responseData = data;
        return data;
      },
      status: (code) => ({
        json: (data) => {
          responseData = data;
          responseStatus = code;
          return data;
        }
      })
    };
    
    // Simular req.body para o controller
    const mockReq = { body, user: auth.user };
    
    await criar(mockReq, mockRes);
    
    return NextResponse.json(responseData, { status: responseStatus });

  } catch (error) {
    console.error("[Agendamentos API] Erro na rota POST:", error.message);
    return NextResponse.json(
      { ok: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}