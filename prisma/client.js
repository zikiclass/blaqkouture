// prisma-client.js

import { PrismaClient } from "@prisma/client";

let prisma;

const prismaClientSingleton = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

// Ensure globalThis is declared properly
global.prismaGlobal = global.prismaGlobal || prismaClientSingleton();

// Export prisma instance
export default global.prismaGlobal;

// Optionally set prismaGlobal in non-production environments
if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prismaClientSingleton();
}
