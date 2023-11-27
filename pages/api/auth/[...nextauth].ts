import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Define the type for the authOptions object
export const authOptions: NextAuthOptions = {
  // Using the PrismaAdapter to interact with your database
  adapter: PrismaAdapter(prisma),

  // Configuration for authentication providers
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!, // Ensuring the environment variable is defined
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // Ensuring the environment variable is defined
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Ensuring the environment variable is defined
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Ensuring the environment variable is defined
    }),
  ],

  // Enabling debug mode in development for easier troubleshooting
  debug: process.env.NODE_ENV === "development",

  // Secret key for encrypting the session cookie
  secret: process.env.NEXTAUTH_SECRET!, // Ensuring the environment variable is defined

  // Callback functions for handling authentication events
  callbacks: {
    // signIn callback - custom logic for handling sign-in
    async signIn() {
      return true; // Currently allowing all users to sign in
    },
    // redirect callback - custom logic for post-authentication redirects
    async redirect() {
      return "/"; // Redirecting users to the home pages after authentication
    },
  },
};

// Export the NextAuth configuration with the defined options
export default NextAuth(authOptions);
