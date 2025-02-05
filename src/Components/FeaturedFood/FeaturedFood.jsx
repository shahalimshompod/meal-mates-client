import { useQuery } from "@tanstack/react-query";
import FeaturedFoodCard from "./FeaturedFoodCard";
import { Link } from "react-router-dom";
import 'aos/dist/aos.css';
import Aos from "aos";
import { useEffect } from "react";

const FeaturedFood = () => {

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);



    const { isError, error, isPending, data: featuredFoodData } = useQuery({
        queryKey: ['featuredFoods'],
        queryFn: async () => {
            const res = await fetch('https://my-assignment-11-server-pi.vercel.app/featured-food');
            return res.json();
        }
    })

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <span className="loading loading-spinner text-error"></span>
            </div>
        );
    }

    if (isError) {
        return <p>{error.message}</p>
    }


    return (
        <div>
            <div className="flex flex-col items-center pt-10 pb-20 bg-gradient-to-br from-orange/20 via-transparent to-orange/20 px-3 xl:px-0">
                <h1 data-aos="fade-down" className="font-tanHeadline text-2xl md:text-4xl my-10">Featured foods</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {
                        featuredFoodData?.map(foodData => <FeaturedFoodCard key={foodData._id} foodData={foodData}></FeaturedFoodCard>)
                    }
                </div>

                <Link className="btn mt-10 bg-gradient-to-br from-btnHover via-button to-btnHover hover:from-button hover:via-btnHover hover:to-button transition hover:ease-in-out hover:duration-300" to='/available-foods'>Show all</Link>
            </div>
        </div>
    );
};

export default FeaturedFood;