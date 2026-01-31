import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex Sales Neural Engine | AI-Powered E-Commerce Automation",
  description: "نظام ذكاء اصطناعي متكامل لإدارة المبيعات والتجارة الإلكترونية - Apex Sales Neural Engine by IDRISIUM Corp",
  keywords: ["AI", "E-Commerce", "Sales Automation", "Chatbot", "WhatsApp", "Arabic"],
  authors: [{ name: "Idris Ghamid", url: "https://github.com/IDRISIUM" }],
  creator: "IDRISIUM Corp",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://apex-neural.vercel.app",
    siteName: "Apex Sales Neural Engine",
    title: "Apex Sales Neural Engine",
    description: "AI-Powered E-Commerce Sales Automation Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Sales Neural Engine",
    description: "AI-Powered E-Commerce Sales Automation Platform",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
