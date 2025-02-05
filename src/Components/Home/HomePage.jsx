import { useRef } from "react";
import HomeBanner from "../Banner/HomeBanner";
import BlogSection from "../ExtraSections/BlogSection";
import Donation from "../ExtraSections/Donation";
import MemberOfFeedingUSA from "../ExtraSections/MemberOfFeedingUSA";
import UpcomingEvents from "../ExtraSections/UpcomingEvents";
import FeaturedFood from "../FeaturedFood/FeaturedFood";

const HomePage = () => {
    const upcomingEventsRef = useRef(null);

    // Scroll function
    const scrollToUpcomingEvents = () => {
        console.log('btn clicked');
        if (upcomingEventsRef.current) {
            upcomingEventsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="overflow-x-hidden">
            <HomeBanner scrollToUpcomingEvents={scrollToUpcomingEvents}></HomeBanner>
            <FeaturedFood></FeaturedFood>

            <UpcomingEvents></UpcomingEvents>

            <MemberOfFeedingUSA></MemberOfFeedingUSA>
            <BlogSection></BlogSection>
            <div  ref={upcomingEventsRef}>
            <Donation></Donation>
            </div>
        </div>
    );
};

export default HomePage;