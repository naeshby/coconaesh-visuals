import StatusPanel from "../features/health/StatusPanel";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-baseline justify-between px-6 py-8 md:px-10">
        <span className="font-display text-xl tracking-tight text-brand-wine">
          CocoNaesh <span className="italic">Visuals</span>
        </span>
        <span className="text-xs tracking-widest text-charcoal/60 uppercase">
          Development build
        </span>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20 md:px-10">
        <div className="grid gap-16 pt-10 md:grid-cols-[1.3fr_1fr] md:pt-20">
          <div>
            <p className="text-xs tracking-widest text-brand-plum uppercase">
              Phase 0 · Foundation
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-brand-wine md:text-7xl">
              The foundation
              <br />
              is <span className="italic text-brand-plum">standing.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-charcoal/80">
              This page only proves that the React frontend, the Express API and
              PostgreSQL are talking to each other. The photography itself
              arrives in Phase 1.
            </p>
          </div>

          <div className="md:pt-6">
            <StatusPanel />
          </div>
        </div>
      </main>

      <footer className="border-t border-charcoal/15">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-charcoal/60 md:px-10">
          © {new Date().getFullYear()} CocoNaesh Visuals
        </div>
      </footer>
    </div>
  );
}