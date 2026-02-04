"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function BackButton({ locale }) {
  const router = useRouter();
  const t = useTranslations();
  const isRTL = locale === "ar";

  return (
    <button
      onClick={() => router.back()}
      className="mb-[24px] flex items-center gap-x-[8px] text-custom-maincolor font-bold text-[16px] md:text-[18px] cursor-pointer hover:opacity-80 transition-opacity"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isRTL ? "rotate(0deg)" : "rotate(180deg)" }}
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {t("BackButton.back")}
    </button>
  );
}
