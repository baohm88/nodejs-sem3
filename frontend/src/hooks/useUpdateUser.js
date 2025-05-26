import { useCallback } from "react";

export default function useUpdateUser(setUser) {
    const updateUser = useCallback((data) => {
        const rawUser = data?.data?.[0];
        if (!rawUser) {
            console.warn("No user data found in API response.");
            return;
        }

        // Detect structure from bid or deposit
        const updatedUser = rawUser.f_user_id ? rawUser.f_user_id : rawUser;

        if (updatedUser) {
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } else {
            console.warn("User data missing in response.");
        }
    }, [setUser]);

    return updateUser;
}
