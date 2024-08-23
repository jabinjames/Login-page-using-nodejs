const express=require('express');
const router=express.Router();
const Login=require('../model/user.model.js');
const bcrypt = require('bcrypt');
const path=require('path')

router.post("/login",async(req,res)=>{
    try {
        const {username,password}=req.body
        const existingUser = await Login.findOne({ username });
        console.log(existingUser)
        if (!existingUser) {
            return res.status(400).json({message:"user not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (isPasswordCorrect) {
            return res.status(200).json({message:"user found"})
        } else {
            return res.status(400).json({message:"user and password not found"})
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: "error", err: error.message });
    }
})
router.post("/signup",async(req,res)=>{
    try {
        const {username,password}=req.body
        const existingUser = await Login.findOne({username});
        if (existingUser) {
            return res.status(409).json({status:409,message:"user exists"})
            
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        console.log(`Hashed password: ${hashPassword}`);
        const loginuser=new Login({
            username:username,password:hashPassword })
         await loginuser.save() 
         res.status(200).json({status:200,message:"successfully inserted into login collection",Login:loginuser})
    } catch (error) {
        res.status(406).json({status:406,message:"errorer1111",err:error.message})
    }  
})
router.get('/Login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/login.html'));
})
router.get('/Signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/signup.html'));
})
module.exports=router