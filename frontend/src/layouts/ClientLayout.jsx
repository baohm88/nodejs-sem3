import {
    Navbar,
    Nav,
    Container,
    Button,
    Form,
    FormControl,
    NavDropdown,
    Image,
} from "react-bootstrap";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import useLogOut from "../hooks/useLogOut";
import ScrollToTop from "../utils/ScrollToTop";
import ScrollTopButton from "../UI/ScrollTopButton";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import MobileSidebar from "../UI/MobileSidebar";

export default function ClientLayout() {
    const { user, isAuthenticated } = useAuth();
    const logOut = useLogOut();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
            navigate("/");
        }
    };

    const toggleSidebar = () => setShowSidebar((prev) => !prev);

    return (
        <div>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <header>
                        <Navbar bg="light" className="shadow-sm">
                            <Container className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <RiMenu2Line
                                        className="fs-3 d-md-none text-danger"
                                        onClick={toggleSidebar}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <Navbar.Brand
                                        as={NavLink}
                                        to="/"
                                        className="d-none d-md-block"
                                    >
                                        <img
                                            src="/logo-autobid.svg"
                                            alt="AutoBid"
                                            height={50}
                                        />
                                    </Navbar.Brand>
                                    <Nav.Link as={NavLink} to="/add-car">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="rounded-pill d-none d-md-inline"
                                        >
                                            Sell Book
                                        </Button>
                                    </Nav.Link>
                                </div>

                                {/* Centered brand on mobile */}
                                <Navbar.Brand
                                    as={NavLink}
                                    to="/"
                                    className="mx-auto d-md-none"
                                >
                                    <img
                                        src="/logo-autobid.svg"
                                        alt="AutoBid"
                                        height={30}
                                    />
                                </Navbar.Brand>

                                {/* Search bar (hidden on small) */}
                                <Form
                                    className="d-none d-md-flex w-50 mx-auto"
                                    onKeyPress={handleKeyPress}
                                >
                                    <FormControl
                                        type="search"
                                        placeholder="Search for Nodejs books..."
                                        className="me-2"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </Form>

                                {/* User controls */}
                                {isAuthenticated ? (
                                    <div className="d-flex align-items-center gap-3">
                                        <i className="bi bi-bell-fill fs-5 text-muted"></i>
                                        <Nav>
                                            <NavDropdown
                                                align="end"
                                                title={
                                                    <Image
                                                        src={
                                                            user.image_url ||
                                                            "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                                                        }
                                                        roundedCircle
                                                        height={30}
                                                        width={30}
                                                    />
                                                }
                                                id="user-dropdown"
                                            >
                                                <NavDropdown.Item
                                                    as="button"
                                                    onClick={logOut}
                                                >
                                                    <i className="bi bi-box-arrow-right me-2" />
                                                    Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </div>
                                ) : (
                                    <Button variant="success" size="sm">
                                        <NavLink
                                            className="nav-link text-white"
                                            to="/login"
                                        >
                                            <i className="bi bi-box-arrow-left me-2"></i>
                                            Login
                                        </NavLink>
                                    </Button>
                                )}
                            </Container>
                        </Navbar>

                        {/* Offcanvas sidebar with animation and theme */}
                        <MobileSidebar
                            show={showSidebar}
                            onHide={toggleSidebar}
                            searchTerm={searchTerm}
                            handleSearchChange={handleSearchChange}
                            handleKeyPress={handleKeyPress}
                            isAuthenticated={isAuthenticated}
                            logOut={logOut}
                        />
                    </header>

                    <main className="mt-3">
                        <Outlet context={{ searchTerm }} />
                    </main>

                    <ScrollTopButton />
                    <Footer />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
