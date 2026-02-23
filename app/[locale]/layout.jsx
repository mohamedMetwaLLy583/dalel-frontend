import { Almarai } from "next/font/google";

import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Script from "next/script";

export async function generateMetadata({ params: { locale } }) {
  const response = await fetch(
    `${process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL}/api/seo/home`,
    {
      next: { revalidate: 0 },
      headers: {
        "Accept-Language": locale,
        Accept: "application/json",
      },
    },
  );
  const res = await response.json();
  const data = res.data;
  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.keyword,
    siteName: data?.site_name,
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(
      `${process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL}`,
    ),
    openGraph: {
      images: data?.image,
    },
  };
}

/*  JSON-LD  */
const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Dalel Elgwaa",
  url: "https://www.dalel-elgwaa.online",
  logo: "https://www.dalel-elgwaa.online/logo.svg",
  description:
    "Find and book the best properties with ease. Explore real estate listings, schedule viewings, and secure your dream home.",
  // sameAs: [
  //   "https://www.facebook.com/smartstudent.live/",
  //   "https://www.snapchat.com/add/smartstudentliv?share_id=og1HYEMUWGk&locale=en-GB",
  //   "https://www.instagram.com/smartstudent.live?igsh=MTJoZ2Z2MjhxdmhjZA==",
  //   "https://www.tiktok.com/@smartstudent.live?_t=ZS-8toy67euS13&_r=1",
  // ],
  // Contact Information
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-555-5555",
    contactType: "customer service",
    email: "support@dalel-elgwaa.live",
  },
};

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
  display: "swap",
});

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html
      className={almarai.className}
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
    >
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KP3QHNBJ');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
          rel="stylesheet"
        /> */}
        <link
          rel="canonical"
          href={`https://www.dalel-elgwaa.online${locale ? `/${locale}` : ""}`}
        />

        {/*  JSON-LD  */}
        <Script
          id="json-ld-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />

        {/* Favicon for Browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* iOS Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Android Icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512x512.png"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`bg-[#fff]  min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KP3QHNBJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-grow">{children}</main>

          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
