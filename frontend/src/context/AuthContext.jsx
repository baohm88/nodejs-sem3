import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext({
    user: null,
    token: null, // Add token to context
    setAuth: () => {}, // Combined setter
    isAuthenticated: false,
    isAdmin: false,
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem("auth");
        return savedAuth ? JSON.parse(savedAuth) : { user: null, token: null };
    });

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            if (auth.user && auth.token) {
                localStorage.setItem("auth", JSON.stringify(auth));
            } else {
                localStorage.removeItem("auth");
            }
        }
    }, [auth]);

    const isAuthenticated = !!auth.token;
    const isAdmin = auth.user?.admin === true;

    const logout = () => {
        setAuth({ user: null, token: null });
    };

    return (
        <AuthContext.Provider
            value={{
                user: auth.user,
                token: auth.token,
                setAuth,
                logout,
                isAuthenticated,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
