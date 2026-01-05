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
        const verifyUrl = `${this.configService.get(
            'BACKEND_URL',
        )}/auth/verify-email?token=${token}`;

        await this.transporter.sendMail({
            from: this.configService.get('MAIL_FROM'),
            to: email,
            subject: 'Verify your email',
            html: `
    <div
        style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="background-color: #f4f6f8; padding: 40px 20px;">
            <div
                style="max-width: 520px; margin: auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

                <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #e5e7eb;">
                    <img src="https://res.cloudinary.com/dylmrhy5h/image/upload/v1767441302/Gemini_Generated_Image_kphguxkphguxkphg-removebg-preview_1_oexjzs.png"
                        alt="OpenLuma Logo" width="400"
                        style="display: block; margin: auto; border: 0; max-width: 100%; height: auto;">
                </div>

                <h1 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; text-align: center;">
                    Verify your email address
                </h1>

                <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0; text-align: center;">
                    Welcome to <strong>OpenLuma</strong>! We're excited to have you on board.
                </p>

                <p style="color: #374151; font-size: 16px; line-height: 1.5; margin: 0 0 30px 0; text-align: center;">
                    Please click the button below to confirm your email address and activate your account.
                </p>

                <div style="text-align: center; margin: 35px 0;">
                    <a href="${verifyUrl}" style="
             background-color: #4f46e5;
             color: #ffffff;
             padding: 14px 32px;
             text-decoration: none;
             border-radius: 8px;
             font-size: 16px;
             font-weight: 600;
             display: inline-block;
             mso-padding-alt: 14px 32px;
             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
           ">
                        Verify Email Address
                    </a>
                </div>

                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 30px;">
                    <p
                        style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 10px 0; text-align: center;">
                        For your security, this verification link will expire in <strong>24 hours</strong>.
                    </p>

                    <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
                        If you didn’t create an OpenLuma account, you can safely ignore this email.
                    </p>
                </div>

                <hr style="margin: 30px 0 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

                <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; text-align: center; margin: 0;">
                    &copy; ${new Date().getFullYear()} OpenLuma. All rights reserved.<br>
                    <span style="font-size: 11px;">You received this email because you signed up for an account on
                        OpenLuma.</span>
                </p>

            </div>
        </div>
    </div>
`

        });
    }

    async sendWelcomeEmail(email: string, name?: string) {

        const redirectUrl = `${this.configService.get(
            'FRONTEND_URL',
        )}/dashboard`;

        await this.transporter.sendMail({
            from: this.configService.get('MAIL_FROM'),
            to: email,
            subject: 'Welcome to OpenLuma ',
            html: `
       <div
        style="background-color: #f9fafb; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">

       <div style="background-color: #ffffff; max-width: 600px; margin: auto; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center;">
    
    <div style="margin-bottom: 40px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px;">
        <img src="https://res.cloudinary.com/dylmrhy5h/image/upload/v1767441302/Gemini_Generated_Image_kphguxkphguxkphg-removebg-preview_1_oexjzs.png" width="400" style="display: inline-block; border: 0; max-width: 100%; height: auto;">
    </div>

    <h1 style="color: #111827; font-size: 32px; font-weight: 800; margin: 0 0 20px 0;">
        Welcome aboard${name ? `, ${name}` : ''}.
    </h1>

            <p style="color: #374151; font-size: 18px; line-height: 1.6; margin-top: 0;">
                Your account is verified. OpenLuma is ready to turn your documents into an intelligent knowledge engine.
            </p>

            <div style="margin: 40px 0; border-top: 2px solid #f0f0f0; border-bottom: 2px solid #f0f0f0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td valign="top" style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; width: 30px;">
                            <span style="color: #111827; font-size: 20px;">✓</span>
                        </td>
                        <td valign="top"
                            style="padding: 15px 0 15px 10px; color: #374151; font-size: 16px; line-height: 1.6; border-bottom: 1px solid #f0f0f0;">
                            <strong>Upload Knowledge:</strong> Connect your Code files and Text files
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="padding: 15px 0; border-bottom: 1px solid #f0f0f0; width: 30px;">
                            <span style="color: #111827; font-size: 20px;">✓</span>
                        </td>
                        <td valign="top"
                            style="padding: 15px 0 15px 10px; color: #374151; font-size: 16px; line-height: 1.6; border-bottom: 1px solid #f0f0f0;">
                            <strong>Ask Questions:</strong> Get instant, accurate answers based on your data.
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="padding: 15px 0; width: 30px; border-bottom: none;">
                            <span style="color: #111827; font-size: 20px;">✓</span>
                        </td>
                        <td valign="top"
                            style="padding: 15px 0 15px 10px; color: #374151; font-size: 16px; line-height: 1.6; border-bottom: none;">
                            <strong>Share Insights:</strong> Collaborate with your team.
                        </td>
                    </tr>
                </table>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Ready to get started?
            </p>

            <div style="margin: 30px 0;">
                <a href="${redirectUrl}"
                    style="background-color: #111827; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: 700; display: inline-block;">
                    Start Uploading Knowledge
                </a>
            </div>

            <p style="margin-top: 60px; font-size: 14px; color: #9ca3af; padding-top: 20px; line-height: 1.5;">
                Cheers,<br>
                The OpenLuma Team
            </p>

        </div>
    </div>
      `
        });
    }

    async sendPasswordResetEmail(email: string, rawToken: string) {
        const resetUrl = `${this.configService.get(
            'BACKEND_URL',
        )
            }/reset-password?token=${rawToken}`;

        await this.transporter.sendMail({
            from: this.configService.get('MAIL_FROM'),
            to: email,
            subject: 'Reset your OpenLuma password',
            html: `
      <div
        style="background-color: #f9fafb; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">

        <div
            style="background-color: #ffffff; max-width: 600px; margin: auto; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);  display: flex; flex-direction: row; justify-content: center; align-items: center;">

            <div style="margin-bottom: 40px; text-align: left; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px;">
                <img src="https://res.cloudinary.com/dylmrhy5h/image/upload/v1767441302/Gemini_Generated_Image_kphguxkphguxkphg-removebg-preview_1_oexjzs.png"
                    alt="OpenLuma Logo" width="400"
                    style="display: block; border: 0; max-width: 100%; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;">
            </div>

            <h1 style="color: #111827; font-size: 32px; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.5px;">
                Reset your password.
            </h1>

            <p style="color: #374151; font-size: 18px; line-height: 1.6; margin-top: 0;">
                We received a request to reset your <strong>OpenLuma</strong> password.
            </p>

            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Click the button below to set a new password.
            </p>

            <div style="margin: 30px 0;">
                <a href="${resetUrl}"
                    style="background-color: #111827; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: 700; display: inline-block;">
                    Reset Password
                </a>
            </div>
            <div style="border-top: 1px solid #f0f0f0; margin-top: 40px; padding-top: 20px; display:block;">
                <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0 0 10px 0;">
                    This link will expire in <strong>1 hour</strong>.
                </p>

                <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
                    If you didn’t request a password reset, you can safely ignore this email.
                </p>
            </div>

            <p style="margin-top: 40px; font-size: 12px; color: #9ca3af; text-align: center;">
                &copy; ${new Date().getFullYear()} OpenLuma. All rights reserved.
            </p>

        </div>
    </div>


    </div>
    `,
        });
    }


}


