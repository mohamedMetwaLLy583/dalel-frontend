import React from "react";
import { useTranslations } from "next-intl";

export default function RealEstateDescription({ desc }) {
  const t = useTranslations();

  return (
    desc && (
      <div className="flex flex-col justify-center items-start gap-y-[24px] md:gap-y-[32px]">
        <h3 className="text-custom-gray525 font-bold text-[20px] leading-[22.32px] lg:text-[24px] lg:leading-[26.78px]">
          {t("GalleryDescription.title")}
        </h3>
        <p className="text-custom-gray525 font-normal text-[14px] leading-[40px] md:text-[16px] md:leading-[50px]">
          {desc}
        </p>
      </div>
    )
  );
}
