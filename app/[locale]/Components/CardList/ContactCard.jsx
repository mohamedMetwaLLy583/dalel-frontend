import React from "react";

export default function ContactCard({ setting, t }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] rounded-[10px]">
      {/* address */}
      {setting.address && (
        <div
          className="w-full flex flex-col items-center justify-center h-[182px] md:h-[210px] gap-y-[16px]"
          style={{
            boxShadow: "0px 2px 16px 0px rgba(9, 46, 114, 0.32)",
          }}
        >
          <img
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
            src="/ContactUs/address.svg"
            alt="address Icon"
          />
          <div className="flex flex-col items-center justify-center gap-y-[8px] md:gap-y-[16px] ">
            <h2 className="text-custom-gray525 font-bold text-[16px] leading-[35px] md:text-[24px]">
              {t("ContactCard.addressTitle")}
            </h2>
            <p className="text-custom-gray525 font-normal text-[16px] md:text-[20px] leading-[35px]">
              {setting.address}
            </p>
          </div>
        </div>
      )}

      {/* email */}
      {setting.email && (
        <div
          className="w-full flex flex-col items-center justify-center h-[182px] md:h-[210px] gap-y-[16px]"
          style={{
            boxShadow: "0px 2px 16px 0px rgba(9, 46, 114, 0.32)",
          }}
        >
          <img
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
            src="/ContactUs/envelope.svg"
            alt="email Icon"
          />
          <div className="flex flex-col items-center justify-center gap-y-[8px] md:gap-y-[16px] ">
            <h2 className="text-custom-gray525 font-bold text-[16px] leading-[35px] md:text-[24px]">
              {t("ContactCard.emailTitle")}
            </h2>
            {/* Convert email to a mailto link */}
            <a
              href={`mailto:${setting.email}`}
              className="text-custom-gray525 font-normal text-[16px] md:text-[20px] leading-[35px]"
            >
              {setting.email}
            </a>
          </div>
        </div>
      )}

      {/* phone */}
      {(setting.primary_phone || setting.secondary_phone) && (
        <div
          className="w-full flex flex-col items-center justify-center h-[182px] md:h-[210px] gap-y-[16px]"
          style={{
            boxShadow: "0px 2px 16px 0px rgba(9, 46, 114, 0.32)",
          }}
        >
          <img
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
            src="/ContactUs/phone.svg"
            alt="phone Icon"
          />
          <div className="flex flex-col items-center justify-center gap-y-[8px] md:gap-y-[16px]">
            <h2 className="text-custom-gray525 font-bold text-[16px] leading-[35px] md:text-[24px]">
              {t("ContactCard.phoneTitle")}
            </h2>
            <div className="flex flex-row items-between justify-between w-full gap-x-[50px]">
              {/* Convert primary phone to a tel link */}
              {setting.primary_phone && (
                <a
                  href={`tel:${setting.primary_phone}`}
                  className="text-custom-gray525 font-normal text-[16px] md:text-[20px] leading-[35px]"
                >
                  {setting.primary_phone}
                </a>
              )}
              {/* Convert secondary phone to a tel link */}
              {setting.secondary_phone && (
                <a
                  href={`tel:${setting.secondary_phone}`}
                  className="text-custom-gray525 font-normal text-[16px] md:text-[20px] leading-[35px]"
                >
                  {setting.secondary_phone}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
