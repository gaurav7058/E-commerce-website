const cloudinary =require("cloudinary").v2
const { createProductModel } = require("../Models/productModel");
const productModel = require("../Schema/productSchema");
const { productValidation } = require("../utils/validation");


// Function for Add product
async function createProduct(req,res){
   try {
    const {productName,description,price,category,subCategory,sizes,bestSeller}=req.body;
    const image1=req.files.image1 && req.files.image1[0]
    const image2=req.files.image2 && req.files.image2[0]
    const image3=req.files.image3 && req.files.image3[0]
    const image4=req.files.image4 && req.files.image4[0] 
    const images=[image1,image2,image3,image4].filter(item=>item!==undefined);
    try {
        await productValidation({productName,description,price,category,subCategory,sizes,bestSeller})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
    const imageUrl= await Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url
        })
    )  
    const productData=new productModel({
        productName,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        bestSeller: bestSeller === "true" ? true : false,
        image: imageUrl,
        date:Date.now()
    })
    const productDb=new productModel(productData);
    await productDb.save();
   return res.status(201).json({
        success:true,
        message:"Product Added Successfully",
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error
    })
   }
}

// Function for list product
async function listProduct(req,res){
   try {
    const productList=await productModel.find();
    return res.status(200).json({
        success:true,
        message:"Product List",
        data:productList
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error
    })
   }
}

// Function for removing product
async function removeProduct(req,res){
    const {id}=req.body;
    try {
        const deletedProduct=await productModel.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Product Removed Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}

// Function for single product
async function singleProduct(req,res){
    const {productId}=req.body;
    try {
        const singleProduct=await productModel.findById(productId);
        if(!singleProduct){
            return res.status(404).json({
                success:false,
                message:"Product Not Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Product Found",
            data:singleProduct
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
    
}

module.exports={createProduct,listProduct,removeProduct,singleProduct}