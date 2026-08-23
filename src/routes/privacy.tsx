import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useLocale();
  return <LegalPage title={t.legal.privacy} />;
}
