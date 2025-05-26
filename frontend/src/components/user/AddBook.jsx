import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "react-bootstrap-icons";
import {
    Container,
    Card,
    Form,
    Row,
    Col,
    Button,
    Image,
    Spinner,
    Alert,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

// Simplified initial form values
const INITIAL_BOOK_FORM_VALUES = {
    title: "",
    description: "",
    originPrice: "",
    quantity: "",
    storeCode: "",
};

export default function AddBook() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { token } = useAuth();
    const navigate = useNavigate();

    document.title = "Add new Book";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        if (!image) {
            setError("Please upload a book cover image");
            setLoading(false);
            return;
        }

        try {
            const imageFormData = new FormData();
            imageFormData.append("file", image);
            imageFormData.append("upload_preset", "ml_default");

            const imageResponse = await axios.post(
                "https://api.cloudinary.com/v1_1/dppk10edk/image/upload",
                imageFormData
            );

            // 3. Prepare book data
            const bookData = {
                title: e.target.title.value,
                description: e.target.description.value,
                originPrice: parseFloat(e.target.originPrice.value),
                quantity: parseInt(e.target.quantity.value),
                storeCode: e.target.storeCode.value,
                imageUrl: imageResponse.data.secure_url,
            };

            // 4. Send request with authorization header
            const response = await axios.post(
                "http://localhost:8080/api/books",
                bookData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                toast.success("Book added successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error("Error adding book:", err);
            setError(err.response?.data?.message || "Failed to add book");

            // If token is invalid/expired, redirect to login
            if (err.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate image type and size
            if (!file.type.match("image.*")) {
                setError("Please upload an image file");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                // 2MB limit
                setError("Image size should be less than 2MB");
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview("");
    };

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Add a New Book</h1>

            <Card className="p-3">
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Book Title */}
                        <Form.Group className="mb-3">
                            <Form.Label>Title *</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                required
                                placeholder="Enter book title"
                            />
                        </Form.Group>

                        {/* Book Description */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                required
                                placeholder="Enter book description"
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            {/* Original Price */}
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Origin Price ($) *</Form.Label>
                                    <Form.Control
                                        name="originPrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        required
                                        placeholder="0.00"
                                    />
                                </Form.Group>
                            </Col>

                            {/* Quantity */}
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Quantity *</Form.Label>
                                    <Form.Control
                                        name="quantity"
                                        type="number"
                                        min="1"
                                        required
                                        placeholder="1"
                                    />
                                </Form.Group>
                            </Col>

                            {/* Store Code */}
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Store Code *</Form.Label>
                                    <Form.Control
                                        name="storeCode"
                                        type="text"
                                        required
                                        placeholder="e.g., S10"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Book Cover Image */}
                        <Form.Group className="mb-3">
                            <Form.Label>Book Cover Image *</Form.Label>
                            {imagePreview ? (
                                <div
                                    className="position-relative"
                                    style={{ width: "200px" }}
                                >
                                    <Image
                                        src={imagePreview}
                                        thumbnail
                                        className="mb-2"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="position-absolute top-0 end-0"
                                        onClick={handleRemoveImage}
                                        style={{
                                            transform: "translate(50%, -50%)",
                                        }}
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            ) : (
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            )}
                            <Form.Text className="text-muted">
                                Upload a cover image for your book (max 2MB)
                            </Form.Text>
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-grid gap-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Adding Book...
                                    </>
                                ) : (
                                    "Add Book"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
