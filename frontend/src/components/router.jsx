import { createBrowserRouter } from "react-router-dom";

import ClientLayout from "../layouts/ClientLayout";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

// User components
import ProtectedRoute from "./ProtectedRoute";
import BookDetails from "./BookDetails";
import UpdateBook from "./user/UpdateBook";
import AddBook from "./user/AddBook";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            {
                path: "/add-car",
                element: (
                    <ProtectedRoute>
                        <AddBook />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/books/:id",
                element: <BookDetails />,
            },
            {
                path: "/books/:id/edit",
                element: (
                    <ProtectedRoute>
                        <UpdateBook />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
