async function userValidation({name,email,password}){
    return new Promise((resolve,reject)=>{
        if(!name) reject("name is required");
        if(!email) reject("email is required");
        if(!password) reject("password is required");
        resolve()
    })
}

async function productValidation({productName,description,price,category,subCategory,sizes,bestSeller,image1,image2,image3,image4}){
    return new Promise((resolve,reject)=>{
        if(!productName) reject("product name is required");
        if(!description) reject("description is required");
        if(!price) reject("price is required");
        if(!category) reject("category is required");
        if(!subCategory) reject("SubCategory is required");
        if(!sizes) reject("sizes is required");
        if(!bestSeller) reject("bestSeller is required");
        resolve()
    })
}
module.exports={userValidation,productValidation}