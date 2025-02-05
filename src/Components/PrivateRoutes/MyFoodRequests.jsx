import { useContext, useEffect, useState } from "react";
import loader from "../../assets/logo/cutlery.gif"
import { AuthContext } from "../AuthContext/AuthContextProvider";
import axios from "axios";

const MyFoodRequests = () => {
    const [loading, setLoading] = useState(true);
    const [requestedFoodData, setRequestedFoodData] = useState([]);
    const { user } = useContext(AuthContext);
    const { email } = user;

    // fetching data
    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://my-assignment-11-server-pi.vercel.app/my-food-requests?email=${encodeURIComponent(email)}`, { withCredentials: true })
            .then((response) => {
                setRequestedFoodData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);


    // Loader
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img className="w-20" src={loader} alt="" />
            </div>
        );
    }


    return (

        <div className="container mx-auto my-8 px-3 xl:px-0">

            <h1 className="text-3xl font-bold my-10 font-tanHeadline">My food requests</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="hidden lg:grid lg:grid-cols-4 border">
                            <th className="border py-3">Food name & status</th>
                            <th className="border py-3">Pickup location & <br /> expired date</th>
                            <th className="border py-3">Request Date & time </th>
                            <th className="border py-3">Donator Name</th>
                        </tr>
                    </thead>
                    {
                        requestedFoodData.length === 0 && (<div className="h-[50vh]">
                            <h1 className="text-center font-bold text-xl md:text-2xl mt-10">You haven't requested any food yet.</h1>
                        </div>)
                    }
                    <tbody>
                        {requestedFoodData.map((food) => (
                            <tr
                                key={food._id}
                                className="lg:grid lg:grid-cols-4 items-center border py-1 flex flex-col lg:flex-row"
                            >
                                {/* Food Name & Status */}
                                <td className="flex flex-col lg:flex-row items-center lg:gap-3 py-3 lg:py-0">
                                    <div className="avatar mb-2 lg:mb-0">
                                        <div className="mask h-24 w-44">
                                            <img
                                                className="rounded-xl"
                                                src={food.foodImage}
                                                alt={food.foodName}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold mb-2 text-xl">{food.foodName}</div>
                                        <div className="text-sm flex items-center gap-1">
                                            Food status:{"  "}
                                            <span className={`bg-green-100 px-1  rounded-lg font-semibold text-xs text-green-600 ${food.foodStatus !== 'available' && 'bg-red-300 text-red-600'}`}>
                                                {food.foodStatus}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Pickup Location & Expired Date */}
                                <td className="text-center mb-2 lg:mb-0">
                                    <div className="lg:hidden font-bold">Pickup Location</div>
                                    {food.pickupLocation}
                                    <br />
                                    <div className="lg:hidden font-bold mt-2">Expired Date</div>
                                    <span className="badge badge-ghost badge-sm">
                                        {food.expiredDateTime}
                                    </span>
                                </td>

                                {/* request date */}
                                <td className="text-center mb-2 lg:mb-0">
                                    <span className="lg:hidden font-semibold">Request date & time:</span> <br />
                                    {food?.requestDate}
                                </td>

                                {/* Actions */}
                                <p className="font-bold text-xl mb-2 lg:hidden">Donator Information:</p>
                                <td className="flex gap-3 items-center justify-center">
                                    <div><img className="w-8 lg:w-16  rounded-full" src={food.donatorImage} alt="" /></div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{food.donatorName}</span>
                                        <span className="text-xs">{food.donatorEmail}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFoodRequests;