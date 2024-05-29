const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routers/auth.router");
dotenv.config();

const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

const startServer = async () => {
    try {
        await mongoose.connect(`${db_host}:${db_port}`);
        console.log("Connected to MongoDB");

        app.listen(port, hostname, () => {
            console.log("Server listening on port " + port);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

app.use("/api/auth", authRoutes);

startServer();
