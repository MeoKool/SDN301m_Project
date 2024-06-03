const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: "string", required: true, unique: true },
        password: { type: "string", required: true },
        email: { type: "string", required: true, unique: true },
        roleID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        address: { type: String },
        phone: { type: String },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
