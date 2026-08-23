import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

export type MiniClip = {
  src: string;
  poster: string;
  alt: string;
};

type MiniVideoGridProps = {
  clips: MiniClip[];
  className?: string;
};

function MiniVideo({ src, poster, alt }: MiniClip) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tryPlay = () => {
      el.muted = true;
      el.playsInline = true;
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "true");
      el.controls = false;
      el.play()?.catch(() => {});
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            requestAnimationFrame(() => tryPlay());
          }
        }
      },
      { threshold: 0.15, rootMargin: "80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className="relative aspect-[9/16] overflow-hidden bg-black">
      <video
        ref={ref}
        src={active ? src : undefined}
        poster={poster}
        className="rhino-loop-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="none"
        aria-label={alt}
      />
    </div>
  );
}

/** Compact 2×2 phone-style panel — four AI content clips playing together */
export function MiniVideoGrid({ clips, className }: MiniVideoGridProps) {
  const { locale } = useLocale();
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-fg shadow-xl ring-1 ring-black/10",
        className,
      )}
    >
      <div className="flex items-center justify-between bg-fg px-4 py-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
          {locale === "ru" ? "AI-контент" : "AI content"}
        </span>
        <span className="h-1.5 w-12 rounded-full bg-white/20" aria-hidden />
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/10">
        {clips.slice(0, 4).map((clip) => (
          <MiniVideo key={clip.src} {...clip} />
        ))}
      </div>
    </div>
  );
}
