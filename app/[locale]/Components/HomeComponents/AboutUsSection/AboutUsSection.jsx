import { useTranslations } from "next-intl";
import React from "react";
import Link from "next/link";

const getAboutDesc = async (locale) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/home`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": locale,
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }

  const data = await response.json();
  return data.data;
};

export default function AboutUsSection({ locale }) {
  const t = useTranslations();
  return (
    <>
      <AboutUsContent t={t} locale={locale} />
    </>
  );
}

const AboutUsContent = async ({ t, locale }) => {
  try {
    // const isRtl = locale === "ar";
    const data = await getAboutDesc(locale);

    return (
      <section className="pt-[48px] pb-[24px] lg:pt-[104px] lg:pb-[52px]">
        <div className="custom_container">
          <div className="flex flex-col md:flex-row w-full gap-x-[62px] md:min-h-[369px]">
            {/* text */}
            <div className="md:py-[49.5px] order-2 md:order-1 relative w-full md:w-[52.8%] flex flex-col  items-start">
              <div className="flex flex-col">
                <p className="text-custom-gray525 text-[12px] md:text-[16px] xl:text-[18px] font-normal leading-[22.5px] mb-[8px] ">
                  {t("About.aboutuspretitle")}
                </p>
                <h2 className="text-[20px] md:text-[28px] xl:text-[48px] font-normal lg:leading-[64px] text-custom-maincolor mb-[12px] md:mb-[24px]">
                  {data.title}
                </h2>
              </div>
              <p className="text-custom-gray525 mb-[16px] md:mb-[40px] text-[14px] md:text-[15px] xl:text-[20px] font-normal leading-[35px] md:flex-grow">
                {data.description}
              </p>

              {/* {(data?.image_one || data?.image_two) && (
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-[16px] md:mb-[40px]">
                  {data?.image_one && (
                    <div className="w-full md:w-1/2">
                      <img
                        className="w-full h-full object-cover rounded-md shadow-md max-h-[400px]"
                        src={data.image_one}
                        alt="Certificate"
                      />
                    </div>
                  )}

                  {data?.image_two && (
                    <div className="w-full md:w-1/2">
                      <img
                        className="w-full h-full object-cover rounded-md shadow-md max-h-[400px]"
                        src={data.image_two}
                        alt="Certificate"
                      />
                    </div>
                  )}
                </div>
              )} */}

              <Link
                href={`/${locale}/about-us`}
                className=" transition-colors  duration-300 hover:text-custom-maincolor hover:bg-custom-whiteColor flex items-center justify-center leading-[22.5px] text-[14px] md:text-[16px] xl:text-[20px] font-normal text-custom-whiteColor bg-custom-maincolor w-[119px] md:w-[148px] h-[46px] md:h-[52px] rounded-[10px]"
              >
                {" "}
                {t("Link.KnowMore")}
              </Link>
            </div>
            {/* Image with Background */}
            <div className="order-1 md:order-2 w-full md:w-[47.2%] relative mb-[40px] md:mb-0">
              {/* Background */}
              <div className="absolute top-0 left-0 w-[54%] md:w-1/2 h-full bg-custom-maincolor rounded-[5px] overflow-hidden z-0"></div>

              {/* Image */}
              <figure className="relative z-10 w-full aspect-[800/500]">
                <img
                  src="/AboutUs/house.webp"
                  alt="CarImage"
                  className="w-full h-full object-contain"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};
