import { Modal, Button } from "react-bootstrap";

export default function MessageModal({ show, onClose, title, message }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || "Notification"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
