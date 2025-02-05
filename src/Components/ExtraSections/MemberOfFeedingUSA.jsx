import { useEffect, useState } from "react";
import { FaChildren, FaHandshakeSimple } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import 'aos/dist/aos.css';
import Aos from "aos";


const MemberOfFeedingUSA = () => {
    const [hovered1, setHovered1] = useState(false)
    const [hovered2, setHovered2] = useState(false)
    const [hovered3, setHovered3] = useState(false)

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="bg-btnHover px-3 xl:px-0 py-10 md:py-20">
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row items-center gap-5 xl:gap-0 justify-around">
                    <div>
                        <h1 data-aos="flip-down" className="w-full text-xl md:text-2xl xl:text-4xl text-white xl:text-left text-center">We are also a member of the <span className="font-bold">Feeding America</span> network, the nation's largest hunger-relief organization.</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-10">
                        <div data-aos="flip-right" onMouseEnter={() => setHovered1(true)} onMouseLeave={() => setHovered1(false)} className="flex flex-col items-center">
                            <div className={`border-2 border-white rounded-full p-3 mb-0 md:mb-5 ease-in-out duration-500 ${hovered1 ? 'bg-white' : 'bg-transparent'}`}>
                                <FaChildren size={70} className={hovered1 ? 'text-btnHover' : 'text-white'} />
                            </div>
                            <h1 className="text-3xl md:text-5xl text-white mb-0 md:mb-3 font-bold">267,000</h1>
                            <p className="text-base font-bold text-white w-[270px]">Food Insecure Served Annually</p>
                        </div>

                        <div data-aos="flip-right" onMouseEnter={() => setHovered2(true)} onMouseLeave={() => setHovered2(false)} className="flex flex-col items-center">
                            <div className={`border-2 border-white rounded-full p-3 mb-0 md:mb-5 ease-in-out duration-500 ${hovered2 ? 'bg-white' : 'bg-transparent'}`}>
                                <FaHandshakeSimple size={70} className={hovered2 ? 'text-btnHover' : 'text-white'} />
                            </div>
                            <h1 className="text-3xl md:text-5xl text-white mb-0 md:mb-3 font-bold">174</h1>
                            <p className="text-base font-bold text-white w-[235px]">Agency Partners & Pantries</p>
                        </div>

                        <div data-aos="flip-right" onMouseEnter={() => setHovered3(true)} onMouseLeave={() => setHovered3(false)} className="flex flex-col items-center">
                            <div className={`border-2 border-white rounded-full p-3 mb-0 md:mb-5 ease-in-out duration-500 ${hovered3 ? 'bg-white' : 'bg-transparent'}`}>
                                <GiKnifeFork size={70} className={hovered3 ? 'text-btnHover' : 'text-white'} />
                            </div>
                            <h1 className="text-3xl md:text-5xl text-white mb-0 md:mb-3 font-bold">30</h1>
                            <p className="text-base font-bold text-white w-[205px]">Meals Provided with $10</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberOfFeedingUSA;