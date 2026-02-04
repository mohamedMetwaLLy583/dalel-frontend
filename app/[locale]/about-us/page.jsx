import { useTranslations } from "next-intl";
import AboutUsDesc from "../Components/AboutUsDesc/AboutUsDesc";
import PageBanner from "../Components/PageBanner/PageBanner";
import TestimonialsSection from "../Components/TestimonialsSection/TestimonialsSection";
import MarketingSteps from "../Components/MarketingSteps/MarketingSteps";
import ChooseUsSection from "../Components/ChooseUsSection/ChooseUsSection";

export async function generateMetadata({ params: { locale } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/seo/about_us`,
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
    title: data?.title,
    description: data?.description,
    keywords: data?.keyword,
    referrer: "origin-when-cross-origin",
  };
}

async function fetchBanner(locale) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/banner/about-us`,
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

const getAboutDesc = async (locale) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DBURL}/api/about_us`,
      {
        next: { revalidate: 0 },
        headers: {
          "Accept-Language": locale,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export default function AboutUs({ params }) {
  const t = useTranslations();
  return (
    <>
      <AboutContent locale={params.locale} t={t} />
    </>
  );
}

const AboutContent = async ({ locale, t }) => {
  try {
    const desc = await getAboutDesc(locale);
    const data = await fetchBanner(locale);

    return (
      <>
        <PageBanner title={data.title} description={data.description} />

        <div className="custom_container">
          <AboutUsDesc desc={desc} locale={locale} />
        </div>
        <MarketingSteps locale={locale} />
        <ChooseUsSection locale={locale} />

        <TestimonialsSection />
      </>
    );
  } catch (error) {
    console.log(error);
  }
};
