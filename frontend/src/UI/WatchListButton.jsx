// import { useState } from "react";
// import {useWatchList} from "../context/WatchListContext";

// const WatchListButton = ({ carId }) => {
//     const { isInWatchList, addToWatchList, removeFromWatchList } =
//         useWatchList();
//     const [isAnimating, setIsAnimating] = useState(false);

//     const toggleWatch = () => {
//         if (isInWatchList(carId)) {
//             removeFromWatchList(carId);
//         } else {
//             addToWatchList(carId);
//             setIsAnimating(true);
//             setTimeout(() => setIsAnimating(false), 400);
//         }
//     };

//     return (
//         <span onClick={toggleWatch} style={{ cursor: "pointer" }}>
//             <i
//                 className={`bi bi-heart-fill fs-4 ${
//                     isInWatchList(carId) ? "text-danger" : "text-warning"
//                 } ${isAnimating ? "pulse" : ""}`}
//             ></i>
//         </span>
//     );
// };

// export default WatchListButton;


import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useWatchList } from "../context/WatchListContext";

const WatchListButton = ({ carId }) => {
    const { isInWatchList, addToWatchList, removeFromWatchList } = useWatchList();
    const [isAnimating, setIsAnimating] = useState(false);

    const isWatched = isInWatchList(carId);
    const tooltipText = isWatched ? "Remove from Watch List" : "Add to Watch List";

    const toggleWatch = () => {
        if (isWatched) {
            removeFromWatchList(carId);
        } else {
            addToWatchList(carId);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 400);
        }
    };

    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-${carId}`}>{tooltipText}</Tooltip>}
        >
            <span onClick={toggleWatch} style={{ cursor: "pointer" }}>
                <i
                    className={`bi bi-heart-fill fs-4 ${
                        isWatched ? "text-danger" : "text-warning"
                    } ${isAnimating ? "pulse" : ""}`}
                ></i>
            </span>
        </OverlayTrigger>
    );
};

export default WatchListButton;
