import { createFileRoute } from "@tanstack/react-router";
import {
  completeFollowUp,
  createLead,
  listLeads,
  updateLeadStage,
} from "@/lib/leads.server";
import { LEAD_STAGES, type LeadStage } from "@/lib/leads";
import { crmGateDenied } from "@/lib/crm-gate.server";

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const denied = crmGateDenied(request);
        if (denied) return denied;
        const leads = await listLeads();
        return Response.json({ leads });
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as Record<string, unknown>;
          const lead = await createLead({
            firstName: String(body.firstName ?? ""),
            lastName: String(body.lastName ?? ""),
            phone: String(body.phone ?? ""),
            email: String(body.email ?? ""),
            city: String(body.city ?? ""),
            state: String(body.state ?? ""),
            country: String(body.country ?? ""),
            company: String(body.company ?? ""),
            goals: String(body.goals ?? ""),
            source: String(body.source ?? "site"),
            sessionId: String(body.sessionId ?? ""),
            visitorId: String(body.visitorId ?? ""),
            channel: String(body.channel ?? ""),
            landing: String(body.landing ?? ""),
            referrer: String(body.referrer ?? ""),
            utmSource: String(body.utmSource ?? ""),
            utmMedium: String(body.utmMedium ?? ""),
            utmCampaign: String(body.utmCampaign ?? ""),
            packageName: String(body.packageName ?? ""),
          });
          return Response.json({ lead }, { status: 201 });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Could not save lead";
          return Response.json({ error: message }, { status: 400 });
        }
      },
      PATCH: async ({ request }) => {
        const denied = crmGateDenied(request);
        if (denied) return denied;
        try {
          const body = (await request.json()) as {
            leadId?: string;
            stage?: string;
            followUpId?: string;
          };
          if (body.followUpId) {
            await completeFollowUp(body.followUpId);
          }
          if (body.leadId && body.stage) {
            if (!LEAD_STAGES.includes(body.stage as LeadStage)) {
              return Response.json({ error: "Invalid stage" }, { status: 400 });
            }
            await updateLeadStage(body.leadId, body.stage as LeadStage);
          }
          const leads = await listLeads();
          return Response.json({ ok: true, leads });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Update failed";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});
