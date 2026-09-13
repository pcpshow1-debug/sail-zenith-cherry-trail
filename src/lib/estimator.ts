/** Live Rhino Lab estimator app (external product). */
export const ESTIMATOR_APP_URL = "https://estimate.rhinolab.app";

export function estimatorUrl(locale: "en" | "ru" = "en", campaign = "website") {
  const url = new URL(ESTIMATOR_APP_URL);
  url.searchParams.set("utm_source", "rhinolab");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("lang", locale);
  return url.toString();
}
