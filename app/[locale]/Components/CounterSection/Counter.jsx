"use client";
import React from "react";
import CountUp from "react-countup";
// import ScrollTriggerHOC from "../../ScrollTriggerHOC/ScrollTriggerHOC";

export default function Counter({ end, plus, locale }) {
  const isRtl = locale === "ar";
  return (
    <div dir="ltr" className=" flex flex-row items-center justify-center">
      {plus && (
        <p className="text-custom-maincolor text-[20px] leading-[22.32px] xl:leading-[53.57px] xl:text-[35px]">
          {plus}
        </p>
      )}
      <CountUp
        className={`text-custom-maincolor text-[20px] leading-[22.32px] xl:leading-[53.57px] ${
          isRtl ? "xl:text-[35px]" : "xl:text-[35px]"
        }`}
        start={0}
        end={end}
        duration={5}
      />
    </div>
  );
}
{
  /* <div className="flex flex-col items-center justify-center">
  <p
    dir="ltr"
    className="text-custom-maincolor text-[20px] leading-[22.32px] xl:leading-[53.57px] xl:text-[48px]"
  >
    <span className="text-custom-maincolor text-[20px] leading-[22.32px] xl:leading-[53.57px] xl:text-[48px]">
      +
    </span>
    5000
  </p>
  <p className="text-[11px] xs:text-[14px] font-normal leading-[15.62px] text-center text-custom-BlackColor xl:leading-[20.09px] xl:text-[18px]">
    عميل سعيد
  </p>
</div>; */
}
