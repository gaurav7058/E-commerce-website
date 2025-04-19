const userModel = require("../Schema/userSchema");

async function getAllusers(req,res){
    try {
        const userDb=await userModel.find();
        if(userDb.lenght<0){
            return res.status(404).json({message:"No user found"});
        }
        return res.status(200).json({
            success:true,
            message:"user List",
            data:userDb
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}
async function deleteUser(req,res){
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"Id is required"
            });
        }
        const userDb=await userModel.findByIdAndDelete(id);
        if(!userDb){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        
        return res.status(200).json({
            success:true,
            message:"User deleted successfully",  
        })
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}


module.exports={
    getAllusers,
    deleteUser
}