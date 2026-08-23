export const LEAD_STAGES = [
  "new",
  "first_touch",
  "qualified",
  "follow_up",
  "won",
  "lost",
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];

export type LeadFollowUp = {
  id: string;
  leadId: string;
  step: number;
  title: string;
  channel: string;
  dueAt: string;
  doneAt: string | null;
};

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  company: string;
  goals: string;
  source: string;
  stage: LeadStage;
  createdAt: string;
  updatedAt: string;
  followUps: LeadFollowUp[];
  sessionId?: string;
  visitorId?: string;
  channel?: string;
  landing?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  packageName?: string;
  hottestSlide?: string;
  slides?: { slideId: string; slideLabel: string; views: number; ms: number }[];
};

export type LeadInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  company: string;
  goals: string;
  source?: string;
  sessionId?: string;
  visitorId?: string;
  channel?: string;
  landing?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  packageName?: string;
};

export const STAGE_LABEL: Record<LeadStage, { en: string; ru: string }> = {
  new: { en: "New", ru: "Новый" },
  first_touch: { en: "First touch", ru: "Первый контакт" },
  qualified: { en: "Qualified", ru: "Квалифицирован" },
  follow_up: { en: "Follow-up", ru: "Дожим" },
  won: { en: "Won", ru: "Сделка" },
  lost: { en: "Lost", ru: "Отказ" },
};

export function sourceLabel(source: string) {
  if (source === "pricing-base") return "Rhino Base";
  if (source === "pricing-pro") return "Rhino Pro";
  if (source === "pricing-ultimate") return "Ultimate";
  return source || "Site";
}
