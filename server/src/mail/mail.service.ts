import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('BREVO_SMTP_HOST'),
      port: this.configService.get<number>('BREVO_SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('BREVO_SMTP_USER'),
        pass: this.configService.get('BREVO_SMTP_PASS'),
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `http://localhost:3000/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to: email,
      subject: 'Verify your email',
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
    <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      
      <h2 style="color: #111827; margin-bottom: 10px;">Verify your email address</h2>
      
      <p style="color: #374151; font-size: 14px;">
        Welcome to <strong>OpenLuma</strong>
      </p>

      <p style="color: #374151; font-size: 14px;">
        Please confirm your email address to activate your OpenLuma account.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyUrl}"
           style="
             background-color: #4f46e5;
             color: #ffffff;
             padding: 12px 22px;
             text-decoration: none;
             border-radius: 6px;
             font-size: 14px;
             display: inline-block;
           ">
          Verify Email
        </a>
      </div>

      <p style="color: #6b7280; font-size: 13px;">
        This verification link will expire in <strong>24 hours</strong>.
      </p>

      <p style="color: #6b7280; font-size: 13px;">
        If you didn’t create an OpenLuma account, you can safely ignore this email.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        © ${new Date().getFullYear()} OpenLuma. All rights reserved.
      </p>
    </div>
  </div>
`

    });
  }

  async sendWelcomeEmail(email: string, name?: string) {
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to: email,
      subject: 'Welcome to OpenLuma ',
      html: `
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <h2>Welcome to OpenLuma${name ? `, ${name}` : ''}!</h2>
        <p>Your email has been successfully verified.</p>
        <p>You can now start uploading your knowledge and asking questions.</p>
        <p style="margin-top: 20px;">
          Let’s build something amazing with OpenLuma.
        </p>
        <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">
          — The OpenLuma Team
        </p>
      </div>
    `,
    });
  }

  async sendPasswordResetEmail(email: string, rawToken: string) {
    const resetUrl = `${this.configService.get(
      'FRONTEND_URL',
    )}/reset-password?token=${rawToken}`;

    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to: email,
      subject: 'Reset your OpenLuma password',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
          
          <h2 style="color: #111827; margin-bottom: 10px;">
            Reset your password
          </h2>

          <p style="color: #374151; font-size: 14px;">
            We received a request to reset your <strong>OpenLuma</strong> password.
          </p>

          <p style="color: #374151; font-size: 14px;">
            Click the button below to set a new password.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}"
               style="
                 background-color: #ef4444;
                 color: #ffffff;
                 padding: 12px 22px;
                 text-decoration: none;
                 border-radius: 6px;
                 font-size: 14px;
                 display: inline-block;
               ">
              Reset Password
            </a>
          </div>

          <p style="color: #6b7280; font-size: 13px;">
            This link will expire in <strong>1 hour</strong>.
          </p>

          <p style="color: #6b7280; font-size: 13px;">
            If you didn’t request a password reset, you can safely ignore this email.
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} OpenLuma. All rights reserved.
          </p>
        </div>
      </div>
    `,
    });
  }


}


