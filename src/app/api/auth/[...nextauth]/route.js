import NextAuth from "next-auth";
import prisma from "../../../../../prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        let user;

        // Check if the login is for an admin or a regular user
        if (credentials?.isAdmin === "true") {
          user = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });
        } else {
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
        }

        // If no user is found, return null
        if (!user) return null;

        // Check if the password matches
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // Return the user object if the password matches, otherwise null
        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.phone = token.phone;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  database: process.env.DATABASE_URL,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
