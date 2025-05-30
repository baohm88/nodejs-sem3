const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const userSchema = new Scheme(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        books: [
            {
                type: Scheme.Types.ObjectId,
                ref: "Book",
            },
        ],
        wishlist: [
            {
                type: Scheme.Types.ObjectId,
                ref: "Book",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
