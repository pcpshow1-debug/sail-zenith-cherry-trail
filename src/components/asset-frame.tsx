import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AssetFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  poster?: string;
};

function isVideo(src: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

function kickPlay(el: HTMLVideoElement) {
  el.defaultMuted = true;
  el.muted = true;
  el.playsInline = true;
  el.controls = false;
  el.setAttribute("playsinline", "");
  el.setAttribute("webkit-playsinline", "true");
  el.setAttribute("x5-playsinline", "true");
  const p = el.play();
  if (p) p.catch(() => {});
}

/** Silent looping clip. Video stays visible and playing so iOS never paints Play. */
export function AssetFrame({
  src,
  alt,
  className,
  imgClassName,
  priority,
  poster,
}: AssetFrameProps) {
  const video = isVideo(src);
  const wrapRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) return;
    const el = videoRef.current;
    const box = wrapRef.current;
    if (!el) return;

    const tryPlay = () => kickPlay(el);

    const io = box
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) tryPlay();
            }
          },
          { threshold: 0.01, rootMargin: "120px 0px" },
        )
      : null;
    if (box && io) io.observe(box);

    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("playing", tryPlay);
    const onPause = () => {
      if (el.ended) return;
      tryPlay();
    };
    el.addEventListener("pause", onPause);

    const unlock = () => tryPlay();
    document.addEventListener("touchstart", unlock, { passive: true });
    document.addEventListener("click", unlock);

    tryPlay();

    return () => {
      io?.disconnect();
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("playing", tryPlay);
      el.removeEventListener("pause", onPause);
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, [video, src, priority]);

  return (
    <figure
      ref={wrapRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-sm",
        className,
      )}
    >
      {video ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={cn("rhino-loop-video block h-auto w-full", imgClassName)}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload={priority ? "auto" : "metadata"}
          aria-label={alt}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn("block h-auto w-full", imgClassName)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </figure>
  );
}
