export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen   text-center p-6">
      <div className="animate-fade">
        <h1 className="text-9xl font-bold text-custom-BlackColor drop-shadow-lg">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-custom-gray5D mt-4">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-custom-Gray858 mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      {/* Animation Image
      <div className="mt-8 w-72 md:w-96">
        <img
          src="/not-found/not-found.svg"
          alt="Not Found Illustration"
          className="w-full h-full object-contain animate-swipe"
        />
      </div> */}

      {/* Button to go back */}
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-custom-maincolor text-custom-whiteColor rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-primary-600"
      >
        Go Back Home
      </a>
    </div>
  );
}
