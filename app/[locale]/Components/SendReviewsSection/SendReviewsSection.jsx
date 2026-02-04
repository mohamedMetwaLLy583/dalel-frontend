import Reviewsform from "./Reviewsform";
import { useTranslations } from "next-intl";

import Iframe from "../Iframe/Iframe";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function SendReviewsSection({ locale }) {
  const t = useTranslations();

  return (
    <>
      <SendReviewsContent locale={locale} t={t} />
    </>
  );
}

const SendReviewsContent = async ({ locale, t }) => {
  try {
    return (
      <section className=" pb-[30px] md:pb-[52px]">
        <div className="custom_container ">
          <SectionTitle
            title={t("Home.contactustitlereview")}
            description={t("Home.contactusdescreview")}
          />

          <div className="flex flex-col md:flex-row items-center justify-center gap-x-[16px] gap-y-[24px]">
            <div className="flex-1 order-2 md:order-1 ">
              <Reviewsform locale={locale} />
            </div>
            <div className="flex-1 order-1 md:order-2">
              <Iframe />
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
  }
};
