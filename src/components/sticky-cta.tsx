import { estimatorUrl } from "@/lib/estimator";
import { useLocale } from "@/lib/i18n";

export function StickyCta() {
  const { t, locale } = useLocale();
  const appUrl = estimatorUrl(locale);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg-elevated/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-track="try-estimator"
        data-track-label="Sticky try estimator"
        className="flex h-12 items-center justify-center rounded-full bg-fg text-sm font-semibold text-white"
      >
        {t.nav.tryEstimator}
      </a>
    </div>
  );
}
