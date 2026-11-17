import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { createHealthRepository } from "./modules/health/health.repository.js";
import { createHealthService } from "./modules/health/health.service.js";

const healthService = createHealthService(
  createHealthRepository(prisma),
  env.NODE_ENV,
);

const app = createApp({
  webOrigin: env.WEB_ORIGIN,
  healthService,
});

const server = app.listen(env.API_PORT, env.API_HOST, () => {
  console.log(`API listening on http://localhost:${env.API_PORT}`);
  console.log(`Health check: http://localhost:${env.API_PORT}/api/v1/health`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received, shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  // Force exit if connections refuse to close.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));