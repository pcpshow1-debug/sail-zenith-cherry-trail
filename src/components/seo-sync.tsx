import { useEffect } from "react";
import { useLocale } from "@/lib/i18n";

/** Keep document title + description in sync with EN/RU. */
export function SeoSync() {
  const { t, locale } = useLocale();

  useEffect(() => {
    document.title = t.seo.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.seo.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t.seo.description);
    document.documentElement.lang = locale === "ru" ? "ru" : "en";
  }, [t, locale]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "Rhino Lab",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://www.rhinolab.app/",
              description: t.seo.description,
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "950",
                highPrice: "7500",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "David Zuev",
                url: "https://www.instagram.com/david_zuev",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: t.faq.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        }),
      }}
    />
  );
}
