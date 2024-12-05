const jwt = require("jsonwebtoken")


exports.isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
     return res.status(401).json({message:"Please login to access resources"});
    }

    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    req.id = id
    next();
    // res.json({token , id})
}