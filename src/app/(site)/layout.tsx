import type { Metadata } from "next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { AnnouncementBar } from "@/components/Layout/AnnouncementBar";

// Updated custom domain URL
const SITE_URL = "https://islam-religion.com";

// Next.js Metadata for SEO, Page Title, and Favicons
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Islam Religion",
    template: "%s | Islam Religion",
  },
  description: "Learn about Islam, faith, guidance, and teachings.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Islam Religion",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Islam Religion",
    url: SITE_URL,
  },
];

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Site-wide JSON-LD (public pages only) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteJsonLd).replace(/\u003c/g, "\\u003c"),
        }}
      />

      <AnnouncementBar />
      <Header />

      <main className="pb-16">{children}</main>

      <Footer />
    </>
  );
}