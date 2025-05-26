import { FloatingLabel, Form } from "react-bootstrap";

export default function FormTextArea({
    controlId,
    label,
    name,
    value,
    onChange,
    isInvalid,
    error,
    rows = 3,
}) {
    // Calculate height based on rows (approx. 24px per row)
    const calculatedHeight = rows * 24 + "px";

    return (
        <Form.Group>
            <FloatingLabel controlId={controlId} label={label}>
                <Form.Control
                    as="textarea"
                    name={name}
                    value={value}
                    onChange={onChange}
                    isInvalid={isInvalid}
                    style={{ height: calculatedHeight }}
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
    );
}
