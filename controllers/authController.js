const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createError } = require("../middleware/errorHandler");

const authController = {
    SignUp: async (req, res, next) => {
        const { username, password, email, phone, address } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ username, password: hashedPassword, email, phone, address });
            const user = await newUser.save();
            res.status(201).json("User created successfully");
        } catch (err) {
            next(err);
        }
    },
    SignIn: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const validUser = await User.findOne({ email });
            if (!validUser) {
                return next(createError(404, "User not found"));
            }
            const validPassword = await bcrypt.compare(password, validUser.password);
            if (!validPassword) {
                return next(createError(401, "Wrong credentials"));
            }
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            const { password: pass, ...rest } = validUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authController;
