// src/utils/prisma.ts
import { PrismaClient } from '@prisma/client';

// Prevent multiple PrismaClient instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
