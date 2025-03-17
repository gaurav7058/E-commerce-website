const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
    },
    sizes:{
        type:Array,
        required:true
    },
    bestSeller:{
        type:Boolean,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        // required:true
    },
    date:{
        type:Number,
        required:true
    }
})
// connecting the review with the product
const productModel=mongoose.model("product",productSchema)
module.exports=productModel;