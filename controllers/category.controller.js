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
            description: req.body.description,
            products:[]
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
            message: "Error in Finding category"
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
            message: "Error in Updating category"
        })
    }
}

exports.deleteCategory=async (req,res)=>{
    try{
        const category=await categoryModel.findOne({name:req.body.name})
        if(!category){
            return res.status(404).send({
                message : "No such Category Found"
            })
        }
        else{
            await categoryModel.deleteOne({name:req.body.name})
            res.status(200).send({
                message: req.body.name+" Category Deleted Successfully"
            })
        }

    }catch(err){
        res.status(500).send({
            message: "Error in Deleting category"
        })
    }
}

exports.getProducts=async (req,res)=>{
    try{
        const productsinCategory=await categoryModel.findOne({name:req.body.name}).populate('products');
        if(!productsinCategory){
            res.status(404).send({
                message:"No products found"
            })
        }
        else{
            res.status(200).send({
                productsinCategory
            })
        }

    }catch(err){
        res.status(500).send({
            message:"Error in finding products in category"
        })
    }
}