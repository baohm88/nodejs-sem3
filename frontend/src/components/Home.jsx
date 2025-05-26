import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Card, Button } from "react-bootstrap";
import axios from "axios";
import BookItem from "./BookItem";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("title");

    document.title = "Nodejs Bookstore";

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/books",
                    {
                        params: {
                            search: searchTerm,
                            sortBy: sortOption,
                        },
                    }
                );
                setBooks(response.data.books);
                setLoading(false);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to fetch books"
                );
                setLoading(false);
            }
        };

        fetchBooks();
    }, [searchTerm, sortOption]);

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
            <div className="d-flex justify-content-between mb-4">
                <div className="w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title or description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="form-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="title">Sort by Title</option>
                        <option value="creationDate">Sort by Newest</option>
                        <option value="originPrice">Sort by Price</option>
                    </select>
                </div>
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
        </Container>
    );
}
