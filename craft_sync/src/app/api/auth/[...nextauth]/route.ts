// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../utils/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

// Extend the NextAuth User type to include `role`
declare module 'next-auth' {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user found or password doesn't match, return null
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return user; // Successful auth returns the user object
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // Casting to any to access `role`
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string; // Type-safe addition of role
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
