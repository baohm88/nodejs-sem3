import { INITIAL_BOOK_FORM_VALUES } from "./dummy_data";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useBookForm from "../../hooks/useBookForm";

export default function UpdateBook() {
    const { id } = useParams();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [initialValues, setInitialValues] = useState(
        INITIAL_BOOK_FORM_VALUES
    );

    document.title = "Edit Book";

    // Fetch the existing book data
    useEffect(() => {
        async function fetchBook() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8080/api/books/${id}`
                );
                const book = res.data;

                setInitialValues(book);
                setImagePreview(book.imageUrl);

                // Verify ownership
                if (user?.userId !== book.userId) {
                    toast.error("You are not the owner of this book");
                    navigate(`/books/${id}`);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch book details");
                navigate("/books");
            } finally {
                setLoading(false);
            }
        }

        fetchBook();
    }, [id, user, navigate]);

    const handleSubmit = async (values) => {
        try {
            setUpdating(true);
            setError("");

            // Prepare updated book data
            const bookData = { ...values };

            // If new image was selected, upload it
            if (image) {
                const imageFormData = new FormData();
                imageFormData.append("file", image);
                imageFormData.append("upload_preset", "ml_default");

                const imageResponse = await axios.post(
                    "https://api.cloudinary.com/v1_1/dppk10edk/image/upload",
                    imageFormData
                );
                bookData.imageUrl = imageResponse.data.secure_url;
            }

            // Send update request
            const response = await axios.put(
                `http://localhost:8080/api/books/${id}`,
                bookData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);

            toast.success("Book updated successfully!");
            navigate(`/books/${id}`);
        } catch (err) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Failed to update book");
            if (err.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setUpdating(false);
        }
    };

    const formik = useBookForm(initialValues, handleSubmit);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate image
            if (!file.type.match("image.*")) {
                setError("Please upload an image file");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
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
        formik.setFieldValue("imageUrl", "");
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading book details...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Edit Book</h1>

            <Card className="p-3">
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={formik.handleSubmit}>
                        {/* Book Title */}
                        <Form.Group className="mb-3">
                            <Form.Label>Title *</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.touched.title &&
                                    !!formik.errors.title
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Book Description */}
                        <Form.Group className="mb-3">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.touched.description &&
                                    !!formik.errors.description
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mb-3">
                            {/* Origin Price */}
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Price ($) *</Form.Label>
                                    <Form.Control
                                        name="originPrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formik.values.originPrice}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={
                                            formik.touched.originPrice &&
                                            !!formik.errors.originPrice
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.originPrice}
                                    </Form.Control.Feedback>
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
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={
                                            formik.touched.quantity &&
                                            !!formik.errors.quantity
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.quantity}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            {/* Store Code */}
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Store Code *</Form.Label>
                                    <Form.Control
                                        name="storeCode"
                                        type="text"
                                        value={formik.values.storeCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={
                                            formik.touched.storeCode &&
                                            !!formik.errors.storeCode
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.storeCode}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Book Cover Image */}
                        <Form.Group className="mb-3">
                            <Form.Label>Book Cover Image</Form.Label>
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
                                />
                            )}
                            <Form.Text className="text-muted">
                                Upload a new cover image (max 2MB)
                            </Form.Text>
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-grid gap-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={updating}
                            >
                                {updating ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />
                                        Updating Book...
                                    </>
                                ) : (
                                    "Update Book"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
