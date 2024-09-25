import type { Metadata } from "next";
import { Advent_Pro } from "next/font/google";
import "./globals.css";
import AdSense from "@/components/AdSense";

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
        <AdSense pId={process.env.GOOGLE_DATA_AD!} />
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
