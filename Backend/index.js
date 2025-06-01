// Modules
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

// Import Routes
const authRouter = require("./Routers/authRoutes");
const productRouter = require("./Routers/product.router");
const cartRouter = require("./Routers/cartRoute");
const orderRouter = require("./Routers/orderRoutes");
const connectCloudinary = require("./Config/cloudinary");
const userRouter = require("./Routers/userRouter");

// App Config
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Routes
app.get("/", (req, res) => res.send("Hello, Server is running!"));
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/users", userRouter);

// MongoDB Connection & Server Start
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");

        connectCloudinary();

        app.listen(port,  () => {
            console.log(`🚀 Server Running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop execution if DB fails
    }
};

startServer();
