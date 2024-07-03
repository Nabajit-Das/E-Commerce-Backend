/**
 * This is the schema for users
 */
const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowercase:true
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]
    },
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:"Cart"}]
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("User",userSchema)