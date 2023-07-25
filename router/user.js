const express=require("express");
const router=express.Router();

const {login,signup,getDetail}=require("../controller/Auth");
const{isAuth,isStudent,isAdmin}=require("../middleware/authMiddle");

router.post("/login",login);
router.post("/signup",signup);


router.get("/",isAuth,getDetail,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route to test"
    })
});
router.get("/student",isAuth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route to student"
    })
});
router.get("/admin",isAuth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route to admin"
    })
})
module.exports=router;