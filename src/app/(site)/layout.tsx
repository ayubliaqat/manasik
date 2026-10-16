import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { AnnouncementBar } from "@/components/Layout/AnnouncementBar";

// Current site URL. Change this when you move to a custom domain.
const SITE_URL = "https://manasik-ten.vercel.app";

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Manasik",
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Manasik",
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