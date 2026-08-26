import { ArrowRight } from "lucide-react";
import { AssetFrame } from "@/components/asset-frame";
import { useLocale } from "@/lib/i18n";
import { estimatorUrl } from "@/lib/estimator";

export function StoryHero() {
  const { t, locale } = useLocale();
  const appUrl = estimatorUrl(locale);

  return (
    <section
      className="relative overflow-hidden bg-[#ececee] px-4 pb-10 pt-6 sm:px-6 sm:pb-14"
      data-slide="hero"
      data-slide-label="Sarah estimator"
    >
      <div className="relative mx-auto flex max-w-lg flex-col items-center">
        <AssetFrame
          src="/rhino/sarah-estimate.mp4?v=1"
          poster="/rhino/sarah-estimate.jpg?v=1"
          alt={t.story.she}
          priority
          className="w-full max-w-[380px] overflow-hidden rounded-[28px] border-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]"
        />
        <p className="mt-5 text-center text-sm font-semibold text-fg">{t.story.she}</p>
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="try-estimator"
          data-track-label="Hero Sarah estimator"
          className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-bold text-white hover:bg-[#ff814f]"
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
      className="section-pad section-y bg-[#ececee]"
      data-slide="new-lead"
      data-slide-label="Sarah lead"
    >
      <div className="container-site mx-auto flex max-w-lg flex-col items-center gap-5">
        <p className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-accent">
          {t.story.heKicker}
        </p>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {t.story.heTitle}
        </h2>
        <AssetFrame
          src="/rhino/sarah-lead.mp4?v=1"
          poster="/rhino/sarah-lead.jpg?v=1"
          alt={t.story.heLine}
          className="w-full max-w-[380px] overflow-hidden rounded-[28px] border-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]"
        />
        <p className="text-center text-lg font-semibold text-fg">{t.story.heLine}</p>
      </div>
    </section>
  );
}
