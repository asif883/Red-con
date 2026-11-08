import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig, siteContact, socialLinks } from "@/lib/site";
import "./globals.css";

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "REDCon Ltd. | Engineering, Environmental & Development Consultancy in Bangladesh",
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: "/",
    title: "REDCon Ltd. | Engineering, Environmental & Development Consultancy",
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, alt: "REDCon Ltd. - Navigating the Future" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "REDCon Ltd. | Engineering, Environmental & Development Consultancy",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.fullName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo/logo.png`,
  description: siteConfig.description,
  foundingDate: "2018",
  email: siteContact.email,
  telephone: siteContact.phones.map((p) => p.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: "4/20 Happy House, Humayun Road, Mohammadpur",
    addressLocality: "Dhaka",
    postalCode: "1207",
    addressCountry: "BD",
  },
  sameAs: [socialLinks.facebook, socialLinks.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // "<" is escaped so the JSON can never close the script tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
