import React from "react";
import RandoCard from "../../CardList/RandoCard";
import RandoSwiper from "./RandoSwiper";
import { useTranslations } from "next-intl";

export default function RandoSection({ locale, data, parentType }) {
  const isRTL = locale === "ar";
  const t = useTranslations();
  return (
    data && (
      <div>
        <h3
          className={`${
            isRTL ? "pr-[16px] md:pr-0" : "pl-[16px] md:pl-0"
          } mb-[32px] rounded-[5px] flex items-center md:justify-center h-[38px] md:h-[52px] text-custom-whiteColor font-bold leading-[22.32px] text-[20px] bg-custom-maincolor`}
        >
          {t("RandoSection.similarProperties")}
        </h3>
        <div className="hidden md:block">
          {data?.map((item, index) => (
            <RandoCard
              key={index}
              lang={locale}
              data={item}
              parentType={parentType}
            />
          ))}
        </div>
        <div className="block md:hidden">
          <RandoSwiper lang={locale} data={data} parentType={parentType} />
        </div>
      </div>
    )
  );
}
