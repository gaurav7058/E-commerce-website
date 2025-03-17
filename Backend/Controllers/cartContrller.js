const userModel = require("../Schema/userSchema");

const addCart = async (req, res) => {
    try {
      const { userId, itemId, size } = req.body;
      // Validate required fields
      if (!userId || !itemId || !size) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Find the user
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};
  
      // Ensure cartData[itemId] is an object
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
  
      // Update the quantity for the specified size
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
  
      // Update the user's cartData in the database
      await userModel.findByIdAndUpdate(userId, { $set: { cartData } });
  
      return res.status(200).json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.error("Error in updating cart:", error); // Log the error for debugging
      return res.status(400).json({ success: false, message: error.message });
    }
  };
  const updateCart = async (req, res) => {
    try {
      const { userId, itemId, size, quantity } = req.body;
  
      // Validate required fields
      if (!userId || !itemId || !size || quantity === undefined) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      // Find the user
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Initialize cartData if it doesn't exist
      let cartData = userData.cartData || {};
  
      // Ensure cartData[itemId] is an object
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
  
      // Update the quantity for the specified size
      cartData[itemId][size] = quantity;
  
      // Save the updated cartData to the database
      await userModel.findByIdAndUpdate(userId, { $set: { cartData } });
  
      return res.status(200).json({ success: true, message: "Cart Updated" });
    } catch (error) {
      console.error("Error in updating cart:", error); // Log the error for debugging
      return res.status(400).json({ success: false, message: error.message });
    }
  };
const getUserCart= async (req,res)=>{
    try {
        const {userId}=req.body
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData
        return res.status(200).json({success:true,message:"Cart Data",cartData})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
        
    }

}


module.exports={addCart,updateCart,getUserCart}