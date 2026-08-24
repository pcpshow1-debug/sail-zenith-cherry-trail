import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { estimatorUrl } from "@/lib/estimator";

const HER_SHOTS = [
  { src: "/storyboard/1.jpg", line: "She picks up the phone." },
  { src: "/storyboard/2.jpg", line: "She chooses you." },
  { src: "/storyboard/3.jpg", line: "She has a price in 60 seconds." },
] as const;

export function StoryHero() {
  const { t, locale } = useLocale();
  const appUrl = estimatorUrl(locale);
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % HER_SHOTS.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const shot = HER_SHOTS[i];

  return (
    <section
      className="relative overflow-hidden bg-[#ececee] px-4 pb-12 pt-6 sm:px-6 sm:pb-16"
      data-slide="hero"
      data-slide-label="Customer phone"
    >
      <div className="relative mx-auto flex max-w-lg flex-col items-center">
        <p className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#ff6b35]">
          {t.race.kicker}
        </p>
        <h1 className="text-center text-[26px] font-extrabold uppercase leading-[1.15] tracking-tight text-fg sm:text-4xl">
          {t.race.title}
          <br />
          <span className="text-[#ff6b35]">{t.race.titleAccent}</span>
        </h1>
        <p className="mt-4 max-w-md text-center text-[15px] leading-snug text-muted sm:text-base">
          {t.race.sub}
        </p>
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="try-estimator"
          data-track-label="Hero live demo"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-bold text-white hover:bg-[#ff814f]"
        >
          {t.race.cta}
          <ArrowRight className="size-4" />
        </a>

        <div className="relative mt-8 w-full max-w-[340px]">
          {HER_SHOTS.map((item, idx) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.line}
              className={`w-full rounded-[28px] object-cover shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)] transition-opacity duration-500 ${
                idx === 0 ? "relative" : "absolute inset-0"
              } ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-semibold text-fg">{shot.line}</p>
        <div className="mt-3 flex gap-2">
          {HER_SHOTS.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              aria-label={item.line}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition ${
                idx === i ? "w-8 bg-[#ff6b35]" : "w-4 bg-black/20"
              }`}
            />
          ))}
        </div>
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
      data-slide-label="New lead"
    >
      <div className="container-site mx-auto flex max-w-lg flex-col items-center gap-6">
        <p className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-accent">
          {t.crmSell.submitted}
        </p>
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {t.crmSell.title}
        </h2>
        <img
          src="/storyboard/4.jpg"
          alt="New lead in CRM"
          className="w-full max-w-[340px] rounded-[28px] object-cover shadow-[0_30px_60px_-24px_rgba(0,0,0,0.45)]"
        />
        <p className="text-center text-lg font-semibold text-fg">{t.crmSell.call}</p>
      </div>
    </section>
  );
}
