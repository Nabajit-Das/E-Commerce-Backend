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
    }
})

module.exports= mongoose.model("Category",categoryModel)