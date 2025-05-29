import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Badge,
    ListGroup,
    ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import your auth context

export default function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedBooks, setRelatedBooks] = useState([]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/api/books/${id}`
                );
                setBook(response.data);

                // Fetch related books from the same store, excluding current book
                const relatedResponse = await axios.get(
                    `http://localhost:8080/api/books`,
                    {
                        params: {
                            storeCode: response.data.storeCode,
                            limit: 3,
                            exclude: id, // Make sure your backend handles this
                        },
                    }
                );
                // Additional client-side filtering as fallback
                const filteredRelated = relatedResponse.data.books.filter(
                    (book) => book._id !== id
                );
                setRelatedBooks(filteredRelated);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        "Failed to fetch book details"
                );
                toast.error("Could not load book details");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleEdit = () => {
        navigate(`/books/${id}/edit`);
    };

    const handleDelete = async () => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this book?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            if (!token) {
                                toast.error("Please login first");
                                navigate("/login");
                                return;
                            }

                            await axios.delete(
                                `http://localhost:8080/api/books/${id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            toast.success("Book deleted successfully");
                            navigate("/");
                        } catch (err) {
                            console.error("Delete error:", err);
                            const errorMsg =
                                err.response?.data?.message ||
                                err.message ||
                                "Failed to delete book";
                            toast.error(errorMsg);

                            if (err.response?.status === 401) {
                                navigate("/login");
                            }
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    const isBookOwner = user && book && user.userId === book.userId;

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading book details...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center my-5">
                <p className="text-danger">{error}</p>
                <Button variant="primary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            </Container>
        );
    }

    if (!book) {
        return (
            <Container className="text-center my-5">
                <p>Book not found</p>
                <Link to="/" className="btn btn-primary">
                    Browse Books
                </Link>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="mb-3"
            >
                &larr; Back to Books
            </Button>

            <Row>
                {/* Main Book Details */}
                <Col lg={8}>
                    <Card className="mb-4">
                        <Row className="g-0">
                            <Col md={5}>
                                <Card.Img
                                    variant="top"
                                    src={
                                        book.imageUrl ||
                                        "https://via.placeholder.com/400x500"
                                    }
                                    className="rounded-start"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        maxHeight: "500px",
                                    }}
                                />
                            </Col>
                            <Col md={7}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <Card.Title className="fs-2">
                                                {book.title}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-3 text-muted">
                                                {book.storeCode && (
                                                    <Badge bg="info">
                                                        Store: {book.storeCode}
                                                    </Badge>
                                                )}
                                            </Card.Subtitle>
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <span className="fs-4 fw-bold text-primary me-3">
                                            ${book.originPrice.toLocaleString()}
                                        </span>
                                        <Badge
                                            bg={
                                                book.quantity > 0
                                                    ? "success"
                                                    : "danger"
                                            }
                                        >
                                            {book.quantity > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Badge>
                                    </div>

                                    <Card.Text className="lead">
                                        {book.description}
                                    </Card.Text>

                                    <ListGroup variant="flush" className="mb-3">
                                        <ListGroup.Item>
                                            <strong>Available Quantity:</strong>{" "}
                                            {book.quantity}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Added to Store:</strong>{" "}
                                            {new Date(
                                                book.createdAt
                                            ).toLocaleDateString()}
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <ButtonGroup>
                                        <Button
                                            variant="primary"
                                            className="me-2"
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button variant="secondary">
                                            Wishlist
                                        </Button>

                                        {isBookOwner && (
                                            <>
                                                <Button
                                                    variant="warning"
                                                    className="ms-2"
                                                    onClick={handleEdit}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    className="ms-2"
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </ButtonGroup>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Related Books Sidebar */}
                <Col lg={4}>
                    <Card className="mb-4">
                        <Card.Header className="bg-light">
                            <h5 className="mb-0">
                                More from Store {book.storeCode}
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {relatedBooks.length > 0 ? (
                                <div className="d-flex flex-column gap-3">
                                    {relatedBooks
                                        .filter((book) => book._id !== id) // Additional client-side filtering
                                        .map((relatedBook) => (
                                            <Link
                                                to={`/books/${relatedBook._id}`}
                                                key={relatedBook._id}
                                                className="text-decoration-none"
                                            >
                                                <Card className="hover-shadow">
                                                    <Row className="g-0 align-items-center">
                                                        <Col xs={4}>
                                                            <Card.Img
                                                                src={
                                                                    relatedBook.imageUrl ||
                                                                    "https://via.placeholder.com/100"
                                                                }
                                                                className="rounded-start"
                                                                style={{
                                                                    height: "80px",
                                                                    objectFit:
                                                                        "cover",
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col xs={8}>
                                                            <Card.Body>
                                                                <Card.Title className="fs-6 mb-1 text-dark">
                                                                    {
                                                                        relatedBook.title
                                                                    }
                                                                </Card.Title>
                                                                <Card.Text className="text-primary fw-bold mb-0">
                                                                    $
                                                                    {relatedBook.originPrice.toLocaleString()}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Link>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-muted">
                                    No other books found in this store
                                </p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
