import { PrismaClient } from '@/app/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

export * from '@/app/generated/prisma';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | null;
};

function createPrismaClient(): PrismaClient | null {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL is not set');
      return null;
    }

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    return new PrismaClient({
      adapter,
    });
  } catch (error) {
    console.error('Failed to create Prisma client:', error);
    return null;
  }
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma;
}

export default prisma as PrismaClient;
