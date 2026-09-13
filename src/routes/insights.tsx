import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BookOpen, TimerReset } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { estimatorUrl } from "@/lib/estimator";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Rhino Lab Insights | AI, Lead Response and CRM for Contractors" },
      {
        name: "description",
        content:
          "Field notes from Rhino Lab about AI adoption, speed to lead, CRM attribution, and practical growth systems for contractors.",
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: "Rhino Lab Insights" },
      {
        property: "og:description",
        content: "Practical field notes for contractors building a modern sales system.",
      },
    ],
    links: [{ rel: "canonical", href: "https://rhinolab.app/insights" }],
  }),
  component: InsightsPage,
});

const content = {
  en: {
    eyebrow: "Rhino Lab field notes",
    title: "Technology matters only when it fixes a real business leak.",
    intro:
      "These notes explain the thinking behind Rhino Lab: why AI matters, why slow lead response destroys paid demand, and why a CRM must connect every sale to its source.",
    read: "Read",
    min: "min",
    estimator: "Try the live estimator",
    articles: [
      {
        id: "ai-printing-press",
        icon: BookOpen,
        tag: "Founder note",
        title: "AI is a new printing press for local business",
        summary: "The tool will remove some old work. It will also give small teams abilities that once required departments.",
        paragraphs: [
          "When the printing press spread, people did not agree on what it would do. Some workers saw a threat. Others saw faster access to knowledge. Both were right. Some work disappeared. More people learned, published, and built on ideas that used to move slowly.",
          "AI is creating the same kind of break in the cost of production. A local contractor can now explain a service, translate a message, build a visual concept, train a new hire, and organize customer information faster than before. The point is not to replace judgment. The point is to remove waiting, repetition, and preventable loss.",
          "Nobody can honestly promise what AI becomes in ten years. A business owner does not need that answer to act today. The useful question is smaller: where are customers waiting, where is the team repeating the same work, and where does information disappear between marketing and the sale?",
          "Rhino Lab starts there. The estimator answers the common pricing questions. Photo visualization helps the homeowner understand the idea. The CRM keeps the source and project details. Training games let a worker make mistakes without risking a real property or a real deal.",
          "The advantage does not belong to the loudest person talking about AI. It belongs to the operator who tests it, measures the result, keeps what works, and improves the system again.",
        ],
        takeaway: "Use AI to shorten a real process. Do not add it just to sound modern.",
      },
      {
        id: "speed-to-lead",
        icon: TimerReset,
        tag: "Sales operations",
        title: "The lead you already paid for",
        summary: "A slow response can waste the entire cost of content, advertising, software, and labor that created the lead.",
        paragraphs: [
          "Lead generation is not one expense. A company may pay for a camera crew, editing, social media management, ads, landing pages, software, and a salesperson. All of that spending has one job: create a moment when a real person asks for help.",
          "If nobody answers, the company does not only lose a phone call. It loses the combined cost of every step that produced that phone call. The salesperson can be busy, tired, driving, or simply inconsistent. The homeowner does not care. They move to the next company.",
          "Alex Hormozi described one business that assigned a full-time person to call every new lead within 60 seconds. He reported a 55% close rate on leads and a 391% increase in sales. That is one operator example, not a universal promise. Its value is the operating principle: response speed must be owned by a system, not left to memory.",
          "The broader research points in the same direction. A Harvard Business Review audit of 2,241 U.S. companies found that 23% never responded to a web lead. Among companies that replied within 30 days, the average response time was 42 hours. In a separate analysis of 1.25 million leads, companies that tried to contact a lead within one hour were nearly seven times as likely to qualify it as companies that waited even one hour longer.",
          "A useful response system is simple. The lead gets a clear acknowledgement. The owner or assigned salesperson gets an alert. The CRM starts a visible response clock. If nobody acts, the lead is reassigned or escalated. Every attempt is recorded. The manager can see the gap before the month is over.",
        ],
        takeaway: "Do not buy more leads until the current leads receive a fast, visible, accountable response.",
      },
      {
        id: "crm-attribution",
        icon: BarChart3,
        tag: "CRM and attribution",
        title: "Your CRM should answer one question: what created the sale?",
        summary: "A list of names is not a revenue system. A useful CRM preserves the full path from first click to signed job.",
        paragraphs: [
          "Most small-business CRMs begin too late. They record a name and phone number after a form is submitted. That is useful, but it does not explain why the person arrived, what they looked at, what they wanted, or which campaign deserves more budget.",
          "A better record begins with source. It keeps the campaign tag, landing page, referring site, first session, and important actions. Inside the estimator, it also keeps the selected material, size, gates, price range, time in the funnel, and property photo when the customer provides one.",
          "The next layer is action. Who owned the lead? When did the first alert arrive? When did a person call? Was an appointment set? Was a quote sent? Did the job move to won or lost? Without those timestamps, a manager can see revenue but cannot see the process that created or destroyed it.",
          "Attribution is not about building a complicated dashboard. It is about making the next decision obvious. If one video brings qualified cedar projects, make more of that kind. If paid traffic creates leads that never receive a call, fix follow-up before raising the budget. If one salesperson responds faster and books more work, teach the behavior to the rest of the team.",
          "Rhino Lab connects the path instead of selling separate pieces. Content creates attention. The estimator captures intent. The CRM keeps the context. Training improves the human response. That is how technology becomes an operating system instead of a pile of subscriptions.",
        ],
        takeaway: "Track enough context to decide what to repeat, what to fix, and where the next dollar should go.",
      },
    ],
    references: "Sources",
  },
  ru: {
    eyebrow: "Записки Rhino Lab",
    title: "Технология имеет смысл, только когда закрывает реальную дырку в бизнесе.",
    intro:
      "Здесь подробно объясняется логика Rhino Lab: почему AI важен, как медленный ответ уничтожает уже оплаченное внимание и зачем CRM связывать каждую продажу с её источником.",
    read: "Читать",
    min: "мин",
    estimator: "Попробовать живой estimator",
    articles: [
      {
        id: "ai-printing-press",
        icon: BookOpen,
        tag: "Мысль основателя",
        title: "AI — новый печатный станок для локального бизнеса",
        summary: "Инструмент уберёт часть старой работы. Но он же даст маленькой команде возможности, для которых раньше нужен был целый отдел.",
        paragraphs: [
          "Когда появился печатный станок, люди не понимали, к чему он приведёт. Одни увидели угрозу. Другие увидели быстрый доступ к знаниям. Правы были и те, и другие. Часть работы исчезла. Зато гораздо больше людей получили возможность учиться, публиковать и развивать идеи.",
          "AI делает похожий скачок в стоимости производства. Локальный подрядчик уже может быстрее объяснить услугу, перевести сообщение, сделать визуальный концепт, обучить сотрудника и собрать данные о клиенте. Задача не в том, чтобы убрать человеческое решение. Задача — убрать ожидание, повторение и предотвратимые потери.",
          "Никто честно не скажет, чем AI станет через десять лет. Владельцу бизнеса не нужен этот ответ, чтобы действовать сегодня. Нужен вопрос проще: где ждёт клиент, где команда повторяет одну и ту же работу и где информация пропадает между рекламой и сделкой?",
          "Rhino Lab начинает именно там. Estimator отвечает на типовые вопросы о цене. Визуализация по фотографии помогает клиенту понять идею. CRM сохраняет источник и детали проекта. Игровое обучение даёт сотруднику ошибиться без ущерба для реального объекта или сделки.",
          "Преимущество получает не тот, кто громче всех говорит про AI. Его получает оператор, который тестирует инструмент, измеряет результат, оставляет рабочее и снова улучшает систему.",
        ],
        takeaway: "Используйте AI, чтобы сократить реальный процесс. Не добавляйте его только ради модного слова.",
      },
      {
        id: "speed-to-lead",
        icon: TimerReset,
        tag: "Продажи",
        title: "Лид, за который вы уже заплатили",
        summary: "Медленный ответ может обнулить все деньги на контент, рекламу, софт и людей, которые привели клиента.",
        paragraphs: [
          "Привлечение лида — это не одна статья расходов. Компания платит за съёмку, монтаж, SMM, рекламу, посадочные страницы, софт и продавца. У всех этих расходов одна задача: создать момент, когда реальный человек попросит помощи.",
          "Если никто не отвечает, компания теряет не просто звонок. Она теряет общую стоимость каждого шага, который этот звонок создал. Продавец может быть занят, ехать за рулём, устать или просто забыть. Клиенту всё равно. Он идёт к следующей компании.",
          "Alex Hormozi описал бизнес, где отдельный сотрудник звонил каждому новому лиду в течение 60 секунд. По его словам, компания закрывала 55% лидов и увеличила продажи на 391%. Это один кейс, а не универсальная гарантия. Но операционный принцип сильный: скорость ответа должна принадлежать системе, а не памяти человека.",
          "Исследования показывают ту же проблему. Harvard Business Review проверил 2 241 американскую компанию: 23% вообще не ответили на веб-лид. Среди тех, кто ответил в течение 30 дней, среднее время составило 42 часа. В отдельном анализе 1,25 млн лидов компании, пытавшиеся связаться в течение часа, почти в семь раз чаще квалифицировали лид, чем те, кто ждал ещё хотя бы час.",
          "Рабочая система ответа простая. Лид сразу получает понятное подтверждение. Владелец или ответственный продавец получает уведомление. CRM запускает видимый таймер. Если никто не действует, лид переходит другому человеку или поднимается руководителю. Каждая попытка фиксируется. Проблему видно не через месяц, а сегодня.",
        ],
        takeaway: "Не покупайте больше лидов, пока текущие не получают быстрый, видимый и контролируемый ответ.",
      },
      {
        id: "crm-attribution",
        icon: BarChart3,
        tag: "CRM и атрибуция",
        title: "CRM должна отвечать на один вопрос: что создало продажу?",
        summary: "Список имён — не система выручки. Полезная CRM сохраняет весь путь от первого клика до подписанной работы.",
        paragraphs: [
          "Большинство CRM для малого бизнеса начинают слишком поздно. Они записывают имя и телефон после формы. Это полезно, но не объясняет, почему человек пришёл, что он смотрел, что хотел и какой рекламе стоит дать больше бюджета.",
          "Хорошая карточка начинается с источника. Она хранит кампанию, посадочную страницу, сайт-переход, первую сессию и важные действия. Внутри estimator она также сохраняет материал, размер, ворота, диапазон цены, время в воронке и фотографию участка, если клиент её дал.",
          "Следующий слой — действия команды. Кто получил лид? Когда пришёл первый алерт? Когда позвонили? Назначили ли встречу? Отправили ли предложение? Сделка выиграна или потеряна? Без этих отметок руководитель видит выручку, но не видит процесс, который её создал или уничтожил.",
          "Атрибуция нужна не ради сложного дашборда. Она нужна, чтобы следующее решение стало очевидным. Если ролик приводит хорошие проекты по кедру — снимайте больше таких роликов. Если реклама создаёт лиды, которым никто не звонит, сначала почините обработку. Если один продавец отвечает быстрее и назначает больше встреч, перенесите его поведение на команду.",
          "Rhino Lab связывает путь, а не продаёт разрозненные детали. Контент создаёт внимание. Estimator ловит намерение. CRM сохраняет контекст. Обучение улучшает человеческий ответ. Так технология становится операционной системой, а не кучей подписок.",
        ],
        takeaway: "Сохраняйте достаточно контекста, чтобы понимать, что повторять, что чинить и куда направить следующий доллар.",
      },
    ],
    references: "Источники",
  },
} as const;

function InsightsPage() {
  const { locale } = useLocale();
  const c = content[locale];
  const appUrl = estimatorUrl(locale, "insights");

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <SiteHeader />
      <main className="flex-1">
        <section className="section-pad border-b border-border bg-[#071a33] py-16 text-white sm:py-24">
          <div className="container-site max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#65a6ff]">{c.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">{c.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">{c.intro}</p>
          </div>
        </section>

        <nav className="section-pad border-b border-border bg-bg-elevated py-5" aria-label="Articles">
          <div className="container-site grid gap-3 md:grid-cols-3">
            {c.articles.map((article, index) => (
              <a key={article.id} href={`#${article.id}`} className="rounded-2xl border border-border bg-bg p-4 transition hover:border-accent/40">
                <span className="font-mono text-xs font-bold text-accent">0{index + 1} · 4 {c.min}</span>
                <span className="mt-2 block font-bold leading-snug text-fg">{article.title}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="section-pad">
          <div className="container-site max-w-4xl">
            {c.articles.map((article) => {
              const Icon = article.icon;
              return (
                <article key={article.id} id={article.id} className="scroll-mt-24 border-b border-border py-14 sm:py-20">
                  <div className="flex items-center gap-3 text-accent">
                    <Icon className="size-6" />
                    <span className="text-sm font-bold uppercase tracking-[0.18em]">{article.tag}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">{article.title}</h2>
                  <p className="mt-5 text-xl font-semibold leading-relaxed text-fg">{article.summary}</p>
                  <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
                    {article.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <blockquote className="mt-8 rounded-2xl border-l-4 border-accent bg-primary-soft p-5 text-lg font-bold text-fg">
                    {article.takeaway}
                  </blockquote>
                </article>
              );
            })}

            <section className="py-14 sm:py-20" aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="text-2xl font-bold text-fg">{c.references}</h2>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-muted">
                <p>
                  [1] Alex Hormozi, “Call your leads faster,” LinkedIn. The post describes one operator’s reported 60-second response process, 55% close rate, and 391% sales increase. <a className="font-bold text-accent underline underline-offset-4" href="https://www.linkedin.com/posts/alexhormozi_i-spoke-to-a-business-owner-who-gets-to-100-activity-7365057768468201472-dbkd" target="_blank" rel="noopener noreferrer">Open source</a>.
                </p>
                <p>
                  [2] James B. Oldroyd, Kristina McElheran, and David Elkington, “The Short Life of Online Sales Leads,” Harvard Business Review, March 2011. <a className="font-bold text-accent underline underline-offset-4" href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads" target="_blank" rel="noopener noreferrer">Open source</a>.
                </p>
              </div>
              <a href={appUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white transition hover:bg-primary active:scale-[0.97]">
                {c.estimator} <ArrowRight className="size-4" />
              </a>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
