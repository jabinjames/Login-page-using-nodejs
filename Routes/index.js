const express=require('express');
const router=express.Router();
const Login=require('../model/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path=require('path');

router.post("/login",async(req,res)=>{
    try {
        const {username,email,password}=req.body
        const existingUser = await Login.findOne({ username });
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
        const {username,email,password}=req.body
        const existingUser = await Login.findOne({username});
        if (existingUser) {
            return res.status(409).json({status:409,message:"user exists"})
            
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const loginuser=new Login({
            username:username,email:email,password:hashPassword })
         await loginuser.save() 
         res.status(200).json({status:200,message:"successfully inserted into login collection",Login:loginuser})
    } catch (error) {
        res.status(400).json({status:406,message:"errorer1111",err:error.message})
    }  
    
})
router.post('/forgot_email',async(req,res)=>{
    const {username,email}=req.body
    req.session.email = email;
    const existingemail = await Login.findOne({email});
    if(!existingemail)
    {
        res.status(400).json({status:400,message:"email is not founded"})
    }
    else
    {
        let otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        secret_key=process.env.SECRET_KEY
        const token = jwt.sign({ email, otp },secret_key, { expiresIn: '5m' });

        res.cookie('jwttoken', token, { httpOnly: true, secure: true, maxAge: 300000 });

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',  
            port: 465,  
            secure: true, 
            auth: {
                user: process.env.EMAIL_ADDRESS, 
                pass: process.env.EMAIL_PASSWORD 
            }
        });

        let mailOptions = {
            from: '"OTP"< process.env.EMAIL_ADDRESS>',
            to: email, 
            subject: 'OTP', 
            text: `YOUR OTP CODE IS ${otp}`, 
            html: `YOUR OTP CODE IS ${otp}` 
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(400).json({ message: 'Failed to send email', error: error.message });
            }
            res.status(200).json({ message: 'Email sent successfully!' });
        });
    }
    

});
router.post("/forgot_otp", async (req,res)=>{
    const otp=req.body.otp;
    const userotp=req.cookies.jwttoken;
    if (!userotp) {
        return res.status(400).json({ message: 'No token provided, access denied.' });
    }
    const user=jwt.verify(userotp,process.env.SECRET_KEY)
    const checkotp=user.otp
    if(checkotp==otp)
    {
        return res.status(200).json({ message: 'otp verified' });
    }
    else
    {
        return res.status(400).json({ message: 'Timeout' });
    }
});
router.post("/forgot_newpassword",async(req,res)=>{
    try{
        const {newpassword,confirmpassword}=req.body;
        
        if(newpassword!=confirmpassword || newpassword === undefined|| confirmpassword === undefined)
        {
            return res.status(400).json({ message: 'New password and confirm password do not match' });

        }
        else
    {
            const email = req.session.email;
            const salt = await bcrypt.genSalt(10);
            const hashPassword=await bcrypt.hash(newpassword,salt);
            const updateResult = await Login.updateOne(
             { email:email }, 
             { $set: { password: hashPassword } }
             );
      
            if (updateResult.modifiedCount > 0) {
                res.status(200).json({ message: 'Password updated successfully!' });
            } else {
                res.status(400).json({ message: 'User not found or password not updated' });
            }
    }
        }
 catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}
}
)
router.get('/Login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/login.html'));
});
router.get('/Signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/signup.html'));
});
module.exports=router