import { AssetFrame } from "@/components/asset-frame";
import { useLocale } from "@/lib/i18n";

export function StoryHero() {
  const { t } = useLocale();

  return (
    <section
      className="relative overflow-hidden bg-[#ececee] px-4 pb-4 pt-8 sm:px-6"
      data-slide="hero"
      data-slide-label="Sarah estimator"
    >
      <div className="relative mx-auto flex max-w-lg flex-col items-center">
        <AssetFrame
          src="/rhino/sarah-estimate.mp4?v=2"
          poster="/rhino/sarah-estimate.jpg?v=2"
          alt={t.story.she}
          className="w-full overflow-hidden rounded-[28px] border-0 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]"
        />
      </div>
    </section>
  );
}

export function NewLeadBeat() {
  const { t } = useLocale();
  return (
    <>
      <p
        className="bg-[#ececee] px-4 py-8 text-center text-3xl font-extrabold tracking-tight text-fg sm:text-4xl"
        data-slide="bridge"
        data-slide-label="Then his phone"
      >
        {t.story.bridge}
      </p>
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
    </>
  );
}
