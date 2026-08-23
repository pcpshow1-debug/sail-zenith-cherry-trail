import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ESTIMATOR_APP_URL } from "@/lib/estimator";

export const Route = createFileRoute("/estimator")({
  component: EstimatorPlaceholderPage,
});

function EstimatorPlaceholderPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <img
            src="/rhino/logo-white.jpg"
            alt="Rhino Lab"
            className="mx-auto h-16 w-16 rounded-2xl object-cover shadow-md"
            width={64}
            height={64}
          />
          <p className="text-sm text-muted">
            Open the live estimator for an instant quote.
          </p>
          <a
            href={ESTIMATOR_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-primary"
          >
            Open estimator
            <ExternalLink className="size-4" />
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
