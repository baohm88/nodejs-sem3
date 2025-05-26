import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function BookItem({ book }) {
    return (
        <>
            <Card className="h-100">
                <Card.Img
                    variant="top"
                    src={book.imageUrl || "https://via.placeholder.com/150"}
                    style={{ height: "400px", objectFit: "cover" }}
                />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text className="text-muted">
                        {book.description.length > 100
                            ? `${book.description.substring(0, 100)}...`
                            : book.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">
                            ${book.originPrice.toLocaleString()}
                        </span>
                        <Link to={`/books/${book._id}`}>
                            <Button variant="primary">View Details</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
