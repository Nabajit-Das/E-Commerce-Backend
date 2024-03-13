/**
 * Model for category
 */
const mongoose=require("mongoose")

const categoryModel=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
},{timestamps:true,versionKey:false})

module.exports= mongoose.model("Category",categoryModel)