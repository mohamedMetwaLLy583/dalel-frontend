"use client";
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SectionTitle from "../../SectionTitle/SectionTitle";
import RealEstateCard from "../../CardList/RealEstateCard";

export default function ForSaleSection({ locale }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSlides = async (locale) => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = `${process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL}/api/properties/home/sale`;
      console.log("Fetching from:", apiUrl);

      const response = await fetch(apiUrl, {
        next: { revalidate: 0 },
        headers: {
          "Accept-Language": locale,
          Accept: "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();
      console.log("API Response:", result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching sale properties:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlides(locale);
  }, [locale]);

  const t = useTranslations();

  const slidesPerView = data?.length || 1;

  // Show loading state
  if (loading) {
    return (
      <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[41px]">
        <div className="custom_container">
          <SectionTitle
            title={t("Home.forsaletitle")}
            description={t("Home.forsaledesc")}
            linkRef={`/${locale}/for-sale`}
          />
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-gray-500">
              {t("Common.loading") || "Loading..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[41px]">
        <div className="custom_container">
          <SectionTitle
            title={t("Home.forsaletitle")}
            description={t("Home.forsaledesc")}
            linkRef={`/${locale}/for-sale`}
          />
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!data || data.length === 0) {
    return (
      <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[41px]">
        <div className="custom_container">
          <SectionTitle
            title={t("Home.forsaletitle")}
            description={t("Home.forsaledesc")}
            linkRef={`/${locale}/for-sale`}
          />
          <div className="flex justify-center items-center h-[200px]">
            <p className="text-gray-500">
              {t("PropertyPage.noResults") || "No properties available"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[41px]">
      <div className="custom_container">
        <SectionTitle
          title={t("Home.forsaletitle")}
          description={t("Home.forsaledesc")}
          linkRef={`/${locale}/for-sale`}
        />
        <Swiper
          slidesPerView={Math.min(slidesPerView, 5)}
          spaceBetween={24}
          grabCursor={true}
          loop={slidesPerView > 2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            waitForTransition: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Navigation, Autoplay]}
        >
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <RealEstateCard
                title={item.title}
                description={item.address}
                price={item.price}
                linkRef={`/${locale}/for-sale/${item.id}`}
                image={item.image}
                reservation={item.reservations_count}
                view={item.view_count}
                isAvailable={item.is_available}
                offerType={item.offer_type}
                area={item.area}
                rooms={item.rooms}
                bathrooms={item.bathrooms}
                addedBy={item.added_by}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
