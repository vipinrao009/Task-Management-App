const ErrorMiddleware = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500
    
    err.message = err.message || "Somthing went wrong"
    
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack: err.stack
    })
}

export default ErrorMiddleware