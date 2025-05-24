const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
    // 1. Get user's input
    const { email, password, name } = req.body;

    try {
        // 2. Check user's existence
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Create new User
        const user = new User({ email, password: hashedPassword, name });

        // 5. Save new User to DB -> return success message + new userId
        await user.save();
        res.status(201).json({
            message: "User created successfully",
            userId: user._id,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    // Get user input from req body
    const { email, password } = req.body;

    try {
        // Check user existence
        const user = await User.findOne({ email });
        console.log("LOGIN USER: ", user);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Check password equality
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate token
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString(),
            },
            "nodejs-bookstore-backend",
            { expiresIn: "1h" }
        );

        // Return status + message + expiration time in seconds
        res.status(200).json({
            token,
            userId: user._id.toString(),
            expiresIn: 3600,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.showLoginForm = async (req, res, next) => {
    res.status(200).json({ message: "Welcome!" });
};
