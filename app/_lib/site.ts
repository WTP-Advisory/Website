const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const BASE_URL = (
  configured ? configured : "https://advisory.wtp.vn"
).replace(/\/+$/, "");
