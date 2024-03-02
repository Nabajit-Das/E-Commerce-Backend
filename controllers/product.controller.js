/**
 * controller logic for product
 */

const mongoose=require("mongoose")
const productModel=require("../models/products.model")

exports.addProduct=async(req,res)=>{
    try{
        const newProduct=await productModel.create({
            name: req.body.name,
            quantity:req.body.quantity
        })
        res.status(201).send({
            newProduct
        })

    }catch(err){
        res.status(500).send({
            message: "Error in adding product"
        })
    }
}