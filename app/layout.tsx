import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wtpadvisory.vn"),
  title: {
    default: "WTP Advisory — Cố vấn Quản trị thuê ngoài cho doanh nghiệp Việt",
    template: "%s | WTP Advisory",
  },
  description:
    "WTP Advisory cung cấp dịch vụ Cố vấn Quản trị thuê ngoài — khai phóng lãnh đạo, đồng hành cùng doanh nghiệp Việt từ chiến lược đến thực thi để tăng trưởng bền vững và vươn ra toàn cầu.",
  keywords: [
    "WTP Advisory",
    "cố vấn quản trị thuê ngoài",
    "tư vấn quản trị doanh nghiệp",
    "khai phóng lãnh đạo",
    "tư vấn chiến lược",
    "WTP Capital",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "WTP Advisory",
    title: "WTP Advisory — Cố vấn Quản trị thuê ngoài cho doanh nghiệp Việt",
    description:
      "Khai phóng lãnh đạo — đồng hành cùng doanh nghiệp Việt từ chiến lược đến thực thi.",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">{children}</body>
    </html>
  );
}
