const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const BookSchema = new Scheme(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        originPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        storeCode: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
