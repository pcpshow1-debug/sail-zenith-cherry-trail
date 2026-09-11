import { createFileRoute } from "@tanstack/react-router";
import { listLeads } from "@/lib/leads.server";
import {
  channelBreakdown,
  listSessions,
  slideHeat,
} from "@/lib/tracking.server";
import {
  crmGateDenied,
  setCrmGateCookie,
  verifyCrmPin,
} from "@/lib/crm-gate.server";

/** Failed unlock attempts by client key — in-memory, best-effort per instance. */
const failedUnlocks = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 8;

function clientKey(request: Request): string {
  const xf = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return xf || request.headers.get("x-real-ip") || "unknown";
}

function unlockBlocked(request: Request): Response | null {
  const key = clientKey(request);
  const now = Date.now();
  const row = failedUnlocks.get(key);
  if (!row) return null;
  if (now > row.resetAt) {
    failedUnlocks.delete(key);
    return null;
  }
  if (row.count >= MAX_FAILS) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }
  return null;
}

function recordUnlockFail(request: Request): void {
  const key = clientKey(request);
  const now = Date.now();
  const row = failedUnlocks.get(key);
  if (!row || now > row.resetAt) {
    failedUnlocks.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  row.count += 1;
}

function clearUnlockFails(request: Request): void {
  failedUnlocks.delete(clientKey(request));
}

export const Route = createFileRoute("/api/crm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const denied = crmGateDenied(request);
        if (denied) return denied;
        const [leads, sessions, slides, channels] = await Promise.all([
          listLeads(),
          listSessions(100),
          slideHeat(),
          channelBreakdown(),
        ]);
        return Response.json({
          leads,
          sessions,
          slides,
          channels,
          stats: {
            visitors: new Set(sessions.map((item) => item.visitorId)).size,
            sessions: sessions.length,
            leads: leads.length,
          },
        });
      },
      POST: async ({ request }) => {
        const blocked = unlockBlocked(request);
        if (blocked) return blocked;

        let pin = "";
        try {
          const body = (await request.json()) as { pin?: unknown };
          pin = String(body.pin ?? "");
        } catch {
          pin = "";
        }
        if (!verifyCrmPin(pin)) {
          recordUnlockFail(request);
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        clearUnlockFails(request);
        const headers = new Headers();
        setCrmGateCookie(headers);
        return Response.json({ ok: true }, { headers });
      },
    },
  },
});
