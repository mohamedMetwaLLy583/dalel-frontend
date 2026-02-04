import { useTranslations } from "next-intl";
import React from "react";
import PlainSocialLinks from "../../SocialLinks/PlainSocialLinks";

export default function GalleryDescription({ data, locale, title }) {
  const isRTL = locale === "ar";
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-y-[32px] lg:gap-y-[40px]">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-[10px] xs:text-[11px] leading-[17.86px] rounded-[5px] text-custom-whiteColor bg-custom-maincolor w-[90px] h-[34px] flex items-center justify-center md:text-[20px] lg:text-[24px] md:w-[111px] md:h-[43px]">
          {title}
        </h1>
        <PlainSocialLinks data={data} locale={locale} />
      </div>
      {data.address && (
        <p className="font-bold text-custom-gray525 text-[10px] xs:text-[11px]  leading-[17.86px] md:text-[24px] md:leading-[26.78px]">
          {data.address}
        </p>
      )}
      {data.title && (
        <p className="font-bold text-custom-gray525 text-[20px] leading-[22.32px] md:leading-[26.78px]">
          {data.title}
        </p>
      )}
      {data.price && (
        <p className="text-custom-maincolor text-[24px] leading-[26.78px] font-bold md:text-[32px] lg:leading-[35.71px]">
          {isRTL
            ? `${t("GalleryDescription.currency")} ${data.price} `
            : `${data.price} ${t("GalleryDescription.currency")}`}
        </p>
      )}

      {data.description && (
        <p className="text-custom-gray525 text-[14px] leading-[40px] font-normal md:text-[16px] lg:text-[20px] lg:leading-[60px]">
          {data.description}
        </p>
      )}
      {/* description details */}
      <div className="grid grid-cols-2 gap-y-[24px] lg:gap-y-[40px]">
        {data.offer_type && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/showtype.svg" alt="showtype" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.offerType")}
              </p>
            </div>
            {data.offer_type && (
              <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
                {data.offer_type === "rent"
                  ? t("FilterComponent.rent")
                  : data.offer_type === "sale"
                  ? t("FilterComponent.sale")
                  : data.offer_type}
              </p>
            )}
          </div>
        )}
        {data.area && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/space.svg" alt="Space" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.space")}
              </p>
            </div>
            {data.area && (
              <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
                {isRTL
                  ? `${data.area} ${t("GalleryDescription.meter")} `
                  : `${data.area} ${t("GalleryDescription.meter")}`}
              </p>
            )}
          </div>
        )}
        {data.type && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/realestatetype.svg" alt="realestatetype" />
              {
                <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                  {t("GalleryDescription.realEstateType")}
                </p>
              }
            </div>
            {data.type && (
              <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
                {data.type}
              </p>
            )}
          </div>
        )}
        {data.furnishing && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/realestatetype.svg" alt="realestatetype" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.furnishing")}
              </p>
            </div>
            {data.furnishing && (
              <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
                {data.furnishing}
              </p>
            )}
          </div>
        )}
        {data.floor && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/floor.svg" alt="floor" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.floor")}
              </p>
            </div>
            {data.floor && (
              <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
                {data.floor}
              </p>
            )}
          </div>
        )}
        {data.finishing && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/Finishing.svg" alt="Finishing" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.finishing")}{" "}
              </p>
            </div>
            {data.finishing && (
              <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
                {data.finishing}
              </p>
            )}
          </div>
        )}
        {data.rooms && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/roomsnumber.svg" alt="roomsnumber" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.rooms")}
              </p>
            </div>
            <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
              {data.rooms}
            </p>
          </div>
        )}
        {data.bathrooms && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/detailspage/bathrooms.svg" alt="bathrooms" />
              <p className="text-custom-maincolor font-normal text-[10px] xs:text-[11px] md:text-[16px] leading-[17.86px] ">
                {t("GalleryDescription.bathrooms")}
              </p>
            </div>
            <p className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-gray525">
              {data.bathrooms}
            </p>
          </div>
        )}
        {data.link && (
          <div className="items-center flex flex-row gap-x-[8px] md:gap-x-[24px]">
            <div className="flex flex-row gap-x-[8px]">
              <img src="/ContactUs/address.svg" alt="location" />
            </div>
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold leading-[17.86px] text-[10px] xs:text-[11px] md:text-[16px] text-custom-maincolor underline"
            >
              {t("GalleryDescription.viewLocation")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
