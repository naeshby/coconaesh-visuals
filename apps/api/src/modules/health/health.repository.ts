import type { PrismaClient } from "../../generated/prisma/client.js";

export interface HealthRepository {
  /** Resolves if the database answers a trivial query; rejects otherwise. */
  pingDatabase(): Promise<void>;
}

export function createHealthRepository(prisma: PrismaClient): HealthRepository {
  return {
    async pingDatabase() {
      await prisma.$queryRaw`SELECT 1`;
    },
  };
}