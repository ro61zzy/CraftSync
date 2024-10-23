// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs'; // Assuming you're hashing passwords

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt', // Use JWT sessions
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // If no user found or password doesn't match, return null (auth fails)
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return user; // Return user object on successful auth
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add user role to the JWT token
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the role from the token to the session
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page if needed
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
