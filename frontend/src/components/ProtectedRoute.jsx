import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, adminOnly = false }) {
    const { isAdmin, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        toast.error("You must log in first!");
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        alert("Access denied!");
        return <Navigate to="/" replace />;
    }

    return children;
}
