import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LocaleProvider } from "@/lib/i18n";
import { SiteTracker } from "@/components/site-tracker";
import { SITE_ORIGIN } from "@/lib/social";
import appCss from "../styles.css?url";

const APP_NAME = "Rhino Lab";
const TITLE =
  "Rhino Lab | Instant Contractor Estimator That Answers Leads in 60 Seconds";
const DESCRIPTION =
  "Homeowners call 3–5 companies. The first clear price usually wins. Rhino Lab texts a branded estimate in under 60 seconds, then files the lead in your CRM. Built by David Zuev.";
const CANONICAL = `${SITE_ORIGIN}/`;
const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#0b3d91" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "David Zuev" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: APP_NAME },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap",
      },
      { rel: "canonical", href: CANONICAL },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          <LocaleProvider>
            <SiteTracker />
            <Outlet />
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
