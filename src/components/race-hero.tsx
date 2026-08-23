import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { estimatorUrl } from "@/lib/estimator";

type Scene = "lock" | "notif" | "list" | "cold" | "won" | "detail";

const THREADS = [
  {
    id: "1",
    initials: "AF",
    name: "ABC Fencing",
    time: "2h",
    preview: "You: Thanks, we'll call you back tomorrow",
  },
  {
    id: "2",
    initials: "PF",
    name: "Premier Fence Co",
    time: "Read",
    preview: "You: Hi! Can you call our office at 9am?",
  },
  {
    id: "4",
    initials: "TF",
    name: "Top Fence Guys",
    time: "Delivered",
    preview: "You: What's the address again?",
  },
  {
    id: "5",
    initials: "FK",
    name: "Fence King",
    time: "6h",
    preview: "You: Sorry, missed your call",
  },
] as const;

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
  const appUrl = estimatorUrl(locale);
  const [scene, setScene] = useState<Scene>("lock");
  const [pipeline, setPipeline] = useState(false);
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
      setScene("detail");
      setPipeline(true);
      return;
    }

    setScene("lock");
    setPipeline(false);

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    later(() => {
      setScene("notif");
      pingAlert();
    }, 900);
    later(() => setScene("list"), 2600);
    later(() => setScene("cold"), 3400);
    later(() => setScene("won"), 4000);
    later(() => setScene("detail"), 5100);
    later(() => setPipeline(true), 5800);
    later(() => setRun((n) => n + 1), 8700);

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

  const lit = scene === "list" || scene === "cold" || scene === "won" || scene === "detail";
  const dimmed = scene === "cold" || scene === "won" || scene === "detail";
  const detail = scene === "detail";
  const showNotif = scene === "notif";
  const won = scene === "won" || scene === "detail";

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
          <div
            className={`w-[340px] max-w-[calc(100vw-2rem)] origin-center rounded-[46px] bg-black p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ${
              showNotif ? "animate-[race-buzz_1.1s_cubic-bezier(.36,.07,.19,.97)_1]" : ""
            }`}
            onPointerDown={() => {
              void armDevice();
            }}
          >
            <div
              className={`relative h-[560px] overflow-hidden rounded-[36px] transition-colors duration-400 ${
                lit ? "bg-white" : "bg-black"
              }`}
            >
              <div className="absolute left-1/2 top-0 z-20 h-6 w-[112px] -translate-x-1/2 rounded-b-2xl bg-black" />

              <div
                className={`flex justify-between px-[22px] pb-0.5 pt-3.5 text-[13px] font-semibold text-black transition-opacity ${
                  lit ? "opacity-100" : "opacity-0"
                }`}
              >
                <span>9:41</span>
                <span>●●●●●  📶  🔋</span>
              </div>

              <div
                className={`absolute inset-x-0 top-[120px] text-center text-[58px] font-light tracking-tight text-white/85 transition-opacity duration-400 ${
                  lit ? "opacity-0" : "opacity-100"
                }`}
              >
                9:41
              </div>

              <div
                className={`absolute left-2.5 right-2.5 top-[38px] z-30 flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2.5 shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-500 ${
                  showNotif ? "translate-y-0" : "-translate-y-[140px]"
                }`}
              >
                <div className="grid size-[34px] shrink-0 place-items-center overflow-hidden rounded-[9px] bg-primary">
                  <img
                    src="/rhino/logo-mark.jpg?v=6"
                    alt=""
                    className="size-[34px] object-cover"
                    width={34}
                    height={34}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <p className="text-[13.5px] font-bold text-[#111]">{copy.notifName}</p>
                    <span className="text-[11.5px] text-[#8a8a8e]">{copy.now}</span>
                  </div>
                  <p className="mt-px truncate text-[12.5px] text-[#333]">{copy.notifBody}</p>
                </div>
              </div>

              <div
                className={`absolute inset-x-0 bottom-0 top-11 bg-white transition-all duration-500 ${
                  lit ? "opacity-100" : "opacity-0"
                } ${detail ? "-translate-x-full" : "translate-x-0"}`}
              >
                <div className="border-b border-[#e0e0e0] py-2 text-center">
                  <p className="text-base font-bold text-black">{copy.messages}</p>
                </div>
                {THREADS.slice(0, 2).map((item) => (
                  <Thread key={item.id} {...item} dimmed={dimmed} />
                ))}
                <article
                  className={`flex items-center gap-3 border-b border-[#ececec] px-4 py-[11px] ${
                    dimmed ? "bg-[#fff4ef]" : ""
                  }`}
                >
                  <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-primary">
                    <img
                      src="/rhino/logo-mark.jpg?v=6"
                      alt=""
                      className="size-11 object-cover"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-[15px] font-bold text-primary">
                        Rhino Lab
                        <span
                          className={`ml-1.5 align-middle font-mono text-[10px] font-bold tracking-wide ${
                            won
                              ? "rounded bg-[#1b8a5a] px-1.5 py-0.5 text-white"
                              : "rounded bg-[#e5e5e7] px-1.5 py-0.5 text-[#8a8a8e]"
                          }`}
                        >
                          {won ? copy.booked : copy.instant}
                        </span>
                      </p>
                      <span className="shrink-0 text-xs text-[#8a8a8e]">
                        {won ? "43 sec" : copy.now}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[13px] text-[#8a8a8e]">{copy.preview}</p>
                  </div>
                </article>
                {THREADS.slice(2).map((item) => (
                  <Thread key={item.id} {...item} dimmed={dimmed} />
                ))}
              </div>

              <div
                className={`absolute inset-x-0 bottom-0 top-11 flex flex-col bg-white transition-transform duration-500 ${
                  detail ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center gap-2.5 border-b border-[#ececec] px-4 py-2.5">
                  <span className="text-xl text-primary">‹</span>
                  <span className="text-[15px] font-bold text-black">Rhino Lab</span>
                </div>
                <div
                  className="mx-4 mt-[22px] rounded-[18px] px-[18px] py-[22px] text-center text-white"
                  style={{ background: "linear-gradient(160deg,#0B3D91,#123a7a)" }}
                >
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#ffb199]">
                    {copy.estimate}
                  </p>
                  <p className="mt-1.5 text-[34px] font-extrabold leading-none">$4,850–$5,600</p>
                  <p className="mb-3.5 mt-1 text-[12.5px] text-white/75">{copy.job}</p>
                  <div className="inline-block rounded-[10px] bg-[#ff6b35] px-[22px] py-2.5 text-[13px] font-bold">
                    {copy.book}
                  </div>
                </div>
                <div
                  className={`mx-4 mt-4 flex items-start gap-2 rounded-xl border border-[#cdeedd] bg-[#f0fbf5] px-3.5 py-3 transition ${
                    pipeline ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
                  }`}
                >
                  <div className="grid size-5 shrink-0 place-items-center rounded-full bg-[#1b8a5a] text-[12px] text-white">
                    ✓
                  </div>
                  <p className="text-[12.5px] leading-snug text-[#1b4332]">
                    {copy.filed}{" "}
                    <span className="font-bold">{copy.pipeline}</span>
                  </p>
                </div>
              </div>

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

        <p className="mt-[22px] max-w-[380px] text-center text-[12.5px] text-white/55">
          {won ? copy.footerWon : copy.footer}
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

function Thread({
  initials,
  name,
  time,
  preview,
  dimmed,
}: {
  initials: string;
  name: string;
  time: string;
  preview: string;
  dimmed: boolean;
}) {
  return (
    <article
      className={`flex items-center gap-3 border-b border-[#ececec] px-4 py-[11px] transition duration-700 ${
        dimmed ? "opacity-[0.32] grayscale" : ""
      }`}
    >
      <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e9e9eb] text-[15px] font-bold text-[#6b6b70]">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[15px] font-bold text-black">{name}</p>
          <span className="shrink-0 text-xs text-[#8a8a8e]">{time}</span>
        </div>
        <p className="mt-0.5 truncate text-[13px] text-[#8a8a8e]">{preview}</p>
      </div>
    </article>
  );
}
