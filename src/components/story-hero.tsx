import { ArrowRight } from "lucide-react";
import { AssetFrame } from "@/components/asset-frame";
import { useLocale } from "@/lib/i18n";
import { estimatorUrl } from "@/lib/estimator";

export function StoryHero() {
  const { t, locale } = useLocale();
  const appUrl = estimatorUrl(locale);

  return (
    <section
      className="relative overflow-hidden bg-[#ececee] px-4 pb-8 pt-6 sm:px-6"
      data-slide="hero"
      data-slide-label="Sarah estimator"
    >
      <div className="relative mx-auto flex max-w-lg flex-col items-center">
        <AssetFrame
          src="/rhino/sarah-estimate.mp4?v=2"
          poster="/rhino/sarah-estimate.jpg?v=2"
          alt={t.story.she}
          priority
          className="w-full overflow-hidden rounded-[28px] border-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]"
        />
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="try-estimator"
          data-track-label="Hero Sarah estimator"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-bold text-white hover:bg-[#ff814f]"
        >
          {t.story.cta}
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}

export function NewLeadBeat() {
  const { t } = useLocale();
  return (
    <section
      className="bg-[#ececee] px-4 pb-12 pt-2 sm:px-6"
      data-slide="new-lead"
      data-slide-label="Sarah lead"
    >
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <AssetFrame
          src="/rhino/sarah-lead.mp4?v=1"
          poster="/rhino/sarah-lead.jpg?v=1"
          alt={t.story.heLine}
          className="w-full overflow-hidden rounded-[28px] border-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]"
        />
      </div>
    </section>
  );
}
