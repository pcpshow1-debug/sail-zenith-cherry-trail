const VISITOR_KEY = "rhino-vid";
const SESSION_KEY = "rhino-sid";

export type TrackEvent = {
  slideId: string;
  slideLabel: string;
  kind: "view" | "time" | "click";
  ms?: number;
};

export type Attribution = {
  visitorId: string;
  sessionId: string;
  channel: string;
  landing: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
};

export type SlideStat = {
  slideId: string;
  slideLabel: string;
  views: number;
  ms: number;
};

export type SessionRow = {
  id: string;
  visitorId: string;
  leadId: string | null;
  channel: string;
  landing: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  startedAt: string;
  lastSeen: string;
  slides: SlideStat[];
  hottestSlide: string;
};

function uid() {
  return crypto.randomUUID();
}

export function detectChannel(referrer: string, utmSource: string) {
  const src = (utmSource || "").toLowerCase();
  if (src) {
    if (src.includes("ig") || src.includes("insta")) return "Instagram";
    if (src.includes("fb") || src.includes("facebook")) return "Facebook";
    if (src.includes("tiktok") || src === "tt") return "TikTok";
    if (src.includes("youtube") || src === "yt") return "YouTube";
    if (src.includes("google")) return "Google";
    if (src.includes("thumb")) return "Thumbtack";
    if (src.includes("yelp")) return "Yelp";
    if (src === "x" || src.includes("twitter")) return "X";
    return utmSource;
  }
  let host = "";
  try {
    host = referrer ? new URL(referrer).hostname.replace(/^www\./, "") : "";
  } catch {
    host = "";
  }
  if (!host) return "Direct";
  if (host.includes("instagram")) return "Instagram";
  if (host.includes("facebook") || host === "fb.com" || host === "m.facebook.com")
    return "Facebook";
  if (host.includes("tiktok")) return "TikTok";
  if (host.includes("youtube") || host === "youtu.be") return "YouTube";
  if (host.includes("google")) return "Google";
  if (host.includes("thumbtack")) return "Thumbtack";
  if (host.includes("yelp")) return "Yelp";
  if (host === "t.co" || host.includes("twitter") || host === "x.com") return "X";
  return host;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return {
      visitorId: "",
      sessionId: "",
      channel: "Direct",
      landing: "",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
    };
  }
  let visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) {
    visitorId = uid();
    localStorage.setItem(VISITOR_KEY, visitorId);
  }
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = uid();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "";
  const referrer = document.referrer || "";
  return {
    visitorId,
    sessionId,
    channel: detectChannel(referrer, utmSource),
    landing: window.location.href,
    referrer,
    utmSource,
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
  };
}

const queue: TrackEvent[] = [];
let flushTimer: number | null = null;

function flush() {
  if (queue.length === 0 || typeof window === "undefined") return;
  const events = queue.splice(0, queue.length);
  const body = JSON.stringify({ ...getAttribution(), events });
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/track", blob)) return;
    }
  } catch {
    /* fall through */
  }
  void fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function track(event: TrackEvent) {
  queue.push({ ...event, ms: event.ms ?? 0 });
  if (flushTimer) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = null;
    flush();
  }, 2500);
}

export function trackNow(event: TrackEvent) {
  queue.push({ ...event, ms: event.ms ?? 0 });
  flush();
}

export function startSlideWatcher() {
  if (typeof window === "undefined") return () => {};
  getAttribution();
  const started = new Map<string, number>();
  const labels = new Map<string, string>();

  const io = new IntersectionObserver(
    (entries) => {
      const now = Date.now();
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const id = el.dataset.slide;
        if (!id) continue;
        const label = el.dataset.slideLabel || el.getAttribute("aria-label") || id;
        labels.set(id, label);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!started.has(id)) {
            started.set(id, now);
            track({ slideId: id, slideLabel: label, kind: "view" });
          }
        } else if (started.has(id)) {
          const ms = now - (started.get(id) || now);
          started.delete(id);
          if (ms > 400) {
            track({ slideId: id, slideLabel: label, kind: "time", ms });
          }
        }
      }
    },
    { threshold: [0.35, 0.6] },
  );

  document.querySelectorAll<HTMLElement>("[data-slide]").forEach((el) => {
    io.observe(el);
  });

  const dumpOpen = () => {
    const now = Date.now();
    for (const [id, start] of started) {
      const ms = now - start;
      if (ms > 400) {
        track({
          slideId: id,
          slideLabel: labels.get(id) || id,
          kind: "time",
          ms,
        });
      }
      started.set(id, now);
    }
    flush();
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) dumpOpen();
  });
  window.addEventListener("pagehide", dumpOpen);

  return () => {
    dumpOpen();
    io.disconnect();
  };
}
