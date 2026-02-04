import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function RandoCard({ lang, data, parentType }) {
  const isRTL = lang === "ar";
  const t = useTranslations();
  return (
    data && (
      <Link href={`/${lang}/${parentType}/${data.id}`}>
        <div
          className="flex mb-[32px] gap-x-[26px] h-[193px] w-full rounded-[20px] px-[16px] border-black border-[]"
          style={{
            boxShadow: "0px 4px 15px 0px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex-[48.6%] py-[32px] flex flex-col gap-y-[16px] justify-center">
            <h4 className="text-ellipsis-1 overflow-hidden font-bold text-[20px] md:text-[13px] xl:text-[20px]  text-custom-gray525">
              {data?.title}
            </h4>
            <p className="text-ellipsis-1  font-bold text-[16px] md:text-[12px] xl:text-[16px] text-custom-gray525 leading-[20px]">
              {data?.address}
            </p>
            <div className="flex flex-row items-center  justify-between">
              <p className="flex items-center justify-center  leading-[25px] font-bold text-[20px]  md:text-[13px] xl:text-[20px]">
                {data?.price} {t("Currency")}
              </p>
              <span className="font-bold text-[18px] md:text-[13px] xl:text-[18px] text-custom-maincolor">
                {t("RealEstateCard.details")}
              </span>
            </div>
          </div>
          <figure className="relative flex-[42.4%] py-[16px] rounded-[10px] overflow-hidden w-full h-full">
            <div className="bg-custom-whiteColor mt-[12.5px] absolute w-[144px] h-[28px] md:w-[117px] lg:w-[160px] xl:w-[186px] md:h-[36px] flex items-center justify-between px-[12px]  top-[16px] md:top-[20px] lg:top-[16px] right-[10px] rounded-[5px]">
              <div className="flex flex-row items-center justify-center gap-x-[4px]">
                <img
                  className="md:w-[28px] md:h-[28px]"
                  src="/CardIcons/mdi_eye-outline.svg"
                  alt="viewsicon"
                />
                <p className="text-[14px] md:text-[16px] font-bold  text-custom-gray525">
                  {data.view_count}
                </p>
              </div>
              <div className="flex flex-row items-center justify-center gap-x-[4px]">
                <img
                  className="md:w-[28px] md:h-[28px]"
                  src="/CardIcons/mdi_key-chain.svg"
                  alt="keychainicon"
                />
                <p className="text-[14px] md:text-[16px] font-bold  text-custom-gray525">
                  {data.reservations_count}
                </p>
              </div>
            </div>

            <img
              className="w-full h-full object-cover rounded-[10px] overflow-hidden relative -z-10"
              src={data?.image}
              alt="RealEstate Image"
            />
            <div className="absolute bottom-5 right-2 opacity-50">
              <img
                src="/watermark/watermark.svg"
                alt="Dalel Jawaa Watermark"
                className="w-8 h-8 object-contain"
              />
            </div>
          </figure>
        </div>
      </Link>
    )
  );
}
