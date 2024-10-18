import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Make sure you have prisma client in lib

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Example provider (you can add more like GitHub, Credentials, etc.)
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          return null;
        }

        return user;
      },
    },
  ],
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { role: true },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role.name;
      }

      return session;
    },
    async signIn({ user }) {
      // Ensure that users are assigned the "Client" role by default if they don't have one
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) {
        await prisma.user.update({
          where: { email: user.email },
          data: {
            role: {
              connect: { name: "Client" }, // Default role
            },
          },
        });
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
