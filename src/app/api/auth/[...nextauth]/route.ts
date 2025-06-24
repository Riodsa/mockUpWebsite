import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/libs/controllers/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!(credentials?.username || credentials?.email) || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
            const response = await login(credentials.username, credentials.email, credentials.password) as { success: boolean; user?: any; message?: string ; token?: string };

            if (response instanceof Error) {
                throw new Error(response.message || 'Authentication failed');
            }

            if (response.success && response.user) {
                console.log(response)
                return response.user;
            }

            return null;
        } catch (error : any) {
          throw new Error(error.message || 'Authentication error');
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin', // Custom Uppercase custom login page
  },
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token, user }) {
//         session.user = token as any
//         return session
//     }, async redirect({ url, baseUrl }) {
//     return `/`
//     }
//   },
  secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}