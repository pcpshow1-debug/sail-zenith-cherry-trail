import { createFileRoute } from "@tanstack/react-router";
import { listLeads } from "@/lib/leads.server";
import {
  channelBreakdown,
  listSessions,
  slideHeat,
} from "@/lib/tracking.server";

export const Route = createFileRoute("/api/crm")({
  server: {
    handlers: {
      GET: async () => {
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
    },
  },
});
