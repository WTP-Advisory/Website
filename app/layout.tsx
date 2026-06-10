import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vietnam.incorp.asia"),
  title: {
    default: "InCorp Vietnam - Leading Market Entry & Corporate Services",
    template: "%s | InCorp Vietnam",
  },
  description:
    "InCorp Vietnam is a leading market entry & corporate services firm. We provide incorporation, legal advisory, accounting, tax, HR & payroll, and immigration services to help you expand your business in Vietnam.",
  keywords: [
    "InCorp Vietnam",
    "company formation Vietnam",
    "market entry Vietnam",
    "corporate services Vietnam",
    "incorporation Vietnam",
    "business expansion Vietnam",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "InCorp Vietnam",
    title: "InCorp Vietnam - Leading Market Entry & Corporate Services",
    description:
      "Your business expansion expert in Vietnam — one-stop company formation and corporate services.",
  },
  icons: {
    icon: [{ url: "/incorp/brand/favicon.png", type: "image/png" }],
    apple: { url: "/incorp/brand/favicon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink-soft">{children}</body>
    </html>
  );
}
