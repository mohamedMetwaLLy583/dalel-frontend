import React from "react";

export default function PageBanner({ title, description }) {
  return (
    <div className="relative w-full min-h-[229px] md:min-h-[368px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/PageBanner/BannerImage.webp"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {title && (
          <h1 className="font-bold text-[20px] leading-[22.32px] mb-[16px] md:text-[30px] xl:text-[52px] xl:leading-[58.03px] text-custom-whiteColor xl:mb-[40px]">
            {title}
          </h1>
        )}
        {description && (
          <p className="font-normal text-[16px] leading-[17.86px] text-center md:text-[20px] xl:text-[24px] xl:leading-[26.78px] text-custom-whiteColor">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
