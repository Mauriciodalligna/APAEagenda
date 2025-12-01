import nodemailer from "nodemailer";

// Configuração do transporter de email
function createTransporter() {
  // Configuração via variáveis de ambiente
  const config = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Configurações TLS para Brevo e outros servidores SMTP
    tls: {
      rejectUnauthorized: false, // Necessário para Brevo
    },
  };

  // Se não tiver credenciais configuradas, retornar null (modo desenvolvimento)
  if (!config.auth.user || !config.auth.pass) {
    return null;
  }

  return nodemailer.createTransport(config);
}

/**
 * Envia email de recuperação de senha
 * @param {string} to - Email do destinatário
 * @param {string} token - Token de recuperação
 * @param {string} userName - Nome do usuário (opcional)
 * @returns {Promise<boolean>} - true se enviado com sucesso
 */
export async function sendPasswordResetEmail(to, token, userName = null) {
  try {
    const transporter = createTransporter();

    // Se não tiver transporter configurado, apenas logar (modo desenvolvimento)
    if (!transporter) {
      if (process.env.NODE_ENV === "development") {
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset?token=${token}`;
        console.log(`[DEV] Email não configurado - Link de recuperação: ${resetUrl}`);
      }
      return true; // Retorna true mesmo em dev para não quebrar o fluxo
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/auth/reset?token=${token}`;

    // Validar remetente - não pode usar o email SMTP do Brevo como remetente
    let fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    
    // Se o remetente for o email SMTP do Brevo, usar um email válido
    // O Brevo não permite usar o email SMTP como remetente
    if (fromEmail && fromEmail.includes('@smtp-brevo.com')) {
      console.warn("[Email] Email SMTP não pode ser usado como remetente. Configure SMTP_FROM com um email válido.");
      // Usar um email genérico ou o email do usuário se disponível
      fromEmail = process.env.SMTP_FROM_ALT || "noreply@apaeagenda.com";
    }
    
    const mailOptions = {
      from: fromEmail,
      to: to,
      subject: "Recuperação de Senha - APAE Agenda",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #1976d2;
              margin-bottom: 10px;
            }
            .content {
              background-color: #fff;
              padding: 25px;
              border-radius: 6px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #1976d2;
              color: #fff !important;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin: 20px 0;
            }
            .button:hover {
              background-color: #1565c0;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              margin-top: 20px;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffc107;
              border-radius: 4px;
              padding: 15px;
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">APAE Agenda</div>
              <p style="color: #666; margin: 0;">Sistema de Gestão de Agendamentos</p>
            </div>
            
            <div class="content">
              <h2 style="color: #333; margin-top: 0;">Recuperação de Senha</h2>
              
              ${userName ? `<p>Olá, <strong>${userName}</strong>!</p>` : "<p>Olá!</p>"}
              
              <p>Recebemos uma solicitação para redefinir a senha da sua conta no APAE Agenda.</p>
              
              <p>Para redefinir sua senha, clique no botão abaixo:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Redefinir Senha</a>
              </div>
              
              <p style="font-size: 14px; color: #666;">
                Ou copie e cole o link abaixo no seu navegador:<br>
                <a href="${resetUrl}" style="color: #1976d2; word-break: break-all;">${resetUrl}</a>
              </p>
              
              <div class="warning">
                <strong>⚠️ Importante:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Este link expira em <strong>30 minutos</strong></li>
                  <li>Se você não solicitou esta recuperação, ignore este email</li>
                  <li>Não compartilhe este link com ninguém</li>
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p>Este é um email automático, por favor não responda.</p>
              <p>© ${new Date().getFullYear()} APAE Agenda - Todos os direitos reservados</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Recuperação de Senha - APAE Agenda
        
        Olá${userName ? `, ${userName}` : ""}!
        
        Recebemos uma solicitação para redefinir a senha da sua conta no APAE Agenda.
        
        Para redefinir sua senha, acesse o link abaixo:
        ${resetUrl}
        
        IMPORTANTE:
        - Este link expira em 30 minutos
        - Se você não solicitou esta recuperação, ignore este email
        - Não compartilhe este link com ninguém
        
        Este é um email automático, por favor não responda.
      `,
    };

    // Verificar conexão SMTP antes de enviar
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("[Email] Erro ao verificar conexão SMTP:", verifyError.message);
      throw verifyError;
    }
    
    const info = await transporter.sendMail(mailOptions);
    
    // Verificar se o email foi realmente aceito
    if (info.rejected && info.rejected.length > 0) {
      console.error("[Email] Email rejeitado pelo servidor:", info.rejected);
      throw new Error(`Email rejeitado: ${info.rejected.join(", ")}`);
    }
    
    if (!info.accepted || info.accepted.length === 0) {
      console.error("[Email] Nenhum endereço aceito pelo servidor SMTP");
      throw new Error("Nenhum endereço aceito pelo servidor SMTP");
    }
    
    if (process.env.NODE_ENV === "development") {
      console.log(`[Email] Enviado para ${to} - Message ID: ${info.messageId}`);
    }
    
    return true;
  } catch (error) {
    console.error("[Email] Erro ao enviar email de recuperação:", error.message);
    if (process.env.NODE_ENV === "development") {
      console.error("[Email] Detalhes:", error.code, error.response);
    }
    return false;
  }
}

/**
 * Verifica se o serviço de email está configurado
 * @returns {boolean}
 */
export function isEmailConfigured() {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}



