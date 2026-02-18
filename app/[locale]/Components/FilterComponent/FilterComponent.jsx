"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function FilterComponent({ locale }) {
  const [activeButton, setActiveButton] = useState("rent");
  const { register, handleSubmit, reset, control } = useForm();
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fontSize, setFontSize] = useState("16px");

  const router = useRouter();

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      border: "none",
      boxShadow: "none",
      color: "#525252",
      fontSize: "16px",
      fontWeight: 400,
      padding: "0",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "white",
      color: isFocused ? "#333" : "#525252",
      fontSize: "16px",
      fontWeight: 400,
      zIndex: 200,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 200,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 200,
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: fontSize,
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const isRTL = locale === "ar";

  useEffect(() => {
    // Fetch property types based on locale
    const fetchPropertyTypes = async (locale) => {
      try {
        const response = await fetch(
          `${(process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL)}/api/types`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": locale,
            },
          }
        );
        const result = await response.json();
        const formattedOptions = result.data.map((type) => ({
          value: type.id,
          label: type.name,
        }));
        setPropertyTypes(formattedOptions);
      } catch (error) {
        console.error("Error fetching property types:", error);
      }
    };

    fetchPropertyTypes(locale);
  }, [locale]);

  const onSubmit = (data) => {
    const typeId = selectedOption?.value || "";

    router.push(
      `/${locale}/search?type_id=${encodeURIComponent(
        typeId
      )}&transactionType=${encodeURIComponent(
        activeButton
      )}&search=${encodeURIComponent(
        data.search || ""
      )}&price=${encodeURIComponent(data.price || "")}`
    );
  };
  const t = useTranslations();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth <= 375) {
          setFontSize("10px");
        } else if (window.innerWidth <= 768) {
          setFontSize("12px");
        } else {
          setFontSize("16px");
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {/* Tabs: For Sale or Rent */}
      <div className="bg-custom-whiteColor rounded-[5px] mx-auto md:mx-0 w-[280px] h-[31px] md:h-[63px] flex items-center flex-row justify-center mb-[4px]">
        <button
          type="button"
          className={`flex-1 h-full text-[12px] md:text-[16px] font-[700] rounded-[5px] transition-all duration-300 ${
            activeButton === "rent"
              ? "bg-[#18ad8f] text-white"
              : "bg-transparent text-custom-gray5D"
          }`}
          onClick={() => setActiveButton("rent")}
        >
          {t("FilterComponent.rent")}
        </button>
        <button
          type="button"
          className={`flex-1 h-full text-[12px] md:text-[16px] font-[700] rounded-[5px] transition-all duration-300 ${
            activeButton === "sale"
              ? "bg-[#18ad8f] text-white"
              : "bg-transparent text-custom-gray5D"
          }`}
          onClick={() => setActiveButton("sale")}
        >
          {t("FilterComponent.sale")}
        </button>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center bg-custom-whiteColor rounded-[5px] h-[56px] md:h-[80px] gap-x-[8px] md:gap-x-[24px]"
      >
        {/* City Input */}
        <div className="flex-[23.4%] md:flex-[34.7%] h-full relative">
          <input
            type="text"
            placeholder={t("FilterComponent.cityPlaceholder")}
            className={`w-full h-full  outline-none ${
              isRTL ? "mr-[9.5px]" : "ml-[9.5px]"
            } placeholder:text-custom-gray525 placeholder:text-[10px] xs:placeholder:text-[12px] md:placeholder:text-[16px] placeholder:font-[400] placeholder:h-full`}
            {...register("search", { required: true })}
          />
          <div
            className={`absolute ${
              isRTL ? "left-0" : "right-0"
            } top-1/2 -translate-y-1/2 h-[60%] border-l-[1px] border-custom-gray525`}
          ></div>
        </div>

        {/* Property Type */}
        <div className="flex-[27.5%] md:flex-[25.8%] h-full relative">
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={propertyTypes}
                placeholder={t("FilterComponent.propertyTypePlaceholder")}
                className="w-full h-full"
                styles={customStyles}
                value={selectedOption}
                onChange={(option) => {
                  setSelectedOption(option);
                  field.onChange(option.value);
                }}
                // menuPortalTarget={document.body}
                menuPortalTarget={
                  typeof window !== "undefined" ? document.body : null
                }
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => null,
                }}
              />
            )}
          />
          {/* Custom Arrow */}
          <div
            className={`absolute ${
              isRTL ? "left-2 md:left-4" : "right-2 md:right-4"
            }  top-1/2 transform -translate-y-1/2 pointer-events-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div
            className={`absolute ${
              isRTL ? "left-0" : "right-0"
            } top-1/2 -translate-y-1/2 h-[60%] border-l-[1px] border-custom-gray525`}
          ></div>
        </div>

        {/* Price Input */}
        <div className="flex-[27.5%] md:flex-[25.8%] h-full relative">
          <input
            type="text"
            placeholder={t("SearchComponent.pricePlaceholder")}
            className={`w-full h-full outline-none ${
              isRTL ? "pr-[9.5px]" : "pl-[9.5px]"
            } placeholder:text-[#808080] placeholder:text-[10px] xs:placeholder:text-[12px] md:placeholder:text-[16px] placeholder:font-[400] placeholder:h-full`}
            {...register("price")}
          />
          <div
            className={`absolute ${
              isRTL ? "left-0" : "right-0"
            } top-1/2 -translate-y-1/2 h-[60%] border-l-[1px] border-custom-gray525`}
          ></div>
        </div>

        {/* Search Button */}
        <div className="flex-[13.7%] h-full relative">
          <button
            type="submit"
            className="flex items-center justify-center w-full h-full  text-white"
          >
            <img
              className="w-[35px] h-[35px] xs:w-[40px]  xs:h-[40px] md:w-[57.5px] md:h-[57.5px] bg-custom-maincolor rounded-full flex items-center justify-center p-[10px] md:p-[20px]"
              src="/HeroSection/search.svg"
              alt="search icon"
            />
          </button>
        </div>
      </form>
    </>
  );
}
