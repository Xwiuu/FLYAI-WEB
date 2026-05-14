import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlyAI | Arquitetura de Sistemas Nervosos Artificiais",
  description: "Não criamos apenas ferramentas. Arquitetamos infraestruturas de inteligência autônoma que orquestram e escalam sua operação.",
  keywords: ["Inteligência Artificial", "SaaS B2B", "Cibersegurança", "Automação Industrial", "FlyAI"],
  authors: [{ name: "William Reis Castilhos dos Santos" }],
  openGraph: {
    title: "FlyAI | Inteligência Autônoma de Elite",
    description: "Sistemas nervosos artificiais para operações de alto nível.",
    url: "https://flyai.com.br",
    siteName: "FlyAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
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
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
