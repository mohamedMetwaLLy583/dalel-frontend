import { useTranslations } from "next-intl";
import PageBanner from "../Components/PageBanner/PageBanner";
import ContactUsSection from "../Components/ContactUsSection/ContactUsSection";

export async function generateMetadata({ params: { locale } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/seo/contact_us`,
    {
      next: { revalidate: 0 },
      headers: {
        "Accept-Language": locale,
        Accept: "application/json",
      },
    }
  );
  const res = await response.json();
  const data = res.data;
  return {
    title: data.title || "Elsqoor",
    description: data.description,
    keywords: data.keyword,
    referrer: "origin-when-cross-origin",
  };
}

async function fetchBanner(locale) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/banner/contact-us`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": locale,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }

  const data = await response.json();
  return data.data;
}

export default function Page({ params }) {
  const t = useTranslations();
  const locale = params.locale;

  return (
    <>
      <ContactContent t={t} locale={locale} />
    </>
  );
}
const ContactContent = async ({ locale, t }) => {
  try {
    const banner = await fetchBanner(locale);

    return (
      <>
        <PageBanner title={banner.title} description={banner.description} />
        <ContactUsSection locale={locale} />
      </>
    );
  } catch (error) {
    console.log(error);
  }
};
