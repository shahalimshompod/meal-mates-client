import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";
import { IoLocationSharp } from "react-icons/io5";
import { FcExpired } from "react-icons/fc";

const FeaturedFoodCard = ({ foodData }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    additionalNotes,
    foodStatus,
    donatorName,
  } = foodData;
  return (
    <div
      data-aos="flip-left"
      className=" w-80 lg:w-96 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <img
        src={foodImage}
        alt={foodName}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-800">{foodName}</h3>

        <p className="text-sm my-1 font-semibold bg-green-200 w-1/2 text-center rounded-xl">
          {foodStatus}
        </p>

        <p className="text-sm text-gray-600 mb-2">
          <strong>Quantity:</strong> {foodQuantity}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <strong>
            <span>
              <IoLocationSharp size={20} />
            </span>
          </strong>{" "}
          {pickupLocation}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <strong>
            <FcExpired size={20} />
          </strong>{" "}
          {new Date(expiredDateTime).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Notes:</strong> {additionalNotes}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Donator:</strong> {donatorName || "Anonymous"}
        </p>
        <p className={`text-sm font-semibold `}>Status: {foodStatus}</p>
        <Link
          to={`/food-details/${_id}`}
          className="mt-4 btn bg-button hover:bg-btnHover text-black px-4 py-2 rounded-md transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoodCard;
