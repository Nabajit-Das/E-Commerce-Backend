const mongoose=require("mongoose")

const cartModel=new mongoose.schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    cost:{
        type:Number,
        required:true
    }
    },{timestamps:true,versionKey:false})

    module.exports=mongoose.model("Cart",cartModel)