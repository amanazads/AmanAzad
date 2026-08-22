import { defineConfig } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

function getEnv() {
  let envFile = {};
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      envFile = dotenv.parse(fs.readFileSync(envPath, 'utf-8'));
    }
  } catch (err) {
    console.error('Failed to read .env file:', err);
  }

  const senderUser = envFile.EMAIL_USER || process.env.EMAIL_USER || 'azadaman1apl@gmail.com';
  const senderPass = (envFile.EMAIL_PASS || envFile.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  const receiverEmail = envFile.RECEIVER_EMAIL || process.env.RECEIVER_EMAIL || 'azadaman1apl@gmail.com';

  return { senderUser, senderPass, receiverEmail };
}

// Custom Vite middleware to handle /api/contact directly inside Vite during dev & preview
function contactApiPlugin() {
  const handler = async (req, res) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const { name, email, message } = data;

        if (!name || !email || !message) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Name, email, and message are required.' }));
          return;
        }

        const { senderUser, senderPass, receiverEmail } = getEnv();

        console.log(`\n📨 [Contact API] Received message from "${name}" <${email}>`);

        if (!senderPass) {
          console.error('❌ [Contact API] EMAIL_PASS is missing in .env! Cannot send live email.');
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: false,
            error: 'EMAIL_PASS is missing in .env. Please check your .env file.'
          }));
          return;
        }

        console.log(`🚀 [Contact API] Attempting to send email via Gmail SMTP to ${receiverEmail}...`);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: senderUser,
            pass: senderPass,
          },
        });

        const mailOptions = {
          from: `"${name} via Portfolio" <${senderUser}>`,
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

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ [Contact API] Email sent successfully! Message ID: ${info.messageId}`);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }));
      } catch (error) {
        console.error('❌ [Contact API Error]:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: error.message || 'Failed to send email' }));
      }
    });
  };

  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/contact', handler);
    },
  };
}

export default defineConfig({
  plugins: [contactApiPlugin()],
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
});
