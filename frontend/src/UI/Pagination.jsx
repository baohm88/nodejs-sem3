// src/components/UI/PaginationComponent.jsx
import { Pagination } from "react-bootstrap";

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) return null;

    return (
        <Pagination className="justify-content-center mt-5">
            <Pagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
}
