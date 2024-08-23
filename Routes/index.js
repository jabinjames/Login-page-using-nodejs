const express=require('express');
const router=express.Router();
const Login=require('../model/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path=require('path')

router.post("/login",async(req,res)=>{
    try {
        const {username,email,password}=req.body
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
        const {username,email,password}=req.body
        const existingUser = await Login.findOne({username});
        if (existingUser) {
            return res.status(409).json({status:409,message:"user exists"})
            
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        console.log(`Hashed password: ${hashPassword}`);
        const loginuser=new Login({
            username:username,email:email,password:hashPassword })
         await loginuser.save() 
         res.status(200).json({status:200,message:"successfully inserted into login collection",Login:loginuser})
    } catch (error) {
        res.status(406).json({status:406,message:"errorer1111",err:error.message})
    }  
})
router.post('/forgot_email',async(req,res)=>{
    const {username,email}=req.body

    const existingemail = await Login.findOne({email});
    console.log(existingemail)
    if(!existingemail)
    {
        res.status(400).json({status:400,message:"email is not founded"})
    }
    else
    {
        //res.status(200).json({status:200,message:"email is founded"})
        
        let otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        secret_key=process.env.SECRET_KEY
        console.log(secret_key)
        const token = jwt.sign({ email, otp },secret_key, { expiresIn: '1h' });

        res.cookie('jwttoken', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        // res.render('otp.ejs');
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',  
            port: 465,  
            secure: true, // Use TLS or SSL (false for TLS, true for SSL on port 465)
            auth: {
                user: process.env.EMAIL_ADDRESS, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your email password
            }
        });
        // Define the email options
        let mailOptions = {
            from: '"jabin james"< process.env.EMAIL_ADDRESS>', // Sender's name and email address
            to: email, // List of recipients (can be a single address or an array of addresses)
            subject: 'OTP', // Subject line
            text: `YOUR OTP CODE IS ${otp}`, // Plain text body
            html: `YOUR OTP CODE IS ${otp}` // HTML body (optional)
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                 console.log('Error occurred: ' + error.message);
                res.status(500).json({ message: 'Failed to send email', error: error.message });
            }
            console.log('Message sent: %s', info.messageId);
            res.status(200).json({ message: 'Email sent successfully!' });
        });
    }
    

})
router.get('/Login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/login.html'));
})
router.get('/Signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/signup.html'));
})
module.exports=router