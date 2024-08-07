/**
 * controller logic for product
 */

const mongoose=require("mongoose")
const productModel=require("../models/products.model")
const categoryModel=require("../models/category.model")

exports.addProduct=async(req,res)=>{
    try{
        const category=await categoryModel.findOne({name:req.body.category})
        if(!category){
            res.status(404).send({
                message: "No such category found"
            })
        } 
        const newProduct=await productModel.create({
            name: req.body.name,
            quantity:req.body.quantity,
            category:category.id,
            retailPrice:req.body.retailPrice,
            discountedPrice:req.body.discountedPrice,
            specifications:req.body.specifications,
            image:req.body.image
        })
        category.products.push(newProduct)
        await category.save()
        res.status(201).send({
            newProduct
        })

    }catch(err){
        res.status(500).send({
            message: "Error in adding product"
        })
        console.log(err)
    }
}

exports.findProduct=async (req,res)=>{
    try{
        const regExPattern=`^${req.body.name}`
        const foundProduct=await productModel.find({name:{$regex:regExPattern,$options:"i"}})
        if(!foundProduct || foundProduct.length==0){
            res.status(404).send({
                message: "No such product found"
            })
        }
        else{
            res.status(200).send({
                foundProduct
            })
        }

    }catch(err){
        res.status(500).send({
            message: "Error in finding product"
        })
    }
}


exports.deleteProduct=async(req,res)=>{
    try{
        const foundProduct=await productModel.findOne({name:req.body.name})
        if(!foundProduct){
            res.status(404).send({
                message:"No such product found"
            })
        }
        else{
            await productModel.deleteOne({name:req.body.name})
            res.status(200).send({
                message:"Deleted Successfully"
            })
        }
    }catch(err){
        res.status(500).send({
            message: "Error in deleting product"
        })
    }
}

exports.editProduct=async (req,res)=>{
    try{
        const foundProduct=await productModel.findOne({name:req.body.oldname})
        if(!foundProduct){
            res.status(404).send({
                message:"No such product"
            })
        }
        else{
           await productModel.updateOne({name:req.body.oldname},{name:req.body.newname,quantity:req.body.quantity,retailPrice:req.body.retailPrice,discountedPrice:req.body.discountedPrice,specifications:req.body.specifications,image:req.body.image})
           const updatedProduct=await productModel.find({name:req.body.newname})
           res.status(201).send({
                updatedProduct
           })
        }

    }catch(err){
        res.status(500).send({
            message: "Error in updating product"
        })
    }
}