const express = require("express");
const { check } = require("express-validator");
const isAuth = require("../middlewares/is-auth");
const {
    getBooks,
    createBook,
    getBook,
    deleteBook,
    updateBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks);
router.post(
    "/",
    isAuth,
    [
        check("title").not().isEmpty(),
        check("description").not().isEmpty(),
        check("originPrice").isNumeric(),
        check("quantity").isNumeric(),
        check("storeCode").not().isEmpty(),
    ],
    createBook
);
router.get("/:id", getBook);
router.put("/:id", isAuth, updateBook);
router.delete("/:id", isAuth, deleteBook);

module.exports = router;
