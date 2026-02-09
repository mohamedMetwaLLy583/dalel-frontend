"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";
import "dayjs/locale/ar";

export default function ReservationForm({ data, locale, partnerId }) {
  const isRTL = locale === "ar";
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
    reset,
  } = useForm();
  const [hijriDate, setHijriDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [isTimePickerDisabled, setIsTimePickerDisabled] = useState(true);

  const reservedDates = data.reservedDates || [];
  const blockedDates = data.blocked_dates || [];

  const formatDate = (date) => date.format("DD-MM-YYYY");

  const isDateDisabled = (date) => {
    const formattedDate = formatDate(date);
    return blockedDates.includes(formattedDate);
  };

  const handleDateChange = (date) => {
    setHijriDate(date);
    const formattedDate = formatDate(date);
    setFormValue("hijriDate", formattedDate);
    setShowCalendar(false);

    const reservation = reservedDates.find((d) => d.date === formattedDate);
    setUnavailableTimes(reservation ? reservation.times : []);
    setIsTimePickerDisabled(false);
  };

  const shouldDisableTime = (value, view) => {
    if (view === "hours") {
      const formattedHour = value.hour().toString().padStart(2, "0");
      return unavailableTimes.some((time) => time.startsWith(formattedHour));
    }
    if (view === "minutes") {
      const selectedHour = selectedTime?.hour().toString().padStart(2, "0");
      return unavailableTimes.includes(
        `${selectedHour}:${value.minute().toString().padStart(2, "0")}`,
      );
    }
    return false;
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

  const onSubmit = async (formData) => {
    const payload = {
      property_id: data.id,
      name: formData.name,
      phone: formData.phone,
      date: formData.hijriDate,
      time: formData.time,
      partner_id: partnerId,
    };

    // console.log("Form Data Submitted:", payload);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DBURL}/api/reservations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success(t("ReservationForm.successMessage"));
        reset();
        setHijriDate(new DateObject({ calendar: arabic }));
        setSelectedTime(null);
        setIsTimePickerDisabled(true);
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || t("ReservationForm.errorMessage");
        toast.error(errorMessage);
        console.error("Error submitting reservation:", response.statusText);
      }
    } catch (error) {
      toast.error(t("ReservationForm.unexpectedError"));
      console.error("Error:", error);
    }
  };
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-y-[24px]">
      <ToastContainer />
      <h2
        className={`${
          isRTL ? "pr-[16px]" : "pl-[16px]"
        } text-custom-whiteColor font-bold rounded-[5px] leading-[22.32px] bg-custom-maincolor w-full h-[38px] flex items-center justify-start`}
      >
        {t("ReservationForm.bookNow")}{" "}
      </h2>
      <p className="text-[14px] text-custom-gray525 font-normal">
        {t("ReservationForm.description")}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[24px] md:gap-y-[32px]"
      >
        <div className="flex flex-row gap-x-[16px]">
          <div className="flex flex-col gap-y-[24px] flex-1">
            <label
              htmlFor="name"
              className="text-custom-gray5D text-[16px] font-bold leaing-[17.86px]"
            >
              {t("ReservationForm.nameLabel")}
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              id="name"
              type="text"
              placeholder={t("ReservationForm.namePlaceholder")}
              className="w-full h-[48px] outline-none border-[#D3C5C5] border-[1px] rounded-[10px] placeholder:text-[14px] px-[8px]"
            />
            {errors.name && (
              <p className="text-red-500">{t("ReservationForm.nameError")}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-[24px] flex-1">
            <label
              htmlFor="phone"
              className="text-custom-gray5D text-[16px] font-bold leaing-[17.86px]"
            >
              {t("ReservationForm.phoneLabel")}
            </label>
            <input
              {...register("phone", {
                required: "Phone is required",
              })}
              id="phone"
              type="tel"
              placeholder={t("ReservationForm.phonePlaceholder")}
              className={`w-full h-[48px] outline-none border-[#D3C5C5] border-[1px] rounded-[10px] placeholder:text-[14px] px-[8px] ${
                isRTL ? "text-end" : "text-start"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500">{t("ReservationForm.phoneError")}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-x-[16px]">
          <div className="flex-1 flex flex-col gap-y-[24px] relative">
            <label
              htmlFor="data"
              className="text-custom-gray5D text-[16px] font-bold leading-[17.86px]"
            >
              {t("ReservationForm.dateLabel")}
            </label>
            <div className="relative w-full">
              <input
                {...register("date", { required: "Hijri Date is required" })}
                type="text"
                value={
                  hijriDate
                    ? formatDate(hijriDate)
                    : t("ReservationForm.datePlaceholder")
                }
                placeholder={t("ReservationForm.datePlaceholder")}
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full h-[48px] outline-none border-[#D3C5C5] border-[1px] rounded-[10px] placeholder:text-[14px] px-[8px]"
              />
              <img
                src="/detailspage/lets-icons_date-range-fill.svg"
                alt="Custom icon"
                className={`absolute ${
                  isRTL ? "left-[12px]" : "right-[12px]"
                } top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]`}
              />
            </div>
            {showCalendar && (
              <div className="absolute z-10 mt-2">
                <Calendar
                  value={hijriDate}
                  onChange={handleDateChange}
                  calendar={arabic}
                  locale={arabic_ar}
                  minDate={new DateObject()}
                  mapDays={({ date }) => {
                    const isDisabled = isDateDisabled(date);
                    return {
                      disabled: isDisabled,
                      className: isDisabled ? "disabled-date" : "",
                    };
                  }}
                />
              </div>
            )}
            {errors.hijriDate && (
              <p className="text-red-500">{t("ReservationForm.dateError")}</p>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-y-[24px] relative">
            <label
              htmlFor="time-picker"
              className="text-custom-gray5D text-[16px] font-bold leading-[17.86px]"
            >
              {t("ReservationForm.timeLabel")}
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
          </div>
        </div>
        <button
          type="submit"
          className="w-[214px] h-[48px] rounded-[5px] mx-auto bg-custom-maincolor text-custom-whiteColor"
        >
          {t("ReservationForm.submitButton")}
        </button>
      </form>
    </div>
  );
}
