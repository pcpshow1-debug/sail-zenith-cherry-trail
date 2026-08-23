import { useEffect, useRef, useState } from "react";

type ViewsCounterProps = {
  target?: number;
  label?: string;
  className?: string;
};

function formatViews(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

/** Always shows the real count. Count-up is extra, never a broken 0+. */
export function ViewsCounter({
  target = 487_000_000,
  label = "views across just four AI-made videos",
  className,
}: ViewsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        const from = Math.round(target * 0.12);
        setValue(from);
        const duration = 1600;
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          const eased = 1 - (1 - t) ** 3;
          setValue(from + (target - from) * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={className}>
      <p className="font-mono text-5xl font-extrabold tracking-tight text-accent sm:text-6xl md:text-7xl">
        {formatViews(value)}
        <span className="text-accent/70">+</span>
      </p>
      <p className="mt-2 text-sm font-medium text-muted sm:text-base">{label}</p>
    </div>
  );
}
