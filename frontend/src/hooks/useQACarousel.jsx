import { useCallback, useEffect, useRef, useState } from "react";

export default function useQACarousel(qas) {
    const scrollRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const getVisibleCardCount = () => {
        const width = window.innerWidth;
        return width < 768 ? 1.25 : 2.5;
    };

    const updatePagination = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        const totalCards = qas.length;
        const visibleCount = getVisibleCardCount();
        const totalPages = Math.ceil(totalCards / visibleCount);
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.firstChild?.offsetWidth + 16;
        const current = Math.round(scrollLeft / (cardWidth * visibleCount));

        setMaxPages(totalPages);
        setCurrentPage(current);
        setCanScrollLeft(scrollLeft > 5); // <-- add buffer
        setCanScrollRight(
            scrollLeft + container.offsetWidth < container.scrollWidth - 5
        );
    }, [qas]);

    const scrollByCards = (cardCount) => {
        const container = scrollRef.current;
        const cardEl = container?.firstChild;
        if (cardEl) {
            const cardWidth = cardEl.offsetWidth + 16;
            container.scrollBy({
                left: cardWidth * cardCount,
                behavior: "smooth",
            });
            setTimeout(updatePagination, 300);
        }
    };

    useEffect(() => {
        updatePagination();
        window.addEventListener("resize", updatePagination);
        return () => window.removeEventListener("resize", updatePagination);
    }, [updatePagination]);

    return {
        scrollRef,
        scrollByCards,
        currentPage,
        maxPages,
        canScrollLeft,
        canScrollRight,
        updatePagination,
    };
}
