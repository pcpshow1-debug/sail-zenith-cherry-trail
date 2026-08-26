import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "ru";

const STORAGE_KEY = "rhino-lab-locale";

type StageItem = { title: string; body: string };
type CrmPoint = { title: string; body: string };
type PlanCopy = {
  name: string;
  title: string;
  tag: string;
  cta: string;
  features: string[];
};
type ClipCopy = { label: string; detail: string };
type PainItem = { title: string; body: string };
type OldWayItem = { title: string; body: string };
type FaqItem = { q: string; a: string };

export type Messages = {
  seo: { title: string; description: string };
  nav: {
    problem: string;
    system: string;
    proof: string;
    pricing: string;
    about: string;
    tryEstimator: string;
    howItWorks: string;
    estimator: string;
    crm: string;
    content: string;
    faq: string;
  };
  legal: {
    terms: string;
    privacy: string;
    stub: string;
  };
  hero: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
    secondary: string;
    trust: string;
  };
  race: {
    kicker: string;
    title: string;
    titleAccent: string;
    sub: string;
    timer: string;
    messages: string;
    cold: string;
    won: string;
    instant: string;
    booked: string;
    now: string;
    preview: string;
    estimate: string;
    job: string;
    book: string;
    filed: string;
    pipeline: string;
    footer: string;
    footerWon: string;
    replay: string;
    tapSound: string;
    notifName: string;
    notifBody: string;
    cta: string;
  };
  story: {
    she: string;
    heKicker: string;
    heTitle: string;
    heLine: string;
    cta: string;
  };
  sell: {
    title: string;
    items: { title: string; body: string }[];
  };
  burn: {
    title: string;
    notWorking: string;
    model: string;
    ads: string;
    adsNote: string;
    smm: string;
    smmNote: string;
    sales: string;
    salesNote: string;
    site: string;
    siteNote: string;
    total: string;
  };
  leak: {
    kicker: string;
    title: string;
    note: string;
    steps: { t: string; line: string }[];
  };
  compete: {
    kicker: string;
    title: string;
    same: string;
    rhino: string;
    others: { name: string; time: string }[];
  };
  delay: {
    title: string;
    sub: string;
    oldLabel: string;
    newLabel: string;
    old: string[];
    neu: string[];
  };
  meet: { title: string; line: string; sub: string };
  steps3: { kicker: string; items: { n: string; title: string; body: string }[] };
  estBlock: { title: string; cta: string };
  crmSell: {
    title: string;
    call: string;
    name: string;
    job: string;
    size: string;
    extras: string;
    estimate: string;
    source: string;
    submitted: string;
  };
  follow: { title: string; items: string[] };
  roi: {
    title: string;
    avg: string;
    avgLabel: string;
    setup: string;
    setupLabel: string;
    line: string;
  };
  trust: {
    title: string;
    privacyTitle: string;
    privacy: string;
    cases: { who: string; note: string }[];
  };
  stories: {
    kicker: string;
    slides: { tab: string; title: string; body: string; cta: string }[];
    prev: string;
    next: string;
  };
  solution: {
    ask: string;
    line: string;
    what: string;
    keep: string;
    leads: string;
    noSystem: string;
    sleep: string;
  };
  estimatorJobs: {
    ask: string;
    find: string;
    tool: string;
    name: string;
    does: string;
    salesman: string;
    first: string;
    follow: string;
    website: string;
    remember: string;
    experience: string;
    upsell: string;
    upsellBody: string;
    crm: string;
    crmBody: string;
  };
  machine: {
    else: string;
    title: string;
    gen: string;
    why15: string;
    whyDaily: string;
    how: string;
    ai: string;
    multi: string;
    bridge: string;
    accounts: string;
    cadence: string;
    views: string;
    funnel: string;
  };
  pain: {
    kicker: string;
    title: string;
    line: string;
    items: PainItem[];
  };
  oldWay: {
    title: string;
    items: OldWayItem[];
  };
  howWorks: {
    kicker: string;
    title: string;
    body: string;
    live: string;
    content: string;
    estimator: string;
    module: string;
    closeup: string;
    angles: string;
    prev: string;
    next: string;
    hint: string;
    line: string;
    steps: string[];
  };
  system: { kicker: string; title: string; body: string; line: string };
  estimate: { body: string; cta: string };
  stages: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
    items: StageItem[];
  };
  content: {
    kicker: string;
    title: string;
    body: string;
    viewsLabel: string;
    personal: string;
    bullets: string[];
  };
  pipeline: { kicker: string; title: string; body: string };
  crm: {
    kicker: string;
    title: string;
    body: string;
    line: string;
    points: CrmPoint[];
  };
  pricing: {
    kicker: string;
    title: string;
    body: string;
    frame: string;
    setup: string;
    month: string;
    popular: string;
    startHere: string;
    whenReady: string;
    base: PlanCopy;
    pro: PlanCopy;
    ultimate: PlanCopy;
  };
  about: {
    kicker: string;
    name: string;
    p1: string;
    p2: string;
    years: string;
    yearsSub: string;
    clients: string;
    clientsSub: string;
    followers: string;
    followersSub: string;
    portfolio: string;
    portfolioBody: string;
    ready: string;
    cta: string;
    clips: ClipCopy[];
  };
  faq: { kicker: string; title: string; items: FaqItem[] };
  onboard: {
    title: string;
    steps: { title: string; body: string }[];
  };
  compare: string;
  crmHeading: string;
  contentHeading: string;
  tryDemo: string;
  orderPlan: string;
  close: { title: string; body: string; cta: string; talk: string };
  lead: {
    kicker: string;
    title: string;
    subtitle: string;
    successTitle: string;
    successBody: string;
    close: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    country: string;
    company: string;
    goals: string;
    goalsPlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
  };
  lang: { en: string; ru: string; switch: string };
  notFound: { title: string; body: string; home: string };
};

const en: Messages = {
  seo: {
    title:
      "Rhino Lab | Instant Contractor Estimator That Answers Leads in 60 Seconds",
    description:
      "Homeowners call 3–5 companies. The first clear price usually wins. Rhino Lab texts a branded estimate in under 60 seconds, then files the lead in your CRM. Built by David Zuev.",
  },
  nav: {
    problem: "The problem",
    system: "The system",
    proof: "Proof",
    pricing: "Pricing",
    about: "About",
    tryEstimator: "SEE LIVE DEMO →",
    howItWorks: "How it works",
    estimator: "Estimator",
    crm: "CRM",
    content: "AI content",
    faq: "FAQ",
  },
  legal: {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    stub: "This page is a placeholder. Final copy will be published here.",
  },
  hero: {
    kicker: "Rhino Lab",
    title: "Estimator + CRM + AI leads.",
    body: "A sales system for fence and home-service companies.",
    cta: "See a live estimate",
    secondary: "See plans",
    trust: "David Zuev · 7+ years · 200k+ followers",
  },
  race: {
    kicker: "RHINO LAB",
    title: "First to answer",
    titleAccent: "wins the job.",
    sub: "Instant estimator + CRM for home service businesses. Quote leads in under 60 seconds — before your competitor does.",
    timer: "TIME TO FIRST RESPONSE —",
    messages: "Messages",
    cold: "4 conversations going cold",
    won: "Rhino Lab won the job",
    instant: "Instant reply",
    booked: "Job booked",
    now: "now",
    preview: "Your vinyl fence estimate: $4,850–$5,600 →",
    estimate: "Your instant estimate",
    job: "Vinyl privacy fence · 150 linear ft · incl. 1 gate",
    book: "Book this job",
    filed: "Lead filed automatically.",
    pipeline: "+$5,200 added to the pipeline — zero follow-up needed.",
    footer: "Same homeowner. Same question. Sent to five companies at once.",
    footerWon:
      "While the others were still typing, Rhino Lab had already sent the estimate and booked the job.",
    replay: "Replay",
    tapSound: "Tap for sound",
    notifName: "Rhino Lab",
    notifBody: "Your vinyl fence estimate: $4,850–$5,600",
    cta: "SEE LIVE DEMO →",
  },
  story: {
    she: "Sarah picks her fence.",
    heKicker: "New lead",
    heTitle: "Sarah Chen. Cedar fence. $12,020.",
    heLine: "The order lands on his phone.",
    cta: "Try Rhino Lab Estimator",
  },
  sell: {
    title: "What we sell",
    items: [
      { title: "Instant estimator", body: "Price on their phone in 60 seconds." },
      { title: "Built-in CRM", body: "The lead lands in a card. Auto follow-up." },
      { title: "AI content", body: "Videos that bring traffic. You own it." },
    ],
  },
  burn: {
    title: "Traditional business",
    notWorking: "is not working anymore.",
    model: "This is what it costs every month.",
    ads: "Paid traffic",
    adsNote: "Facebook. Google. Meta. Thumbtack. Yelp.",
    smm: "SMM",
    smmNote: "/ month",
    sales: "Salesman",
    salesNote: "/ month",
    site: "Website",
    siteNote: "Upfront + monthly",
    total: "Every month. From almost nothing.",
  },
  leak: {
    kicker: "Where the lead dies",
    title: "60 seconds.",
    note: "Homeowners call 3–5 companies. The first clear price usually wins.",
    steps: [
      { t: "0s", line: "They tap you." },
      { t: "15s", line: "No price. They bounce." },
      { t: "45s", line: "Three other companies." },
      { t: "60s", line: "You lost them." },
    ],
  },
  compete: {
    kicker: "Same lead",
    title: "Your lead didn’t contact only you.",
    same: "Same homeowner. Same job. Five companies competing for it.",
    rhino: "Instant estimate — under 60 sec",
    others: [
      { name: "Company A", time: "15 min" },
      { name: "Company B", time: "1 hour" },
      { name: "Company C", time: "Tomorrow" },
      { name: "Company D", time: "No response" },
    ],
  },
  delay: {
    title: "You already paid for the lead.",
    sub: "Don’t lose it after the click.",
    oldLabel: "The delay",
    newLabel: "Rhino Lab",
    old: ["Paid traffic", "Lead", "Website", "Waiting", "Competitor wins"],
    neu: ["Paid traffic", "Rhino Lab", "Instant estimate", "CRM", "Sales alert", "Follow-up"],
  },
  meet: {
    title: "Meet Rhino Lab.",
    line: "Estimator + CRM + Follow-Up",
    sub: "Quote them. Capture them. Follow up.",
  },
  steps3: {
    kicker: "How it works",
    items: [
      { n: "01", title: "Customer gets an instant estimate", body: "Job type, size, options — a number on their phone." },
      { n: "02", title: "Rhino Lab captures the entire lead", body: "Name, phone, address, what they wanted. Filed. Not a voicemail." },
      { n: "03", title: "Your team knows who to call", body: "And exactly what they want — before the next company picks up." },
    ],
  },
  estBlock: {
    title: "Give them an answer while they’re still on your website.",
    cta: "TRY THE LIVE ESTIMATOR →",
  },
  crmSell: {
    title: "Your salesman shouldn’t start the call blind.",
    call: "Call them while they’re still thinking about the project.",
    name: "David Smith",
    job: "Cedar Fence",
    size: "180 LF",
    extras: "2 Gates",
    estimate: "$8,400–$9,600",
    source: "Google Ads",
    submitted: "34 sec ago",
  },
  follow: {
    title: "Didn’t book today? Don’t lose them tomorrow.",
    items: [
      "Estimate reminder",
      "Lead follow-up",
      "Sales notification",
      "CRM stage",
      "Customer history",
    ],
  },
  roi: {
    title: "Rhino Lab doesn’t need to transform your business. It only needs to save one job.",
    avg: "$7,500",
    avgLabel: "Average project",
    setup: "$950",
    setupLabel: "Rhino Base setup",
    line: "One recovered job can pay for Rhino Lab several times over.",
  },
  trust: {
    title: "Built for real home-service businesses.",
    privacyTitle: "Your business stays yours.",
    privacy: "Your leads. Your pricing. Your customer data. Never shared with another contractor.",
    cases: [
      { who: "Fence contractor — Seattle, WA", note: "Client name withheld by request" },
      { who: "Deck & outdoor living — Pacific Northwest", note: "Client name withheld by request" },
    ],
  },
  stories: {
    kicker: "The system",
    prev: "Previous",
    next: "Next",
    slides: [
      {
        tab: "Estimator",
        title: "They get a price. You get the lead.",
        body: "Job, materials, photos — while they are still on the phone.",
        cta: "Try the estimator",
      },
      {
        tab: "First touch",
        title: "Reply in 60 seconds.",
        body: "The company that sends a number first usually books the job.",
        cta: "See first touch",
      },
      {
        tab: "CRM",
        title: "Every lead on one card.",
        body: "Name, phone, address, what they wanted. Nothing on a sticky note.",
        cta: "See the CRM",
      },
      {
        tab: "Follow-up",
        title: "If they go quiet, we text.",
        body: "Five days of follow-up without you sitting in a dashboard.",
        cta: "Request a plan",
      },
    ],
  },
  solution: {
    ask: "What's the solution?",
    line: "If you want to survive, you have to adapt.",
    what: "The most modern stack for this job — estimator, CRM, AI content.",
    keep: "We don't remove your people. You just stop losing the leads you already paid for.",
    leads: "100+ leads in the system",
    noSystem: "No system. No business.",
    sleep: "Build the system that works while you sleep.",
  },
  estimatorJobs: {
    ask: "What's the solution?",
    find: "Try new tools.",
    tool: "Primary tool",
    name: "Try Rhino Lab Estimator.",
    does: "What it does",
    salesman: "Salesman job",
    first: "First contact. First 30 seconds. Most owners blow this.",
    follow: "Then it saves the lead. Writes. Reminds. Follow-up.",
    website: "Website job",
    remember: "You have to be remembered.",
    experience:
      "Introduces your inventory. Your brand. Your mascot. A beautiful experience — like a game.",
    upsell: "Warm-up / upsell",
    upsellBody: "Adds what you actually sell. Warms the lead before you call.",
    crm: "Built-in CRM",
    crmBody: "Saves the lead. Source, phone, email. Ready when you call.",
  },
  machine: {
    else: "What else",
    title: "Lead generator",
    gen: "Generate leads through content.",
    why15: "Why use one social media account when you can use 15?",
    whyDaily:
      "Why post one video per four days when you can post three videos every day on fifteen accounts?",
    how: "How the machine works",
    ai: "We generate content with AI. Educational and deep-explainer videos perform right now — they show expertise, not another sales ad.",
    multi:
      "Then we run it across multiple accounts with automatic posting, so you collect the maximum result.",
    bridge:
      "That's the estimator. If you also want the traffic — next.",
    accounts: "5 Instagram accounts. 5 TikTok accounts. 5 YouTube accounts.",
    cadence: "3 videos a day on each account.",
    views: "At least 150,000 organic views.",
    funnel:
      "All of it goes straight to your estimator link. The estimator catches every leak.",
  },
  pain: {
    kicker: "What is actually leaking money",
    title: "You are not losing to a better fence. You are losing to a faster reply.",
    line: "First reply usually gets the job.",
    items: [
      {
        title: "The voicemail graveyard",
        body: "They called. You were on a saw. By the time you listen, they already booked the next name on the list.",
      },
      {
        title: "The sticky-note CRM",
        body: "A name on a pad in the van is not a pipeline. No follow-up tonight means a cold lead tomorrow.",
      },
      {
        title: "The empty site visit",
        body: "You drive 40 minutes to a tire-kicker because nothing asked the budget, the timeline, or the material first.",
      },
    ],
  },
  oldWay: {
    title: "Traditional business is outdated",
    items: [
      {
        title: "You hire an SMM.",
        body: "Posts go out. Calls still don't.",
      },
      {
        title: "You build a website.",
        body: "It doesn't convert. It's outdated.",
      },
      {
        title: "You hire a filming crew.",
        body: "Mediocre job. Costs thousands.",
      },
      {
        title: "You pay targeted ads.",
        body: "Google. Meta. Thumbtack. Yelp. Thousands go in. Nothing goes out.",
      },
      {
        title: "Salesman doesn't follow up.",
        body: "No first touch. Lead goes to waste.",
      },
    ],
  },
  howWorks: {
    kicker: "How it works",
    title: "How the estimator works.",
    body: "They pick the job. They get a price. You get the lead — name, phone, address — while they are still on the phone.",
    live: "Full system",
    content: "Content engine",
    estimator: "Estimator engine",
    module: "Content generation",
    closeup: "Module close-up",
    angles: "Choose a view",
    prev: "Previous",
    next: "Next",
    hint: "Swipe left or right. The diagram fills the screen — no zoom sitting on top of it.",
    line: "Open it. Price it. File the lead.",
    steps: [
      "Homeowner opens your estimator.",
      "They pick the job and the size.",
      "Price lands in under 60 seconds.",
      "CRM files the lead instantly.",
      "You call first. You book it.",
    ],
  },
  system: {
    kicker: "The turn",
    title: "Missed a call?",
    body: "The system texts the homeowner back in under 60 seconds with a price estimate link. No app to open. No dashboard to check.",
    line: "They get a price. Instantly.",
  },
  estimate: {
    body: "Price on their phone now.",
    cta: "Let's Estimate",
  },
  stages: {
    kicker: "Inside the product",
    title: "Five stages. One path to the sale.",
    body: "Built for owners who cannot sit on a laptop all day. Every step happens while you run the job.",
    cta: "LET'S ESTIMATE",
    items: [
      {
        title: "First touch",
        body: "Homeowner submits address + job type. System pulls your pricing rules and returns an estimate range in under 60 seconds via SMS + link.",
      },
      {
        title: "Warm-up",
        body: "3–5 question flow (material, size, timeline) on the estimate page. Answers narrow the price and flag urgency.",
      },
      {
        title: "CRM info",
        body: "Name, phone, photos, job details write directly into CRM as a new lead card — no manual entry.",
      },
      {
        title: "Follow-up",
        body: "If they do not book within 24 hours, an automated SMS sequence fires (3 touches over 5 days). You get an alert if the lead goes cold.",
      },
      {
        title: "Money",
        body: "Qualified leads are marked sales-ready. You see deal value, contact info, and job details in one CRM card — ready to call and close.",
      },
    ],
  },
  content: {
    kicker: "Proof — not theory",
    title: "Content that generates real views.",
    body: "Educational and how-to clips that stop the scroll and send people into the estimator. The four below were built with AI.",
    viewsLabel: "views from just these four videos — almost half a billion",
    personal:
      "David Zuev's personal content: 200k+ followers, tens of millions of views per clip.",
    bullets: [
      "Explainers and job-site how-tos that feel native — not ads",
      "Built to post on Instagram, TikTok, and YouTube",
      "Content → estimator → sales-ready lead. One pipeline.",
    ],
  },
  pipeline: {
    kicker: "The engine",
    title: "Stop renting leads. Own the traffic.",
    body: "Angi and Facebook ads rent you a name. This machine posts, distributes, captures, and qualifies — without a marketing department.",
  },
  crm: {
    kicker: "Built-in CRM",
    title: "A lead you cannot see is a lead you already lost.",
    body: "Every estimator comes with its own CRM. No extra software. The lead files itself — source, job, contact — so you can call first.",
    line: "See the lead. Call first.",
    points: [
      {
        title: "Where they came from",
        body: "Facebook, Instagram, Google, your site. You know which channel paid.",
      },
      {
        title: "What they wanted",
        body: "Material, size, add-ons. You see what they were most interested in.",
      },
      {
        title: "Full contact",
        body: "Name, phone, email, address, Instagram. Ready the next time you need them.",
      },
      {
        title: "Started vs submitted",
        body: "Who opened the estimator. Who actually sent a lead.",
      },
      {
        title: "Pipeline value",
        body: "Dollar value of open work — not just a list of names.",
      },
      {
        title: "Follow-up already running",
        body: "First reply sent. Reminders scheduled. You don't chase a napkin.",
      },
    ],
  },
  pricing: {
    kicker: "Prices",
    title: "Two packages.",
    body: "Start with Base. Step up to Pro when the journey should feel like a salesman.",
    frame:
      "Base captures the lead. Pro becomes your digital salesman.",
    setup: "Setup",
    month: "/month",
    popular: "Start here",
    startHere: "Stop losing leads.",
    whenReady: "The full sales experience",
    base: {
      name: "Rhino Base",
      title: "Stop losing leads.",
      tag: "Stop losing leads.",
      cta: "START WITH BASE",
      features: [
        "Branded Instant Estimator",
        "Built-in CRM",
        "Your Pricing & Services",
        "Lead Capture & Tracking",
        "Instant Estimates",
        "Automated Follow-Up",
        "Customer Analytics",
      ],
    },
    pro: {
      name: "Rhino Pro",
      title: "Turn your entire customer journey into a sales experience.",
      tag: "Turn your entire customer journey into a sales experience.",
      cta: "START WITH PRO",
      features: [
        "Everything in Rhino Base",
        "Custom AI Mascot",
        "Animated Mascot Experience",
        "Full Website Experience",
        "Advanced Lead Qualification",
        "Automated First Sales Touch",
        "Advanced CRM & Analytics",
      ],
    },
    ultimate: {
      name: "Ultimate Lead Generator",
      title: "Generate the lead. Then close it.",
      tag: "Content, distribution, estimator, CRM — the full machine.",
      cta: "GO ULTIMATE",
      features: [
        "Everything in Rhino Pro",
        "AI Content Generation",
        "Automatic Multi-Platform Distribution",
        "15 Social Media Accounts",
        "Organic + Paid Traffic Integration",
        "Video Performance Analysis",
        "Lead Source Attribution",
        "Continuous Optimization",
      ],
    },
  },
  about: {
    kicker: "Founder",
    name: "David Zuev",
    p1: "Built inside real home-service operations — not in a startup incubator.",
    p2: "Rhino Lab comes from real sales, marketing, lead-generation, and contractor-business experience. Not from a slide deck.",
    years: "7+ years",
    yearsSub: "in the field",
    clients: "Hundreds",
    clientsSub: "of clients",
    followers: "200k+",
    followersSub: "followers",
    portfolio: "Portfolio · clients & personal brand",
    portfolioBody:
      "Real work for real businesses — plus a personal brand that already pulls tens of millions of views per clip.",
    ready: "Ready to stop losing leads?",
    cta: "TRY ESTIMATOR",
    clips: [
      {
        label: "Personal brand",
        detail: "@david_zuev · millions of views per clip",
      },
      {
        label: "Optima Fence & Deck",
        detail: "Fence company · organic content engine",
      },
      {
        label: "Beauty salon",
        detail: "Client content · tech & services",
      },
      {
        label: "Custom furniture",
        detail: "Workshop · epoxy tables & high-end pieces",
      },
    ],
  },
  faq: {
    kicker: "FAQ",
    title: "What owners ask before they buy.",
    items: [
      {
        q: "How accurate are the estimates?",
        a: "They follow your price book. Ranges, not a binding contract. Final price is still yours after the site visit.",
      },
      {
        q: "Can I change my prices?",
        a: "Yes. Materials, labor, add-ons — you update the book. The estimator uses what you set.",
      },
      {
        q: "Can Rhino Lab work with my existing website?",
        a: "Yes. The estimator is a link. Put it on your site, ads, or bio. You don’t have to rebuild everything.",
      },
      {
        q: "Do I need to replace my current CRM?",
        a: "No. Every estimator includes a built-in CRM. Keep your old one if you want — most owners just use this card.",
      },
      {
        q: "Who owns the customer data?",
        a: "You do. Leads, pricing, customer records stay yours. We don’t sell them and we don’t share them with another contractor.",
      },
      {
        q: "Can my sales team access the leads?",
        a: "Yes. The card is built for the person who picks up the phone.",
      },
      {
        q: "Can customers still book an on-site estimate?",
        a: "Yes. The instant number gets them talking. The visit still closes the real job.",
      },
      {
        q: "How long does setup take?",
        a: "We talk, we build, leads land. Most Base setups are days, not months.",
      },
      {
        q: "Can this work for decks, roofing, landscaping, HVAC, and other home services?",
        a: "Yes. If you quote from a price book, we can put that book on autopilot.",
      },
      {
        q: "What if the final project price changes after an on-site visit?",
        a: "That’s normal. The estimator is the first answer, not the last invoice.",
      },
    ],
  },
  onboard: {
    title: "After you pay",
    steps: [
      { title: "We talk.", body: "15 minutes. Your trade, your prices, your town." },
      { title: "We build.", body: "Estimator, CRM, your brand. You do not sit in a dashboard." },
      { title: "Leads land.", body: "They get a price. You get a card. Follow-up runs itself." },
    ],
  },
  compare: "The old stack burns $30,000+ a month. Rhino starts at $950.",
  crmHeading: "The lead lands in a card",
  contentHeading: "AI videos. Real views.",
  tryDemo: "TRY THE LIVE ESTIMATOR →",
  orderPlan: "Request this plan",
  close: {
    title: "Your next lead is probably asking another contractor too.",
    body: "Give them an answer before your competitor does.",
    cta: "BUILD MY RHINO LAB →",
    talk: "Talk to Rhino Lab",
  },
  lead: {
    kicker: "Rhino Lab",
    title: "Tell us about the company.",
    subtitle: "Name, trade, city. We reply with the plan that fits — Base, Pro, or Ultimate.",
    successTitle: "Got it.",
    successBody: "We have the details. Rhino Lab will reach out.",
    close: "Close",
    firstName: "First name *",
    lastName: "Last name *",
    phone: "Phone *",
    email: "Email *",
    city: "City *",
    state: "State *",
    country: "Country *",
    company: "Company name *",
    goals: "What do you want this to do? *",
    goalsPlaceholder: "Trade, crew size, where leads die today…",
    submit: "Send",
    submitting: "Sending…",
    privacy: "Used only to talk to you about Rhino Lab.",
  },
  lang: { en: "EN", ru: "RU", switch: "Language" },
  notFound: {
    title: "This page isn’t here.",
    body: "The estimator is. Try that — or go home.",
    home: "Back to Rhino Lab",
  },
};

const ru: Messages = {
  seo: {
    title:
      "Rhino Lab | Мгновенный оценщик для подрядчиков — ответ лиду за 60 секунд",
    description:
      "Клиент звонит в 3–5 компаний. Обычно берёт работу тот, кто первым дал цену. Rhino Lab шлёт смету за 60 секунд и кладёт лид в CRM. Сделано David Zuev.",
  },
  nav: {
    problem: "Проблема",
    system: "Система",
    proof: "Доказательства",
    pricing: "Цены",
    about: "О нас",
    tryEstimator: "СМОТРЕТЬ ДЕМО →",
    howItWorks: "Как это работает",
    estimator: "Оценщик",
    crm: "CRM",
    content: "AI-контент",
    faq: "FAQ",
  },
  legal: {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    stub: "Это заглушка. Финальный текст опубликуем отдельно.",
  },
  hero: {
    kicker: "Rhino Lab",
    title: "Смета + CRM + AI-лиды.",
    body: "Система продаж для заборов и home-service.",
    cta: "Посмотреть живую смету",
    secondary: "Пакеты",
    trust: "David Zuev · 7+ лет · 200k+ подписчиков",
  },
  race: {
    kicker: "RHINO LAB",
    title: "Первый ответ",
    titleAccent: "забирает работу.",
    sub: "Мгновенный оценщик + CRM для home-service. Смета лиду меньше чем за 60 секунд — раньше конкурента.",
    timer: "ВРЕМЯ ДО ПЕРВОГО ОТВЕТА —",
    messages: "Сообщения",
    cold: "4 переписки остывают",
    won: "Rhino Lab взял работу",
    instant: "Мгновенно",
    booked: "Забрали",
    now: "сейчас",
    preview: "Смета на виниловый забор: $4,850–$5,600 →",
    estimate: "Мгновенная смета",
    job: "Виниловый забор · 150 футов · 1 калитка",
    book: "Забронировать",
    filed: "Лид уже в CRM.",
    pipeline: "+$5,200 в воронке — без единого звонка.",
    footer: "Один клиент. Один вопрос. Пяти компаниям сразу.",
    footerWon:
      "Пока остальные ещё печатали, Rhino Lab уже отправил смету и закрыл работу.",
    replay: "Ещё раз",
    tapSound: "Звук",
    notifName: "Rhino Lab",
    notifBody: "Смета на виниловый забор: $4,850–$5,600",
    cta: "СМОТРЕТЬ ДЕМО →",
  },
  story: {
    she: "Сара выбирает забор.",
    heKicker: "Новый лид",
    heTitle: "Sarah Chen. Кедр. $12,020.",
    heLine: "Заказ приходит ему на телефон.",
    cta: "Try Rhino Lab Estimator",
  },
  sell: {
    title: "Что продаём",
    items: [
      { title: "Мгновенная смета", body: "Цена у клиента за 60 секунд." },
      { title: "Своя CRM", body: "Лид падает в карточку. Дожим сам." },
      { title: "AI-контент", body: "Видео, которые ведут трафик. Ваши." },
    ],
  },
  burn: {
    title: "Традиционный бизнес",
    notWorking: "больше не работает.",
    model: "Вот сколько это стоит каждый месяц.",
    ads: "Таргет",
    adsNote: "Facebook. Google. Meta. Thumbtack. Yelp.",
    smm: "SMM",
    smmNote: "/ месяц",
    sales: "Продажник",
    salesNote: "/ месяц",
    site: "Сайт",
    siteNote: "Сразу + каждый месяц",
    total: "Каждый месяц. Почти ни за что.",
  },
  leak: {
    kicker: "Где умирает лид",
    title: "60 секунд.",
    note: "Хозяин звонит в 3–5 компаний. Обычно берёт того, кто первый дал цену.",
    steps: [
      { t: "0с", line: "Нажал на вас." },
      { t: "15с", line: "Нет цены. Ушёл." },
      { t: "45с", line: "Ещё три компании." },
      { t: "60с", line: "Лид ваш — уже нет." },
    ],
  },
  compete: {
    kicker: "Тот же лид",
    title: "Лид написал не только вам.",
    same: "Один хозяин. Одна работа. Пять компаний на неё.",
    rhino: "Мгновенная смета — до 60 сек",
    others: [
      { name: "Компания A", time: "15 мин" },
      { name: "Компания B", time: "1 час" },
      { name: "Компания C", time: "Завтра" },
      { name: "Компания D", time: "Нет ответа" },
    ],
  },
  delay: {
    title: "За лид вы уже заплатили.",
    sub: "Не теряйте его после клика.",
    oldLabel: "Пауза",
    newLabel: "Rhino Lab",
    old: ["Трафик", "Лид", "Сайт", "Ожидание", "Конкурент берёт"],
    neu: ["Трафик", "Rhino Lab", "Смета сразу", "CRM", "Алерт сейлу", "Дожим"],
  },
  meet: {
    title: "Meet Rhino Lab.",
    line: "Estimator + CRM + Follow-Up",
    sub: "Смета. Захват. Дожим.",
  },
  steps3: {
    kicker: "Как это работает",
    items: [
      { n: "01", title: "Клиент получает смету сразу", body: "Тип работы, размер, опции — цифра в телефоне." },
      { n: "02", title: "Rhino Lab забирает весь лид", body: "Имя, телефон, адрес, что хотели. В карточке. Не на автоответчике." },
      { n: "03", title: "Команда знает, кому звонить", body: "И что именно нужно — до того, как возьмёт сосед." },
    ],
  },
  estBlock: {
    title: "Ответьте, пока они ещё на вашем сайте.",
    cta: "ПОПРОБОВАТЬ ОЦЕНЩИК →",
  },
  crmSell: {
    title: "Продажник не должен звонить вслепую.",
    call: "Звоните, пока они ещё думают об этом проекте.",
    name: "David Smith",
    job: "Cedar Fence",
    size: "180 LF",
    extras: "2 Gates",
    estimate: "$8,400–$9,600",
    source: "Google Ads",
    submitted: "34 сек назад",
  },
  follow: {
    title: "Не записались сегодня? Не теряйте завтра.",
    items: [
      "Напоминание о смете",
      "Дожим лида",
      "Уведомление сейлу",
      "Стадия в CRM",
      "История клиента",
    ],
  },
  roi: {
    title: "Rhino Lab не обязан перестроить бизнес. Достаточно спасти одну работу.",
    avg: "$7,500",
    avgLabel: "Средний заказ",
    setup: "$950",
    setupLabel: "Запуск Rhino Base",
    line: "Одна возвращённая работа окупает Rhino Lab несколько раз.",
  },
  trust: {
    title: "Для живых home-service компаний.",
    privacyTitle: "Бизнес остаётся ваш.",
    privacy: "Ваши лиды. Ваши цены. Ваши данные. Никогда не отдаём другому подрядчику.",
    cases: [
      { who: "Fence contractor — Seattle, WA", note: "Имя клиента скрыто по просьбе" },
      { who: "Deck & outdoor living — Pacific Northwest", note: "Имя клиента скрыто по просьбе" },
    ],
  },
  stories: {
    kicker: "Система",
    prev: "Назад",
    next: "Дальше",
    slides: [
      {
        tab: "Оценщик",
        title: "Им — цена. Тебе — лид.",
        body: "Работа, материалы, фото — пока они ещё в телефоне.",
        cta: "Попробовать оценщик",
      },
      {
        tab: "Первый контакт",
        title: "Ответ за 60 секунд.",
        body: "Кто первый дал цифру — тот обычно и берёт заказ.",
        cta: "Как это выглядит",
      },
      {
        tab: "CRM",
        title: "Каждый лид на одной карточке.",
        body: "Имя, телефон, адрес, что хотели. Не стикер в фургоне.",
        cta: "Смотреть CRM",
      },
      {
        tab: "Дожим",
        title: "Замолчали — пишем сами.",
        body: "Пять дней follow-up без дашборда.",
        cta: "Запросить план",
      },
    ],
  },
  solution: {
    ask: "What's the solution?",
    line: "If you want to survive, you have to adapt.",
    what: "Современный стек: смета, CRM, AI-контент.",
    keep: "Людей не убираем. Просто перестаёте терять лиды, за которые уже заплатили.",
    leads: "100+ лидов в системе",
    noSystem: "No system. No business.",
    sleep: "Build the system that works while you sleep.",
  },
  estimatorJobs: {
    ask: "What's the solution?",
    find: "Try new tools.",
    tool: "Главный инструмент",
    name: "Try Rhino Lab Estimator.",
    does: "Что он делает",
    salesman: "Salesman job",
    first: "Первый контакт. Первые 30 секунд. Это профукивают чаще всего.",
    follow: "Потом сохраняет лид. Пишет. Напоминает. Follow-up.",
    website: "Website job",
    remember: "You have to be remembered.",
    experience:
      "Знакомит с инвентарём. Твой бренд. Твой маскот. Кайф — как игра.",
    upsell: "Warm-up / upsell",
    upsellBody: "Добавляет то, что ты реально продаёшь. Прогревает до звонка.",
    crm: "Built-in CRM",
    crmBody: "Сохраняет лид. Источник, телефон, email. Готов, когда звонишь.",
  },
  machine: {
    else: "What else",
    title: "Lead generator",
    gen: "Generate leads through content.",
    why15: "Зачем один аккаунт, если можно 15?",
    whyDaily:
      "Зачем одно видео раз в четыре дня, если можно три видео каждый день на пятнадцати аккаунтах?",
    how: "How the machine works",
    ai: "Мы генерируем контент через ИИ. Сейчас хорошо заходит познавательное и глубоко объясняющее — это экспертность, не очередная продажа.",
    multi:
      "Потом крутим это на нескольких аккаунтах с автопостингом, чтобы собрать максимум.",
    bridge: "Это estimator. Если нужен ещё и трафик — дальше.",
    accounts: "5 аккаунтов Instagram. 5 TikTok. 5 YouTube.",
    cadence: "По 3 видео в день на каждом.",
    views: "Минимум 150 000 органических просмотров.",
    funnel:
      "Весь трафик идёт на ссылку estimator. Estimator ловит каждую утечку.",
  },
  pain: {
    kicker: "Где реально утекают деньги",
    title: "Вы проигрываете не лучшему забору. Вы проигрываете более быстрому ответу.",
    line: "Кто ответил первым — тот берёт.",
    items: [
      {
        title: "Кладбище голосовых",
        body: "Они позвонили. Вы были на пиле. Пока дослушали — они уже записались к следующему в списке.",
      },
      {
        title: "CRM на стикере",
        body: "Имя на бумажке в фургоне — это не воронка. Нет дожима вечером — утром лид уже холодный.",
      },
      {
        title: "Пустой выезд",
        body: "40 минут в одну сторону к человеку «просто посмотреть», потому что никто не спросил бюджет, сроки и материал.",
      },
    ],
  },
  oldWay: {
    title: "Традиционный бизнес устарел",
    items: [
      {
        title: "Нанимаете SMM.",
        body: "Посты выходят. Звонков всё равно нет.",
      },
      {
        title: "Делаете сайт.",
        body: "Он не конвертит. Он устарел.",
      },
      {
        title: "Нанимаете съёмочную группу.",
        body: "Средняя работа. Стоит тысячи.",
      },
      {
        title: "Платите за таргет.",
        body: "Google. Meta. Thumbtack. Yelp. Тысячи входят. Наружу — ничего.",
      },
      {
        title: "Продавец не перезванивает.",
        body: "Нет первого касания. Лид сгорает.",
      },
    ],
  },
  howWorks: {
    kicker: "Как это работает",
    title: "Как работает эстиматор.",
    body: "Клиент выбирает работу. Получает цену. Ты получаешь лид — имя, телефон, адрес — пока он ещё в телефоне.",
    live: "Вся система",
    content: "Контент-двигатель",
    estimator: "Двигатель оценщика",
    module: "Генерация контента",
    closeup: "Модуль крупно",
    angles: "Выберите ракурс",
    prev: "Назад",
    next: "Дальше",
    hint: "Листай влево-вправо. Схема на весь экран — без зума поверх.",
    line: "Открыл. Получил цену. Лид в CRM.",
    steps: [
      "Клиент открывает твой estimator.",
      "Выбирает работу и размер.",
      "Цена за 60 секунд.",
      "CRM сразу пишет лид.",
      "Ты звонишь первым. Закрываешь.",
    ],
  },
  system: {
    kicker: "Поворот",
    title: "Пропустили звонок?",
    body: "Система пишет клиенту за 60 секунд и присылает ссылку на смету. Не нужно открывать приложение и смотреть дашборд.",
    line: "Они получают цену. Сразу.",
  },
  estimate: {
    body: "Цена у них на телефоне.",
    cta: "Давайте оценим",
  },
  stages: {
    kicker: "Внутри продукта",
    title: "Пять этапов. Один путь к сделке.",
    body: "Для владельцев, которые не сидят за ноутбуком весь день. Каждый шаг идёт, пока вы на объекте.",
    cta: "ДАВАЙТЕ ОЦЕНИМ",
    items: [
      {
        title: "Первое касание",
        body: "Клиент указывает адрес и тип работы. Система берёт ваши прайсы и за 60 секунд присылает диапазон цены по SMS + ссылке.",
      },
      {
        title: "Прогрев",
        body: "На странице сметы 3–5 вопросов (материал, размер, сроки). Ответы сужают цену и показывают срочность.",
      },
      {
        title: "Данные в CRM",
        body: "Имя, телефон, фото и детали работы сразу становятся карточкой лида в CRM — без ручного ввода.",
      },
      {
        title: "Дожим",
        body: "Если за 24 часа нет записи, уходит авто-SMS (3 касания за 5 дней). Владелец получает алерт, если лид остывает.",
      },
      {
        title: "Деньги",
        body: "После квалификации лид помечается «готов к продаже». В одной карточке CRM — сумма, контакты и детали работы.",
      },
    ],
  },
  content: {
    kicker: "Доказательства — не теория",
    title: "Контент, который даёт живые просмотры.",
    body: "Обучающий контент, который останавливает скролл и ведёт людей в оценщик. Четыре ролика ниже сделаны с AI.",
    viewsLabel: "просмотров только у этих четырёх роликов — почти полмиллиарда",
    personal:
      "Личный контент David Zuev: 200k+ подписчиков, десятки миллионов просмотров на ролик.",
    bullets: [
      "Объяснялки и how-to с объекта — выглядят нативно, не как реклама",
      "Под публикацию в Instagram, TikTok и YouTube",
      "Контент → оценщик → лид к продаже. Одна воронка.",
    ],
  },
  pipeline: {
    kicker: "Двигатель",
    title: "Хватит арендовать лиды. Заберите трафик себе.",
    body: "Angi и реклама в Facebook сдают вам имя в аренду. Эта машина публикует, распределяет, ловит и квалифицирует — без отдела маркетинга.",
  },
  crm: {
    kicker: "Встроенная CRM",
    title: "Лид, которого не видно — уже потерянный лид.",
    body: "В каждом estimator — своя CRM. Без отдельного софта. Лид пишется сам — источник, работа, контакты — чтобы ты звонил первым.",
    line: "Видишь лид. Звонишь первым.",
    points: [
      {
        title: "Откуда пришёл",
        body: "Facebook, Instagram, Google, сайт. Видно, какой канал заплатил.",
      },
      {
        title: "Что хотел",
        body: "Материал, размер, опции. Чем интересовался больше всего.",
      },
      {
        title: "Все контакты",
        body: "Имя, телефон, email, адрес, Instagram. Готово, когда снова понадобится.",
      },
      {
        title: "Старт vs отправка",
        body: "Кто открыл estimator. Кто реально оставил лид.",
      },
      {
        title: "Стоимость воронки",
        body: "Доллары открытых сделок — не просто список имён.",
      },
      {
        title: "Дожим уже идёт",
        body: "Первый ответ ушёл. Напоминания стоят. Не гоняешься за салфеткой.",
      },
    ],
  },
  pricing: {
    kicker: "Цены",
    title: "Два пакета.",
    body: "Начните с Base. Pro — когда весь путь клиента должен продавать.",
    frame:
      "Base ловит лид. Pro становится цифровым продавцом.",
    setup: "Setup",
    month: "/мес",
    popular: "Начни отсюда",
    startHere: "Перестаньте терять лиды.",
    whenReady: "Весь путь как продажа",
    base: {
      name: "Rhino Base",
      title: "Перестаньте терять лиды.",
      tag: "Перестаньте терять лиды.",
      cta: "НАЧАТЬ С BASE",
      features: [
        "Брендированный мгновенный оценщик",
        "Встроенная CRM",
        "Ваши цены и услуги",
        "Захват и трекинг лидов",
        "Мгновенные оценки",
        "Автодожим",
        "Аналитика клиентов",
      ],
    },
    pro: {
      name: "Rhino Pro",
      title: "Весь путь клиента — как отдел продаж.",
      tag: "Весь путь клиента — как отдел продаж.",
      cta: "НАЧАТЬ С PRO",
      features: [
        "Всё из Rhino Base",
        "Кастомный AI-маскот",
        "Анимированный маскот",
        "Полноценный сайт",
        "Продвинутая квалификация лидов",
        "Автоматический первый касание продаж",
        "Продвинутая CRM и аналитика",
      ],
    },
    ultimate: {
      name: "Ultimate Lead Generator",
      title: "Сгенерируйте лид. Потом закройте его.",
      tag: "Контент, дистрибуция, оценщик, CRM — вся машина.",
      cta: "ВЗЯТЬ ULTIMATE",
      features: [
        "Всё из Rhino Pro",
        "Генерация AI-контента",
        "Авто-дистрибуция на площадки",
        "15 аккаунтов соцсетей",
        "Органика + платная реклама",
        "Анализ эффективности видео",
        "Атрибуция источников лидов",
        "Постоянная оптимизация",
      ],
    },
  },
  about: {
    kicker: "Основатель",
    name: "David Zuev",
    p1: "Собрано внутри живого home-service — не в инкубаторе стартапов.",
    p2: "Rhino Lab вырос из реальных продаж, маркетинга, лидов и работы подрядчика. Не из слайда.",
    years: "7+ лет",
    yearsSub: "в деле",
    clients: "Сотни",
    clientsSub: "клиентов",
    followers: "200k+",
    followersSub: "подписчиков",
    portfolio: "Портфолио · клиенты и личный бренд",
    portfolioBody:
      "Реальная работа для реального бизнеса — плюс личный бренд с десятками миллионов просмотров на ролик.",
    ready: "Готовы перестать терять лиды?",
    cta: "ПОПРОБОВАТЬ",
    clips: [
      {
        label: "Личный бренд",
        detail: "@david_zuev · миллионы просмотров на ролик",
      },
      {
        label: "Optima Fence & Deck",
        detail: "Fence-компания · органический контент",
      },
      {
        label: "Салон красоты",
        detail: "Клиентский контент · tech & services",
      },
      {
        label: "Мебель на заказ",
        detail: "Мастерская · epoxy-столы и премиум",
      },
    ],
  },
  faq: {
    kicker: "FAQ",
    title: "Что спрашивают перед покупкой.",
    items: [
      {
        q: "Насколько точные сметы?",
        a: "По вашей книге цен. Диапазон, не договор. Финальную цену ставите вы после выезда.",
      },
      {
        q: "Можно менять цены?",
        a: "Да. Материалы, работа, опции — вы правите книгу. Оценщик берёт то, что вы задали.",
      },
      {
        q: "Сработает с моим сайтом?",
        a: "Да. Это ссылка. На сайт, в рекламу, в био. Весь сайт переделывать не надо.",
      },
      {
        q: "Надо менять текущую CRM?",
        a: "Нет. В каждом оценщике уже своя CRM. Старую можно оставить — чаще хватает этой карточки.",
      },
      {
        q: "Кому принадлежат данные клиентов?",
        a: "Вам. Лиды, цены, записи — ваши. Мы не продаём и не отдаём другому подрядчику.",
      },
      {
        q: "Команда продаж видит лиды?",
        a: "Да. Карточка для того, кто берёт трубку.",
      },
      {
        q: "Клиент всё ещё может вызвать замерщика?",
        a: "Да. Цифра на телефоне открывает разговор. Выезд закрывает работу.",
      },
      {
        q: "Сколько занимает запуск?",
        a: "Созвон, сборка, лиды. Base — дни, не месяцы.",
      },
      {
        q: "Подойдёт для террас, крыш, ландшафта, HVAC и другого home-service?",
        a: "Да. Если считаете по прайсу — этот прайс можно поставить на автомат.",
      },
      {
        q: "Если после выезда цена изменится?",
        a: "Так и бывает. Оценщик — первый ответ, не последний счёт.",
      },
    ],
  },
  onboard: {
    title: "После оплаты",
    steps: [
      { title: "Созвон.", body: "15 минут. Ваш профиль, ваши цены, ваш город." },
      { title: "Сборка.", body: "Оценщик, CRM, ваш бренд. Дашборд вам не нужен." },
      { title: "Лиды.", body: "Им — цена. Вам — карточка. Дожим идёт сам." },
    ],
  },
  compare: "Старый стек сжигает $30,000+ в месяц. Rhino — от $950.",
  crmHeading: "Лид сам падает в карточку",
  contentHeading: "AI-видео. Живые просмотры.",
  tryDemo: "ПОПРОБОВАТЬ ОЦЕНЩИК →",
  orderPlan: "Запросить этот план",
  close: {
    title: "Следующий лид, скорее всего, уже спрашивает другого подрядчика.",
    body: "Дайте ответ раньше конкурента.",
    cta: "BUILD MY RHINO LAB →",
    talk: "Написать в Rhino Lab",
  },
  lead: {
    kicker: "Rhino Lab",
    title: "Расскажите о компании.",
    subtitle: "Имя, профиль, город. Ответим планом — Base, Pro или Ultimate.",
    successTitle: "Принято.",
    successBody: "Данные получили. Rhino Lab свяжется.",
    close: "Закрыть",
    firstName: "Имя *",
    lastName: "Фамилия *",
    phone: "Телефон *",
    email: "Email *",
    city: "Город *",
    state: "Штат / регион *",
    country: "Страна *",
    company: "Название компании *",
    goals: "Что система должна сделать? *",
    goalsPlaceholder: "Профиль, размер бригады, где сейчас умирают лиды…",
    submit: "Отправить",
    submitting: "Отправка…",
    privacy: "Данные только чтобы связаться по Rhino Lab.",
  },
  lang: { en: "EN", ru: "RU", switch: "Язык" },
  notFound: {
    title: "Такой страницы нет.",
    body: "Оценщик на месте. Попробуй его — или на главную.",
    home: "На главную Rhino Lab",
  },
};

const catalog: Record<Locale, Messages> = { en, ru };

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
};

const LocaleContext = createContext<LocaleCtx | null>(null);

function readStored(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "ru" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStored());
    setReady(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "ru" ? "ru" : "en";
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "ru" ? "ru" : "en";
  }, [locale, ready]);

  const value = useMemo(
    () => ({ locale, setLocale, t: catalog[locale] }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return ctx;
}
