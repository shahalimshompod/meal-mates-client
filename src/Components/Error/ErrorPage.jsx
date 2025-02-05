import { Link, useLocation, useRouteError } from "react-router-dom";
import error from "../../assets/logo/404.png"
import { useEffect } from "react";
const ErrorPage = () => {
    useEffect(() => {
        document.title = "404 PAGE NOT FOUND";
    }, []);
    const errorType = useRouteError()

    const Location = useLocation()
    const path = Location.pathname;

    return (
        <section className="w-screen h-screen pt-12 px-3 xl:px-0 bg-gradient-to-br from-btnHover/50 via-button to-btnHover/50">
            <div className="flex flex-col items-center gap-6">
                <h1 className="md:text-[280px] text-7xl font-bold text-center flex items-center ">4 <span><img className="md:w-[240px] w-16" src={error} alt="error" /></span> 4</h1>

                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-semibold font-montserrat">Oops!!!</h3>
                    <p className="font-montserrat">Page {errorType.statusText || errorType.message}</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2 font-montserrat">
                    <p>Estimated Root Cause:</p>
                    <p className="border-2 bg-accent rounded-full px-2">{path}</p>
                    <p>is not a valid path.</p>
                </div>

                <Link to='/'>
                    <button className="btn rounded-xl bg-orange border-none text-white hover:bg-orange text-base font-bold  hover:text-black ">Go Home</button>
                </Link>
            </div>
        </section>
    );
};

export default ErrorPage;