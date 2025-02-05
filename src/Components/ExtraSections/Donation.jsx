import { Link } from "react-router-dom";

const Donation = () => {
    return (
        <div className="bg-[url('https://i.ibb.co.com/BNDNVg4/f208a4c678.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="flex items-center justify-center h-full bg-black bg-opacity-60 py-56">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
                    <div className="flex flex-col items-center gap-3 lg:gap-5">
                        <h1 className="text-white text-2xl lg:text-4xl xl:text-5xl font-bold">EVERY DONATION HELPS</h1>
                        <p className="text-white text-lg lg:text-2xl text-center">Put food on the table for a family in need</p>
                        <p className="text-white text-lg lg:text-2xl font-bold">$10 = 30 MEALS</p>
                    </div>
                    <div>
                        <Link to='/under-construction' className="btn btn-wide text-xl bg-orange border-none text-white hover:bg-orange/80">Donate</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;
