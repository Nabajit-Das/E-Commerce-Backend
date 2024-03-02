/**
 * Model for products
 */
const mongoose=require("mongoose")
const category=require("./category.model")
const productModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        required:true,
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Product",productModel)

