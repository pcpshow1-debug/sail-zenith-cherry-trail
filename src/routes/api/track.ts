import { createFileRoute } from "@tanstack/react-router";
import { ingestTrack, type IncomingEvent } from "@/lib/tracking.server";

export const Route = createFileRoute("/api/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const events = Array.isArray(body.events)
            ? (body.events as IncomingEvent[])
            : [];
          await ingestTrack({
            visitorId: String(body.visitorId ?? ""),
            sessionId: String(body.sessionId ?? ""),
            channel: String(body.channel ?? ""),
            landing: String(body.landing ?? ""),
            referrer: String(body.referrer ?? ""),
            utmSource: String(body.utmSource ?? ""),
            utmMedium: String(body.utmMedium ?? ""),
            utmCampaign: String(body.utmCampaign ?? ""),
            utmContent: String(body.utmContent ?? ""),
            events,
          });
          return Response.json({ ok: true });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "track failed";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});
