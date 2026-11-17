import { useCallback, useEffect, useRef, useState } from "react";
import { apiGet } from "../../lib/api-client";

// Mirrors the API's HealthReport. Moves to packages/types in a later phase.
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

interface HealthEnvelope {
  success: boolean;
  data?: HealthReport;
  error?: { code: string; message: string };
}

export type HealthState =
  | { phase: "loading" }
  | { phase: "connected"; report: HealthReport }
  | { phase: "degraded"; report: HealthReport }
  | { phase: "unreachable" };

export function useHealth() {
  const [state, setState] = useState<HealthState>({ phase: "loading" });
  const controllerRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ phase: "loading" });

    try {
      const { body } = await apiGet<HealthEnvelope>(
        "/api/v1/health",
        controller.signal,
      );
      if (controller.signal.aborted) return;

      if (body.data) {
        setState({
          phase: body.data.status === "ok" ? "connected" : "degraded",
          report: body.data,
        });
      } else {
        setState({ phase: "unreachable" });
      }
    } catch {
      if (controller.signal.aborted) return;
      setState({ phase: "unreachable" });
    }
  }, []);

  useEffect(() => {
    void refresh();
    return () => controllerRef.current?.abort();
  }, [refresh]);

  return { state, refresh };
}