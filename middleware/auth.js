const jwt = require('jsonwebtoken')
const User = require('../models/User')

const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(200).json({
            success : false,
            error : "Login first"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    next();
} 

module.exports = isAuthenticated;