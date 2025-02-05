import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { displayName, email, photoURL } = user;
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // post request with mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (foodData) => {
      const { data } = await axios.post('https://my-assignment-11-server-pi.vercel.app/available-foods', foodData, { withCredentials: true })
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Food added to donate Successfully',
        icon: 'success',
        confirmButtonText: 'Got it'
      }).then((result) => {
        if (result.isConfirmed) {
          reset()
          navigate('/available-foods')
        }
      })
    },
    onError: (error) => {
      console.error(error.response.statusText);
      const status = error.response.statusText;
      Swal.fire({
        title: 'Error!',
        text: `${status} Access`,
        text: 'Food has not been added',
        icon: 'error',
        confirmButtonText: 'Got it'
      })
    }
  })

  //submit form data
  const onSubmit = (data) => {
    data.foodQuantity = parseFloat(data.foodQuantity)
    mutateAsync(data);
  };

  return (
    <div className="container mx-auto my-10 px-3 xl:px-0">
      <h2 className="text-center text-2xl font-tanHeadline font-bold mb-5">Add a Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Food Details */}
        <h3 className="text-xl font-semibold">Food Information</h3>
        <div>
          <label>Food Name</label>
          <input
            {...register("foodName", { required: "Food Name is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter food name"
          />
          {errors.foodName && <p className="text-red-500">{errors.foodName.message}</p>}
        </div>

        <div>
          <label>Food Image</label>
          <input
            type="url"
            {...register("foodImage", { required: "Food Image URL is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter food image URL"
          />
          {errors.foodImage && <p className="text-red-500">{errors.foodImage.message}</p>}
        </div>

        <div>
          <label>Food Quantity</label>
          <input
            type="number"
            {...register("foodQuantity", { required: "Food Quantity is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter food quantity"
          />
          {errors.foodQuantity && <p className="text-red-500">{errors.foodQuantity.message}</p>}
        </div>

        <div>
          <label>Pickup Location</label>
          <input
            {...register("pickupLocation", { required: "Pickup Location is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter pickup location"
          />
          {errors.pickupLocation && <p className="text-red-500">{errors.pickupLocation.message}</p>}
        </div>

        <div>
          <label>Expired Date</label>
          <input
            type="date"
            {...register("expiredDateTime", { required: "Expired Date is required" })}
            className="block w-full border rounded p-2"
          />
          {errors.expiredDateTime && <p className="text-red-500">{errors.expiredDateTime.message}</p>}
        </div>

        {/* Food Status */}
        <div>
          <label>Food Status</label>
          <input
            {...register("foodStatus")}
            className="block w-full border rounded p-2"
            defaultValue="available"
            disabled
          />
        </div>

        <div>
          <label>Additional Notes</label>
          <textarea
            {...register("additionalNotes")}
            className="block w-full border rounded p-2"
            placeholder="Enter any additional notes"
          ></textarea>
        </div>



        {/* Donator Information */}
        <h3 className="text-xl font-semibold">Donator Information</h3>
        <div>
          <label>Donator Name</label>
          <input defaultValue={displayName} disabled
            {...register("donatorName", { required: "Donator Name is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter your name"
          />
          {errors.donatorName && <p className="text-red-500">{errors.donatorName.message}</p>}
        </div>

        <div>
          <label>Donator Email</label>
          <input defaultValue={email} disabled
            type="email"
            {...register("donatorEmail", { required: "Donator Email is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter your email"
          />
          {errors.donatorEmail && <p className="text-red-500">{errors.donatorEmail.message}</p>}
        </div>

        <div>
          <label>Donator Image</label>
          <input defaultValue={photoURL} disabled
            type="url"
            {...register("donatorImage", { required: "Donator Image URL is required" })}
            className="block w-full border rounded p-2"
            placeholder="Enter your image URL"
          />
          {errors.donatorImage && <p className="text-red-500">{errors.donatorImage.message}</p>}
        </div>

        {/* Add Button */}
        <div>
          <button
            type="submit"
            className="btn bg-button hover:bg-btnHover hover:ease-in-out hover:duration-300 hover:text-white border-none shadow-lg"
          >
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
