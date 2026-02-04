import { useTranslations } from "next-intl";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import ChooseUsCard from "../CardList/ChooseUsCard";

const getChooseUs = async (locale) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/choose-us`,
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
  return data?.data;
};

export default function ChooseUsSection({ locale }) {
  const t = useTranslations();
  return (
    <>
      <ChooseUsSectionContent t={t} locale={locale} />
    </>
  );
}

const ChooseUsSectionContent = async ({ t, locale }) => {
  try {
    // const isRtl = locale === "ar";
    const data = await getChooseUs(locale);

    return (
      <section className="py-[24px] lg:py-[52px]">
        <div className="custom_container">
          <SectionTitle
            title={t("Home.chooseustitle")}
            description={t("Home.chooseusdesc")}
          />
          <div className="grid grid-cols-1 gap-x-[20px] lg:gap-x-[41px] gap-y-[24px] lg:gap-y-[32px] md:grid-cols-2 xl:grid-cols-3">
            {data.map((item, index) => (
              <ChooseUsCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};
