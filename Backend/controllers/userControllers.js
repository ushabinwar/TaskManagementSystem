const userModel =  require("../models/userModel");
const jwt = require('jsonwebtoken');
const { sendtoken } = require("../utils/sendToken");

module.exports.homePage = async (req, res, next)=>{
    res.json({message:"this is homepage"})
}

module.exports.registerUser = async (req, res, next)=>{
    // const user = await new userModel(req.body).save()
    try{
        const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    

    // Check if User Already Exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const user = new userModel({ name, email, password});
    await user.save();
    
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    sendtoken(user, 201, res)

    }catch(error){
        // console.error('Error registering user:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports.loginUser = async (req, res, next)=>{
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found with this email address' });
      }
  
      // Validate password
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
        // res.status(200).json({ message: 'Login successful', user });
      // Generate JWT token
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
  
      sendtoken(user, 200, res)
      
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
}



module.exports.logoutUser = async (req, res, next)=>{
  try {
    // Clear the token cookie with the correct options
    res.clearCookie("token", {
        path: "/", // Match the path where the cookie was set
        secure: true, // Only secure in production
        httpOnly: true, // Same as when the cookie was set
    });

    // Send success response
    res.status(200).json({ success: true, message: "Logged out successfully" });
} catch (error) {
  
    res.status(500).json({ message: 'Server error', error: error.message });
}

}

