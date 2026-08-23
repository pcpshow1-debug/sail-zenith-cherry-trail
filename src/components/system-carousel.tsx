import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";

function Diagram({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mx-auto flex h-full max-w-[220px] flex-col justify-center rounded-[1.8rem] border-[6px] border-fg bg-white p-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-wide text-muted">Estimate</p>
        <p className="mt-3 text-3xl font-extrabold text-fg">$12,400</p>
        <p className="mt-1 text-xs text-muted">Cedar fence · 180 ft</p>
        <div className="mt-5 rounded-full bg-accent py-2 text-center text-xs font-bold text-white">
          Send to owner
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="mx-auto flex h-full items-center justify-center">
        <div className="relative grid size-40 place-items-center rounded-full border-4 border-accent">
          <span className="text-4xl font-extrabold text-fg">60s</span>
          <span className="absolute -bottom-2 rounded-full bg-danger px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            first
          </span>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="mx-auto w-full max-w-xs space-y-2 rounded-2xl border border-border bg-white p-4 text-left shadow-sm">
        {[
          ["Name", "Marcus Hale"],
          ["Phone", "(425) 555-0144"],
          ["Job", "Cedar fence · 180 ft"],
          ["Source", "Estimator"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-border/70 py-1.5 last:border-0">
            <span className="text-xs font-bold uppercase text-muted">{k}</span>
            <span className="text-sm font-semibold text-fg">{v}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-xs space-y-2">
      {["Price sent", "Day 2 reminder", "Day 5 last ping"].map((line, i) => (
        <div
          key={line}
          className="rounded-2xl border border-border bg-white px-4 py-3 text-left shadow-sm"
          style={{ marginLeft: i * 12 }}
        >
          <p className="text-sm font-semibold text-fg">{line}</p>
          <p className="text-xs text-muted">SMS · auto</p>
        </div>
      ))}
    </div>
  );
}

export function SystemCarousel({
  appUrl,
  onTalk,
}: {
  appUrl: string;
  onTalk: () => void;
}) {
  const { t } = useLocale();
  const slides = t.stories.slides;
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);

  const go = (n: number) => setI((n + slides.length) % slides.length);
  const slide = slides[i];

  const href = i === 1 ? "/#how" : i === 2 ? "/#crm" : i === 3 ? undefined : appUrl;

  return (
    <section
      className="section-pad section-y"
      data-slide="stories"
      data-slide-label="The system"
    >
      <div className="container-site mx-auto max-w-3xl">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-accent">
          {t.stories.kicker}
        </p>
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-border sm:inline-flex"
            aria-label={t.stories.prev}
            onClick={() => go(i - 1)}
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {slides.map((s, idx) => (
              <button
                key={s.tab}
                type="button"
                onClick={() => setI(idx)}
                className={`shrink-0 border-b-2 px-3 py-2 text-xs font-bold uppercase tracking-wide ${
                  idx === i
                    ? "border-fg text-fg"
                    : "border-transparent text-muted"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-border sm:inline-flex"
            aria-label={t.stories.next}
            onClick={() => go(i + 1)}
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div
          className="mt-4 overflow-hidden rounded-[1.6rem] border border-border bg-white"
          onTouchStart={(e) => {
            startX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (startX.current == null) return;
            const dx = (e.changedTouches[0]?.clientX ?? startX.current) - startX.current;
            if (dx > 40) go(i - 1);
            if (dx < -40) go(i + 1);
            startX.current = null;
          }}
        >
          <div className="min-h-[260px] px-5 py-8 sm:min-h-[300px]">
            <Diagram index={i} />
          </div>
          <div className="space-y-3 border-t border-border bg-[#f4f5f7] px-6 py-7 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
              {slide.title}
            </h2>
            <p className="text-base text-muted">{slide.body}</p>
            {href ? (
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white"
              >
                {slide.cta}
              </a>
            ) : (
              <button
                type="button"
                onClick={onTalk}
                className="inline-flex h-12 items-center justify-center rounded-full bg-fg px-6 text-sm font-semibold text-white"
              >
                {slide.cta}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
