import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReadmeAi - Construye tu readme potenciado con IA",
  description:
    "Aprende a construir tu readme en segundos con ReadmeAi y comparte tus proyectos con el mundo.",
  icons: {
    icon: [
      {
        url: "/favicon.webp",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.webp",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${inter.className} bg-primary-50`}>
          <Providers>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
