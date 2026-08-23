import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Rhino Lab</p>
      <h1 className="text-2xl font-extrabold text-fg">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted">
        {error.message || "Reload the page. If it keeps happening, try the estimator."}
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white"
      >
        Back to Rhino Lab
      </Link>
    </main>
  );
}
