import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:8080/api/wishlist",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setWishlist(response.data.wishlist);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch wishlist");
                toast.error("Could not load wishlist");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [isAuthenticated, navigate, token]);

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading your wishlist...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center my-5">
                <p className="text-danger">{error}</p>
                <Button variant="primary" onClick={() => navigate("/")}>
                    Browse Books
                </Button>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <h2 className="mb-4">Your Wishlist</h2>
            
            {wishlist.length === 0 ? (
                <div className="text-center my-5">
                    <p>Your wishlist is empty</p>
                    <Button variant="primary" onClick={() => navigate("/")}>
                        Browse Books
                    </Button>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {wishlist.map((book) => (
                        <Col key={book._id}>
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={book.imageUrl || "https://via.placeholder.com/300"}
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text className="text-primary fw-bold">
                                        ${book.originPrice.toLocaleString()}
                                    </Card.Text>
                                    <Badge bg="info" className="mb-2">
                                        {book.storeCode}
                                    </Badge>
                                    <div className="mt-auto">
                                        <Button
                                            as={Link}
                                            to={`/books/${book._id}`}
                                            variant="primary"
                                            className="w-100"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}