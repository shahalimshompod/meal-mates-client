import Aos from "aos";
import 'aos/dist/aos.css';
import bannerVideo from "../../assets/banner.mp4";
import { useEffect } from "react";

const HomeBanner = ({ scrollToUpcomingEvents }) => {

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);


    return (
        <div className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] w-full overflow-hidden">
            {/* Video Section */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={bannerVideo}
                autoPlay
                loop
                muted
            />

            {/* Overlay Section */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content Section */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 data-aos="fade-down" className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight font-tanHeadline">
                    Welcome to <span className="text-orange">MEAL MATES</span>
                </h1>
                <p data-aos="flip-left" className="mt-4 text-sm md:text-lg lg:text-xl max-w-2xl">
                    Share surplus food and help reduce waste.
                </p>
                <div  data-aos="fade-up">
                <button
                    onClick={scrollToUpcomingEvents}
                    className="mt-6 btn btn-sm md:btn-md lg:btn-lg bg-btnHover/80 border-none hover:bg-btnHover text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
