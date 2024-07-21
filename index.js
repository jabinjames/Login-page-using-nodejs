const express=require('express')
const dotenv=require('dotenv').config()
const cors=require('cors')
const ConnectDb=require('../src/config/index.js')
const router=require('./Routes/index.js')
const path=require('path')
app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
ConnectDb()

app.use('/home',router)

app.listen(process.env.PORT,()=>{
    console.log("server is running")
})