const mongoose=require('mongoose');

//function for mongodb connection
const connectdB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`)
    }catch(error){
        console.log('DB error', error)
    }
}

module.exports={connectdB}