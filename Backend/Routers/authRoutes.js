const express=require("express");
const { signUp, login, logOut, adminLogin } = require("../Controllers/authController");
const authRouter=express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/admin",adminLogin);
authRouter.get("/logout",logOut);

module.exports=authRouter