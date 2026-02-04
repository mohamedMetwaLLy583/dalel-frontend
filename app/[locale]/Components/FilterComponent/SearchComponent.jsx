"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SearchComponent({ locale, transactionType }) {
  const { register, handleSubmit, control } = useForm();
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fontSize, setFontSize] = useState("16px");
  const [height, setHeight] = useState("56px");

  const router = useRouter();

  const customStyles = {
    control: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingRight: isRTL ? "30px" : "10px",
      width: "100%",
      height: height,
      backgroundColor: "white",
      borderRadius: "10px",
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
      textAlign: "start",
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
          `${process.env.NEXT_PUBLIC_DBURL}/api/types`,
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
        transactionType
      )}&search=${encodeURIComponent(
        data.search || ""
      )}&price=${encodeURIComponent(data.price || "")}`
    );
  };

  const t = useTranslations();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        // Update font size based on window width
        if (window.innerWidth < 374) {
          setFontSize("10px");
        } else if (window.innerWidth <= 768) {
          setFontSize("14px");
        } else {
          setFontSize("16px");
        }

        // Update height based on window width
        if (window.innerWidth < 768) {
          setHeight("48px");
        } else {
          setHeight("56px");
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      {/* Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 xs:grid-cols-2  md:flex flex-col md:flex-row mt-[15px] bg-custom-whiteColor rounded-[10px]  gap-x-[21px] md:gap-x-[21px] gap-y-[16px] "
      >
        {/* City Input */}
        <div className=" py-[10px] w-full md:w-[32.32%] relative flex items-center justify-center border-[.5px]  h-[48px] md:h-[56px] rounded-[10px]">
          <input
            type="text"
            placeholder={t("SearchComponent.cityPlaceholder")}
            className={`w-full h-full outline-none ${
              isRTL ? "pr-[9.5px]" : "pl-[9.5px]"
            } placeholder:text-[#808080] placeholder:text-[10px] xs:placeholder:text-[16px] md:placeholder:text-[20px] placeholder:font-[400] placeholder:h-full`}
            {...register("search")}
          />
        </div>
        {/* property type */}
        <div className="h-full relative w-full  md:w-[23.86%]">
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={propertyTypes}
                placeholder={t("SearchComponent.propertyTypePlaceholder")}
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
        </div>

        {/* Price Input */}
        <div className="w-full md:w-[23.86%] h-[48px] relative flex items-center justify-center py-[10px] border-[.5px]   md:h-[56px] rounded-[10px]">
          <input
            type="text"
            placeholder={t("SearchComponent.pricePlaceholder")}
            className={`w-full h-full outline-none ${
              isRTL ? "pr-[9.5px]" : "pl-[9.5px]"
            } placeholder:text-[#808080] placeholder:text-[10px] xs:placeholder:text-[16px] md:placeholder:text-[20px] placeholder:font-[400] placeholder:h-full`}
            {...register("price")}
          />
        </div>
        {/* Search Button */}
        <div className="w-full md:w-[15.18%]   h-full relative">
          <button
            type="submit"
            className=" text-[10px] xs:text-[16px] md:text-[20px]  flex items-center justify-center w-full h-[48px] md:h-[56px] text-white bg-custom-maincolor rounded-[10px]"
          >
            {t("SearchComponent.searchButton")}
          </button>
        </div>
      </form>
    </>
  );
}
