import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

type Slide = {
  id: string;
  kind: "video" | "image";
  src: string;
  poster?: string;
  labelKey: "live" | "content" | "estimator" | "module" | "closeup";
};

const SLIDES: Slide[] = [
  {
    id: "full",
    kind: "video",
    src: "/rhino/system-full.mp4?v=2",
    poster: "/rhino/system-full.jpg?v=2",
    labelKey: "live",
  },
  {
    id: "content",
    kind: "image",
    src: "/rhino/system-content-hi.jpg?v=2",
    labelKey: "content",
  },
  {
    id: "estimator",
    kind: "image",
    src: "/rhino/system-estimator-hi.jpg?v=2",
    labelKey: "estimator",
  },
  {
    id: "module",
    kind: "video",
    src: "/rhino/content-gen-module.mp4?v=1",
    poster: "/rhino/content-gen-module.jpg?v=1",
    labelKey: "module",
  },
  {
    id: "closeup",
    kind: "image",
    src: "/rhino/content-gen-close.jpg?v=1",
    labelKey: "closeup",
  },
];

export function SystemMapViewer() {
  const { t } = useLocale();
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const labels: Record<Slide["labelKey"], string> = {
    live: t.howWorks.live,
    content: t.howWorks.content,
    estimator: t.howWorks.estimator,
    module: t.howWorks.module,
    closeup: t.howWorks.closeup,
  };

  const go = (i: number) => {
    const next = (i + SLIDES.length) % SLIDES.length;
    setIndex(next);
    const el = scroller.current;
    const child = el?.children[next] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      let best = 0;
      let bestDist = Infinity;
      kids.forEach((kid, i) => {
        const d = Math.abs(kid.offsetLeft - el.scrollLeft);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label={t.howWorks.angles}
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === i}
            onClick={() => go(i)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors",
              index === i
                ? "bg-fg text-bg"
                : "border border-border bg-bg text-fg hover:bg-primary-soft",
            )}
          >
            {labels[slide.labelKey]}
          </button>
        ))}
      </div>

      <div className="relative">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-3xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide) => (
            <figure
              key={slide.id}
              className="relative h-[56svh] min-h-[280px] w-[min(100%,92vw)] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-bg sm:h-[64svh] lg:h-[72svh] lg:w-full"
            >
              {slide.kind === "video" ? (
                <video
                  className="h-full w-full object-contain"
                  src={slide.src}
                  poster={slide.poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={labels[slide.labelKey]}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              )}
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-elevated/95 text-fg shadow-sm sm:inline-flex"
          aria-label={t.howWorks.prev}
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-elevated/95 text-fg shadow-sm sm:inline-flex"
          aria-label={t.howWorks.next}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => go(i)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === index ? "w-7 bg-fg" : "w-2.5 bg-border",
            )}
            aria-label={labels[slide.labelKey]}
          />
        ))}
      </div>
      <p className="text-center text-sm text-muted sm:text-base">{t.howWorks.hint}</p>
    </div>
  );
}
