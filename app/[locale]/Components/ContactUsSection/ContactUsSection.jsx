import ContactForm from "./form";
import { useTranslations } from "next-intl";

import Iframe from "../Iframe/Iframe";
import SocialLinksDark from "../SocialLinks/SocialLinksDark";
import ContactCard from "../CardList/ContactCard";
import Link from "next/link";

const getContactDetails = async (locale) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DBURL}/api/setting`,
      {
        next: { revalidate: 0 },
        headers: {
          Accept: "application/json",
          "Accept-Language": locale,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export default function ContactUsSection({ locale }) {
  const t = useTranslations();

  return (
    <>
      <ContactUsSectionContent locale={locale} t={t} />
    </>
  );
}

const ContactUsSectionContent = async ({ locale, t }) => {
  try {
    const contactDetails = await getContactDetails(locale);
    const isRTL = locale === "ar";
    return (
      <section className=" pb-[30px] md:pb-[52px]">
        <div className="custom_container">
          <div className="py-[48px] md:py-[104px]">
            <ContactCard t={t} setting={contactDetails} />
          </div>
          {/* booking */}
          <div className="px-[19px] py-[41px] md:w-[75%] mb-[48px] md:mb-[52px] mx-auto flex flex-row items-center justify-between bg-[#f09648] rounded-[10px]">
            <figure className="flex-[41%] md:flex-[37%] md:w-[225px] md:h-[207px] w-[118] h-[109px]">
              <img
                className="w-full h-full object-contain"
                src="/BookingOrPreview/BookingImage.webp"
                alt="house image"
              />
            </figure>
            <div className="flex-[59%] md:flex-[63%] flex flex-col ">
              <p className="text-custom-whiteColor  mx-auto text-[16px] md:text-[18px] leading-[20px] md:leading-[40px] text-center font-bold">
                {t("BookingPreview.description")}
              </p>
              <Link
                className={`mt-[16px] font-normal flex items-center mx-auto justify-center  self-center ${
                  isRTL ? "w-[129px]" : "w-[160px]"
                } h-[40px] md:h-[42px] text-[14px] md:text-[16px] text-center rounded-[5px] bg-custom-whiteColor text-custom-maincolor`}
                href={`/${locale}/for-sale`}
              >
                {t("BookingPreview.buttonText")}{" "}
              </Link>
            </div>
          </div>
          {/* --- */}
          <div className="pb-[32px] flex flex-col ">
            <div className="flex items-center justify-center flex-col">
              <h2 className="text-start font-normal  text-[20px] md:text-[22px] lg:text-[24px]  text-custom-maincolor">
                {t("ContactUs.title")}
              </h2>
              <p className="text-custom-gray525 leading-[30px] mt-[8px] md:mt-[16px] text-start font-medium text-[14px] lg:text-[20px] text-custom-lighttext">
                {t("ContactUs.description")}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-[16px] md:gap-[50px]">
            <div className="w-full md:w-[100%]">
              <Iframe />
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between gap-[16px]">
              <div className="details w-full md:w-[35%] flex flex-col items-start justify-center gap-[16px] md:gap-[10px]">
                {(contactDetails.whatsapp ||
                  contactDetails.facebook ||
                  contactDetails.instagram ||
                  contactDetails.x ||
                  contactDetails.linkedin) && (
                  <div className="flex flex-col gap-[2px]">
                    <h4 className="text-[15px] md:text-[24px] text-custom-maincolor font-normal xs:text-[20px] mb-[24px]">
                      {t("ContactUs.socialsTitle")}
                    </h4>
                    <SocialLinksDark
                      t={t}
                      styles="flex flex-col items-start gap-[8px] md:gap-[24px] "
                      data={{
                        facebook: contactDetails.facebook,
                        x: contactDetails.x,
                        instagram: contactDetails.instagram,
                        whatsapp: contactDetails.whatsapp,
                        linkedin: contactDetails.linkedin,
                      }}
                    />
                  </div>
                )}
              </div>
              {/* contact form */}
              <div className="w-full md:w-[50%]">
                <ContactForm locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
  }
};
