import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const { personal } = PORTFOLIO_DATA;

export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: {
    default: `${personal.name} — ${personal.role} | supun.me`,
    template: `%s · ${personal.name}`,
  },
  description:
    `Official portfolio of ${personal.name} (${personal.alternateName}) — ${personal.role} at ${personal.company} & Full-Stack SaaS Developer in Colombo, Sri Lanka (supun.me). Builder of BusSeatBooking.com, Next.js, TypeScript, and Node.js systems.`,
  applicationName: `${personal.name} Portfolio`,
  keywords: [
    "Tharaka Dharmasiri",
    "Supun",
    "Supun Tharaka",
    "Tharaka Supun",
    "supun.me",
    "www.supun.me",
    "Associate Software Engineer",
    "Nexone World",
    "Full-Stack Developer Sri Lanka",
    "Software Engineer Colombo",
    "Next.js Developer",
    "TypeScript",
    "SaaS Developer",
    "Bus Seat Booking",
    "SLIIT",
    "HNB Cybersource",
  ],
  authors: [{ name: personal.name, url: personal.siteUrl }],
  creator: personal.name,
  publisher: personal.name,
  category: "technology",
  alternates: {
    canonical: personal.siteUrl,
  },
  openGraph: {
    title: `${personal.name} (${personal.alternateName}) — ${personal.role} · ${personal.company}`,
    description: personal.heroSummary,
    url: personal.siteUrl,
    siteName: "supun.me — Tharaka Dharmasiri",
    type: "profile",
    firstName: "Tharaka",
    lastName: "Dharmasiri",
    username: "supun",
    locale: "en_LK",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${personal.name} (${personal.alternateName}) — ${personal.role} at ${personal.company}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} (${personal.alternateName}) — ${personal.role}`,
    description: personal.heroSummary,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3B2F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Agrave+Pro:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
