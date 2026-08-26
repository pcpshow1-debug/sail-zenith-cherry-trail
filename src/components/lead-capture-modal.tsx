import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { getAttribution } from "@/lib/tracking";

export type LeadFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  company: string;
  goals: string;
};

const empty: LeadFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  country: "",
  company: "",
  goals: "",
};

type Props = {
  open: boolean;
  onClose: () => void;
  source?: string;
};

function splitName(full: string) {
  const trimmed = full.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) return { firstName: trimmed, lastName: trimmed || "—" };
  return {
    firstName: trimmed.slice(0, space),
    lastName: trimmed.slice(space + 1).trim() || "—",
  };
}

export function LeadCaptureModal({ open, onClose, source = "site" }: Props) {
  const titleId = useId();
  const { t } = useLocale();
  const [form, setForm] = useState<LeadFormData>(empty);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSent(false);
      setSubmitting(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const set =
    (key: keyof LeadFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const attr = getAttribution();
    const packageName =
      source === "pricing-base"
        ? "Rhino Base"
        : source === "pricing-pro"
          ? "Rhino Pro"
          : source === "pricing-ultimate"
            ? "Ultimate Lead Generator"
            : "";
    const { firstName, lastName } = splitName(form.firstName);
    const payload = {
      firstName,
      lastName,
      phone: form.phone,
      email: form.email,
      city: "",
      state: "",
      country: "",
      company: form.company,
      goals: "",
      source: "rhinolab.app",
      packageName,
      ...attr,
      submittedAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("save failed");
      setSent(true);
      setForm(empty);
    } catch {
      setError("Could not send. Check the fields and try again, or email us below.");
    }
    setSubmitting(false);
  };

  const field =
    "w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-base text-fg outline-none transition placeholder:text-subtle focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-border bg-bg-elevated shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {t.lead.kicker}
            </p>
            <h2
              id={titleId}
              className="mt-1 text-xl font-bold tracking-tight text-fg sm:text-2xl"
            >
              {t.lead.title}
            </h2>
            <p className="mt-1 text-base text-muted">{t.lead.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-fg hover:bg-primary-soft"
            aria-label="Close form"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          {sent ? (
            <div className="space-y-3 py-8 text-center">
              <p className="text-2xl font-bold text-fg">{t.lead.successTitle}</p>
              <p className="text-base leading-relaxed text-muted">
                {t.lead.successBody}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white hover:bg-primary"
              >
                {t.lead.close}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3.5">
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-fg">Name</span>
                <input
                  required
                  autoComplete="name"
                  className={field}
                  value={form.firstName}
                  onChange={set("firstName")}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-fg">Company</span>
                <input
                  required
                  autoComplete="organization"
                  className={field}
                  value={form.company}
                  onChange={set("company")}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-fg">Phone</span>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  className={field}
                  value={form.phone}
                  onChange={set("phone")}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="text-sm font-semibold text-fg">Email</span>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  className={field}
                  value={form.email}
                  onChange={set("email")}
                />
              </label>
              {error ? (
                <p className="text-center text-sm font-semibold text-danger">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-base font-semibold text-white transition hover:bg-primary disabled:opacity-60"
              >
                {submitting ? t.lead.submitting : t.lead.submit}
              </button>
              <p className="text-center text-sm text-muted">
                Or email{" "}
                <a className="underline" href="mailto:info@rhinolab.app">
                  info@rhinolab.app
                </a>
                {" · "}
                <a
                  className="underline"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@rhinolab.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gmail
                </a>
              </p>
              <p className="text-center text-sm text-subtle">{t.lead.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
