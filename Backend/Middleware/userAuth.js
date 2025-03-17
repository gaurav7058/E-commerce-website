const jwt =require("jsonwebtoken")
function isAuth(req,res,next){
    try {
        const token=req.headers["authorization"].split(" ")[1];
        if(!token){
          return res.status(401).json({message:"Authorization token required"});
        }
        const decoded=jwt.verify(token,process.env.token)
        req.body.userId = decoded.id;
        next()
      } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
}
module.exports={isAuth}