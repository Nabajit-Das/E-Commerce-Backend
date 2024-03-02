/**
 * Logic to check the request body for product category
 */

const productModel=require("../models/products.model")

exports.verifyName=async (req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({
            message:"Name of product not provided"
        })
    }
    const product=await productModel.findOne({name:req.body.name})
    if(!product){
        next()
    }else{
        res.status(400).send({
            message:"Product already present"
        })
    }
}

exports.verifyQuantity=async(req,res,next)=>{
    if(req.body.quantity==undefined){
        return res.status(400).send({
            message:"Quantity not provided"
        })
    }
    if(req.body.quantity<=0){
        return res.status(400).send({
            message:"Quantity should be Greater than zero"
        })
    }
    next()
}