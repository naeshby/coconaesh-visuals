import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiGet } from "../../lib/api-client";
import StatusPanel from "./StatusPanel";
import type { HealthReport } from "./useHealth";

vi.mock("../../lib/api-client", () => ({ apiGet: vi.fn() }));
const mockedApiGet = vi.mocked(apiGet);

const healthyReport: HealthReport = {
  status: "ok",
  timestamp: "2026-11-17T04:34:29.840Z",
  uptimeSeconds: 350,
  environment: "test",
  services: { api: "ok", database: { status: "ok", latencyMs: 12 } },
};

const degradedReport: HealthReport = {
  ...healthyReport,
  status: "degraded",
  services: { api: "ok", database: { status: "unavailable", latencyMs: null } },
};

function rowFor(label: string): HTMLElement {
  const row = screen.getByText(label).closest("div");
  if (!row) throw new Error(`Row not found: ${label}`);
  return row;
}

describe("StatusPanel", () => {
  beforeEach(() => {
    mockedApiGet.mockReset();
  });

  it("shows a checking state and disables the button while loading", () => {
    mockedApiGet.mockReturnValue(new Promise(() => {}));

    render(<StatusPanel />);

    expect(rowFor("API")).toHaveTextContent("Checking…");
    expect(rowFor("Database")).toHaveTextContent("Checking…");
    expect(screen.getByRole("button", { name: /check again/i })).toBeDisabled();
  });

  it("shows API and database as connected when the API reports ok", async () => {
    mockedApiGet.mockResolvedValue({
      status: 200,
      body: { success: true, data: healthyReport },
    });

    render(<StatusPanel />);

    await waitFor(() =>
      expect(rowFor("Database")).toHaveTextContent("Connected (12 ms)"),
    );
    expect(rowFor("API")).toHaveTextContent("Connected");
    expect(rowFor("Frontend")).toHaveTextContent("Running");
    expect(screen.getByRole("button", { name: /check again/i })).toBeEnabled();
  });

  it("shows the database as unavailable when the API is degraded", async () => {
    mockedApiGet.mockResolvedValue({
      status: 503,
      body: { success: false, data: degradedReport },
    });

    render(<StatusPanel />);

    await waitFor(() =>
      expect(rowFor("Database")).toHaveTextContent("Unavailable"),
    );
    expect(rowFor("API")).toHaveTextContent("Connected");
    expect(screen.getByText(/cannot reach PostgreSQL/i)).toBeInTheDocument();
  });

  it("shows the API as unreachable on a network failure", async () => {
    mockedApiGet.mockRejectedValue(new Error("network down"));

    render(<StatusPanel />);

    await waitFor(() =>
      expect(rowFor("API")).toHaveTextContent("Unreachable"),
    );
    expect(rowFor("Database")).toHaveTextContent("Unknown");
    expect(screen.getByText(/port 3000/i)).toBeInTheDocument();
  });

  it("treats a response without health data as unreachable", async () => {
    mockedApiGet.mockResolvedValue({
      status: 500,
      body: { success: false },
    });

    render(<StatusPanel />);

    await waitFor(() =>
      expect(rowFor("API")).toHaveTextContent("Unreachable"),
    );
  });

  it("checks again when the button is clicked", async () => {
    const user = userEvent.setup();
    mockedApiGet.mockResolvedValue({
      status: 200,
      body: { success: true, data: healthyReport },
    });

    render(<StatusPanel />);

    const button = screen.getByRole("button", { name: /check again/i });
    await waitFor(() => expect(button).toBeEnabled());
    expect(mockedApiGet).toHaveBeenCalledTimes(1);

    await user.click(button);

    await waitFor(() => expect(mockedApiGet).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(button).toBeEnabled());
  });
});