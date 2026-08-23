import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { estimatorUrl } from "@/lib/estimator";
import { useLocale, type Locale } from "@/lib/i18n";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const appUrl = estimatorUrl(locale);

  const nav = [
    { href: "/#estimator", label: t.nav.estimator },
    { href: "/#how", label: t.nav.howItWorks },
    { href: "/#crm", label: t.estimatorJobs.crm },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/#faq", label: t.nav.faq },
  ];

  const LangToggle = ({ className }: { className?: string }) => (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-bg p-0.5 text-xs font-bold",
        className,
      )}
      role="group"
      aria-label={t.lang.switch}
    >
      {(["en", "ru"] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === code ? "bg-fg text-white" : "text-muted hover:text-fg",
          )}
          aria-pressed={locale === code}
        >
          {code === "en" ? t.lang.en : t.lang.ru}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-elevated/95 backdrop-blur-md">
      <div className="container-wide section-pad flex h-14 items-center justify-between gap-3 sm:h-16">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="Rhino Lab home"
        >
          <img
            src="/rhino/logo-mark.jpg?v=6"
            alt=""
            className="h-9 w-9 rounded-lg object-cover sm:h-10 sm:w-10"
            width={40}
            height={40}
          />
          <span className="text-[15px] font-extrabold tracking-tight text-fg sm:text-lg">
            RHINO LAB
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-fg/80 transition-colors hover:bg-primary-soft hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:inline-flex" />
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-fg px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary sm:px-4 sm:py-2 sm:text-sm"
          >
            {t.nav.tryEstimator}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-elevated text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-bg-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="section-pad flex flex-col gap-1 py-2.5">
          <div className="mb-1 flex items-center justify-between px-1 py-1">
            <span className="text-sm font-semibold text-fg">{t.lang.switch}</span>
            <LangToggle />
          </div>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-base font-semibold text-fg hover:bg-primary-soft"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            {t.nav.tryEstimator}
          </a>
        </div>
      </div>
    </header>
  );
}
