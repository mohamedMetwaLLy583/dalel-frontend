"use client";
import React, { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SectionTitle from "../../SectionTitle/SectionTitle";
import RealEstateCard from "../../CardList/RealEstateCard";

export default function ForRentSection({ locale }) {
  const [data, setData] = useState(null);

  const getSlides = async (locale) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DBURL}/api/properties/home/rent`,
        {
          next: { revalidate: 0 },
          headers: {
            "Accept-Language": locale,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  };

  useEffect(() => {
    getSlides(locale);
  }, [locale]);

  const t = useTranslations();

  const slidesPerView = data?.length || 1;

  return (
    data?.length > 0 && (
      <section className="pt-[24px] lg:pt-[52px] pb-[24px] lg:pb-[41px]">
        <div className="custom_container">
          <SectionTitle
            title={t("Home.forrenttitle")}
            description={t("Home.forrentdesc")}
            linkRef={`/${locale}/for-rent`}
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
                  linkRef={`/${locale}/for-rent/${item.id}`}
                  image={item.image}
                  reservation={item.reservations_count}
                  view={item.view_count}
                  isAvailable={item.is_available}
                  offerType={item.offer_type}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    )
  );
}
