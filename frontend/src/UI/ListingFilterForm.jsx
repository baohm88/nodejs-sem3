// src/components/User/ListingFilterForm.jsx
import { Form } from "react-bootstrap";
import { BODY_STYLES } from "./dummy_data";

export default function ListingFilterForm({
    yearFrom,
    yearTo,
    transmission,
    bodyStyle,
    sortBy,
    status,
    onYearFromChange,
    onYearToChange,
    onTransmissionChange,
    onBodyStyleChange,
    onSortByChange,
    onStatusChange,
}) {
    return (
        <div className="d-flex justify-content-between my-3">
            <div className="d-flex">
                <Form className="d-flex">
                    {/* Year */}
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light dropdown-toggle text-black border-secondary-subtle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {`${yearFrom} - ${yearTo}`}
                        </button>
                        <ul className="dropdown-menu wide-dropdown-menu">
                            <li className="d-flex justify-content-between align-items-center">
                                <select
                                    className="form-select mx-1"
                                    value={yearFrom}
                                    onChange={(e) =>
                                        onYearFromChange(
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    {Array.from(
                                        { length: 26 },
                                        (_, i) => 2000 + i
                                    ).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-muted">To</p>
                                <select
                                    className="form-select mx-1"
                                    value={yearTo}
                                    onChange={(e) =>
                                        onYearToChange(parseInt(e.target.value))
                                    }
                                >
                                    {Array.from(
                                        { length: 26 },
                                        (_, i) => 2025 - i
                                    ).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                    </div>

                    {/* Transmission */}
                    <select
                        className="form-select mx-1"
                        value={transmission}
                        onChange={(e) => onTransmissionChange(e.target.value)}
                    >
                        <option value="All">All Transmissions</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>

                    {/* Body Style */}
                    <select
                        className="form-select mx-1"
                        value={bodyStyle}
                        onChange={(e) => onBodyStyleChange(e.target.value)}
                    >
                        <option value="All">All Body Styles</option>
                        {BODY_STYLES.map((style) => (
                            <option key={style} value={style}>
                                {style}
                            </option>
                        ))}
                    </select>
                </Form>
            </div>

            {/* Sort & Status */}
            <div className="d-flex">
                <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                >
                    <option value="end_soon">Ending Soon</option>
                    <option value="newly_listed">Newly Listed</option>
                    <option value="lowest_mileage">Lowest Mileage</option>
                </select>

                <select
                    className="form-select ms-2"
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                >
                    <option value="All">All Listings</option>
                    <option value="active">Active Listings</option>
                    <option value="ended">Past Listings</option>
                </select>
            </div>
        </div>
    );
}
