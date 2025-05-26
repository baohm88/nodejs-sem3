import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { isEmail } from "../utils/validation"; // Assuming you have validation utils

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    document.title = "Account Login";

    async function handleSubmit(e) {
        e.preventDefault();

        // Reset validation errors
        setEmailError("");
        setPasswordError("");

        // Validate inputs
        let valid = true;
        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        } else if (!isEmail(email)) {
            setEmailError("Please enter a valid email");
            valid = false;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        }

        if (!valid) return;

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                { email, password }
            );

            if (res.data.token) {
                const authData = {
                    user: {
                        userId: res.data.userId,
                        email: email,
                    },
                    token: res.data.token,
                };

                setAuth(authData); // Update context with both user and token
                toast.success("Login successful!");
                navigate("/");
            } else {
                toast.error(res.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);

            // Show error message if available
            const errorMsg =
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please try again.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Login</h2>

            <form className="col-md-6 col-lg-4 mx-auto" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        className={`form-control ${
                            emailError ? "is-invalid" : ""
                        }`}
                        type="email" // Changed to type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        autoFocus
                        required
                    />
                    <label htmlFor="email">Email:</label> {/* Fixed htmlFor */}
                    {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        className={`form-control ${
                            passwordError ? "is-invalid" : ""
                        }`}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                    />
                    <label htmlFor="password">Password:</label>
                    {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                    )}
                </div>

                <button
                    className="btn btn-primary w-100 py-2 mb-3" // Changed to primary
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Signing in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </button>

                <p className="text-center">
                    Need an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}
