const express = require("express");
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post(
    "/signup",
    [
        check("email").isEmail().normalizeEmail(),
        check("password").isLength({ min: 6 }),
        check("name").not().isEmpty(),
    ],
    signup
);
router.post("/login", login);

module.exports = router;
