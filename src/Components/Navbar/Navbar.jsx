import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const [scroll, setScroll] = useState(0);

  const navImage = user?.photoURL;
  const navName = user?.displayName;

  // Scroll side effect handle
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle user logout
  const handleLogout = () => {
    userLogout();
    // Alert
    Swal.fire({
      icon: "warning",
      title: "Logged out successfully",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  return (
    <div
      className={` top-0 left-0 w-full z-[1050] transition-transform duration-500 ${
        scroll >= 300 ? "bg-[#FFE9DB] shadow-lg fixed" : "bg-orange/20 "
      }`}
    >
      <div className="navbar container mx-auto py-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1100]"
            >
              <li>
                <NavLink
                  to="/"
                  className="btn btn-sm bg-transparent border-none shadow-none"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/available-foods"
                  className="btn btn-sm bg-transparent border-none shadow-none"
                >
                  Available Foods
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/add-food"
                      className="btn btn-sm bg-transparent border-none shadow-none"
                    >
                      Add Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/manage-my-foods"
                      className="btn btn-sm bg-transparent border-none shadow-none"
                    >
                      Manage My Foods
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-food-requests"
                      className="btn btn-sm bg-transparent border-none shadow-none"
                    >
                      My Food Requests
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="flex items-center">
            <img className="w-20" src={logo} alt="Logo" />
            <h3 className="font-tanHeadline text-black/70 text-xs md:text-xl xl:text-2xl hidden md:block">
              Sharing Flavor
            </h3>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink
              to="/"
              className="btn btn-sm bg-transparent border-none shadow-none hover:bg-orange/50"
            >
              Home
            </NavLink>
            <NavLink
              to="/available-foods"
              className="btn btn-sm bg-transparent border-none shadow-none hover:bg-orange/50"
            >
              Available Foods
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/add-food"
                  className="btn btn-sm bg-transparent border-none shadow-none hover:bg-orange/50"
                >
                  Add Food
                </NavLink>
                <NavLink
                  to="/manage-my-foods"
                  className="btn btn-sm bg-transparent border-none shadow-none hover:bg-orange/50"
                >
                  Manage My Foods
                </NavLink>
                <NavLink
                  to="/my-food-requests"
                  className="btn btn-sm bg-transparent border-none shadow-none hover:bg-orange/50"
                >
                  My Food Requests
                </NavLink>
                <NavLink
                  to="/about-us"
                  className="btn btn-sm bg-transparent border-none shadow-none hover:bg-orange/50"
                >
                  About Us
                </NavLink>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end mr-3">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user ? (
                  <img
                    alt="User Profile"
                    title={navName || "User Profile"}
                    src={navImage}
                  />
                ) : (
                  <FaUserCircle size={40} />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1100] md:hidden"
            >
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn w-full bg-transparent border-none shadow-none"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="btn w-full bg-transparent border-none shadow-none"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="btn w-full bg-transparent border-none shadow-none"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleLogout}
                className="btn mr-3 bg-orange hover:bg-orange border-none"
              >
                Logout
              </button>
            ) : (
              <div className="flex">
                <Link
                  to="/login"
                  className="btn mr-3 bg-button hover:bg-button border-none"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn bg-btnHover hover:bg-btnHover border-none text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
