import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

// First-party /api/contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const senderUser = process.env.EMAIL_USER || 'azadaman1apl@gmail.com';
    const senderPass = process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD;
    const receiverEmail = process.env.RECEIVER_EMAIL || 'azadaman1apl@gmail.com';

    if (!senderPass) {
      console.warn('\n⚠️ [Contact API] EMAIL_PASS or EMAIL_APP_PASSWORD not set in environment.');
      return res.status(200).json({
        success: true,
        simulated: true,
        message: 'Message received! Please set EMAIL_PASS in your .env to send live emails.'
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
          <p style="font-size: 12px; color: #8a8a87; margin-bottom: 0;">Sent directly from your personal portfolio server.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('[Server Mail Error]:', error);
    return res.status(500).json({ success: false, error: error.message || 'Failed to send email.' });
  }
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
