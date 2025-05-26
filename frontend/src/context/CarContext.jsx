import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CarContext = createContext({
    cars: [],
    loading: false,
    error: null,
    getEndingSoonCars: (id) => {
        id;
    },
    addNewCar: (newCar) => {},
});

export const CarProvider = ({ children }) => {
    const [cars, setCarsState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load cars from localstorage or fetch from server
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const activeListings = await axios.get(
                    "http://localhost:8080/listings"
                );

                const endedListings = await axios.get(
                    "http://localhost:8080/listings/ended"
                );

                const combined = [
                    ...activeListings.data.data,
                    ...endedListings.data.data,
                ];

                setCarsState(combined);
                localStorage.setItem("cars", JSON.stringify(combined));
            } catch (err) {
                setError("Failed to fetch cars.");
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Keep localStorage in sync when cars change
    const setCars = (updatedCars) => {
        setCarsState(updatedCars);
        localStorage.setItem("cars", JSON.stringify(updatedCars));
    };

    // Add a new car (status = pending, adminMessage = null)
    const addNewCar = (newCar) => {
        const newCarWithDefaults = {
            ...newCar,
            status: "pending",
            adminMessage: null,
        };
        const updated = [...cars, newCarWithDefaults];
        setCars(updated);
    };

    const getEndingSoonCars = (currentCarId) => {
        if (!currentCarId || !cars || cars.length === 0) return [];

        const now = new Date();
        const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

        return cars
            .filter((car) => {
                const endTime = new Date(car.end_time);
                return (
                    endTime > now &&
                    endTime <= in24Hours &&
                    car.id !== currentCarId
                );
            })
            .sort((a, b) => new Date(a.end_time) - new Date(b.end_time))
            .slice(0, 4); // limit to 4 cars
    };

    return (
        <CarContext.Provider
            value={{
                cars,
                loading,
                error,
                getEndingSoonCars,
                setCars,
                addNewCar,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};

export const useCarContext = () => useContext(CarContext);
