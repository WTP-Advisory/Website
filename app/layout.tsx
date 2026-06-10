import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
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
      <body className="min-h-full flex flex-col bg-white text-ink-soft">
        {children}
        <Script id="rocketchat-livechat" strategy="afterInteractive">
          {`(function(w, d, s, u) {
    w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
    var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true; j.src = 'https://livechat.jarvis.cx/livechat/rocketchat-livechat.min.js?_=201903270000';
    h.parentNode.insertBefore(j, h);
    w.ticketplus = w.ticketplus || {};
    w.ticketplus.tenantid = 'c3a8c883-06c0-4b10-9ae3-0ba0604ce727';
})(window, document, 'script', 'https://livechat.jarvis.cx/livechat');`}
        </Script>
      </body>
    </html>
  );
}
