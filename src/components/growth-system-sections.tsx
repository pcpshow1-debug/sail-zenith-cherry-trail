import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Camera,
  Check,
  Film,
  Gamepad2,
  Send,
  TimerReset,
} from "lucide-react";
import { MiniVideoGrid, type MiniClip } from "@/components/mini-video-grid";
import { useLocale } from "@/lib/i18n";

const GAME_URL =
  "https://rhino-builder-git-main-pcpshow1-2216s-projects.vercel.app/play?utm_source=rhinolab&utm_campaign=academy";

const CONTENT_CLIPS: MiniClip[] = [
  {
    src: "/rhino/content/lpg-tank.mp4",
    poster: "/rhino/content/lpg-tank.jpg",
    alt: "AI-made educational video about an LPG tank",
  },
  {
    src: "/rhino/content/mailbox.mp4",
    poster: "/rhino/content/mailbox.jpg",
    alt: "AI-made educational video about a mailbox",
  },
  {
    src: "/rhino/content/road-roller.mp4",
    poster: "/rhino/content/road-roller.jpg",
    alt: "AI-made educational video about road work",
  },
  {
    src: "/rhino/content/venice-piles.mp4",
    poster: "/rhino/content/venice-piles.jpg",
    alt: "AI-made educational video about construction",
  },
];

const copy = {
  en: {
    visual: {
      kicker: "The flagship feature",
      title: "Upload the yard. Show the new fence before the site visit.",
      body: "The homeowner chooses the fence and gets a price range. Then they upload a real property photo. AI places the selected fence into that photo so the customer can see the idea before your team drives out.",
      steps: ["Choose style and size", "Get an instant price range", "Upload or take a yard photo", "Compare the AI concept with the original"],
      note: "The image is a concept. Final placement and price are confirmed on site.",
      cta: "Try the photo estimator",
      badge: "REAL FEATURE · LIVE IN THE ESTIMATOR",
    },
    leak: {
      kicker: "The expensive lead",
      title: "You already paid for attention. Do not lose the lead at the last step.",
      body: "You pay a team to shoot. You pay for editing. You pay for ads and distribution. Then a homeowner raises a hand—and nobody answers. That is not a marketing problem. It is an operations leak.",
      flow: ["Content", "Paid traffic", "Lead", "Fast answer", "Tracked sale"],
      hormozi: "Alex Hormozi shared one operator example: a business reached every lead within 60 seconds, reported a 55% lead close rate, and increased sales by 391%. It is an anecdote, not a guarantee. The operating lesson is simple: call faster.",
      research: "A Harvard Business Review study of 2,241 companies found an average response time of 42 hours among companies that replied within 30 days. In a separate 1.25-million-lead study, teams that tried within one hour were nearly 7× more likely to qualify a lead than teams that waited even one hour longer.",
      source: "Read the sources",
    },
    content: {
      kicker: "Content Factory",
      title: "We do not post for applause. We build the traffic source.",
      body: "One capture day becomes clear, useful videos for every major channel. Every campaign points to the estimator. Every link carries its source into the CRM.",
      steps: [
        { title: "Capture", body: "Your jobs, your answers, your proof." },
        { title: "Produce", body: "Short videos, explainers, offers, and follow-up assets." },
        { title: "Distribute", body: "Instagram, TikTok, YouTube, and paid campaigns." },
        { title: "Measure", body: "See which campaign created the lead and the sale." },
      ],
      cta: "Build the full system",
    },
    game: {
      kicker: "Rhino Academy",
      title: "Train the crew before the mistake reaches a real job.",
      body: "Rhino Builder is a playable 3D training game. The player stages materials, digs holes, sets and plumbs posts, pours concrete, installs rails or panels, and hangs a gate. Wrong order and bad alignment create consequences inside the game—not on the customer's property.",
      live: "LIVE NOW",
      liveTitle: "Crew training",
      liveBody: "Four hands-on fence jobs with mobile and keyboard controls.",
      next: "NEXT MODULE",
      nextTitle: "Sales Gym",
      nextBody: "Timed homeowner questions, objections, qualification, and next-step scoring.",
      cta: "Play Rhino Builder",
      note: "Best on a modern phone or desktop with WebGL.",
    },
    thesis: {
      kicker: "Why we are building this",
      title: "AI is a new printing press for local business.",
      body1: "The printing press removed some old work, but it also made knowledge available to millions. AI is doing something similar to production, marketing, sales, and training.",
      body2: "Nobody knows exactly where it ends. We do know who benefits first: owners who look at their business honestly, test new tools, and move before fear becomes an excuse.",
      quote: "We will not stand still. Rhino Lab will keep finding faster, simpler ways to turn attention into tracked revenue.",
    },
    insights: {
      kicker: "Field notes",
      title: "The blog should teach the owner something useful.",
      body: "Long-form notes on AI, lead response, CRM attribution, and the systems behind modern home-service growth.",
      cards: [
        { title: "AI is a new printing press", body: "What changes, what does not, and why serious operators should learn the tool now.", href: "/insights#ai-printing-press" },
        { title: "The lead you paid for", body: "The real cost of slow follow-up—and the operating system that closes the gap.", href: "/insights#speed-to-lead" },
        { title: "Your CRM should answer one question", body: "Which source, page, message, and salesperson actually produced the sale?", href: "/insights#crm-attribution" },
      ],
      cta: "Read the field notes",
    },
  },
  ru: {
    visual: {
      kicker: "Флагманская функция",
      title: "Загрузите двор. Покажите новый забор ещё до выезда.",
      body: "Клиент выбирает забор и получает диапазон цены. Затем загружает реальную фотографию участка. AI ставит выбранный забор прямо в этот кадр, чтобы человек увидел идею до выезда вашей команды.",
      steps: ["Выбирает стиль и размер", "Получает диапазон цены", "Загружает или снимает двор", "Сравнивает AI-концепт с оригиналом"],
      note: "Это визуальный концепт. Точное место и финальная цена подтверждаются на объекте.",
      cta: "Попробовать estimator с фото",
      badge: "РЕАЛЬНАЯ ФУНКЦИЯ · УЖЕ В ESTIMATOR",
    },
    leak: {
      kicker: "Дорогой лид",
      title: "Вы уже заплатили за внимание. Не теряйте человека на последнем шаге.",
      body: "Вы платите команде за съёмку. Платите за монтаж. Платите за рекламу и дистрибуцию. Потом клиент поднимает руку — а ему никто не отвечает. Это не проблема маркетинга. Это дырка в операционной системе.",
      flow: ["Контент", "Реклама", "Лид", "Быстрый ответ", "Сделка в CRM"],
      hormozi: "Alex Hormozi привёл пример бизнеса, который связывался со всеми лидами за 60 секунд: 55% лидов закрывались, а продажи выросли на 391%. Это один кейс, не гарантия. Практический вывод простой: звонить нужно быстрее.",
      research: "Harvard Business Review изучил 2 241 компанию. Среднее время ответа среди ответивших за 30 дней составило 42 часа. В отдельном исследовании 1,25 млн лидов команды, которые пытались связаться в течение часа, почти в 7 раз чаще квалифицировали лид, чем те, кто ждал ещё хотя бы час.",
      source: "Открыть источники",
    },
    content: {
      kicker: "Контент-завод",
      title: "Мы не постим ради лайков. Мы строим источник трафика.",
      body: "Один съёмочный день превращается в понятные полезные ролики для всех главных площадок. Каждая кампания ведёт в estimator. Каждая ссылка сохраняет источник в CRM.",
      steps: [
        { title: "Снимаем", body: "Ваши объекты, ответы и доказательства." },
        { title: "Производим", body: "Короткие видео, объяснения, офферы и материалы для дожима." },
        { title: "Распространяем", body: "Instagram, TikTok, YouTube и платные кампании." },
        { title: "Считаем", body: "Видно, какая кампания принесла лид и продажу." },
      ],
      cta: "Собрать всю систему",
    },
    game: {
      kicker: "Rhino Academy",
      title: "Обучите бригаду до того, как ошибка попадёт на реальный объект.",
      body: "Rhino Builder — это игровое 3D-обучение. Игрок раскладывает материал, копает ямы, выставляет столбы по уровню, заливает бетон, ставит рейки или панели и вешает ворота. Неверный порядок и плохая геометрия дают последствия в игре, а не на участке клиента.",
      live: "УЖЕ РАБОТАЕТ",
      liveTitle: "Обучение бригады",
      liveBody: "Четыре практических задания по забору. Управление с телефона и клавиатуры.",
      next: "СЛЕДУЮЩИЙ МОДУЛЬ",
      nextTitle: "Sales Gym",
      nextBody: "Вопросы клиента на время, возражения, квалификация и оценка следующего шага.",
      cta: "Играть в Rhino Builder",
      note: "Лучше работает на современном телефоне или компьютере с WebGL.",
    },
    thesis: {
      kicker: "Зачем мы это строим",
      title: "AI — это новый печатный станок для бизнеса.",
      body1: "Печатный станок убрал часть старой работы, но дал миллионам людей доступ к знаниям. AI делает похожую вещь с производством, маркетингом, продажами и обучением.",
      body2: "Никто не знает, чем всё закончится. Но уже видно, кто получает преимущество: владельцы, которые честно смотрят на бизнес, тестируют новые инструменты и не делают страх оправданием.",
      quote: "Мы не будем стоять на месте. Rhino Lab будет постоянно находить более быстрые и простые способы превращать внимание в понятную выручку.",
    },
    insights: {
      kicker: "Записки с поля",
      title: "Блог должен давать владельцу полезную мысль.",
      body: "Подробно об AI, скорости ответа, CRM-атрибуции и системах роста для home-service бизнеса.",
      cards: [
        { title: "AI — новый печатный станок", body: "Что изменится, что останется и почему серьёзным владельцам пора осваивать инструмент.", href: "/insights#ai-printing-press" },
        { title: "Лид, за который вы уже заплатили", body: "Настоящая цена медленного ответа и система, которая закрывает этот разрыв.", href: "/insights#speed-to-lead" },
        { title: "CRM должна отвечать на один вопрос", body: "Какой источник, страница, сообщение и продавец реально принесли сделку?", href: "/insights#crm-attribution" },
      ],
      cta: "Читать записки",
    },
  },
} as const;

export function GrowthSystemSections({
  appUrl,
  onLead,
}: {
  appUrl: string;
  onLead: (source: string) => void;
}) {
  const { locale } = useLocale();
  const c = copy[locale];

  return (
    <>
      <section
        id="visualization"
        className="section-pad section-y scroll-mt-20 bg-[#071a33] text-white"
        data-slide="photo-visualization"
        data-slide-label="AI yard visualization"
      >
        <div className="container-site grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-2 shadow-2xl">
            <img
              src="/rhino/photo-visualizer.jpg"
              alt="Upload or take a photo of your yard in Rhino Lab Estimator"
              className="aspect-[720/1278] w-full rounded-[1.5rem] object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#65a6ff]">
              {c.visual.kicker}
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {c.visual.title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/75">{c.visual.body}</p>
            <ol className="grid gap-3 sm:grid-cols-2">
              {c.visual.steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0066ff] font-mono text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold leading-snug">{step}</span>
                </li>
              ))}
            </ol>
            <p className="rounded-xl border border-amber-300/25 bg-amber-200/10 px-4 py-3 text-sm text-amber-50">
              {c.visual.note}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="try-photo-estimator"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0066ff] px-6 text-sm font-bold text-white transition hover:bg-[#1875ff] active:scale-[0.97]"
              >
                <Camera className="size-4" />
                {c.visual.cta}
              </a>
              <span className="text-xs font-bold tracking-[0.12em] text-white/55">{c.visual.badge}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="speed"
        className="section-pad section-y bg-bg-elevated"
        data-slide="lead-economics"
        data-slide-label="The cost of a slow lead response"
      >
        <div className="container-site space-y-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-danger">{c.leak.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">{c.leak.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted">{c.leak.body}</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-5">
            {c.leak.flow.map((item, index) => (
              <div key={item} className="relative rounded-2xl border border-border bg-bg p-4 text-center font-bold">
                <span className="mb-2 block font-mono text-xs text-accent">0{index + 1}</span>
                {item}
                {index < c.leak.flow.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-accent sm:block" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-bg p-6 sm:p-7">
              <div className="flex items-center gap-3 text-accent">
                <TimerReset className="size-6" />
                <h3 className="text-xl font-bold">Alex Hormozi: call faster</h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{c.leak.hormozi}</p>
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent underline decoration-accent/30 underline-offset-4"
                href="https://www.linkedin.com/posts/alexhormozi_i-spoke-to-a-business-owner-who-gets-to-100-activity-7365057768468201472-dbkd"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.leak.source} <ArrowRight className="size-4" />
              </a>
            </article>
            <article className="rounded-3xl border border-border bg-bg p-6 sm:p-7">
              <div className="flex items-center gap-3 text-accent">
                <BarChart3 className="size-6" />
                <h3 className="text-xl font-bold">Harvard Business Review</h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{c.leak.research}</p>
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent underline decoration-accent/30 underline-offset-4"
                href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.leak.source} <ArrowRight className="size-4" />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section
        id="content"
        className="section-pad section-y scroll-mt-20"
        data-slide="content-factory"
        data-slide-label="Content Factory"
      >
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{c.content.kicker}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">{c.content.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{c.content.body}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {c.content.steps.map((step, index) => {
                const Icon = [Camera, Film, Send, BarChart3][index] ?? Check;
                return (
                  <article key={step.title} className="rounded-2xl border border-border bg-bg-elevated p-4">
                    <Icon className="size-5 text-accent" />
                    <h3 className="mt-3 font-bold text-fg">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </article>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => onLead("content-factory")}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white transition hover:bg-primary active:scale-[0.97] sm:w-auto"
            >
              {c.content.cta} <ArrowRight className="size-4" />
            </button>
          </div>
          <MiniVideoGrid clips={CONTENT_CLIPS} />
        </div>
      </section>

      <section
        id="training"
        className="section-pad section-y scroll-mt-20 bg-[#081526] text-white"
        data-slide="rhino-academy"
        data-slide-label="Rhino Academy"
      >
        <div className="container-site grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#65a6ff]">{c.game.kicker}</p>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{c.game.title}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/75">{c.game.body}</p>
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="play-rhino-builder"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0066ff] px-6 text-sm font-bold text-white transition hover:bg-[#1875ff] active:scale-[0.97]"
            >
              <Gamepad2 className="size-5" /> {c.game.cta}
            </a>
            <p className="text-sm text-white/50">{c.game.note}</p>
          </div>
          <div className="grid gap-4">
            <article className="rounded-3xl border border-[#65a6ff]/40 bg-[#0d2748] p-6 shadow-2xl">
              <span className="rounded-full bg-[#0066ff] px-3 py-1 text-[11px] font-bold tracking-[0.14em]">{c.game.live}</span>
              <Gamepad2 className="mt-8 size-10 text-[#65a6ff]" />
              <h3 className="mt-4 text-2xl font-bold">{c.game.liveTitle}</h3>
              <p className="mt-2 text-white/65">{c.game.liveBody}</p>
              <div className="mt-6 grid grid-cols-4 gap-2" aria-hidden>
                {["DIG", "PLUMB", "BUILD", "GATE"].map((label) => (
                  <span key={label} className="rounded-lg border border-white/10 bg-black/15 px-2 py-3 text-center font-mono text-[10px] text-white/70">{label}</span>
                ))}
              </div>
            </article>
            <article className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6">
              <span className="text-[11px] font-bold tracking-[0.14em] text-white/45">{c.game.next}</span>
              <BrainCircuit className="mt-5 size-8 text-white/55" />
              <h3 className="mt-3 text-xl font-bold">{c.game.nextTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{c.game.nextBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad section-y" data-slide="founder-thesis" data-slide-label="Founder thesis">
        <div className="container-site grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{c.thesis.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">{c.thesis.title}</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>{c.thesis.body1}</p>
            <p>{c.thesis.body2}</p>
            <blockquote className="rounded-2xl border-l-4 border-accent bg-primary-soft p-5 font-semibold text-fg">
              “{c.thesis.quote}”
              <footer className="mt-3 text-sm font-bold text-accent">— David Zuev, Rhino Lab</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section
        id="insights"
        className="section-pad section-y scroll-mt-20 bg-bg-elevated"
        data-slide="insights"
        data-slide-label="Rhino Lab insights"
      >
        <div className="container-site space-y-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{c.insights.kicker}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">{c.insights.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{c.insights.body}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {c.insights.cards.map((card, index) => (
              <a key={card.href} href={card.href} className="group rounded-3xl border border-border bg-bg p-6 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                <span className="font-mono text-sm font-bold text-accent">0{index + 1}</span>
                <h3 className="mt-8 text-2xl font-bold text-fg">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{card.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent">
                  {c.insights.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
