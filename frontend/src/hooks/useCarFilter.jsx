import { useState, useEffect } from "react";
import { isActive, isEnded } from "../utils/helpers";

const CARS_PER_PAGE = 3;

export default function useCarFilter({
    cars = [],
    searchTerm = "",
    yearFrom,
    yearTo,
    transmission = "All",
    bodyStyle = "All",
    sortBy = "end_soon",
    status = "All",
}) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, yearFrom, yearTo, transmission, bodyStyle, sortBy, status]);

    const filteredCars = cars.filter((car) => {
        const matchesSearch = `${car.year_model ?? ""} ${car.make} ${car.model}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesYear =
            car.year_model >= yearFrom && car.year_model <= yearTo;

        const matchesTransmission =
            transmission === "All" || car.transmission === transmission;

        const matchesBodyStyle =
            bodyStyle === "All" || car.body_style === bodyStyle;

        const matchesStatus =
            status === "All" ||
            (status === "Active" && isActive(car)) ||
            (status === "Ended" && isEnded(car));

        return (
            matchesSearch &&
            matchesYear &&
            matchesTransmission &&
            matchesBodyStyle &&
            matchesStatus
        );
    });

    // Sort
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortBy === "newly_listed") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === "lowest_mileage") {
            return a.mileage - b.mileage;
        }
        return new Date(a.end_time) - new Date(b.end_time);
    });

    // Pagination
    const indexOfLastItem = currentPage * CARS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - CARS_PER_PAGE;
    const currentCars = sortedCars.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        loading: false,
        currentCars,
        filteredCars: sortedCars,
        currentPage,
        paginate,
        totalPages,
    };
}
