/**
 * Logic to add category to the database
 */

const mongoose=require("mongoose")
const categoryModel=require("../models/category.model")

exports.addCategory=async (req,res)=>{
    //Read req body

    // adding data in MongoDB
    try{
        const categoryCreated=await categoryModel.create({
            name: req.body.name,
            description: req.body.description
        })

        return res.status(201).send({
            categoryCreated
        })

    }catch(err){
        console.log("Error in creating category",err)
        res.status(400).send({
            message: "Error in creating category"
        })
    }
    //returning response
}

exports.findCategory=async (req,res)=>{
    
    try{
        const category=await categoryModel.findOne({name:req.body.name})

        if(!category){
            res.status(404).send({
                message: "No such Category found"
            })
        }
        else{
            const categoryFound={
                name: category.name,
                description: category.description 
            }
            res.status(200).send({
                categoryFound
            })
        }

    }catch(err){
        res.status(500).send({
            message: "Unable to connect with Database"
        })
    }
}

exports.editCategory=async (req,res)=>{
    try{
        const category=await categoryModel.findOne({name:req.body.old_name})

        if(!category){
            res.status(404).send({
                message: "No such category found"
            })
        }
        else{
            await categoryModel.updateOne({name:req.body.old_name},{description:req.body.description,name:req.body.new_name})
            const updatedCategory=await categoryModel.findOne({name:req.body.new_name})
            res.status(200).send({
                updatedCategory
            })
        }

    }catch(err){
        res.status(500).send({
            message: "Unable to connect with Database"
        })
    }
}