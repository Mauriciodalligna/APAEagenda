import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "@/server/db/models/usuario";
import { getJwtSecret } from "@/server/utils/jwtSecret";

function isBcryptHash(value) {
  return typeof value === "string" && value.startsWith("$2");
}

export async function register({ nome, email, senha, perfil = "profissional" }) {
  if (!email || !senha || !nome) {
    return { ok: false, status: 400, error: "nome, email e senha são obrigatórios" };
  }
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    return { ok: false, status: 409, error: "E-mail já cadastrado" };
  }
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({
    nome,
    email,
    senha: senhaHash,
    perfil,
    status: true,
    criado_em: new Date(),
  });
  return {
    ok: true,
    user: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil },
  };
}

// Validação de email
function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

// Sanitização de inputs
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.trim();
}

export async function login({ email, senha }) {
  // Validação básica
  if (!email || !senha) {
    return { ok: false, status: 400, error: "E-mail e senha são obrigatórios" };
  }

  // Sanitização e normalização
  const normalizedEmail = sanitizeInput(email).toLowerCase();
  const sanitizedSenha = sanitizeInput(senha);

  // Validação de formato de email
  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, status: 400, error: "E-mail inválido" };
  }

  // Validação de senha (não pode estar vazia após sanitização)
  if (!sanitizedSenha) {
    return { ok: false, status: 400, error: "Senha é obrigatória" };
  }

  // Buscar usuário
  const usuario = await Usuario.findOne({ where: { email: normalizedEmail } });
  
  // Mensagem genérica para não revelar se o email existe
  if (!usuario || usuario.status === false) {
    return { ok: false, status: 401, error: "Credenciais inválidas" };
  }

  // Verificar senha
  let valido = false;
  if (isBcryptHash(usuario.senha)) {
    valido = await bcrypt.compare(sanitizedSenha, usuario.senha);
  } else {
    // Compatibilidade com senhas antigas (não hash)
    valido = sanitizedSenha === usuario.senha;
  }
  
  if (!valido) {
    return { ok: false, status: 401, error: "Credenciais inválidas" };
  }

  const secret = getJwtSecret();
  if (!secret) {
    return { ok: false, status: 503, error: "Servidor não configurado (JWT)" };
  }

  const token = jwt.sign(
    { sub: usuario.id, email: usuario.email, perfil: usuario.perfil, nome: usuario.nome, mcp: !!usuario.must_change_password },
    secret,
    { expiresIn: "1d" }
  );

  return {
    ok: true,
    token,
    user: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil, must_change_password: !!usuario.must_change_password },
  };
}


