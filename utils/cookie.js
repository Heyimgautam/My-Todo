const jwt = require('jsonwebtoken')

const sendToken = (user,res,message,statusCode=200)=>{

const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);
res.status(statusCode).cookie('token',token,{
   httpOnly : true,
   maxAge : 60*60*1000,
  //sameSite : process.env.NODE_ENV === "development" ? "lex" : "none",
  // secure : process.env.NODE_ENV === "development" ? false : true 
}).json({
    success : true,
    message
})
}


module.exports = sendToken;