import { Resend } from 'resend';

// Módulo SOLO servidor (sufijo .server) — nunca llega al bundle del cliente.

const MAIL_FROM =
  process.env.MAIL_FROM ?? 'MT3 Arquitectos <contacto@mt3arquitectos.com.mx>';
const MAIL_TO = process.env.MAIL_TO ?? 'direccion@mt3arquitectos.com.mx';

export interface ContactResult {
  success: boolean;
  message: string;
}

// --- Sanitización / validación (portado del backend Express) ---

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };
  return String(text).replace(/[&<>"'/]/g, (char) => map[char]);
}

function sanitizeText(text: unknown): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[\x00-\x1F\x7F]/g, '') // caracteres de control
    .replace(/\s+/g, ' ') // espacios múltiples
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

function buildHtml(name: string, email: string, message: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nuevo mensaje de contacto - MT3 Arquitectos</title>
  </head>
  <body style="margin:0;padding:0;font-family:'Helvetica Neue','Arial',sans-serif;background-color:#e5e5e5;">
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:50px 20px;">
          <table role="presentation" style="width:600px;border-collapse:collapse;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.15);">
            <tr>
              <td style="background:linear-gradient(135deg,#262626 0%,#333333 100%);padding:50px 40px;text-align:center;">
                <img src="https://mt3arquitectos.com.mx/MT3_LOGO_WHITE.png" alt="MT3 Arquitectos" style="max-width:200px;height:auto;margin-bottom:20px;" />
                <h2 style="margin:0;color:#ffffff;font-size:18px;font-weight:400;letter-spacing:1px;">Nuevo mensaje de contacto</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:50px 40px;">
                <p style="margin:0 0 35px 0;color:#404040;font-size:15px;line-height:1.6;">Has recibido un nuevo mensaje desde el formulario de contacto:</p>
                <table role="presentation" style="width:100%;border-collapse:collapse;margin:0;">
                  <tr>
                    <td style="padding:20px 25px;background-color:#fafafa;border-radius:8px;">
                      <table role="presentation" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td style="padding-bottom:25px;border-bottom:1px solid #e0e0e0;">
                            <p style="margin:0 0 10px 0;color:#737373;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;">Nombre</p>
                            <p style="margin:0;color:#262626;font-size:17px;font-weight:500;">${safeName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:25px 0;border-bottom:1px solid #e0e0e0;">
                            <p style="margin:0 0 10px 0;color:#737373;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;">Correo Electrónico</p>
                            <p style="margin:0;"><a href="mailto:${safeEmail}" style="color:#262626;font-size:17px;font-weight:500;text-decoration:none;">${safeEmail}</a></p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-top:25px;">
                            <p style="margin:0 0 10px 0;color:#737373;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;">Mensaje</p>
                            <p style="margin:0;color:#262626;font-size:15px;line-height:1.7;">${safeMessage}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:#262626;padding:35px 40px;text-align:center;">
                <p style="margin:0 0 12px 0;color:#ffffff;font-size:14px;font-weight:600;">MT3 Arquitectos</p>
                <p style="margin:0 0 8px 0;color:#b3b3b3;font-size:13px;line-height:1.5;">Volcán #110, Jardines del Moral<br/>León, Guanajuato</p>
                <p style="margin:10px 0 0 0;"><a href="https://mt3arquitectos.com.mx" style="color:#ffffff;font-size:13px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.3);padding-bottom:2px;">www.mt3arquitectos.com.mx</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

export async function sendContactEmail(input: {
  name: unknown;
  email: unknown;
  message: unknown;
}): Promise<ContactResult> {
  const name = sanitizeText(input.name);
  const email = sanitizeText(input.email).toLowerCase();
  const message = sanitizeText(input.message);

  if (!name || !email || !message) {
    return { success: false, message: 'Todos los campos son requeridos.' };
  }
  if (name.length < 2 || name.length > 100) {
    return { success: false, message: 'El nombre debe tener entre 2 y 100 caracteres.' };
  }
  if (message.length < 10 || message.length > 1000) {
    return { success: false, message: 'El mensaje debe tener entre 10 y 1000 caracteres.' };
  }
  if (!isValidEmail(email)) {
    return { success: false, message: 'El correo electrónico no es válido.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('❌ Falta RESEND_API_KEY');
    return {
      success: false,
      message: 'Error de configuración del servidor. Intenta más tarde.',
    };
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO.split(',').map((t) => t.trim()),
      subject: `📩 Nuevo mensaje de contacto - ${safeName}`,
      replyTo: email,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
      html: buildHtml(name, email, message),
    });

    if (error) {
      console.error('❌ Error de Resend:', error);
      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
      };
    }

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
    };
  } catch (err) {
    console.error('❌ Error al enviar el correo:', err);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
    };
  }
}
