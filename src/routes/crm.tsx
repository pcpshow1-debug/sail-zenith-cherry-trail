import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  Clock,
  Eye,
  Inbox,
  Phone,
  RefreshCw,
  Users,
} from "lucide-react";
import {
  LEAD_STAGES,
  STAGE_LABEL,
  sourceLabel,
  type Lead,
  type LeadStage,
} from "@/lib/leads";
import type { SessionRow, SlideStat } from "@/lib/tracking";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const Route = createFileRoute("/crm")({
  component: CrmAdmin,
});

type ChannelRow = { channel: string; count: number };

type Dashboard = {
  leads: Lead[];
  sessions: SessionRow[];
  slides: SlideStat[];
  channels: ChannelRow[];
  stats: { visitors: number; sessions: number; leads: number };
};

type Tab = "overview" | "leads" | "visitors";

function seconds(ms: number) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function dueCount(lead: Lead) {
  const now = Date.now();
  return (lead.followUps || []).filter(
    (item) => !item.doneAt && new Date(item.dueAt).getTime() <= now,
  ).length;
}

function CrmAdmin() {
  const { locale } = useLocale();
  const ru = locale === "ru";
  const [unlocked, setUnlocked] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem("rhino-crm-ok") === "1",
  );
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  if (!unlocked) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bg px-4">
        <form
          className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-bg-elevated p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void (async () => {
              try {
                const res = await fetch("/api/crm", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ pin: pin.trim() }),
                });
                if (!res.ok) {
                  setPinError(true);
                  return;
                }
                sessionStorage.setItem("rhino-crm-ok", "1");
                setUnlocked(true);
              } catch {
                setPinError(true);
              }
            })();
          }}
        >
          <img
            src="/rhino/logo-mark.jpg?v=6"
            alt="Rhino Lab"
            className="h-9 w-auto"
          />
          <h1 className="text-2xl font-bold">{ru ? "Кабинет" : "Admin"}</h1>
          <p className="text-sm text-muted">
            {ru ? "Только для владельца." : "Owner only."}
          </p>
          <input
            type="password"
            autoComplete="current-password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setPinError(false);
            }}
            className="w-full rounded-xl border border-border px-3.5 py-3 text-base"
            placeholder={ru ? "Пароль" : "Password"}
          />
          {pinError ? (
            <p className="text-sm text-danger">
              {ru ? "Неверный пароль." : "Wrong password."}
            </p>
          ) : null}
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-fg text-sm font-semibold text-white"
          >
            {ru ? "Войти" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  return <CrmDesk ru={ru} />;
}

function CrmDesk({ ru }: { ru: boolean }) {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "due" | LeadStage>("all");

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/crm");
      if (res.status === 401) {
        sessionStorage.removeItem("rhino-crm-ok");
        window.location.reload();
        return;
      }
      if (!res.ok) throw new Error("offline");
      setData((await res.json()) as Dashboard);
    } catch {
      setError(ru ? "Кабинет не загрузился." : "Could not load CRM.");
    }
  }, [ru]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 15000);
    return () => window.clearInterval(timer);
  }, [load]);

  const patch = async (body: Record<string, string>) => {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) void load();
  };

  const leads = data?.leads ?? [];
  const sessions = data?.sessions ?? [];
  const dueTotal = leads.reduce((sum, lead) => sum + dueCount(lead), 0);

  const visibleLeads = useMemo(() => {
    if (filter === "all") return leads;
    if (filter === "due") return leads.filter((lead) => dueCount(lead) > 0);
    return leads.filter((lead) => lead.stage === filter);
  }, [filter, leads]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: ru ? "Обзор" : "Overview" },
    { id: "leads", label: ru ? `Лиды (${leads.length})` : `Leads (${leads.length})` },
    {
      id: "visitors",
      label: ru
        ? `Визиты (${sessions.length})`
        : `Visitors (${sessions.length})`,
    },
  ];

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg-elevated/95 backdrop-blur-md">
        <div className="container-wide section-pad flex h-14 items-center justify-between gap-3 sm:h-16">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Home">
              <img
                src="/rhino/logo-mark.jpg?v=6"
                alt="Rhino Lab"
                className="h-9 w-auto rounded-md object-contain"
              />
            </Link>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
              Admin CRM
            </span>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-3 text-sm font-semibold"
          >
            <RefreshCw className="size-4" />
            {ru ? "Обновить" : "Refresh"}
          </button>
        </div>
        <div className="container-wide section-pad flex gap-2 pb-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-semibold",
                tab === item.id ? "bg-fg text-white" : "bg-primary-soft text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container-wide section-pad py-6 sm:py-8">
        {error ? (
          <p className="mb-4 rounded-2xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {tab === "overview" ? (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat
                icon={<Users className="size-4" />}
                label={ru ? "Посетители" : "Visitors"}
                value={data?.stats.visitors ?? 0}
              />
              <Stat
                icon={<Eye className="size-4" />}
                label={ru ? "Сессии" : "Sessions"}
                value={data?.stats.sessions ?? 0}
              />
              <Stat
                icon={<Inbox className="size-4" />}
                label={ru ? "Лиды" : "Leads"}
                value={data?.stats.leads ?? 0}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card title={ru ? "Откуда пришли" : "Traffic source"}>
                {(data?.channels ?? []).length === 0 ? (
                  <Empty ru={ru} />
                ) : (
                  <ul className="space-y-2">
                    {(data?.channels ?? []).map((row) => (
                      <li
                        key={row.channel}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="font-semibold">{row.channel}</span>
                        <span className="text-muted">{row.count}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
              <Card title={ru ? "Где дольше смотрели" : "Hottest slides"}>
                {(data?.slides ?? []).length === 0 ? (
                  <Empty ru={ru} />
                ) : (
                  <ul className="space-y-2">
                    {(data?.slides ?? []).map((row) => (
                      <li key={row.slideId} className="text-sm">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold">{row.slideLabel}</span>
                          <span className="text-muted">{seconds(row.ms)}</span>
                        </div>
                        <p className="text-xs text-subtle">
                          {row.views} {ru ? "просмотров" : "views"}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </div>
        ) : null}

        {tab === "leads" ? (
          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(
                [
                  { id: "all" as const, label: ru ? "Все" : "All" },
                  {
                    id: "due" as const,
                    label: ru ? `Сейчас (${dueTotal})` : `Due (${dueTotal})`,
                  },
                  ...LEAD_STAGES.map((stage) => ({
                    id: stage,
                    label: STAGE_LABEL[stage][ru ? "ru" : "en"],
                  })),
                ] as { id: "all" | "due" | LeadStage; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-sm font-semibold",
                    filter === item.id
                      ? "border-fg bg-fg text-white"
                      : "border-border bg-bg-elevated",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {visibleLeads.length === 0 ? (
              <Card title="">
                <Empty ru={ru} />
              </Card>
            ) : (
              <ul className="space-y-3">
                {visibleLeads.map((lead) => {
                  const open = openId === lead.id;
                  return (
                    <li
                      key={lead.id}
                      className="overflow-hidden rounded-2xl border border-border bg-bg-elevated"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : lead.id)}
                        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
                      >
                        <div>
                          <p className="text-lg font-bold">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-sm text-muted">
                            {lead.company} · {lead.packageName || sourceLabel(lead.source)}{" "}
                            · {lead.channel || "Direct"}
                          </p>
                          {lead.hottestSlide ? (
                            <p className="mt-1 text-xs text-subtle">
                              {ru ? "Дольше всего:" : "Longest on:"}{" "}
                              {lead.hottestSlide}
                            </p>
                          ) : null}
                        </div>
                        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                          {STAGE_LABEL[lead.stage][ru ? "ru" : "en"]}
                        </span>
                      </button>
                      {open ? (
                        <LeadDetail lead={lead} ru={ru} onPatch={patch} />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}

        {tab === "visitors" ? (
          <ul className="space-y-3">
            {sessions.length === 0 ? (
              <Card title="">
                <Empty ru={ru} />
              </Card>
            ) : (
              sessions.map((session) => (
                <li
                  key={session.id}
                  className="rounded-2xl border border-border bg-bg-elevated p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-bold">{session.channel}</p>
                      <p className="text-sm text-muted">
                        {new Date(session.lastSeen).toLocaleString()}
                        {session.leadId
                          ? ru
                            ? " · стал лидом"
                            : " · converted"
                          : ""}
                      </p>
                    </div>
                    {session.hottestSlide ? (
                      <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                        {session.hottestSlide}
                      </span>
                    ) : null}
                  </div>
                  {session.utmSource ? (
                    <p className="mt-2 text-xs text-subtle">
                      UTM: {session.utmSource}
                      {session.utmCampaign ? ` / ${session.utmCampaign}` : ""}
                    </p>
                  ) : null}
                  <SlideList slides={session.slides} ru={ru} />
                </li>
              ))
            )}
          </ul>
        ) : null}
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-5">
      {title ? <h2 className="mb-3 text-base font-bold">{title}</h2> : null}
      {children}
    </section>
  );
}

function Empty({ ru }: { ru: boolean }) {
  return (
    <p className="py-6 text-center text-sm text-muted">
      {ru
        ? "Пока пусто. Открой сайт, полистай слайды — сюда придёт путь."
        : "Empty. Open the site, scroll the slides — the path will land here."}
    </p>
  );
}

function SlideList({ slides, ru }: { slides: SlideStat[]; ru: boolean }) {
  if (!slides.length) {
    return (
      <p className="mt-3 text-sm text-subtle">
        {ru ? "Слайды ещё не отмечены" : "No slide views yet"}
      </p>
    );
  }
  return (
    <ul className="mt-3 space-y-1.5">
      {slides.map((slide) => (
        <li
          key={slide.slideId}
          className="flex items-center justify-between text-sm"
        >
          <span>{slide.slideLabel}</span>
          <span className="text-muted">
            {slide.views}× · {seconds(slide.ms)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function LeadDetail({
  lead,
  ru,
  onPatch,
}: {
  lead: Lead;
  ru: boolean;
  onPatch: (body: Record<string, string>) => Promise<void>;
}) {
  return (
    <div className="space-y-4 border-t border-border px-4 py-4">
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-2 font-semibold text-accent">
          <Phone className="size-4" />
          {lead.phone}
        </a>
        <a href={`mailto:${lead.email}`} className="font-semibold text-accent">
          {lead.email}
        </a>
        <p>
          {lead.city}, {lead.state}, {lead.country}
        </p>
        <p className="font-semibold">
          {ru ? "Пакет:" : "Package:"} {lead.packageName || sourceLabel(lead.source)}
        </p>
        <p>
          {ru ? "Канал:" : "Channel:"} {lead.channel || "Direct"}
        </p>
        {lead.utmSource ? <p>UTM: {lead.utmSource}</p> : null}
        <p className="sm:col-span-2 text-muted">{lead.goals}</p>
      </div>

      <label className="block text-sm">
        <span className="font-semibold">{ru ? "Стадия" : "Stage"}</span>
        <select
          className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2.5"
          value={lead.stage}
          onChange={(e) => void onPatch({ leadId: lead.id, stage: e.target.value })}
        >
          {LEAD_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {STAGE_LABEL[stage][ru ? "ru" : "en"]}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted">
          {ru ? "Какие слайды смотрел" : "Slides watched"}
        </p>
        <SlideList slides={lead.slides || []} ru={ru} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted">
          {ru ? "Автоворонка" : "Automation"}
        </p>
        {(lead.followUps || []).map((item) => {
          const dueNow =
            !item.doneAt && new Date(item.dueAt).getTime() <= Date.now();
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5",
                item.doneAt
                  ? "border-success/30 bg-success/5"
                  : dueNow
                    ? "border-danger/30 bg-danger/5"
                    : "border-border",
              )}
            >
              <div>
                <p className="text-sm font-semibold">
                  {item.step}. {item.title}
                </p>
                <p className="text-xs text-muted">
                  {new Date(item.dueAt).toLocaleString()}
                </p>
              </div>
              {item.doneAt ? (
                <Check className="size-4 text-success" />
              ) : (
                <button
                  type="button"
                  onClick={() => void onPatch({ followUpId: item.id })}
                  className="inline-flex items-center gap-1 rounded-full bg-fg px-3 py-1.5 text-xs font-bold text-white"
                >
                  <Clock className="size-3" />
                  {ru ? "Сделано" : "Done"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
