"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

export default function PlainSocialLinks() {
  const t = useTranslations();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => toast.info(t("PlainSocialLinks.clipboardSuccess")))
      .catch((error) =>
        toast.error(t("PlainSocialLinks.clipboardError"), error)
      );
  };

  return (
    <div className="sharesocials flex flex-row gap-x-[24px]" dir="ltr">
      <ToastContainer />
      <img
        className="cursor-pointer"
        src="/PlainSocials/share.svg"
        alt={t("PlainSocialLinks.shareAlt")}
        onClick={handleCopyLink}
      />
    </div>
  );
}
