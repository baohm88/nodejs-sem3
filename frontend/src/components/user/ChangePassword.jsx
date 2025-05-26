import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { headers } from "./dummy_data";

export default function ChangePassword({ show, handleClose }) {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("Please confirm your new password"),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const updatedUser = {
                    id: user.id,
                    password: values.newPassword,
                };

                const res = await axios.put(
                    "http://localhost:8080/update-account",
                    updatedUser,
                    headers
                );

                console.log(res);

                if (res.status === 200) {
                    toast.success(res.data.message);
                    setUser(res.data.data[0]);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.data[0])
                    );
                    handleClose();
                }
            } catch (err) {
                console.error("Failed to change password!", err);
                toast.error("Failed to change password!");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <FloatingLabel label="New Password" className="mb-3">
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            isInvalid={
                                formik.touched.newPassword &&
                                !!formik.errors.newPassword
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.newPassword}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Confirm Password" className="mb-3">
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            isInvalid={
                                formik.touched.confirmPassword &&
                                !!formik.errors.confirmPassword
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.confirmPassword}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Modal.Footer>
                        <Button variant="light" size="sm" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
