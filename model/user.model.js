const mongoose=require('mongoose')

const LoginSchema=mongoose.Schema({
    username:String,
    password:String
});

const Login=mongoose.model("login",LoginSchema)

module.exports=Login