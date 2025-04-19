const express=require('express');
const userModel = require('../Schema/userSchema');
const { adminAuth } = require('../Middleware/adminAuth');
const { getAllusers, deleteUser } = require('../Controllers/userController');
const userRouter=express.Router();

userRouter.get('/userlist',adminAuth,getAllusers);
userRouter.post('/delete-user/:id',adminAuth,deleteUser)

module.exports=userRouter