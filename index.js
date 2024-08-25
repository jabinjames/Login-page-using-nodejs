const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')
const ConnectDb=require('../src/config/index.js')
const router=require('./Routes/index.js')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path=require('path')
app=express()

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.SESSION_SECRET_KEY, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
  });
ConnectDb()

app.use('/home',router)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})