import { Form, Row, Col } from "react-bootstrap";
import { BODY_STYLES } from "../components/user/dummy_data";

const selectStyle = {
    backgroundColor: "transparent",
    boxShadow: "none",
};

export default function CarFilterSortForm({
    yearFrom,
    yearTo,
    setYearFrom,
    setYearTo,
    transmission,
    setTransmission,
    bodyStyle,
    setBodyStyle,
    sortBy,
    setSortBy,
    status,
    setStatus,
    showStatus = false,
}) {
    return (
        <Form className="my-3">
            <Row className="g-2">
                {/* Year Range */}
                <Col xs={12} md="auto">
                    <div className="d-flex align-items-center border rounded px-2 py-1">
                        <span className="me-2 fw-semibold text-secondary pb-1">
                            Year:
                        </span>
                        <select
                            className="form-select border-0 p-0"
                            style={{ ...selectStyle, width: "80px" }}
                            aria-label="From Year"
                            value={yearFrom}
                            onChange={(e) => setYearFrom(e.target.value)}
                        >
                            {Array.from({ length: 26 }, (_, i) => 2000 + i).map(
                                (year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            )}
                        </select>
                        <span className="mx-1 text-muted">to</span>
                        <select
                            className="form-select border-0 p-0"
                            style={{ ...selectStyle, width: "80px" }}
                            aria-label="To Year"
                            value={yearTo}
                            onChange={(e) => setYearTo(e.target.value)}
                        >
                            {Array.from({ length: 26 }, (_, i) => 2025 - i).map(
                                (year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </Col>

                {/* Transmission */}
                <Col xs={6} md="auto">
                    <select
                        className="form-select"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                    >
                        <option value="All">All Transmission </option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </Col>

                {/* Body Style */}
                <Col xs={6} md="auto">
                    <select
                        className="form-select"
                        value={bodyStyle}
                        onChange={(e) => setBodyStyle(e.target.value)}
                    >
                        <option value="All">All Body Styles</option>
                        {BODY_STYLES.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </Col>

                {/* Status Filter */}
                {showStatus ? (
                    <>
                        <Col xs={6} md="auto">
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="All">All Listings</option>
                                <option value="Active">Active </option>
                                <option value="Ended">Ended </option>
                            </select>
                        </Col>
                        {/* Sort By */}
                        <Col xs={6} md="auto">
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="end_soon">Ending Soon</option>
                                <option value="newly_listed">
                                    Newly Listed
                                </option>
                                <option value="lowest_mileage">
                                    Lowest Mileage
                                </option>
                            </select>
                        </Col>
                    </>
                ) : (
                    <Col xs={12} md="auto">
                        {" "}
                        {/* Sort By on small screens */}
                        <select
                            className="form-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="end_soon">Ending Soon</option>
                            <option value="newly_listed">Newly Listed</option>
                            <option value="lowest_mileage">
                                Lowest Mileage
                            </option>
                        </select>
                    </Col>
                )}
            </Row>
        </Form>
    );
}
