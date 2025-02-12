import React from "react";
import logo from '../../assets/logo/logo.png'
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FcExpired } from "react-icons/fc";

const FoodCard = ({ foodData, isThreeColumn }) => {
    const { foodName, foodImage, foodQuantity, pickupLocation, expiredDateTime, additionalNotes, foodStatus, donatorName, donatorImage, _id } = foodData

    return (
        <div
            className={`w-full bg-white rounded-lg shadow-md border border-gray-200 transform transition-transform duration-300 hover:scale-105 ${isThreeColumn ? "" : "flex"
                }`}
        >
            <img
                src={foodImage}
                alt={foodName}
                className={`object-cover rounded-t-lg ${isThreeColumn ? "w-full h-48" : "h-96 w-1/2 rounded-none"
                    }`}
            />
            <div className={`${isThreeColumn ? "p-5" : "p-5 w-1/2"}`}>
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {foodName}
                    </h3>

                    <p className={`text-sm font-semibold bg-green-200 ${isThreeColumn ? 'w-1/3' : 'w-1/2'} text-center rounded-xl`}>{foodStatus}</p>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                    <strong>Quantity:</strong> <span className="font-bold text-xl">{foodQuantity}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <strong><span><IoLocationSharp size={20} /></span></strong> <span>{pickupLocation}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <strong><FcExpired size={20} /></strong>{" "}
                    <span>{new Date(expiredDateTime).toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                    <strong>Notes:</strong> {additionalNotes}
                </p>

                <div>
                    <p className="bg-orange/10 text-center my-5">Donator Information:</p>
                    <div className="flex items-center gap-3">
                        <img className="w-10 rounded-full" src={donatorImage} alt="" />
                        <p>{donatorName}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Link to={`/food-details/${_id}`} className="mt-4 bg-button hover:bg-btnHover text-black px-4 py-2 rounded-md transition">
                        View Details
                    </Link>
                    <img className="w-16 opacity-30" src={logo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
