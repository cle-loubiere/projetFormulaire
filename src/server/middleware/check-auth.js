const jwt = require('jsonwebtoken')

//Middleware check the jwt token
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWTPRIVATEKEY)
        req.userData = decoded;
    } catch(error) {
        return res.status(401).json({
            message:"Auth failed"
        }
    )}
    next();
}