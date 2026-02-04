import { useTranslations } from "next-intl";
import React from "react";

export default function AboutUsDesc({ desc, locale }) {
  const t = useTranslations();
  return (
    <>
      <>
        {/* About Us */}
        {desc?.description_one && (
          <div className="flex flex-col md:flex-row w-full gap-x-[62px] md:min-h-[369px] pt-[85px] pb-[52px]">
            {/* Text */}
            <div className="md:py-[49.5px] order-2 md:order-1 relative w-full md:w-[52.8%] flex flex-col items-start">
              <div className="flex flex-col">
                <h3
                  className={`relative w-fit text-custom-maincolor font-semibold text-[25px] md:text-[32px] mb-[24px]`}
                >
                  {t("Navbar.about")}
                </h3>
              </div>
              <p className="lg:leading-[40px] mb-[12px] md:mb-[0] text-[16px] md:text-[18px] lg:text-[20px] font-normal text-custom-gray525">
                {desc.description_one}
              </p>
              {/* Two Images Section */}
              {/* Render the container only if at least one image exists */}
              {(desc?.image_one || desc?.image_two) && (
                <div className="mt-[16px] flex flex-col md:flex-row gap-4 md:gap-6">
                  {/* Render the first image only if it exists */}
                  {desc?.image_one && (
                    <figure className="w-full md:w-1/2">
                      <img
                        src={desc.image_one}
                        alt="Certificate"
                        className="w-full h-full object-cover rounded-lg shadow-md max-h-[400px]"
                      />
                    </figure>
                  )}

                  {/* Render the second image only if it exists */}
                  {desc?.image_two && (
                    <figure className="w-full md:w-1/2">
                      <img
                        src={desc.image_two}
                        alt="Certificate"
                        className="w-full h-full object-cover rounded-lg shadow-md max-h-[400px]"
                      />
                    </figure>
                  )}
                </div>
              )}
            </div>

            {/* Image with Background */}
            <div className="order-1 md:order-2 w-full md:w-[47.2%] relative mb-[40px] md:mb-0">
              {/* Background */}
              <div className="absolute top-0 left-0 w-[54%] md:w-1/2 h-full max-h-[500px] bg-custom-maincolor rounded-[5px] overflow-hidden z-0"></div>

              {/* Image */}
              <figure className="relative z-10 w-full h-full max-h-[500px]">
                <img
                  className={`w-full h-[290px] md:h-full object-contain`}
                  src="/AboutUs/house.webp"
                  alt="House Image"
                />
              </figure>
            </div>
          </div>
        )}

        {/* Message */}
        {desc?.description_two && (
          <div className="py-[24px] lg:py-[52px]">
            <div
              className={`flex flex-col md:flex-row gap-[12px] md:gap-x-[30px] lg:gap-x-[74px]`}
            >
              {/* Image */}
              <figure className="w-full sm:w-[50%] mx-auto order-1 mb-[12px] md:mb-[0] md:flex-[.4] xl:flex-[.28] relative md-full h-[207px] md:h-[246px]">
                <img
                  src="/AboutUs/message.webp"
                  alt="Choose Us"
                  className={`w-full h-full object-cover rounded-[5px]`}
                />
                <div className="absolute inset-0 bg-black opacity-20 rounded-[5px]"></div>
              </figure>

              {/* Text */}
              <div
                className={`order-2 md:order-1 flex-[.6] xl:flex-[.72] flex flex-col justify-center`}
              >
                <h3
                  className={`relative w-fit text-custom-maincolor font-semibold text-[25px] md:text-[32px]`}
                >
                  {t("AboutUs.message")}
                </h3>
                <p className="lg:leading-[40px] mb-[12px] md:mb-[0] text-[16px] md:text-[18px] lg:text-[20px] font-normal text-custom-gray525">
                  {desc.description_two}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Vision */}
        {desc?.description_three && (
          <div className="py-[24px] lg:py-[52px]">
            <div
              className={`flex flex-col md:flex-row gap-[12px] md:gap-x-[30px] lg:gap-x-[74px]`}
            >
              {/* Text */}
              <div
                className={`md:flex-[.6] xl:flex-[.72] flex flex-col justify-center order-2 md:order-1`}
              >
                <h3
                  className={`relative w-fit text-custom-maincolor font-semibold text-[25px] md:text-[32px]`}
                >
                  {t("AboutUs.vision")}
                </h3>
                <p className="lg:leading-[40px] mb-[12px] md:mb-[0] text-[16px] md:text-[18px] lg:text-[20px] font-normal text-custom-gray525">
                  {desc.description_three}
                </p>
              </div>
              {/* Image */}
              <figure
                dir="rtl"
                className={
                  "w-full sm:w-[50%] mx-auto order-1 md:order-2 mb-[12px] md:mb-[0] md:flex-[.4] xl:flex-[.28] relative md:w-full h-[207px] md:h-[246px]"
                }
              >
                <img
                  src="/AboutUs/vision.webp"
                  alt="Choose Us"
                  className={`w-full h-full object-cover rounded-[5px]`}
                />
                <div className="absolute inset-0 bg-black opacity-20 rounded-[5px]"></div>
              </figure>
            </div>
          </div>
        )}
      </>
    </>
  );
}
