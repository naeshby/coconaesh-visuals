import { useHealth, type HealthState } from "./useHealth";

type Tone = "ok" | "bad" | "pending";

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: Tone;
}) {
  const dot =
    tone === "ok"
      ? "bg-emerald-700"
      : tone === "bad"
        ? "bg-brand-plum"
        : "bg-charcoal/30 animate-pulse";

  return (
    <div className="flex items-center justify-between gap-6 border-b border-charcoal/15 py-4">
      <dt className="text-sm tracking-wide text-charcoal/70 uppercase">{label}</dt>
      <dd className="flex items-center gap-3 font-medium">
        <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        {value}
      </dd>
    </div>
  );
}

function describe(state: HealthState) {
  switch (state.phase) {
    case "loading":
      return {
        api: { value: "Checking…", tone: "pending" as Tone },
        db: { value: "Checking…", tone: "pending" as Tone },
        note: "Contacting the API.",
      };
    case "connected":
      return {
        api: { value: "Connected", tone: "ok" as Tone },
        db: {
          value:
            state.report.services.database.latencyMs !== null
              ? `Connected (${state.report.services.database.latencyMs} ms)`
              : "Connected",
          tone: "ok" as Tone,
        },
        note: `Environment: ${state.report.environment}. Last checked ${new Date(
          state.report.timestamp,
        ).toLocaleTimeString()}.`,
      };
    case "degraded":
      return {
        api: { value: "Connected", tone: "ok" as Tone },
        db: { value: "Unavailable", tone: "bad" as Tone },
        note: "The API is running but cannot reach PostgreSQL. Check that the database container is healthy.",
      };
    case "unreachable":
      return {
        api: { value: "Unreachable", tone: "bad" as Tone },
        db: { value: "Unknown", tone: "bad" as Tone },
        note: "The frontend could not reach the API. Check that it is running on port 3000.",
      };
  }
}

export default function StatusPanel() {
  const { state, refresh } = useHealth();
  const view = describe(state);

  return (
    <section aria-labelledby="status-heading" className="max-w-xl">
      <h2
        id="status-heading"
        className="font-display text-2xl tracking-tight text-brand-wine"
      >
        System status
      </h2>

      <dl className="mt-4 border-t border-charcoal/15" aria-live="polite">
        <Row label="Frontend" value="Running" tone="ok" />
        <Row label="API" value={view.api.value} tone={view.api.tone} />
        <Row label="Database" value={view.db.value} tone={view.db.tone} />
      </dl>

      <p className="mt-4 min-h-10 text-sm text-charcoal/70">{view.note}</p>

      <button
        type="button"
        onClick={() => void refresh()}
        disabled={state.phase === "loading"}
        className="mt-2 border border-brand-wine px-5 py-2.5 text-sm tracking-wide text-brand-wine uppercase transition-colors duration-200 hover:bg-brand-wine hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
      >
        Check again
      </button>
    </section>
  );
}