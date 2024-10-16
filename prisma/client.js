// prisma-client.js

import { PrismaClient } from "@prisma/client";

let prisma;

const prismaClientSingleton = () => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"], // You can log Prisma queries for better debugging (optional)
    });
  }
  return prisma;
};

// Use global for sharing Prisma Client in serverless environments
// In Vercel or other serverless platforms, the global object persists across invocations in the same environment
// but does not across multiple function instances or cold starts, so this ensures we reuse the same Prisma Client

if (process.env.NODE_ENV === "production") {
  // In production, ensure a new client is used
  prisma = new PrismaClient();
} else {
  // In development or staging, use the global singleton to avoid creating multiple instances
  global.prisma = global.prisma || prismaClientSingleton();
}

export default global.prisma; // Export the Prisma client, ensuring it's shared across requests
