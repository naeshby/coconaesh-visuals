import type { HealthRepository } from "./health.repository.js";

export interface HealthReport {
  status: "ok" | "degraded";
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  services: {
    api: "ok";
    database: {
      status: "ok" | "unavailable";
      latencyMs: number | null;
    };
  };
}

const DATABASE_TIMEOUT_MS = 3000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export function createHealthService(
  repository: HealthRepository,
  environment: string,
) {
  return {
    async check(): Promise<HealthReport> {
      const started = performance.now();
      let databaseStatus: "ok" | "unavailable" = "ok";
      let latencyMs: number | null = null;

      try {
        await withTimeout(repository.pingDatabase(), DATABASE_TIMEOUT_MS);
        latencyMs = Math.round(performance.now() - started);
      } catch (error) {
        databaseStatus = "unavailable";
        console.error("Health check: database unavailable:", error);
      }

      return {
        status: databaseStatus === "ok" ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.round(process.uptime()),
        environment,
        services: {
          api: "ok",
          database: { status: databaseStatus, latencyMs },
        },
      };
    },
  };
}

export type HealthService = ReturnType<typeof createHealthService>;