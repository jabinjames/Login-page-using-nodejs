const mongoose=require('mongoose')

const ConnectDb= async ()=>{
    try{
        const connectionInstances =await mongoose.connect
        (`mongodb+srv://jabinjames:${process.env.PASSWORD}@cluster0.ujxpwld.mongodb.net/Details`)
        console.log(`connection established!!!${connectionInstances.connection.host}`)
        // console.log(connectionInstances)
    }
    catch(err){
        console.log("DATABASE CONNECTION ERORR!!!",err)
    }
}

module.exports = ConnectDb;