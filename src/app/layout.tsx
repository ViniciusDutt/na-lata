import type { Metadata } from "next";
import { Advent_Pro } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const advent = Advent_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Na Lata",
  description:
    "Jogo de estratégia onde o objetivo é encontrar as posições corretas de todas as latinhas.",
  keywords: [
    "Jogo",
    "Game",
    "Jogo rápido",
    "Lata",
    "Latinha",
    "can",
    "soda can",
    "minigame",
  ],
  applicationName: "Na Lata",
  authors: {
    name: "Vinicius Dutt",
    url: "https://linkedin.com/in/viniciusdutt",
  },
  openGraph: {
    title: "Na lata",
    type: "website",
    url: "https://nalata.co",
    images: "/nalata8.svg",
    siteName: "Na Lata",
    description:
      "Jogo de estratégia onde o objetivo é encontrar as posições corretas de todas as latinhas.",
  },
  appleWebApp: {
    title: "Na lata",
    statusBarStyle: "default",
  },
  twitter: {
    title: "Na lata",
    site: "https://nalata.co",
    card: "summary",
    images: "/nalata8.svg",
    description:
      "Jogo de estratégia onde o objetivo é encontrar as posições corretas de todas as latinhas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_DATA_AD}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="lata8.svg" type="image/x-icon" />
      </head>
      <body
        className={`${advent.className} antialiased bg-background-100 flex justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
