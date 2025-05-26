import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WATCH_LIST_KEY = "watch_list";

const WatchListContext = createContext({
    watchList: [],
    addToWatchList: (id) => {
        id;
    },
    removeFromWatchList: (id) => {
        id;
    },
    isInWatchList: false,
});

export const WatchListProvider = ({ children }) => {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(WATCH_LIST_KEY);
        if (stored) {
            setWatchList(JSON.parse(stored));
        }
    }, []);

    const saveToStorage = (items) => {
        localStorage.setItem(WATCH_LIST_KEY, JSON.stringify(items));
    };

    const addToWatchList = (carId) => {
        if (carId && !watchList.includes(carId)) {
            const updated = [...watchList, carId];
            setWatchList(updated);
            toast.success("Added to Watch List ✅");
            saveToStorage(updated);
        }
    };

    const removeFromWatchList = (carId) => {
        const updated = watchList.filter((id) => id !== carId);
        setWatchList(updated);
        toast.info("Removed from Watch List ❌");
        saveToStorage(updated);
    };

    const isInWatchList = (carId) => watchList.includes(carId);

    return (
        <WatchListContext.Provider
            value={{
                watchList,
                addToWatchList,
                removeFromWatchList,
                isInWatchList,
            }}
        >
            {children}
        </WatchListContext.Provider>
    );
};

export const useWatchList = () => useContext(WatchListContext);
