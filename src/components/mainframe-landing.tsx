import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/mainframe/mascot.mp4";

/** Shown until the clip paints its first frame — it never autoplays. */
const VIDEO_POSTER = "/mainframe/mascot-poster.png";

/** How much of the clip one full-width mouse sweep scrubs through. */
const SENSITIVITY = 0.8;

const NAV_LINKS = ["Labs", "Studio", "Openings", "Shop"] as const;

const TYPED_TEXT = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";

const ACTIONS = [
  "Pitch us an idea",
  "Come work here",
  "Send a brief hello",
  "See how we operate",
] as const;

const EMAIL = "hello@mainframe.co";

/** Reveals `text` one character at a time after `startDelay` ms. */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export function MainframeLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const { displayed, done } = useTypewriter(TYPED_TEXT);

  // The pills land on their own timer — they never wait for the typing to finish.
  useEffect(() => {
    const timeout = setTimeout(() => setActionsVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);
  const lastSeekRef = useRef<number | null>(null);
  const prevXRef = useRef<number | null>(null);
  const unlockedRef = useRef(false);

  /**
   * Seek only while no seek is in flight; `seeked` re-runs this so the pointer's
   * newest target is picked up without flooding the element with seeks.
   */
  const seek = useCallback(() => {
    const video = videoRef.current;
    if (!video || seekingRef.current) return;
    if (!Number.isFinite(video.duration) || video.duration === 0) return;

    const target = targetTimeRef.current;
    // Target has not moved since the last request — nothing left to queue.
    if (lastSeekRef.current !== null && Math.abs(lastSeekRef.current - target) < 0.001) return;
    lastSeekRef.current = target;

    // Assigning the current time fires no `seeked`, which would strand the flag.
    if (Math.abs(video.currentTime - target) < 0.001) return;

    seekingRef.current = true;
    video.currentTime = target;
  }, []);

  const handleSeeked = useCallback(() => {
    seekingRef.current = false;
    seek();
  }, [seek]);

  // The clip never autoplays, so nudge it once to get a first frame painted.
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    targetTimeRef.current = Math.min(0.01, video.duration);
    seek();
  }, [seek]);

  /**
   * iOS refuses to decode a frame until playback has been started from a real
   * gesture, so the first touch starts and immediately stops the muted clip.
   */
  const unlockPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || unlockedRef.current) return;
    unlockedRef.current = true;

    const played = video.play();
    if (played && typeof played.then === "function") {
      played.then(() => video.pause()).catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  useEffect(() => {
    const scrubTo = (clientX: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration === 0) return;

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(Math.max(targetTimeRef.current + offset, 0), video.duration);
      seek();
    };

    const handleMouseMove = (event: MouseEvent) => scrubTo(event.clientX);

    // Each touch opens a fresh gesture — otherwise the gap between two separate
    // taps would read as one enormous swipe.
    const handleTouchStart = (event: TouchEvent) => {
      prevXRef.current = event.touches[0]?.clientX ?? null;
      unlockPlayback();
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) scrubTo(touch.clientX);
    };

    const endTouch = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", endTouch);
    window.addEventListener("touchcancel", endTouch);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", endTouch);
      window.removeEventListener("touchcancel", endTouch);
    };
  }, [seek, unlockPlayback]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard access can be blocked; the address stays visible either way.
    }
  }, []);

  return (
    <div
      className="mainframe-page relative bg-black text-white"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        className="mainframe-video pointer-events-none fixed inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      />

      <header
        className="mainframe-nav fixed inset-x-0 top-0 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5"
        style={{ zIndex: 10 }}
      >
        <a href="/" className="flex items-center gap-3">
          <span
            className="text-[21px] tracking-tight text-white sm:text-[26px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mainframe&#174;
          </span>
          <span
            aria-hidden="true"
            className="select-none text-[25px] text-white sm:text-[30px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            &#10035;&#xFE0E;
          </span>
        </a>

        <nav className="hidden text-[23px] text-white md:flex md:flex-row">
          {NAV_LINKS.map((link, index) => (
            <span key={link}>
              <a href="#" className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {index < NAV_LINKS.length - 1 ? ", " : null}
            </span>
          ))}
        </nav>

        <a
          href={`mailto:${EMAIL}`}
          className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:inline"
        >
          Get in touch
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 flex flex-col items-start justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: 9, pointerEvents: menuOpen ? "auto" : "none" }}
        inert={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[32px] font-medium text-white"
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <a
          href={`mailto:${EMAIL}`}
          className="text-[32px] font-medium text-white underline underline-offset-2"
          onClick={() => setMenuOpen(false)}
        >
          Get in touch
        </a>
      </div>

      <section
        className="mainframe-hero relative flex flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
        style={{ zIndex: 1 }}
      >
        <div className="mainframe-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 max-w-xl">
          <p
            className="pointer-events-none mb-5 select-none sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.3,
              fontWeight: 400,
              color: "#fff",
              filter: "blur(4px)",
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe&apos;s Adaptive Response Interface Agent
          </p>

          <p
            className="mb-5 text-white sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: "54px",
            }}
          >
            {displayed}
            {done ? null : (
              <span
                aria-hidden="true"
                className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: actionsVisible ? 1 : 0,
              transform: actionsVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              >
                {action}
              </button>
            ))}

            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy ${EMAIL} to clipboard`}
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              <span>
                Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="0.5" y="0.5" width="7.5" height="7.5" rx="1.2" />
                <rect x="4" y="4" width="7.5" height="7.5" rx="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
