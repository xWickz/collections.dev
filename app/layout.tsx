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
  title:
    "collections.dev | Recolección de artículos y recursos sobre desarrollo web",
  description:
    "collections.dev es una plataforma dedicada a recopilar artículos, recursos y herramientas relacionadas al desarrollo web.",
  keywords: [
    "desarrollo web",
    "artículos de desarrollo",
    "recursos de programación",
    "herramientas para desarrolladores",
    "tutoriales de desarrollo web",
    "tecnologías web",
    "programación frontend",
    "programación backend",
    "JavaScript",
    "CSS",
    "HTML",
    "React",
    "Node.js",
    "Next.js",
    "Vue.js",
    "Angular",
    "Django",
    "Flask",
    "Ruby on Rails",
    "PHP",
    "Laravel",
    "Symfony",
    "Go",
    "Rust",
    "DevOps",
    "cloud computing",
    "bases de datos",
    "seguridad web",
    "optimización de rendimiento",
    "accesibilidad web",
    "mejores prácticas de desarrollo",
  ],
  authors: [{ name: "Wickz", url: "https://wickz.dev" }],
  creator: "Wickz",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://collections.wickz.dev",
    title:
      "collections.dev | Recolección de artículos y recursos sobre desarrollo web",
    description:
      "collections.dev es una plataforma dedicada a recopilar artículos, recursos y herramientas relacionadas al desarrollo web.",
    siteName: "collections.dev",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelGrid.variable} h-full antialiased `}
    >
      <body className="min-h-screen flex flex-col bg-[#0b0b0b]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
