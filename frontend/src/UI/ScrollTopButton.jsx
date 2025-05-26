import { useEffect, useState } from "react";

export default function ScrollTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className={`btn btn-danger shadow-lg scroll-top-btn fw-bolder ${
                    isVisible ? "visible" : ""
                }`}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 9999,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    fontSize: "24px",
                    pointerEvents: isVisible ? "auto" : "none",
                }}
            >
                <i className="bi bi-arrow-up" />
            </button>
        )
    );
}
