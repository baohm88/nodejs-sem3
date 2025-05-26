import {
    OverlayTrigger,
    Tooltip as BootstrapTooltip,
    Nav,
    Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { DASHBOARD_LINKS } from "./dummy_data";

export default function DashboardSidebar({ collapsed, toggleSidebar }) {
    return (
        <div
            className={`d-flex flex-column  p-2 ${
                collapsed ? "sidebar-collapsed" : "sidebar-expanded"
            }`}
            style={{
                width: collapsed ? "60px" : "200px",
                transition: "width 0.3s",
                minHeight: "100vh",
            }}
        >
            <div className="d-flex align-items-center justify-content-end mb-4">
                <Button
                    variant="light"
                    onClick={toggleSidebar}
                    className="p-1 fw-bolder"
                    size="sm"
                    style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: 0,
                    }}
                >
                    <i
                        className={`bi  ${
                            collapsed ? "bi-arrow-right" : "bi-arrow-left"
                        }`}
                        style={{ fontSize: "1.3rem" }}
                    ></i>
                </Button>
            </div>

            <Nav className="flex-column text-center text-sm-start">
                {DASHBOARD_LINKS.map(({ to, icon, text }) => (
                    <Nav.Item key={to} className="mb-3">
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                collapsed ? (
                                    <BootstrapTooltip
                                        id={`tooltip-${text.toLowerCase()}`}
                                    >
                                        {text}
                                    </BootstrapTooltip>
                                ) : (
                                    <></>
                                )
                            }
                        >
                            <NavLink
                                to={to}
                                end
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2  ${
                                        isActive
                                            ? "text-danger fw-bold"
                                            : "text-muted"
                                    }`
                                }
                            >
                                <i className={`bi ${icon} fs-5`}></i>
                                {!collapsed && <span>{text}</span>}
                            </NavLink>
                        </OverlayTrigger>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
}
