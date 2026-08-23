import { getSql } from "@/lib/db";
import type { SessionRow, SlideStat } from "@/lib/tracking";

export type IncomingEvent = {
  slideId: string;
  slideLabel: string;
  kind: string;
  ms?: number;
};

export type TrackPayload = {
  visitorId: string;
  sessionId: string;
  channel?: string;
  landing?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  events?: IncomingEvent[];
};


function asIso(value: string | Date | null | undefined) {
  if (!value) return "";
  return value instanceof Date ? value.toISOString() : String(value);
}

export async function ingestTrack(payload: TrackPayload) {
  const visitorId = payload.visitorId?.trim();
  const sessionId = payload.sessionId?.trim();
  if (!visitorId || !sessionId) return;
  const sql = await getSql();
  const now = new Date().toISOString();

  await sql`
    insert into visitors (id, first_seen, last_seen)
    values (${visitorId}, ${now}, ${now})
    on conflict (id) do update set last_seen = ${now}
  `;

  await sql`
    insert into sessions (
      id, visitor_id, channel, landing, referrer,
      utm_source, utm_medium, utm_campaign, utm_content,
      started_at, last_seen
    ) values (
      ${sessionId}, ${visitorId}, ${payload.channel || "Direct"},
      ${payload.landing || ""}, ${payload.referrer || ""},
      ${payload.utmSource || ""}, ${payload.utmMedium || ""},
      ${payload.utmCampaign || ""}, ${payload.utmContent || ""},
      ${now}, ${now}
    )
    on conflict (id) do update set
      last_seen = ${now},
      channel = coalesce(nullif(sessions.channel, ''), excluded.channel),
      landing = coalesce(nullif(sessions.landing, ''), excluded.landing)
  `;

  for (const event of payload.events ?? []) {
    if (!event.slideId) continue;
    await sql`
      insert into slide_events (
        id, session_id, visitor_id, slide_id, slide_label, kind, ms, created_at
      ) values (
        ${crypto.randomUUID()}, ${sessionId}, ${visitorId},
        ${event.slideId}, ${event.slideLabel || event.slideId},
        ${event.kind || "view"}, ${Math.max(0, Math.round(event.ms || 0))},
        ${now}
      )
    `;
  }
}

export async function attachSessionToLead(sessionId: string, leadId: string) {
  if (!sessionId || !leadId) return;
  const sql = await getSql();
  await sql`
    update sessions set lead_id = ${leadId} where id = ${sessionId}
  `;
}

type SessionDb = {
  id: string;
  visitor_id: string;
  lead_id: string | null;
  channel: string | null;
  landing: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  started_at: string | Date;
  last_seen: string | Date;
};

type EventDb = {
  session_id: string;
  slide_id: string;
  slide_label: string;
  kind: string;
  ms: number;
};

function buildSlides(events: EventDb[]): SlideStat[] {
  const map = new Map<string, SlideStat>();
  for (const event of events) {
    const current = map.get(event.slide_id) ?? {
      slideId: event.slide_id,
      slideLabel: event.slide_label,
      views: 0,
      ms: 0,
    };
    if (event.kind === "view" || event.kind === "click") current.views += 1;
    current.ms += Number(event.ms) || 0;
    if (event.slide_label) current.slideLabel = event.slide_label;
    map.set(event.slide_id, current);
  }
  return [...map.values()].sort((a, b) => b.ms - a.ms || b.views - a.views);
}

export async function sessionsForIds(sessionIds: string[], visitorIds: string[]) {
  const sql = await getSql();
  const sessions = await sql<SessionDb>`select * from sessions order by last_seen desc`;
  const events = await sql<EventDb>`
    select session_id, slide_id, slide_label, kind, ms from slide_events
  `;
  const bySession = new Map<string, EventDb[]>();
  for (const event of events) {
    const list = bySession.get(event.session_id) ?? [];
    list.push(event);
    bySession.set(event.session_id, list);
  }

  const wanted = new Set([...sessionIds, ...visitorIds]);
  return sessions
    .filter((row) => wanted.has(row.id) || wanted.has(row.visitor_id))
    .map((row) => {
      const slides = buildSlides(bySession.get(row.id) ?? []);
      return {
        id: row.id,
        visitorId: row.visitor_id,
        leadId: row.lead_id,
        channel: row.channel || "Direct",
        landing: row.landing || "",
        referrer: row.referrer || "",
        utmSource: row.utm_source || "",
        utmMedium: row.utm_medium || "",
        utmCampaign: row.utm_campaign || "",
        startedAt: asIso(row.started_at),
        lastSeen: asIso(row.last_seen),
        slides,
        hottestSlide: slides[0]?.slideLabel || "",
      } satisfies SessionRow;
    });
}

export async function listSessions(limit = 80): Promise<SessionRow[]> {
  const sql = await getSql();
  const sessions = await sql<SessionDb>`
    select * from sessions order by last_seen desc limit ${limit}
  `;
  const events = await sql<EventDb>`
    select session_id, slide_id, slide_label, kind, ms from slide_events
  `;
  const bySession = new Map<string, EventDb[]>();
  for (const event of events) {
    const list = bySession.get(event.session_id) ?? [];
    list.push(event);
    bySession.set(event.session_id, list);
  }
  return sessions.map((row) => {
    const slides = buildSlides(bySession.get(row.id) ?? []);
    return {
      id: row.id,
      visitorId: row.visitor_id,
      leadId: row.lead_id,
      channel: row.channel || "Direct",
      landing: row.landing || "",
      referrer: row.referrer || "",
      utmSource: row.utm_source || "",
      utmMedium: row.utm_medium || "",
      utmCampaign: row.utm_campaign || "",
      startedAt: asIso(row.started_at),
      lastSeen: asIso(row.last_seen),
      slides,
      hottestSlide: slides[0]?.slideLabel || "",
    };
  });
}

export async function slideHeat() {
  const sql = await getSql();
  const rows = await sql<{
    slide_id: string;
    slide_label: string;
    views: number;
    ms: number;
  }>`
    select
      slide_id,
      max(slide_label) as slide_label,
      sum(case when kind in ('view', 'click') then 1 else 0 end)::int as views,
      sum(ms)::int as ms
    from slide_events
    group by slide_id
    order by ms desc, views desc
  `;
  return rows.map((row) => ({
    slideId: row.slide_id,
    slideLabel: row.slide_label,
    views: Number(row.views) || 0,
    ms: Number(row.ms) || 0,
  }));
}

export async function channelBreakdown() {
  const sql = await getSql();
  const rows = await sql<{ channel: string; n: number }>`
    select coalesce(nullif(channel, ''), 'Direct') as channel, count(*)::int as n
    from sessions
    group by 1
    order by n desc
  `;
  return rows.map((row) => ({ channel: row.channel, count: Number(row.n) || 0 }));
}
