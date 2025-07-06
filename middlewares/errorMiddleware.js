function globalErrorMiddleware(err, req, res, next) {
    const statusCode=err.status||500;
    const message=err.message||"服务器发生未知错误";
    res.status(statusCode || 500).json({
        status:statusCode||500,
        success:false,
        message:message
    });
};
module.exports={globalErrorMiddleware};