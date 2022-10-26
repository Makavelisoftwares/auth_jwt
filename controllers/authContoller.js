const jwt=require('jsonwebtoken');
const {users}=require('../models');
const bcrypt=require('bcrypt');



const createToken=(id)=>{
    jwt.sign({id},'secret');
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
    register_post
}