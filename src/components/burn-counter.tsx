import { useEffect, useRef, useState } from "react";

function money(n: number) {
  return `$${new Intl.NumberFormat("en-US").format(Math.round(n))}`;
}

export function BurnCounter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        const from = Math.round(to * 0.15);
        setValue(from);
        const duration = 1700;
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          const eased = 1 - (1 - t) ** 3;
          setValue(from + (to - from) * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setValue(to);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <p
      ref={ref}
      className="font-mono text-3xl font-bold tracking-tight text-danger sm:text-4xl"
    >
      {prefix}
      {money(value)}
      {suffix}
    </p>
  );
}
