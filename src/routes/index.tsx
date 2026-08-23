import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Check, Instagram } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AssetFrame } from "@/components/asset-frame";
import { HowEstimatorFlip } from "@/components/how-estimator-flip";
import { PhoneStage } from "@/components/device-stage";
import { RaceHero } from "@/components/race-hero";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { SeoSync } from "@/components/seo-sync";
import { StickyCta } from "@/components/sticky-cta";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";
import { estimatorUrl } from "@/lib/estimator";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const PORTFOLIO_SRC = [
  {
    src: "/rhino/about/personal-brand.jpg?v=4",
    poster: "/rhino/about/personal-brand.jpg?v=4",
  },
  {
    src: "/rhino/about/optima-fence.jpg?v=4",
    poster: "/rhino/about/optima-fence.jpg?v=4",
  },
  {
    src: "/rhino/about/beauty-salon.jpg?v=4",
    poster: "/rhino/about/beauty-salon.jpg?v=4",
  },
  {
    src: "/rhino/about/modalero-furniture.jpg?v=4",
    poster: "/rhino/about/modalero-furniture.jpg?v=4",
  },
] as const;

function Heading({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl ${className ?? "text-center"}`}
    >
      {children}
    </h2>
  );
}

function HomePage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("site");
  const { t, locale } = useLocale();
  const appUrl = estimatorUrl(locale);

  const openLead = (source: string) => {
    setLeadSource(source);
    setLeadOpen(true);
  };

  return (
    <div className="flex min-h-dvh flex-col pb-16 md:pb-0">
      <SeoSync />
      <SiteHeader />
      <LeadCaptureModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        source={leadSource}
      />
      <main className="flex-1">
        <RaceHero />

        <section
          className="section-pad section-y"
          data-slide="compete"
          data-slide-label="Same lead"
        >
          <div className="container-site mx-auto max-w-2xl space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-danger">
                {t.compete.kicker}
              </p>
              <Heading>{t.compete.title}</Heading>
              <p className="text-lg font-semibold text-fg">{t.compete.same}</p>
            </div>
            <ul className="space-y-2">
              {t.compete.others.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center justify-between rounded-2xl border border-border bg-bg-elevated px-5 py-4"
                >
                  <span className="font-semibold text-muted">{row.name}</span>
                  <span className="font-mono text-sm font-bold uppercase text-danger">
                    {row.time}
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between rounded-2xl border border-accent/40 bg-primary-soft px-5 py-5">
                <span className="flex items-center gap-3 font-extrabold text-fg">
                  <img
                    src="/rhino/logo-mark.jpg?v=6"
                    alt=""
                    className="h-9 w-9 rounded-lg object-cover"
                    width={36}
                    height={36}
                  />
                  Rhino Lab
                </span>
                <span className="text-right font-bold text-accent">{t.compete.rhino}</span>
              </li>
            </ul>
          </div>
        </section>

        <section
          className="section-pad section-y bg-bg-elevated"
          data-slide="delay"
          data-slide-label="The delay"
        >
          <div className="container-site mx-auto max-w-3xl space-y-8">
            <div className="space-y-3 text-center">
              <Heading>{t.delay.title}</Heading>
              <p className="text-xl font-semibold text-fg">{t.delay.sub}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-danger/30 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-danger">
                  {t.delay.oldLabel}
                </p>
                <ol className="mt-4 space-y-2">
                  {t.delay.old.map((step, i) => (
                    <li key={step} className="flex items-center gap-2 text-base font-semibold">
                      <span className="font-mono text-danger">{i + 1}</span>
                      <span className={i === t.delay.old.length - 1 ? "text-danger" : "text-fg"}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
              <article className="rounded-2xl border border-accent/40 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  {t.delay.newLabel}
                </p>
                <ol className="mt-4 space-y-2">
                  {t.delay.neu.map((step, i) => (
                    <li key={step} className="flex items-center gap-2 text-base font-semibold text-fg">
                      <span className="font-mono text-accent">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        <section
          id="estimator"
          className="section-pad section-y scroll-mt-20"
          data-slide="estimator"
        >
          <div className="container-site mx-auto grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="mx-auto max-w-lg space-y-5 text-center md:mx-0 md:text-left">
              <img
                src="/rhino/logo-mark.jpg?v=6"
                alt=""
                className="mx-auto h-14 w-14 rounded-2xl object-cover md:mx-0"
                width={56}
                height={56}
              />
              <h2 className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
                {t.meet.title}
              </h2>
              <p className="text-2xl font-extrabold text-accent">{t.meet.line}</p>
              <p className="text-lg text-muted">{t.meet.sub}</p>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="try-estimator"
                data-track-label="Estimator section"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white hover:bg-primary sm:w-auto"
              >
                {t.estBlock.cta}
                <ArrowRight className="size-4" />
              </a>
            </div>
            <PhoneStage>
              <div className="relative">
                <AssetFrame
                  src="/rhino/estimate-expo.mp4?v=1"
                  poster="/rhino/estimate-expo.jpg?v=1"
                  alt="Estimate under 60 seconds"
                  className="rounded-none border-0 shadow-none"
                />
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-[8%] right-[7%] z-10 h-[5.6%] min-h-10 w-[38%] rounded-xl"
                  aria-label={t.estBlock.cta}
                  data-track="try-estimator"
                  data-track-label="Try estimator overlay"
                />
              </div>
            </PhoneStage>
          </div>
        </section>

        <section
          id="how"
          className="section-pad section-y bg-bg-elevated"
          data-slide="steps"
        >
          <div className="container-site mx-auto grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="mx-auto max-w-md space-y-5 text-center md:mx-0 md:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                {t.steps3.kicker}
              </p>
              <ol className="space-y-4 text-left">
                {t.steps3.items.map((step) => (
                  <li key={step.n}>
                    <p className="font-mono text-sm font-bold text-accent">{step.n}</p>
                    <h3 className="mt-1 text-xl font-extrabold text-fg">{step.title}</h3>
                    <p className="mt-1 text-base text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <PhoneStage>
              <HowEstimatorFlip
                alt={t.howWorks.title}
                className="rounded-none border-0 shadow-none"
              />
            </PhoneStage>
          </div>
        </section>

        <section
          id="crm"
          className="section-pad section-y bg-bg-elevated"
          data-slide="crm-block"
        >
          <div className="container-site mx-auto grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="mx-auto max-w-md space-y-5 text-center md:mx-0 md:text-left">
              <Heading className="text-center md:text-left">{t.crmSell.title}</Heading>
              <article className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm">
                <p className="text-xl font-extrabold text-fg">{t.crmSell.name}</p>
                <p className="mt-1 text-lg font-semibold text-fg">{t.crmSell.job}</p>
                <p className="mt-3 text-base text-fg">{t.crmSell.size}</p>
                <p className="text-base text-fg">{t.crmSell.extras}</p>
                <p className="mt-3 text-base">
                  <span className="text-muted">Estimated project: </span>
                  <span className="font-bold text-accent">{t.crmSell.estimate}</span>
                </p>
                <p className="mt-1 text-sm text-muted">Source: {t.crmSell.source}</p>
                <p className="text-sm text-muted">Submitted: {t.crmSell.submitted}</p>
              </article>
              <p className="text-lg font-semibold text-fg">{t.crmSell.call}</p>
            </div>
            <PhoneStage>
              <AssetFrame
                src="/rhino/admin-dashboard.mp4?v=4"
                poster="/rhino/admin-dashboard.jpg?v=4"
                alt="Rhino Lab CRM"
                className="rounded-none border-0 shadow-none"
              />
            </PhoneStage>
          </div>
        </section>

        <section id="follow" className="section-pad section-y" data-slide="follow">
          <div className="container-site mx-auto max-w-2xl space-y-8">
            <Heading>{t.follow.title}</Heading>
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.follow.items.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border bg-bg-elevated px-5 py-4 text-base font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-pad section-y bg-bg-elevated" data-slide="roi">
          <div className="container-site mx-auto max-w-2xl space-y-8 text-center">
            <Heading>{t.roi.title}</Heading>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white px-5 py-6">
                <p className="text-4xl font-extrabold text-fg">{t.roi.avg}</p>
                <p className="mt-1 text-sm font-semibold uppercase text-muted">
                  {t.roi.avgLabel}
                </p>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-white px-5 py-6">
                <p className="text-4xl font-extrabold text-accent">{t.roi.setup}</p>
                <p className="mt-1 text-sm font-semibold uppercase text-muted">
                  {t.roi.setupLabel}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold text-fg">{t.roi.line}</p>
          </div>
        </section>

        <section className="section-pad section-y" data-slide="trust">
          <div className="container-site mx-auto max-w-2xl space-y-8">
            <Heading>{t.trust.title}</Heading>
            <ul className="space-y-3">
              {t.trust.cases.map((item) => (
                <li
                  key={item.who}
                  className="rounded-2xl border border-border bg-bg-elevated px-5 py-5"
                >
                  <p className="font-bold text-fg">{item.who}</p>
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-accent/30 bg-primary-soft px-5 py-6">
              <p className="text-lg font-extrabold text-fg">{t.trust.privacyTitle}</p>
              <p className="mt-2 text-base text-fg">{t.trust.privacy}</p>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="section-pad section-y bg-bg-elevated"
          data-slide="pricing"
        >
          <div className="container-site mx-auto space-y-8">
            <Heading>{t.pricing.kicker}</Heading>
            <p className="mx-auto max-w-xl text-center text-lg font-semibold">
              {t.pricing.body}
            </p>
            <div className="mx-auto grid max-w-[760px] items-start gap-10 md:grid-cols-2 md:gap-8">
              <article className="group flex flex-col items-center rounded-3xl p-3 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_28px_55px_-18px_rgba(0,102,255,0.32)]">
                <div className="relative">
                  <span className="absolute -left-2 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-white shadow-sm">
                    {t.pricing.popular}
                  </span>
                  <PhoneStage className="transition duration-300 group-hover:scale-[1.03]">
                    <img
                      src="/rhino/pricing-base.jpg?v=4"
                      alt={t.pricing.base.name}
                      className="block h-auto w-full"
                      loading="lazy"
                    />
                  </PhoneStage>
                </div>
                <div className="mt-5 w-full max-w-[320px] space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{t.pricing.base.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-accent">
                      {t.pricing.startHere}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-end gap-x-4">
                    <div>
                      <p className="text-3xl font-bold">$950</p>
                      <p className="text-xs font-semibold uppercase text-muted">
                        {t.pricing.setup}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-accent">$60</p>
                      <p className="text-xs font-semibold uppercase text-muted">
                        {t.pricing.month}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {t.pricing.base.features.slice(0, 5).map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openLead("pricing-base")}
                    data-track="package-base"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition group-hover:bg-primary"
                  >
                    {t.orderPlan}
                  </button>
                </div>
              </article>

              <article className="group flex flex-col items-center rounded-3xl p-3 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_28px_55px_-18px_rgba(0,102,255,0.32)]">
                <PhoneStage className="transition duration-300 group-hover:scale-[1.03]">
                  <img
                    src="/rhino/pricing-pro.jpg?v=4"
                    alt={t.pricing.pro.name}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </PhoneStage>
                <div className="mt-5 w-full max-w-[320px] space-y-4">
                  <h3 className="text-2xl font-bold">{t.pricing.pro.name}</h3>
                  <p className="text-sm font-semibold text-fg">{t.pricing.pro.tag}</p>
                  <div className="flex flex-wrap items-end gap-x-4">
                    <div>
                      <p className="text-3xl font-bold">$2,300</p>
                      <p className="text-xs font-semibold uppercase text-muted">
                        {t.pricing.setup}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-accent">$190</p>
                      <p className="text-xs font-semibold uppercase text-muted">
                        {t.pricing.month}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {t.pricing.pro.features.slice(0, 5).map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openLead("pricing-pro")}
                    data-track="package-pro"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border px-6 text-sm font-semibold transition group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    {t.orderPlan}
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="faq" className="section-pad section-y" data-slide="faq">
          <div className="container-site mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                {t.faq.kicker}
              </p>
              <Heading>{t.faq.title}</Heading>
            </div>
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated">
              {t.faq.items.map((item) => (
                <details key={item.q} className="group px-5 py-4">
                  <summary className="cursor-pointer list-none text-left text-lg font-bold text-fg marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {item.q}
                      <span className="mt-1 text-accent group-open:hidden">+</span>
                      <span className="mt-1 hidden text-accent group-open:inline">–</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-base text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-pad section-y bg-bg-elevated" data-slide="about">
          <div className="container-site space-y-10">
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-border">
                <img
                  src="/rhino/about/david-portrait.jpg?v=4"
                  alt="David Zuev"
                  className="block h-auto w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="space-y-5">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  {t.about.kicker}
                </p>
                <h2 className="text-3xl font-bold sm:text-4xl">{t.about.name}</h2>
                <p className="text-lg text-fg">{t.about.p1}</p>
                <p className="text-base text-muted">{t.about.p2}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-border bg-bg px-4 py-3">
                    <p className="text-xl font-bold">{t.about.years}</p>
                    <p className="text-sm text-muted">{t.about.yearsSub}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-bg px-4 py-3">
                    <p className="text-xl font-bold">{t.about.clients}</p>
                    <p className="text-sm text-muted">{t.about.clientsSub}</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-bg px-4 py-3">
                    <p className="text-xl font-bold">{t.about.followers}</p>
                    <p className="text-sm text-muted">{t.about.followersSub}</p>
                  </div>
                </div>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-bg px-5 text-sm font-semibold"
                >
                  <Instagram className="size-4" />
                  Instagram · {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="size-4 text-accent" />
                <h3 className="text-base font-bold uppercase tracking-[0.14em]">
                  {t.about.portfolio}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {PORTFOLIO_SRC.map((clip, i) => (
                  <div key={clip.src} className="space-y-2">
                    <AssetFrame
                      src={clip.src}
                      poster={clip.poster}
                      alt={t.about.clips[i]?.label ?? "Portfolio"}
                      className="aspect-[9/16] [&_video]:h-full [&_video]:object-cover"
                    />
                    <p className="text-base font-semibold">{t.about.clips[i]?.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad section-y" data-slide="close">
          <div className="container-site mx-auto max-w-2xl space-y-5 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
              {t.close.title}
            </h2>
            <p className="text-lg text-muted">{t.close.body}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openLead("close")}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-fg px-6 text-sm font-semibold text-white sm:w-auto"
              >
                {t.close.cta}
              </button>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="try-estimator"
                data-track-label="Close try estimator"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border px-6 text-sm font-semibold sm:w-auto"
              >
                {t.estBlock.cta}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}
