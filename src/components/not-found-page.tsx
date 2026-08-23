import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { estimatorUrl } from "@/lib/estimator";
import { useLocale } from "@/lib/i18n";

export function NotFoundPage() {
  const { t, locale } = useLocale();
  const appUrl = estimatorUrl(locale);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 max-w-lg text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          {t.notFound.title}
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">{t.notFound.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white"
          >
            {t.notFound.home}
          </Link>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold"
          >
            {t.tryDemo}
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
