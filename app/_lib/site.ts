// Canonical origin for the site, used by metadata, robots.txt and the sitemap.
// Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. in .env or your host's
// env settings); the fallback keeps local builds working without any config.
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://advisory.wtp.vn";
