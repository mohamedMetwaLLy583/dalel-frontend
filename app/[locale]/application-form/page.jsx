"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

export default function ApplicationForm({ params }) {
  const locale = params.locale;
  const t = useTranslations();
  const isRTL = locale === "ar";

  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
    reset,
  } = useForm();

  const [images, setImages] = useState([null, null, null]);
  const [hijriDate, setHijriDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerDisabled, setIsTimePickerDisabled] = useState(true);
  const [timeError, setTimeError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleDateChange = (date) => {
    setHijriDate(date);
    setFormValue("date", date.format("YYYY/MM/DD"));
    setShowCalendar(false);

    // Enable time picker once date is chosen
    setIsTimePickerDisabled(false);
  };

  const handleTimeChange = (event) => {
    const timeValue = event.target.value;
    if (!timeValue) {
      setSelectedTime(null);
      setFormValue("time", null);
      return;
    }
    setSelectedTime(timeValue);
    setFormValue("time", timeValue);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updatedImages = [...images];
      updatedImages[index] = { file, preview: reader.result };
      setImages(updatedImages);
      // console.log(images);

      // Update the image form value
      setFormValue(
        "images",
        updatedImages.map((img) => img?.file).filter(Boolean)
      );
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    // setTimeError(false);
    setDateError(false);

    if (!hijriDate || !hijriDate.isValid || !hijriDate.format("YYYY/MM/DD")) {
      setDateError(true);
      toast.error(t("form.dateRequired"));
      return;
    }

    if (!selectedTime) {
      setTimeError(true);
      toast.error(t("form.timeRequired"));
      return;
    }

    if (!images.some((img) => img?.file)) {
      toast.error(t("form.imageRequired"));
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", data["name"] ?? "");
      formData.append("phone", data["phone"] ?? "");
      formData.append("address", data["address"] ?? "");
      formData.append("offer_type", data["offer_type"] ?? "");
      formData.append("date", data["date"] ?? "");
      formData.append("time", selectedTime ?? "");
      formData.append("description", data["description"] ?? "");
      formData.append("requester_type", data["requester_type"] ?? "");

      images.map((image) => {
        if (image?.file) {
          formData.append("images[]", image.file);
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DBURL}/api/inspection-requests`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": locale,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || t("form.errorMessage");
        toast.error(errorMessage);
        return;
      }

      toast.success(t("form.successMessage"));
      reset();
      setImages([null, null, null]);
      setHijriDate(null);
      setSelectedTime(null);
    } catch (error) {
      console.error("Error submitting inspection request:", error);
      toast.error(t("form.errorMessage"));
    }
  };

  return (
    <div className="flex flex-col w-[91%] md:w-[66.3%] mx-auto mt-10">
      <ToastContainer />
      <div className="flex flex-col gap-y-[16px]">
        <h1 className="font-bold text-[20px] text-custom-maincolor md:text-[32px] leading-[22.32px] md:leading-[35.71px] text-center">
          {t("form.title")}
        </h1>
        <p className="font-normal text-[16px] leading-[17.86px] text-custom-gray525 md:text-[20px] md:leading-[22.32px] text-center">
          {t("form.description")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-y-[16px] md:gap-y-[32px] mt-[40px] md:mt-[32px] flex-wrap"
      >
        {/* name, phone, address, ownership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full ">
          <div className="flex flex-col gap-y-[16px] w-full ">
            <label className="text-custom-maincolor text-[16px] font-semibold">
              {t("form.nameLabel")}
            </label>
            <input
              {...register("name", { required: t("form.nameRequired") })}
              type="text"
              placeholder={t("form.namePlaceholder")}
              className="MuiOutlinedInput-root text-[16px] font-medium text-custom-gray525 rounded-md border border-custom-gray525 p-2 outline-none"
            />
            {errors.name && (
              <p className="text-red-500">{t("form.nameRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-[16px] w-full ">
            <label className="text-custom-maincolor text-[16px] font-semibold">
              {t("form.phoneLabel")}
            </label>
            <input
              {...register("phone", {
                required: t("form.phoneRequired"),
                minLength: {
                  value: 6,
                  message: t("form.phoneMinLength"),
                },
              })}
              type="tel"
              placeholder={t("form.phonePlaceholder")}
              className={`MuiOutlinedInput-root text-[16px] ${
                isRTL ? "placeholder:text-end" : "placeholder:text-start"
              } font-medium text-custom-gray525 rounded-md border border-custom-gray525 p-2 outline-none`}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-[16px] w-full ">
            <label className="text-custom-maincolor text-[16px] font-semibold">
              {t("form.addressLabel")}
            </label>
            <input
              {...register("address", { required: t("form.addressRequired") })}
              type="text"
              placeholder={t("form.addressPlaceholder")}
              className="MuiOutlinedInput-root text-[16px] font-medium text-custom-gray525 rounded-md border border-custom-gray525 p-2 outline-none"
            />
            {errors.address && (
              <p className="text-red-500">{t("form.addressRequired")}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-[16px] w-full ">
            <label className="text-custom-maincolor text-[16px] font-semibold">
              {t("form.ownershipLabel")}
            </label>
            <input
              {...register("requester_type", {
                required: t("form.ownershipRequired"),
              })}
              type="text"
              placeholder={t("form.ownershipPlaceholder")}
              className="MuiOutlinedInput-root text-[16px] font-medium text-custom-gray525 rounded-md border border-custom-gray525 p-2 outline-none"
            />
            {errors.requester_type && (
              <p className="text-red-500">{t("form.ownershipRequired")}</p>
            )}
          </div>
        </div>

        {/* hijri date, time */}
        <div className="flex flex-col lg:flex-row gap-y-[16px] gap-x-[16px] w-full ">
          <div className="flex-1 flex flex-col gap-y-[16px] relative">
            <label className="text-custom-maincolor text-[16px] font-semibold">
              {t("form.date")}
            </label>
            <input
              {...register("date", { required: t("form.dateRequired") })}
              type="text"
              value={
                hijriDate
                  ? hijriDate.format("YYYY/MM/DD")
                  : t("form.datePlaceholder")
              }
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
              className="cursor-pointer MuiOutlinedInput-root text-[16px] font-medium text-custom-gray525 rounded-md border border-custom-gray525 p-2 outline-none"
            />
            {showCalendar && (
              <Calendar
                value={hijriDate}
                onChange={handleDateChange}
                calendar={arabic}
                locale={arabic_ar}
                minDate={new DateObject()}
              />
            )}
            {dateError && (
              <p className="text-red-500">{t("form.dateRequired")}</p>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-y-[16px]">
            <label
              htmlFor="time"
              className="text-custom-maincolor text-[16px] font-semibold"
            >
              {t("form.time")}
            </label>
            <div className="w-full relative ">
              <input
                type="time"
                id="time"
                value={selectedTime}
                onChange={handleTimeChange}
                required
                className="order-1 w-full MuiOutlinedInput-root font-medium text-custom-gray525 rounded-md border border-custom-gray525 p-2 outline-none pr-10" // Added padding-right for icon
              />

              {/* Custom Time Picker Icon */}
              <div className="absolute pointer-events-none top-0 bottom-0 right-3 flex items-center order-2">
                <svg
                  className="w-5 h-5 text-custom-maincolor"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1ZM11 6a1 1 0 1 1 2 0v5.586l2.707 2.707a1 1 0 1 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Disable Time Picker if needed */}
              {isTimePickerDisabled && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    zIndex: 1,
                    cursor: "not-allowed",
                  }}
                />
              )}
            </div>

            {errors.time && (
              <p className="text-red-500">{t("form.timeRequired")}</p>
            )}
          </div>
        </div>

        {/* proposal type */}
        <div className="flex flex-col gap-y-[16px] w-full">
          <label className="text-custom-maincolor text-[16px] font-semibold">
            {t("form.offerTypeLabel")}
          </label>
          <div className="flex flex-row items-center justify-start gap-x-[5px]">
            <label className="flex items-center gap-x-[18px]">
              <input
                type="radio"
                {...register("offer_type", {
                  required: t("form.offerTypeRequired"),
                })}
                value="sale"
                className="appearance-none border-[2px] border-[#18AD8F] rounded-full w-[16px] h-[16px] checked:bg-[#18AD8F] checked:border-[#18AD8F] focus:outline-none"
              />
              <span className="text-[#9ca3af] text-[16px] font-bold">
                {t("form.offerTypeSale")}
              </span>
            </label>
            <label className="flex items-center gap-x-[18px]">
              <input
                type="radio"
                {...register("offer_type", {
                  required: t("form.offerTypeRequired"),
                })}
                value="rent"
                className="appearance-none border-[2px] border-[#18AD8F] rounded-full w-[16px] h-[16px] checked:bg-[#18AD8F] checked:border-[#18AD8F] focus:outline-none"
              />
              <span className="text-[#9ca3af] text-[16px] font-bold">
                {t("form.offerTypeRent")}
              </span>
            </label>
          </div>
          {errors.offer_type && (
            <p className="text-red-500">{errors.offer_type.message}</p>
          )}
        </div>

        {/* description */}
        <div className="flex flex-col gap-y-[16px] w-full ">
          <label className="text-custom-maincolor text-[16px] font-semibold">
            {t("form.descriptionLabel")}
          </label>
          <textarea
            {...register("description", {
              required: t("form.descriptionRequired"),
            })}
            placeholder={t("form.descriptionPlaceholder")}
            className="h-[188px] resize-none text-[16px] font-medium text-custom-gray525 rounded-md border border-[#D3C5C5] p-2 outline-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* images label */}
        <div className="flex flex-col gap-y-[16px] w-full ">
          <label className="text-custom-maincolor text-[16px] font-semibold">
            {t("form.imageslabel")}
          </label>
          <p>{t("form.imagesdescription")}</p>
        </div>

        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative bg-[#ECECEC] w-[300px] h-[254px] flex flex-col items-center justify-center rounded-md mx-auto"
          >
            <Image src="/uploadImg.svg" alt="Preview" width={60} height={60} />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => handleImageChange(e, i)}
            />
            {images[i]?.preview && (
              <Image
                src={images[i].preview}
                alt="Preview"
                fill
                sizes="(min-width: 808px) 50vw, 100vw"
                style={{
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            )}
            <p>{t("form.upload")}</p>
          </div>
        ))}

        <button
          type="submit"
          className="rounded-md bg-custom-maincolor text-white font-semibold text-[16px] py-2 w-full md:w-[400px] mx-auto mb-10"
        >
          {t("form.button")}
        </button>
      </form>
    </div>
  );
}
