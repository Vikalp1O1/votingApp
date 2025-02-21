const jwt = require("jsonwebtoken")

const jwtAuthMiddleware =(req,res,next)=>{

    // first check request header has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"token not found"})

    // extract token from request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized access '})

    // verify jwt token 
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        // attach user information to the request object 
        req.user=decodedToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"Invalid Token"})
        
    }
}

// Function to genrate token 
const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:"12d" })
}

module.exports = {jwtAuthMiddleware, generateToken}