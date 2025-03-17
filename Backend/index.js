//Modules
const express=require("express");
const cors = require('cors');
const bodyParser=require("body-parser")
const cookieParser = require('cookie-parser');
const mongoose=require("mongoose");
//files
const app=express();
app.use(cors())
const authRouter = require("./Routers/authRoutes");
const productRouter = require("./Routers/product.router");
const connectCloudinary = require("./Config/cloudinary");
const cartRouter = require("./Routers/cartRoute");
const orderRouter = require("./Routers/orderRoutes");
require("dotenv").config()
// App config
const port=process.env.PORT;
connectCloudinary()
// middlewares

app.get("/",(req,res)=>{
    return res.send("hello")
})
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// API


//server
const startServer=async()=>{
    try {
        app.listen(port,()=>{
            console.log(`server Running at ${port}`)
        })
    } catch (error) {
        console.log("Server Error",error)
    }
}
startServer()   
async function createDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb Connected")
    } catch (error) {
        console.log("MongoDb Error",error)
    }
}
createDb()
