import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Check, Instagram } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AssetFrame } from "@/components/asset-frame";
import { HowEstimatorFlip } from "@/components/how-estimator-flip";
import { PhoneStage } from "@/components/device-stage";
import { RaceHero } from "@/components/race-hero";
import { BurnCounter } from "@/components/burn-counter";
import { LeadCaptureModal } from "@/components/lead-capture-modal";
import { SeoSync } from "@/components/seo-sync";
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
    <div className="flex min-h-dvh flex-col">
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
          data-slide="burn"
          data-slide-label="Traditional way"
        >
          <div className="container-site mx-auto max-w-4xl space-y-8">
            <div className="space-y-3 text-center">
              <h2 className="text-balance text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">
                <span className="text-danger">{t.burn.title}</span>{" "}
                <span className="text-fg">{t.burn.notWorking}</span>
              </h2>
              <p className="text-lg font-semibold text-fg sm:text-xl">
                {t.burn.model}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-danger/25 bg-bg-elevated p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-muted">
                  {t.burn.smm}
                </p>
                <BurnCounter to={6000} />
                <p className="mt-1 text-sm text-muted">{t.burn.smmNote}</p>
              </article>
              <article className="rounded-2xl border border-danger/25 bg-bg-elevated p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-muted">
                  {t.burn.sales}
                </p>
                <BurnCounter to={8000} />
                <p className="mt-1 text-sm text-muted">{t.burn.salesNote}</p>
              </article>
              <article className="rounded-2xl border border-danger/25 bg-bg-elevated p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-muted">
                  {t.burn.site}
                </p>
                <BurnCounter to={15000} suffix="+" />
                <p className="mt-1 text-sm text-muted">{t.burn.siteNote}</p>
              </article>
              <article className="rounded-2xl border border-danger/25 bg-bg-elevated p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-muted">
                  {t.burn.ads}
                </p>
                <BurnCounter to={20000} suffix="+" />
                <p className="mt-2 text-sm text-muted">{t.burn.adsNote}</p>
              </article>
            </div>
            <div className="text-center">
              <BurnCounter to={30000} suffix="+" />
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-danger">
                {t.burn.total}
              </p>
            </div>
          </div>
        </section>

        <section
          id="estimator"
          className="section-pad section-y scroll-mt-20"
          data-slide="estimator"
          data-slide-label="What's the solution"
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
              <p className="text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
                {t.estimatorJobs.ask}
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-accent sm:text-3xl">
                {t.estimatorJobs.name}
              </p>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="try-estimator"
                data-track-label="Try estimator button"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white hover:bg-primary sm:w-auto"
              >
                {t.tryDemo}
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
                  aria-label={t.tryDemo}
                  data-track="try-estimator"
                  data-track-label="Try estimator"
                />
              </div>
            </PhoneStage>
          </div>
        </section>

        <section
          id="how"
          className="section-pad section-y bg-bg-elevated"
          data-slide="how-estimator"
          data-slide-label="How the estimator works"
        >
          <div className="container-site mx-auto grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="mx-auto max-w-md space-y-5 text-center md:mx-0 md:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                {t.howWorks.kicker}
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                {t.howWorks.title}
              </h2>
              <p className="text-base text-muted">{t.howWorks.body}</p>
              <ol className="space-y-2 text-left">
                {t.howWorks.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-base font-semibold text-fg">
                    <span className="font-mono text-accent">{i + 1}.</span>
                    {step}
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
          className="section-pad section-y"
          data-slide="replaces"
          data-slide-label="What it does"
        >
          <div className="container-site mx-auto max-w-3xl space-y-4">
            <article className="rounded-2xl border border-border bg-bg-elevated px-5 py-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
                {t.estimatorJobs.salesman}
              </h3>
              <p className="mt-3 text-lg font-semibold text-fg">
                {t.estimatorJobs.first}
              </p>
              <p className="mt-2 text-base text-muted">{t.estimatorJobs.follow}</p>
            </article>
            <article className="rounded-2xl border border-border bg-bg-elevated px-5 py-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
                {t.estimatorJobs.website}
              </h3>
              <p className="mt-3 text-lg font-semibold text-fg">
                {t.estimatorJobs.remember}
              </p>
              <p className="mt-2 text-base text-muted">
                {t.estimatorJobs.experience}
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-bg-elevated px-5 py-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
                {t.estimatorJobs.upsell}
              </h3>
              <p className="mt-3 text-lg text-muted">
                {t.estimatorJobs.upsellBody}
              </p>
            </article>
          </div>
        </section>

        <section
          className="section-pad pb-14 sm:pb-20"
          data-slide="be-first"
          data-slide-label="Be the first"
        >
          <div className="container-site mx-auto max-w-xl space-y-4">
            <AssetFrame
              src="/rhino/reach-the-lead-first.mp4?v=6"
              poster="/rhino/reach-the-lead-first.jpg?v=6"
              alt="Reach the lead first"
              className="border-accent/30 bg-[#e8f1fb] shadow-md"
            />
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="try-estimator"
              data-track-label="Try estimator hand"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-white hover:bg-primary"
            >
              {t.tryDemo}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </section>

        <section
          id="crm"
          className="section-pad section-y"
          data-slide="crm-block"
          data-slide-label="CRM"
        >
          <div className="container-site mx-auto grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="mx-auto max-w-md space-y-5 text-center md:mx-0 md:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                {t.crm.kicker}
              </p>
              <Heading className="text-center md:text-left">{t.crm.title}</Heading>
              <p className="text-base font-semibold text-fg">{t.estimatorJobs.crmBody}</p>
              <p className="text-base text-muted">{t.crm.body}</p>
              <ul className="space-y-2 text-left">
                {t.crm.points.map((point) => (
                  <li key={point.title} className="text-base">
                    <span className="font-bold text-fg">{point.title}.</span>{" "}
                    <span className="text-muted">{point.body}</span>
                  </li>
                ))}
              </ul>
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

        <section
          id="pricing"
          className="section-pad section-y"
          data-slide="pricing"
          data-slide-label="Pricing"
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
                    {t.pricing.base.features.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:hello@zuevs.com?subject=Rhino%20Base%20request&body=I%20want%20Rhino%20Base%20(%24950%20setup%20%2B%20%2460%2Fmonth)."
                    data-track="package-base"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition group-hover:bg-primary"
                  >
                    {t.orderPlan}
                  </a>
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
                    {t.pricing.pro.features.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:hello@zuevs.com?subject=Rhino%20Pro%20request&body=I%20want%20Rhino%20Pro%20(%242300%20setup%20%2B%20%24190%2Fmonth)."
                    data-track="package-pro"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border border-border px-6 text-sm font-semibold transition group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                  >
                    {t.orderPlan}
                  </a>
                </div>
              </article>
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
      </main>
      <SiteFooter />
    </div>
  );
}
