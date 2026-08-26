import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { estimatorUrl } from "@/lib/estimator";

type Shot = "cedar" | "vinyl" | "ui" | "lock";

const SHOTS: { id: Shot; src: string; his?: boolean }[] = [
  { id: "cedar", src: "/rhino/hero/cedar-hands.jpg?v=1" },
  { id: "vinyl", src: "/rhino/hero/vinyl-hands.jpg?v=1" },
  { id: "ui", src: "/rhino/hero/vinyl-ui.jpg?v=1" },
  { id: "lock", src: "/rhino/hero/lead-lock.jpg?v=1", his: true },
];

let audioCtx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  audioCtx ??= new AC();
  return audioCtx;
}

async function resumeAudio() {
  const ctx = getCtx();
  if (!ctx) return null;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      /* ignore */
    }
  }
  return ctx;
}

function playDing() {
  const ctx = audioCtx;
  if (!ctx || ctx.state !== "running") return false;
  const now = ctx.currentTime;
  [1108, 1568].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now + i * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.2, now + i * 0.09 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.32);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.09);
    osc.stop(now + i * 0.09 + 0.38);
  });
  return true;
}

function buzzDevice(pattern: number[]) {
  try {
    return Boolean(navigator.vibrate?.(pattern));
  } catch {
    return false;
  }
}

export function RaceHero() {
  const { t, locale } = useLocale();
  const copy = t.race;
  const story = t.story;
  const appUrl = estimatorUrl(locale);
  const [shot, setShot] = useState<Shot>("cedar");
  const [run, setRun] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const soundOnRef = useRef(false);
  const armedRef = useRef(false);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const armDevice = async () => {
    armedRef.current = true;
    await resumeAudio();
    buzzDevice([40]);
  };

  const pingAlert = () => {
    buzzDevice([200, 80, 200, 80, 160]);
    if (soundOnRef.current) playDing();
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShot("lock");
      return;
    }
    setShot("cedar");
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    later(() => setShot("vinyl"), 2400);
    later(() => setShot("ui"), 4800);
    later(() => {
      setShot("lock");
      pingAlert();
    }, 7600);
    later(() => setRun((n) => n + 1), 11800);
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [run]);

  const toggleSound = async (e: MouseEvent) => {
    e.stopPropagation();
    await armDevice();
    if (soundOn) {
      setSoundOn(false);
      return;
    }
    setSoundOn(true);
    playDing();
    buzzDevice([120, 50, 120]);
  };

  const his = shot === "lock";
  const caption =
    shot === "cedar" ? story.she : shot === "lock" ? story.bridge : story.priced;

  return (
    <section
      className="relative overflow-hidden bg-[#071f4d] px-4 pb-14 pt-8 text-white sm:px-6 sm:pb-20 sm:pt-12"
      data-slide="pain"
      data-slide-label="The race"
      aria-label={`${copy.title} ${copy.titleAccent}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#123a7a_0%,transparent_60%)]" />
      <div className="relative mx-auto flex max-w-lg flex-col items-center">
        <p className="mb-3 animate-[race-fade-up_0.6s_ease_forwards] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#ff6b35] opacity-0">
          {copy.kicker}
        </p>
        <h1 className="animate-[race-fade-up_0.7s_ease_0.15s_forwards] text-center text-[26px] font-extrabold uppercase leading-[1.15] tracking-tight opacity-0 sm:text-4xl">
          {copy.title}
          <br />
          <span className="text-[#ff6b35]">{copy.titleAccent}</span>
        </h1>
        <p className="mt-4 max-w-md animate-[race-fade-up_0.7s_ease_0.25s_forwards] text-center text-[15px] leading-snug text-white/80 opacity-0 sm:text-base">
          {copy.sub}
        </p>
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="try-estimator"
          data-track-label="Hero live demo"
          className="mt-6 inline-flex h-12 animate-[race-fade-up_0.7s_ease_0.32s_forwards] items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 text-sm font-bold text-white opacity-0 hover:bg-[#ff814f]"
        >
          {copy.cta}
          <ArrowRight className="size-4" />
        </a>

        <div
          className="relative mt-8 w-full max-w-[420px] animate-[race-fade-up_0.7s_ease_0.4s_forwards] opacity-0"
          onPointerDown={() => {
            void armDevice();
          }}
        >
          <p className="mb-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
            {his ? story.yourPhone : story.herPhone}
          </p>
          <div
            className={`relative aspect-square overflow-hidden rounded-[28px] bg-[#0a0a0a] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ${
              his ? "animate-[race-buzz_1.1s_cubic-bezier(.36,.07,.19,.97)_1]" : ""
            }`}
          >
            {SHOTS.map((item) => (
              <img
                key={item.id}
                src={item.src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  shot === item.id ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {SHOTS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.id}
                onClick={() => setShot(item.id)}
                className={`h-1.5 rounded-full transition ${
                  shot === item.id ? "w-8 bg-[#ff6b35]" : "w-4 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-[18px] max-w-[380px] text-center text-[15px] font-semibold text-white/80">
          {caption}
        </p>
        <p className="mt-2 max-w-[380px] text-center text-[12.5px] text-white/55">
          {his ? copy.footerWon : copy.footer}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => void toggleSound(e)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/8 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.05em] text-white hover:bg-white/15"
          >
            {soundOn ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
            {soundOn ? "Sound" : copy.tapSound}
          </button>
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="rounded-full border border-white/18 bg-white/8 px-[18px] py-2 font-mono text-[11px] uppercase tracking-[0.05em] text-white hover:bg-white/15"
          >
            {copy.replay}
          </button>
        </div>
      </div>
    </section>
  );
}
