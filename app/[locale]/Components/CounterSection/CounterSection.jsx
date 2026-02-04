import React from "react";
import Counter from "./Counter";
import { useTranslations } from "next-intl";

const getStatistics = async (locale) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/statistics`,
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

export default function CounterSection({ locale }) {
  const t = useTranslations();
  return (
    <>
      <CounterSectionContent t={t} locale={locale} />
    </>
  );
}

const CounterSectionContent = async ({ t, locale }) => {
  try {
    const data = await getStatistics(locale);
    const isRTL = locale === "ar";
    return (
      <section className="py-[24px] xl:py-[52px]">
        <div className="custom_container">
          <div className="flex flex-col md:flex-row md:gap-x-[60px] xl:gap-x-[123px] gap-y-[24px]">
            {/* counter content */}
            <div className=" order-2 md:order-1 flex-1  xl:flex-[55%] Counter_content flex flex-col gap-y-[16px] xl:gap-y-[24px]">
              <h3 className="text-custom-maincolor font-normal text-[16px] leading-[20.16px] md:text-[20px]  xl:text-[32px] xl:leading-[40.32px] ">
                {t("statistics.pretitle")}
              </h3>
              <p className="text-custom-BlackColor font-normal text-[20px] leading-[25.2px] xl:text-[40px] xl:leading-[50.4px] lg:max-w-[55%]  ">
                {data.title && data.title}
              </p>
              <p className="font-light text-[16px] leading-[30px]  xl:text-[18px] ">
                {data.description && data.description}
              </p>
              <div className="flex flex-row items-center justify-center content-center gap-x-[12.67px] xl:gap-x-[55.67px]">
                <div className="flex flex-col items-center justify-center">
                  <Counter locale={locale} plus="+" end={data.happy_clients} />
                  <p
                    className={`${
                      isRTL ? "xl:text-[18px]" : "xl:text-[15px]"
                    } xl:text-nowrap text-[11px] xs:text-[14px] font-normal leading-[15.62px] text-center text-custom-BlackColor xl:leading-[20.09px]  `}
                  >
                    {t("statistics.happy")}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Counter locale={locale} plus="+" end={data.sold_homes} />
                  <p
                    className={`${
                      isRTL ? "xl:text-[18px]" : "xl:text-[15px]"
                    } xl:text-nowrap text-[11px] xs:text-[14px] font-normal leading-[15.62px] text-center text-custom-BlackColor xl:leading-[20.09px]  `}
                  >
                    {t("statistics.sold")}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Counter locale={locale} plus="+" end={data.rented_homes} />
                  <p
                    className={`${
                      isRTL ? "xl:text-[18px]" : "xl:text-[15px]"
                    } xl:text-nowrap text-[11px] xs:text-[14px] font-normal leading-[15.62px] text-center text-custom-BlackColor xl:leading-[20.09px]  `}
                  >
                    {t("statistics.rent")}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Counter locale={locale} end={data.reviews} />
                  {/* <p className="text-custom-maincolor text-[20px] leading-[22.32px] xl:leading-[53.57px] xl:text-[48px]">
                  </p> */}
                  <p
                    className={`${
                      isRTL ? "xl:text-[18px]" : "xl:text-[15px]"
                    } xl:text-nowrap text-[11px] xs:text-[14px] font-normal leading-[15.62px] text-center text-custom-BlackColor xl:leading-[20.09px]`}
                  >
                    {t("statistics.review")}
                  </p>
                </div>
              </div>
            </div>
            {/* image */}
            <figure
              className={` ${
                isRTL ? "pr-[15px] xl:pr-[21px]" : "pl-[15px] xl:pl-[21px]"
              }  order-1 md:order-2 pb-[15px] xl:pb-[21px] flex-1  xl:flex-[45%]  relative after:content-[''] after:absolute after:z-[-5] after:w-full after:h-full after:bottom-[-1px] after:left-0 after:bg-custom-maincolor  after:rounded-[10px] `}
            >
              <img
                className="w-full h-full object-cover  rounded-[15px]"
                src="/CounterSection/CouterSectionImage.webp"
                alt=""
              />
            </figure>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};
