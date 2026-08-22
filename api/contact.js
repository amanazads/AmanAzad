import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const senderUser = process.env.EMAIL_USER || 'azadaman1apl@gmail.com';
    const senderPass = (process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
    const receiverEmail = process.env.RECEIVER_EMAIL || 'azadaman1apl@gmail.com';

    if (!senderPass) {
      console.error('⚠️ [Contact API] EMAIL_PASS environment variable is missing on Vercel.');
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured on the server. Please add EMAIL_PASS to Vercel Environment Variables.'
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderUser,
        pass: senderPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${senderUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `Portfolio Inquiry from ${name} (${email})`,
      text: `New message from Portfolio Contact Form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e4e3df; border-radius: 8px; background-color: #faf9f6;">
          <h2 style="color: #0f0f0e; margin-top: 0; border-bottom: 2px solid #1a6eff; padding-bottom: 8px;">New Portfolio Contact Message</h2>
          <p style="margin: 12px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 12px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #1a6eff;">${email}</a></p>
          <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border-left: 4px solid #1a6eff; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; color: #333333; line-height: 1.6;">${message}</p>
          </div>
          <hr style="margin-top: 24px; border: none; border-top: 1px solid #e4e3df;" />
          <p style="font-size: 12px; color: #8a8a87; margin-bottom: 0;">Sent directly from your personal portfolio.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
  }
}
