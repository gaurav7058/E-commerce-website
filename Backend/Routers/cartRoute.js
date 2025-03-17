const express=require("express");
const { getUserCart, addCart, updateCart } = require("../Controllers/cartContrller");
const { isAuth } = require("../Middleware/userAuth");
const cartRouter=express.Router();

cartRouter.post('/get',isAuth ,getUserCart)
cartRouter.post('/add',isAuth ,addCart)
cartRouter.post('/update',isAuth ,updateCart)

module.exports=cartRouter