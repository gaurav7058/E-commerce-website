const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:"Please enter valid email"
        }
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel




