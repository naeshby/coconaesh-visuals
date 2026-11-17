import type { Request, Response } from "express";
import type { HealthService } from "./health.service.js";

export function createHealthController(service: HealthService) {
  return {
    async getHealth(_req: Request, res: Response) {
      const report = await service.check();

      if (report.status === "ok") {
        res.status(200).json({ success: true, data: report });
        return;
      }

      res.status(503).json({
        success: false,
        error: {
          code: "DATABASE_UNAVAILABLE",
          message: "The database is not reachable.",
        },
        data: report,
      });
    },
  };
}

export type HealthController = ReturnType<typeof createHealthController>;