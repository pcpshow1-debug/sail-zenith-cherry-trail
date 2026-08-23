import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/i18n";

export function LegalPage({ title }: { title: string }) {
  const { t } = useLocale();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="container-site mx-auto max-w-3xl py-16 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
            Rhino Lab
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted">{t.legal.stub}</p>
          <Link
            to="/"
            className="mt-10 inline-flex text-sm font-semibold text-accent hover:text-primary"
          >
            ← Rhino Lab
          </Link>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
