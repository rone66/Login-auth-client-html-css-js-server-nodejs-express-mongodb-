const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.isAuth=(req,res,next)=>{
    try {
        const token=req.body.token;
        if (!token) {
            return res.status(400).json({
                success:false,
                message:"token missing",
            })
        }
        try{
            const decode=jwt.verify(token,process.env.SECRET);
            console.log(decode);

            req.user=decode;
        }catch(err){
            return res.status(400).json({
                success:false,
                message:"error in token decoding",
            })

        }    
        next();  
    } catch(err) {
        return res.status(401).json({
            success:false,
            message:"something went wrong, while verifying student",
        })
    }
     
}

exports.isStudent= (req,res,next)=>{
    try{
        if(req.user.role!=="student"){
            return res.status(401).json({
                success:false,
            message:"this is restricted for student",
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"user role not matching",
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(401).json({
                success:false,
            message:"this is restricted for admin",
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"user role not matching",
        })
    }
}