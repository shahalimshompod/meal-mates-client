import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import loader from "../../assets/logo/cutlery.gif";

const AvailableFoods = () => {
    const [food, setFood] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isThreeColumn, setIsThreeColumn] = useState(
        JSON.parse(localStorage.getItem("isThreeColumn")) ?? true
    );

    const fetchFoods = (search = "", sort = "") => {
        axios
            .get("https://my-assignment-11-server-pi.vercel.app/available-foods", {
                params: { search, sort },
            })
            .then((res) => {
                setFood(res.data);
            })
            .catch((error) => {
                console.error("Error fetching available foods:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // fetch food
    useEffect(() => {
        fetchFoods();
    }, []);

    // layout toggle button func
    const handleLayoutToggle = () => {
        const newLayout = !isThreeColumn;
        setIsThreeColumn(newLayout);
        localStorage.setItem("isThreeColumn", JSON.stringify(newLayout));
    };

    // search func
    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.value;
        setSearchQuery(search);
        fetchFoods(search, sortOrder);
    };

    // sort btn func
    const handleSort = (order) => {
        setSortOrder(order);
        fetchFoods(searchQuery, order);
    };

    // clear sort btn func
    const clearFilters = () => {
        setSearchQuery("");
        setSortOrder("");
        fetchFoods();
    };

    // loader
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img className="w-20" src={loader} alt="Loading" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center container mx-auto mb-20 px-3 xl:px-0">
            <div className="w-full flex flex-wrap items-center justify-between my-5 gap-4">
                <h1 className="font-tanHeadline text-2xl sm:text-3xl">Available Foods</h1>
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-auto">
                        <CiSearch size={25} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by food name"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="border p-2 pl-10 rounded-lg w-full sm:w-auto"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <select
                        className="select select-bordered max-w-xs"
                        value={sortOrder}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        <option disabled value="">Sort by</option>
                        <option value="asc">Date (Ascending)</option>
                        <option value="desc">Date (Descending)</option>
                    </select>

                    {/* Clear Filters */}
                    <button
                        className="btn bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={clearFilters}
                    >
                        Clear Sort & Search
                    </button>

                    {/* Layout Toggle */}
                    <button className="btn btn-circle hidden lg:flex" onClick={handleLayoutToggle}>
                        {isThreeColumn ? (
                            <BsGrid3X3GapFill size={25} />
                        ) : (
                            <BsGridFill size={25} />
                        )}
                    </button>
                </div>
            </div>

            {/* Food Cards */}
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 w-full ${isThreeColumn ? "xl:grid-cols-3" : "lg:grid-cols-2"}`}
            >
                {food.map((foodData) => (
                    <FoodCard
                        key={foodData._id}
                        isThreeColumn={isThreeColumn}
                        foodData={foodData}
                    />
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
