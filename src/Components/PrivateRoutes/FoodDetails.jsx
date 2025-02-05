import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContextProvider';
import { TiInfoLarge } from 'react-icons/ti';
import axios from 'axios';
import Swal from 'sweetalert2';

const FoodDetails = () => {
    const [selectedFood, setSelectedFood] = useState(null);
    const { user } = useContext(AuthContext)
    const { displayName, email } = user;
    const navigate = useNavigate();

    // request date
    const requestDate = new Date().toLocaleString();


    const detailsData = useLoaderData();
    const { foodName, foodImage, foodQuantity, pickupLocation, expiredDateTime, additionalNotes, foodStatus, donatorName, donatorImage, donatorEmail, _id } = detailsData;

    // form
    const { register, handleSubmit, reset } = useForm();


    // handle open modal
    const openModal = (food) => {
        setSelectedFood(food);

    }

    // handle Request
    const onSubmit = async (data) => {
        const id = _id;
        const foodStatus = 'requested'
        const additionalNotes = data.additionalNotes;
        const requestDate = new Date().toLocaleString();
        const requestorEmail = data.email

        const wantToChange = {
            foodStatus,
            additionalNotes,
            requestDate,
            requestorEmail
        }

        try {
            const { data } = await axios.patch(`https://my-assignment-11-server-pi.vercel.app/food-details/${id}`, wantToChange, { withCredentials: true })
            if (data.modifiedCount) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Food requested successfully!',
                    icon: 'success',
                    confirmButtonText: 'Got it'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/my-food-requests')
                    }
                })

            }
        } catch (error) {
            console.error(error.response.statusText);
            const status = error.response.statusText;
            Swal.fire({
                title: 'Error!',
                text: `${status} Access`,
                text: 'Food request has not been sent!',
                icon: 'error',
                confirmButtonText: 'Got it'
            })
        }

    };

    return (
        <div className=' mx-auto container mt-6 md:mt-8 lg:mt-12 mb-5 md:mb-10 lg:mb-20 px-3'>
            <h1 className='text-4xl font-tanHeadline text-center mb-5 md:mb-10 lg:mb-20'>Food Details</h1>
            <div className=" w-full lg:flex bg-white shadow-md rounded-lg">
                {/* Food Image */}
                <div className=" lg:w-1/2">
                    <img
                        src={foodImage}
                        alt="Food"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                <div className='p-2 md:p-3 lg:p-5'>
                    {/* Food Information */}
                    <div className="space-y-4">
                        <div className='flex flex-col md:flex-row md:justify-between md:items-center lg:gap-80'>
                            <h2 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">{foodName}</h2>
                            {/* Food Status */}
                            <div className='bg-green-100 px-2 rounded-xl w-1/4 text-center'>
                                <p className="text-green-600 text-xs font-medium">{foodStatus}</p>
                            </div>
                        </div>
                        <p className="text-gray-600"><strong>Quantity: </strong>{foodQuantity}</p>
                        <p className="text-gray-600"><strong>Pickup Location: </strong>{pickupLocation}</p>
                        <p className="text-gray-600"><strong>Expired Date: </strong>{expiredDateTime}</p>
                        <p className="text-gray-600"><strong>Additional Notes: </strong>{additionalNotes}</p>
                    </div>

                    {/* Donator Information */}
                    <h1 className='mt-6 mb-3 font-bold text-2xl'>Donator Information</h1>
                    <div className="flex items-center space-x-4">
                        <img
                            src={donatorImage}
                            alt="Donator"
                            className="w-16 h-16 md:w-24 md:h-24 rounded-full  border border-gray-300"
                        />
                        <div>
                            <p className="text-gray-800 font-semibold">{donatorName}</p>
                            <p className="text-gray-600 text-sm">{donatorEmail}</p>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div className='flex items-center gap-5  mt-5'>
                            <button disabled={donatorEmail === email && 'disabled'} onClick={() => openModal(detailsData)} className='btn lg:mt-14 bg-orange text-white hover:bg-orange/90 border-none'>Request Food</button>
                        </div>
                        {
                            donatorEmail === email && <div className="tooltip border border-red-600 bg-red-200 rounded-full px-1" data-tip="Donator cannot request their own food!">
                                <button className="text-red-600"><TiInfoLarge size={20} /></button>
                            </div>
                        }
                    </div>


                </div>
            </div>
            {/* Update Modal */}
            {selectedFood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg lg:w-1/2 w-11/12 max-h-[90vh] overflow-y-auto">
                        <div className='flex flex-col md:flex-row md:items-center justify-between  mb-4 border-b-2'>
                            <h2 className="text-2xl font-bold">Request Food</h2>
                            <h2><span>Current date & time: </span> <span>{requestDate}</span></h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                <div>
                                    <label className="block mb-2">Food Name</label>
                                    <input disabled
                                        {...register("foodName")}
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.foodName}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Food Image URL</label>
                                    <input disabled
                                        {...register("foodImage")}
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.foodImage}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Food Quantity</label>
                                    <input disabled
                                        {...register("foodQuantity")}
                                        type="number"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.foodQuantity}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Pickup Location</label>
                                    <input disabled
                                        {...register("pickupLocation")}
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        defaultValue={selectedFood.pickupLocation}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2">Expired Date/Time</label>
                                    <input disabled
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
                                {...register("donatorName")}
                                type="text"
                                className="input input-bordered w-full mb-4"
                                defaultValue={selectedFood.donatorName}
                                disabled
                            />

                            <label className="block mb-2">Donator Email</label>
                            <input {...register("donatorEmail")}
                                type="email"
                                className="input input-bordered w-full mb-6"
                                defaultValue={selectedFood.donatorEmail}
                                disabled
                            />

                            <h2 className="font-bold text-xl mb-2">Your Information</h2>

                            <label className="block mb-2">Your Name</label>
                            <input {...register("displayName")}
                                type="text"
                                className="input input-bordered w-full mb-4"
                                defaultValue={displayName}
                                disabled
                            />

                            <label className="block mb-2">Your Email</label>
                            <input {...register("email")}
                                type="email"
                                className="input input-bordered w-full mb-4"
                                defaultValue={email}
                                disabled
                            />

                            <div className="flex justify-end gap-4">
                                <button type="button"
                                    className="btn btn-sm bg-red-400 text-black hover:text-white hover:bg-red-600"
                                    onClick={() => setSelectedFood(null)}>
                                    Close
                                </button>
                                <button type="submit" className="btn btn-sm bg-button hover:bg-btnHover hover:text-white">
                                    Send Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
