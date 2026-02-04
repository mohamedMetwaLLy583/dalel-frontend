import React from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

export default function TestimonialsCard({ item, className }) {
  return (
    item && (
      <div className={`${className}  flex items-center`}>
        <div className="mt-[30px] relative w-full h-full rounded-[20px] flex items-center justify-center">
          <div className="absolute h-[27px] w-[34px] z-20 top-[-15px]  left-0 flex justify-center items-center ">
            <img
              src="/quotes.svg"
              alt="quotes"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="content relative z-10  bg-custom-whiteColor h-full w-full rounded-[20px] px-[12px] md:px-[46px] py-[25px] md:py-[38px] flex flex-col justify-between"
            style={{
              boxShadow: "4px 4px 34px 0px rgba(0, 0, 0, 0.16)",
            }}
          >
            <p className="text-[14px] font-normal leading-[28px] md:leading-[20px] text-custom-lighterblackColor text-ellipsis-4 overflow-hidden">
              {item.review}
            </p>

            <div className=" flex flex-row items-center justify-center">
              <div className="flex flex-col w-[64%] md:w-[66%] lg:w-[64%] items-start justify-between">
                <h4 className="font-bold md:text-[20px] leading-[25px] text-[16px] text-ellipsis-1 overflow-hidden">
                  {item.name}
                </h4>
                <p className="font-normal text-[14px] leading-[25px] text-custom-lighterblackColor text-ellipsis-1 overflow-hidden">
                  {item.country}
                </p>
              </div>
              <Rater total={5} rating={item.rating} interactive={false} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
