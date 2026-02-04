import React from "react";

const SocialLinksDark = ({ styles, data, t }) => {
  return (
    <div className={` ${styles}`}>
      {data.facebook && (
        <a
          href={data.facebook}
          target="_blank"
          className="flex items-center gap-x-[8px]"
        >
          <img src="/Preheader/socials/facebookDark.svg" alt="facebook" />
          <span className="text-[14px] md:text-[16px] text-gray-800">
            {t("company.title")}
          </span>
        </a>
      )}
      {data.x && (
        <a
          href={data.x}
          target="_blank"
          className="flex items-center gap-x-[8px]"
        >
          <img src="/Preheader/socials/xDark.svg" alt="x" />
          <span className="text-[14px] md:text-[16px] text-gray-800">
            {t("company.title")}
          </span>
        </a>
      )}
      {data.instagram && (
        <a
          href={data.instagram}
          target="_blank"
          className="flex items-center gap-x-[8px]"
        >
          <img src="/Preheader/socials/instaDark.svg" alt="instagram" />
          <span className="text-[14px] md:text-[16px] text-gray-800">
            {t("company.title")}
          </span>
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          className="flex items-center gap-x-[8px]"
        >
          <img src="/Preheader/socials/linkedindark.svg" alt="linkedin" />
          <span className="text-[14px] md:text-[16px] text-gray-800">
            {t("company.title")}
          </span>
        </a>
      )}
      {data.whatsapp && (
        <a
          href={`https://wa.me/${data.whatsapp}`}
          target="_blank"
          className="flex items-center gap-x-[8px]"
        >
          <img src="/Preheader/socials/whatsappDark.svg" alt="whatsapp" />
          <span className="text-[14px] md:text-[16px] text-gray-800">
            {t("company.title")}
          </span>
        </a>
      )}
    </div>
  );
};

export default SocialLinksDark;
