import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <p className="text-xs tracking-widest text-brand-plum uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight text-brand-wine">
        This frame is <span className="italic">empty.</span>
      </h1>
      <p className="mt-6 text-charcoal/80">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-8 w-fit border-b border-brand-wine pb-1 text-sm tracking-wide text-brand-wine uppercase"
      >
        Back to the homepage
      </Link>
    </main>
  );
}