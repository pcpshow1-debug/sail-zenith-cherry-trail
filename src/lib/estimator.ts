/** Live Rhino Lab estimator app (external product). */
export const ESTIMATOR_APP_URL = "https://app.rhinolab.app/?locale=en";

export function estimatorUrl(locale: "en" | "ru" = "en") {
  return `https://app.rhinolab.app/?locale=${locale}`;
}
