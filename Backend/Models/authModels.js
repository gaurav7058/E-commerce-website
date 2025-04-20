const userModel = require("../Schema/userSchema");

const bcrypt = require("bcrypt"); // Use bcryptjs instead of bcrypt

async function createUserModel({ name, email, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const userDb = await userModel.create({ name, email, password: hashPassword });
            resolve(userDb); // fixed spelling from reolve to resolve
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
async function isEmailExist({email}){
    return new Promise(async (resolve,reject)=>{
        try {
            const userDb=await userModel.findOne({
                $or:[{email}]
            })
            if(userDb && email===userDb.email)reject("Email already exsit")
            resolve()
        } catch (error) {
            reject(error) 
        }
    })
}

async function findUserByKey({key}){
    if(!key){
        return reject("key is missing")
    }
    return new Promise(async (resolve,reject)=>{
        try {
            const userDb=await userModel.findOne({
                $or:[{email:key}]
            })
            if(!userDb)reject("User not found")
            resolve(userDb)
        } catch (error) {
              reject(error)
        }
    })
}
module.exports={createUserModel,isEmailExist,findUserByKey}