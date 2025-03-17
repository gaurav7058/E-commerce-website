const productModel = require("../Schema/productSchema");

function createProductModel({productName,description,category,price,user}){
    return new Promise(async(resolve,reject)=>{
        try {
            const productDb=await productModel.create({productName,description,category,price,user}); 
            if(!productDb)reject("Error in creating product")
           return resolve(productDb);
        } catch (error) {
           return reject(error)
        }
    })
}
module.exports={createProductModel}