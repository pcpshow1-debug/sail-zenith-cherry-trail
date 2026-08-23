import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { title: string; body: string };

export function OldWayPulse({ items }: { items: Item[] }) {
  const root = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReady(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [ready, items.length]);

  return (
    <ul ref={root} className="space-y-3">
      {items.map((item, i) => (
        <li
          key={item.title}
          style={{ animationDelay: `${i * 140}ms` }}
          className={cn(
            "old-way-card rounded-2xl border border-border bg-bg-elevated px-5 py-4",
            ready && "old-way-card-in",
            ready && i === active && "old-way-card-lit",
          )}
        >
          <p className="text-lg font-bold text-fg sm:text-xl">{item.title}</p>
          <p className="mt-1 text-base font-medium text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
