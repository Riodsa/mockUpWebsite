import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const authString = btoa(`${credentials.username}:${credentials.password}`);

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authString}`,
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

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}