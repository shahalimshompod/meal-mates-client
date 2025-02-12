import { Link, useLocation, useRouteError } from "react-router-dom";
import { useEffect } from "react";
import errorImage from "../../assets/logo/404.png";

const ErrorPage = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  const error = useRouteError();
  const location = useLocation();
  const path = location.pathname;

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-4 text-center">
      <h1 className="text-7xl md:text-9xl font-bold flex items-center">
        4{" "}
        <span>
          <img className="w-16 md:w-32" src={errorImage} alt="404 Error" />
        </span>{" "}
        4
      </h1>

      <h3 className="text-2xl md:text-3xl font-semibold mt-4">
        Oops! Page Not Found
      </h3>
      <p className="text-lg text-gray-700 mt-2">
        {error?.statusText || error?.message}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-4 text-lg text-gray-800">
        <p>Possible Cause:</p>
        <span className="border px-3 py-1 rounded-full bg-black/20 text-white">
          {path}
        </span>
        <p>is not a valid route.</p>
      </div>

      <Link to="/" className="mt-6">
        <button className="px-6 py-3 text-lg font-semibold bg-orange text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Return Home
        </button>
      </Link>
    </section>
  );
};

export default ErrorPage;
