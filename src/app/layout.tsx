import type { Metadata } from "next";
import { Poppins, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Change this to your final domain when you move off vercel.app.
const SITE_URL = "https://manasik-ten.vercel.app";

const SITE_NAME = "Manasik";

const SITE_DESCRIPTION =
  "Step-by-step Hajj and Umrah guides, Ziyarat information, duas with their references and practical Islamic tools.";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Makes every relative URL in metadata (canonicals, images) absolute.
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Manasik | Hajj & Umrah Guides, Duas and Islamic Tools",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    url: SITE_URL,
    title: "Manasik | Hajj & Umrah Guides, Duas and Islamic Tools",
    description: SITE_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: "Manasik | Hajj & Umrah Guides, Duas and Islamic Tools",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}