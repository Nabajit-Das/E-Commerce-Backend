/**
 * Model for products
 */
const mongoose=require("mongoose")
// const category=require("./category.model")
const productModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    retailPrice:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    specifications:{
        type:String,
        required:true
    },
    
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Product",productModel)

