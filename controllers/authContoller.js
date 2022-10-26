const jwt=require('jsonwebtoken');
const {users}=require('../models');
const bcrypt=require('bcrypt');



const createToken=(id)=>{
    return jwt.sign({id},'secret');
}

const login_post=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
        const user=await users.findOne({where:{username}});
        
        if(user){
            const token=createToken(user.id);
            res.cookie('authcookie',token,{httpOnly:true});
            next()
            const validatePassword=await bcrypt.compare(password,user.password);
            if(validatePassword){
                res.send('logged in');
            }else{
                res.status(400).json('invalid password')
            }
            next()
        }else{
           res.status(400).json('invalid username');
           next();
        }
    } catch (error) {
        res.status(400).json('failed to login');
    }

}

const register_post=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await users.create({username,password:hashedPassword});
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json('failed to create user')
    }
}


module.exports={
    register_post,
    login_post
}