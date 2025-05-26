import { useAuth } from "../context/AuthContext";

export default function useLogOut() {
    const { logout } = useAuth();

    const logOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
        }
    };

    return logOut;
}
