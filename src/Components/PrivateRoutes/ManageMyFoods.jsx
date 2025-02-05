import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import loader from "../../assets/logo/cutlery.gif";
import { TiInfoLarge } from "react-icons/ti";

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const { email, displayName } = user;
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { register, handleSubmit, reset } = useForm();

    // Fetch user's foods
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`https://my-assignment-11-server-pi.vercel.app/manage-my-foods?email=${encodeURIComponent(email)}`, { withCredentials: true })
            .then((res) => {
                setFoods(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching foods:", error);
                setIsLoading(false);
            });
    }, [email]);

    // Handle Delete Action
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://my-assignment-11-server-pi.vercel.app/manage-my-foods/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if (result.deletedCount > 0) {
                            const restFoodsToShow = foods.filter((food) => id !== food._id);
                            setFoods([...restFoodsToShow]);

                            Swal.fire({
                                title: "Deleted!",
                                text: "Food has been deleted from all places",
                                icon: "success",
                            });
                        }
                    });
            }
        });
    };

    // Handle Update Action (set selected food)
    const handleUpdate = (food) => {
        setSelectedFood(food);
    };

    // Fetch data for the update modal when food is selected
    useEffect(() => {
        if (selectedFood) {
            axios
                .get(`https://my-assignment-11-server-pi.vercel.app/manage-my-foods/${selectedFood._id}`)
                .then((res) => {
                    reset(res.data);
                })
                .catch((error) => console.error("Error fetching update modal single food data:", error));
        }
    }, [selectedFood, reset]);

    // Handle Update Submit
    const onSubmit = (data) => {
        const { _id, foodName, donatorName, donatorImage, foodImage, pickupLocation, expiredDateTime, donatorEmail, additionalNotes } = data;
        const foodQuantity = parseInt(data.foodQuantity);

        const updatedData = {
            foodName,
            donatorName,
            donatorImage,
            foodImage,
            foodQuantity,
            pickupLocation,
            expiredDateTime,
            donatorEmail,
            additionalNotes,
        };

        // Trigger the mutation with the form data
        fetch(`https://my-assignment-11-server-pi.vercel.app/available-foods/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((result) => {s
                if (result.modifiedCount > 0) {
                    const updatedFoods = foods.map((food) =>
                        food._id === selectedFood._id ? { ...food, ...data } : food
                    );
                    setFoods(updatedFoods);
                    setSelectedFood(null);

                    Swal.fire({
                        title: "Updated!",
                        text: "Food details have been updated successfully.",
                        icon: "success",
                    });
                }
            });
    };

    // Loader
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img className="w-20" src={loader} alt="Loading..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto my-8 px-3 xl:px-0">
            <h1 className="text-3xl font-bold my-10 font-tanHeadline">Manage My Foods</h1>
            <div className="overflow-x-hidden">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="hidden lg:grid lg:grid-cols-4 border">
                            <th className="border py-3">Food name & status</th>
                            <th className="border py-3">Pickup location & expired date</th>
                            <th className="border py-3">Food quantity</th>
                            <th className="border py-3">Actions</th>
                        </tr>
                    </thead>
                    {foods.length === 0 && (
                        <div className="h-[50vh]">
                            <h1 className="text-center font-bold text-xl md:text-2xl mt-10">
                                You haven't added/donated any food yet.
                            </h1>
                        </div>
                    )}
                    <tbody>
                        {foods.map((food) => (
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
                                            <span
                                                className={`bg-green-100 px-1 rounded-lg font-semibold text-xs text-green-600 ${food.foodStatus !== "available" &&
                                                    "bg-red-300 text-red-600"
                                                    }`}
                                            >
                                                {food.foodStatus}
                                            </span>
                                            {food.foodStatus !== "available" && (
                                                <div
                                                    className="tooltip border border-red-600 bg-red-200 rounded-full px-1"
                                                    data-tip="The foods which are already requested cannot be updated or deleted"
                                                >
                                                    <button className="text-red-600">
                                                        <TiInfoLarge />
                                                    </button>
                                                </div>
                                            )}
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

                                {/* Food Quantity */}
                                <td className="text-center mb-2 lg:mb-0">
                                    <div className="lg:hidden font-bold">Food Quantity</div>
                                    {food.foodQuantity}
                                </td>

                                {/* Actions */}
                                <td className="flex gap-3 items-center justify-center">
                                    <button
                                        disabled={food.foodStatus !== "available"}
                                        onClick={() => handleUpdate(food)}
                                        className="btn bg-button hover:bg-btnHover hover:text-white"
                                    >
                                        <GrUpdate size={20} /> Update
                                    </button>
                                    <button
                                        disabled={food.foodStatus !== "available"}
                                        onClick={() => handleDelete(food._id)}
                                        className="btn bg-red-500 text-white hover:bg-red-600"
                                    >
                                        <MdDeleteForever size={25} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {selectedFood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg lg:w-1/2 w-11/12 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Update Food</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                <div>
                                    <label className="block mb-2">Food Name</label>
                                    <input
                                        {...register("foodName")}
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.foodName}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Food Image URL</label>
                                    <input
                                        {...register("foodImage")}
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.foodImage}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Food Quantity</label>
                                    <input
                                        {...register("foodQuantity")}
                                        type="number"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.foodQuantity}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Pickup Location</label>
                                    <input
                                        {...register("pickupLocation")}
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.pickupLocation}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Expired Date/Time</label>
                                    <input
                                        {...register("expiredDateTime")}
                                        type="date"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.expiredDateTime}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Additional Notes</label>
                                    <textarea
                                        {...register("additionalNotes")}
                                        className="textarea textarea-bordered w-full mb-4"
                                        defaultValue={selectedFood.additionalNotes}
                                    ></textarea>
                                </div>
                            </div>

                            <h2 className="font-bold text-xl mb-2">Donator Information</h2>

                            <label className="block mb-2">Donator Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full mb-4"
                                defaultValue={displayName}
                                disabled
                            />

                            <label className="block mb-2">Donator Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full mb-4"
                                defaultValue={email}
                                disabled
                            />

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => setSelectedFood(null)}
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-sm btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMyFoods;
