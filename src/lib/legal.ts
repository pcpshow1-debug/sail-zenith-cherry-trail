import { CONTACT_EMAIL, SITE_ORIGIN } from "@/lib/social";

export type LegalSection = { heading: string; body: string[] };

export const TERMS_UPDATED = "August 18, 2026";
export const PRIVACY_UPDATED = "August 18, 2026";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "1. Who we are",
    body: [
      `These Terms of Service (“Terms”) govern your use of ${SITE_ORIGIN}, the Rhino Lab estimator at app.rhinolab.app, and related products (together, the “Service”). The Service is operated by David Zuev doing business as Rhino Lab (“Rhino Lab,” “we,” “us”).`,
      `Contact: ${CONTACT_EMAIL}`,
    ],
  },
  {
    heading: "2. The Service",
    body: [
      "Rhino Lab provides branded instant estimating tools, lead capture, CRM, and related sales software for home-service businesses. Features depend on the plan you purchase. We may update, add, or remove features.",
      "The estimator produces estimated ranges, not a binding quote. Final job price is set by you after an on-site visit or your own process.",
    ],
  },
  {
    heading: "3. Accounts and eligibility",
    body: [
      "You must be at least 18 and able to form a contract. You are responsible for your login, team access, and all activity under your account. Tell us promptly if you think access was used without permission.",
    ],
  },
  {
    heading: "4. Plans, payment, and refunds",
    body: [
      "Setup fees and monthly fees are listed on the pricing page at the time of order. Monthly fees renew until you cancel. Taxes may apply.",
      "Setup work starts after payment. Setup fees are generally non-refundable once work begins. Unused prepaid months may be refunded at our discretion if you cancel before the next billing date and we have not already incurred non-recoverable costs.",
      "We may change prices with notice before the next renewal. If a payment fails, we may suspend the Service until it is current.",
    ],
  },
  {
    heading: "5. Your content and leads",
    body: [
      "You own your business data: pricing, services, branding, lead records, and customer information you put into the Service. You grant us a limited license to host and process that data only to run the Service for you.",
      "You are responsible for having the right to collect and use homeowner/lead information under applicable law (including TCPA, CAN-SPAM, and state privacy laws). Do not upload data you are not allowed to use.",
    ],
  },
  {
    heading: "6. Acceptable use",
    body: [
      "Do not misuse the Service: no illegal activity, spam, malware, scraping other customers, reverse engineering except as allowed by law, or using the estimator to impersonate another company without authorization.",
      "We may suspend or terminate accounts that break these Terms or create legal or security risk.",
    ],
  },
  {
    heading: "7. Third-party services",
    body: [
      "The Service may link to or work with third parties (payments, hosting, analytics, social platforms, SMS/email). Those services have their own terms. We are not responsible for their outages or policies.",
    ],
  },
  {
    heading: "8. Disclaimer",
    body: [
      "THE SERVICE IS PROVIDED “AS IS.” We do not warrant uninterrupted or error-free operation, or that estimates will match your final job cost or conversion rates. You remain responsible for your sales, jobs, and customer communications.",
    ],
  },
  {
    heading: "9. Limitation of liability",
    body: [
      "To the maximum extent allowed by law, Rhino Lab and David Zuev are not liable for lost profits, lost leads, lost data, or indirect, incidental, or consequential damages. Our total liability for any claim is limited to the fees you paid us in the 3 months before the claim.",
    ],
  },
  {
    heading: "10. Indemnity",
    body: [
      "You will defend and indemnify Rhino Lab against claims arising from your use of the Service, your customer communications, your pricing, or your violation of these Terms or the law.",
    ],
  },
  {
    heading: "11. Termination",
    body: [
      "You may stop using the Service at any time. We may terminate or suspend access for breach, non-payment, or if we discontinue the product. After termination we may delete your data after a reasonable retention period unless law requires us to keep it.",
    ],
  },
  {
    heading: "12. Changes",
    body: [
      "We may update these Terms. The “Last updated” date will change. Continued use after an update means you accept the new Terms. If you do not agree, stop using the Service.",
    ],
  },
  {
    heading: "13. Governing law",
    body: [
      "These Terms are governed by the laws of the State of Washington, USA, without regard to conflict-of-law rules. Courts in King County, Washington have exclusive jurisdiction, except where applicable consumer law says otherwise.",
    ],
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "1. Who we are",
    body: [
      `This Privacy Policy explains how Rhino Lab / David Zuev (“we,” “us”) collects and uses information on ${SITE_ORIGIN}, app.rhinolab.app, and related tools.`,
      `Questions: ${CONTACT_EMAIL}`,
    ],
  },
  {
    heading: "2. Information we collect",
    body: [
      "Contact and lead forms: first name, last name, phone, email, city, state, country, company name, and what you want the system to do.",
      "Estimator use (your customers): project details they enter (fence type, length, options), contact info they submit to book a visit, and the estimate shown.",
      "Automatically: IP address, browser, device, pages/slides viewed, time on page, referring site, and UTM / ad campaign parameters (for example Facebook or Instagram).",
      "We do not ask for Social Security numbers, payment card numbers on this marketing site, or precise GPS unless a tool you use later requires an address you type in.",
    ],
  },
  {
    heading: "3. How we use it",
    body: [
      "To reply to inquiries and sell or deliver Rhino Lab.",
      "To run the estimator and CRM for your business (if you are a customer).",
      "To see which pages people watch, where traffic came from, and which plan they chose.",
      "To improve the site, prevent abuse, and comply with law.",
    ],
  },
  {
    heading: "4. Sharing",
    body: [
      "We do not sell your personal information.",
      "We share data with vendors who help us operate (hosting, databases, email/SMS, analytics). They may process data only for us.",
      "If you use the estimator, lead data goes to the contractor account that owns that estimator — that is the point of the product.",
      "We may share information if required by law, to protect rights and safety, or as part of a business transfer.",
    ],
  },
  {
    heading: "5. Cookies and tracking",
    body: [
      "We use essential cookies or local storage for language, session, and form recovery. We may use analytics and ad cookies to measure campaigns.",
      "You can block cookies in your browser. The site may still work; some features (language, CRM session) may reset.",
    ],
  },
  {
    heading: "6. Retention",
    body: [
      "Lead and inquiry records are kept as long as needed to follow up and run the CRM, then deleted or anonymized when no longer needed, unless a longer period is required by law or a customer contract.",
    ],
  },
  {
    heading: "7. Your rights",
    body: [
      "Depending on where you live (including California and the EEA/UK), you may ask to access, correct, delete, or export your personal information, or object to certain processing.",
      `Email ${CONTACT_EMAIL} with the subject “Privacy request.” We will verify you before changing records. You may also have the right to complain to a data protection authority.`,
    ],
  },
  {
    heading: "8. Children",
    body: [
      "The Service is for businesses, not children under 16. We do not knowingly collect data from children. If you think we have, contact us and we will delete it.",
    ],
  },
  {
    heading: "9. Security",
    body: [
      "We use reasonable technical and organizational measures (HTTPS, access limits, hosted databases). No method of transmission or storage is 100% secure.",
    ],
  },
  {
    heading: "10. International transfers",
    body: [
      "We operate from the United States. If you access the Service from another country, your information may be processed in the US, where privacy laws may differ.",
    ],
  },
  {
    heading: "11. Changes",
    body: [
      "We may update this Policy. The “Last updated” date will change. Material changes will be posted on this page.",
    ],
  },
];
