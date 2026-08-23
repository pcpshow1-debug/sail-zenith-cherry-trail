import { getSql } from "@/lib/db";
import {
  LEAD_STAGES,
  type Lead,
  type LeadFollowUp,
  type LeadInput,
  type LeadStage,
} from "@/lib/leads";
import { attachSessionToLead, sessionsForIds } from "@/lib/tracking.server";

type LeadRow = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  company: string;
  goals: string;
  source: string;
  stage: string;
  created_at: string | Date;
  updated_at: string | Date;
  visitor_id?: string | null;
  session_id?: string | null;
  channel?: string | null;
  landing?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  package?: string | null;
};

type FollowRow = {
  id: string;
  lead_id: string;
  step: number;
  title: string;
  channel: string;
  due_at: string | Date;
  done_at: string | Date | null;
};

function iso(value: string | Date | null | undefined) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function mapFollow(row: FollowRow): LeadFollowUp {
  return {
    id: row.id,
    leadId: row.lead_id,
    step: Number(row.step),
    title: row.title,
    channel: row.channel,
    dueAt: iso(row.due_at),
    doneAt: row.done_at ? iso(row.done_at) : null,
  };
}

function packageFromSource(source: string, explicit?: string) {
  if (explicit) return explicit;
  if (source === "pricing-base") return "Rhino Base";
  if (source === "pricing-pro") return "Rhino Pro";
  if (source === "pricing-ultimate") return "Ultimate Lead Generator";
  return "";
}

function mapLead(
  row: LeadRow,
  followUps: LeadFollowUp[],
  extra?: Partial<Lead>,
): Lead {
  const stage = LEAD_STAGES.includes(row.stage as LeadStage)
    ? (row.stage as LeadStage)
    : "new";
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    state: row.state,
    country: row.country,
    company: row.company,
    goals: row.goals,
    source: row.source,
    stage,
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
    followUps,
    sessionId: extra?.sessionId || row.session_id || "",
    visitorId: extra?.visitorId || row.visitor_id || "",
    channel: extra?.channel || row.channel || "",
    landing: extra?.landing || row.landing || "",
    referrer: extra?.referrer || row.referrer || "",
    utmSource: extra?.utmSource || row.utm_source || "",
    utmMedium: extra?.utmMedium || row.utm_medium || "",
    utmCampaign: extra?.utmCampaign || row.utm_campaign || "",
    packageName:
      extra?.packageName ||
      row.package ||
      packageFromSource(row.source),
    hottestSlide: extra?.hottestSlide || "",
    slides: extra?.slides || [],
  };
}

function required(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : "";
}

const SEQUENCE: { step: number; hours: number; title: string; channel: string }[] =
  [
    {
      step: 1,
      hours: 0,
      title: "First touch — call or SMS now",
      channel: "sms",
    },
    {
      step: 2,
      hours: 24,
      title: "Follow-up #1 — check-in SMS",
      channel: "sms",
    },
    {
      step: 3,
      hours: 72,
      title: "Follow-up #2 — value reminder",
      channel: "sms",
    },
    {
      step: 4,
      hours: 120,
      title: "Follow-up #3 — last touch",
      channel: "sms",
    },
  ];

export async function createLead(raw: LeadInput): Promise<Lead> {
  const input: LeadInput = {
    firstName: required(raw.firstName),
    lastName: required(raw.lastName),
    phone: required(raw.phone),
    email: required(raw.email),
    city: required(raw.city),
    state: required(raw.state),
    country: required(raw.country),
    company: required(raw.company),
    goals: required(raw.goals),
    source: required(raw.source) || "site",
    sessionId: required(raw.sessionId),
    visitorId: required(raw.visitorId),
    channel: required(raw.channel),
    landing: required(raw.landing),
    referrer: required(raw.referrer),
    utmSource: required(raw.utmSource),
    utmMedium: required(raw.utmMedium),
    utmCampaign: required(raw.utmCampaign),
    packageName: required(raw.packageName) || packageFromSource(raw.source || ""),
  };

  if (
    !input.firstName ||
    !input.lastName ||
    !input.phone ||
    !input.email ||
    !input.company
  ) {
    throw new Error("Missing required lead fields");
  }

  const sql = await getSql();
  const id = crypto.randomUUID();
  const now = new Date();

  await sql`
    insert into leads (
      id, first_name, last_name, phone, email, city, state, country,
      company, goals, source, stage, created_at, updated_at,
      visitor_id, session_id, channel, landing, referrer,
      utm_source, utm_medium, utm_campaign, package
    ) values (
      ${id}, ${input.firstName}, ${input.lastName}, ${input.phone}, ${input.email},
      ${input.city}, ${input.state}, ${input.country}, ${input.company},
      ${input.goals}, ${input.source}, ${"new"}, ${now.toISOString()}, ${now.toISOString()},
      ${input.visitorId || ""}, ${input.sessionId || ""}, ${input.channel || ""},
      ${input.landing || ""}, ${input.referrer || ""}, ${input.utmSource || ""},
      ${input.utmMedium || ""}, ${input.utmCampaign || ""}, ${input.packageName || ""}
    )
  `;

  if (input.sessionId) {
    await attachSessionToLead(input.sessionId, id);
  }

  const followUps: LeadFollowUp[] = [];
  for (const item of SEQUENCE) {
    const fid = crypto.randomUUID();
    const due = new Date(now.getTime() + item.hours * 60 * 60 * 1000);
    await sql`
      insert into lead_followups (
        id, lead_id, step, title, channel, due_at, created_at
      ) values (
        ${fid}, ${id}, ${item.step}, ${item.title}, ${item.channel},
        ${due.toISOString()}, ${now.toISOString()}
      )
    `;
    followUps.push({
      id: fid,
      leadId: id,
      step: item.step,
      title: item.title,
      channel: item.channel,
      dueAt: due.toISOString(),
      doneAt: null,
    });
  }

  return {
    id,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    email: input.email,
    city: input.city,
    state: input.state,
    country: input.country,
    company: input.company,
    goals: input.goals,
    source: input.source || "site",
    stage: "new",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    followUps,
    sessionId: input.sessionId || "",
    visitorId: input.visitorId || "",
    channel: input.channel || "",
    landing: input.landing || "",
    referrer: input.referrer || "",
    utmSource: input.utmSource || "",
    utmMedium: input.utmMedium || "",
    utmCampaign: input.utmCampaign || "",
    packageName: input.packageName || "",
    hottestSlide: "",
    slides: [],
  };
}

export async function listLeads(): Promise<Lead[]> {
  const sql = await getSql();
  const rows = await sql<LeadRow>`
    select * from leads order by created_at desc
  `;
  if (rows.length === 0) return [];

  const follows = await sql<FollowRow>`
    select * from lead_followups order by step asc
  `;
  const byLead = new Map<string, LeadFollowUp[]>();
  for (const row of follows) {
    const list = byLead.get(row.lead_id) ?? [];
    list.push(mapFollow(row));
    byLead.set(row.lead_id, list);
  }

  const journeys = await sessionsForIds(
    rows.map((row) => row.session_id || "").filter(Boolean),
    rows.map((row) => row.visitor_id || "").filter(Boolean),
  );

  return rows.map((row) => {
    const journey =
      journeys.find((item) => item.id === row.session_id) ||
      journeys.find((item) => item.visitorId === row.visitor_id);
    return mapLead(row, byLead.get(row.id) ?? [], {
      channel: row.channel || journey?.channel || "",
      landing: row.landing || journey?.landing || "",
      referrer: row.referrer || journey?.referrer || "",
      utmSource: row.utm_source || journey?.utmSource || "",
      hottestSlide: journey?.hottestSlide || "",
      slides: journey?.slides || [],
    });
  });
}

export async function updateLeadStage(id: string, stage: LeadStage) {
  if (!LEAD_STAGES.includes(stage)) throw new Error("Invalid stage");
  const sql = await getSql();
  await sql`
    update leads
    set stage = ${stage}, updated_at = ${new Date().toISOString()}
    where id = ${id}
  `;
}

export async function completeFollowUp(id: string) {
  const sql = await getSql();
  const now = new Date().toISOString();
  await sql`
    update lead_followups
    set done_at = ${now}
    where id = ${id} and done_at is null
  `;
  const rows = await sql<{ lead_id: string; step: number }>`
    select lead_id, step from lead_followups where id = ${id}
  `;
  const row = rows[0];
  if (!row) return;
  if (row.step === 1) {
    await sql`
      update leads
      set stage = ${"first_touch"}, updated_at = ${now}
      where id = ${row.lead_id} and stage = ${"new"}
    `;
  } else {
    await sql`
      update leads
      set stage = ${"follow_up"}, updated_at = ${now}
      where id = ${row.lead_id} and stage not in (${"won"}, ${"lost"})
    `;
  }
}
