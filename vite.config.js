import { defineConfig } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Custom Vite middleware to handle /api/contact directly inside Vite during dev
function contactApiPlugin() {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
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

            const senderUser = process.env.EMAIL_USER || 'azadaman1apl@gmail.com';
            const senderPass = process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD;
            const receiverEmail = process.env.RECEIVER_EMAIL || 'azadaman1apl@gmail.com';

            if (!senderPass) {
              console.warn('\n⚠️ [Contact API] EMAIL_PASS or EMAIL_APP_PASSWORD not set in .env.');
              console.warn('To send live emails directly from your server, generate a 16-character Google App Password and add it to your .env file:\nEMAIL_USER=azadaman1apl@gmail.com\nEMAIL_PASS=your-16-char-app-password\n');
              
              // In local dev without password, we log the message and return success with a warning note
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                simulated: true,
                message: 'Message received! (SMTP credentials pending in .env)'
              }));
              return;
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

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }));
          } catch (error) {
            console.error('[Contact API Error]:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: error.message || 'Failed to send email' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [contactApiPlugin()],
  server: {
    port: 3001,
  },
});
