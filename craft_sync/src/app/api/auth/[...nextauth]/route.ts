// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';

// Extend the NextAuth User type to include `role`
declare module 'next-auth' {
  interface User {
    id: number;
    name: string | null;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(
    (() => {
      // Use a function to import prisma only when needed at runtime
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
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Dynamically import prisma at runtime to avoid errors during build
        const { default: prisma } = await import('../../utils/prisma');

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user found or password doesn't match, return null
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        // Return the user object without the password field
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword; // Ensure only non-sensitive fields are returned
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

// Directly wrap `NextAuth` with the configured `authOptions`
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
