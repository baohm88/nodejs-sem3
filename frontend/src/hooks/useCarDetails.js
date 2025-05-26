import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useCarDetails = (carId) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!carId) {
            setCar(null);
            setError(null);
            return;
        }

        setCar(null);
        setError(null);

        async function fetchListing() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8080/listings/${carId}`
                );

                if (!res.data.success === true) {
                    toast.error(res.data.message);
                }

                setCar(res.data.data[0]);
            } catch (err) {
                setError("Failed to fetch car details: ", err);
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [carId]);

    return { car, loading, error };
};
