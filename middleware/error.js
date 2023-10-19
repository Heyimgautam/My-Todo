const ErrorHandler = require('../utils/ErrorHandler')


module.exports = (err,req,res,next)=>{
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;
   
    // Wrong JWT error
  if (err.name === "JsonWebTokenError : jwt must be provided") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }
     res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}

