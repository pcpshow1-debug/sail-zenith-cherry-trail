import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-4 py-10">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-bg-elevated p-6 shadow-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src="/rhino/logo.jpg"
            alt="Rhino Lab"
            className="h-14 w-14 rounded-2xl bg-black object-contain p-2"
            width={56}
            height={56}
          />
          <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        </div>

        {authEnabled ? (
          <div className="space-y-2">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                className="w-full rounded-xl border border-border-strong bg-bg-elevated px-4 py-3 text-sm font-medium text-fg transition-colors hover:bg-primary-soft"
              >
                Continue with {p.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>
    </main>
  );
}
