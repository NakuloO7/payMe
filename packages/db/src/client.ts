// packages/db/src/client.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // avoid multiple instances in dev
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof prismaClientSingleton>;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Export PrismaClient type for use in other packages
export { PrismaClient };