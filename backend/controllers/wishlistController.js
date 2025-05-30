const User = require("../models/userModel");
const Book = require("../models/bookModel");

exports.addToWishlist = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const userId = req.userId;

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Check if book is already in wishlist
        const user = await User.findById(userId);
        if (user.wishlist.includes(bookId)) {
            return res.status(400).json({ message: "Book already in wishlist" });
        }

        // Add to wishlist
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { wishlist: bookId } },
            { new: true }
        );

        res.status(200).json({ message: "Book added to wishlist" });
    } catch (err) {
        next(err);
    }
};

exports.removeFromWishlist = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const userId = req.userId;

        // Remove from wishlist
        await User.findByIdAndUpdate(
            userId,
            { $pull: { wishlist: bookId } },
            { new: true }
        );

        res.status(200).json({ message: "Book removed from wishlist" });
    } catch (err) {
        next(err);
    }
};

exports.getWishlist = async (req, res, next) => {
    try {
        const userId = req.userId;

        // Get user with populated wishlist
        const user = await User.findById(userId).populate("wishlist");

        res.status(200).json({ wishlist: user.wishlist });
    } catch (err) {
        next(err);
    }
};

exports.checkInWishlist = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const userId = req.userId;

        const user = await User.findById(userId);
        const isInWishlist = user.wishlist.includes(bookId);

        res.status(200).json({ isInWishlist });
    } catch (err) {
        next(err);
    }
};