import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/Root";
import ErrorPage from "./Components/Error/ErrorPage";
import HomePage from "./Components/Home/HomePage";
import AvailableFoods from "./Components/AvailableFoods/AvailableFoods";
import AddFood from "./Components/PrivateRoutes/AddFood";
import ManageMyFoods from "./Components/PrivateRoutes/ManageMyFoods";
import MyFoodRequests from "./Components/PrivateRoutes/MyFoodRequests";
import Login from "./Components/Login/Login";
import AuthContext from "./Components/AuthContext/AuthContextProvider";
import Register from "./Components/Register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectPrivateRoutes from "./Components/ProtectPrivateRoutes/ProtectPrivateRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FoodDetails from "./Components/PrivateRoutes/FoodDetails";
import UnderConstruction from "./Components/UnderConstruction/UnderConstruction";
import AboutUs from "./Components/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        loader: () => {
          document.title = "Home - Meal Mates";
        },
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
        loader: () => {
          document.title = "Available Foods - Meal Mates";
          return;
        },
      },
      {
        path: "/add-food",
        element: (
          <ProtectPrivateRoutes>
            <AddFood></AddFood>
          </ProtectPrivateRoutes>
        ),
        loader: () => {
          document.title = "Add Foods - Meal Mates";
        },
      },
      {
        path: "/manage-my-foods",
        element: (
          <ProtectPrivateRoutes>
            <ManageMyFoods></ManageMyFoods>
          </ProtectPrivateRoutes>
        ),
        loader: () => {
          document.title = "Manage my foods - Meal Mates";
        },
      },
      {
        path: "/my-food-requests",
        element: (
          <ProtectPrivateRoutes>
            <MyFoodRequests></MyFoodRequests>
          </ProtectPrivateRoutes>
        ),
        loader: () => {
          document.title = "My requested foods - Meal Mates";
        },
      },
      {
        path: "/food-details/:id",
        element: (
          <ProtectPrivateRoutes>
            <FoodDetails></FoodDetails>
          </ProtectPrivateRoutes>
        ),
        loader: ({ params }) => {
          document.title = "Food Details - Meal Mates";
          return fetch(
            `https://my-assignment-11-server-pi.vercel.app/food-details/${params.id}`
          );
        },
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/logIn",
    element: <Login></Login>,
    loader: () => {
      document.title = "Login - Meal Mates";
    },
  },
  {
    path: "/register",
    element: <Register></Register>,
    loader: () => {
      document.title = "Register - Meal Mates";
    },
  },
  {
    path: "/under-construction",
    element: <UnderConstruction></UnderConstruction>,
    loader: () => {
      document.title = "Under Construction - Meal Mates";
    },
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
