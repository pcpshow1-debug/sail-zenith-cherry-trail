import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  const { t } = useLocale();
  return <LegalPage title={t.legal.terms} />;
}
