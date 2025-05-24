const BookModel = require("../models/bookModel");

exports.createBook = async (req, res, next) => {
    try {
        const {
            title,
            description,
            imageUrl,
            originPrice,
            quantity,
            storeCode,
        } = req.body;

        const book = new BookModel({
            title,
            description,
            imageUrl,
            originPrice,
            quantity,
            storeCode,
            userId: req.userId,
        });

        await book.save();
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

exports.getBooks = async (req, res, next) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Search
        const search = req.query.search || "";
        const searchRegex = new RegExp(search, "i");

        // Sort
        const sortField = req.query.sortBy || "title";
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

        const query = {
            $or: [{ title: searchRegex }, { description: searchRegex }],
        };

        const books = await BookModel.find(query)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        const total = await BookModel.countDocuments(query);

        res.status(200).json({
            books,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        next(err);
    }
};

exports.getBook = async (req, res, next) => {
    try {
        const book = await BookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found!" });
        }
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const {
            title,
            description,
            imageUrl,
            originPrice,
            quantity,
            storeCode,
        } = req.body;

        const book = await BookModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            {
                title,
                description,
                imageUrl,
                originPrice,
                quantity,
                storeCode,
            },
            { new: true }
        );

        if (!book) {
            return res
                .status(404)
                .json({ message: "Book not found or not authorized" });
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await BookModel.findByIdAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!book) {
            return res
                .status(404)
                .json({ message: "Book not found or not authorized!" });
        }

        res.status(200).json({ message: "Book deleted successfully!" });
    } catch (err) {
        next(err);
    }
};
