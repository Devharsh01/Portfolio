import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../lib/fontawesome";
import { NavigationProvider } from "./contexts/NavigationContext";
import { BlobityProvider } from "./contexts/BlobityProvider";
import { NAME, ROLE, PORTFOLIO_URL } from "@/constants/site";

const TITLE = `${NAME} — ${ROLE}`;
const DESCRIPTION =
  "Full Stack Engineer building scalable web and cloud systems with TypeScript, React, Next.js, Node.js, and AWS. Software Engineer Intern at Flexport, working from India.";

const syne = Syne({
  subsets: ["latin"],
  display: "block",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  generator: "Next.js",
  applicationName: NAME,
  keywords: [
    "Dev Harsh Agarwal",
    "developer",
    "full stack developer",
    "full stack engineer",
    "frontend",
    "backend",
    "react",
    "next.js",
    "node.js",
    "typescript",
    "aws",
    "cloud",
    "software",
    "software engineer",
    "india",
    "portfolio",
    "full stack developer portfolio",
    "software engineer portfolio",
  ],
  colorScheme: "dark",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PORTFOLIO_URL,
    siteName: NAME,
    images: [
      {
        url: "https://user-images.githubusercontent.com/84178696/228620835-e3cc5c9b-72fc-4f54-a628-407ef7b650f5.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "Dev_Harsh01",
    images: [
      "https://user-images.githubusercontent.com/84178696/228620835-e3cc5c9b-72fc-4f54-a628-407ef7b650f5.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-[#0E1016] scrollbar-thumb-[#212531]`}
      >
        <NavigationProvider>
          <BlobityProvider>
            {children}
          </BlobityProvider>
        </NavigationProvider>
        <Analytics />
      </body>
    </html>
  );
}
