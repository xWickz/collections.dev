import { GeistPixelGrid } from "geist/font/pixel";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelGrid = GeistPixelGrid;

export const metadata: Metadata = {
  metadataBase: new URL("https://collections.wickz.dev"),
  title: {
    default: "collections.dev | Artículos y recursos de desarrollo web",
    template: "%s | collections.dev",
  },
  description:
    "collections.dev es una plataforma dedicada a recopilar artículos, recursos y herramientas relacionadas al desarrollo web.",
  authors: [{ name: "Wickz", url: "https://wickz.dev" }],
  creator: "Wickz",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://collections.wickz.dev",
    title: "collections.dev | Artículos y recursos de desarrollo web",
    description:
      "collections.dev es una plataforma dedicada a recopilar artículos, recursos y herramientas relacionadas al desarrollo web.",
    siteName: "collections.dev",
  },
  twitter: {
    card: "summary_large_image",
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
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${pixelGrid.variable} h-full antialiased `}
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: aplica el tema guardado antes de pintar para evitar parpadeo
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "collections.dev",
              url: "https://collections.wickz.dev",
              inLanguage: "es",
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
