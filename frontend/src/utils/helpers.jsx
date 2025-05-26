import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export function getLiveCountdown(endTime) {
    const now = dayjs();
    const end = dayjs(endTime);
    const diff = end.diff(now);

    if (diff <= 0) return "Auction ended";

    const dur = dayjs.duration(diff);
    const minutes = dur.minutes();
    const seconds = dur.seconds();

    if (dur.asHours() < 1) {
        return `${minutes}m ${seconds}s left`;
    } else {
        const days = dur.days();
        const hours = dur.hours();
        return `${days}d ${hours}h ${minutes}m left`;
    }
}

export function getRedirectPathByRole(user) {
    if (!user || !user.admin) return "/";

    if (user.admin === true) {
        return "/admin";
    } else {
        return "/";
    }
}


export const playSound = (soundPath) => {
    const audio = new Audio(soundPath);
    audio.play().catch((err) => console.warn("Audio play failed:", err));
};

export function isActive(car) {
    if (!car.end_time) return false;
    return new Date(car.end_time) > new Date();
}

export function isEnded(car) {
    if (!car.end_time) return false;
    return new Date(car.end_time) <= new Date();
}