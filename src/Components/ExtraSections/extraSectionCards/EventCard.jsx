import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({data}) => {
    const {date, description, eventName, image, location, time} = data
    
    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden my-10">
            <div className="relative">
                <img
                    src={image}
                    alt="Event"
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h2 className="text-white text-xl font-tanHeadline w-1/2 text-center">
                        {eventName}
                    </h2>
                </div>
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-500">
                    <span>{date}</span> @ <span>{time}</span>
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {location}
                </h3>
                <p className="text-gray-600 text-sm my-2">
                    {description}
                </p>
                <Link to='/under-construction' className="btn bg-button hover:bg-btnHover border-none shadow-sm text-black hover:text-white hover:ease-in-out hover:duration-300">Learn More!</Link>
            </div>
        </div>
    );
};

export default EventCard;
