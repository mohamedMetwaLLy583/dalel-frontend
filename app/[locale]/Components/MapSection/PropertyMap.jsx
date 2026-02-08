"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Default center: Al Qassim, Saudi Arabia
const DEFAULT_CENTER = [26.3267, 43.9717];
const DEFAULT_ZOOM = 6;

export default function PropertyMap({ properties, locale }) {
  const center =
    properties.length > 0
      ? [
          parseFloat(properties[0].latitude),
          parseFloat(properties[0].longitude),
        ]
      : DEFAULT_CENTER;

  const zoom = properties.length > 0 ? 10 : DEFAULT_ZOOM;

  const formatPrice = (price) => {
    return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
      style: "currency",
      currency: "SAR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-[10px] overflow-hidden shadow-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-[1]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[
              parseFloat(property.latitude),
              parseFloat(property.longitude),
            ]}
            icon={markerIcon}
          >
            <Popup>
              <div className="min-w-[200px] text-start" dir={locale === "ar" ? "rtl" : "ltr"}>
                {property.image && (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-[100px] object-cover rounded-[6px] mb-2"
                  />
                )}
                <h3 className="font-bold text-[14px] text-gray-800 mb-1">
                  {property.title}
                </h3>
                <p className="text-[12px] text-gray-500 mb-1">
                  {property.address}
                </p>
                <p className="text-[14px] font-bold text-custom-maincolor mb-2">
                  {formatPrice(property.price)}
                </p>
                <Link
                  href={`/${locale}/${property.offer_type === "sale" ? "for-sale" : "for-rent"}/${property.id}`}
                  className="block text-center bg-custom-maincolor text-white text-[12px] py-1.5 px-3 rounded-[6px] hover:opacity-90 transition-opacity"
                >
                  {locale === "ar" ? "عرض التفاصيل" : "View Details"}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
