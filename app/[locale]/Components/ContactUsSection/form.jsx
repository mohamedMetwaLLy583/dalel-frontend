"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ContactForm = ({ locale }) => {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${(process.env.DB_URL || process.env.NEXT_PUBLIC_DBURL)}/api/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      reset();
      toast.success(t("Home.formSuccessMessage"));
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
        className="flex flex-col gap-[12px] md:gap-[24px]"
      >
        <input
          {...register("name", { required: t("Home.formNameRequired") })}
          type="text"
          id="name"
          placeholder={t("Home.formNamePlaceholder")}
          className="border rounded-[6px] p-2 outline-custom-secondarycolor"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("email", {
            required: t("Home.formEmailRequired"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("Home.formEmailInvalid"),
            },
          })}
          type="email"
          id="email"
          placeholder={t("Home.formEmailPlaceholder")}
          className="border rounded-[6px] p-2 outline-custom-secondarycolor"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <textarea
          {...register("message", { required: t("Home.formMessageRequired") })}
          id="message"
          rows="2"
          placeholder={t("Home.formMessagePlaceholder")}
          className="border rounded p-2 mb-[12px] outline-custom-secondarycolor"
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <button
          type="submit"
          className="bg-custom-secondarycolor text-custom-whiteColor hover:text-custom-maincolor rounded-[6px] w-full text-[14px] md:text-[20px] bg-custom-maincolor hover:bg-custom-whiteColor transition duration-300 py-2 md:py-1"
        >
          {t("Home.formSubmitButton")}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
