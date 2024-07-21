const mongoose=require('mongoose')

const LoginSchema=mongoose.Schema({
    Username:String,
    Password:String
});

const User=mongoose.model("User",LoginSchema)

module.exports=User