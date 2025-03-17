const Stripe =require("stripe")

const orderModel = require("../Schema/orderSchema");
const userModel = require("../Schema/userSchema");

// global variable
const currency='inr'
const deliveryCharge=10

// getway initialize

const stripe=new Stripe("sk_test_51QyZfO2cynOf16iIX40k85WXOCuPu3MtEx2Oqak5X58SLPBM6rTh2C3Y666o0SJMVAZg0upH1eRvuAQBdrI3O4cp00XkEWuoqx")



// placing order using cash on delivery 

const placeOrder =async (req,res) => {
    try {
        const {userId,items,amount,address}=req.body;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        return res.status(200).json({
            success:true,
            message:"Order Placed"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Order Not Placed"
        })   
    }
    
}
// placing order using Stripe Method 

const placeOrderStripe =async (req,res) => {
    try {
        const {userId,items,amount,address}=req.body;
    const {origin} =req.headers
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.productName
                },
                unit_amount: item.price * 100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: "payment",
            customer_email: newOrder.email, // Add customer email
            metadata: {
                orderId: newOrder._id.toString(),
                userId: userId
            }
    })
    return res.status(200).json({
        success:true,
        session_url:session.url
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
            
        })
        
    }
}

// verify Stripe

const verifyStripe =async (req,res)=>{
    const {orderId,success,userId}=req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            return res.status(200).json({
                success:true,
            })
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            return res.status(200).json({
                success:false,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}


// All Orders data for Admin Panel

const allOrders =async (req,res) => {
    try {
        const orders=await orderModel.find();
        return res.status(200).json({
            success:true,
            message:"All Orders",
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in fetching orders"
        })
        
    }
}
// User Orders data for Frontend

const userOrders =async (req,res) => {
    try {
        const {userId}=req.body;
        const orders=await orderModel.find({userId})
        return res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"No Orders Found"
        })  
    }
    
}
// Update Order status from Admin panel

const updateStatus =async (req,res) => {
    try {
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId ,{status});
        return res.status(200).json({
            success:true,
            message:"Order Status Updated"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Error in updating order status"
        })  
    }
    
}

module.exports={
    placeOrder,
    placeOrderStripe,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
    

}