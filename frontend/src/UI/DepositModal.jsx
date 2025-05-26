import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";
import { formatter } from "../utils/formatter";

export default function DepositModal({
    show,
    onClose,
    car,
    user,
    depositAmount,
    setDepositAmount,
    onSubmit,
}) {
    const requiredAmount =
        car && user ? Math.max(car.starting_bid + 100 - user.balance, 0) : 0;

    const isValid = depositAmount >= requiredAmount;

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                    🚫 Insufficient Funds
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="mb-3">
                    You need to deposit more funds before placing a bid.
                </h5>

                <Card className="mb-3">
                    <Card.Body>
                        <Row>
                            <Col xs={6}>
                                <strong>Current Balance:</strong>
                            </Col>
                            <Col xs={6} className="text-end">
                                {user?.balance != null
                                    ? formatter.format(user.balance)
                                    : "N/A"}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={6}>
                                <strong>Required Deposit:</strong>
                            </Col>
                            <Col xs={6} className="text-end text-danger">
                                {formatter.format(requiredAmount)}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Form>
                    <Form.Group controlId="depositAmount">
                        <Form.Label>💳 Deposit Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={depositAmount}
                            onChange={(e) =>
                                setDepositAmount(Number(e.target.value))
                            }
                            placeholder="Enter amount to deposit"
                            min="0"
                        />
                        {!isValid && depositAmount > 0 && (
                            <Form.Text className="text-danger">
                                Minimum required deposit is{" "}
                                {formatter.format(requiredAmount)}.
                            </Form.Text>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onSubmit}
                    disabled={!user || !car || !isValid}
                >
                    Deposit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
