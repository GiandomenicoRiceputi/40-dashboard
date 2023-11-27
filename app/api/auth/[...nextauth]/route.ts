import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiHandler } from "next";

import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      from: process.env.EMAIL_FROM as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

const handler: NextApiHandler = NextAuth(options);

export const GET: NextApiHandler = handler;
export const POST: NextApiHandler = handler;
