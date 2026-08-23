import { useEffect } from "react";
import { startSlideWatcher, trackNow } from "@/lib/tracking";

export function SiteTracker() {
  useEffect(() => startSlideWatcher(), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const hit = target?.closest<HTMLElement>("[data-track]");
      if (!hit) return;
      trackNow({
        slideId: hit.dataset.track || "click",
        slideLabel: hit.dataset.trackLabel || hit.dataset.track || "click",
        kind: "click",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
