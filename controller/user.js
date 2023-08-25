const User = require("../models/user");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


module.exports.register = async(req,res) =>{
    try {
        let {name,email,password} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: "User already registered",
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,email,password:hashedPassword
        })   
        //  console.log(user)
        return res.status(201).json({
            success: true,
            message: "User registered",
            user
        })
    } catch (error) {
        res.status(200).json({
            error:error.message
        })
    }
}
module.exports.login = async(req,res) =>{
   try {
    const {email,password} = req.body;
    let JWT_SECRET = process.env.JWT_SECRET

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({_id:user._id},JWT_SECRET,{expiresIn:"365d",})

    res.status(200).json({success: true, message:"user login",token})
   } catch (error) {
    res.status(500).json({
        error:error.message,
    })
   }

}
module.exports.getAllUser = async(req,res) =>{
      const user = await User.find().select("-password");
      res.status(200).json({success: true, user})
}