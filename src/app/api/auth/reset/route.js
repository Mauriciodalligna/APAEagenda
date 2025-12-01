import bcrypt from "bcrypt";
import Usuario from "@/server/db/models/usuario";
import PasswordResetToken from "@/server/db/models/password_reset_token";

// Validação de força de senha
function validatePasswordStrength(password) {
  if (!password || password.length < 8) {
    return { valid: false, error: "A senha deve ter no mínimo 8 caracteres" };
  }
  if (password.length > 128) {
    return { valid: false, error: "A senha deve ter no máximo 128 caracteres" };
  }
  // Verificar se tem pelo menos uma letra e um número (recomendado)
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasLetter || !hasNumber) {
    return { 
      valid: true, 
      warning: "Recomendamos usar letras e números para maior segurança" 
    };
  }
  return { valid: true };
}

export async function POST(request) {
  try {
    const { token, senha } = await request.json();
    if (!token || !senha) {
      return new Response(JSON.stringify({ ok: false, error: "Token e nova senha são obrigatórios" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // Validar força da senha
    const passwordValidation = validatePasswordStrength(senha);
    if (!passwordValidation.valid) {
      return new Response(JSON.stringify({ ok: false, error: passwordValidation.error }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    const record = await PasswordResetToken.findOne({ where: { token } });
    if (!record || record.used) {
      return new Response(JSON.stringify({ ok: false, error: "Token inválido" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    if (new Date(record.expires_at) < new Date()) {
      return new Response(JSON.stringify({ ok: false, error: "Token expirado" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    const user = await Usuario.findByPk(record.usuario_id);
    if (!user) {
      return new Response(JSON.stringify({ ok: false, error: "Usuário não encontrado" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }
    const hash = await bcrypt.hash(senha, 10);
    await user.update({ senha: hash });
    await record.update({ used: true });
    return Response.json({ ok: true });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error?.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}


