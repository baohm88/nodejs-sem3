import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useUpdateUser from "./useUpdateUser";
import confetti from "canvas-confetti";
import { playSound } from "../utils/helpers";

export function useBidHandler({ car, user, setUser }) {
    const [bidAmount, setBidAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [showBidModal, setShowBidModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateUser = useUpdateUser(setUser);

    const handleSaveBid = async () => {
        if (!user || !car) return;

        const amount = parseFloat(bidAmount);
        const minBid = Math.max(car.current_bid || 0, car.starting_bid);

        if (isNaN(amount) || amount <= minBid) {
            toast.error(`Your bid must be higher than ${minBid}.`);
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `http://localhost:8080/listings/add-bid/${car.id}`,
                { user_id: user.id, bid_amount: amount }
            );

            if (!res.data.success === true) {
                toast.error(res.data.message);
                return;
            }

            updateUser(res.data);
            toast.success("🎉 Bid placed successfully!");
            setShowBidModal(false);
            playSound("/sounds/bid-success.mp3");

            // 💥 Fire confetti!
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
            });
            setShowBidModal(false);
            setBidAmount("");
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message || "Failed to place bid.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Deposit money before bidding
    const handleDeposit = async () => {
        if (!user || !car) return;

        const requiredDeposit = Math.max(
            car.starting_bid + 100 - user.balance,
            0
        );

        if (depositAmount < requiredDeposit) {
            toast.error(`You must deposit at least $${requiredDeposit}`);
            return;
        }

        console.log(depositAmount);

        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:8080/deposit`, {
                userId: user.id,
                amount: depositAmount,
            });

            console.log(res.data);

            updateUser(res.data);
            toast.success("Deposit added successfully!");
            setShowBidModal(false);
            playSound("/sounds/deposit-success.mp3");

            // 💥 Fire confetti!
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
            });
            setShowDepositModal(false);
            setDepositAmount("");
        } catch (err) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message || "Failed to place bid.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        bidAmount,
        setBidAmount,
        depositAmount,
        setDepositAmount,
        showBidModal,
        setShowBidModal,
        showDepositModal,
        setShowDepositModal,
        loading,
        handleSaveBid,
        handleDeposit,
    };
}
