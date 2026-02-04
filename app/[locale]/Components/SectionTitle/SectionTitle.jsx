import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
export default function SectionTitle({ title, description, linkRef }) {
  const t = useTranslations();
  return (
    <div className="pb-[32px] flex flex-col ">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-start font-normal  text-[20px] md:text-[22px] lg:text-[24px]  text-custom-maincolor">
            {title}
          </h2>
          {linkRef && (
            <Link
              className="text-custom-maincolor text-[16px] md:text-[18px] xl:text-[20px] font-normal text-start"
              href={`${linkRef}`}
            >
              {t("Link.showall")}
            </Link>
          )}
        </div>
      )}
      {description && (
        <p className="text-custom-gray525 leading-[30px] mt-[8px] md:mt-[16px] text-start font-medium text-[14px] lg:text-[20px] text-custom-lighttext">
          {description}
        </p>
      )}
    </div>
  );
}
