const bcrypt=require("bcrypt");
const User=require("../model/userschema");
const jwt=require("jsonwebtoken");
const userModel = require("../model/userschema");
// const { options } = require("../router/user");
require("dotenv").config();

exports.signup =async(req,res)=>{
    try {
        const {name,email,username,password,role}=req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists",
            })
        }
        //secure password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
            console.log(hashedPassword);
        }catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in password hashing",
            })
        }
        const user=await User.create({
            name,email,username,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:"user entry created successfully",
            data:user
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"user cannot be created,please try again later",
        })
    }
}

exports.login= async(req,res)=>{
    try {
        const{username,password}= req.body;
        console.log(username,password);
        if(!username || !password){
            return res.status(500).json({
                success:false,
                message:"any of the credential is empty",
            })
        }
        const user= await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Please do signup",
            })
        }
        const payload={
            username:user.username,
            id:user._id,
            role:user.role
        }
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign(payload,process.env.SECRET,
                {expiresIn:"2h"});
            
            user.password=undefined;
            user[token]=token;
            const cookieOptions={
                    expires:new Date(Date.now()+3*24*60*10000),
                    httpOnly:true
            };
            res.cookie("token",token,cookieOptions).status(200).json({
                // success:true,
                // message:"user logged in successfully",
                user,
                token
            });
        }else{
            return res.status(403).json({
                success:false,
                message:"password incorrect",
            })
        }
    }catch(err) {
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"user cannot be Logged in,please try again later",
        })
    }
    
}

exports.getDetail = async (req,res)=>{
    const {id,username,role} =req.body;

    try{
        const userData= await userModel.findOne({username});
        res.status(200).send({

            success:"true",
            data:userData
        })

    }catch(err){
        res.status(501).send({
            success:"false",
            message:err.message
        })
    }
} 