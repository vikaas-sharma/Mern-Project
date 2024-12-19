const mongoose=require("mongoose");

//schema
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'usename is required']
    },
    dateOfBirth:{
        type:Date,
        required:[true,'DOB is required'],
    },
    email:{
        type:String,
       required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
},{timestamps: true}
)

module.exports = mongoose.model('user',userSchema)