/* eslint-disable @next/next/no-img-element */
import React from "react";
import FilterComponent from "../FilterComponent/FilterComponent";

async function fetchBanner(locale) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DBURL}/api/banner/home`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": locale,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }

  const data = await response.json();
  return data.data;
}

export default async function HeroSection({ locale }) {
  const data = await fetchBanner(locale);

  return (
    <div className="relative h-[500px] md:h-[calc(100vh-95px)] md:rounded-b-[15px]">
      {/* <!-- Image Container --> */}
      <figure className="absolute inset-0 w-full h-full aspect-[4/3] md:aspect-[16/9]">
        <img
          src="/HeroSection/hero.webp"
          alt="Background"
          // width="1920"
          // height="1080"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </figure>

      {/* <!-- Content --> */}
      <div className="w-[70%] md:w-[69.6%] lg:w-[50%] mx-auto relative flex flex-col  items-center pt-[60px] md:pt-[60px] lg:pt-[100px] xl:pt-[211px]  h-full text-center text-white">
        {/* <!-- Heading --> */}
        <h1 className="text-center text-[20px] md:text-[30px] xl:text-[52px] font-[700] leading-[30px] md:leading-[58px]">
          {data.title}{" "}
        </h1>

        {/* <!-- Paragraph --> */}
        <p className="mt-[16px] xl:mt-[40px] text-[16px] md:text-[24px] font-[400] leading-[26.78px] ">
          {data.description}{" "}
        </p>
      </div>
      {/* ----------------------- */}

      <div className="absolute  bottom-[5%] -translate-x-1/2 left-[50%] lg:bottom-[5%] w-[90%] md:w-[83.5%] mx-auto">
        <FilterComponent locale={locale} />
      </div>
    </div>
  );
}
