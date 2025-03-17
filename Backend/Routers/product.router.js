const express=require("express");
const { createProduct, listProduct, removeProduct, singleProduct } = require("../Controllers/product.controllers");
const upload = require("../Middleware/multer");
const { adminAuth } = require("../Middleware/adminAuth");
const setToken = require("../Middleware/setToekn");
const productRouter=express.Router();

productRouter.post("/create",adminAuth,upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }])
,createProduct);
productRouter.post("/delete",adminAuth,removeProduct);
productRouter.get("/list",listProduct);
productRouter.post("/single",adminAuth,singleProduct);

module.exports=productRouter
