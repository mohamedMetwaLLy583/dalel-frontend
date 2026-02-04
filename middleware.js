import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar", "en"],

  // Used when no locale matches
  defaultLocale: "ar",
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
