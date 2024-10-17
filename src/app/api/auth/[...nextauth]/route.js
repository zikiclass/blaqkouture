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
          // Ensure isAdmin is a string if coming from a form
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
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  database: process.env.DATABASE_URL,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
