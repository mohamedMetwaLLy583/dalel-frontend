"use client";
import React, { useState } from "react";
import GallerySwiper from "../GallerySwiper/GallerySwiper";

export default function Gallery({ data }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = (index) => {
    setSelectedImg(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const handlePrev = () => {
    setSelectedImg(
      (prev) => (prev - 1 + data.gallery.length) % data.gallery.length
    );
  };

  const handleNext = () => {
    setSelectedImg((prev) => (prev + 1) % data.gallery.length);
  };

  return (
    <div className="gallery w-full mx-auto flex flex-col gap-6 px-[24px]  order-1 md-u:order-2 relative">
      <div className="relative selected h-[77%] md:h-[50%] xl:h-[77%]">
        <img
          src={data.gallery[selectedImg]}
          alt={data.gallery[selectedImg]}
          className="w-full h-full object-fit cursor-pointer"
          onClick={() => openFullScreen(selectedImg)}
          onContextMenu={(e) => e.preventDefault()}
        />
        {/* Watermark for Main Image */}
        <div
          className="absolute bottom-2 right-2 opacity-50"
          onClick={() => openFullScreen(selectedImg)}
        >
          <img
            src="/watermark/watermark.svg"
            alt="Dalel Jawaa Watermark"
            className="w-12 h-12 object-contain cursor-pointer"
          />
        </div>
      </div>

      <div className="other h-[23%] relative py-[10px]">
        <GallerySwiper
          images={data.gallery}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeFullScreen}
          >
            ✕
          </button>
          <button
            className="absolute left-4 text-white text-2xl"
            onClick={handlePrev}
          >
            ◀
          </button>
          <div className="relative">
            <img
              src={data.gallery[selectedImg]}
              alt={`Fullscreen ${selectedImg}`}
              className="max-w-full max-h-full object-contain"
            />
            {/* Watermark in fullscreen mode */}
            <div className="absolute bottom-4 right-4 opacity-50">
              <img
                src="/watermark/watermark.svg"
                alt="Dalel Jawaa Watermark"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <button
            className="absolute right-4 text-white text-2xl"
            onClick={handleNext}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
