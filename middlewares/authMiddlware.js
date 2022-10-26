const jwt=require('jsonwebtoken');

const protectRoute=(req,res,next)=>{
    const token=req.cookies.authcookie;
    if(token){
        jwt.verify(token,'secret',(err,decodeToken)=>{
            if(err){
                console.log(err)
            }else{
                console.log(decodeToken);
                next()
            }
        })
        next()
    }
}

module.exports={
    protectRoute
}