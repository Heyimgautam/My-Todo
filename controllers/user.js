const bcrypt = require('bcrypt')
const sendToken = require('../utils/cookie')
const User = require('../models/User')
const ErrorHandler = require('../utils/ErrorHandler')

// To Register
const register =  async(req,res,next)=>{
    try{const {name, email, password} = req.body;
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User has already exist",400));
        // res.status(400).json({
        //   success : false,
        //   error : "User has already exist"
        // })
    }
    const hashedPassword = await bcrypt.hash(password,10);
     user = await User.create({name, email, password : hashedPassword});
     sendToken(user,res,"Thanking you for register here.",201);
    }catch(error){
        next(error);
    }
//     res.json({
//         success : true,
//         user
// })
}

//To logIn
const login = async(req,res,next)=>{
   try{ const {email,password} = req.body;
    let user = await User.findOne({email}).select("password");
    if(!user){
        return next(new ErrorHandler("Inavalid email or password",400));
    //    res.status(400).json({
    //     success : false,
    //     error : "Invalid email or password"
    //    })      
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return next(new ErrorHandler("Invalid email or password",400));
        // res.status(400).json({
        //     success : false,
        //     err : "Invalid email or password"
        // })
    }
    sendToken(user,res,`welcome Back `,201);
}catch(error){
  next(error);
}
    // res.status(200).json({
    //      success : true,
    //      message : "logged in"
    // })
}

//to see selected user
const getMyProfile = (req,res)=>{
   try{ 
    res.status(200).json({
        success : true,
        user : req.user
    })
}catch(error){
    next(error);
}
}

//logOut
const logOut = (req,res)=>{
    try{res.status(200).cookie('token','',{
        expires : new Date(Date.now())
    }).json({
    success : true,
    user : req.user
    })
}catch(error){
    next(error);
}
}

module.exports = {
    register,
   login,
   getMyProfile,
   logOut
}