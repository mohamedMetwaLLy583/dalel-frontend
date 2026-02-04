import { useTranslations } from "next-intl";
import React from "react";
import Link from "next/link";

export default function BookOrPreviewsSection({ locale }) {
  const t = useTranslations();
  return (
    <>
      <BookOrPreviewsSectionContent t={t} locale={locale} />
    </>
  );
}

const BookOrPreviewsSectionContent = async ({ t, locale }) => {
  const isRTL = locale === "ar";
  try {
    return (
      <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[52px]">
        <div className="custom_container">
          {/* preview */}
          <div className="px-[12px] py-[51px] md:px-[19px] md:py-[41px]  flex flex-row items-center  bg-custom-maincolor rounded-[10px] md:w-[75%] mx-auto">
            <figure className="flex-[41%] md:flex-[44%]  md:w-[258px] md:h-[173px] w-[127px] h-[109px]">
              <img
                src="/BookingOrPreview/PreviewImage.webp"
                alt="house image"
                width="258"
                height="173"
                className="w-full h-full object-contain"
              />
            </figure>
            <div className="flex-[59%] md:flex-[56%]  flex flex-col md:w-[72%]">
              <p className="text-custom-whiteColor  mx-auto text-[16px] md:text-[18px] leading-[20px] md:leading-[40px] text-center font-bold">
                {t("Inspection.title")}
              </p>
              <Link
                className={`mt-[16px] font-normal flex items-center justify-center mx-auto self-center ${
                  isRTL ? "w-[129px]" : "w-[140px] md:w-[180px]"
                } h-[40px] md:h-[42px] text-[14px] md:text-[16px] text-center rounded-[5px] bg-custom-whiteColor text-custom-maincolor`}
                href={`/${locale}/application-form`}
              >
                {t("Inspection.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};
