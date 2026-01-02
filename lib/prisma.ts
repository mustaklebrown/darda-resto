import { PrismaClient } from '@/app/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);

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
