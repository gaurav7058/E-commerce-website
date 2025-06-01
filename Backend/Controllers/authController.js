const { createUser, createUserModel, isEmailExist, findUserByKey } = require("../Models/authModels");
const { userValidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
async function signUp(req,res){
    const {name,email,password}=req.body;
    try {
        try {
            await userValidation({name,email,password});
            await isEmailExist({email})
        } catch (error) {
            return res.status(400).json({success:false,message:"Email Already Exist"})              
        }
        
        const userDb=await createUserModel({name,email,password})
        return res.status(200).json({
            success:true,
            message:"User created successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

async function login(req,res){
    const {email,password}=req.body;
    if(!email){
        return res.status(400).json({success:false,message:"Email is required"})
    }
    if(!password){
        return res.status(400).json({success:false,message:"Password is required"})
    }
    try {
      const userDb= await findUserByKey({key:email});
      const isPasswordMath=await bcrypt.compare(password,userDb.password);
      if(!isPasswordMath){
        return res.status(400).json({success:false,message:"password is inccorect"})

      }
      const token= jwt.sign({id:userDb._id},process.env.token,{expiresIn:"1d"});
      return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        token:token
      })
      
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"User not found"

        })
    }
}
async function logOut(req,res){
    
    return res.json({
        status:200,
        message:"logout Successfull",
    })
}

async function adminLogin(req,res) {
    const {email,password}=req.body;

    try {
        if(email===process.env.admin_email && password===process.env.admin_password){
            const token = jwt.sign({ email, password }, process.env.token, { expiresIn: "24h" });
            return res.json({
                status:200,
                message:"login Successfull",
                token:token
            })
        }
        else{
            return res.json({
                status:401,
                message:"Invalid Email or Password",
            })
        }

    } catch (error) {
        return res.json({
            status:404,
            message:error,
        })   
    }    
}

module.exports={signUp,login,logOut,adminLogin}