import { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        basicAuth: { label: 'Basic Auth', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.basicAuth) {
          throw new Error('Missing credentials');
        }

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials.basicAuth}`,
            },
          }).then((res) => res.json());

          if (response instanceof Error) {
            throw new Error(response.message || 'Authentication failed');
          }

          if (response.success && response.user) {
            return {
              id: response.user.id,
              name: response.user.name,
              token: response.token,
            };
          }

          return null;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || 'Authentication error');
          } else {
            throw new Error('Authentication error');
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as Session['user'];
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};