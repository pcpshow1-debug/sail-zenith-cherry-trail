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
        let pin = "";
        try {
          const body = (await request.json()) as { pin?: unknown };
          pin = String(body.pin ?? "");
        } catch {
          pin = "";
        }
        if (!verifyCrmPin(pin)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const headers = new Headers();
        setCrmGateCookie(headers);
        return Response.json({ ok: true }, { headers });
      },
    },
  },
});
