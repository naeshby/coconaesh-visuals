import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../app.js";
import type { HealthRepository } from "./health.repository.js";
import { createHealthService } from "./health.service.js";

function buildApp(repository: HealthRepository) {
  return createApp({
    webOrigin: "http://localhost:5173",
    healthService: createHealthService(repository, "test"),
  });
}

describe("GET /api/v1/health", () => {
  it("returns 200 when the database responds", async () => {
    const app = buildApp({ pingDatabase: async () => {} });

    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
    expect(res.body.data.services.database.status).toBe("ok");
    expect(typeof res.body.data.services.database.latencyMs).toBe("number");
  });

  it("returns 503 without leaking details when the database fails", async () => {
    const app = buildApp({
      pingDatabase: async () => {
        throw new Error("connection refused: secret-host:5432");
      },
    });

    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("DATABASE_UNAVAILABLE");
    expect(res.body.data.services.database.status).toBe("unavailable");
    expect(JSON.stringify(res.body)).not.toContain("secret-host");
  });
});

describe("unknown routes", () => {
  it("returns a JSON 404", async () => {
    const app = buildApp({ pingDatabase: async () => {} });

    const res = await request(app).get("/api/v1/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});