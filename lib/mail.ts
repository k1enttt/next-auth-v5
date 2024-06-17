'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESENd_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Two-factor authentication code',
        html: `<p>Your two-factor authentication code is: <strong>${token}</strong></p>`,
    });
}

export const sendPasswordResetEmail = async (
    email: string, 
    token: string
) => {
    const resetLink = `${baseUrl}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href='${resetLink}'>here</a> to reset password</p>`
    });
}

/**
 * Send a verification email to the user
 * @param email string
 * @param token string
 * @returns Promise<void>
 */
export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from:'onboarding@resend.dev',
        to: email,
        subject: 'Verify your email address',
        html: `
            <h1>Verify your email address</h1>
            <p>Click the link below to verify your email address:</p>
            <a href="${confirmLink}">Verify your email address</a>
        `,
    })
}