"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ReviewsForm = ({ locale }) => {
  const t = useTranslations();
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(""); // State to store rating error

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (rating === 0) {
      setRatingError(t("Home.formRatingRequired"));
      return;
    }
    setRatingError("");

    try {
      const formData = new FormData();
      formData.append("name", data["name"] ?? "");
      formData.append("review", data["review"] ?? "");
      formData.append("country", data["country"] ?? "");
      formData.append("rating", rating ?? "");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DBURL}/api/reviews`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      reset();
      setRating(0);
      toast.success(t("Home.formSuccessMessagereview"));
    } catch (error) {
      toast.error(t("Home.formErrorMessage"));

      console.error("Form submission failed:", error);
    }
  };
  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[40px]"
      >
        <div className="flex flex-row items-start justify-between gap-x-[16px]">
          {/* Name Input */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <label
              htmlFor="name"
              className="font-bold text-[16px] text-custom-maincolor leading-[17.86px] mb-[24px]"
            >
              {t("Home.formNameLabel")}
            </label>
            <input
              {...register("name", { required: t("Home.formNameRequired") })}
              type="text"
              id="name"
              placeholder={t("Home.formNamePlaceholder")}
              className="border rounded-[6px] p-2 outline-none w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* Country Input */}
          <div className="flex-1  flex flex-col items-start justify-center">
            <label
              htmlFor="country"
              className="font-bold text-[16px] text-custom-maincolor mb-[24px] leading-[17.86px]"
            >
              {t("Home.formCountryLabel")}
            </label>
            <input
              {...register("country", {
                required: t("Home.formCountryRequired"),
              })}
              type="text"
              id="country"
              placeholder={t("Home.formCountryPlaceholder")}
              className="border rounded-[6px] p-2 outline-none w-full"
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start">
          {/* Comment Text Area */}
          <label
            htmlFor="review"
            className="leading-[17.86px] font-bold text-[16px] text-custom-maincolor mb-[24px]"
          >
            {t("Home.formCommentLabel")}
          </label>
          <textarea
            {...register("review", {
              required: t("Home.formCommentRequired"),
            })}
            id="review"
            rows="7"
            placeholder={t("Home.formCommentPlaceholder")}
            className="border rounded p-2 outline-none w-full"
          />
          {errors.comment && (
            <p className="text-red-500">{errors.review.message}</p>
          )}
        </div>

        {/* Rating Section */}
        <div dir="ltr" className="flex flex-col items-center justify-center ">
          <div className="flex flex-row items-center justify-center gap-x-[20px]">
            <Rater
              total={5}
              rating={rating}
              onRate={({ rating }) => setRating(rating)}
              className="text-[30px] flex flex-row"
            />
            <p className="text-[24px] text-[#cccccc] font-medium">{rating}/5</p>
          </div>
          {ratingError && <p className="text-red-500">{ratingError}</p>}
        </div>

        <button
          type="submit"
          className="bg-custom-maincolor text-custom-whiteColor hover:text-custom-maincolor rounded-[6px] w-full text-[14px] md:text-[20px] hover:bg-custom-whiteColor transition duration-300 py-2 md:py-1"
        >
          {t("Home.formSubmitButton")}
        </button>
      </form>
    </>
  );
};

export default ReviewsForm;
