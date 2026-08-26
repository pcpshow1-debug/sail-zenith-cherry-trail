import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { estimatorUrl } from "@/lib/estimator";

type Scene = "pick" | "tap" | "quote" | "lock" | "crm";

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
  const [scene, setScene] = useState<Scene>("pick");
  const [run, setRun] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [hint, setHint] = useState(true);
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
      setScene("crm");
      return;
    }

    setScene("pick");
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    later(() => setScene("tap"), 1800);
    later(() => setScene("quote"), 2600);
    later(() => {
      setScene("lock");
      pingAlert();
    }, 5200);
    later(() => setScene("crm"), 7600);
    later(() => setRun((n) => n + 1), 11200);

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [run]);

  const toggleSound = async (e: MouseEvent) => {
    e.stopPropagation();
    await armDevice();
    if (soundOn) {
      setSoundOn(false);
      setHint(false);
      return;
    }
    setSoundOn(true);
    setHint(false);
    playDing();
    buzzDevice([120, 50, 120]);
  };

  const hers = scene === "pick" || scene === "tap" || scene === "quote";
  const his = scene === "lock" || scene === "crm";
  const caption =
    scene === "quote" ? story.priced : hers ? story.she : story.bridge;

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

        <div className="mt-8 animate-[race-fade-up_0.7s_ease_0.4s_forwards] opacity-0">
          <p className="mb-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
            {hers ? story.herPhone : story.yourPhone}
          </p>
          <div
            className={`w-[340px] max-w-[calc(100vw-2rem)] origin-center rounded-[46px] bg-black p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ${
              scene === "lock" ? "animate-[race-buzz_1.1s_cubic-bezier(.36,.07,.19,.97)_1]" : ""
            }`}
            onPointerDown={() => {
              void armDevice();
            }}
          >
            <div
              className={`relative h-[560px] overflow-hidden rounded-[36px] ${
                scene === "lock" ? "bg-[#111]" : "bg-white"
              }`}
            >
              <div className="absolute left-1/2 top-0 z-20 h-6 w-[112px] -translate-x-1/2 rounded-b-2xl bg-black" />

              {hers ? <HerPhone scene={scene} /> : null}
              {scene === "lock" ? <HisLock /> : null}
              {scene === "crm" ? <HisCrm /> : null}

              <button
                type="button"
                onClick={(e) => void toggleSound(e)}
                className={`absolute right-3.5 top-3.5 z-50 grid size-[34px] place-items-center rounded-full border text-white ${
                  soundOn
                    ? "border-[#1b8a5a]/80 bg-[#1b8a5a]/55"
                    : "border-white/25 bg-black/45"
                }`}
                aria-label={soundOn ? "Sound off" : copy.tapSound}
              >
                {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </button>

              {hint && !soundOn ? (
                <button
                  type="button"
                  onClick={(e) => void toggleSound(e)}
                  className="absolute bottom-3.5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[10.5px] text-white"
                >
                  🔊 {copy.tapSound}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-[22px] max-w-[380px] text-center text-[15px] font-semibold text-white/80">
          {caption}
        </p>
        <p className="mt-2 max-w-[380px] text-center text-[12.5px] text-white/55">
          {his ? copy.footerWon : copy.footer}
        </p>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="mt-4 rounded-full border border-white/18 bg-white/8 px-[18px] py-2 font-mono text-[11px] uppercase tracking-[0.05em] text-white hover:bg-white/15"
        >
          {copy.replay}
        </button>
      </div>
    </section>
  );
}

function HerPhone({ scene }: { scene: Scene }) {
  const quote = scene === "quote";
  return (
    <div className="absolute inset-0 bg-white pt-9 text-[#0b1b3a]">
      <div className="flex items-center gap-2 px-4">
        <img
          src="/rhino/logo-mark.jpg?v=6"
          alt=""
          className="size-7 rounded-full object-cover"
          width={28}
          height={28}
        />
        <p className="text-[12px] font-extrabold tracking-[0.04em] text-[#0B3D91]">
          RHINO LAB
        </p>
      </div>

      {quote ? (
        <div className="flex h-[calc(100%-36px)] flex-col items-center px-5 pt-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8a8e]">
            Starting at
          </p>
          <p className="mt-1 text-[42px] font-extrabold leading-none text-[#0B3D91]">
            $60<span className="text-[18px]">/mo</span>
          </p>
          <p className="mt-3 text-[15px] font-bold">Total: $12,020</p>
          <p className="mt-1 text-[12px] text-[#8a8a8e]">Cedar fence · 180 ft</p>
          <div
            className="mt-5 h-36 w-full rounded-2xl"
            style={{
              background:
                "linear-gradient(160deg,#8b5a2b 0%,#c48a4a 38%,#6e3f1c 72%,#3d2412 100%)",
            }}
          />
          <div className="mt-5 w-full rounded-xl bg-[#0B3D91] py-3 text-[13px] font-bold text-white">
            Book My Free On-Site Estimate
          </div>
        </div>
      ) : (
        <div className="px-4 pt-3">
          <div className="h-1 overflow-hidden rounded-full bg-[#e8eef8]">
            <div className="h-full w-1/2 rounded-full bg-[#0B3D91]" />
          </div>
          <p className="mt-4 text-[22px] font-extrabold leading-tight">Let’s calculate.</p>
          <p className="mt-1 text-[12px] text-[#6b7385]">Pick a fence. Tell Expo the size.</p>

          <article className="mt-4 rounded-2xl border border-[#d7e0f0] p-2.5">
            <div className="flex gap-2.5">
              <div
                className="h-[72px] w-[88px] shrink-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(160deg,#8b5a2b 0%,#c48a4a 38%,#6e3f1c 72%,#3d2412 100%)",
                }}
              />
              <div className="min-w-0">
                <p className="text-[15px] font-extrabold">Cedar</p>
                <p className="text-[12px] font-semibold text-[#0B3D91]">from $42/ft</p>
                <p className="text-[11px] text-[#8a8a8e]">Full Panel</p>
              </div>
            </div>
          </article>

          <p className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a8a8e]">
            Style
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border-2 border-[#0B3D91] p-2">
              <div
                className="h-16 rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg,#a56b38,#6b3e1c)",
                }}
              />
              <p className="mt-1.5 text-[11px] font-bold">Full Panel</p>
            </div>
            <div className="rounded-xl border border-[#e5e9f2] p-2 opacity-70">
              <div
                className="h-16 rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg,#c48a4a,#8b5a2b)",
                }}
              />
              <p className="mt-1.5 text-[11px] font-bold">Rambler</p>
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a8a8e]">
                Typical range
              </p>
              <p className="text-[15px] font-extrabold text-[#0B3D91]">$6,120 – $7,480</p>
            </div>
            <div
              className={`relative rounded-xl bg-[#0B3D91] px-3.5 py-2.5 text-[12px] font-bold text-white ${
                scene === "tap" ? "scale-105 shadow-[0_0_0_6px_rgba(11,61,145,0.25)]" : ""
              } transition`}
            >
              Let’s Calculate
              {scene === "tap" ? (
                <span className="absolute -right-1 -top-1 size-4 rounded-full bg-[#ff6b35] ring-4 ring-[#ff6b35]/40" />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HisLock() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#1c1c1e_0%,#111_55%,#000_100%)] pt-16 text-white">
      <p className="text-center text-[13px] text-white/70">Monday, August 25</p>
      <p className="mt-1 text-center text-[64px] font-light leading-none tracking-tight">
        9:41
      </p>
      <div className="mx-3 mt-10 flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2.5 text-[#111] shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <img
          src="/rhino/logo-mark.jpg?v=6"
          alt=""
          className="size-[34px] rounded-[9px] object-cover"
          width={34}
          height={34}
        />
        <div className="min-w-0 flex-1">
          <div className="flex justify-between">
            <p className="text-[13.5px] font-bold">Rhino Lab</p>
            <span className="text-[11.5px] text-[#8a8a8e]">now</span>
          </div>
          <p className="mt-px text-[12.5px] font-semibold">New lead received</p>
          <p className="truncate text-[12px] text-[#555]">
            Sarah Chen — Cedar fence — $12,020
          </p>
        </div>
      </div>
    </div>
  );
}

function HisCrm() {
  return (
    <div className="absolute inset-0 bg-[#f6f7fb] pt-9 text-[#111]">
      <div className="flex items-center gap-2 px-4">
        <img
          src="/rhino/logo-mark.jpg?v=6"
          alt=""
          className="size-6 rounded-md object-cover"
          width={24}
          height={24}
        />
        <p className="text-[14px] font-extrabold">Rhino Lab</p>
      </div>
      <div className="mt-3 flex gap-2 px-4">
        <span className="rounded-full bg-[#e8eef8] px-3 py-1 text-[11px] font-bold text-[#5b6578]">
          Overview
        </span>
        <span className="rounded-full bg-[#111] px-3 py-1 text-[11px] font-bold text-white">
          Leads (4)
        </span>
        <span className="rounded-full bg-[#e8eef8] px-3 py-1 text-[11px] font-bold text-[#5b6578]">
          Visitors
        </span>
      </div>
      <article className="mx-3 mt-4 rounded-2xl border border-[#e5e9f2] bg-white p-3.5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/rhino/logo-mark.jpg?v=6"
              alt=""
              className="size-8 rounded-full object-cover"
              width={32}
              height={32}
            />
            <div>
              <p className="text-[14px] font-extrabold">Sarah Chen</p>
              <p className="text-[12px] text-[#6b7385]">Cedar fence</p>
            </div>
          </div>
          <span className="rounded-full bg-[#e8f8ee] px-2 py-0.5 text-[10px] font-bold uppercase text-[#1b8a5a]">
            New
          </span>
        </div>
        <p className="mt-3 text-[13px] font-semibold">Bellevue, WA</p>
        <p className="text-[13px] text-[#6b7385]">Instagram · $12,020</p>
        <p className="mt-2 text-[12px] text-[#0B3D91]">Package: Rhino Pro</p>
      </article>
      <article className="mx-3 mt-2 rounded-2xl border border-[#eee] bg-white p-3.5 opacity-50">
        <p className="text-[13px] font-bold">Marcus Hale</p>
        <p className="text-[12px] text-[#6b7385]">Vinyl · Door to Door</p>
      </article>
    </div>
  );
}
