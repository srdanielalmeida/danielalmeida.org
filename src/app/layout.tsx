import type { Metadata } from "next";
import { Crimson_Text, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const crimsonText = Crimson_Text({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Daniel Almeida — Desenvolvimento Pessoal, Santidade e as 12 Camadas da Personalidade",
    template: "%s | Daniel Almeida",
  },
  description:
    "Reflexões sobre desenvolvimento pessoal, santidade e as camadas da personalidade humana. Um espaço de recolhimento intelectual e beleza clássica.",
  metadataBase: new URL("https://danielalmeida.org"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Daniel Almeida",
    title: "Daniel Almeida — Desenvolvimento Pessoal & Santidade",
    description:
      "Reflexões sobre desenvolvimento pessoal, santidade e as camadas da personalidade humana.",
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
    <html
      lang="pt-BR"
      className={`${crimsonText.variable} ${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
