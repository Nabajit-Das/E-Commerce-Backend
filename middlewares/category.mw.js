/**
 * Code for middleware of category 
 */
const mongoose=require("mongoose")
const categoryModel=require("../models/category.model")
const categoryController=require("../controllers/category.controller")

exports.VerifyCategory=async (req,res,next)=>{
    try{

        if(!req.body.name){
            return res.status(400).send({
                message: "Name of Category is not provided"
            })
        }
        if(!req.body.description){
            return res.status(400).send({
                message:"Description of category is not provided"
            })
        }
        const category=await categoryModel.findOne({name:req.body.name})
        if(category){
            return res.status(400).send({
                message: "Name provided is already present"
            })
        }
        next()
    }catch(err){
        console.log("Error in Validating data",err)
        return res.status(500).send({
            message:"Error in validating data"
        })
    }
}

exports.verifyName=async (req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({
            message: "Name not provided"
        })
    }
    next()
}

exports.editDetails=async (req,res,next)=>{
    if(!req.body.old_name){
        return res.status(400).send({
            message: "Old Name not provided"
        })
    }
    if(!req.body.new_name){
        return res.status(400).send({
            message: "New Name not provided"
        })
    }
    if(!req.body.description){
        return res.status(400).send({
            message: "Description not provided"
        })
    }
    next()
}

