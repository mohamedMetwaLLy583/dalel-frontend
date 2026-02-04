import { useTranslations } from "next-intl";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import MarketingStepsCard from "../CardList/MarketingStepsCard";

const getOurSteps = async (locale) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/our-steps`,
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
};

export default function MarketingSteps({ locale }) {
  const t = useTranslations();
  return (
    <>
      <MarketingStepsContent t={t} locale={locale} />
    </>
  );
}

const MarketingStepsContent = async ({ t, locale }) => {
  try {
    // const isRtl = locale === "ar";
    const data = await getOurSteps(locale);

    return (
      <section className="py-[24px] lg:py-[52px]">
        <div className="bg-custom-lightermaincolor py-[24px] md:py-[56px]">
          <div className="custom_container">
            <SectionTitle
              title={t("OurSteps.title")}
              description={t("OurSteps.desc")}
            />
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:gap-x-[42px] gap-y-[36px] lg:gap-y-[80px] md:grid-cols-3 xl:grid-cols-4">
              {data.map((item, index) => (
                <MarketingStepsCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};
