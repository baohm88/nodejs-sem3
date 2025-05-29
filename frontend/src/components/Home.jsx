// import { useEffect, useState } from "react";
// import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
// import axios from "axios";
// import BookItem from "./BookItem";
// import PaginationComponent from "../UI/Pagination";

// export default function Home() {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortOption, setSortOption] = useState("title");
//     const [storeFilter, setStoreFilter] = useState("");
//     const [storeOptions, setStoreOptions] = useState([]);
//     const [sortDirection, setSortDirection] = useState("asc");
//     const [pagination, setPagination] = useState({
//         currentPage: 1,
//         totalPages: 1,
//         totalItems: 0,
//     });

//     document.title = "Nodejs Bookstore";

//     // Fetch store codes in useEffect
//     useEffect(() => {
//         axios
//             .get("http://localhost:8080/api/books/stores")
//             .then((response) => setStoreOptions(response.data))
//             .catch(console.error);
//     }, []);

//     // Fetch books
//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(
//                     "http://localhost:8080/api/books",
//                     {
//                         params: {
//                             search: searchTerm,
//                             sortBy: sortOption,
//                             sortOrder: sortDirection,
//                             storeCode: storeFilter || undefined,
//                             page: pagination.currentPage,
//                         },
//                     }
//                 );
//                 setBooks(response.data.books);
//                 setPagination({
//                     currentPage: response.data.page,
//                     totalPages: response.data.pages,
//                     totalItems: response.data.total,
//                 });
//                 setLoading(false);
//             } catch (err) {
//                 setError(
//                     err.response?.data?.message || "Failed to fetch books"
//                 );
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, [
//         searchTerm,
//         sortOption,
//         storeFilter,
//         sortDirection,
//         pagination.currentPage,
//     ]);

//     const handlePageChange = (newPage) => {
//         setPagination((prev) => ({
//             ...prev,
//             currentPage: newPage,
//         }));
//     };

//     if (loading) {
//         return (
//             <Container className="text-center mt-5">
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//                 <p>Loading books...</p>
//             </Container>
//         );
//     }

//     if (error) {
//         return (
//             <Container className="text-center mt-5">
//                 <p className="text-danger">{error}</p>
//             </Container>
//         );
//     }

//     return (
//         <Container>
//             <h1 className="my-4">Nodejs Books</h1>

//             {/* Search and Filter Group */}
//             <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
//                 <div className="flex-grow-1" style={{ minWidth: "200px" }}>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by title or description"
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setPagination((prev) => ({
//                                 ...prev,
//                                 currentPage: 1,
//                             }));
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <select
//                         className="form-select"
//                         value={storeFilter}
//                         onChange={(e) => {
//                             setStoreFilter(e.target.value);
//                             setPagination((prev) => ({
//                                 ...prev,
//                                 currentPage: 1,
//                             }));
//                         }}
//                     >
//                         <option value="">All Stores</option>
//                         {storeOptions.map((store) => (
//                             <option key={store} value={store}>
//                                 {store}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <select
//                         className="form-select"
//                         value={sortOption}
//                         onChange={(e) => {
//                             setSortOption(e.target.value);
//                             setPagination((prev) => ({
//                                 ...prev,
//                                 currentPage: 1,
//                             }));
//                         }}
//                     >
//                         <option value="title">Sort by Title</option>
//                         <option value="originPrice">Sort by Price</option>
//                         <option value="createdAt">Sort by Newest</option>
//                     </select>
//                 </div>
//                 <div>
//                     <Button
//                         variant="outline-secondary"
//                         onClick={() => {
//                             setSortDirection((prev) =>
//                                 prev === "asc" ? "desc" : "asc"
//                             );
//                             setPagination((prev) => ({
//                                 ...prev,
//                                 currentPage: 1,
//                             }));
//                         }}
//                     >
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                     </Button>
//                 </div>
//             </div>

//             {/* Book List */}
//             <Row xs={1} md={2} lg={3} className="g-4">
//                 {books.map((book) => (
//                     <Col key={book._id}>
//                         <BookItem book={book} />
//                     </Col>
//                 ))}
//             </Row>

//             {/* Empty State */}
//             {books.length === 0 && (
//                 <div className="text-center my-5">
//                     <h4>No books found</h4>
//                     <p>Try adjusting your search or filters</p>
//                 </div>
//             )}

//             {/* Pagination */}
//             {books.length > 0 && (
//                 <PaginationComponent
//                     currentPage={pagination.currentPage}
//                     totalPages={pagination.totalPages}
//                     onPageChange={handlePageChange}
//                 />
//             )}
//         </Container>
//     );
// }

import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Button, Form } from "react-bootstrap";
import axios from "axios";
import BookItem from "./BookItem";
import PaginationComponent from "../UI/Pagination";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("title");
    const [storeFilter, setStoreFilter] = useState("");
    const [storeOptions, setStoreOptions] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10, // Default items per page
    });

    document.title = "Nodejs Bookstore";

    // Fetch store codes in useEffect
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/books/stores")
            .then((response) => setStoreOptions(response.data))
            .catch(console.error);
    }, []);

    // Fetch books
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:8080/api/books",
                    {
                        params: {
                            search: searchTerm,
                            sortBy: sortOption,
                            sortOrder: sortDirection,
                            storeCode: storeFilter || undefined,
                            page: pagination.currentPage,
                            limit: pagination.itemsPerPage,
                        },
                    }
                );
                setBooks(response.data.books);
                setPagination((prev) => ({
                    ...prev,
                    currentPage: response.data.page,
                    totalPages: response.data.pages,
                    totalItems: response.data.total,
                }));
                setLoading(false);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch books"
                );
                setLoading(false);
            }
        };

        fetchBooks();
    }, [
        searchTerm,
        sortOption,
        storeFilter,
        sortDirection,
        pagination.currentPage,
        pagination.itemsPerPage, // Add itemsPerPage to dependencies
    ]);

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: newPage,
        }));
    };

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setPagination((prev) => ({
            ...prev,
            itemsPerPage: newItemsPerPage,
            currentPage: 1, // Reset to first page when changing items per page
        }));
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading books...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <p className="text-danger">{error}</p>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="my-4">Nodejs Books</h1>

            {/* Search and Filter Group */}
            <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                <div className="flex-grow-1" style={{ minWidth: "200px" }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or description"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPagination((prev) => ({
                                ...prev,
                                currentPage: 1,
                            }));
                        }}
                    />
                </div>
                <div>
                    <select
                        className="form-select"
                        value={storeFilter}
                        onChange={(e) => {
                            setStoreFilter(e.target.value);
                            setPagination((prev) => ({
                                ...prev,
                                currentPage: 1,
                            }));
                        }}
                    >
                        <option value="">All Stores</option>
                        {storeOptions.map((store) => (
                            <option key={store} value={store}>
                                {store}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        className="form-select"
                        value={sortOption}
                        onChange={(e) => {
                            setSortOption(e.target.value);
                            setPagination((prev) => ({
                                ...prev,
                                currentPage: 1,
                            }));
                        }}
                    >
                        <option value="title">Sort by Title</option>
                        <option value="originPrice">Sort by Price</option>
                        <option value="createdAt">Sort by Newest</option>
                    </select>
                </div>
                <div>
                    <Button
                        variant="outline-secondary"
                        onClick={() => {
                            setSortDirection((prev) =>
                                prev === "asc" ? "desc" : "asc"
                            );
                            setPagination((prev) => ({
                                ...prev,
                                currentPage: 1,
                            }));
                        }}
                    >
                        {sortDirection === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            </div>

            {/* Items per page selector */}
            <div className="d-flex justify-content-end mb-3">
                <Form.Select
                    style={{ width: "120px" }}
                    value={pagination.itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value="2">2 per page</option>
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                </Form.Select>
            </div>

            {/* Book List */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {books.map((book) => (
                    <Col key={book._id}>
                        <BookItem book={book} />
                    </Col>
                ))}
            </Row>

            {/* Empty State */}
            {books.length === 0 && (
                <div className="text-center my-5">
                    <h4>No books found</h4>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Pagination */}
            {books.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                        Showing{" "}
                        {(pagination.currentPage - 1) *
                            pagination.itemsPerPage +
                            1}{" "}
                        to{" "}
                        {Math.min(
                            pagination.currentPage * pagination.itemsPerPage,
                            pagination.totalItems
                        )}{" "}
                        of {pagination.totalItems} books
                    </div>
                    <PaginationComponent
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </Container>
    );
}
