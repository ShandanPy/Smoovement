import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import { createTransport } from 'nodemailer';

import { prisma } from '@/lib/prisma';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER || 'file://./.tmp-mail',
      from:
        process.env.EMAIL_FROM || 'Smoovement Auth <no-reply@smoovement.local>',
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        try {
          // For development, use Ethereal or file transport
          if (process.env.EMAIL_SERVER?.startsWith('file://')) {
            // File transport - just log the URL
            console.log(`\n📧 Magic link for ${email}:`);
            console.log(`🔗 ${url}\n`);
            console.log(
              '💡 Copy the URL above and open it in your browser to sign in.'
            );
            return;
          }

          // For Ethereal or other SMTP servers
          const transport = createTransport(provider.server);
          const result = await transport.sendMail({
            to: email,
            from: provider.from,
            subject: `Sign in to Smoovement`,
            text: `Sign in to Smoovement by clicking this link:\n\n${url}\n\nIf you didn't request this, you can safely ignore this email.`,
            html: `
              <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333;">Sign in to Smoovement</h1>
                <p>Click the button below to sign in:</p>
                <a href="${url}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                  Sign in
                </a>
                <p style="color: #666; font-size: 14px;">
                  If the button doesn't work, copy and paste this link into your browser:<br>
                  <a href="${url}">${url}</a>
                </p>
                <p style="color: #666; font-size: 14px;">
                  If you didn't request this, you can safely ignore this email.
                </p>
              </div>
            `,
          });

          // Log the magic link URL for development
          console.log(`\n📧 Magic link sent to ${email}`);
          console.log(`🔗 ${url}\n`);

          // If using Ethereal, log the preview URL
          if (
            result.messageId &&
            process.env.EMAIL_SERVER?.includes('ethereal')
          ) {
            console.log(
              `📬 Preview URL: https://ethereal.email/message/${result.messageId}`
            );
          }
        } catch (error) {
          console.error('Failed to send email:', error);
          // Still log the URL for development
          console.log(
            `\n📧 Magic link for ${email} (email failed, but here's the URL):`
          );
          console.log(`🔗 ${url}\n`);
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'database' as const,
  },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
