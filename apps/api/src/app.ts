import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { createHealthController } from "./modules/health/health.controller.js";
import { createHealthRouter } from "./modules/health/health.routes.js";
import type { HealthService } from "./modules/health/health.service.js";

export interface AppDependencies {
  webOrigin: string;
  healthService: HealthService;
}

export function createApp(deps: AppDependencies): Express {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: deps.webOrigin, credentials: true }));
  app.use(express.json({ limit: "1mb" }));

  const healthController = createHealthController(deps.healthService);
  app.use("/api/v1/health", createHealthRouter(healthController));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}