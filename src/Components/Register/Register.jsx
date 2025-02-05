import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import Swal from "sweetalert2";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState({})
    const { setUser, signInWithGoogle, createUser, updateUser, registerLoader, setRegisterLoader, googleLoginLoader, setGoogleLoginLoader } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //   onclick handler
    const onSubmit = (data) => {
        const email = data.email;
        const image = data.image;
        const name = data.name;
        const password = data.password;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user)
                console.log(user);
                // alert
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Registered successfully"
                });
                updateUser({ displayName: name, photoURL: image })
                navigate(location?.state ? location.state : '/')
            }).catch(error => {
                const errorCode = error.code;
                setRegisterError({ ...registerError, register: errorCode })
                setRegisterLoader(false)
            })
    };

    // sign in with google
    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                console.log(user);
                // alert
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Logged in successfully"
                });
                setGoogleLoginLoader(false)

                navigate(location?.state ? location.state : '/')
            })
            .catch(error => console.log(error))
    };


    return (
        <div className="flex items-center justify-center :bg-for2 py-11 px-3 xl:px-0">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" border p-6 rounded shadow-md w-96"
            >
                <h2 className="text-3xl tracking-wider font-bold mb-4 text-center font-bebas">Register</h2>

                {/* Name Field */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium font-montserrat ">Name</label>
                    <input type="text" placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary font-roboto"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium font-montserrat :text-textPrimary">Email</label>
                    <input type="email" placeholder="example@site.com"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary font-roboto"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium font-montserrat :text-textPrimary">Password</label>
                    <input placeholder="Password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                            validate: {
                                hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) || "Must contain an uppercase letter",
                                hasLowerCase: (value) =>
                                    /[a-z]/.test(value) || "Must contain a lowercase letter",
                            },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Image URL Field */}
                <div className="mb-4">
                    <label className="block mb-2 font-medium font-montserrat :text-textPrimary">Image URL</label>
                    <input placeholder="Image URL"
                        {...register("image")}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary font-roboto"
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}
                </div>

                {/* Register Button */}
                <button type="submit" className="w-full btn  bg-button hover:bg-button border-none">{registerLoader ? (<span className="loading loading-spinner text-neutral"></span>) : 'Register'}</button>
                {
                    registerError && <p className="text-red-600">{registerError.register}</p>
                }
                <div className="divider divider-error :text-textPrimary font-bebas text-xl">OR</div>

                {/* continue with google */}
                <button onClick={handleGoogleSignIn} className="btn w-full my-3 bg-transparent hover:text-black">{googleLoginLoader ? (<span className="loading loading-spinner text-warning"></span>) : (<div className="flex items-center justify-center gap-2 "><img className="w-6" src="https://i.ibb.co.com/SxYTXfD/search.pnghttps://i.ibb.co.com/SxYTXfD/search.png" alt="google logo" /><p className="font-montserrat">Continue with Google</p> </div>)}</button>

                {/* Already Have an Account Link */}
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to='/login' className="text-blue-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;