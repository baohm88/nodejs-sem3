// src/components/UI/MobileSidebar.jsx
import { Offcanvas, Nav, Button, Form, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { DASHBOARD_LINKS } from "../components/user/dummy_data";

export default function MobileSidebar({
    show,
    onHide,
    searchTerm,
    handleSearchChange,
    handleKeyPress,
    isAuthenticated,
    logOut,
}) {
    return (
        <>
            <Offcanvas
                show={show}
                onHide={onHide}
                placement="start"
                backdropClassName="fade" // enable fade animation
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="d-flex align-items-center justify-content-between w-100">
                        <img
                            src="/logo-autobid.svg"
                            alt="AutoBid"
                            height={50}
                        />
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {/* Mobile search bar */}
                    <Form className="d-flex mb-3" onKeyPress={handleKeyPress}>
                        <FormControl
                            type="search"
                            placeholder="Search for cars..."
                            className="me-2"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form>

                    <Nav className="flex-column">
                        <Nav.Link as={NavLink} to="/add-car" onClick={onHide}>
                            <Button
                                variant="danger"
                                size="sm"
                                className="rounded-pill"
                            >
                                Sell Car
                            </Button>
                        </Nav.Link>

                        {/* Additional Links */}
                        {isAuthenticated ? (
                            <>
                                {DASHBOARD_LINKS.map(({ to, icon, text }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={onHide}
                                        className={({ isActive }) =>
                                            `nav-link d-flex align-items-center gap-2 ${
                                                isActive
                                                    ? "text-danger fw-bold"
                                                    : "text-muted"
                                            }`
                                        }
                                    >
                                        <i className={`bi ${icon} me-2`} />
                                        {text}
                                    </NavLink>
                                ))}

                                <NavLink
                                    onClick={() => {
                                        onHide();
                                        logOut();
                                    }}
                                    className="nav-link d-flex align-items-center gap-2 fw-normal text-muted"
                                >
                                    <i className="bi bi-box-arrow-right me-2" />
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <Nav.Link as={NavLink} to="/login" onClick={onHide}>
                                <i className="bi bi-box-arrow-left me-2" />
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
