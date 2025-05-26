import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, FloatingLabel } from "react-bootstrap";
import { isEmail, isEmpty, isEqualsToOtherValue } from "../utils/validation";
import { toast } from "react-toastify";

export default function Register() {
    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: "",
        password2: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    document.title = "Registration";

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.target);
        const userData = Object.fromEntries(fd.entries());

        // Reset errors
        setErrors({
            email: "",
            name: "",
            password: "",
            password2: "",
        });

        // Validation
        let isValid = true;
        const newErrors = { ...errors };

        if (isEmpty(userData.email) || !isEmail(userData.email)) {
            newErrors.email = "Please enter a valid email";
            isValid = false;
        }

        if (isEmpty(userData.name)) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (isEmpty(userData.password)) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (userData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (isEmpty(userData.password2)) {
            newErrors.password2 = "Please confirm your password";
            isValid = false;
        } else if (
            !isEqualsToOtherValue(userData.password, userData.password2)
        ) {
            newErrors.password2 = "Passwords must match";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/signup",
                {
                    email: userData.email,
                    name: userData.name,
                    password: userData.password,
                }
            );

            console.log(response);

            if (response.data.userId) {
                toast.success("Registration successful!");
                navigate("/login");
            }
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Registration failed. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center">Register</h2>
            <Form onSubmit={handleSubmit} className="col-md-6 col-lg-4 mx-auto">
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="name" label="Name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="name"
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    controlId="password"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password"
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                    controlId="password2"
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password2"
                        isInvalid={!!errors.password2}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password2}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mb-3"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </Button>

                <p className="text-center">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Form>
        </Container>
    );
}
