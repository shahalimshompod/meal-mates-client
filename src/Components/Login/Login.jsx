import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import Swal from "sweetalert2";




const Login = () => {
    const {signInWithGoogle, loginLoader, setLoginLoader, user, setUser, googleLoginLoader, setGoogleLoginLoader, loginUser} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState({});


    // handle submit
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email, password);
        loginUser (email, password)
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
                title: "Logged in successfully"
            });
            navigate(location?.state ? location.state : '/')
        })
        .catch(error => {
            const errorCode = error.code;
            setLoginError({...loginError, login: errorCode })
            setLoginLoader(false)
        })
        
    };

    // handle login with google
    const handleSignInWithGoogle = (e) => {
        e.preventDefault()
        signInWithGoogle()
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
                title: "Logged in successfully"
            });
            setGoogleLoginLoader(false)
            navigate(location?.state ? location.state : '/')
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="flex items-center justify-center :bg-for2 py-10 md:py-24 lg:py-44 px-3 xl:px-0">
            <div className=":bg-primary p-6 rounded shadow-md w-96 border :border-none">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="font-bold mb-4 text-center font-bebas :text-textPrimary text-3xl tracking-widest">Login</h2>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium font-montserrat :text-textPrimary">Email</label>
                        <input placeholder="Your email" type="email" {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-secondary font-roboto" />

                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium font-montserrat :text-textPrimary">Password</label>
                        <input placeholder="password" type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters", }, })}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary font-roboto" />

                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full btn bg-button hover:bg-button border-none ">{loginLoader ? (<span className="loading loading-spinner text-neutral"></span>) : 'Login'}</button>
                    {
                        loginError && <p className="text-red-600">{loginError.login}</p>
                    }
                    <Link className="text-blue-500 hover:underline">
                        Forget password
                    </Link>
                </form>
                <div className="divider divider-error :text-textPrimary font-bebas text-xl">OR</div>
                {/* continue with google */}
                <button onClick={handleSignInWithGoogle} className="btn w-full my-3 bg-transparent hover:bg-offWhite :text-textPrimary hover:text-black">{googleLoginLoader ? (<span className="loading loading-spinner text-warning"></span>) : (<div className="flex items-center justify-center gap-2 "><img className="w-6" src="https://i.ibb.co.com/SxYTXfD/search.pnghttps://i.ibb.co.com/SxYTXfD/search.png" alt="google logo" /><p className="font-montserrat">Continue with Google</p> </div>)}</button>

                {/* Don't Have an Account Link */}
                <p className="text-center text-sm :text-textPrimary">
                    Already have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;