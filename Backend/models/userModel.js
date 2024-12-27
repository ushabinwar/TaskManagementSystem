const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt =  require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength:[3,"Name must be at least 3 character or long"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match:[
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address"
    ]
  },
  password: {
    type: String,
    required: true,
    minLength:[6,"Password must be at least 6 character or long"]
  }
});

userSchema.pre("save", function(){
  if(!this.isModified('password')){
     return; 
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.getjwttoken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
