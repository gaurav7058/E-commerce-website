const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt")
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



// userSchema.pre("save",async(next)=>{
//     try {
//         if(!this.isModified("password")){
//           return  next()
//         }
//         const salt=await bcrypt.genSalt(10);
//         const pass=await bcrypt.hash(this.password,salt);
//         this.password=pass;
//         next()
//     } catch (error) {
//         next(error)
//     }

// })
