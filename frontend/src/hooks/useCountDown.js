import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export function useCountdown(endTime) {
    const [countdown, setCountdown] = useState("");
    const [isExpired, setIsExpired] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!endTime) {
            setCountdown("");
            setIsExpired(true);
            return;
        }

        const updateCountdown = () => {
            const now = dayjs();
            const end = dayjs(endTime);
            const diff = end.diff(now);

            if (diff <= 0) {
                setCountdown("Auction ended");
                setIsExpired(true);
                clearInterval(intervalRef.current); // ⛔ Stop ticking
                return;
            }

            const dur = dayjs.duration(diff);
            const days = Math.floor(dur.asDays());
            const hours = dur.hours().toString().padStart(2, "0");
            const minutes = dur.minutes().toString().padStart(2, "0");
            const seconds = dur.seconds().toString().padStart(2, "0");

            if (days >= 1) {
                setCountdown(`${days} Day${days > 1 ? "s" : ""} left`);
            } else if (dur.asHours() >= 1) {
                setCountdown(`${hours}:${minutes}:${seconds} left`);
            } else {
                setCountdown(`${minutes}:${seconds} left`);
            }
            setIsExpired(false);
        };

        updateCountdown();
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalRef.current);
    }, [endTime]);

    return { countdown, isExpired };
}
