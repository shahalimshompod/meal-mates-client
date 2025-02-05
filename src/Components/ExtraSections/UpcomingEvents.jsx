import { useEffect, useState } from "react";
import EventCard from "./extraSectionCards/EventCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import 'aos/dist/aos.css';


const UpcomingEvents = () => {
    const [eventData, setEventData] = useState([]);
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        fetch('/upcomingFoodDrivesEvents.json')
            .then((res) => res.json())
            .then((data) => setEventData(data.upcomingEvents));
    }, []);



    useEffect(() => {
        Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);


    return (
        <div className="my-20 container mx-auto px-3">
            <div className="flex flex-col items-center">
                <h1 data-aos="fade-down" className="text-center font-tanHeadline text-lg md:text-xl lg:text-4xl mb-5">
                    Upcoming Food Drives and Events
                </h1>
                <p data-aos="fade-up" className="text-center text-sm lg:text-base w-full md:w-3/4 lg:w-1/2">
                    The "Upcoming Food Drives and Events" section highlights community initiatives, keeping you updated on food drives and gatherings. Explore opportunities to participate and make a difference!
                </p>
            </div>
            <div className="overflow-x-hidden">
                <Slider {...settings}>
                    {eventData.map((data) => (
                        <EventCard key={data.id} data={data}></EventCard>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default UpcomingEvents;
