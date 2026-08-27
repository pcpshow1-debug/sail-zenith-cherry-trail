import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  PRIVACY_SECTIONS,
  PRIVACY_UPDATED,
  TERMS_SECTIONS,
  TERMS_UPDATED,
  type LegalSection,
} from "@/lib/legal";

type LegalKind = "terms" | "privacy";

export function LegalPage({ title, kind }: { title: string; kind: LegalKind }) {
  const updated = kind === "terms" ? TERMS_UPDATED : PRIVACY_UPDATED;
  const sections: LegalSection[] =
    kind === "terms" ? TERMS_SECTIONS : PRIVACY_SECTIONS;

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
          <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-bold text-fg">{section.heading}</h2>
                {section.body.map((para) => (
                  <p
                    key={para.slice(0, 64)}
                    className="mt-3 text-base leading-7 text-muted"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
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
