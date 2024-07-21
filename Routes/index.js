const router=require('express').Router();
const Login=require('../model/user.model.js');
const bcrypt = require('bcrypt');

router.post("/login",async(req,res)=>{
    try {
    
        // const username = req.params.Username
        // const password=req.params.Password
        const {username,password}=req.body
        console.log(req.body)
        console.log(username)

        const existingUser = await Login.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({message:"user not found"})
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (isPasswordCorrect) {
            //return res.send(`<h1>WELCOME TO HOME PAGE</h1>`);
            return res.status(200).json({message:"user found"})
        } else {
            //return res.send(`<h1>Incorrect password</h1>`);
            return res.status(400).json({message:"user not found"})
        }
    } catch (error) {
        return res.status(400).json({ status: 400, message: "error", err: error.message });
    }
})
router.post("/signup",async(req,res)=>{
    try {
        const username=req.body.username;
        const password=req.body.password;
        
        const existingUser = await Login.findOne({username});
        if (existingUser) {
            return res.status(409).json({message:"user exists"})
            
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        console.log(username);
        console.log(password);
        console.log(`Hashed password: ${hashPassword}`);
        const loginuser=new Login({
            username:username,password:hashPassword })
        console.log(loginuser)
         await loginuser.save() 
         res.status(200).json({status:200,message:"successfully inserted into login collection",Login:loginuser})
    } catch (error) {
        res.status(406).json({status:406,message:"errorer1111",err:error.message})
    }  
})
module.exports=router