"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PaginationComponent from "./PaginationComponent.jsx";
import RealEstateCard from "../../CardList/RealEstateCard.jsx";
import LoadingCircle from "../../LoadingCircle/LoadingCircle.jsx";
import Link from "next/link.js";

export default function ForSalePageContent({ locale }) {
  const [data, setData] = useState(null);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [page, setPage] = useState(1);
  const t = useTranslations();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${
          process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL
        }/api/properties?offer_type=sale&page=${page}${
          availabilityFilter !== "all"
            ? `&is_available=${availabilityFilter}`
            : ""
        }`;

        const response = await fetch(endpoint, {
          next: { revalidate: 0 },
          headers: {
            "Accept-Language": locale,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [locale, page, availabilityFilter]);

  if (!data) {
    return <LoadingCircle />;
  }

  const totalPages = data.meta.last_page;

  return (
    <section className="pb-[60px] lg:pb-[104px]">
      <div className="custom_container">
        <h1 className="opacity-0 pointer-events-none select-none">
          Dalel Elgawaa Sale Page
        </h1>
        <div className="flex flex-col md:flex-row justify-between">
          <Link
            className="w-[80%] mb-[20px] md:w-fit md:mx-0 flex items-center justify-center text-[12px] md:text-[14px] lg:text-[20px] relative transition-all duration-300 ease-in-out text-nowrap rounded-[10px] px-[20px] py-[8px] bg-custom-maincolor text-custom-whiteColor mx-auto "
            href={`/${locale}/application-form`}
          >
            {t("Link.applicationlink")}
          </Link>

          {/* Filter Buttons */}
          <div className="filter-buttons mb-6 flex items-center justify-center md:justify-start gap-x-[24px]">
            {[
              { id: "all", label: t("FieldsPage.category.all") },
              { id: "1", label: t("Availability.saleavailable") },
              { id: "0", label: t("Availability.salenotAvailable") },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setAvailabilityFilter(filter.id);
                  setPage(1);
                }}
                className={` w-fit text-[12px] md:text-[14px] lg:text-[20px] relative transition-all duration-300 ease-in-out text-nowrap ${
                  availabilityFilter === filter.id
                    ? "text-custom-whiteColor bg-custom-maincolor rounded-[10px] px-[20px] py-[8px] transition-all duration-300 ease-in-out"
                    : "text-custom-maincolor bg-[#fff] rounded-[10px] px-[20px] py-[8px] transition-all duration-300 ease-in-out"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        {/* Properties Grid */}
        {data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <p className="text-center text-[18px] md:text-[22px] text-custom-gray5D font-semibold">
              {t("PropertyPage.noResults")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[12px] md:gap-y-[24px] mb-[35px]">
            {data.data.map((data) => (
              <div key={data.id} className="relative">
                {/* Overlay for not available properties */}
                {data.is_available === 0 && (
                  <div className="absolute  bg-black bg-opacity-50 top-0 left-1/2 transform -translate-x-1/2  h-full w-[103%] mx-auto flex items-center justify-center text-white text-lg font-bold z-50 rounded-[5px]">
                    {t("Availability.salenotAvailable")}
                  </div>
                )}
                <RealEstateCard
                  title={data.title}
                  description={data.address}
                  price={data.price}
                  linkRef={`/${locale}/for-sale/${data.id}`}
                  image={data.image}
                  reservation={data.reservations_count}
                  view={data.view_count}
                  isAvailable={data.is_available}
                  offerType={data.offer_type}
                  area={data.area}
                  rooms={data.rooms}
                  bathrooms={data.bathrooms}
                  addedBy={data.added_by}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center md:justify-end">
            <PaginationComponent
              locale={locale}
              currentPage={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
