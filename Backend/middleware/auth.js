const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


exports.isAuthenticated = async(req, res, next)=>{
    // const {token} = req.cookies;

    // if(!token){
    //  return res.status(401).json({message:"Please login to access resources"});
    // }

    // const {id} = jwt.verify(token, process.env.JWT_SECRET)
    // req.id = id
    // next();
    // // res.json({token , id})

    try {
        //take Token from cookies 
        const { token } = req.cookies;
    
        
        if (!token) {
          return res.status(401).json({ message: "Please login to access resources" });
        }
    
        // Token ko verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        // User ko database se fetch karo
        const user = await userModel.findById(decoded.id);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Attach user object to request
        req.user = user;
    
        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
      }
}
