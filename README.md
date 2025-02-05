<!-- # MealMates

MealMates is a web application designed to connect food donors with those in need. It allows users to view and sort available food items by expiry date, search for specific items, and toggle between layout views for a better browsing experience.

---

## Live URL- https://mealmates-293e5.web.app/
[Visit MealMates Live](https://mealmates-293e5.web.app/)


---

## Purpose
The primary purpose of MealMates is to minimize food waste by providing a platform for people to donate surplus food to those in need. The app ensures the food can be effectively distributed before its expiry date.

---

## Key Features
- **Dynamic Food Cards**: Food details are displayed in cards, featuring images, donor information, and expiry status.
- **Search Functionality**: Users can search food items by name or pickup location.
- **Sorting**: Allows sorting food items by expiry date (ascending/descending).
- **Layout Toggle**: Toggle between grid views (2-column and 3-column layouts).
- **Firebase Authentication**: Secure user authentication and session management.
- **Responsive Design**: Fully responsive and user-friendly on all devices.
- **Animation**: Smooth animations for enhanced user experience.
- **API Integration**: Fetches live data from a server for available food items.
- **ADD FOOD**: User can add/donate food.
- **REQUEST FOOD**: User can request foods.

---

## Backend Technologies
The backend is built using the following technologies:
- **Node.js**: JavaScript runtime for the server-side.
- **Express.js**: Backend framework to build RESTful APIs.
- **MongoDB**: NoSQL database for storing food and user data.
- **dotenv**: For managing environment variables securely.

The backend is deployed on **Vercel**, ensuring high performance and scalability.

---

## Frontend Technologies
The frontend is built using **React** and deployed on **Firebase Hosting**. It includes:
- **Firebase Authentication**: For user login and registration.

---

## NPM Packages Used
### Frontend
- **React Router**: For handling client-side routing.
- **React Icons**: To include scalable vector icons.
- **React Hook Form**: For managing forms and validation.
- **AOS (Animate On Scroll)**: For adding scroll animations.
- **TanStack Query (React Query)**: For fetching, caching, and managing server state efficiently.

### Backend
- **Express**: For building RESTful APIs.
- **dotenv**: For managing environment variables.
- **MongoDB**: A NoSQL database for storing and managing application data.

---

## Deployment
- **Frontend**: Deployed on **Firebase Hosting**.
- **Backend**: Deployed on **Vercel**. -->


# MealMates

MealMates is a web application designed to connect food donors with those in need. The platform helps reduce food waste by ensuring surplus food is donated and distributed before its expiry date. Users can browse, search, and sort food items based on expiry dates while benefiting from a seamless and interactive interface.

---

## Live Demo

[Visit MealMates Live](https://mealmates-293e5.web.app/)

---

## Screenshot

(Include a clean screenshot of the application interface here.)

---

## Technologies Used

### Frontend

- **React** (JavaScript library for UI development)
- **Firebase Authentication** (User authentication and session management)
- **Tailwind CSS** & **DaisyUI** (Styling and responsive UI components)
- **React Router** (Client-side routing)
- **React Hook Form** (Form validation and management)
- **AOS (Animate On Scroll)** (Smooth animations)
- **Axios** (API requests handling)

### Backend

- **Node.js** (JavaScript runtime for the server-side)
- **Express.js** (Backend framework for RESTful APIs)
- **MongoDB** (NoSQL database for storing food and user data)
- **dotenv** (Managing environment variables securely)

### Deployment

- **Frontend:** Firebase Hosting
- **Backend:** Vercel

---

## Core Features

- **Dynamic Food Listings**: Display food details including images, donor information, and expiry status.
- **Search Functionality**: Search food items by name or pickup location.
- **Sorting Options**: Sort food items by expiry date (ascending/descending).
- **Layout Toggle**: Switch between 2-column and 3-column grid views.
- **Food Donation**: Users can donate food with an easy-to-use form.
- **Food Requesting**: Users can request available food items.
- **Firebase Authentication**: Secure login and registration.
- **Smooth Animations**: Enhances user experience.

---

## Dependencies

### Frontend Dependencies

```json
"dependencies": {
    "@tanstack/react-query": "^5.62.10",
    "@tanstack/react-query-devtools": "^5.62.10",
    "aos": "^2.3.4",
    "axios": "^1.7.9",
    "firebase": "^11.1.0",
    "lodash": "^4.17.21",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.0",
    "react-slick": "^0.30.3",
    "slick-carousel": "^1.8.1",
    "sweetalert2": "^11.15.3"
}
```

### Development Dependencies

```json
"devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.22",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.13.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.3"
}
```

---

## Running the Project Locally

Follow these steps to set up MealMates on your local machine:

### Prerequisites

- Node.js installed on your system
- MongoDB (local or cloud instance)
- Firebase project setup for authentication

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/mealmates.git
   cd mealmates
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the required Firebase and MongoDB credentials.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

5. **Run the backend server:**

   ```bash
   cd backend
   node server.js
   ```

   The backend will be available at `http://localhost:5000`.

---

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Express.js Documentation](https://expressjs.com/)

---

Enjoy using **MealMates** and help reduce food waste! 🍽️

