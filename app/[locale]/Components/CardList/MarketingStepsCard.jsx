import React from "react";

export default function MarketingStepsCard({ item }) {
  return (
    item && (
      <div className="flex flex-row gap-x-[8px]">
        <figure className="min-w-[40px] h-[40px] md:min-w-[60px] md:h-[60px]">
          <img
            src={item.icon}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="flex flex-col">
          <h3 className="text-custom-maincolor min-h-[36px] xl:min-h-[44px] font-normal text-[16px] md:text-[18px] xl:text-[20px] leading-[17.86px] xl:leading-[22px] text-ellipsis-2 overflow-hidden">
            {item.title}
          </h3>
          <p className="text-custom-gray525 pt-[16px] md:pt-[10px] lg:pt-[24px] leading-[15.62px] text-[14px] font-normal text-ellipsis-3 overflow-hidden">
            {item.description}
          </p>
        </div>
      </div>
    )
  );
}
