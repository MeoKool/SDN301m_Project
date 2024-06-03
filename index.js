const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authFeedback = require("./routers/feedbackRoute");
const app = express();
const authArticles = require("./routers/articlesRoute");
const authRoutes = require("./routers/authRoute");
const { errorHandler } = require("./middleware/errorHandler");
dotenv.config();
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routers/productRoute"));
app.use("/article", authArticles);
app.use("/api/auth", authRoutes);

app.use(errorHandler);
app.listen(8000, () => {
    console.log("Server is running");
});
