import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from "@/lib/social";
import { useLocale } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="container-wide section-pad flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Rhino Lab home">
          <img
            src="/rhino/logo-mark.jpg?v=6"
            alt=""
            className="h-9 w-9 rounded-lg object-cover"
            width={36}
            height={36}
          />
          <span className="text-base font-extrabold tracking-tight text-fg">
            RHINO LAB
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base font-medium text-fg/80">
          <a href="/#estimator" className="hover:text-fg">
            {t.nav.estimator}
          </a>
          <a href="/#crm" className="hover:text-fg">
            {t.estimatorJobs.crm}
          </a>
          <a href="/#pricing" className="hover:text-fg">
            {t.nav.pricing}
          </a>
          <a href="/#about" className="hover:text-fg">
            {t.nav.about}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-fg"
          >
            <Instagram className="size-4" />
            {INSTAGRAM_HANDLE}
          </a>
        </nav>
      </div>
      <div className="container-wide section-pad flex flex-col gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-fg">
          {CONTACT_EMAIL}
        </a>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/terms" className="hover:text-fg">
            {t.legal.terms}
          </Link>
          <Link to="/privacy" className="hover:text-fg">
            {t.legal.privacy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
