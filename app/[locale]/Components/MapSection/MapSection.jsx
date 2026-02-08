"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SectionTitle from "../SectionTitle/SectionTitle";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-[500px] rounded-[10px] bg-gray-100 animate-pulse flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

export default function MapSection({ locale }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [saleRes, rentRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/properties/home/sale`, {
            headers: { "Accept-Language": locale, Accept: "application/json" },
          }),
          fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/properties/home/rent`, {
            headers: { "Accept-Language": locale, Accept: "application/json" },
          }),
        ]);

        const saleData = saleRes.ok ? await saleRes.json() : { data: [] };
        const rentData = rentRes.ok ? await rentRes.json() : { data: [] };

        const all = [...(saleData.data || []), ...(rentData.data || [])];
        const withCoords = all.filter((p) => p.latitude && p.longitude);
        setProperties(withCoords);
      } catch (error) {
        console.error("Error fetching properties for map:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [locale]);

  if (loading) {
    return (
      <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[41px]">
        <div className="custom_container">
          <SectionTitle
            title={t("Home.maptitle")}
            description={t("Home.mapdesc")}
          />
          <div className="w-full h-[400px] lg:h-[500px] rounded-[10px] bg-gray-100 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[24px] lg:pt-[41px] pb-[24px] lg:pb-[41px]">
      <div className="custom_container">
        <SectionTitle
          title={t("Home.maptitle")}
          description={t("Home.mapdesc")}
        />
        <PropertyMap properties={properties} locale={locale} />
      </div>
    </section>
  );
}
