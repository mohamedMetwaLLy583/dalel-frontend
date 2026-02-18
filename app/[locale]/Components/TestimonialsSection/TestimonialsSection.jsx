import React from "react";
import { useTranslations } from "next-intl";
import SectionTitle from "../SectionTitle/SectionTitle";
import TestimonialsSwiper from "../HomeComponents/TestimonialsSwiper/TestimonialsSwiper";

const getReviews = async (locale) => {
  try {
    const res = await fetch(`${(process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL)}/api/reviews`, {
      headers: {
        "Accept-Language": locale,
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw Error("Failed To Fetch Data");
    }

    const data = await res.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export default function TestimonialsSection({ locale }) {
  const t = useTranslations();
  return (
    <>
      <TestimonialsSectionContent t={t} locale={locale} />
    </>
  );
}

const TestimonialsSectionContent = async ({ t, locale }) => {
  try {
    const reviews = await getReviews(locale);
    return (
      reviews &&
      reviews.length > 0 && (
        <section
          className={`py-[24px] md:py-[52px] relative overflow-x-hidden`}
        >
          <div className="custom_container">
            <SectionTitle
              title={t("Testimonials.title")}
              description={t("Testimonials.desc")}
            />
            <TestimonialsSwiper cards={reviews} />
          </div>
        </section>
      )
    );
  } catch (error) {
    console.log(error);
  }
};
