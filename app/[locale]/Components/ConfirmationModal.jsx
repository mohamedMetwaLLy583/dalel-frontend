"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function ConfirmationModal({ isOpen, onClose, data, locale }) {
  if (!isOpen) return null;

  const t = useTranslations();
  const isRTL = locale === "ar";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div
        className={`bg-white rounded-[20px] p-8 w-[90%] max-w-[500px] shadow-2xl transform transition-all scale-100 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-custom-maincolor rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-custom-maincolor">
            {t("form.confirmationTitle")}
          </h2>
        </div>

        <div className="space-y-4 border-t border-b border-gray-100 py-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">
              {t("form.confirmationName")}
            </span>
            <span className="text-custom-gray525 font-bold">{data.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">
              {t("form.confirmationPhone")}
            </span>
            <span className="text-custom-gray525 font-bold" dir="ltr">
              {data.phone}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">
              {t("form.confirmationDate")}
            </span>
            <span className="text-custom-gray525 font-bold">{data.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">
              {t("form.confirmationTime")}
            </span>
            <span className="text-custom-gray525 font-bold">{data.time}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-custom-maincolor text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
        >
          {t("form.confirmationClose")}
        </button>
      </div>
    </div>
  );
}
