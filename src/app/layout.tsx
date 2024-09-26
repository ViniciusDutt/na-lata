import type { Metadata } from "next";
import { Advent_Pro } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const advent = Advent_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Na Lata",
  description: "Criado por ViniciusDutt",
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
          strategy="lazyOnload"
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
