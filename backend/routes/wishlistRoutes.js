const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const isAuth = require("../middlewares/is-auth");

router.post("/:bookId", isAuth, wishlistController.addToWishlist);
router.delete("/:bookId", isAuth, wishlistController.removeFromWishlist);
router.get("/", isAuth, wishlistController.getWishlist);
router.get("/check/:bookId", isAuth, wishlistController.checkInWishlist);

module.exports = router;
