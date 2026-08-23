import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const FRAMES = [
  { src: "/rhino/how/01.jpg", hold: 1300 },
  { src: "/rhino/how/02.jpg", hold: 1100 },
  { src: "/rhino/how/03.jpg", hold: 1100 },
  { src: "/rhino/how/04.jpg", hold: 1400 },
  { src: "/rhino/how/05.jpg", hold: 1200 },
  { src: "/rhino/how/06.jpg", hold: 1200 },
  { src: "/rhino/how/07.jpg", hold: 1400 },
  { src: "/rhino/how/08.jpg", hold: 1400 },
  { src: "/rhino/how/09.jpg", hold: 1600 },
] as const;

export function HowEstimatorFlip({
  alt,
  className,
}: {
  alt: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!live) return;
    FRAMES.forEach((frame) => {
      const img = new Image();
      img.src = frame.src;
    });
  }, [live]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = window.setTimeout(() => {
      setI((n) => (n + 1) % FRAMES.length);
    }, FRAMES[i].hold);
    return () => window.clearTimeout(id);
  }, [i, live]);

  return (
    <figure
      ref={rootRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm",
        className,
      )}
    >
      <div className="relative aspect-[720/1258] w-full bg-[#f4f6fb]">
        {FRAMES.map((frame, idx) => (
          <img
            key={frame.src}
            src={frame.src}
            alt={idx === i ? alt : ""}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            decoding="async"
            draggable={false}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex gap-1">
        {FRAMES.map((frame, idx) => (
          <span
            key={frame.src}
            className={`h-1 flex-1 rounded-full ${
              idx === i ? "bg-accent" : "bg-black/15"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}
