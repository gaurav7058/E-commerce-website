const express=require("express");
const { adminAuth } = require("../Middleware/adminAuth");
const { allOrders, updateStatus, placeOrder, placeOrderStripe,  userOrders, verifyStripe,  } = require("../Controllers/orderController");
const { isAuth } = require("../Middleware/userAuth");
const orderRouter=express.Router();

// Admin Features

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features

orderRouter.post('/place',isAuth,placeOrder)
orderRouter.post('/stripe',isAuth,placeOrderStripe)


// User Feature
orderRouter.post('/userorders',isAuth,userOrders);

// verify payment

orderRouter.post('/verifyStripe',isAuth,verifyStripe)

module.exports=orderRouter

