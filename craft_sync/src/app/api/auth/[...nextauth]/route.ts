// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';

// Extend NextAuth User type to include `id`
declare module 'next-auth' {
  interface User {
    id: number;
    name: string | null;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      id: number;  // ✅ Ensure `id` is included in session type
      role: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(
    (() => {
      if (typeof window === 'undefined') {
        const { default: prisma } = require('../../utils/prisma');
        return prisma;
      }
      return undefined;
    })()
  ),
  session: {
    strategy: 'jwt',
  },
  cookies: { // ✅ Ensures secure cookie handling
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax", // ✅ Important for cross-site API calls
        secure: process.env.NODE_ENV === "production",
      },
    },
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

        const { default: prisma } = await import('../../utils/prisma');
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // ✅ Store `id` in token
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;  // ✅ Ensure session includes `id`
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};



// ✅ Ensure NextAuth handler is exported correctly
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
