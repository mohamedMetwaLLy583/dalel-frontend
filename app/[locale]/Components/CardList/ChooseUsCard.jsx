import React from "react";

export default function ChooseUsCard({ item }) {
  return (
    item && (
      <div className="flex flex-col items-center justify-center w-full h-[224px] md:h-[290px] gap-y-[16px] rounded-[10px] border-[.5px] border-[#D3C5C5] py-[16px] md:py-[24px]">
        <figure className="w-[60px] h-[60px] md:w-[98px] md:h-[98px] flex items-center justify-center">
          <img src={item.image} alt="ChooseUs Icon" />
        </figure>
        <h3 className="text-center md:text-[20px]  text-ellipsis-1 overflow-hidden text-[16px]  font-normal text-custom-maincolor min-h-[27px]">
          {item.title}
        </h3>
        <p className="px-[8px] text-center overflow-hidden text-ellipsis-3 min-h-[90px] text-custom-gray525  text-[14px] font-normal md:text-[20px] ">
          {item.description}
        </p>
      </div>
    )
  );
}
