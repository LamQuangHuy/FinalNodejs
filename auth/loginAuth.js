const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{

    let authorization = req.header('Authorization') 
   
    if (!authorization)
    {
        return res.status(401)
        .json({code:101,message:'Token is missing'})
    }

    let token = authorization.split(' ')[1]
    if (!token)
    {
        return res.status(401)
        .json({code:101,message:'Invalid Token'})
    }
    
    const {JWT_SECRET} = process.env

    

    jwt.verify(token,JWT_SECRET,(err,data)=>{
        if (err)
        {
            return res.status(401)
            .json({code:101,message:'Invalid Token/Token Expired'})
        }
        req.user = data
        next();
    })
}