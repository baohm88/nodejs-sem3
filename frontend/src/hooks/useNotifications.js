import { useEffect, useState } from "react";

export const useNotifications = (userId) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(`user_notifications_${userId}`);
        setNotifications(stored ? JSON.parse(stored) : []);
    }, [userId]);

    const markAllAsRead = () => {
        const updated = notifications.map((n) => ({ ...n, read: true }));
        localStorage.setItem(
            `user_notifications_${userId}`,
            JSON.stringify(updated)
        );
        setNotifications(updated);
    };

    return { notifications, markAllAsRead };
};
