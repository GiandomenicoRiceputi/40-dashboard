// Import the PrismaClient class from the Prisma client package.
import { PrismaClient } from "@prisma/client";

// Declare a global augmentation to include 'prisma' in the global namespace.
// This allows for sharing a single instance of PrismaClient across your application.
declare global {
  var prisma: PrismaClient;
}

// Check if 'prisma' is already defined in the global scope.
// If it is, use that instance, otherwise create a new instance of PrismaClient.
// This ensures a single instance of PrismaClient is used throughout the application,
// which is especially important for performance and connection handling.
const client = globalThis.prisma || new PrismaClient();

// In development mode, assign the created client instance to the global 'prisma'.
// This step is skipped in production, avoiding potential memory leaks or unexpected behavior.
if (process.env.NODE_ENV === "development") {
  globalThis.prisma = client;
}

// Export the PrismaClient instance.
// This allows other parts of the application to import and use the same PrismaClient instance.
export default client;
