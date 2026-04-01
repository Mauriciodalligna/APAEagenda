import { NextResponse } from "next/server";
import { sendPasswordResetEmail, isEmailConfigured } from "@/utils/email";

/**
 * Rota de teste para verificar se o envio de email está funcionando.
 * Em produção fica desligada salvo ALLOW_TEST_EMAIL_ROUTE=true.
 */
export async function GET(req) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_TEST_EMAIL_ROUTE !== "true"
  ) {
    return NextResponse.json({ ok: false, error: "Não encontrado" }, { status: 404 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const testEmail = searchParams.get("email");

    if (!testEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Parâmetro 'email' é obrigatório. Use: /api/auth/test-email?email=seu-email@exemplo.com",
        },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[Test Email] Testando envio para: ${testEmail}`);
    }

    const testToken = "test-token-" + Date.now();

    let emailSent = false;
    let errorDetails = null;

    try {
      emailSent = await sendPasswordResetEmail(testEmail, testToken, "Usuário de Teste");
    } catch (error) {
      console.error("[Test Email] Erro ao enviar:", error.message);
      errorDetails = {
        message: error.message,
        code: error.code,
        name: error.name,
      };
    }

    if (emailSent) {
      return NextResponse.json({
        ok: true,
        message: "Email de teste enviado com sucesso!",
        email: testEmail,
        token: testToken,
        link: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset?token=${testToken}`,
        note: "Verifique a caixa de entrada e spam do email informado. Se não receber, verifique os logs do servidor para mais detalhes.",
        warning: "Se o email não chegou, verifique: 1) Pasta de spam, 2) Painel do Brevo (Estatísticas), 3) Logs do servidor para erros",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Falha ao enviar email. Verifique os logs do servidor e as configurações SMTP.",
        email: testEmail,
        emailConfigured: isEmailConfigured(),
        errorDetails: errorDetails,
        troubleshooting: {
          step1: "Verifique os logs do servidor (console onde o Next.js está rodando)",
          step2: "Verifique se o arquivo .env.local existe e está correto",
          step3: "Verifique se o servidor foi reiniciado após criar/editar .env.local",
          step4: "Verifique no painel do Brevo se há bloqueios ou erros",
        },
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("[Test Email] Erro:", error.message);
    return NextResponse.json(
      {
        ok: false,
        error: "Erro ao testar envio de email: " + error.message,
        details: error.stack,
      },
      { status: 500 }
    );
  }
}
