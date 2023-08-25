const User = require("../models/user")
const jwt = require("jsonwebtoken")


module.exports.isAuthenticate = async(req,res,next) =>{
    try {
        const token =req.header("Authorization")
        // console.log(token)
        if(!token){
            return res.status(401).json({
                success: false,
                message:"not login"
            })
        }

        const decode =await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decode._id)
        req.user = decode
        next()
    } catch (error) {
        // console.log(error)
       return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}