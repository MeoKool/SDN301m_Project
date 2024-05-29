const { json } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
    SignUp: async (req, res, next) => {
        const { username, password, email } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashed,
            });
            const user = await newUser.save();
            res.status(201).json("User created successfully");
        } catch (e) {
            next(e);
        }
    },

    SignIn: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const validUser = await User.findOne({ username });
            if (!validUser) {
                return res.status(404).json("Wrong username");
            }
            const validPassword = await bcrypt.compare(password, validUser.password);
            if (!validPassword) {
                return res.status(401).json("Wrong credentials");
            }
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = validUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        } catch (err) {
            next(err);
        }
    },
};

module.exports = authController;
