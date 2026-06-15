import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import AuthListener from "./components/AuthListener";
import { ThemeProvider } from "./components/ThemeProvider";
import { ClientSettingsProvider } from "./components/ClientSettingsProvider";
import { Inter, JetBrains_Mono } from "next/font/google";
import RouteTransitionLoader from "./components/RouteTransitionLoader";
import NativePreloader from "@/components/NativePreloader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

/* ================= META & VIEWPORT ================= */

export const metadata: Metadata = {
  title: {
    default: "NIRA Intelligence | The Premium AI Platform",
    template: "%s | NIRA"
  },
  description: "NIRA thinks before it answers. Smarter than a single AI. Faster than all of them. Built for creators, teams, and AI-first companies.",
  keywords: ["NIRA", "NIRA Intelligence", "AI Platform", "Artificial Intelligence", "Advanced AI", "Chat", "Image Generation", "Video Generation", "Premium AI"],
  authors: [{ name: "NIRA Intelligence" }],
  creator: "NIRA",
  publisher: "NIRA Intelligence",
  metadataBase: new URL("https://www.niraintelligence.com"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.niraintelligence.com",
    title: "NIRA Intelligence | The Premium AI Platform",
    description: "Smarter than a single AI. Faster than all of them. Experience the next generation of artificial intelligence.",
    siteName: "NIRA",
    images: [{
      url: "/Images/demo1.jpg", // Fallback to a premium image
      width: 1200,
      height: 630,
      alt: "NIRA Intelligence - Premium AI Platform",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIRA Intelligence | The Premium AI Platform",
    description: "Smarter than a single AI. Faster than all of them. Experience the next generation of artificial intelligence.",
    images: ["/Images/demo1.jpg"],
    creator: "@NiraIntelligence",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 🚀 Premium Mobile App Feel (Prevents iOS zoom issues & white flashes)
export const viewport: Viewport = {
  themeColor: "#000000", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, 
  viewportFit: "cover",
};

/* ================= LAYOUT ================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`scroll-smooth dark ${inter.variable} ${jetbrainsMono.variable}`} 
    >
      <head />

      <body
        className={`
          font-sans antialiased tracking-tight
          text-[var(--nira-text)] bg-black
          relative w-full min-h-[100dvh]
          selection:bg-indigo-500/30 selection:text-white
          overflow-x-hidden
        `}
      >
        {/* Client-hydrated Native Preloader (Unmounts instantly when React mounts) */}
        <NativePreloader />
        <script dangerouslySetInnerHTML={{ __html: `
          // Safe fallback: force disable preloader if React hydration is delayed
          setTimeout(function() {
            var p = document.getElementById('nira-native-preloader');
            if (p) {
              p.style.opacity = '0';
              p.style.pointerEvents = 'none';
              setTimeout(function() { p.style.display = 'none'; }, 800);
            }
          }, 1200);
        `}} />

        <style dangerouslySetInnerHTML={{ __html: `* { text-shadow: none !important; } @keyframes spin { 100% { transform: rotate(360deg); } }` }} />
        <ThemeProvider attribute="class" defaultTheme="dark" themes={['light', 'dark', 'rose']} disableTransitionOnChange>
          <ClientSettingsProvider />
          <RouteTransitionLoader />
          {/* 🌌 BACKGROUND SYSTEM */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="nira-bg" />
          </div>

          {/* 🧠 APP CONTAINER */}
          <div className="relative z-10 flex flex-col min-h-[100dvh]">
            <main className="flex-1 w-full">
              {children}
            </main>
            <AuthListener />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-4GNB12HS7K" />
    </html>
  );
}