import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        basicAuth: { label: 'Basic Auth', type: 'text' },
      },
      async authorize(credentials, req) {
        if (!credentials?.basicAuth) {
          throw new Error('Missing credentials');
        }

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials.basicAuth}`,
                },
            }).then(res => res.json());

            if (response instanceof Error) {
                throw new Error(response.message || 'Authentication failed');
            }

            if (response.success && response.user) {
                console.log(response)
                return {
                    id: response.user.id,
                    name: response.user.name,
                    token: response.token
                };
            }

            return null;
        } catch (error : any) {
          throw new Error(error.message || 'Authentication error');
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
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  // async redirect({ url, baseUrl }) {
  //   return `/`
  // }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions as any);
export {handler as GET, handler as POST}