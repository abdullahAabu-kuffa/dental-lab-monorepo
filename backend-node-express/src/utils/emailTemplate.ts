/**
 * Generates a styled HTML email for both password reset and welcome flows.
 * @param options
 *   - title: email heading
 *   - body: HTML string (main message)
 *   - ctaText: (optional) button text
 *   - ctaUrl: (optional) button URL
 *   - showButton: if false, hides CTA button
 */
export function buildEmailTemplate(options: {
  title: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  showButton?: boolean;
}): string {
  const { title, body, ctaText, ctaUrl, showButton = false } = options;

  return `
  <div style="margin:0; padding:0; background:linear-gradient(135deg,#f6f9fc 0%,#eef1f5 100%); font-family:'Segoe UI', Roboto, Arial, sans-serif;">
    <div style="max-width:600px; margin:40px auto; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
      <!-- Header -->
      <div style="background:linear-gradient(90deg,#CFC0AE,#BDB0A7); padding:30px 20px; text-align:center;">
        <h1 style="color:#fff; margin:0; font-size:26px;">Dental Lab</h1>
        <p style="color:#e0f7ff; font-size:14px; margin-top:8px;">${title}</p>
      </div>

      <!-- Body -->
      <div style="padding:40px 30px; color:#333;">
        ${body}

        ${showButton && ctaUrl && ctaText ? `
        <div style="text-align:center; margin:40px 0;">
          <a href="${ctaUrl}"
             style="background:#BDB0A7; color:white; padding:14px 32px; font-size:16px; border-radius:8px; text-decoration:none; font-weight:600; transition:all 0.3s ease; display:inline-block;">
            ${ctaText}
          </a>
        </div>
        ` : ''}

        <hr style="border:none; border-top:1px solid #eee; margin:40px 0 20px;">
        <p style="font-size:13px; color:#aaa; text-align:center; line-height:1.5;">
          Need help? <a href="mailto:support@avantedentalsolutions.com" style="color:#BDB0A7; text-decoration:none;">Contact support</a><br>
          This is an automated message, please do not reply.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f1f5f9; text-align:center; padding:15px;">
        <img src="https://cdn-icons-png.flaticon.com/512/3094/3094855.png" alt="Dental Lab Logo" width="40" style="opacity:0.8; margin-bottom:6px;">
        <p style="font-size:12px; color:#777; margin:0;">&copy; ${new Date().getFullYear()} Dental Lab. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;
}
